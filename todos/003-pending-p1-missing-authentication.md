---
status: pending
priority: p1
issue_id: "003"
tags: [security, authentication, authorization, backend, code-review]
dependencies: []
---

# Implement Authentication and Authorization

CRITICAL: Zero authentication on all API endpoints - complete open access to database and AI services.

## Problem Statement

NO authentication or authorization checks exist on ANY endpoint. All API routes are publicly accessible without user verification, allowing:
- Unauthorized data access
- Anonymous data manipulation
- Unrestricted AI API usage (Perplexity costs)
- No audit trail
- Resource abuse

**Impact:**
- Unauthorized data access to all tools and tiers
- Anonymous users can create leads
- Perplexity API abuse ($$ cost explosion)
- No rate limiting per user
- Compliance violations (GDPR, SOC2)

**CVSS Score:** 9.8 (Critical)

## Findings

**Affected Endpoints (ALL unprotected):**

```javascript
// api/server.js - NO AUTH on any route
app.get('/api/tools', async (req, res) => { ... });              // Public
app.get('/api/saas-tools', async (req, res) => { ... });          // Public
app.get('/api/saas-tools/:id', async (req, res) => { ... });      // Public
app.post('/api/leads', async (req, res) => { ... });              // Public
app.post('/api/calculate-cost', async (req, res) => { ... });     // Public
app.post('/api/analyze-custom-feature', async (req, res) => { ... }); // Public + $$
app.get('/api/categories', async (req, res) => { ... });          // Public
app.get('/api/tools/search', async (req, res) => { ... });        // Public + $$
```

**Cost Risk:**
- `/api/tools/search` calls Perplexity API ($$ per request)
- `/api/analyze-custom-feature` calls Perplexity API ($$ per request)
- No rate limiting = unlimited API costs
- Potential $10,000+ bills from abuse

**Data Exposure:**
- All tool data (names, features, pricing)
- All subscription tiers
- All lead emails
- All categories

## Proposed Solutions

### Option 1: JWT Authentication (Recommended for MVP)

**Approach:** Implement JWT-based authentication middleware.

```javascript
// middleware/authenticate.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply to protected routes
app.get('/api/tools', authenticate, async (req, res) => { ... });
app.post('/api/analyze-custom-feature', authenticate, rateLimit, async (req, res) => { ... });
```

**Pros:**
- Stateless (no server-side sessions)
- Scalable (no session store needed)
- Standard industry practice
- Easy to implement

**Cons:**
- Requires user registration/login flow
- Token management complexity
- Refresh token strategy needed

**Effort:** 4-6 hours

**Risk:** Low

---

### Option 2: API Keys (Good for Beta/Testing)

**Approach:** Issue API keys to users, validate on each request.

```javascript
// middleware/apiKey.js
export const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  // Check against database
  const user = await pool.query(
    'SELECT * FROM users WHERE api_key = $1 AND api_key_active = true',
    [apiKey]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.user = user.rows[0];
  next();
};
```

**Pros:**
- Simple to implement
- No login flow needed
- Easy to revoke keys
- Good for API-first products

**Cons:**
- Key management burden
- No fine-grained permissions
- Less user-friendly for web app

**Effort:** 3-4 hours

**Risk:** Low

---

### Option 3: OAuth 2.0 + Social Login

**Approach:** Use OAuth providers (Google, GitHub) for authentication.

**Pros:**
- No password management
- Trusted authentication
- User-friendly

**Cons:**
- Complex implementation
- Dependency on third-party services
- Overkill for MVP

**Effort:** 12-16 hours

**Risk:** Medium

## Recommended Action

**TO BE FILLED DURING TRIAGE**

Suggested approach:
1. Start with API keys for beta testing (quick to implement)
2. Add rate limiting immediately
3. Migrate to JWT for production launch
4. Consider OAuth for public release

## Technical Details

**Required changes:**
- Create authentication middleware
- Add `users` table with API keys or JWT refresh tokens
- Protect all endpoints (public read-only OK for browse)
- Add rate limiting per user
- Implement login/signup flow (if JWT)

**Affected files:**
- `api/server.js` - Add middleware to all routes
- New: `api/middleware/authenticate.js`
- New: `api/routes/auth.js` - Login/signup endpoints
- Frontend: Login component, token storage

**Database changes:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),  -- if not OAuth
  api_key VARCHAR(255) UNIQUE,  -- if API key approach
  api_key_active BOOLEAN DEFAULT true,
  role VARCHAR(50) DEFAULT 'user',  -- 'user', 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_api_key ON users(api_key) WHERE api_key_active = true;
CREATE INDEX idx_users_email ON users(email);
```

**Rate limiting:**
```javascript
import rateLimit from 'express-rate-limit';

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // 100 requests per window
  message: 'Too many requests'
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // 10 AI requests per window
  message: 'Too many AI analysis requests'
});

app.use('/api/', generalLimiter);
app.post('/api/analyze-custom-feature', authenticate, aiLimiter, ...);
```

## Resources

- **Security Review Report:** Authentication section
- **JWT.io:** [Introduction to JWT](https://jwt.io/introduction)
- **Express Rate Limit:** [npm package](https://www.npmjs.com/package/express-rate-limit)
- **Passport.js:** [Authentication middleware](http://www.passportjs.org/)
- **OWASP:** [Authentication Cheat Sheet](https://cheats.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## Acceptance Criteria

- [ ] All endpoints require authentication (except public browse)
- [ ] Authentication middleware implemented and tested
- [ ] Rate limiting active on all endpoints
- [ ] Expensive AI endpoints have strict limits (10/15min)
- [ ] Users table created with proper indexes
- [ ] Login/signup flow working (if JWT approach)
- [ ] API key generation/revocation working (if API key approach)
- [ ] Frontend stores and sends auth tokens
- [ ] 401 responses for unauthenticated requests
- [ ] 403 responses for unauthorized actions
- [ ] Security tested with unauthenticated requests
- [ ] Documentation updated with auth requirements

## Work Log

### 2025-12-15 - Initial Discovery

**By:** Claude Code (Security Sentinel Agent)

**Actions:**
- Comprehensive security audit of API endpoints
- Identified ZERO authentication on 13 endpoints
- Analyzed cost risk from Perplexity API abuse
- Calculated potential financial impact ($10K+ bills)
- Drafted 3 authentication approaches
- Designed rate limiting strategy

**Learnings:**
- Application currently has no access control
- Perplexity API costs accumulate quickly without rate limits
- JWT is industry standard for web APIs
- API keys good for beta/internal testing
- Must implement before any public deployment

---

## Notes

- **BLOCKING ISSUE** - DO NOT DEPLOY without authentication
- **FINANCIAL RISK** - AI endpoints could drain budget
- Implement rate limiting FIRST (quick win, prevents abuse)
- Then add authentication (proper solution)
- Consider making browse endpoints public (SEO benefit)
- Lead submission must require authentication (prevent spam)
- Monitor API costs daily during rollout
