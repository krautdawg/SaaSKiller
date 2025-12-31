import dotenv from 'dotenv';

dotenv.config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const MODEL = process.env.PERPLEXITY_TRANSLATION_MODEL || 'sonar-pro';

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

/**
 * Translate an array of strings to German using Perplexity API
 * @param {string[]} strings - Array of English strings to translate
 * @param {string} contextLabel - Context label for the translation (e.g., "ToolName (feature names)")
 * @returns {Promise<string[]>} Array of translated strings
 */
export async function translateStringsToGerman(strings, contextLabel) {
  if (!strings.length) return [];
  if (!PERPLEXITY_API_KEY) {
    console.warn('[Translation] No PERPLEXITY_API_KEY - skipping translation');
    return strings; // Return original if no API key
  }

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
    console.warn(`[Translation] Invalid response for ${contextLabel}, using original`);
    return strings;
  }

  return translations.map((t, idx) => (typeof t === 'string' && t.trim() ? t.trim() : strings[idx]));
}

/**
 * Sleep utility for rate limiting
 * @param {number} ms - Milliseconds to sleep
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
