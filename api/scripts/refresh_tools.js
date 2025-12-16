import { pool } from '../db.js';
import { callPerplexityAPI } from '../perplexity.js';

async function refreshAllTools() {
  const client = await pool.connect();

  try {
    console.log('🔄 Starting tool refresh...');

    // 1. Get all tools
    const toolsResult = await client.query('SELECT id, name FROM tools ORDER BY id ASC');
    const tools = toolsResult.rows;

    console.log(`📋 Found ${tools.length} tools to refresh.`);

    for (const tool of tools) {
      console.log(`
--------------------------------------------------`);
      console.log(`🔍 Refreshing tool: ${tool.name} (ID: ${tool.id})`);

      try {
        // 2. Call Perplexity API
        // Note: callPerplexityAPI has built-in retry/error handling? No, it throws.
        // We should add a small delay to avoid hitting rate limits hard if we have many tools
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        const toolData = await callPerplexityAPI(tool.name);

        // 3. Update Database in a transaction
        await client.query('BEGIN');

        // Update main tool record
        await client.query(
          `UPDATE tools 
           SET 
             website = $1,
             category = $2,
             logo_url = $3,
             short_description = $4,
             core_features = $5,
             bloaty_features = $6,
             updated_at = NOW(),
             -- Update legacy fields too
             monthly_cost = $7,
             features = $8,
             description = $9
           WHERE id = $10`,
          [
            toolData.website || '',
            toolData.category || 'productivity',
            toolData.logo_url,
            toolData.short_description || '',
            JSON.stringify(toolData.core_features),
            JSON.stringify(toolData.bloaty_features),
            // Legacy fields
            toolData.subscription_tiers.find(t => t.tier_order === 1)?.price_monthly || 0,
            JSON.stringify([
              ...toolData.core_features.map(f => ({ name: f.name, type: 'core' })),
              ...toolData.bloaty_features.map(f => ({ name: f.name, type: 'bloat' }))
            ]),
            toolData.short_description || '',
            tool.id
          ]
        );

        // Update Subscription Tiers
        // Strategy: Delete existing tiers for this tool and re-insert them.
        // This handles cases where tiers might have been removed or renamed.
        await client.query('DELETE FROM subscription_tiers WHERE tool_id = $1', [tool.id]);

        for (const tier of toolData.subscription_tiers) {
          await client.query(
            `INSERT INTO subscription_tiers
             (tool_id, tier_name, tier_order, price_monthly, price_yearly,
              price_model, user_limit, notes)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              tool.id,
              tier.tier_name,
              tier.tier_order,
              tier.price_monthly || 0,
              tier.price_yearly || 0,
              tier.price_model || 'per_seat',
              tier.user_limit,
              tier.notes || ''
            ]
          );
        }

        await client.query('COMMIT');
        console.log(`✅ Successfully updated ${tool.name}`);

      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Failed to update ${tool.name}:`, error.message);
        // Continue to next tool
      }
    }

    console.log('\n✨ Refresh complete!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the function
refreshAllTools();
