import pb from '../lib/pocketbase';

// Timeout helper - wraps promises with a timeout
const withTimeout = (promise, timeoutMs = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
};

// Response validator - ensures tool data is complete and valid
const validateToolResponse = (tool) => {
  if (!tool) return false;
  if (!tool.name || typeof tool.name !== 'string') return false;
  if (tool.monthly_cost === undefined || typeof tool.monthly_cost !== 'number') return false;
  if (!tool.features || !Array.isArray(tool.features)) return false;

  // Validate features structure
  const validFeatures = tool.features.every(
    f => f.name && (f.type === 'core' || f.type === 'bloat')
  );

  return validFeatures;
};

export const api = {
  searchTools: async (query) => {
    try {
      // 1. Normalize query
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        throw new Error('Search query is required');
      }

      // 2. Try cache first with fuzzy matching (tilde operator)
      console.log(`[API] Searching cache for: ${normalizedQuery}`);

      const cacheResult = await withTimeout(
        pb.collection('tools').getList(1, 1, {
          filter: `name ~ "${normalizedQuery}"`,
          sort: '-created'
        }),
        3000 // 3 second timeout for cache lookup
      );

      if (cacheResult.items.length > 0) {
        const tool = cacheResult.items[0];
        console.log('[API] Cache hit:', tool.name);

        // Validate cached data
        if (validateToolResponse(tool)) {
          return tool;
        } else {
          console.warn('[API] Cached data invalid, triggering re-analysis');
        }
      } else {
        console.log('[API] Cache miss, triggering analysis');
      }

      // 3. Cache miss or invalid data - trigger Perplexity analysis
      console.log('[API] Calling /api/analyze endpoint');

      const analysisResult = await withTimeout(
        pb.send('/api/analyze', {
          method: 'POST',
          body: { query: normalizedQuery }
        }),
        15000 // 15 second timeout for AI analysis
      );

      // 4. Validate analysis response
      if (!validateToolResponse(analysisResult)) {
        throw new Error('Invalid response from analysis endpoint');
      }

      console.log('[API] Analysis successful:', analysisResult.name);
      return analysisResult;

    } catch (error) {
      console.error('[API] Error searching tools:', error);

      // Categorize error for better UX
      let errorMessage = 'An unexpected error occurred';
      let errorType = 'unknown';

      if (error.message === 'Request timeout') {
        errorMessage = 'The search took too long. Please try again.';
        errorType = 'timeout';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network') || error.message.includes('NetworkError')) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
        errorType = 'network';
      } else if (error.status === 404) {
        errorMessage = `We couldn't find information about "${query}". Try a different tool name.`;
        errorType = 'not_found';
      } else if (error.status >= 500) {
        errorMessage = 'Server error analyzing the tool. Please try manual entry.';
        errorType = 'analysis';
      } else if (error.message.includes('Invalid response')) {
        errorMessage = 'Tool analysis failed. Please use manual entry.';
        errorType = 'analysis';
      }

      // Throw structured error for component to handle
      const structuredError = new Error(errorMessage);
      structuredError.type = errorType;
      structuredError.originalError = error;

      throw structuredError;
    }
  },

  submitLead: async (data) => {
    try {
      if (!data.email || !data.tool_name) {
        throw new Error('Email and tool name are required');
      }

      const lead = await withTimeout(
        pb.collection('leads').create(data),
        5000
      );

      console.log('[API] Lead submitted:', lead.id);
      return lead;

    } catch (error) {
      console.error('[API] Error submitting lead:', error);
      throw error;
    }
  }
};
