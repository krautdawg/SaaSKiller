import React, { useState, useEffect, useRef } from 'react';
import useAuditStore from '../store/auditStore';
import { api } from '../services/api';

const ToolSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualData, setManualData] = useState({
    name: '',
    monthly_cost: '',
    features: ''
  });
  const { setSelectedTool, setStep } = useAuditStore();
  const loadingIntervalRef = useRef(null);

  const loadingMessages = [
    'Connecting to Wrecking Ball...',
    'Scanning Pricing Models...',
    'Identifying Bloat...',
    'Finalizing Audit...'
  ];

  // Progressive loading effect - cycle through messages every 2.5s
  useEffect(() => {
    if (loading) {
      setLoadingMessageIndex(0);
      loadingIntervalRef.current = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [loading]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setShowManualEntry(false);

    try {
      const tool = await api.searchTools(searchTerm);

      // Successful response - transition to audit
      setSelectedTool(tool);
      setStep('audit');
      setLoading(false);

    } catch (error) {
      console.error('[ToolSearch] Error:', error);
      setLoading(false);
      setError(error);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSearch({ preventDefault: () => {} });
  };

  const handleManualEntry = async (e) => {
    e.preventDefault();

    try {
      // Parse features from textarea (one per line)
      const featuresArray = manualData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0)
        .map(f => ({
          name: f,
          type: 'core' // Default to core for manual entry
        }));

      if (featuresArray.length === 0) {
        alert('Please enter at least one feature');
        return;
      }

      // Create tool object
      const toolData = {
        name: manualData.name,
        slug: manualData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        monthly_cost: parseFloat(manualData.monthly_cost),
        features: featuresArray
      };

      // Use API to create tool (this handles formatting for us)
      const newTool = await api.createTool(toolData);

      console.log('[ToolSearch] Manual entry created:', newTool.id);

      // Update store and transition to audit screen
      setSelectedTool(newTool);
      setStep('audit');

      // Reset form
      setShowManualEntry(false);
      setManualData({ name: '', monthly_cost: '', features: '' });

    } catch (error) {
      console.error('[ToolSearch] Manual entry error:', error);
      alert('Failed to save tool data. Please try again.');
    }
  };

  // Render error state
  if (error) {
    const isNetworkError = error.type === 'network' || error.type === 'timeout';
    const isAnalysisError = error.type === 'analysis' || error.type === 'server' || error.type === 'not_found';

    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-4xl">⚠️</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4 font-heading">Oops!</h2>
          <p className="text-xl text-gray-600 mb-8 font-sans">{error.message}</p>

          {/* Network Error - Show Retry */}
          {isNetworkError && (
            <button
              onClick={handleRetry}
              className="bg-brand-accent text-brand-surface px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
            >
              Retry Connection
            </button>
          )}

          {/* Analysis Error - Show Manual Entry Option */}
          {isAnalysisError && !showManualEntry && (
            <div className="space-y-4">
              <button
                onClick={() => setShowManualEntry(true)}
                className="bg-brand-accent text-brand-surface px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
              >
                Enter Manually
              </button>
              <p className="text-sm text-gray-500 font-sans">or</p>
              <button
                onClick={() => setError(null)}
                className="text-brand-secondary hover:underline font-sans"
              >
                Try a Different Tool
              </button>
            </div>
          )}

          {/* Manual Entry Form */}
          {showManualEntry && (
            <div className="mt-8 bg-white p-8 rounded-lg shadow-lg text-left max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-6 font-heading text-center">Manual Entry</h3>
              <form onSubmit={handleManualEntry} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 font-sans">Tool Name</label>
                  <input
                    type="text"
                    required
                    value={manualData.name}
                    onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-secondary font-sans"
                    placeholder="e.g., Salesforce"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-sans">Monthly Cost (USD)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={manualData.monthly_cost}
                    onChange={(e) => setManualData({ ...manualData, monthly_cost: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-secondary font-sans"
                    placeholder="e.g., 150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-sans">Features (one per line)</label>
                  <textarea
                    required
                    rows="6"
                    value={manualData.features}
                    onChange={(e) => setManualData({ ...manualData, features: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-secondary font-sans"
                    placeholder="Contact Management&#10;Sales Pipeline&#10;Reporting&#10;Email Integration"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-sans">Enter each feature on a new line</p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-accent text-brand-surface px-6 py-3 rounded-full font-bold hover:bg-red-600 shadow-lg transition-all font-sans"
                  >
                    Continue to Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManualEntry(false);
                      setError(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-300 shadow-lg transition-all font-sans"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {!loading ? (
        <div className="text-center py-20 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-heading">
            Stop Renting.<br/>
            <span className="text-brand-accent">Start Owning.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-sans">
            You're paying for 80% bloat. We build you a custom tool with only the 20% you use. One-time fee. Yours forever.
          </p>

          <div className="max-w-xl mx-auto relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="What SaaS are we killing today? (e.g., Salesforce)"
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-brand-text focus:outline-none shadow-lg focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 font-sans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-2 top-2">
                <button
                  type="submit"
                  disabled={!searchTerm}
                  className="bg-brand-accent text-brand-surface px-6 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  Kill It
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 animate-fade-in">
          <div className="flex justify-center mb-8 animate-swing origin-top">
            <div className="relative">
              <div className="w-1 h-20 bg-gray-800 mx-auto"></div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold bg-brand-accent">
                KILL
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 font-heading">Auditing {searchTerm}...</h2>
          <p className="text-gray-500 font-sans animate-pulse" key={loadingMessageIndex}>
            {loadingMessages[loadingMessageIndex]}
          </p>
        </div>
      )}
    </>
  );
};

export default ToolSearch;
