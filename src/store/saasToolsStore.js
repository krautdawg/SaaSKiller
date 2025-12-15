import { create } from 'zustand';
import { saasToolsApi } from '../services/saasToolsApi';

/**
 * Zustand store for SaaS Tools Browse feature
 * Manages tool list, detail view, tier selection, and cost calculations
 */
const useSaasToolsStore = create((set, get) => ({
  // State
  tools: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'created_at',
  sortOrder: 'desc',

  // Detail view
  selectedTool: null,
  selectedTier: null,
  teamSize: 1,
  billingPeriod: 'monthly', // 'monthly' or 'yearly'
  costCalculation: null,

  // Feature expansion state
  showAllCoreFeatures: false,
  showAllBloatyFeatures: false,

  // Loading states
  isLoadingTools: false,
  isLoadingTool: false,
  isLoadingCategories: false,
  isCalculatingCost: false,

  // Error states
  toolsError: null,
  toolError: null,
  categoriesError: null,
  costError: null,

  // Actions: Tools List

  /**
   * Fetch paginated tools list with filters
   */
  fetchTools: async (options = {}) => {
    const state = get();
    const params = {
      page: options.page || state.pagination.page,
      limit: options.limit || state.pagination.limit,
      category: options.category !== undefined ? options.category : state.selectedCategory,
      search: options.search !== undefined ? options.search : state.searchQuery,
      sort: options.sort || state.sortBy,
      order: options.order || state.sortOrder
    };

    set({ isLoadingTools: true, toolsError: null });

    try {
      const data = await saasToolsApi.getTools(params);

      set({
        tools: data.tools,
        pagination: data.pagination,
        isLoadingTools: false
      });

      console.log(`[Store] Loaded ${data.tools.length} tools`);

    } catch (error) {
      console.error('[Store] Error fetching tools:', error);
      set({
        toolsError: error.message,
        isLoadingTools: false
      });
    }
  },

  /**
   * Load next page of tools
   */
  loadNextPage: async () => {
    const { pagination, isLoadingTools } = get();
    if (isLoadingTools || pagination.page >= pagination.totalPages) return;

    await get().fetchTools({ page: pagination.page + 1 });
  },

  /**
   * Load previous page of tools
   */
  loadPreviousPage: async () => {
    const { pagination, isLoadingTools } = get();
    if (isLoadingTools || pagination.page <= 1) return;

    await get().fetchTools({ page: pagination.page - 1 });
  },

  /**
   * Set category filter
   */
  setCategory: async (categorySlug) => {
    set({ selectedCategory: categorySlug });
    await get().fetchTools({ category: categorySlug, page: 1 });
  },

  /**
   * Set search query
   */
  setSearchQuery: async (query) => {
    set({ searchQuery: query });
    await get().fetchTools({ search: query, page: 1 });
  },

  /**
   * Clear all filters
   */
  clearFilters: async () => {
    set({ selectedCategory: null, searchQuery: '' });
    await get().fetchTools({ category: null, search: '', page: 1 });
  },

  /**
   * Set sorting
   */
  setSorting: async (sortBy, sortOrder = 'desc') => {
    set({ sortBy, sortOrder });
    await get().fetchTools({ sort: sortBy, order: sortOrder, page: 1 });
  },

  // Actions: Categories

  /**
   * Fetch all categories
   */
  fetchCategories: async () => {
    set({ isLoadingCategories: true, categoriesError: null });

    try {
      const data = await saasToolsApi.getCategories();

      set({
        categories: data.categories,
        isLoadingCategories: false
      });

      console.log(`[Store] Loaded ${data.count} categories`);

    } catch (error) {
      console.error('[Store] Error fetching categories:', error);
      set({
        categoriesError: error.message,
        isLoadingCategories: false
      });
    }
  },

  // Actions: Tool Detail

  /**
   * Fetch single tool by ID
   */
  fetchToolById: async (id) => {
    set({
      isLoadingTool: true,
      toolError: null,
      showAllCoreFeatures: false,
      showAllBloatyFeatures: false
    });

    try {
      const tool = await saasToolsApi.getToolById(id);

      // Auto-select first tier (usually Free/Starter)
      const defaultTier = tool.subscription_tiers?.[0] || null;

      set({
        selectedTool: tool,
        selectedTier: defaultTier,
        isLoadingTool: false
      });

      // Auto-calculate cost for default tier
      if (defaultTier) {
        await get().calculateCost();
      }

      console.log(`[Store] Loaded tool: ${tool.name}`);

    } catch (error) {
      console.error('[Store] Error fetching tool:', error);
      set({
        toolError: error.message,
        isLoadingTool: false
      });
    }
  },

  /**
   * Select a subscription tier
   */
  selectTier: async (tier) => {
    set({ selectedTier: tier });
    await get().calculateCost();
  },

  /**
   * Set team size
   */
  setTeamSize: async (size) => {
    const teamSize = Math.max(1, Math.min(1000, parseInt(size) || 1));
    set({ teamSize });
    await get().calculateCost();
  },

  /**
   * Set billing period
   */
  setBillingPeriod: async (period) => {
    set({ billingPeriod: period });
    await get().calculateCost();
  },

  /**
   * Calculate cost for current tier and team size
   */
  calculateCost: async () => {
    const { selectedTool, selectedTier, teamSize, billingPeriod } = get();

    if (!selectedTool || !selectedTier) {
      set({ costCalculation: null });
      return;
    }

    set({ isCalculatingCost: true, costError: null });

    try {
      const costData = await saasToolsApi.calculateCost({
        tool_id: selectedTool.id,
        tier_id: selectedTier.id,
        team_size: teamSize,
        billing_period: billingPeriod
      });

      set({
        costCalculation: costData,
        isCalculatingCost: false
      });

      console.log('[Store] Cost calculated:', costData);

    } catch (error) {
      console.error('[Store] Error calculating cost:', error);
      set({
        costError: error.message,
        isCalculatingCost: false
      });
    }
  },

  /**
   * Toggle show all core features
   */
  toggleShowAllCoreFeatures: () => {
    set((state) => ({ showAllCoreFeatures: !state.showAllCoreFeatures }));
  },

  /**
   * Toggle show all bloaty features
   */
  toggleShowAllBloatyFeatures: () => {
    set((state) => ({ showAllBloatyFeatures: !state.showAllBloatyFeatures }));
  },

  // Computed Selectors

  /**
   * Get visible core features (top 20 or all if expanded)
   */
  getVisibleCoreFeatures: () => {
    const { selectedTool, showAllCoreFeatures } = get();
    if (!selectedTool?.core_features) return [];

    const features = selectedTool.core_features;
    return showAllCoreFeatures ? features : features.slice(0, 20);
  },

  /**
   * Get visible bloaty features (top 10 or all if expanded)
   */
  getVisibleBloatyFeatures: () => {
    const { selectedTool, showAllBloatyFeatures } = get();
    if (!selectedTool?.bloaty_features) return [];

    const features = selectedTool.bloaty_features;
    return showAllBloatyFeatures ? features : features.slice(0, 10);
  },

  /**
   * Get remaining feature counts
   */
  getRemainingFeatureCounts: () => {
    const { selectedTool, showAllCoreFeatures, showAllBloatyFeatures } = get();

    const remainingCore = !showAllCoreFeatures && selectedTool?.core_features
      ? Math.max(0, selectedTool.core_features.length - 20)
      : 0;

    const remainingBloaty = !showAllBloatyFeatures && selectedTool?.bloaty_features
      ? Math.max(0, selectedTool.bloaty_features.length - 10)
      : 0;

    return { remainingCore, remainingBloaty };
  },

  /**
   * Clear selected tool (for navigation away from detail view)
   */
  clearSelectedTool: () => {
    set({
      selectedTool: null,
      selectedTier: null,
      costCalculation: null,
      showAllCoreFeatures: false,
      showAllBloatyFeatures: false,
      toolError: null
    });
  }
}));

export default useSaasToolsStore;
