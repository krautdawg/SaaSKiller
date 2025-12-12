// API Base URL - from environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

  // Handle monthly_cost as either string (from PostgreSQL NUMERIC) or number
  let monthly_cost = tool.monthly_cost;
  if (typeof monthly_cost === 'string') {
    monthly_cost = parseFloat(monthly_cost);
  }
  if (monthly_cost === undefined || isNaN(monthly_cost)) return false;

  // Handle features as either array or JSONB string
  let features = tool.features;
  if (typeof features === 'string') {
    try {
      features = JSON.parse(features);
    } catch {
      return false;
    }
  }

  if (!Array.isArray(features)) return false;

  // Validate features structure
  const validFeatures = features.every(
    f => f.name && (f.type === 'core' || f.type === 'bloat')
  );

  return validFeatures;
};

export const api = {
  /**
   * Search for a tool by name
   * This hits the Express backend which:
   * 1. Checks PostgreSQL cache
   * 2. If not found, calls Perplexity API
   * 3. Saves to database and returns result
   */
  searchTools: async (query) => {
    try {
      // 1. Normalize query
      const normalizedQuery = query.trim();

      if (!normalizedQuery) {
        throw new Error('Search query is required');
      }

      console.log(`[API] Searching for tool: ${normalizedQuery}`);

      // 2. Call the Express backend API with timeout
      const response = await withTimeout(
        fetch(`${API_URL}/api/tools/search?q=${encodeURIComponent(normalizedQuery)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        20000 // 20 second timeout (includes Perplexity call time)
      );

      if (!response.ok) {
        // Parse error from backend
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }

        const error = new Error(errorData.message || 'API request failed');
        error.status = response.status;
        error.type = errorData.type || 'unknown';
        throw error;
      }

      // 3. Parse response
      const tool = await response.json();

      // 4. Validate response structure
      if (!validateToolResponse(tool)) {
        throw new Error('Invalid tool data structure received');
      }

      console.log('[API] Tool data received:', tool.name);
      return tool;

    } catch (error) {
      console.error('[API] Error searching tools:', error);

      // Categorize error for better UX
      let errorMessage = 'An unexpected error occurred';
      let errorType = 'unknown';

      if (error.message === 'Request timeout') {
        errorMessage = 'The search took too long. Please try again.';
        errorType = 'timeout';
      } else if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network') ||
        error.message.includes('NetworkError') ||
        error.name === 'TypeError'
      ) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
        errorType = 'network';
      } else if (error.status === 404) {
        errorMessage = `We couldn't find information about "${query}". Try a different tool name.`;
        errorType = 'not_found';
      } else if (error.status >= 500 || error.type === 'analysis') {
        errorMessage = 'Server error analyzing the tool. Please try manual entry.';
        errorType = 'analysis';
      } else if (error.message.includes('Invalid tool data')) {
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

  /**
   * Submit a lead to the database
   */
  submitLead: async (data) => {
    try {
      if (!data.email || !data.tool_name) {
        throw new Error('Email and tool name are required');
      }

      console.log('[API] Submitting lead:', data.email);

      const response = await withTimeout(
        fetch(`${API_URL}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }),
        5000
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit lead');
      }

      const result = await response.json();
      console.log('[API] Lead submitted successfully:', result.lead.id);

      return result.lead;

    } catch (error) {
      console.error('[API] Error submitting lead:', error);
      throw error;
    }
  },

  /**
   * Manually create a tool entry (used by manual entry form)
   */
  createTool: async (toolData) => {
    try {
      if (!toolData.name || !toolData.monthly_cost || !toolData.features) {
        throw new Error('Name, monthly cost, and features are required');
      }

      console.log('[API] Creating tool manually:', toolData.name);

      // For manual entry, we'll just return the data as-is
      // The backend will handle the insert when someone searches for it
      // OR we can do a direct POST to create endpoint if needed

      // For now, return formatted data that matches DB structure
      const tool = {
        name: toolData.name,
        slug: toolData.slug || toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        monthly_cost: parseFloat(toolData.monthly_cost),
        features: toolData.features,
        description: toolData.description || '',
        id: Date.now(), // Temporary ID for frontend
        created_at: new Date().toISOString()
      };

      return tool;

    } catch (error) {
      console.error('[API] Error creating tool:', error);
      throw error;
    }
  }
};
