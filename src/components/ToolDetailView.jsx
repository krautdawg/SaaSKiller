import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import useSaasToolsStore from '../store/saasToolsStore';
import FeatureList from './FeatureList';
import TierSelector from './TierSelector';
import CostCalculator from './CostCalculator';

/**
 * ToolDetailView Component
 *
 * Full detail page for a single SaaS tool featuring:
 * - Tool header with logo, name, description, website link
 * - Tier selector dropdown
 * - Cost calculator sidebar (sticky)
 * - Feature lists with Show More (top 20 core + top 10 bloaty)
 * - Loading and error states
 * - Postable-inspired layout with generous spacing
 */
const ToolDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  const {
    selectedTool,
    selectedTier,
    teamSize,
    billingPeriod,
    costCalculation,
    isLoadingTool,
    isCalculatingCost,
    toolError,
    costError,
    fetchToolById,
    selectTier,
    setTeamSize,
    setBillingPeriod,
    clearSelectedTool
  } = useSaasToolsStore();

  // Fetch tool on mount
  useEffect(() => {
    if (id) {
      fetchToolById(id);
    }

    // Cleanup on unmount
    return () => {
      clearSelectedTool();
    };
  }, [id, fetchToolById, clearSelectedTool]);

  const handleBack = () => {
    navigate('/browse');
  };

  const handleExternalClick = () => {
    if (selectedTool?.website) {
      window.open(selectedTool.website, '_blank', 'noopener,noreferrer');
    }
  };

  // Parse features (handle both JSON strings and objects)
  const coreFeatures = selectedTool?.core_features
    ? (typeof selectedTool.core_features === 'string'
        ? JSON.parse(selectedTool.core_features)
        : selectedTool.core_features)
    : [];

  const bloatyFeatures = selectedTool?.bloaty_features
    ? (typeof selectedTool.bloaty_features === 'string'
        ? JSON.parse(selectedTool.bloaty_features)
        : selectedTool.bloaty_features)
    : [];

  // Loading State - Skeleton
  if (isLoadingTool) {
    return (
      <div className="min-h-screen bg-brand-surface">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6 animate-pulse">
            {/* Back Button Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>

            {/* Tool Header Skeleton */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                {/* Logo Skeleton */}
                <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0"></div>

                {/* Name & Description Skeleton */}
                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Visit Website Button Skeleton */}
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Features Skeleton */}
            <div className="lg:col-span-2 space-y-8 animate-pulse">
              {/* Tier Selector Skeleton */}
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card space-y-4">
                <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>

              {/* Features Skeleton */}
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card space-y-3">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>

              {/* More Features Skeleton */}
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card space-y-3">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Calculator Skeleton */}
            <div className="lg:col-span-1 animate-pulse">
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card sticky top-24 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (toolError) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-card border border-red-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-brand-text mb-2">Error Loading Tool</h2>
          <p className="text-gray-600 mb-6">{toolError}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-button text-sm font-medium
                       text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Browse
            </button>
            <button
              onClick={() => fetchToolById(id)}
              className="px-4 py-2 bg-brand-secondary text-white rounded-button text-sm font-medium
                       hover:bg-brand-secondary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!selectedTool) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-brand-text mb-2">Tool Not Found</h2>
          <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-brand-secondary text-white rounded-button text-sm font-medium
                     hover:bg-brand-secondary/90 transition-colors"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-secondary
                     transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </button>

          {/* Tool Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              {/* Logo */}
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                {selectedTool.logo_url && !logoError ? (
                  <img
                    src={selectedTool.logo_url}
                    alt={`${selectedTool.name} logo`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-semibold text-2xl">
                    {selectedTool.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name & Description */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-brand-text mb-2">
                  {selectedTool.name}
                </h1>
                {selectedTool.category && (
                  <span className="inline-block mb-3 text-sm font-medium text-brand-secondary
                                 bg-brand-secondary/10 px-3 py-1 rounded">
                    {selectedTool.category}
                  </span>
                )}
                <p className="text-gray-600 leading-relaxed">
                  {selectedTool.short_description || selectedTool.description}
                </p>
              </div>
            </div>

            {/* Visit Website Button */}
            {selectedTool.website && (
              <button
                onClick={handleExternalClick}
                className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-white
                         rounded-button text-sm font-medium hover:bg-brand-secondary/90
                         transition-colors shadow-button hover:shadow-button-hover"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Features */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tier Selector */}
            {selectedTool.subscription_tiers && selectedTool.subscription_tiers.length > 0 && (
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
                <TierSelector
                  tiers={selectedTool.subscription_tiers}
                  selectedTier={selectedTier}
                  onSelectTier={selectTier}
                />
              </div>
            )}

            {/* Core Features */}
            {coreFeatures.length > 0 && (
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
                <FeatureList
                  features={coreFeatures}
                  type="core"
                  initialVisibleCount={20}
                />
              </div>
            )}

            {/* Bloaty Features */}
            {bloatyFeatures.length > 0 && (
              <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
                <FeatureList
                  features={bloatyFeatures}
                  type="bloaty"
                  initialVisibleCount={10}
                />
              </div>
            )}

            {/* No Features Message */}
            {coreFeatures.length === 0 && bloatyFeatures.length === 0 && (
              <div className="bg-white rounded-card border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No feature information available for this tool.</p>
              </div>
            )}
          </div>

          {/* Right Column: Cost Calculator (Sticky) */}
          <div className="lg:col-span-1">
            {selectedTier && (
              <CostCalculator
                selectedTier={selectedTier}
                teamSize={teamSize}
                billingPeriod={billingPeriod}
                costCalculation={costCalculation}
                isCalculating={isCalculatingCost}
                costError={costError}
                onTeamSizeChange={setTeamSize}
                onBillingPeriodChange={setBillingPeriod}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailView;
