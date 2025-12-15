import React from 'react';
import useAuditStore from '../store/auditStore';
import { ChevronDown } from 'lucide-react';

const BleedCalculator = () => {
  const { selectedTool, userCount, setUserCount, calculateBleed, selectedTier, setSelectedTier } = useAuditStore();

  if (!selectedTool) return null;

  return (
    <div className="p-6 rounded-xl border bg-white border-brand-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-center">
       <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-gray-500 font-heading">The 3-Year Bleed</h3>
       
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
                   {tier.name} - ${tier.price_per_user}/user/month
                 </option>
               ))}
             </select>
             <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
           </div>
           {selectedTier && (
             <div className="text-right text-sm text-gray-600 mt-2 font-sans">
               ${selectedTier.price_per_user}/user/month
             </div>
           )}
         </div>
       )}

       <div className="py-6 border-t border-b border-red-200 my-6 bg-white rounded-lg">
          <div className="text-sm text-gray-500 mb-1 font-sans">Total Rent Paid to {selectedTool.name}</div>
          <div className="text-5xl font-extrabold text-brand-error font-heading">
            ${calculateBleed().toLocaleString()}
          </div>
          <div className="text-xs text-red-400 mt-2 font-medium font-sans">Money gone forever.</div>
       </div>
    </div>
  );
};

export default BleedCalculator;
