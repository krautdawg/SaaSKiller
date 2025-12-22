import dotenv from 'dotenv';
import { pool } from '../db.js';

dotenv.config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const MODEL = process.env.PERPLEXITY_TRANSLATION_MODEL || 'sonar-pro';

if (!PERPLEXITY_API_KEY) {
  console.error('Missing PERPLEXITY_API_KEY in environment');
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    // Best-effort extraction if model returned extra text
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

  const payload = {
    model: MODEL,
    temperature: 0.1,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional UI translator. Return ONLY valid JSON with no extra text.'
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
    throw new Error(
      `Invalid translation response for ${contextLabel} (expected ${strings.length} items)`
    );
  }

  return translations.map((t, idx) => (typeof t === 'string' && t.trim() ? t.trim() : strings[idx]));
}

function parseArgs(argv) {
  const args = new Map();
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args.set(key, next);
        i++;
      } else {
        args.set(key, true);
      }
    }
  }
  return args;
}

async function translateToolRow(tool, { force = false, delayMs = 1250 } = {}) {
  const features = Array.isArray(tool.features) ? tool.features : [];
  const coreFeatures = Array.isArray(tool.core_features) ? tool.core_features : [];
  const bloatyFeatures = Array.isArray(tool.bloaty_features) ? tool.bloaty_features : [];

  const existingFeaturesDe = Array.isArray(tool.features_de) ? tool.features_de : [];
  const existingCoreDe = Array.isArray(tool.core_features_de) ? tool.core_features_de : [];
  const existingBloatyDe = Array.isArray(tool.bloaty_features_de) ? tool.bloaty_features_de : [];

  const shortDescription = typeof tool.short_description === 'string' ? tool.short_description : '';
  const description = typeof tool.description === 'string' ? tool.description : '';
  const existingShortDescriptionDe =
    typeof tool.short_description_de === 'string' ? tool.short_description_de : '';
  const existingDescriptionDe = typeof tool.description_de === 'string' ? tool.description_de : '';

  const shouldTranslateFeatures = force || existingFeaturesDe.length === 0;
  const shouldTranslateCore = force || existingCoreDe.length === 0;
  const shouldTranslateBloaty = force || existingBloatyDe.length === 0;
  const shouldTranslateShortDescription = force || (!existingShortDescriptionDe.trim() && shortDescription.trim());
  const shouldTranslateDescription = force || (!existingDescriptionDe.trim() && description.trim());

  let featuresDe = existingFeaturesDe;
  let coreFeaturesDe = existingCoreDe;
  let bloatyFeaturesDe = existingBloatyDe;
  let shortDescriptionDe = existingShortDescriptionDe;
  let descriptionDe = existingDescriptionDe;

  if (shouldTranslateShortDescription) {
    const [translated] = await translateStringsToGerman(
      [shortDescription],
      `${tool.name} (short_description)`
    );
    shortDescriptionDe = translated || shortDescription;
    await sleep(delayMs);
  }

  if (shouldTranslateDescription) {
    if (description.trim() && description.trim() === shortDescription.trim() && shortDescriptionDe.trim()) {
      descriptionDe = shortDescriptionDe;
    } else {
      const [translated] = await translateStringsToGerman(
        [description],
        `${tool.name} (description)`
      );
      descriptionDe = translated || description;
      await sleep(delayMs);
    }
  }

  if (shouldTranslateFeatures && features.length) {
    const names = features.map((f) => String(f?.name ?? ''));
    const translatedNames = await translateStringsToGerman(
      names,
      `${tool.name} (features)`
    );
    featuresDe = features.map((f, idx) => ({
      ...f,
      name: translatedNames[idx] || f.name
    }));
    await sleep(delayMs);
  }

  if (shouldTranslateCore && coreFeatures.length) {
    const names = coreFeatures.map((f) => String(f?.name ?? ''));
    const descriptions = coreFeatures.map((f) => String(f?.description ?? ''));

    const translatedNames = await translateStringsToGerman(
      names,
      `${tool.name} (core feature names)`
    );
    await sleep(delayMs);

    const translatedDescriptions = await translateStringsToGerman(
      descriptions,
      `${tool.name} (core feature descriptions)`
    );
    await sleep(delayMs);

    coreFeaturesDe = coreFeatures.map((f, idx) => ({
      ...f,
      name: translatedNames[idx] || f.name,
      description: translatedDescriptions[idx] || f.description
    }));
  }

  if (shouldTranslateBloaty && bloatyFeatures.length) {
    const names = bloatyFeatures.map((f) => String(f?.name ?? ''));
    const descriptions = bloatyFeatures.map((f) => String(f?.description ?? ''));

    const translatedNames = await translateStringsToGerman(
      names,
      `${tool.name} (bloaty feature names)`
    );
    await sleep(delayMs);

    const translatedDescriptions = await translateStringsToGerman(
      descriptions,
      `${tool.name} (bloaty feature descriptions)`
    );
    await sleep(delayMs);

    bloatyFeaturesDe = bloatyFeatures.map((f, idx) => ({
      ...f,
      name: translatedNames[idx] || f.name,
      description: translatedDescriptions[idx] || f.description
    }));
  }

  // Subscription tiers: translate tier_name + notes
  const { rows: tiers } = await pool.query(
    `SELECT id, tier_order, tier_name, notes, tier_name_de, notes_de
     FROM subscription_tiers
     WHERE tool_id = $1
     ORDER BY tier_order ASC`,
    [tool.id]
  );

  const shouldTranslateTierNames =
    force ||
    (tiers.length > 0 &&
      tiers.some((t) => !String(t.tier_name_de || '').trim()) &&
      tiers.every((t) => String(t.tier_name || '').trim()));

  const shouldTranslateTierNotes =
    force ||
    (tiers.length > 0 &&
      tiers.some((t) => !String(t.notes_de || '').trim()) &&
      tiers.some((t) => String(t.notes || '').trim()));

  if (shouldTranslateTierNames) {
    const names = tiers.map((t) => String(t.tier_name ?? ''));
    const translatedNames = await translateStringsToGerman(
      names,
      `${tool.name} (subscription tier names)`
    );
    for (let i = 0; i < tiers.length; i++) {
      await pool.query(
        `UPDATE subscription_tiers
         SET tier_name_de = $1
         WHERE id = $2`,
        [translatedNames[i] || tiers[i].tier_name, tiers[i].id]
      );
    }
    await sleep(delayMs);
  }

  if (shouldTranslateTierNotes) {
    const notes = tiers.map((t) => String(t.notes ?? ''));
    const translatedNotes = await translateStringsToGerman(
      notes,
      `${tool.name} (subscription tier notes)`
    );
    for (let i = 0; i < tiers.length; i++) {
      const next = translatedNotes[i];
      const fallback = notes[i];
      await pool.query(
        `UPDATE subscription_tiers
         SET notes_de = $1
         WHERE id = $2`,
        [next && next.trim() ? next : fallback, tiers[i].id]
      );
    }
    await sleep(delayMs);
  }

  await pool.query(
    `UPDATE tools
     SET features_de = $1,
         core_features_de = $2,
         bloaty_features_de = $3,
         short_description_de = $4,
         description_de = $5,
         updated_at = NOW()
     WHERE id = $6`,
    [
      JSON.stringify(featuresDe),
      JSON.stringify(coreFeaturesDe),
      JSON.stringify(bloatyFeaturesDe),
      shortDescriptionDe,
      descriptionDe,
      tool.id
    ]
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const toolId = args.get('tool-id');
  const force = Boolean(args.get('force'));
  const delayMs = Number(args.get('delay-ms') || 1250);

  const where = [];
  const values = [];
  if (toolId) {
    where.push(`id = $${values.length + 1}`);
    values.push(Number(toolId));
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const { rows: tools } = await pool.query(
    `SELECT id, name, features, core_features, bloaty_features,
            features_de, core_features_de, bloaty_features_de,
            short_description, description,
            short_description_de, description_de
     FROM tools
     ${whereSql}
     ORDER BY id ASC`,
    values
  );

  console.log(`Translating ${tools.length} tool(s) to German...`);

  for (const tool of tools) {
    console.log(`- ${tool.name} (id=${tool.id})`);
    try {
      await translateToolRow(tool, { force, delayMs });
      console.log(`  ✓ updated`);
    } catch (error) {
      console.error(`  ✗ failed: ${error?.message || error}`);
    }
  }

  await pool.end();
  console.log('Done.');
}

main().catch(async (error) => {
  console.error('Fatal:', error);
  try {
    await pool.end();
  } catch {
    // ignore
  }
  process.exit(1);
});
