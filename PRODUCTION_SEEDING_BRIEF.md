# Production Database Seeding Brief: Top 100 SaaS Tools

## Objective
Populate the production database with the top 100 SaaS tools, each with complete English and German translations including features, pricing tiers, and descriptions.

## Prerequisites

### 1. Environment Variables Required
Ensure the following are set in Coolify environment variables:
- `PERPLEXITY_API_KEY` - Your Perplexity API key for AI-powered tool analysis
- `DATABASE_URL` - PostgreSQL connection string (should already be configured)

### 2. Files to Deploy
Commit and push these new script files to the repository:
```
api/scripts/seed-top100-test.js
api/scripts/seed-top100-full.js
```

## Execution Steps

### Step 1: Deploy Scripts to Production
```bash
# On local machine
git add api/scripts/seed-top100-*.js
git commit -m "Add top 100 SaaS tools seeding scripts"
git push origin main
```

Then redeploy the application in Coolify to ensure scripts are available.

### Step 2: Access Production Server
Choose one of these methods:

**Option A: Coolify Terminal**
- Navigate to your app in Coolify dashboard
- Click "Terminal" or "Console"

**Option B: Docker Exec**
```bash
ssh your-coolify-server
docker ps | grep saaskiller  # Find container ID
docker exec -it <container-id> sh
```

**Option C: SSH + Screen (Recommended for long-running process)**
```bash
ssh your-coolify-server
screen -S saas-seeding
docker exec -it <container-id> sh
```

### Step 3: Verify Environment
```bash
# Once inside the container
cd /app/api  # or your app directory

# Verify PERPLEXITY_API_KEY is set
echo $PERPLEXITY_API_KEY  # Should output your key

# Verify database connection
node -e "require('./db.js').pool.query('SELECT NOW()').then(r => console.log('DB OK:', r.rows[0]))"
```

### Step 4: Test with 3 Tools (REQUIRED)
```bash
# Test script runs ~2-3 minutes with first 3 tools
node scripts/seed-top100-test.js
```

**Expected output:**
```
🧪 Testing seeding script with 3 tools

[1/3] Processing #1: Microsoft 365
  📡 Fetching data from Perplexity...
  🇩🇪 Translating to German...
  ✅ Successfully inserted with German translations
  ⏳ Waiting 30 seconds before next tool...

[2/3] Processing #2: Google Workspace
  ...

============================================================
✅ Test complete!
   Inserted: 3
   Skipped: 0
   Errors: 0
============================================================
```

### Step 5: Run Full Seeding (100 Tools)
**⚠️ WARNING: This will run for 5-6 hours**

```bash
# If using screen, detach won't kill the process
node scripts/seed-top100-full.js

# To detach from screen: Ctrl+A, then D
# To reattach: screen -r saas-seeding
```

**Expected timeline:**
- Each tool: ~3 minutes (1 Perplexity call + ~8 translation calls)
- Total time: 100 tools × 3 min = ~5-6 hours
- Rate limiting: 3 min wait between tools to respect API limits

### Step 6: Monitor Progress
```bash
# In a new terminal, watch the database grow
docker exec -it <container-id> sh
psql $DATABASE_URL -c "SELECT COUNT(*), MAX(popularity_score) FROM tools WHERE is_published=true;"

# Expected counts as it runs:
# After 1 hour: ~20 tools
# After 3 hours: ~60 tools
# After 5-6 hours: 100 tools
```

## Expected Results

After completion, you should have:
- **100 tools** in the `tools` table with `is_published = true`
- **Popularity scores**: 100 (Microsoft 365) down to 1 (DATEV)
- **English data**: core_features, bloaty_features, short_description, description
- **German data**: core_features_de, bloaty_features_de, short_description_de, description_de
- **Pricing tiers**: 2-5 tiers per tool in `subscription_tiers` table with tier_name_de and notes_de

## Validation

### Database Queries
```sql
-- Count published tools
SELECT COUNT(*) FROM tools WHERE is_published = true;
-- Expected: 100

-- Check German translations exist
SELECT COUNT(*) FROM tools
WHERE is_published = true
  AND core_features_de IS NOT NULL
  AND short_description_de IS NOT NULL;
-- Expected: 100

-- Sample tool with all data
SELECT name, category, popularity_score,
       jsonb_array_length(core_features) as core_count,
       jsonb_array_length(core_features_de) as core_de_count,
       short_description_de
FROM tools
WHERE name = 'Microsoft 365';

-- Count subscription tiers
SELECT COUNT(*) FROM subscription_tiers;
-- Expected: 200-500 (2-5 tiers per 100 tools)
```

### API Validation
```bash
# Test the browse tools endpoint
curl "https://saas-killer.com/api/saas-tools?page=1&limit=10" | jq '.tools[0]'

# Test German localization
curl "https://saas-killer.com/api/saas-tools?page=1&limit=10&lang=de" | jq '.tools[0].core_features_de'
```

## Troubleshooting

### Issue: "PERPLEXITY_API_KEY not configured"
**Solution:**
```bash
# Verify environment variable in Coolify
# Or set temporarily for testing:
export PERPLEXITY_API_KEY="your-key-here"
```

### Issue: Rate limit errors (429)
**Solution:** Script already has 3-minute delays. If you still hit limits:
- Edit script to increase wait time from 180000ms to 300000ms (5 min)

### Issue: Database connection errors
**Solution:**
```bash
# Check DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

### Issue: Process killed/container restarted
**Solution:**
- Use `screen` or `tmux` to survive disconnects
- Check where it stopped: `SELECT COUNT(*) FROM tools WHERE is_published=true;`
- Comment out already-processed tools in the script array and re-run

### Issue: Translation failures
**Solution:**
- Script will continue on translation errors, using English as fallback
- Check logs for "⚠ Translation mismatch" warnings
- Can re-run translation script later: `node scripts/translate_features_to_german.js --force`

## Rollback Procedure

If you need to rollback and start over:

```sql
-- Delete all seeded tools (be careful!)
DELETE FROM subscription_tiers WHERE tool_id IN (
  SELECT id FROM tools WHERE popularity_score > 0
);
DELETE FROM tools WHERE popularity_score > 0;
```

## Post-Deployment Verification

1. **Visit Browse Tools page**: https://saas-killer.com/browse-tools
2. **Verify 100 tools appear** sorted by popularity
3. **Switch language to German** and verify translations appear
4. **Test a few tools**: Click into tool detail pages and verify:
   - Core features display
   - Bloaty features display
   - Pricing tiers show correctly
   - German translations work

## Success Criteria

✅ 100 tools inserted with is_published=true
✅ All tools have popularity_score 1-100
✅ All tools have core_features (10-50 features each)
✅ All tools have bloaty_features (5-20 features each)
✅ All tools have German translations
✅ All tools have 2-5 subscription tiers
✅ Browse tools page shows all 100 tools
✅ German language switch works correctly

## Estimated Costs

- **API calls**: ~1,000 Perplexity API calls (100 tools × 10 calls each)
- **Cost**: ~$10-20 depending on Perplexity pricing tier
- **Time**: 5-6 hours of server runtime

## Contact

If you encounter issues during execution, check:
1. Container logs: `docker logs <container-id>`
2. Database logs: Check Coolify database service logs
3. Script output for specific error messages

---

**Ready to proceed?** Start with Step 1 and work through sequentially.
