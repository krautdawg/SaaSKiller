import dotenv from 'dotenv';
import { pool } from '../db.js';
import { callPerplexityAPI } from '../perplexity.js';

dotenv.config();

// Top 100 SaaS tools with categories based on SMB usage ranking
const top100Tools = [
  { rank: 1, name: 'Microsoft 365', category: 'productivity' },
  { rank: 2, name: 'Google Workspace', category: 'productivity' },
  { rank: 3, name: 'Microsoft Teams', category: 'communication' },
  { rank: 4, name: 'Zoom', category: 'communication' },
  { rank: 5, name: 'Slack', category: 'communication' },
  { rank: 6, name: 'Google Drive', category: 'productivity' },
  { rank: 7, name: 'Dropbox', category: 'productivity' },
  { rank: 8, name: 'OneDrive for Business', category: 'productivity' },
  { rank: 9, name: 'Google Meet', category: 'communication' },
  { rank: 10, name: 'QuickBooks Online', category: 'finance' },
  { rank: 11, name: 'Xero', category: 'finance' },
  { rank: 12, name: 'Shopify', category: 'finance' },
  { rank: 13, name: 'Stripe', category: 'finance' },
  { rank: 14, name: 'PayPal', category: 'finance' },
  { rank: 15, name: 'Square', category: 'finance' },
  { rank: 16, name: 'HubSpot CRM', category: 'sales-crm' },
  { rank: 17, name: 'Salesforce Sales Cloud', category: 'sales-crm' },
  { rank: 18, name: 'Pipedrive', category: 'sales-crm' },
  { rank: 19, name: 'Zoho CRM', category: 'sales-crm' },
  { rank: 20, name: 'Mailchimp', category: 'marketing' },
  { rank: 21, name: 'Brevo', category: 'marketing' },
  { rank: 22, name: 'ActiveCampaign', category: 'marketing' },
  { rank: 23, name: 'Klaviyo', category: 'marketing' },
  { rank: 24, name: 'Canva', category: 'design' },
  { rank: 25, name: 'DocuSign', category: 'productivity' },
  { rank: 26, name: 'Adobe Acrobat Sign', category: 'productivity' },
  { rank: 27, name: 'Notion', category: 'productivity' },
  { rank: 28, name: 'Trello', category: 'project-management' },
  { rank: 29, name: 'Asana', category: 'project-management' },
  { rank: 30, name: 'monday.com', category: 'project-management' },
  { rank: 31, name: 'ClickUp', category: 'project-management' },
  { rank: 32, name: 'Jira Software Cloud', category: 'development' },
  { rank: 33, name: 'Confluence Cloud', category: 'productivity' },
  { rank: 34, name: 'Airtable', category: 'productivity' },
  { rank: 35, name: 'Smartsheet', category: 'project-management' },
  { rank: 36, name: 'Basecamp', category: 'project-management' },
  { rank: 37, name: 'Zendesk', category: 'communication' },
  { rank: 38, name: 'Freshdesk', category: 'communication' },
  { rank: 39, name: 'Intercom', category: 'communication' },
  { rank: 40, name: 'Help Scout', category: 'communication' },
  { rank: 41, name: 'Gorgias', category: 'communication' },
  { rank: 42, name: 'Google Analytics 4', category: 'analytics' },
  { rank: 43, name: 'Hotjar', category: 'analytics' },
  { rank: 44, name: 'Mixpanel', category: 'analytics' },
  { rank: 45, name: 'Amplitude', category: 'analytics' },
  { rank: 46, name: 'Looker Studio', category: 'analytics' },
  { rank: 47, name: 'Power BI', category: 'analytics' },
  { rank: 48, name: 'Figma', category: 'design' },
  { rank: 49, name: 'Miro', category: 'design' },
  { rank: 50, name: 'Lucidchart', category: 'design' },
  { rank: 51, name: 'Calendly', category: 'productivity' },
  { rank: 52, name: 'Acuity Scheduling', category: 'productivity' },
  { rank: 53, name: 'Typeform', category: 'productivity' },
  { rank: 54, name: 'SurveyMonkey', category: 'productivity' },
  { rank: 55, name: 'Jotform', category: 'productivity' },
  { rank: 56, name: 'Zapier', category: 'productivity' },
  { rank: 57, name: 'Make', category: 'productivity' },
  { rank: 58, name: 'Hootsuite', category: 'marketing' },
  { rank: 59, name: 'Buffer', category: 'marketing' },
  { rank: 60, name: 'Sprout Social', category: 'marketing' },
  { rank: 61, name: 'SEMrush', category: 'marketing' },
  { rank: 62, name: 'Ahrefs', category: 'marketing' },
  { rank: 63, name: 'Wix', category: 'development' },
  { rank: 64, name: 'Squarespace', category: 'development' },
  { rank: 65, name: 'Webflow', category: 'development' },
  { rank: 66, name: 'WordPress.com', category: 'development' },
  { rank: 67, name: 'Amazon Web Services (AWS)', category: 'development' },
  { rank: 68, name: 'Microsoft Azure', category: 'development' },
  { rank: 69, name: 'Google Cloud Platform (GCP)', category: 'development' },
  { rank: 70, name: 'Cloudflare', category: 'development' },
  { rank: 71, name: 'GitHub', category: 'development' },
  { rank: 72, name: 'GitLab', category: 'development' },
  { rank: 73, name: '1Password', category: 'development' },
  { rank: 74, name: 'Okta', category: 'development' },
  { rank: 75, name: 'KnowBe4', category: 'development' },
  { rank: 76, name: 'CrowdStrike Falcon', category: 'development' },
  { rank: 77, name: 'Cisco Meraki', category: 'development' },
  { rank: 78, name: 'Jamf Pro', category: 'development' },
  { rank: 79, name: 'Gusto', category: 'hr-recruiting' },
  { rank: 80, name: 'ADP Workforce Now', category: 'hr-recruiting' },
  { rank: 81, name: 'Rippling', category: 'hr-recruiting' },
  { rank: 82, name: 'Paychex Flex', category: 'hr-recruiting' },
  { rank: 83, name: 'BambooHR', category: 'hr-recruiting' },
  { rank: 84, name: 'Personio', category: 'hr-recruiting' },
  { rank: 85, name: 'Deel', category: 'hr-recruiting' },
  { rank: 86, name: 'Expensify', category: 'finance' },
  { rank: 87, name: 'SAP Concur', category: 'finance' },
  { rank: 88, name: 'Pleo', category: 'finance' },
  { rank: 89, name: 'Spendesk', category: 'finance' },
  { rank: 90, name: 'ShipStation', category: 'finance' },
  { rank: 91, name: 'Procore', category: 'project-management' },
  { rank: 92, name: 'ServiceTitan', category: 'sales-crm' },
  { rank: 93, name: 'Jobber', category: 'project-management' },
  { rank: 94, name: 'Housecall Pro', category: 'project-management' },
  { rank: 95, name: 'Toast POS', category: 'finance' },
  { rank: 96, name: 'Lightspeed Retail', category: 'finance' },
  { rank: 97, name: 'Mindbody', category: 'sales-crm' },
  { rank: 98, name: 'Clio', category: 'project-management' },
  { rank: 99, name: 'Buildium', category: 'project-management' },
  { rank: 100, name: 'DATEV Unternehmen online', category: 'finance' }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripCodeFences(text) {
  let cleaned = String(text || '').trim();
  if (!cleaned.startsWith('```')) return cleaned;
  cleaned = cleaned.replace(/```json\s*/gi, '```');
  cleaned = cleaned.replace(/^```/g, '').replace(/```$/g, '').trim();
  return cleaned;
}

function tryParseJsonArray(content) {
  const cleaned = stripCodeFences(content);
  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      const parsed = JSON.parse(cleaned.slice(start, end + 1));
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
}

async function translateStringsToGerman(strings, contextLabel) {
  if (!strings.length) return [];

  const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
  const MODEL = process.env.PERPLEXITY_TRANSLATION_MODEL || 'sonar-pro';

  const payload = {
    model: MODEL,
    temperature: 0.1,
    messages: [
      {
        role: 'system',
        content: 'You are a professional UI translator. Return ONLY valid JSON with no extra text.'
      },
      {
        role: 'user',
        content:
          `Translate the following strings to German (de-DE). Keep them concise and natural for a SaaS UI.\n` +
          `Return ONLY a JSON array of strings with the exact same length and order.\n` +
          `Context: ${contextLabel}\n\n` +
          `${JSON.stringify(strings)}`
      }
    ]
  };

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Perplexity translation error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  const translations = tryParseJsonArray(content);

  if (!translations || translations.length !== strings.length) {
    console.warn(`⚠ Translation mismatch for ${contextLabel}, using originals`);
    return strings;
  }

  return translations.map((t, idx) => (typeof t === 'string' && t.trim() ? t.trim() : strings[idx]));
}

async function insertToolWithTranslation(toolData, rank) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const slug = generateSlug(toolData.name);
    const popularityScore = 101 - rank;

    // Check if tool already exists
    const existingTool = await client.query(
      'SELECT id FROM tools WHERE slug = $1',
      [slug]
    );

    if (existingTool.rows.length > 0) {
      console.log(`  ⚠ Tool already exists, skipping: ${toolData.name}`);
      await client.query('ROLLBACK');
      return { skipped: true };
    }

    // Insert English version
    const toolResult = await client.query(
      `INSERT INTO tools
       (name, slug, website, category, logo_url, short_description,
        core_features, bloaty_features, is_published, popularity_score,
        monthly_cost, features, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9, $10, $11, $12)
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
        popularityScore,
        toolData.subscription_tiers.find(t => t.tier_order === 1)?.price_monthly || 0,
        JSON.stringify([
          ...toolData.core_features.map(f => ({ name: f.name, type: 'core' })),
          ...toolData.bloaty_features.map(f => ({ name: f.name, type: 'bloat' }))
        ]),
        toolData.short_description || ''
      ]
    );

    const toolId = toolResult.rows[0].id;

    // Insert subscription tiers
    for (const tier of toolData.subscription_tiers) {
      await client.query(
        `INSERT INTO subscription_tiers
         (tool_id, tier_name, tier_order, price_monthly, price_yearly,
          price_model, user_limit, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          toolId,
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

    // Now translate to German
    console.log(`  🇩🇪 Translating to German...`);

    // Translate descriptions
    await sleep(1500);
    const [shortDescriptionDe] = await translateStringsToGerman(
      [toolData.short_description],
      `${toolData.name} (short_description)`
    );

    await sleep(1500);
    const [descriptionDe] = await translateStringsToGerman(
      [toolData.short_description], // Use short_description as description
      `${toolData.name} (description)`
    );

    // Translate core features
    if (toolData.core_features.length > 0) {
      await sleep(1500);
      const coreNames = toolData.core_features.map(f => f.name);
      const translatedCoreNames = await translateStringsToGerman(
        coreNames,
        `${toolData.name} (core feature names)`
      );

      await sleep(1500);
      const coreDescriptions = toolData.core_features.map(f => f.description);
      const translatedCoreDescriptions = await translateStringsToGerman(
        coreDescriptions,
        `${toolData.name} (core feature descriptions)`
      );

      const coreFeaturesDe = toolData.core_features.map((f, idx) => ({
        ...f,
        name: translatedCoreNames[idx] || f.name,
        description: translatedCoreDescriptions[idx] || f.description
      }));

      await client.query(
        `UPDATE tools SET core_features_de = $1 WHERE id = $2`,
        [JSON.stringify(coreFeaturesDe), toolId]
      );
    }

    // Translate bloaty features
    if (toolData.bloaty_features.length > 0) {
      await sleep(1500);
      const bloatyNames = toolData.bloaty_features.map(f => f.name);
      const translatedBloatyNames = await translateStringsToGerman(
        bloatyNames,
        `${toolData.name} (bloaty feature names)`
      );

      await sleep(1500);
      const bloatyDescriptions = toolData.bloaty_features.map(f => f.description);
      const translatedBloatyDescriptions = await translateStringsToGerman(
        bloatyDescriptions,
        `${toolData.name} (bloaty feature descriptions)`
      );

      const bloatyFeaturesDe = toolData.bloaty_features.map((f, idx) => ({
        ...f,
        name: translatedBloatyNames[idx] || f.name,
        description: translatedBloatyDescriptions[idx] || f.description
      }));

      await client.query(
        `UPDATE tools SET bloaty_features_de = $1 WHERE id = $2`,
        [JSON.stringify(bloatyFeaturesDe), toolId]
      );
    }

    // Translate subscription tiers
    const { rows: tiers } = await client.query(
      `SELECT id, tier_name, notes FROM subscription_tiers WHERE tool_id = $1 ORDER BY tier_order ASC`,
      [toolId]
    );

    if (tiers.length > 0) {
      await sleep(1500);
      const tierNames = tiers.map(t => t.tier_name);
      const translatedTierNames = await translateStringsToGerman(
        tierNames,
        `${toolData.name} (tier names)`
      );

      await sleep(1500);
      const tierNotes = tiers.map(t => t.notes || '');
      const translatedTierNotes = await translateStringsToGerman(
        tierNotes,
        `${toolData.name} (tier notes)`
      );

      for (let i = 0; i < tiers.length; i++) {
        await client.query(
          `UPDATE subscription_tiers
           SET tier_name_de = $1, notes_de = $2
           WHERE id = $3`,
          [translatedTierNames[i], translatedTierNotes[i], tiers[i].id]
        );
      }
    }

    // Update German descriptions
    await client.query(
      `UPDATE tools
       SET short_description_de = $1, description_de = $2
       WHERE id = $3`,
      [shortDescriptionDe, descriptionDe, toolId]
    );

    return { inserted: true, toolId };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function seedTop100() {
  console.log('🚀 Starting to seed top 100 SaaS tools with full data (English + German)\n');
  console.log('⚠️  This will take approximately 5-6 hours due to API rate limits\n');

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < top100Tools.length; i++) {
    const tool = top100Tools[i];

    console.log(`\n[${i + 1}/${top100Tools.length}] Processing #${tool.rank}: ${tool.name}`);

    try {
      // Call Perplexity API to get full tool data
      console.log(`  📡 Fetching data from Perplexity...`);
      const toolData = await callPerplexityAPI(tool.name);

      // Insert with translation
      const result = await insertToolWithTranslation(toolData, tool.rank);

      if (result.skipped) {
        skipped++;
      } else if (result.inserted) {
        inserted++;
        console.log(`  ✅ Successfully inserted with German translations`);
      }

      // Rate limiting: Wait between API calls
      // Perplexity + translations = ~10 API calls per tool
      // To stay safe, wait 3 minutes between tools
      if (i < top100Tools.length - 1) {
        const waitTime = 180000; // 3 minutes in milliseconds
        console.log(`  ⏳ Waiting 3 minutes before next tool...`);
        await sleep(waitTime);
      }

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errors++;

      // On error, wait a bit longer before continuing
      if (i < top100Tools.length - 1) {
        console.log(`  ⏳ Waiting 5 minutes after error...`);
        await sleep(300000); // 5 minutes
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Seeding complete!');
  console.log(`   Inserted: ${inserted}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${top100Tools.length}`);
  console.log('='.repeat(60) + '\n');
}

async function main() {
  try {
    await seedTop100();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Fatal:', error);
  process.exit(1);
});
