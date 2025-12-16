import { create } from 'zustand';

const useAuditStore = create((set, get) => ({
  currentStep: 'search', // 'search', 'audit', 'results'
  selectedTool: null,
  selectedTier: null, // Currently selected subscription tier
  checkedFeatures: {}, // Map<featureName, boolean>
  userCount: 5,
  customFeatures: [], // Array<{name: string, complexity: string, estimated_hours: number, isAnalyzing?: boolean}>
  customPricePerUser: '', // Manual price entry when AI fails to return pricing

  // Actions
  setStep: (step) => set({ currentStep: step }),

  setSelectedTool: (tool) => {
    // Initialize checkedFeatures: core=true, bloat=true (user unchecks what they don't use)
    const initialChecks = {};
    if (tool && tool.features) {
      tool.features.forEach(f => {
        initialChecks[f.name] = true;
      });
    }

    // Auto-select middle tier by default (or first if less than 2 tiers)
    let defaultTier = null;
    if (tool && tool.subscription_tiers && Array.isArray(tool.subscription_tiers)) {
      const tiers = tool.subscription_tiers;
      if (tiers.length > 0) {
        // Select middle tier (e.g., for 4 tiers: tier[1] which is second tier)
        const middleIndex = Math.floor(tiers.length / 2);
        defaultTier = tiers[middleIndex] || tiers[0];
      }
    }

    set({
      selectedTool: tool,
      checkedFeatures: initialChecks,
      selectedTier: defaultTier,
      customPricePerUser: ''
    });
  },

  setSelectedTier: (tier) => set({ selectedTier: tier }),
  setCustomPricePerUser: (value) => set({ customPricePerUser: value }),
  
  toggleFeature: (featureName) => set((state) => ({
    checkedFeatures: {
      ...state.checkedFeatures,
      [featureName]: !state.checkedFeatures[featureName]
    }
  })),
  
  setUserCount: (count) => set({ userCount: count }),

  addCustomFeature: async (featureName) => {
    // Import API service dynamically to avoid circular dependencies
    const { api } = await import('../services/api');

    // 1. Add placeholder immediately for responsive UI
    const tempFeature = {
      name: featureName,
      complexity: 'medium',
      estimated_hours: 12,
      isAnalyzing: true
    };

    set((state) => ({
      customFeatures: [...state.customFeatures, tempFeature]
    }));

    try {
      // 2. Call Perplexity analysis
      const analysis = await api.analyzeCustomFeature(featureName);

      // 3. Update with real data
      set((state) => ({
        customFeatures: state.customFeatures.map(f =>
          f.name === featureName && f.isAnalyzing
            ? {
                name: analysis.feature_name,
                complexity: analysis.complexity,
                estimated_hours: analysis.estimated_hours,
                isFallback: analysis.isFallback
              }
            : f
        )
      }));
    } catch (error) {
      console.error('Failed to analyze custom feature:', error);

      // Remove analyzing flag, keep fallback data
      set((state) => ({
        customFeatures: state.customFeatures.map(f =>
          f.name === featureName && f.isAnalyzing
            ? { name: featureName, complexity: 'medium', estimated_hours: 12, isFallback: true }
            : f
        )
      }));
    }
  },

  // Computed Selectors
  getBloatPercentage: () => {
    const { selectedTool, checkedFeatures } = get();
    if (!selectedTool || !selectedTool.features) return 0;
    
    const total = selectedTool.features.length;
    if (total === 0) return 0;

    const used = selectedTool.features.filter(f => checkedFeatures[f.name]).length;
    const unused = total - used;
    
    return Math.round((unused / total) * 100);
  },

  calculateBleed: () => {
    const { selectedTool, userCount, selectedTier, customPricePerUser } = get();
    if (!selectedTool) return 0;

    // Use selected tier pricing if available, otherwise fall back to tool's monthly_cost
    let monthlyCostPerUser = 0;
    const manualPrice = parseFloat(customPricePerUser);
    if (!Number.isNaN(manualPrice) && manualPrice > 0) {
      monthlyCostPerUser = manualPrice;
    } else if (selectedTier && selectedTier.price_per_user) {
      monthlyCostPerUser = Number(selectedTier.price_per_user) || 0;
    } else {
      // Fallback to legacy monthly_cost field
      monthlyCostPerUser = Number(selectedTool.monthly_cost) || 0;
    }

    // Bleed = Monthly Cost Per User * Users * 36 Months
    return monthlyCostPerUser * userCount * 36;
  },

  calculateBuildCost: () => {
    const { selectedTool, checkedFeatures, customFeatures } = get();
    const HOURLY_RATE = 150;
    const BASE_COST = 700; // Auth, DB, Hosting setup (1/4 of 2800)
    const VIBE_CODING_MULTIPLIER = 0.25; // AI-assisted coding is 4x faster

    // Calculate feature costs based on estimated hours and complexity
    let minFeatureCost = 0;
    let maxFeatureCost = 0;

    if (selectedTool?.features) {
      selectedTool.features
        .filter(f => checkedFeatures[f.name])
        .forEach(feature => {
          // Use estimated_hours from Perplexity if available
          if (feature.estimated_hours) {
            const vibeHours = feature.estimated_hours * VIBE_CODING_MULTIPLIER;
            const cost = vibeHours * HOURLY_RATE;
            minFeatureCost += cost * 0.8; // -20% for efficiency
            maxFeatureCost += cost * 1.2; // +20% for unknowns
          } else {
            // Fallback to complexity-based estimates (also 1/4 time)
            const complexityRanges = {
              simple: { min: 0.5, max: 1 },    // was 2-4
              medium: { min: 2, max: 4 },      // was 8-16
              complex: { min: 10, max: 20 }    // was 40-80
            };

            const range = complexityRanges[feature.complexity] || { min: 1, max: 3 };
            minFeatureCost += range.min * HOURLY_RATE;
            maxFeatureCost += range.max * HOURLY_RATE;
          }
        });
    }

    // Custom features: use actual complexity/hours from Perplexity analysis
    customFeatures.forEach(feature => {
      const vibeHours = (feature.estimated_hours || 12) * VIBE_CODING_MULTIPLIER;
      const cost = vibeHours * HOURLY_RATE;
      minFeatureCost += cost * 0.8; // -20% for efficiency
      maxFeatureCost += cost * 1.2; // +20% for unknowns
    });

    // Calculate totals
    const totalMin = Math.max(750, BASE_COST + minFeatureCost);
    const totalMax = BASE_COST + maxFeatureCost;

    return {
      min: Math.round(totalMin),
      max: Math.round(totalMax),
      hourly_rate: HOURLY_RATE
    };
  }
}));

export default useAuditStore;
