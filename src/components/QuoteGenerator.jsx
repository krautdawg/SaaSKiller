import React from 'react';
import useAuditStore from '../store/auditStore';

const QuoteGenerator = () => {
  const { calculateBuildCost, checkedFeatures, customFeatures, setStep } = useAuditStore();

  const activeFeaturesCount = Object.keys(checkedFeatures).filter(k => checkedFeatures[k]).length;

  return (
    <div className="p-6 rounded-xl border bg-teal-50 border-teal-200 relative overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
       <div className="absolute top-0 left-0 w-full h-2 bg-brand-secondary"></div>
       <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-teal-800 font-heading">SaaSKiller Solution</h3>
       <div className="flex justify-between items-end mb-2">
          <div className="text-4xl font-bold text-brand-text font-heading">
             ${calculateBuildCost().toLocaleString()}
          </div>
          <div className="text-sm font-bold mb-2 bg-yellow-300 px-2 py-1 rounded text-yellow-900 font-sans">One-Time Fee</div>
       </div>
       <p className="text-sm text-gray-600 mb-6 font-sans">
         Includes custom build, {activeFeaturesCount} features, 
         {customFeatures.length > 0 ? ` plus ${customFeatures.length} custom AI add-ons` : ''}, and data ownership.
       </p>
       <button 
        onClick={() => setStep('results')}
        className="w-full text-lg bg-brand-accent text-brand-surface px-6 py-3 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
       >
         Kill the Rent. Own the Code.
       </button>
    </div>
  );
};

export default QuoteGenerator;
