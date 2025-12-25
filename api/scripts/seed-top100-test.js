import dotenv from 'dotenv';
import { pool } from '../db.js';
import { callPerplexityAPI } from '../perplexity.js';

dotenv.config();

// Test with first 3 tools only
const testTools = [
  { rank: 1, name: 'Microsoft 365', category: 'productivity' },
  { rank: 2, name: 'Google Workspace', category: 'productivity' },
  { rank: 3, name: 'Microsoft Teams', category: 'communication' }
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
      [toolData.short_description],
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

async function seedTest() {
  console.log('🧪 Testing seeding script with 3 tools\n');

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < testTools.length; i++) {
    const tool = testTools[i];

    console.log(`\n[${i + 1}/${testTools.length}] Processing #${tool.rank}: ${tool.name}`);

    try {
      console.log(`  📡 Fetching data from Perplexity...`);
      const toolData = await callPerplexityAPI(tool.name);

      const result = await insertToolWithTranslation(toolData, tool.rank);

      if (result.skipped) {
        skipped++;
      } else if (result.inserted) {
        inserted++;
        console.log(`  ✅ Successfully inserted with German translations`);
      }

      // Wait 30 seconds between tools in test mode
      if (i < testTools.length - 1) {
        console.log(`  ⏳ Waiting 30 seconds before next tool...`);
        await sleep(30000);
      }

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Test complete!');
  console.log(`   Inserted: ${inserted}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log('='.repeat(60) + '\n');
}

async function main() {
  try {
    await seedTest();
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
