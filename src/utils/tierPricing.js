/**
 * Tier Pricing Utility
 *
 * Centralized logic for displaying subscription tier pricing
 * Handles Enterprise/custom tier detection and cheeky SaaSKiller-brand messaging
 */

// Cheeky messages for Enterprise/custom pricing tiers
const ENTERPRISE_MESSAGES = [
  "Too Much To Count",
  "You need some serious help",
  "If you have to ask...",
  "More than your car payment",
  "Call them. We dare you."
];

/**
 * Detect if a tier is an Enterprise/Custom pricing tier
 *
 * Detection priority:
 * 1. Explicit price_model === 'custom'
 * 2. Tier name patterns + zero pricing
 * 3. Notes field patterns + zero pricing
 *
 * @param {Object} tier - Subscription tier object
 * @returns {boolean} True if Enterprise/custom tier
 */
export const isEnterpriseTier = (tier) => {
  if (!tier) return false;

  // Priority 1: Explicit custom price model
  if (tier.price_model === 'custom') {
    return true;
  }

  // Check if pricing is zero or missing
  const hasZeroPrice =
    tier.price_monthly === 0 ||
    tier.price_monthly === null ||
    tier.price_monthly === undefined ||
    (tier.price_yearly === 0 && tier.price_monthly === 0);

  if (!hasZeroPrice) {
    // Has actual pricing, can't be Enterprise "contact sales"
    return false;
  }

  // Get tier name for pattern matching
  const tierName = (tier.tier_name || tier.name || '').toLowerCase();

  // EXCLUSION: Check for Free tier patterns first (avoid false positives)
  const isFreePattern =
    tierName.includes('free') ||
    tierName.includes('starter') ||
    tierName.includes('trial');

  if (isFreePattern) {
    return false; // It's a Free tier, not Enterprise
  }

  // Priority 2: Tier name patterns for Enterprise
  const enterprisePatterns = [
    'enterprise',
    'custom',
    'premium',
    'contact',
    'talk to sales',
    'ultimate',
    'unlimited'
  ];

  if (enterprisePatterns.some(pattern => tierName.includes(pattern))) {
    return true;
  }

  // Priority 3: Notes field patterns
  const notes = (tier.notes || '').toLowerCase();
  const notesPatterns = [
    'contact',
    'custom quote',
    'sales',
    'pricing varies',
    'call us'
  ];

  if (notesPatterns.some(pattern => notes.includes(pattern))) {
    return true;
  }

  return false;
};

/**
 * Get cheeky Enterprise message (deterministic)
 *
 * Uses simple hash of tier name to select message consistently
 * Same tier will always show same message (better UX)
 *
 * @param {Object} tier - Subscription tier object
 * @returns {string} Cheeky Enterprise message
 */
export const getEnterpriseMessage = (tier) => {
  // Create deterministic hash from tier name
  const tierName = tier.tier_name || tier.name || 'Enterprise';
  const hash = tierName.split('').reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  // Select message based on hash
  return ENTERPRISE_MESSAGES[hash % ENTERPRISE_MESSAGES.length];
};

/**
 * Format tier price for display
 *
 * Main function for pricing display across all components
 * Handles: Free tiers, Enterprise tiers, standard pricing, missing prices
 *
 * @param {Object} tier - Subscription tier object
 * @param {string} context - Display context: 'dropdown' | 'card' | 'calculator' | 'default'
 * @returns {string} Formatted price string
 */
export const formatTierPrice = (tier, context = 'default') => {
  if (!tier) return 'Price missing';

  // Get tier name for pattern checks
  const tierName = (tier.tier_name || tier.name || '').toLowerCase();

  // 1. Check if Free tier (both prices are 0 AND tier name suggests Free)
  const isFreePattern =
    tierName.includes('free') ||
    tierName.includes('starter') ||
    tierName.includes('trial');

  const hasBothPricesZero =
    (tier.price_monthly === 0 || tier.price_monthly === null) &&
    (tier.price_yearly === 0 || tier.price_yearly === null);

  if (isFreePattern && hasBothPricesZero) {
    return 'Free';
  }

  // 2. Check if Enterprise tier (BEFORE checking for zero price)
  if (isEnterpriseTier(tier)) {
    return getEnterpriseMessage(tier);
  }

  // 3. Get monthly price from various sources
  const monthlyPrice = tier.price_monthly || tier.price_per_user || 0;

  // 4. Handle missing/zero price for non-Enterprise tiers
  if (!monthlyPrice || monthlyPrice === 0) {
    return 'Price missing';
  }

  // 5. Format standard pricing
  const priceText = `$${monthlyPrice}/mo`;

  // Add "per user" suffix for per-seat pricing
  if (tier.price_model === 'per_seat') {
    return `${priceText} per user`;
  }

  return priceText;
};
