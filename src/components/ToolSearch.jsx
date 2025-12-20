import React, { useState, useEffect, useRef } from 'react';
import useAuditStore from '../store/auditStore';
import { api } from '../services/api';
import { useLang } from '../lang';

const ToolSearch = () => {
  const { t } = useLang();
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
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    monthly_cost: '',
    features: ''
  });
  const { setSelectedTool, setStep } = useAuditStore();
  const loadingIntervalRef = useRef(null);

  const MAX_SEARCH_LENGTH = 50;
  const MAX_NAME_LENGTH = 100;
  const MAX_COST = 100000;

  const loadingMessages = [
    t('search.loading.1'),
    t('search.loading.2'),
    t('search.loading.3'),
    t('search.loading.4')
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

  const validateField = (field, value) => {
    let errorMsg = '';

    switch (field) {
      case 'name':
        if (!value.trim()) {
          errorMsg = t('manual.validation.nameRequired');
        } else if (value.length > MAX_NAME_LENGTH) {
          errorMsg = t('manual.validation.nameLength', MAX_NAME_LENGTH);
        }
        break;

      case 'monthly_cost':
        const cost = parseFloat(value);
        if (!value || isNaN(cost)) {
          errorMsg = t('manual.validation.costRequired');
        } else if (cost < 0) {
          errorMsg = t('manual.validation.costPositive');
        } else if (cost > MAX_COST) {
          errorMsg = t('manual.validation.costMax', MAX_COST);
        }
        break;

      case 'features':
        const featuresArray = value.split('\n').filter(f => f.trim().length > 0);
        if (featuresArray.length === 0) {
          errorMsg = t('manual.validation.featuresRequired');
        } else if (featuresArray.length > 50) {
          errorMsg = t('manual.validation.featuresMax');
        }
        break;

      default:
        break;
    }

    setValidationErrors(prev => ({ ...prev, [field]: errorMsg }));
    return errorMsg === '';
  };

  const handleManualDataChange = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleManualEntry = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField('name', manualData.name);
    const isCostValid = validateField('monthly_cost', manualData.monthly_cost);
    const isFeaturesValid = validateField('features', manualData.features);

    if (!isNameValid || !isCostValid || !isFeaturesValid) {
      return;
    }

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
      setValidationErrors({ name: '', monthly_cost: '', features: '' });

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

          <h2 className="text-3xl font-bold mb-4 font-heading">{t('error.title')}</h2>
          <p className="text-xl text-gray-600 mb-8 font-sans">{error.message}</p>

          {/* Network Error - Show Retry */}
          {isNetworkError && (
            <button
              onClick={handleRetry}
              className="bg-brand-accent text-brand-surface px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
            >
              {t('error.retry')}
            </button>
          )}

          {/* Analysis Error - Show Manual Entry Option */}
          {isAnalysisError && !showManualEntry && (
            <div className="space-y-4">
              <button
                onClick={() => setShowManualEntry(true)}
                className="bg-brand-accent text-brand-surface px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
              >
                {t('error.enterManually')}
              </button>
              <p className="text-sm text-gray-500 font-sans">or</p>
              <button
                onClick={() => setError(null)}
                className="text-brand-secondary hover:underline font-sans"
              >
                {t('error.tryDifferent')}
              </button>
            </div>
          )}

          {/* Manual Entry Form */}
          {showManualEntry && (
            <div className="mt-8 bg-white p-8 rounded-lg shadow-lg text-left max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-6 font-heading text-center">{t('manual.title')}</h3>
              <form onSubmit={handleManualEntry} className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold font-sans">{t('manual.toolName')}</label>
                    <span className="text-xs text-gray-500 font-sans">
                      {manualData.name.length}/{MAX_NAME_LENGTH}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={MAX_NAME_LENGTH}
                    value={manualData.name}
                    onChange={(e) => handleManualDataChange('name', e.target.value)}
                    onBlur={(e) => validateField('name', e.target.value)}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none font-sans transition-colors
                      ${validationErrors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-brand-secondary'
                      }`}
                    placeholder="e.g., Salesforce"
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1 font-sans">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 font-sans">{t('manual.monthlyCost')}</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    max={MAX_COST}
                    value={manualData.monthly_cost}
                    onChange={(e) => handleManualDataChange('monthly_cost', e.target.value)}
                    onBlur={(e) => validateField('monthly_cost', e.target.value)}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none font-sans transition-colors
                      ${validationErrors.monthly_cost
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-brand-secondary'
                      }`}
                    placeholder="e.g., 150"
                  />
                  {validationErrors.monthly_cost && (
                    <p className="text-red-500 text-sm mt-1 font-sans">{validationErrors.monthly_cost}</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold font-sans">{t('manual.features')}</label>
                    <span className="text-xs text-gray-500 font-sans">
                      {manualData.features.split('\n').filter(f => f.trim()).length}/50 features
                    </span>
                  </div>
                  <textarea
                    required
                    rows="6"
                    value={manualData.features}
                    onChange={(e) => handleManualDataChange('features', e.target.value)}
                    onBlur={(e) => validateField('features', e.target.value)}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none font-sans transition-colors
                      ${validationErrors.features
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-brand-secondary'
                      }`}
                    placeholder="Contact Management&#10;Sales Pipeline&#10;Reporting&#10;Email Integration"
                  />
                  {validationErrors.features ? (
                    <p className="text-red-500 text-sm mt-1 font-sans">{validationErrors.features}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2 font-sans">{t('manual.featuresHint')}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-accent text-brand-surface px-6 py-3 rounded-full font-bold hover:bg-red-600 shadow-lg transition-all font-sans"
                  >
                    {t('manual.continue')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManualEntry(false);
                      setError(null);
                      setValidationErrors({ name: '', monthly_cost: '', features: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-300 shadow-lg transition-all font-sans"
                  >
                    {t('manual.cancel')}
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
            {t('hero.title.line1')}<br/>
            <span className="text-brand-accent">{t('hero.title.line2')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-sans">
            {t('hero.subtitle')} <span className="underline decoration-brand-text/30 underline-offset-4 font-bold text-brand-text">{t('hero.subtitle.highlight')}</span> {t('hero.subtitle.end')}
          </p>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-brand-text focus:outline-none shadow-lg focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 font-sans"
                value={searchTerm}
                maxLength={MAX_SEARCH_LENGTH}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-2 top-2">
                <button
                  type="submit"
                  disabled={!searchTerm.trim()}
                  className="bg-brand-accent text-brand-surface px-6 py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {t('search.button')}
                </button>
              </div>
            </form>
            {searchTerm && (
              <p className="text-xs text-gray-500 mt-2 text-right font-sans">
                {searchTerm.length}/{MAX_SEARCH_LENGTH} characters
              </p>
            )}
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
          <h2 className="text-2xl font-bold mb-2 font-heading">{t('search.auditing', searchTerm)}</h2>
          <p className="text-gray-500 font-sans animate-pulse" key={loadingMessageIndex}>
            {loadingMessages[loadingMessageIndex]}
          </p>
        </div>
      )}
    </>
  );
};

export default ToolSearch;
