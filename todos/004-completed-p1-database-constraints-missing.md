---
status: pending
priority: p1
issue_id: "004"
tags: [database, data-integrity, constraints, backend, code-review]
dependencies: []
---

# Add Missing Database Constraints

CRITICAL: Missing NOT NULL and UNIQUE constraints allow data corruption and duplicate records.

## Problem Statement

The `subscription_tiers` table is missing critical database constraints, allowing:
- NULL prices that cause NaN in calculations
- Duplicate tier orders for the same tool
- Invalid price_model values
- Data integrity violations

**Impact:**
- Financial calculations return NaN or incorrect values
- UI displays "$NaN/mo" to users
- Duplicate tiers with same order (undefined behavior)
- Race conditions create duplicate records
- Invalid data in production database

## Findings

**Current Schema Issues (api/server.js:128-142):**

```sql
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id SERIAL PRIMARY KEY,
  tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
  tier_name VARCHAR(100) NOT NULL,
  tier_order INTEGER NOT NULL DEFAULT 0,
  price_monthly NUMERIC(10,2),          -- ❌ Can be NULL
  price_yearly NUMERIC(10,2),            -- ❌ Can be NULL
  price_model VARCHAR(50) DEFAULT 'per_seat',  -- ❌ No CHECK constraint
  features_included JSONB DEFAULT '[]'::jsonb,
  user_limit INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ❌ No UNIQUE constraint on (tool_id, tier_order)
```

**Discovered Issues:**

1. **NULL Prices Cause NaN:**
```javascript
// api/server.js:745-760
let monthlyCost = 0;
if (tier.price_model === 'per_seat') {
  monthlyCost = (Number(tier.price_monthly) || 0) * teamSizeNum;
  // If tier.price_monthly is NULL → Number(NULL) = 0
  // But database query can return null → causes NaN
}
```

2. **No UNIQUE Constraint on (tool_id, tier_order):**
```sql
-- Currently ALLOWED:
INSERT INTO subscription_tiers (tool_id, tier_order) VALUES (1, 1);
INSERT INTO subscription_tiers (tool_id, tier_order) VALUES (1, 1);  -- DUPLICATE!
-- Result: Same tool has two "order 1" tiers
```

3. **price_model Not Validated:**
```sql
-- Currently ALLOWED:
INSERT INTO subscription_tiers (price_model) VALUES ('free_forever');  -- Invalid!
INSERT INTO subscription_tiers (price_model) VALUES ('custom_pricing');  -- Invalid!
-- Only valid: 'per_seat', 'flat', 'usage_based'
```

4. **Race Condition in Tier Inserts (api/server.js:500-518):**
```javascript
// No ON CONFLICT handling
const tierResult = await client.query(
  `INSERT INTO subscription_tiers (...) VALUES (...) RETURNING *`,
  [...]
);
// Concurrent requests for same tool → duplicate tiers
```

## Proposed Solutions

### Option 1: Add Constraints + Fix Concurrent Inserts (Recommended)

**Approach:** Add all missing constraints and handle conflicts.

```sql
-- 1. Add NOT NULL constraints
ALTER TABLE subscription_tiers
  ALTER COLUMN price_monthly SET NOT NULL,
  ALTER COLUMN price_yearly SET NOT NULL,
  ALTER COLUMN price_model SET NOT NULL;

-- 2. Add UNIQUE constraint
ALTER TABLE subscription_tiers
  ADD CONSTRAINT unique_tool_tier_order UNIQUE (tool_id, tier_order);

-- 3. Add CHECK constraint for price_model
ALTER TABLE subscription_tiers
  ADD CONSTRAINT check_price_model
    CHECK (price_model IN ('per_seat', 'flat', 'usage_based'));

-- 4. Add CHECK constraints for positive prices
ALTER TABLE subscription_tiers
  ADD CONSTRAINT check_price_monthly_positive CHECK (price_monthly >= 0),
  ADD CONSTRAINT check_price_yearly_positive CHECK (price_yearly >= 0);
```

**Fix INSERT query to handle conflicts:**
```javascript
// api/server.js:500-518
const tierResult = await client.query(
  `INSERT INTO subscription_tiers (
    tool_id, tier_name, tier_order, price_monthly, price_yearly, price_model, user_limit, notes
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  ON CONFLICT (tool_id, tier_order)
  DO UPDATE SET
    tier_name = EXCLUDED.tier_name,
    price_monthly = EXCLUDED.price_monthly,
    price_yearly = EXCLUDED.price_yearly,
    price_model = EXCLUDED.price_model,
    user_limit = EXCLUDED.user_limit,
    notes = EXCLUDED.notes
  RETURNING *`,
  [toolId, tier.tier_name, tier.tier_order, tier.price_monthly, tier.price_yearly, tier.price_model, tier.user_limit, tier.notes]
);
```

**Pros:**
- Prevents all identified data corruption scenarios
- Database enforces integrity (not application)
- Handles race conditions gracefully
- Standard SQL best practices

**Cons:**
- Requires data migration for existing NULL values
- Breaks if API tries to insert NULL prices

**Effort:** 1-2 hours

**Risk:** Low (with proper migration)

---

### Option 2: Application-Level Validation Only

**Approach:** Add validation in application code before INSERT.

```javascript
// Validate before INSERT
if (!tier.price_monthly || !tier.price_yearly) {
  throw new Error('Price fields are required');
}
if (!['per_seat', 'flat', 'usage_based'].includes(tier.price_model)) {
  throw new Error('Invalid price_model');
}
// ... check for duplicates
```

**Pros:**
- No database migration needed
- Easier to modify validation rules

**Cons:**
- Can be bypassed (SQL console, other apps)
- No guarantee of data integrity
- Must duplicate validation everywhere
- Race conditions still possible

**Effort:** 30 minutes

**Risk:** Medium (not foolproof)

---

### Option 3: Soft Constraints + Cleanup Script

**Approach:** Add constraints but use CHECK with OR NULL for transition.

**Pros:**
- Gradual migration
- Doesn't break existing data

**Cons:**
- Temporary solution only
- Still allows bad data during transition

**Effort:** 2 hours

**Risk:** Medium

## Recommended Action

**TO BE FILLED DURING TRIAGE**

Recommended: Option 1 (full constraints) with migration plan:
1. Audit existing data for NULLs/duplicates
2. Clean up bad data
3. Add constraints
4. Update INSERT queries with ON CONFLICT
5. Test concurrent inserts

## Technical Details

**Affected files:**
- `api/server.js:128-142` - Schema creation
- `api/server.js:500-518` - Tier insertion
- `api/server.js:745-760` - Cost calculation

**Database migration required:**
```sql
-- Check for existing NULL prices
SELECT * FROM subscription_tiers
WHERE price_monthly IS NULL OR price_yearly IS NULL;

-- Check for duplicate tier orders
SELECT tool_id, tier_order, COUNT(*)
FROM subscription_tiers
GROUP BY tool_id, tier_order
HAVING COUNT(*) > 1;

-- Clean up duplicates (keep lowest ID)
DELETE FROM subscription_tiers
WHERE id NOT IN (
  SELECT MIN(id)
  FROM subscription_tiers
  GROUP BY tool_id, tier_order
);

-- Set default prices for NULLs (if needed)
UPDATE subscription_tiers
SET price_monthly = 0, price_yearly = 0
WHERE price_monthly IS NULL OR price_yearly IS NULL;
```

**Related components:**
- Cost calculator (depends on non-NULL prices)
- Tier selector (depends on unique tier orders)
- API responses (assumes valid data)

## Resources

- **Data Integrity Review:** Full analysis of database issues
- **PostgreSQL Docs:** [Table Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- **PostgreSQL Docs:** [INSERT ON CONFLICT](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT)
- **SQL Best Practices:** [Database Design](https://www.sqlstyle.guide/)

## Acceptance Criteria

- [ ] NOT NULL constraints added for price_monthly, price_yearly, price_model
- [ ] UNIQUE constraint added for (tool_id, tier_order)
- [ ] CHECK constraint added for price_model enum values
- [ ] CHECK constraints added for positive prices
- [ ] All existing data migrated (no NULL prices, no duplicates)
- [ ] INSERT queries use ON CONFLICT DO UPDATE
- [ ] Test concurrent inserts (no duplicates created)
- [ ] Test NULL price rejection (INSERT fails)
- [ ] Test invalid price_model rejection (INSERT fails)
- [ ] All cost calculations return valid numbers (no NaN)
- [ ] Frontend handles constraint violation errors gracefully

## Work Log

### 2025-12-15 - Initial Discovery

**By:** Claude Code (Data Integrity Guardian Agent)

**Actions:**
- Comprehensive audit of database schema and queries
- Identified 4 missing constraint types
- Found race condition in concurrent inserts
- Traced NaN calculations to NULL prices
- Drafted migration plan for existing data
- Created 3 solution approaches

**Learnings:**
- Missing constraints allow duplicate data
- NULL prices propagate through calculations as NaN
- PostgreSQL ON CONFLICT handles race conditions
- CHECK constraints prevent invalid enum values
- Database constraints > application validation

---

## Notes

- **BLOCKING ISSUE** for production (data corruption risk)
- Run migration on staging first
- Backup database before adding constraints
- Monitor for constraint violation errors after deployment
- Consider adding updated_at trigger for audit trail
- Add database health checks for constraint violations
