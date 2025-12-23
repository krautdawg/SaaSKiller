import { useState } from 'react';
import { DollarSign, Users, Loader2, TrendingDown } from 'lucide-react';
import { formatTierPrice } from '../utils/tierPricing';
import { useLang } from '../lang';

/**
 * CostCalculator Component
 *
 * Sidebar component for calculating and displaying costs:
 * - Team size input with validation
 * - Monthly/Yearly toggle
 * - Real-time cost display
 * - Savings calculation for yearly billing
 * - Loading and error states
 *
 * Props:
 * - selectedTier: Current subscription tier object
 * - teamSize: Number of team members
 * - billingPeriod: 'monthly' or 'yearly'
 * - costCalculation: Cost data from API
 * - isCalculating: Loading state
 * - costError: Error message if calculation fails
 * - onTeamSizeChange: Callback for team size changes
 * - onBillingPeriodChange: Callback for billing period toggle
 * - manualPricePerUser: Manual price entry when pricing missing
 * - onManualPriceChange: Callback for manual price
 */
const CostCalculator = ({
  selectedTier,
  teamSize,
  billingPeriod,
  costCalculation,
  isCalculating,
  costError,
  onTeamSizeChange,
  onBillingPeriodChange,
  manualPricePerUser = '',
  onManualPriceChange = () => {}
}) => {
  const { t, lang } = useLang();
  const [localTeamSize, setLocalTeamSize] = useState(teamSize);
  const [teamSizeError, setTeamSizeError] = useState('');
  const tierName = (selectedTier?.tier_name || selectedTier?.name || '').toLowerCase();
  const priceValues = [
    selectedTier?.price_monthly,
    selectedTier?.price_per_user,
    selectedTier?.price_yearly
  ];
  const hasAnyPricingValue = priceValues.some((value) => value !== null && value !== undefined);
  const looksMissingPrice = priceValues.every((value) => value == null || Number(value) === 0);
  const needsManualPrice = selectedTier && (!hasAnyPricingValue || looksMissingPrice) && !tierName.includes('free');

  const handleTeamSizeChange = (e) => {
    const value = e.target.value;
    setLocalTeamSize(value);

    // Clear error when user is typing
    if (teamSizeError) {
      setTeamSizeError('');
    }

    // Validate and update store
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 1000) {
      onTeamSizeChange(numValue);
    }
  };

  const handleTeamSizeBlur = () => {
    // Ensure valid value on blur
    const numValue = parseInt(localTeamSize);
    if (isNaN(numValue) || localTeamSize === '') {
      setTeamSizeError(t('manual.validation.nameRequired')); // Reusing for required check
      setLocalTeamSize(1);
      onTeamSizeChange(1);
    } else if (numValue < 1) {
      setTeamSizeError(t('manual.validation.costPositive')); // Reusing for positive check
      setLocalTeamSize(1);
      onTeamSizeChange(1);
    } else if (numValue > 1000) {
      setTeamSizeError(t('manual.validation.costMax', 1000)); // Reusing for max check
      setLocalTeamSize(1000);
      onTeamSizeChange(1000);
    }
  };

  const handleBillingToggle = (period) => {
    onBillingPeriodChange(period);
  };

  const handleManualPriceChange = (e) => {
    onManualPriceChange(e.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: lang === 'de' ? 'EUR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card sticky top-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-brand-secondary" />
          <h3 className="text-lg font-semibold text-brand-text">
            {t('costCalc.title')}
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('costCalc.subtitle')}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-5">
        {/* Selected Tier Display */}
        {selectedTier && (
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs text-gray-500 mb-1">{t('costCalc.selectedTier')}</div>
            <div className="text-sm font-semibold text-brand-text">
              {selectedTier.tier_name}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {formatTierPrice(selectedTier, 'calculator', t)}
            </div>
            {selectedTier.price_model && (
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {selectedTier.price_model.replace('_', ' ')} pricing
              </div>
            )}
          </div>
        )}

        {/* Manual price fallback */}
        {needsManualPrice && (
          <div>
            <label className="block text-sm font-semibold text-brand-text mb-2">
              {t('bleed.pricePerUser')}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={manualPricePerUser}
              onChange={handleManualPriceChange}
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-sm"
              placeholder="e.g. 49"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('bleed.priceMissingHint')}
            </p>
          </div>
        )}

        {/* Team Size Input */}
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">
            {t('audit.teamSize')}
          </label>
          <div className="relative">
            <Users className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors
              ${teamSizeError ? 'text-red-500' : 'text-gray-400'}`}
            />
            <input
              type="number"
              min="1"
              max="1000"
              value={localTeamSize}
              onChange={handleTeamSizeChange}
              onBlur={handleTeamSizeBlur}
              className={`w-full pl-10 pr-4 py-2 border rounded-button
                       focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors
                       ${teamSizeError
                         ? 'border-red-500 focus:ring-red-500'
                         : 'border-gray-300 focus:ring-brand-secondary'
                       }`}
              placeholder={t('manual.validation.nameRequired')}
            />
          </div>
          {teamSizeError ? (
            <div className="mt-1 text-xs text-red-500">{teamSizeError}</div>
          ) : (
            <div className="mt-1 text-xs text-gray-500">
              {t('costCalc.teamSizeHint')}
            </div>
          )}
        </div>

        {/* Billing Period Toggle */}
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">
            {t('costCalc.billingPeriod')}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleBillingToggle('monthly')}
              className={`flex-1 px-4 py-2 rounded-button text-sm font-medium
                       transition-all duration-200
                       ${billingPeriod === 'monthly'
                         ? 'bg-brand-secondary text-white shadow-button'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
            >
              {t('costCalc.monthly')}
            </button>
            <button
              onClick={() => handleBillingToggle('yearly')}
              className={`flex-1 px-4 py-2 rounded-button text-sm font-medium
                       transition-all duration-200
                       ${billingPeriod === 'yearly'
                         ? 'bg-brand-secondary text-white shadow-button'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
            >
              {t('costCalc.yearly')}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isCalculating && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-6 h-6 text-brand-secondary animate-spin" />
          </div>
        )}

        {/* Error State */}
        {costError && !isCalculating && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{costError}</p>
          </div>
        )}

        {/* Cost Display */}
        {costCalculation && !isCalculating && !costError && (
          <>
            <div className="pt-4 border-t border-gray-200">
              {/* Monthly Cost */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">{t('costCalc.monthlyCost')}</div>
                <div className="text-2xl font-bold text-brand-text">
                  {formatCurrency(costCalculation.monthly_cost)}
                </div>
                {costCalculation.price_model === 'per_seat' && (
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(costCalculation.monthly_cost / teamSize)}/{t('audit.users').slice(0, -1)}
                  </div>
                )}
              </div>

              {/* Yearly Cost */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">{t('costCalc.yearlyCost')}</div>
                <div className="text-xl font-semibold text-brand-text">
                  {formatCurrency(costCalculation.yearly_cost)}
                </div>
                {costCalculation.yearly_monthly_equivalent && (
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(costCalculation.yearly_monthly_equivalent)}/{t('costCalc.monthly').toLowerCase()} {t('costCalc.equivalent')}
                  </div>
                )}
              </div>

              {/* Savings Display */}
              {costCalculation.savings_percent > 0 && (
                <div className="p-3 bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-brand-secondary" />
                    <span className="text-sm font-semibold text-brand-secondary">
                      {t('costCalc.saveYearly', costCalculation.savings_percent)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    {t('costCalc.youSave', formatCurrency((costCalculation.monthly_cost * 12) - costCalculation.yearly_cost))}
                  </p>
                </div>
              )}
            </div>

            {/* Annual Total */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-1">
                {t('costCalc.annualTotal', billingPeriod === 'monthly' ? t('costCalc.monthly') : t('costCalc.yearly'))}
              </div>
              <div className="text-xl font-bold text-brand-text">
                {billingPeriod === 'monthly'
                  ? formatCurrency(costCalculation.monthly_cost * 12)
                  : formatCurrency(costCalculation.yearly_cost)
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CostCalculator;
