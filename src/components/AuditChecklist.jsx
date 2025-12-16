import React, { useState } from 'react';
import useAuditStore from '../store/auditStore';

const AuditChecklist = () => {
  const { selectedTool, checkedFeatures, toggleFeature, addCustomFeature, getBloatPercentage } = useAuditStore();
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [showAllCoreFeatures, setShowAllCoreFeatures] = useState(false);
  const [showAllBloatyFeatures, setShowAllBloatyFeatures] = useState(false);
  const { customFeatures } = useAuditStore();

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (newFeatureInput.trim()) {
      addCustomFeature(newFeatureInput);
      setNewFeatureInput('');
    }
  };

  if (!selectedTool) return null;

  // Separate core and bloaty features
  const coreFeatures = selectedTool.features?.filter(f => f.type === 'core') || [];
  const bloatyFeatures = selectedTool.features?.filter(f => f.type === 'bloat') || [];

  // Show only top 20 core features by default
  const visibleCoreFeatures = showAllCoreFeatures ? coreFeatures : coreFeatures.slice(0, 20);
  const remainingCoreCount = coreFeatures.length - 20;

  // Show only top 10 bloaty features by default
  const visibleBloatyFeatures = showAllBloatyFeatures ? bloatyFeatures : bloatyFeatures.slice(0, 10);
  const remainingBloatyCount = bloatyFeatures.length - 10;

  return (
    <div className="space-y-4">
      {/* Core Features Box */}
      <div className="p-4 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="text-lg font-bold font-heading">Core Features</h3>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
            {coreFeatures.length} features
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {visibleCoreFeatures.map((feature, idx) => (
            <label key={idx} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
              <input
                type="checkbox"
                checked={!!checkedFeatures[feature.name]}
                onChange={() => toggleFeature(feature.name)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-offset-0 focus:ring-0 mr-2 accent-brand-secondary flex-shrink-0"
              />
              <div className="flex-1 font-sans text-sm">
                <span className={`${!checkedFeatures[feature.name] ? 'line-through text-gray-400' : 'text-brand-text'}`}>
                  {feature.name}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Show More Button */}
        {remainingCoreCount > 0 && !showAllCoreFeatures && (
          <button
            onClick={() => setShowAllCoreFeatures(true)}
            className="mt-4 w-full py-2 text-sm text-brand-secondary hover:text-brand-secondary/80 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Show {remainingCoreCount} more core features
          </button>
        )}
        {showAllCoreFeatures && coreFeatures.length > 20 && (
          <button
            onClick={() => setShowAllCoreFeatures(false)}
            className="mt-4 w-full py-2 text-sm text-gray-600 hover:text-gray-800 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Show less
          </button>
        )}
      </div>

      {/* Bloaty Features Box */}
      {bloatyFeatures.length > 0 && (
        <div className="p-4 rounded-xl border bg-white border-red-50 border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h3 className="text-lg font-bold font-heading">Bloaty Features</h3>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">
              {getBloatPercentage()}% of features that are bloat killed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {visibleBloatyFeatures.map((feature, idx) => (
              <label key={idx} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
                <input
                  type="checkbox"
                  checked={!!checkedFeatures[feature.name]}
                  onChange={() => toggleFeature(feature.name)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-offset-0 focus:ring-0 mr-2 accent-brand-secondary flex-shrink-0"
                />
                <div className="flex-1 font-sans text-sm">
                  <span className={`${!checkedFeatures[feature.name] ? 'line-through text-gray-400' : 'text-brand-text'}`}>
                    {feature.name}
                  </span>
                  <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded uppercase font-bold">Bloat</span>
                </div>
              </label>
            ))}
          </div>

          {/* Show More Button */}
          {remainingBloatyCount > 0 && !showAllBloatyFeatures && (
            <button
              onClick={() => setShowAllBloatyFeatures(true)}
              className="mt-4 w-full py-2 text-sm text-brand-secondary hover:text-brand-secondary/80 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Show {remainingBloatyCount} more bloaty features
            </button>
          )}
          {showAllBloatyFeatures && bloatyFeatures.length > 10 && (
            <button
              onClick={() => setShowAllBloatyFeatures(false)}
              className="mt-4 w-full py-2 text-sm text-gray-600 hover:text-gray-800 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {/* Custom Features Box */}
      <div className="p-4 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <h4 className="text-lg font-bold mb-2 font-heading">Add Custom "Vibe" Features</h4>
        <form onSubmit={handleAddCustom} className="flex gap-2">
            <input 
              type="text" 
              placeholder="+ Add custom AI workflow..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-secondary font-sans"
              value={newFeatureInput}
              onChange={(e) => setNewFeatureInput(e.target.value)}
            />
            <button 
                type="submit"
                className="bg-brand-primary text-brand-text hover:bg-yellow-400 px-6 py-2 rounded-lg font-bold transition-all transform duration-200 hover:-translate-y-1 shadow-md font-sans"
            >
                Add
            </button>
          </form>
          {customFeatures.length > 0 && (
            <div className="mt-4 space-y-2">
              {customFeatures.map((f, i) => {
                // Calculate average price for this feature
                const HOURLY_RATE = 150;
                const VIBE_MULTIPLIER = 0.25;
                const vibeHours = (f.estimated_hours || 12) * VIBE_MULTIPLIER;
                const avgPrice = Math.round(vibeHours * HOURLY_RATE);

                return (
                  <div
                    key={i}
                    className={`flex justify-between items-center text-sm bg-yellow-50 p-2 rounded text-yellow-800 border border-yellow-200 font-sans ${f.isAnalyzing ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span>✨ {f.name}</span>
                      {f.isAnalyzing && (
                        <span className="text-xs text-yellow-600 animate-pulse">
                          Analyzing...
                        </span>
                      )}
                      {f.isFallback && !f.isAnalyzing && (
                        <span className="text-xs text-yellow-600" title="Used default estimate">
                          (est.)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-600">
                        {f.complexity || 'medium'}
                      </span>
                      <span className="font-bold">
                        ${avgPrice}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default AuditChecklist;
