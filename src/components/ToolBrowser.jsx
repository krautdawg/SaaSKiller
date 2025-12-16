import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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
  const navigate = useNavigate();

  const {
    tools,
    pagination,
    searchQuery,
    isLoadingTools,
    toolsError,
    isAnalyzing,
    analyzeError,
    fetchTools,
    setSearchQuery,
    loadNextPage,
    loadPreviousPage,
    analyzeTool
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

  const handleAnalyzeTool = async () => {
    try {
      const toolId = await analyzeTool(searchQuery);

      // Navigate to tool detail page
      navigate(`/tools/${toolId}`);

      console.log(`✅ ${searchQuery} analyzed successfully!`);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Error already set in store
    }
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

        {/* Loading State - Skeleton Grid */}
        {isLoadingTools && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-card border border-gray-200 p-6 shadow-card animate-pulse"
              >
                {/* Logo skeleton */}
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                {/* Title skeleton */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                {/* Description skeletons */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                {/* Category badge skeleton */}
                <div className="h-6 bg-gray-200 rounded-full w-24 mb-4"></div>
                {/* Features count skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
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

        {/* Enhanced Empty State with AI Analysis */}
        {!isLoadingTools && !toolsError && tools.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />

            {searchQuery ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "{searchQuery}" not found in our database
                </h3>
                <p className="text-gray-600 mb-6">
                  Want us to analyze it with AI?
                </p>

                {!isAnalyzing && !analyzeError && (
                  <button
                    onClick={handleAnalyzeTool}
                    className="px-6 py-3 bg-brand-accent text-white rounded-button font-bold
                             hover:bg-red-600 hover:-translate-y-1
                             active:translate-y-0 active:scale-95 active:shadow-none
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center gap-2 mx-auto shadow-lg transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5" />
                    Analyze {searchQuery} with AI
                  </button>
                )}

                {isAnalyzing && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-brand-secondary" />
                      <span className="text-gray-700 font-medium">Analyzing {searchQuery}...</span>
                    </div>
                    <p className="text-sm text-gray-500">This may take 10-20 seconds</p>
                  </div>
                )}

                {analyzeError && (
                  <div className="bg-red-50 border border-red-200 rounded-card p-4 max-w-md mx-auto">
                    <p className="text-red-700 mb-3">{analyzeError}</p>
                    <button
                      onClick={handleAnalyzeTool}
                      className="text-sm text-red-600 hover:underline font-medium"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </>
            ) : pagination.page > 1 ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No more tools
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or going back
                </p>
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 bg-brand-secondary text-white rounded-button text-sm
                           hover:bg-brand-secondary/90 transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tools found
                </h3>
                <p className="text-gray-600">
                  No tools are available at the moment
                </p>
              </>
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
