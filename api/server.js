import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL client setup
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization - Auto-create tables on startup
async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log('[DB] Initializing database schema...');

    // Create tools table
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

    // Create index for faster search
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tools_name ON tools USING gin(to_tsvector('english', name))
    `);

    console.log('[DB] ✅ Database schema initialized successfully');

  } catch (error) {
    console.error('[DB] ❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Perplexity API Integration
async function callPerplexityAPI(query) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY not configured');
  }

  try {
    console.log(`[Perplexity] Analyzing tool: ${query}`);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a SaaS tool analyzer. Return ONLY valid JSON with the exact schema shown in the example. No markdown, no code blocks, just raw JSON.'
          },
          {
            role: 'user',
            content: `Analyze the SaaS tool "${query}" and return this exact JSON structure:
{
  "name": "Tool Name",
  "monthly_cost": 99.99,
  "description": "Brief description",
  "features": [
    {"name": "Feature 1", "type": "core"},
    {"name": "Feature 2", "type": "bloat"},
    {"name": "Feature 3", "type": "core"}
  ]
}

Rules:
- monthly_cost must be a number (average monthly price in USD)
- type must be either "core" or "bloat"
- Mark as "core" if essential (20% users need)
- Mark as "bloat" if rarely used (80% don't need)
- Include 5-10 features`
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Clean JSON if wrapped in markdown code blocks
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
    }

    const toolData = JSON.parse(cleanedContent);

    // Validate structure
    if (!toolData.name || !toolData.monthly_cost || !Array.isArray(toolData.features)) {
      throw new Error('Invalid response structure from Perplexity');
    }

    console.log(`[Perplexity] ✅ Successfully analyzed ${toolData.name}`);
    return toolData;

  } catch (error) {
    console.error('[Perplexity] ❌ Error:', error.message);
    throw error;
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SaaSKiller API is running' });
});

// Search tools endpoint
app.get('/api/tools/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    console.log(`[API] Search request: ${query}`);

    // 1. Check database for existing tool (fuzzy search)
    const normalizedQuery = query.toLowerCase().trim();

    const searchResult = await pool.query(
      `SELECT * FROM tools
       WHERE LOWER(name) LIKE $1
       OR LOWER(slug) LIKE $1
       ORDER BY created_at DESC
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

    // 4. Insert into database
    const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const insertResult = await pool.query(
      `INSERT INTO tools (name, slug, monthly_cost, features, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        toolData.name,
        slug,
        toolData.monthly_cost,
        JSON.stringify(toolData.features),
        toolData.description || ''
      ]
    );

    console.log(`[API] ✅ Saved to database: ${toolData.name}`);

    // 5. Return the newly created tool
    res.json(insertResult.rows[0]);

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

// Submit lead endpoint
app.post('/api/leads', async (req, res) => {
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
