---
status: pending
priority: p1
issue_id: "005"
tags: [security, rate-limiting, cost-control, backend, code-review]
dependencies: []
---

# Implement Rate Limiting on API Endpoints

CRITICAL: No rate limiting allows API abuse and potential $10,000+ Perplexity API bills.

## Problem Statement

Zero rate limiting exists on ANY endpoint, including expensive AI-powered analysis endpoints that call Perplexity API. This allows:
- Unlimited AI API calls ($$ per request)
- DoS attacks via resource exhaustion
- Database query flooding
- Potential $10,000+ monthly bills

**Impact:**
- **Financial:** Uncontrolled Perplexity API costs
- **Availability:** Server/database overload
- **Performance:** Legitimate users affected
- **Security:** Easy DoS vector

## Findings

**No Rate Limiting on:**

1. **Expensive AI Endpoints ($$ per request):**
```javascript
// api/server.js:410-560 - $$ Perplexity API call
app.get('/api/tools/search', async (req, res) => {
  // Calls Perplexity API - NO RATE LIMIT
  const analysis = await analyzeToolWithPerplexity(query);
});

// api/server.js:694-820 - $$ Perplexity API call
app.post('/api/analyze-custom-feature', async (req, res) => {
  // Calls Perplexity API - NO RATE LIMIT
  const analysis = await analyzeCustomFeature(feature_name);
});
```

2. **Database-Heavy Endpoints:**
```javascript
app.get('/api/saas-tools', ...);  // Complex JOIN aggregation
app.get('/api/saas-tools/:id', ...);  // Tool + tiers lookup
app.post('/api/calculate-cost', ...);  // Calculation + database
```

3. **Lead Submission:**
```javascript
app.post('/api/leads', ...);  // Can spam database with fake leads
```

**Cost Analysis:**
- Perplexity API: ~$0.001 per request (estimated)
- Without rate limiting: 10,000 requests/hour = $10/hour = $7,200/month
- Malicious actor could drain $1,000+ in hours

**DoS Scenario:**
```bash
# Attacker floods AI endpoint
while true; do
  curl -X GET "http://localhost:3000/api/tools/search?q=random-$(date +%s)"
  sleep 0.1  # 10 req/sec = 36,000/hour = $36/hour
done
```

## Proposed Solutions

### Option 1: express-rate-limit (Recommended)

**Approach:** Use battle-tested rate limiting middleware.

```javascript
import rateLimit from 'express-rate-limit';

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15min window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  // Store in Redis for distributed systems (future)
  // store: new RedisStore({ client: redisClient })
});

// Strict limit for AI endpoints (expensive)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 AI analysis requests per 15min
  message: 'Too many analysis requests, please try again in 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

// Lead submission (prevent spam)
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 leads per hour max
  message: 'Too many lead submissions'
});

// Apply to routes
app.use('/api/', generalLimiter);
app.get('/api/tools/search', aiLimiter, async (req, res) => { ... });
app.post('/api/analyze-custom-feature', aiLimiter, async (req, res) => { ... });
app.post('/api/leads', leadLimiter, async (req, res) => { ... });
```

**Pros:**
- Industry standard, battle-tested
- Easy to implement (30min)
- Flexible per-endpoint limits
- Returns standard headers (X-RateLimit-*)
- Can scale to Redis for distributed systems

**Cons:**
- In-memory by default (not distributed)
- Must upgrade to Redis for multi-server

**Effort:** 1 hour

**Risk:** Very Low

---

### Option 2: Custom Middleware with Database Tracking

**Approach:** Track requests in database per IP/user.

```javascript
const checkRateLimit = async (req, res, next) => {
  const identifier = req.user?.id || req.ip;
  const endpoint = req.path;

  const result = await pool.query(
    `SELECT COUNT(*) FROM api_requests
     WHERE identifier = $1 AND endpoint = $2
     AND created_at > NOW() - INTERVAL '15 minutes'`,
    [identifier, endpoint]
  );

  if (parseInt(result.rows[0].count) >= limit) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  await pool.query(
    `INSERT INTO api_requests (identifier, endpoint) VALUES ($1, $2)`,
    [identifier, endpoint]
  );

  next();
};
```

**Pros:**
- Full control over logic
- Persistent tracking (survives restarts)
- Can analyze usage patterns

**Cons:**
- Database overhead on every request
- More complex implementation
- Cleanup job needed for old records

**Effort:** 3-4 hours

**Risk:** Medium

---

### Option 3: nginx Rate Limiting (Infrastructure Level)

**Approach:** Configure nginx as reverse proxy with rate limiting.

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
limit_req_zone $binary_remote_addr zone=ai:10m rate=5r/h;

server {
  location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://localhost:3000;
  }

  location /api/tools/search {
    limit_req zone=ai burst=2 nodelay;
    proxy_pass http://localhost:3000;
  }
}
```

**Pros:**
- Offloads rate limiting from app
- Very fast (nginx is optimized)
- Protects even if app crashes

**Cons:**
- Requires nginx setup
- Less flexible (config changes need reload)
- Harder to debug

**Effort:** 2 hours (+ nginx setup)

**Risk:** Low-Medium

## Recommended Action

**TO BE FILLED DURING TRIAGE**

Recommended approach:
1. **Immediate:** Implement Option 1 (express-rate-limit) - 1 hour
2. **Short-term:** Add authentication (issue #003) for per-user limits
3. **Future:** Upgrade to Redis store when scaling beyond 1 server

**Suggested Limits:**
- General API: 100 req/15min
- AI Analysis: 5 req/15min
- Lead Submission: 3 req/hour
- Browse Endpoints: 200 req/15min (higher for public access)

## Technical Details

**Affected files:**
- `api/server.js` - Add rate limiting middleware before routes

**New dependencies:**
```json
{
  "express-rate-limit": "^7.1.5"
}
```

**Configuration (environment variables):**
```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AI_MAX=5
RATE_LIMIT_LEADS_MAX=3
```

**Response headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702660800000
```

**Error response (HTTP 429):**
```json
{
  "error": "Too many requests, please try again later",
  "retryAfter": 900  // seconds
}
```

**Future scaling with Redis:**
```javascript
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:'
  }),
  // ... other options
});
```

## Resources

- **express-rate-limit:** [npm package](https://www.npmjs.com/package/express-rate-limit)
- **rate-limit-redis:** [npm package](https://www.npmjs.com/package/rate-limit-redis)
- **OWASP:** [Rate Limiting Guide](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)
- **HTTP 429:** [Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)

## Acceptance Criteria

- [ ] express-rate-limit installed and configured
- [ ] General API rate limit: 100 req/15min
- [ ] AI endpoint rate limit: 5 req/15min
- [ ] Lead submission rate limit: 3 req/hour
- [ ] Rate limit headers returned (X-RateLimit-*)
- [ ] HTTP 429 response on limit exceeded
- [ ] Test: Verify rate limits enforced
- [ ] Test: Verify limits reset after window
- [ ] Frontend handles 429 responses gracefully
- [ ] Monitoring: Track rate limit hits
- [ ] Documentation: API rate limits documented

## Work Log

### 2025-12-15 - Initial Discovery

**By:** Claude Code (Security Sentinel Agent)

**Actions:**
- Identified zero rate limiting on all endpoints
- Calculated potential Perplexity API cost exposure ($7K+/month)
- Created abuse scenario demonstrating DoS potential
- Researched 3 rate limiting approaches
- Recommended express-rate-limit for immediate implementation

**Learnings:**
- Perplexity API costs accumulate quickly without limits
- Single attacker could cause $1,000+ damage in hours
- express-rate-limit is industry standard (used by major APIs)
- Rate limiting must happen BEFORE authentication (protect login endpoint)
- AI endpoints need 20x stricter limits than general API

---

## Notes

- **URGENT** - Implement BEFORE any public deployment
- **FINANCIAL RISK** - Highest priority to prevent cost explosion
- Consider even stricter AI limits during beta (3 req/15min)
- Monitor rate limit violations for abuse patterns
- Add alerting if >100 rate limit hits/hour (potential attack)
- Combine with issue #003 (authentication) for per-user tracking
- Future: IP reputation scoring (block known attackers)
