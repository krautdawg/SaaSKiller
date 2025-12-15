import { useEffect, useState } from 'react';
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import useSaasToolsStore from '../store/saasToolsStore';
import ToolCard from './ToolCard';
import CategoryFilter from './CategoryFilter';

/**
 * ToolBrowser Component
 *
 * Main browse view for SaaS tools featuring:
 * - Search bar with real-time filtering
 * - Category filter pills
 * - Grid layout of tool cards (Postable-inspired)
 * - Pagination controls
 * - Loading and error states
 */
const ToolBrowser = () => {
  const {
    tools,
    pagination,
    searchQuery,
    isLoadingTools,
    toolsError,
    fetchTools,
    setSearchQuery,
    loadNextPage,
    loadPreviousPage
  } = useSaasToolsStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Fetch tools on mount
  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  // Debounced search: wait 500ms after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        setSearchQuery(localSearchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, searchQuery, setSearchQuery]);

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-width-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-brand-text mb-2">
            Browse SaaS Tools
          </h1>
          <p className="text-gray-600">
            Discover the features and pricing of 100+ popular SaaS tools
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              placeholder="Search tools by name or description..."
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-button
                       focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent
                       text-sm placeholder:text-gray-400"
            />
            {localSearchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Results Count */}
        {!isLoadingTools && !toolsError && (
          <div className="mb-6 text-sm text-gray-600">
            Showing {tools.length} of {pagination.total} tools
            {searchQuery && (
              <span className="ml-1">
                matching "<span className="font-semibold">{searchQuery}</span>"
              </span>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoadingTools && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-brand-secondary animate-spin" />
            <span className="ml-3 text-gray-600">Loading tools...</span>
          </div>
        )}

        {/* Error State */}
        {toolsError && (
          <div className="bg-red-50 border border-red-200 rounded-card p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error loading tools</h3>
              <p className="text-sm text-red-700">{toolsError}</p>
              <button
                onClick={() => fetchTools()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-button text-sm
                         hover:bg-red-700 transition-colors duration-200"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingTools && !toolsError && tools.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || pagination.page > 1
                ? 'Try adjusting your search or filters'
                : 'No tools are available at the moment'}
            </p>
            {(searchQuery || pagination.page > 1) && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-brand-secondary text-white rounded-button text-sm
                         hover:bg-brand-secondary/90 transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Tools Grid */}
        {!isLoadingTools && !toolsError && tools.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-button">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadPreviousPage}
                    disabled={pagination.page <= 1 || isLoadingTools}
                    className="px-4 py-2 border border-gray-300 rounded-button text-sm font-medium
                             text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={loadNextPage}
                    disabled={pagination.page >= pagination.totalPages || isLoadingTools}
                    className="px-4 py-2 border border-gray-300 rounded-button text-sm font-medium
                             text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ToolBrowser;
