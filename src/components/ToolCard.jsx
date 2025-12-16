import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Users, DollarSign } from 'lucide-react';

/**
 * ToolCard Component
 *
 * Displays a single SaaS tool in a card format with:
 * - Tool logo and name
 * - Short description
 * - Category badge
 * - Pricing information
 * - Feature count
 * - Hover effects matching Postable aesthetic
 */
const ToolCard = ({ tool }) => {
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!tool) return null;

  // Parse JSON fields if they're strings
  const coreFeatures = typeof tool.core_features === 'string'
    ? JSON.parse(tool.core_features)
    : tool.core_features || [];

  const bloatyFeatures = typeof tool.bloaty_features === 'string'
    ? JSON.parse(tool.bloaty_features)
    : tool.bloaty_features || [];

  // Get pricing info from first subscription tier
  const firstTier = tool.subscription_tiers?.[0];
  const hasPricing = firstTier && (firstTier.price_monthly > 0 || firstTier.price_yearly > 0);

  const handleClick = () => {
    navigate(`/tools/${tool.id}`);
  };

  const handleExternalClick = (e) => {
    e.stopPropagation();
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-card border border-gray-200 p-6 cursor-pointer
                 transition-all duration-250 hover:shadow-card-hover hover:-translate-y-1
                 shadow-card group relative overflow-hidden"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header: Logo + Name + External Link */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
            {tool.logo_url && !logoError ? (
              <img
                src={tool.logo_url}
                alt={`${tool.name} logo`}
                loading="lazy"
                className={`w-full h-full object-contain transition-opacity duration-500
                          ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-semibold text-lg">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-brand-text truncate">
              {tool.name}
            </h3>
            {tool.category && (
              <span className="inline-block mt-1 text-xs font-medium text-brand-secondary bg-brand-secondary/10
                             px-2 py-1 rounded">
                {tool.category}
              </span>
            )}
          </div>
        </div>

        {/* External Link Button */}
        {tool.website && (
          <button
            onClick={handleExternalClick}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-brand-secondary
                     transition-colors duration-200 rounded-lg hover:bg-gray-50"
            aria-label="Visit website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 min-h-[3rem] relative z-10">
        {tool.short_description || tool.description || 'No description available'}
      </p>

      {/* Feature Count */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 relative z-10">
        <div className="flex items-center gap-1">
          <span className="font-medium text-brand-text">{coreFeatures.length}</span>
          <span>core features</span>
        </div>
        {bloatyFeatures.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-500">{bloatyFeatures.length}</span>
            <span>bloat features</span>
          </div>
        )}
      </div>

      {/* Pricing Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
        {hasPricing ? (
          <>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-medium text-brand-text">
                {firstTier.price_monthly === 0 ? (
                  'Free tier available'
                ) : (
                  `From $${firstTier.price_monthly}/mo`
                )}
              </span>
            </div>
            {tool.subscription_tiers && tool.subscription_tiers.length > 1 && (
              <span className="text-xs text-gray-500">
                {tool.subscription_tiers.length} tiers
              </span>
            )}
          </>
        ) : (
          <span className="text-sm text-gray-500">Custom pricing</span>
        )}
      </div>

      {/* Hover Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
        <span className="text-sm font-medium text-brand-secondary inline-flex items-center gap-1
                       group-hover:translate-x-1 transition-transform duration-200">
          View details <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

export default ToolCard;
