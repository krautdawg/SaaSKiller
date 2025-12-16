import { useState } from 'react';
import { DollarSign, Users, Loader2, TrendingDown } from 'lucide-react';

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
 */
const CostCalculator = ({
  selectedTier,
  teamSize,
  billingPeriod,
  costCalculation,
  isCalculating,
  costError,
  onTeamSizeChange,
  onBillingPeriodChange
}) => {
  const [localTeamSize, setLocalTeamSize] = useState(teamSize);
  const [teamSizeError, setTeamSizeError] = useState('');

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
      setTeamSizeError('Team size is required');
      setLocalTeamSize(1);
      onTeamSizeChange(1);
    } else if (numValue < 1) {
      setTeamSizeError('Team size must be at least 1');
      setLocalTeamSize(1);
      onTeamSizeChange(1);
    } else if (numValue > 1000) {
      setTeamSizeError('Team size cannot exceed 1000');
      setLocalTeamSize(1000);
      onTeamSizeChange(1000);
    }
  };

  const handleBillingToggle = (period) => {
    onBillingPeriodChange(period);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
            Cost Calculator
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Calculate your estimated costs
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-5">
        {/* Selected Tier Display */}
        {selectedTier && (
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Selected Tier</div>
            <div className="text-sm font-semibold text-brand-text">
              {selectedTier.tier_name}
            </div>
            {selectedTier.price_model && (
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {selectedTier.price_model.replace('_', ' ')} pricing
              </div>
            )}
          </div>
        )}

        {/* Team Size Input */}
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">
            Team Size
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
              placeholder="Enter team size"
            />
          </div>
          {teamSizeError ? (
            <div className="mt-1 text-xs text-red-500">{teamSizeError}</div>
          ) : (
            <div className="mt-1 text-xs text-gray-500">
              Number of team members (1-1000)
            </div>
          )}
        </div>

        {/* Billing Period Toggle */}
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">
            Billing Period
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
              Monthly
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
              Yearly
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
                <div className="text-xs text-gray-500 mb-1">Monthly Cost</div>
                <div className="text-2xl font-bold text-brand-text">
                  {formatCurrency(costCalculation.monthly_cost)}
                </div>
                {costCalculation.price_model === 'per_seat' && (
                  <div className="text-xs text-gray-500 mt-1">
                    ${costCalculation.monthly_cost / teamSize}/user
                  </div>
                )}
              </div>

              {/* Yearly Cost */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Yearly Cost</div>
                <div className="text-xl font-semibold text-brand-text">
                  {formatCurrency(costCalculation.yearly_cost)}
                </div>
                {costCalculation.yearly_monthly_equivalent && (
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(costCalculation.yearly_monthly_equivalent)}/month equivalent
                  </div>
                )}
              </div>

              {/* Savings Display */}
              {costCalculation.savings_percent > 0 && (
                <div className="p-3 bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-brand-secondary" />
                    <span className="text-sm font-semibold text-brand-secondary">
                      Save {costCalculation.savings_percent}% yearly
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    You save {formatCurrency(
                      (costCalculation.monthly_cost * 12) - costCalculation.yearly_cost
                    )} per year by paying annually
                  </p>
                </div>
              )}
            </div>

            {/* Annual Total */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-1">
                {billingPeriod === 'monthly' ? 'Annual Total (Monthly)' : 'Annual Total (Yearly)'}
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
