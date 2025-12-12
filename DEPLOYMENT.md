# SaaSKiller Deployment Guide

## Local Development Setup

### 1. Setup PostgreSQL Locally

Run these commands in your terminal:

```bash
# Create database
sudo -u postgres psql -c "CREATE DATABASE saaskiller;"

# Set postgres user password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'saaskiller123';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE saaskiller TO postgres;"
```

**Verify it worked:**
```bash
psql -U postgres -d saaskiller -c "\dt"
# Enter password: saaskiller123
```

### 2. Start the Backend Server

```bash
cd api
npm start
```

The server will automatically create the `tools` and `leads` tables on first run.

### 3. Start the Frontend

```bash
# In a new terminal
npm run dev
```

Visit: http://localhost:5173

---

## Production Server Setup

### Prerequisites on Production Server:
- Node.js 18+ installed
- PostgreSQL database accessible
- Environment variables configured

### Commands to Run on Production Database:

**Option 1: If you have direct psql access to production:**

```bash
# Connect to your production database
psql "postgres://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres"

# Create database (if not exists)
CREATE DATABASE saaskiller;

# Connect to it
\c saaskiller

# The tables will be auto-created by the Node.js server on first startup
# But you can manually create them with:

CREATE TABLE IF NOT EXISTS tools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  monthly_cost NUMERIC NOT NULL,
  features JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  bleed_amount NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tools_name
  ON tools USING gin(to_tsvector('english', name));

-- Verify tables
\dt

-- Test insert
INSERT INTO tools (name, slug, monthly_cost, features, description)
VALUES ('Test Tool', 'test-tool', 99.99, '[]', 'Test')
RETURNING *;
```

**Option 2: If using a managed database (Supabase, Railway, etc.):**

The Node.js server will auto-create tables on first startup. Just make sure:
1. Database exists
2. User has CREATE TABLE permissions

### Deploy Backend to Production:

```bash
# On your production server
cd /path/to/app/api

# Create production .env file
cat > .env << 'EOF'
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@YOUR_HOST:5432/saaskiller
PORT=3000
PERPLEXITY_API_KEY=pplx-YOUR_PERPLEXITY_API_KEY_HERE
NODE_ENV=production
EOF

# Install dependencies
npm install --production

# Start server (use PM2 or similar for production)
npm install -g pm2
pm2 start server.js --name saaskiller-api
pm2 save
pm2 startup
```

### Deploy Frontend to Production:

```bash
# Build frontend
npm run build

# The dist/ folder contains static files
# Upload to your hosting (Netlify, Vercel, etc.)

# Set environment variable on hosting platform:
VITE_API_URL=https://your-api-domain.com
```

---

## Testing Production Setup

### Test Backend API:

```bash
# Health check
curl https://your-api-domain.com/api/health

# Test tool search (will take 10-15s first time as it calls Perplexity)
curl "https://your-api-domain.com/api/tools/search?q=Slack"

# Test lead submission
curl -X POST https://your-api-domain.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "tool_name": "Slack",
    "bleed_amount": 1200
  }'
```

### Check Database:

```bash
# Connect to production database
psql "YOUR_DATABASE_URL"

# Check if tables exist
\dt

# See tools in cache
SELECT name, monthly_cost, created_at FROM tools;

# See leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;
```

---

## Environment Variables Reference

### Backend (`/api/.env`):
```env
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=3000
PERPLEXITY_API_KEY=pplx-xxxxx
NODE_ENV=production
```

### Frontend (`.env.local` or hosting platform):
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Troubleshooting

### Database Connection Issues:
```bash
# Test connection from server
psql "YOUR_DATABASE_URL" -c "SELECT version();"

# Check if PostgreSQL is accepting connections
pg_isready -h YOUR_HOST -p 5432
```

### Tables Not Created:
```bash
# Check server logs
pm2 logs saaskiller-api

# Manually create tables (see commands above)
```

### CORS Errors:
The backend has CORS enabled for all origins. If you need to restrict:
```javascript
// In server.js, change:
app.use(cors());

// To:
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## Architecture Summary

```
Frontend (React + Vite)
    ↓ HTTP/fetch()
Backend (Express.js on port 3000)
    ↓ SQL queries (pg driver)
Database (PostgreSQL)
    ↓ When cache miss
Perplexity API (for tool analysis)
```

**Endpoints:**
- `GET /api/health` - Health check
- `GET /api/tools/search?q=<query>` - Search tool (cache-first, Perplexity fallback)
- `POST /api/leads` - Submit lead
- `GET /api/tools` - List all cached tools (for debugging)
