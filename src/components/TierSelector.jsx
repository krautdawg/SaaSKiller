import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * TierSelector Component
 *
 * Dropdown selector for subscription tiers featuring:
 * - Clean dropdown UI matching Postable aesthetic
 * - Shows tier name + pricing info
 * - Highlights selected tier
 * - Triggers cost recalculation on selection
 * - Keyboard accessible
 *
 * Props:
 * - tiers: Array of subscription tier objects
 * - selectedTier: Currently selected tier object
 * - onSelectTier: Callback function when tier is selected
 */
const TierSelector = ({ tiers = [], selectedTier, onSelectTier }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!tiers || tiers.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No subscription tiers available
      </div>
    );
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (tier) => {
    onSelectTier(tier);
    setIsOpen(false);
  };

  const formatPrice = (tier) => {
    if (tier.price_monthly === 0 && tier.price_yearly === 0) {
      return 'Free';
    }

    if (tier.price_model === 'custom') {
      return 'Custom pricing';
    }

    const monthlyPrice = tier.price_monthly || tier.price_per_user || 0;

    if (!monthlyPrice) {
      return 'Price missing';
    }

    const priceText = `$${monthlyPrice}/mo`;

    if (tier.price_model === 'per_seat') {
      return `${priceText} per user`;
    }

    return priceText;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-sm font-semibold text-brand-text mb-2">
        Select Subscription Tier
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-button
                 text-left flex items-center justify-between
                 hover:border-brand-secondary hover:shadow-button
                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
      >
        {/* Selected Tier Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-brand-text">
            {selectedTier?.tier_name || 'Select a tier'}
          </div>
          {selectedTier && (
            <div className="text-xs text-gray-500 mt-0.5">
              {formatPrice(selectedTier)}
            </div>
          )}
        </div>

        {/* Dropdown Icon */}
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200
                     ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-button
                      shadow-dropdown animate-slide-down">
          <div className="py-1 max-h-64 overflow-y-auto">
            {tiers.map((tier) => {
              const isSelected = selectedTier?.id === tier.id;

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleSelect(tier)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50
                             transition-colors duration-150 flex items-start gap-3
                             ${isSelected ? 'bg-brand-secondary/5 ring-1 ring-brand-secondary/20 shadow-[0_0_10px_rgba(30,168,151,0.15)]' : ''}`}
                >
                  {/* Checkmark for selected tier */}
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                    {isSelected && (
                      <Check className="w-5 h-5 text-brand-secondary" />
                    )}
                  </div>

                  {/* Tier Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium mb-0.5
                                   ${isSelected ? 'text-brand-secondary' : 'text-brand-text'}`}>
                      {tier.tier_name}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {formatPrice(tier)}
                    </div>
                    {tier.notes && (
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {tier.notes}
                      </div>
                    )}
                    {tier.user_limit && (
                      <div className="text-xs text-gray-500 mt-1">
                        Up to {tier.user_limit} users
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tier Count Info */}
      <div className="mt-2 text-xs text-gray-500">
        {tiers.length} tier{tiers.length !== 1 ? 's' : ''} available
      </div>
    </div>
  );
};

export default TierSelector;
