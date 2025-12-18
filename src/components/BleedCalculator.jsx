import React from 'react';
import useAuditStore from '../store/auditStore';
import { ChevronDown } from 'lucide-react';
import { formatTierPrice, isEnterpriseTier } from '../utils/tierPricing';

const BleedCalculator = () => {
  const {
    selectedTool,
    userCount,
    setUserCount,
    calculateBleed,
    selectedTier,
    setSelectedTier,
    customPricePerUser,
    setCustomPricePerUser
  } = useAuditStore();

  if (!selectedTool) return null;

  const tierName = (selectedTier?.tier_name || selectedTier?.name || '').toLowerCase();
  const isFreeOrFreemium = tierName.includes('free') || tierName.includes('starter');
  const priceValues = [
    selectedTier?.price_per_user,
    selectedTier?.price_monthly,
    selectedTier?.price_yearly
  ];
  const looksMissingPrice = priceValues.every((value) => value == null || Number(value) === 0);
  const priceMissing =
    looksMissingPrice &&
    !isFreeOrFreemium &&
    (selectedTool.monthly_cost == null || Number(selectedTool.monthly_cost) === 0);

  return (
    <div className="p-6 rounded-xl border bg-white border-brand-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-center">
       <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-gray-500 font-heading">The <span className="text-brand-error">3-Year</span> Bleed</h3>
       
       <div className="mb-6">
         <label className="block text-sm font-bold mb-2 text-left font-sans">Team Size (Users)</label>
         <input
            type="range"
            min="1"
            max="50"
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-error"
         />
         <div className="text-right font-bold mt-1 text-2xl font-mono">{userCount} Users</div>
       </div>

       {/* Subscription Tier Selector */}
       {selectedTool.subscription_tiers && selectedTool.subscription_tiers.length > 0 && (
         <div className="mb-6">
           <label className="block text-sm font-bold mb-2 text-left font-sans">Subscription Plan</label>
           <div className="relative">
             <select
               value={selectedTier?.name || ''}
               onChange={(e) => {
                 const tier = selectedTool.subscription_tiers.find(t => t.name === e.target.value);
                 setSelectedTier(tier);
               }}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent
                        bg-white text-left font-sans font-medium text-gray-900"
             >
               {selectedTool.subscription_tiers.map((tier, idx) => (
                 <option key={idx} value={tier.name}>
                   {tier.name} - {formatTierPrice(tier, 'dropdown')}
                 </option>
               ))}
             </select>
             <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
           </div>
           {selectedTier && (
             <div className="text-right text-sm text-gray-600 mt-2 font-sans">
               {formatTierPrice(selectedTier, 'calculator')}
             </div>
           )}
         </div>
       )}

       {/* Manual price fallback */}
       {priceMissing && (
         <div className="mb-6 text-left">
           <label className="block text-sm font-bold mb-2 font-sans text-gray-800">
             Enter price per user / month
           </label>
           <input
             type="number"
             min="0"
             step="0.01"
             value={customPricePerUser ?? ''}
             onChange={(e) => setCustomPricePerUser(e.target.value)}
             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
             placeholder="e.g. 29"
           />
           <p className="text-xs text-gray-500 mt-1">
             We couldn't find pricing for this tier. Add it to keep the bleed accurate.
           </p>
         </div>
       )}

       <div className="py-6 border-t border-b border-red-200 my-6 bg-white rounded-lg">
          <div className="text-sm text-gray-500 mb-1 font-sans">Total Rent Paid to {selectedTool.name}</div>
          {isEnterpriseTier(selectedTier) ? (
            <div className="text-5xl font-extrabold text-brand-error font-heading overflow-hidden whitespace-nowrap">
              {Array(100).fill('$').join('')}
            </div>
          ) : (
            <div className="text-5xl font-extrabold text-brand-error font-heading">
              ${calculateBleed().toLocaleString()}
            </div>
          )}
          {isEnterpriseTier(selectedTier) ? (
            <div className="text-xs text-red-400 mt-2 font-medium font-sans">Way too much to count.</div>
          ) : isFreeOrFreemium && calculateBleed() === 0 ? (
            <div className="text-xs text-amber-600 mt-2 font-medium font-sans">
              FREE tier - Limited features available
            </div>
          ) : (
            <div className="text-xs text-red-400 mt-2 font-medium font-sans">Money gone forever.</div>
          )}
       </div>
    </div>
  );
};

export default BleedCalculator;
