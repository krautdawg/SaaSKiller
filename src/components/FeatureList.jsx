import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useLang } from '../lang';

/**
 * FeatureList Component
 *
 * Displays features with priority-based ordering and "Show More" expansion:
 * - Shows top 20 core features initially
 * - Shows top 10 bloaty features initially
 * - "Show More" button reveals remaining features
 * - Clean card-based layout matching Postable aesthetic
 *
 * Props:
 * - features: Array of feature objects with id, name, description, icon, priority
 * - type: 'core' or 'bloaty' (determines styling and label)
 * - initialVisibleCount: Number of features to show initially (default: 20 for core, 10 for bloaty)
 */
const FeatureList = ({
  features = [],
  type = 'core',
  initialVisibleCount = null
}) => {
  const { t } = useLang();
  const defaultVisibleCount = initialVisibleCount || (type === 'core' ? 20 : 10);
  const [showAll, setShowAll] = useState(false);

  if (!features || features.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        {t('detail.noFeatures')}
      </div>
    );
  }

  const visibleFeatures = showAll ? features : features.slice(0, defaultVisibleCount);
  const remainingCount = features.length - defaultVisibleCount;
  const hasMore = remainingCount > 0;

  const typeConfig = {
    core: {
      title: t('audit.coreTitle'),
      description: t('featureList.coreDesc'),
      icon: Check,
      iconColor: 'text-brand-secondary',
      bgColor: 'bg-brand-secondary/10',
      borderColor: 'border-brand-secondary/20'
    },
    bloaty: {
      title: t('audit.bloatyTitle'),
      description: t('featureList.bloatyDesc'),
      icon: Info,
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-brand-text mb-1">
          {config.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{config.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          {t('browser.showing', visibleFeatures.length, features.length)}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {visibleFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor}
                       transition-all duration-200 hover:shadow-card`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-brand-text mb-1">
                  {feature.name}
                </h4>
                {feature.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
                {feature.priority && (
                  <span className="inline-block mt-2 text-xs text-gray-500">
                    Priority: {feature.priority}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full px-4 py-3 border border-gray-300 rounded-button
                   text-sm font-medium text-gray-700 hover:bg-gray-50
                   transition-all duration-200 flex items-center justify-center gap-2
                   hover:border-brand-secondary hover:text-brand-secondary"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              {t('audit.showLess')}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {t('audit.showMore', remainingCount, type === 'core' ? 'Core' : 'Advanced')}
            </>
          )}
        </button>
      )}

      {/* All Features Shown Indicator */}
      {showAll && (
        <div className="mt-3 text-center text-sm text-gray-500">
          {t('featureList.allShown', features.length, type === 'core' ? 'Core' : 'Advanced')}
        </div>
      )}
    </div>
  );
};

export default FeatureList;
