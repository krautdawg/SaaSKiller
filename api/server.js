import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { pool } from './db.js';
import { callPerplexityAPI, analyzeCustomFeature } from './perplexity.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15min window
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 AI analysis requests per 15min
  message: { error: 'Too many analysis requests, please try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false
});

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 leads per hour max
  message: { error: 'Too many lead submissions' },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware
// Add security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    },
  },
  crossOriginEmbedderPolicy: false, // Allow cross-origin resources
}));

// Configure CORS - restrict to specific origins
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'], // Default for development
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Add request size limit
app.use('/api/', generalLimiter); // Apply general rate limit to all API routes

// Set timeout for all requests to prevent hung connections
app.use((req, res, next) => {
  // Set timeout to 60 seconds (15s buffer beyond frontend 45s timeout)
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

// Database initialization - Auto-create tables on startup
async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log('[DB] Initializing database schema...');

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        icon VARCHAR(50),
        display_order INTEGER DEFAULT 0
      )
    `);

    // Seed categories if empty
    const categoriesCount = await client.query('SELECT COUNT(*) FROM categories');
    if (parseInt(categoriesCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO categories (name, slug, icon, display_order) VALUES
          ('Communication', 'communication', 'message-circle', 1),
          ('Productivity', 'productivity', 'check-square', 2),
          ('Development', 'development', 'code', 3),
          ('Design', 'design', 'palette', 4),
          ('Marketing', 'marketing', 'megaphone', 5),
          ('Sales & CRM', 'sales-crm', 'users', 6),
          ('Analytics', 'analytics', 'bar-chart', 7),
          ('Project Management', 'project-management', 'trello', 8),
          ('Finance', 'finance', 'dollar-sign', 9),
          ('HR & Recruiting', 'hr-recruiting', 'briefcase', 10)
      `);
      console.log('[DB] ✅ Seeded categories');
    }

    // Create tools table (keeping legacy name for compatibility)
    await client.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        monthly_cost NUMERIC NOT NULL,
        features JSONB NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Add new columns to tools table if they don't exist
    await client.query(`
      DO $$
      BEGIN
        -- Add category column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='category') THEN
          ALTER TABLE tools ADD COLUMN category VARCHAR(100);
        END IF;

        -- Add logo_url column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='logo_url') THEN
          ALTER TABLE tools ADD COLUMN logo_url VARCHAR(500);
        END IF;

        -- Add short_description column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='short_description') THEN
          ALTER TABLE tools ADD COLUMN short_description TEXT;
        END IF;

        -- Add website column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='website') THEN
          ALTER TABLE tools ADD COLUMN website VARCHAR(500);
        END IF;

        -- Add is_published column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='is_published') THEN
          ALTER TABLE tools ADD COLUMN is_published BOOLEAN DEFAULT false;
        END IF;

        -- Add popularity_score column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='popularity_score') THEN
          ALTER TABLE tools ADD COLUMN popularity_score INTEGER DEFAULT 0;
        END IF;

        -- Add core_features column (new flexible feature array)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='core_features') THEN
          ALTER TABLE tools ADD COLUMN core_features JSONB DEFAULT '[]'::jsonb;
        END IF;

        -- Add bloaty_features column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                      WHERE table_name='tools' AND column_name='bloaty_features') THEN
          ALTER TABLE tools ADD COLUMN bloaty_features JSONB DEFAULT '[]'::jsonb;
        END IF;
      END $$
    `);

    // Create subscription_tiers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscription_tiers (
        id SERIAL PRIMARY KEY,
        tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
        tier_name VARCHAR(100) NOT NULL,
        tier_order INTEGER NOT NULL DEFAULT 0,
        price_monthly NUMERIC(10,2),
        price_yearly NUMERIC(10,2),
        price_model VARCHAR(50) DEFAULT 'per_seat',
        features_included JSONB DEFAULT '[]'::jsonb,
        user_limit INTEGER,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add database constraints (data integrity fixes)
    await client.query(`
      DO $$
      BEGIN
        -- Add NOT NULL constraints for price fields
        BEGIN
          ALTER TABLE subscription_tiers ALTER COLUMN price_monthly SET NOT NULL;
        EXCEPTION WHEN others THEN
          -- First set NULL values to 0, then add constraint
          UPDATE subscription_tiers SET price_monthly = 0 WHERE price_monthly IS NULL;
          ALTER TABLE subscription_tiers ALTER COLUMN price_monthly SET NOT NULL;
        END;

        BEGIN
          ALTER TABLE subscription_tiers ALTER COLUMN price_yearly SET NOT NULL;
        EXCEPTION WHEN others THEN
          UPDATE subscription_tiers SET price_yearly = 0 WHERE price_yearly IS NULL;
          ALTER TABLE subscription_tiers ALTER COLUMN price_yearly SET NOT NULL;
        END;

        BEGIN
          ALTER TABLE subscription_tiers ALTER COLUMN price_model SET NOT NULL;
        EXCEPTION WHEN others THEN
          UPDATE subscription_tiers SET price_model = 'per_seat' WHERE price_model IS NULL;
          ALTER TABLE subscription_tiers ALTER COLUMN price_model SET NOT NULL;
        END;

        -- Add UNIQUE constraint on (tool_id, tier_order)
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_tool_tier_order'
        ) THEN
          -- Clean up duplicates first
          DELETE FROM subscription_tiers
          WHERE id NOT IN (
            SELECT MIN(id)
            FROM subscription_tiers
            GROUP BY tool_id, tier_order
          );

          ALTER TABLE subscription_tiers
            ADD CONSTRAINT unique_tool_tier_order UNIQUE (tool_id, tier_order);
        END IF;

        -- Add CHECK constraint for price_model enum
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'check_price_model'
        ) THEN
          ALTER TABLE subscription_tiers
            ADD CONSTRAINT check_price_model
              CHECK (price_model IN ('per_seat', 'flat', 'usage_based'));
        END IF;

        -- Add CHECK constraints for positive prices
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'check_price_monthly_positive'
        ) THEN
          ALTER TABLE subscription_tiers
            ADD CONSTRAINT check_price_monthly_positive CHECK (price_monthly >= 0);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'check_price_yearly_positive'
        ) THEN
          ALTER TABLE subscription_tiers
            ADD CONSTRAINT check_price_yearly_positive CHECK (price_yearly >= 0);
        END IF;
      END $$
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_name ON tools USING gin(to_tsvector('english', name))
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_is_published ON tools(is_published)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_subscription_tiers_tool_id ON subscription_tiers(tool_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_subscription_tiers_tier_order ON subscription_tiers(tier_order)
    `);

    // Create leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        tool_name TEXT NOT NULL,
        bleed_amount NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('[DB] ✅ Database schema initialized successfully');

  } catch (error) {
    console.error('[DB] ❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SaaSKiller API is running' });
});

// Search tools endpoint (AI-powered, rate limited)
app.get('/api/tools/search', aiLimiter, async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    console.log(`[API] Search request: ${query}`);

    // 1. Check database for existing tool (fuzzy search)
    const normalizedQuery = query.toLowerCase().trim();

    const searchResult = await pool.query(
      `SELECT t.*,
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', st.id,
                    'name', st.tier_name,
                    'tier_name', st.tier_name,
                    'tier_order', st.tier_order,
                    'price_per_user', st.price_monthly,
                    'price_monthly', st.price_monthly,
                    'price_yearly', st.price_yearly,
                    'price_model', st.price_model,
                    'user_limit', st.user_limit,
                    'notes', st.notes
                  ) ORDER BY st.tier_order
                ) FILTER (WHERE st.id IS NOT NULL),
                '[]'::json
              ) as subscription_tiers
       FROM tools t
       LEFT JOIN subscription_tiers st ON st.tool_id = t.id
       WHERE LOWER(t.name) LIKE $1
       OR LOWER(t.slug) LIKE $1
       GROUP BY t.id
       ORDER BY t.created_at DESC
       LIMIT 1`,
      [`%${normalizedQuery}%`]
    );

    // 2. If found in cache, return immediately
    if (searchResult.rows.length > 0) {
      console.log(`[API] ✅ Cache hit for: ${query}`);
      return res.json(searchResult.rows[0]);
    }

    // 3. Not found - call Perplexity API
    console.log(`[API] Cache miss - calling Perplexity for: ${query}`);

    const toolData = await callPerplexityAPI(query);

    // 4. Insert into database with transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      // Insert tool
      const toolResult = await client.query(
        `INSERT INTO tools
         (name, slug, website, category, logo_url, short_description,
          core_features, bloaty_features, is_published, monthly_cost, features, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
          toolData.name,
          slug,
          toolData.website || '',
          toolData.category || 'productivity',
          toolData.logo_url || `https://logo.clearbit.com/${slug}.com`,
          toolData.short_description || '',
          JSON.stringify(toolData.core_features),
          JSON.stringify(toolData.bloaty_features),
          true,
          // Legacy fields for backward compatibility
          toolData.subscription_tiers.find(t => t.tier_order === 1)?.price_monthly || 0,
          // Populate legacy features array for backward compatibility with audit tool
          JSON.stringify([
            ...toolData.core_features.map(f => ({ name: f.name, type: 'core' })),
            ...toolData.bloaty_features.map(f => ({ name: f.name, type: 'bloat' }))
          ]),
          toolData.short_description || ''
        ]
      );

      const toolId = toolResult.rows[0].id;

      // Insert subscription tiers (with ON CONFLICT to handle race conditions)
      for (const tier of toolData.subscription_tiers) {
        await client.query(
          `INSERT INTO subscription_tiers
           (tool_id, tier_name, tier_order, price_monthly, price_yearly,
            price_model, user_limit, notes)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (tool_id, tier_order)
           DO UPDATE SET
             tier_name = EXCLUDED.tier_name,
             price_monthly = EXCLUDED.price_monthly,
             price_yearly = EXCLUDED.price_yearly,
             price_model = EXCLUDED.price_model,
             user_limit = EXCLUDED.user_limit,
             notes = EXCLUDED.notes`,
          [
            toolId,
            tier.tier_name,
            tier.tier_order,
            tier.price_monthly || 0,  // Default to 0 for NOT NULL constraint
            tier.price_yearly || 0,   // Default to 0 for NOT NULL constraint
            tier.price_model || 'per_seat',
            tier.user_limit,
            tier.notes || ''
          ]
        );
      }

      await client.query('COMMIT');

      // Get complete tool with tiers for response
      const completeToolResult = await pool.query(
        `SELECT t.*,
                json_agg(
                  json_build_object(
                    'id', st.id,
                    'tier_name', st.tier_name,
                    'tier_order', st.tier_order,
                    'price_monthly', st.price_monthly,
                    'price_yearly', st.price_yearly,
                    'price_model', st.price_model,
                    'user_limit', st.user_limit,
                    'notes', st.notes
                  ) ORDER BY st.tier_order
                ) as subscription_tiers
         FROM tools t
         LEFT JOIN subscription_tiers st ON st.tool_id = t.id
         WHERE t.id = $1
         GROUP BY t.id`,
        [toolId]
      );

      console.log(`[API] ✅ Saved to database: ${toolData.name}`);

      // 5. Return the newly created tool with tiers
      res.json(completeToolResult.rows[0]);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('[API] ❌ Error in /api/tools/search:', error);

    // Return user-friendly error
    res.status(500).json({
      error: 'Failed to analyze tool',
      message: error.message,
      type: 'analysis'
    });
  }
});

// Submit lead endpoint (rate limited to prevent spam)
app.post('/api/leads', leadLimiter, async (req, res) => {
  const { email, tool_name, bleed_amount } = req.body;

  if (!email || !tool_name || bleed_amount === undefined) {
    return res.status(400).json({
      error: 'Missing required fields: email, tool_name, bleed_amount'
    });
  }

  try {
    console.log(`[API] Lead submission: ${email} for ${tool_name}`);

    const result = await pool.query(
      `INSERT INTO leads (email, tool_name, bleed_amount)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [email, tool_name, bleed_amount]
    );

    console.log(`[API] ✅ Lead saved: ${result.rows[0].id}`);

    res.json({
      success: true,
      lead: result.rows[0]
    });

  } catch (error) {
    console.error('[API] ❌ Error in /api/leads:', error);
    res.status(500).json({
      error: 'Failed to save lead',
      message: error.message
    });
  }
});

// Get all tools (for admin/debugging)
app.get('/api/tools', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tools ORDER BY created_at DESC');
    res.json({ tools: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('[API] ❌ Error fetching tools:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// GET /api/saas-tools - List all published tools with pagination and filters
app.get('/api/saas-tools', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Build WHERE clause dynamically
    const conditions = ['is_published = true'];
    const values = [];
    let paramIndex = 1;

    if (category) {
      conditions.push(`category = $${paramIndex}`);
      values.push(category);
      paramIndex++;
    }

    if (search) {
      conditions.push(`(LOWER(name) LIKE $${paramIndex} OR LOWER(short_description) LIKE $${paramIndex})`);
      values.push(`%${search.toLowerCase()}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Validate sort and order
    // Define immutable whitelist with explicit mappings (prevents SQL injection)
    const SORT_COLUMNS = {
      'created_at': 't.created_at',
      'name': 't.name',
      'popularity_score': 't.popularity_score',
      'category': 't.category'
    };

    const SORT_ORDERS = {
      'asc': 'ASC',
      'desc': 'DESC'
    };

    const sortColumn = SORT_COLUMNS[sort] || SORT_COLUMNS['created_at'];
    const sortOrder = SORT_ORDERS[order?.toLowerCase()] || SORT_ORDERS['desc'];

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM tools ${whereClause}`,
      values
    );
    const totalCount = parseInt(countResult.rows[0].count);

    // Get paginated results with subscription tiers
    values.push(limitNum, offset);
    const result = await pool.query(
      `SELECT t.*,
              json_agg(
                json_build_object(
                  'id', st.id,
                  'tier_name', st.tier_name,
                  'tier_order', st.tier_order,
                  'price_monthly', st.price_monthly,
                  'price_yearly', st.price_yearly,
                  'price_model', st.price_model,
                  'user_limit', st.user_limit,
                  'notes', st.notes
                ) ORDER BY st.tier_order
              ) FILTER (WHERE st.id IS NOT NULL) as subscription_tiers
       FROM tools t
       LEFT JOIN subscription_tiers st ON st.tool_id = t.id
       ${whereClause}
       GROUP BY t.id
       ORDER BY ${sortColumn} ${sortOrder}
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      values
    );

    res.json({
      tools: result.rows,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    });

  } catch (error) {
    console.error('[API] ❌ Error fetching saas-tools:', error);
    res.status(500).json({ error: 'Failed to fetch tools', message: error.message });
  }
});

// GET /api/saas-tools/:id - Get single tool with tiers
app.get('/api/saas-tools/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT t.*,
              json_agg(
                json_build_object(
                  'id', st.id,
                  'tier_name', st.tier_name,
                  'tier_order', st.tier_order,
                  'price_monthly', st.price_monthly,
                  'price_yearly', st.price_yearly,
                  'price_model', st.price_model,
                  'user_limit', st.user_limit,
                  'notes', st.notes
                ) ORDER BY st.tier_order
              ) FILTER (WHERE st.id IS NOT NULL) as subscription_tiers
       FROM tools t
       LEFT JOIN subscription_tiers st ON st.tool_id = t.id
       WHERE t.id = $1
       GROUP BY t.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('[API] ❌ Error fetching tool:', error);
    res.status(500).json({ error: 'Failed to fetch tool', message: error.message });
  }
});

// POST /api/calculate-cost - Calculate monthly/yearly cost
app.post('/api/calculate-cost', async (req, res) => {
  try {
    const { tool_id, tier_id, team_size = 1, billing_period = 'monthly' } = req.body;

    if (!tool_id || !tier_id) {
      return res.status(400).json({
        error: 'Missing required fields: tool_id, tier_id'
      });
    }

    // Get tier information
    const tierResult = await pool.query(
      `SELECT * FROM subscription_tiers WHERE id = $1 AND tool_id = $2`,
      [tier_id, tool_id]
    );

    if (tierResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tier not found for this tool' });
    }

    const tier = tierResult.rows[0];
    const teamSizeNum = Math.max(1, parseInt(team_size));

    // Calculate costs based on pricing model
    // Ensure all values are numbers (database might return strings)
    let monthlyCost = 0;
    let yearlyCost = 0;

    if (tier.price_model === 'per_seat') {
      monthlyCost = (Number(tier.price_monthly) || 0) * teamSizeNum;
      yearlyCost = (Number(tier.price_yearly) || 0) * teamSizeNum;
    } else if (tier.price_model === 'flat') {
      monthlyCost = Number(tier.price_monthly) || 0;
      yearlyCost = Number(tier.price_yearly) || 0;
    } else if (tier.price_model === 'usage_based') {
      // For usage-based, return base price (actual usage would be calculated separately)
      monthlyCost = Number(tier.price_monthly) || 0;
      yearlyCost = Number(tier.price_yearly) || 0;
    }

    // Calculate savings percentage
    const yearlyEquivalentMonthly = yearlyCost / 12;
    const savingsPercent = monthlyCost > 0
      ? Math.round(((monthlyCost - yearlyEquivalentMonthly) / monthlyCost) * 100)
      : 0;

    res.json({
      tier_name: tier.tier_name,
      price_model: tier.price_model,
      team_size: teamSizeNum,
      monthly_cost: parseFloat(monthlyCost.toFixed(2)),
      yearly_cost: parseFloat(yearlyCost.toFixed(2)),
      yearly_monthly_equivalent: parseFloat(yearlyEquivalentMonthly.toFixed(2)),
      savings_percent: Math.max(0, savingsPercent),
      billing_period
    });

  } catch (error) {
    console.error('[API] ❌ Error calculating cost:', error);
    res.status(500).json({ error: 'Failed to calculate cost', message: error.message });
  }
});

// GET /api/categories - List all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY display_order ASC'
    );

    res.json({
      categories: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('[API] ❌ Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Analyze custom feature endpoint (AI-powered, rate limited)
app.post('/api/analyze-custom-feature', aiLimiter, async (req, res) => {
  const { feature_name } = req.body;

  if (!feature_name || typeof feature_name !== 'string' || !feature_name.trim()) {
    return res.status(400).json({
      error: 'Missing or invalid feature_name',
      message: 'feature_name must be a non-empty string'
    });
  }

  try {
    console.log(`[API] Custom feature analysis request: ${feature_name}`);

    const analysis = await analyzeCustomFeature(feature_name);

    res.json({
      feature_name: feature_name.trim(),
      complexity: analysis.complexity,
      estimated_hours: analysis.estimated_hours
    });

  } catch (error) {
    console.error('[API] ❌ Error in /api/analyze-custom-feature:', error);

    // Fallback to medium complexity on error
    console.log('[API] Falling back to medium complexity defaults');
    res.json({
      feature_name: feature_name.trim(),
      complexity: 'medium',
      estimated_hours: 12,
      fallback: true,
      error_message: 'Analysis failed, using default estimate'
    });
  }
});

// Start server
async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    // Then start the server
    app.listen(PORT, () => {
      console.log(`\n✅ SaaSKiller API Server running on http://localhost:${PORT}`);
      console.log(`   Database: Connected to PostgreSQL`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📝 Available endpoints:`);
      console.log(`   GET  /api/health`);
      console.log(`   GET  /api/tools/search?q=<tool_name>`);
      console.log(`   POST /api/leads`);
      console.log(`   POST /api/analyze-custom-feature`);
      console.log(`   GET  /api/tools\n`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await pool.end();
  process.exit(0);
});

// Start the server
startServer();