# CRITICAL FIXES CHECKLIST
**Must complete before merging feat/postable-redesign-subscription-tiers**

## Priority 1: Data Loss Prevention (Complete First)

- [ ] **Create proper migration files with rollback capability**
  - File: `migrations/001_add_subscription_tiers_up.sql`
  - File: `migrations/001_add_subscription_tiers_down.sql`
  - Test rollback on staging environment

- [ ] **Add NOT NULL constraints to prevent NULL pricing**
  ```sql
  ALTER TABLE subscription_tiers
    ALTER COLUMN price_monthly SET NOT NULL,
    ALTER COLUMN price_yearly SET NOT NULL,
    ALTER COLUMN price_model SET NOT NULL,
    ALTER COLUMN features_included SET NOT NULL;
  ```

- [ ] **Add UNIQUE constraints to prevent duplicate tiers**
  ```sql
  ALTER TABLE subscription_tiers
    ADD CONSTRAINT unique_tool_tier_order UNIQUE (tool_id, tier_order),
    ADD CONSTRAINT unique_tool_tier_name UNIQUE (tool_id, tier_name);
  ```

- [ ] **Replace ON DELETE CASCADE with ON DELETE RESTRICT**
  ```sql
  -- Requires dropping and recreating foreign key
  ALTER TABLE subscription_tiers
    DROP CONSTRAINT subscription_tiers_tool_id_fkey,
    ADD CONSTRAINT subscription_tiers_tool_id_fkey
      FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE RESTRICT;
  ```

## Priority 2: Race Conditions & Concurrency

- [ ] **Add transaction isolation level**
  ```javascript
  // In server.js line 466
  await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
  ```

- [ ] **Implement UPSERT for subscription tiers**
  ```javascript
  // In server.js lines 500-518
  INSERT INTO subscription_tiers (...)
  VALUES (...)
  ON CONFLICT (tool_id, tier_order)
  DO UPDATE SET ...
  ```

- [ ] **Add advisory lock for tool creation**
  ```javascript
  // Before tool INSERT
  await client.query('SELECT pg_advisory_xact_lock($1)', [hashCode(slug)]);
  ```

## Priority 3: Data Validation

- [ ] **Add CHECK constraints for price_model**
  ```sql
  ALTER TABLE subscription_tiers
    ADD CONSTRAINT valid_price_model
      CHECK (price_model IN ('per_seat', 'flat', 'usage_based'));
  ```

- [ ] **Add CHECK constraints for prices**
  ```sql
  ALTER TABLE subscription_tiers
    ADD CONSTRAINT valid_prices
      CHECK (price_monthly >= 0 AND price_yearly >= 0);
  ```

- [ ] **Add JSONB structure validation function**
  ```javascript
  // Create validateFeatures() function in server.js
  function validateFeatures(features, featureType) {
    // Validate each feature has: id, name, description, icon, priority
  }
  ```

## Priority 4: Financial Accuracy

- [ ] **Replace floating-point math with Decimal library**
  ```bash
  npm install decimal.js
  ```
  ```javascript
  import Decimal from 'decimal.js';
  // Replace all cost calculations
  ```

- [ ] **Add price validation in calculate-cost endpoint**
  ```javascript
  if (tier.price_monthly === null || tier.price_yearly === null) {
    throw new Error('Invalid tier pricing');
  }
  ```

## Priority 5: Data Consistency

- [ ] **Fix COALESCE usage across all queries**
  - Line 425 (search endpoint) - Already correct ✓
  - Line 525 (after insert) - Already correct ✓
  - Line 666 (saas-tools list) - NEEDS FIX
  - Line 710 (get single tool) - NEEDS FIX

- [ ] **Add JSONB indexes for performance**
  ```sql
  CREATE INDEX idx_tools_core_features ON tools USING GIN (core_features);
  CREATE INDEX idx_tools_bloaty_features ON tools USING GIN (bloaty_features);
  ```

- [ ] **Add updated_at trigger for subscription_tiers**
  ```sql
  ALTER TABLE subscription_tiers ADD COLUMN updated_at TIMESTAMP;
  CREATE TRIGGER update_subscription_tiers_updated_at ...
  ```

## Priority 6: GDPR Compliance

- [ ] **Add privacy fields to leads table**
  ```sql
  ALTER TABLE leads
    ADD COLUMN consent_given BOOLEAN DEFAULT false,
    ADD COLUMN deleted_at TIMESTAMP,
    ADD COLUMN anonymized_at TIMESTAMP;
  ```

- [ ] **Create anonymization function**
  ```sql
  CREATE FUNCTION anonymize_lead(lead_id INTEGER) ...
  ```

## Testing Checklist

Before marking as complete, test:

- [ ] **Migration rollback test**
  1. Run up migration
  2. Insert test data
  3. Run down migration
  4. Verify data is gone
  5. Run up migration again
  6. Verify schema is correct

- [ ] **Concurrent insert test**
  1. Start two API searches for same tool simultaneously
  2. Verify only ONE tool is created
  3. Verify no duplicate tiers

- [ ] **NULL price handling test**
  1. Manually insert tier with NULL price_monthly
  2. Verify INSERT is rejected (after adding constraint)

- [ ] **JSONB validation test**
  1. Send malformed feature data
  2. Verify validation error is returned
  3. Verify data is NOT inserted

- [ ] **Precision test**
  1. Calculate cost for 7 users at $19.99/user
  2. Verify result is exactly $139.93
  3. Verify no floating-point errors

- [ ] **COALESCE test**
  1. Create tool with no tiers
  2. Query via /api/saas-tools
  3. Verify subscription_tiers = [] (not null)

## Deployment Steps

1. [ ] **Backup production database**
   ```bash
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. [ ] **Run migration on staging**
   ```bash
   psql $STAGING_DATABASE_URL -f migrations/001_add_subscription_tiers_up.sql
   ```

3. [ ] **Test staging thoroughly**
   - Run full test suite
   - Manual testing of all tier-related features

4. [ ] **Create rollback plan**
   - Document exact steps to rollback
   - Keep backup accessible for 7 days

5. [ ] **Deploy to production during low-traffic window**
   - Monitor error logs
   - Monitor database performance
   - Monitor API response times

6. [ ] **Post-deployment verification**
   - Check tier data integrity
   - Verify calculations are correct
   - Verify no duplicate tiers created

## Quick Reference: Critical Files

- `/home/tim/Desktop/saaskiller/api/server.js` (Lines to fix)
  - Line 74-125: Migration logic (needs up/down files)
  - Line 128-142: subscription_tiers table (needs constraints)
  - Line 466: Transaction start (needs isolation level)
  - Line 500-518: Tier inserts (needs UPSERT)
  - Line 666-677: COALESCE fix needed
  - Line 710-721: COALESCE fix needed
  - Line 770-780: Float math (needs Decimal library)

- `/home/tim/Desktop/saaskiller/DATA_INTEGRITY_REVIEW.md`
  - Full detailed review with all 26 issues

## Estimated Time to Complete

- Priority 1: 4 hours
- Priority 2: 3 hours
- Priority 3: 2 hours
- Priority 4: 3 hours
- Priority 5: 2 hours
- Priority 6: 2 hours
- Testing: 4 hours

**Total: ~20 hours (2.5 days)**

## Sign-off Required

- [ ] Developer: Code changes complete
- [ ] Reviewer: Data integrity review passed
- [ ] QA: All tests passed on staging
- [ ] DevOps: Rollback plan documented
- [ ] Product: Feature behavior verified
