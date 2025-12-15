import React, { useState } from 'react';
import useAuditStore from '../store/auditStore';

const AuditChecklist = () => {
  const { selectedTool, checkedFeatures, toggleFeature, addCustomFeature, getBloatPercentage } = useAuditStore();
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const { customFeatures } = useAuditStore();

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (newFeatureInput.trim()) {
      addCustomFeature(newFeatureInput);
      setNewFeatureInput('');
    }
  };

  if (!selectedTool) return null;

  return (
    <div>
      <div className="p-6 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-bold font-heading">Feature Audit</h3>
          <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100 text-brand-error">
            {getBloatPercentage()}% Bloat Identified
          </span>
        </div>
        
        <div className="space-y-3">
          {selectedTool.features && selectedTool.features.map((feature, idx) => (
            <label key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
              <input 
                type="checkbox" 
                checked={!!checkedFeatures[feature.name]} 
                onChange={() => toggleFeature(feature.name)}
                className="w-5 h-5 rounded border-gray-300 focus:ring-offset-0 focus:ring-0 mr-4 accent-brand-secondary"
              />
              <div className="flex-1 font-sans">
                <span className={`font-medium ${!checkedFeatures[feature.name] ? 'line-through text-gray-400' : 'text-brand-text'}`}>
                  {feature.name}
                </span>
                {feature.type === 'bloat' && (
                   <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase font-bold">Bloat</span>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <h4 className="font-bold mb-3 font-heading">Add Custom "Vibe" Features</h4>
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
    </div>
  );
};

export default AuditChecklist;
