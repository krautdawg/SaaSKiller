import { getLang } from '../lang';

// API Base URL - from environment variable or default to localhost
// Use ?? (nullish coalescing) to preserve empty string from production build
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Timeout helper - wraps promises with a timeout
const withTimeout = (promise, timeoutMs = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
};

/**
 * SaaS Tools API Service
 * Handles API calls for the new browse tools feature with subscription tiers
 */
export const saasToolsApi = {
  /**
   * Get paginated list of published SaaS tools
   *
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 20)
   * @param {string} options.category - Filter by category slug
   * @param {string} options.search - Search query for name/description
   * @param {string} options.sort - Sort field (default: 'created_at')
   * @param {string} options.order - Sort order 'asc' or 'desc' (default: 'desc')
   * @returns {Promise<{tools: Array, pagination: Object}>}
   */
  getTools: async (options = {}) => {
    try {
      const {
        page = 1,
        limit = 20,
        category,
        search,
        sort = 'created_at',
        order = 'desc'
      } = options;
      const lang = getLang();

      // Build query string
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        order,
        lang
      });

      if (category) params.append('category', category);
      if (search) params.append('search', search);

      console.log('[SaaS Tools API] Fetching tools:', { page, limit, category, search });

      const response = await withTimeout(
        fetch(`${API_URL}/api/saas-tools?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        8000
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch tools');
      }

      const data = await response.json();

      console.log(`[SaaS Tools API] Fetched ${data.tools.length} tools (page ${data.pagination.page}/${data.pagination.totalPages})`);

      return data;

    } catch (error) {
      console.error('[SaaS Tools API] Error fetching tools:', error);
      throw error;
    }
  },

  /**
   * Get single tool by ID with all subscription tiers
   *
   * @param {number|string} id - Tool ID
   * @returns {Promise<Object>} Tool object with subscription_tiers array
   */
  getToolById: async (id) => {
    try {
      console.log('[SaaS Tools API] Fetching tool:', id);
      const lang = getLang();

      const response = await withTimeout(
        fetch(`${API_URL}/api/saas-tools/${id}?lang=${encodeURIComponent(lang)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        5000
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Tool not found');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch tool');
      }

      const tool = await response.json();

      console.log('[SaaS Tools API] Tool fetched:', tool.name);

      return tool;

    } catch (error) {
      console.error('[SaaS Tools API] Error fetching tool:', error);
      throw error;
    }
  },

  /**
   * Calculate monthly and yearly costs for a specific tier and team size
   *
   * @param {Object} params - Calculation parameters
   * @param {number} params.tool_id - Tool ID
   * @param {number} params.tier_id - Subscription tier ID
   * @param {number} params.team_size - Number of team members (default: 1)
   * @param {string} params.billing_period - 'monthly' or 'yearly' (default: 'monthly')
   * @returns {Promise<Object>} Cost calculation with savings
   */
  calculateCost: async ({ tool_id, tier_id, team_size = 1, billing_period = 'monthly' }) => {
    try {
      console.log('[SaaS Tools API] Calculating cost:', { tool_id, tier_id, team_size, billing_period });

      const response = await withTimeout(
        fetch(`${API_URL}/api/calculate-cost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tool_id,
            tier_id,
            team_size,
            billing_period
          })
        }),
        5000
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to calculate cost');
      }

      const costData = await response.json();

      console.log('[SaaS Tools API] Cost calculated:', costData);

      return costData;

    } catch (error) {
      console.error('[SaaS Tools API] Error calculating cost:', error);
      throw error;
    }
  },

  /**
   * Get all categories with display order
   *
   * @returns {Promise<{categories: Array, count: number}>}
   */
  getCategories: async () => {
    try {
      console.log('[SaaS Tools API] Fetching categories');

      const response = await withTimeout(
        fetch(`${API_URL}/api/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        5000
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch categories');
      }

      const data = await response.json();

      console.log(`[SaaS Tools API] Fetched ${data.count} categories`);

      return data;

    } catch (error) {
      console.error('[SaaS Tools API] Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Search and analyze a tool (triggers Perplexity if not found in database)
   * Reuses existing /api/tools/search endpoint from audit tool
   *
   * @param {string} toolName - Tool name to search and analyze
   * @returns {Promise<Object>} Tool object with features and subscription tiers
   */
  searchAndAnalyze: async (toolName) => {
    try {
      console.log('[SaaS Tools API] Analyzing tool:', toolName);
      const lang = getLang();

      const response = await withTimeout(
        fetch(`${API_URL}/api/tools/search?q=${encodeURIComponent(toolName)}&lang=${encodeURIComponent(lang)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        60000 // 60 second timeout - matches main search timeout for consistency
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze tool');
      }

      const tool = await response.json();

      console.log('[SaaS Tools API] Tool analyzed:', tool.name);

      return tool;

    } catch (error) {
      console.error('[SaaS Tools API] Error analyzing tool:', error);
      throw error;
    }
  }
};
