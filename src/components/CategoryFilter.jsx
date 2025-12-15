import { useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import useSaasToolsStore from '../store/saasToolsStore';

/**
 * CategoryFilter Component
 *
 * Displays category pills for filtering tools:
 * - Fetches categories from API on mount
 * - Shows "All" option + 10 category buttons
 * - Highlights selected category
 * - Updates store when category is clicked
 */
const CategoryFilter = () => {
  const {
    categories,
    selectedCategory,
    isLoadingCategories,
    setCategory,
    clearFilters,
    fetchCategories
  } = useSaasToolsStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = (categorySlug) => {
    if (categorySlug === selectedCategory) {
      // Clicking the same category deselects it
      clearFilters();
    } else {
      setCategory(categorySlug);
    }
  };

  const handleClearAll = () => {
    clearFilters();
  };

  if (isLoadingCategories) {
    return (
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-500">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-secondary" />
          <h3 className="text-sm font-semibold text-brand-text">Filter by Category</h3>
        </div>

        {selectedCategory && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-accent
                     transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Clear filter
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {/* "All" Option */}
        <button
          onClick={() => handleClearAll()}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                     ${!selectedCategory
                       ? 'bg-brand-secondary text-white shadow-button'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }`}
        >
          All Tools
        </button>

        {/* Category Pills */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                         ${isSelected
                           ? 'bg-brand-secondary text-white shadow-button'
                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                         }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator */}
      {selectedCategory && (
        <div className="mt-4 px-4 py-2 bg-brand-secondary/10 rounded-lg border border-brand-secondary/20">
          <p className="text-sm text-brand-text">
            Showing tools in{' '}
            <span className="font-semibold">
              {categories.find(c => c.slug === selectedCategory)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
