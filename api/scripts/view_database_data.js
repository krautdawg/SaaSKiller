import { pool } from '../db.js';

async function viewDatabaseData() {
  const client = await pool.connect();

  try {
    console.log('🔍 Querying database tables...\n');

    // Count total tools
    const toolsCountResult = await client.query('SELECT COUNT(*) FROM tools');
    const toolsCount = toolsCountResult.rows[0].count;
    console.log(`📊 Total tools in database: ${toolsCount}\n`);

    if (toolsCount > 0) {
      // Get all tools with basic info
      console.log('🔧 TOOLS DATA:');
      const toolsResult = await client.query(`
        SELECT 
          id, 
          name, 
          slug, 
          category, 
          monthly_cost, 
          short_description,
          created_at, 
          updated_at 
        FROM tools 
        ORDER BY created_at DESC
      `);
      
      toolsResult.rows.forEach(tool => {
        console.log(`  ID: ${tool.id}`);
        console.log(`  Name: ${tool.name}`);
        console.log(`  Slug: ${tool.slug}`);
        console.log(`  Category: ${tool.category}`);
        console.log(`  Monthly Cost: $${tool.monthly_cost}`);
        console.log(`  Created: ${tool.created_at}`);
        console.log(`  Updated: ${tool.updated_at}`);
        console.log(`  Description: ${tool.short_description ? tool.short_description.substring(0, 60) + '...' : 'N/A'}`);
        console.log('  ---');
      });
    }

    // Count total leads
    const leadsCountResult = await client.query('SELECT COUNT(*) FROM leads');
    const leadsCount = leadsCountResult.rows[0].count;
    console.log(`\n📧 Total leads in database: ${leadsCount}\n`);

    if (leadsCount > 0) {
      // Get recent leads
      console.log('📈 RECENT LEADS DATA:');
      const leadsResult = await client.query(`
        SELECT 
          id, 
          email, 
          tool_name, 
          bleed_amount, 
          created_at 
        FROM leads 
        ORDER BY created_at DESC 
        LIMIT 10
      `);
      
      leadsResult.rows.forEach(lead => {
        console.log(`  ID: ${lead.id}`);
        console.log(`  Email: ${lead.email}`);
        console.log(`  Tool: ${lead.tool_name}`);
        console.log(`  Bleed Amount: $${lead.bleed_amount}`);
        console.log(`  Created: ${lead.created_at}`);
        console.log('  ---');
      });
    }

    // Count subscription tiers
    const tiersCountResult = await client.query('SELECT COUNT(*) FROM subscription_tiers');
    const tiersCount = tiersCountResult.rows[0].count;
    console.log(`\n💳 Total subscription tiers: ${tiersCount}\n`);

    if (tiersCount > 0) {
      // Show sample subscription tiers
      console.log('💰 SAMPLE SUBSCRIPTION TIERS:');
      const tiersResult = await client.query(`
        SELECT 
          st.id,
          st.tool_id,
          t.name as tool_name,
          st.tier_name,
          st.price_monthly,
          st.price_yearly,
          st.price_model,
          st.user_limit,
          st.created_at
        FROM subscription_tiers st
        LEFT JOIN tools t ON st.tool_id = t.id
        ORDER BY st.created_at DESC
        LIMIT 10
      `);
      
      tiersResult.rows.forEach(tier => {
        console.log(`  Tier ID: ${tier.id}`);
        console.log(`  Tool: ${tier.tool_name} (ID: ${tier.tool_id})`);
        console.log(`  Tier Name: ${tier.tier_name}`);
        console.log(`  Price Monthly: $${tier.price_monthly}`);
        console.log(`  Price Yearly: $${tier.price_yearly}`);
        console.log(`  Model: ${tier.price_model}`);
        console.log(`  Limit: ${tier.user_limit ? `${tier.user_limit} users` : 'Unlimited'}`);
        console.log(`  Created: ${tier.created_at}`);
        console.log('  ---');
      });
    }

    // Count categories
    const categoriesCountResult = await client.query('SELECT COUNT(*) FROM categories');
    const categoriesCount = categoriesCountResult.rows[0].count;
    console.log(`\n🏷️  Total categories: ${categoriesCount}\n`);

    if (categoriesCount > 0) {
      // Get all categories
      console.log('📂 CATEGORIES:');
      const categoriesResult = await client.query(`
        SELECT 
          id, 
          name, 
          slug, 
          icon, 
          display_order,
          created_at 
        FROM categories 
        ORDER BY display_order ASC
      `);
      
      categoriesResult.rows.forEach(cat => {
        console.log(`  ID: ${cat.id}`);
        console.log(`  Name: ${cat.name}`);
        console.log(`  Slug: ${cat.slug}`);
        console.log(`  Icon: ${cat.icon}`);
        console.log(`  Order: ${cat.display_order}`);
        console.log('  ---');
      });
    }

  } catch (error) {
    console.error('❌ Error querying database:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the function
viewDatabaseData();