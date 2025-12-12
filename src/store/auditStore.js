import { create } from 'zustand';

const useAuditStore = create((set, get) => ({
  currentStep: 'search', // 'search', 'audit', 'results'
  selectedTool: null,
  checkedFeatures: {}, // Map<featureName, boolean>
  userCount: 5,
  customFeatures: [], // Array<{name: string, price: number}>
  
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
    set({ selectedTool: tool, checkedFeatures: initialChecks });
  },
  
  toggleFeature: (featureName) => set((state) => ({
    checkedFeatures: {
      ...state.checkedFeatures,
      [featureName]: !state.checkedFeatures[featureName]
    }
  })),
  
  setUserCount: (count) => set({ userCount: count }),
  
  addCustomFeature: (featureName) => set((state) => ({
    customFeatures: [...state.customFeatures, { name: featureName, price: 500 }]
  })),

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
    const { selectedTool, userCount } = get();
    if (!selectedTool) return 0;
    // Bleed = Monthly Cost * Users * 36 Months
    // Handle potential string vs number issues from DB
    const cost = Number(selectedTool.monthly_cost) || 0;
    return cost * userCount * 36;
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

    // Custom features: estimate $125-$250 each (1/4 of 500-1000)
    const customMin = customFeatures.length * 125;
    const customMax = customFeatures.length * 250;

    // Calculate totals
    const totalMin = Math.max(750, BASE_COST + minFeatureCost + customMin);
    const totalMax = BASE_COST + maxFeatureCost + customMax;

    return {
      min: Math.round(totalMin),
      max: Math.round(totalMax),
      hourly_rate: HOURLY_RATE
    };
  }
}));

export default useAuditStore;
