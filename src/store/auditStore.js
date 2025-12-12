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
    const base = 2800;
    
    const coreFeaturesCount = selectedTool?.features 
      ? selectedTool.features.filter(f => checkedFeatures[f.name]).length 
      : 0;
      
    const customCost = customFeatures.length * 500;
    const featureCost = coreFeaturesCount * 100;
    const total = base + featureCost + customCost;
    
    return Math.max(3000, total);
  }
}));

export default useAuditStore;
