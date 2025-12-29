import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useAuditStore from './store/auditStore';
import logo from './assets/logo.png';
import ToolSearch from './components/ToolSearch';
import AuditChecklist from './components/AuditChecklist';
import BleedCalculator from './components/BleedCalculator';
import QuoteGenerator from './components/QuoteGenerator';
import ToolBrowser from './components/ToolBrowser';
import ToolDetailView from './components/ToolDetailView';
import PricingPage from './components/PricingPage';
import LanguageToggle from './components/LanguageToggle';
import LegalPage from './components/LegalPage';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { useLang, getLang } from './lang';
import { api } from './services/api';
import { impressumDE } from './content/legal/impressum.de.jsx';
import { impressumEN } from './content/legal/impressum.en.jsx';
import { datenschutzDE } from './content/legal/datenschutz.de.jsx';
import { datenschutzEN } from './content/legal/datenschutz.en.jsx';

/**
 * HomePage Component - Original audit flow
 */
const HomePage = () => {
  const { t } = useLang();
  const {
    currentStep,
    selectedTool,
    selectedTier,
    userCount,
    checkedFeatures,
    customFeatures,
    calculateBleed,
    calculateBuildCost,
    setStep
  } = useAuditStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(() => {
    // Restore submission state from localStorage
    const saved = localStorage.getItem('auditSubmissionSuccess');
    return saved === 'true';
  });

  // Persist submission success state to localStorage
  useEffect(() => {
    localStorage.setItem('auditSubmissionSuccess', submitSuccess);
  }, [submitSuccess]);

  // Clear submission state when starting a new audit
  useEffect(() => {
    if (currentStep === 'search') {
      setSubmitSuccess(false);
      localStorage.removeItem('auditSubmissionSuccess');
    }
  }, [currentStep]);

  return (
    <main id="main-content" className="container mx-auto px-4 py-12 max-w-5xl">

      {currentStep === 'search' && <ToolSearch />}

      {currentStep === 'audit' && selectedTool && (
        <div className="animate-fade-in">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-bold mb-4 font-heading">{t('audit.found', selectedTool.name)}</h2>
             <p className="text-lg font-sans">{t('audit.instruction')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <AuditChecklist />
            <div className="space-y-6">
              <BleedCalculator />
              <QuoteGenerator />
            </div>
          </div>
        </div>
      )}

      {currentStep === 'results' && (
        <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">
             🎉
           </div>
           <h2 className="text-4xl font-bold mb-4 font-heading">{t('results.title')}</h2>
           <p className="text-xl text-gray-600 mb-8 font-sans">
             {t('results.savings', (calculateBleed() - ((calculateBuildCost().min + calculateBuildCost().max) / 2)).toLocaleString())}
           </p>
           <div className="p-6 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
             <h3 className="text-xl font-bold mb-4 font-heading">{t('results.form.title')}</h3>

             {submitSuccess ? (
               <div className="text-center py-8 animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                   ✅
                 </div>
                 <h4 className="text-xl font-bold mb-2 font-heading">{t('results.success.title')}</h4>
                 <p className="text-gray-600 font-sans">
                   {t('results.success.message')}
                 </p>
               </div>
             ) : (
               <form className="space-y-4 text-left" onSubmit={async (e) => {
                 e.preventDefault();
                 setSubmitting(true);
                 setSubmitError(null);

                 try {
                   const buildCost = calculateBuildCost();
                   const bleedAmount = calculateBleed();
                   const savingsAmount = bleedAmount - ((buildCost.min + buildCost.max) / 2);
                   const roiMonths = savingsAmount > 0 ? Math.ceil(((buildCost.min + buildCost.max) / 2) / (bleedAmount / 12)) : null;

                   // Build features arrays
                   const featuresKept = selectedTool.features
                     .filter(f => checkedFeatures[f.name])
                     .map(f => ({ name: f.name, complexity: f.complexity || 'medium' }));

                   const featuresRemoved = selectedTool.features
                     .filter(f => !checkedFeatures[f.name])
                     .map(f => ({ name: f.name, complexity: f.complexity || 'medium' }));

                   const customFeaturesFormatted = customFeatures.map(f => ({
                     name: f.name,
                     complexity: f.complexity,
                     estimatedHours: f.estimated_hours
                   }));

                   const auditData = {
                     name,
                     email,
                     toolId: selectedTool.id || null,
                     toolName: selectedTool.name,
                     tierId: selectedTier?.id || null,
                     tierName: selectedTier?.tier_name || null,
                     teamSize: userCount,
                     featuresKept,
                     featuresRemoved,
                     customFeatures: customFeaturesFormatted,
                     bleedAmount,
                     buildCostMin: buildCost.min,
                     buildCostMax: buildCost.max,
                     savingsAmount,
                     roiMonths,
                     language: getLang()
                   };

                   await api.submitAuditReport(auditData);
                   setSubmitSuccess(true);

                 } catch (error) {
                   console.error('Submission error:', error);
                   setSubmitError(error.message || 'Failed to submit audit report. Please try again.');
                 } finally {
                   setSubmitting(false);
                 }
               }}>
                 <div>
                   <label className="block font-bold text-sm mb-1 font-sans">{t('results.form.name')}</label>
                   <input
                     type="text"
                     className="w-full border p-3 rounded-lg font-sans"
                     placeholder={t('results.form.namePlaceholder')}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                   />
                 </div>
                 <div>
                   <label className="block font-bold text-sm mb-1 font-sans">{t('results.form.email')}</label>
                   <input
                     type="email"
                     className="w-full border p-3 rounded-lg font-sans"
                     placeholder={t('results.form.emailPlaceholder')}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                   />
                 </div>

                 {submitError && (
                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-sans">
                     {submitError}
                   </div>
                 )}

                 <button
                   type="submit"
                   disabled={submitting}
                   className="w-full bg-brand-accent text-brand-surface px-6 py-3 rounded-lg font-bold
                              hover:bg-red-600 hover:-translate-y-1
                              active:translate-y-0 active:scale-95 active:shadow-none
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                              disabled:opacity-50 disabled:cursor-not-allowed
                              shadow-lg transition-all transform duration-200 font-sans"
                 >
                   {submitting ? t('results.form.submitting') : t('results.form.submit')}
                 </button>
                 <p className="text-xs text-center text-gray-400 mt-4 font-sans">
                   {t('results.form.note')}
                 </p>
               </form>
             )}
           </div>
           <button
             onClick={() => setStep('audit')}
             className="mt-8 text-gray-500 underline hover:text-gray-800 font-sans"
           >
             {t('results.backToAudit')}
           </button>
        </div>
      )}

    </main>
  );
};

/**
 * Legal Pages Wrapper Components
 */
const ImpressumPage = () => {
  const { lang } = useLang();
  const content = lang === 'de' ? impressumDE : impressumEN;
  return <LegalPage {...content} />;
};

const DatenschutzPage = () => {
  const { lang } = useLang();
  const content = lang === 'de' ? datenschutzDE : datenschutzEN;
  return <LegalPage {...content} />;
};

const App = () => {
  const { t } = useLang();
  const { setStep } = useAuditStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResetToSearch = () => {
    setStep('search');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans bg-brand-surface text-brand-text">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-accent text-white px-4 py-2 rounded-lg z-50 font-bold shadow-lg">
          Skip to content
        </a>

        {/* Header */}
        <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" onClick={handleResetToSearch} className="flex items-center gap-2">
             <img src={logo} alt="SaaSKiller" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 font-sans">
            <Link to="/" onClick={handleResetToSearch} className="font-medium text-gray-600 hover:text-brand-secondary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       rounded transition-colors">{t('nav.auditTool')}</Link>
            <Link to="/browse" className="font-medium text-gray-600 hover:text-brand-secondary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       rounded transition-colors">{t('nav.browse')}</Link>
            <Link to="/pricing" className="font-medium text-gray-600 hover:text-brand-secondary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       rounded transition-colors">{t('nav.pricing')}</Link>
          </nav>

          {/* Desktop CTA Button */}
          <Link to="/" onClick={handleResetToSearch} className="hidden md:inline-block bg-brand-accent text-brand-surface px-4 py-2 rounded-lg font-bold
                     hover:bg-red-600 hover:-translate-y-1
                     active:translate-y-0 active:scale-95 active:shadow-none
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                     shadow-lg transition-all transform duration-200 text-sm font-sans">
              {t('cta.kill')}
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-brand-secondary
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                     rounded transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-fade-in">
            <nav className="flex flex-col p-4 space-y-3 font-sans">
              <Link
                to="/"
                onClick={() => { handleResetToSearch(); closeMobileMenu(); }}
                className="font-medium text-gray-600 hover:text-brand-secondary py-2 px-3 rounded
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         transition-colors"
              >
                {t('nav.auditTool')}
              </Link>
              <Link
                to="/browse"
                onClick={closeMobileMenu}
                className="font-medium text-gray-600 hover:text-brand-secondary py-2 px-3 rounded
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         transition-colors"
              >
                {t('nav.browse')}
              </Link>
              <Link
                to="/pricing"
                onClick={closeMobileMenu}
                className="font-medium text-gray-600 hover:text-brand-secondary py-2 px-3 rounded
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         transition-colors"
              >
                {t('nav.pricing')}
              </Link>
              <Link
                to="/"
                onClick={() => { handleResetToSearch(); closeMobileMenu(); }}
                className="bg-brand-accent text-brand-surface px-4 py-3 rounded-lg font-bold text-center
                         hover:bg-red-600
                         active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         shadow-lg transition-all duration-200"
              >
                {t('nav.getStarted')}
              </Link>
            </nav>
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<ToolBrowser />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/tools/:id" element={<ToolDetailView />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-12 text-center text-gray-700 text-sm border-t mt-20 font-sans">
          <div className="container mx-auto max-w-5xl px-4">
            {/* Legal Links - MUST be visible and prominent per TMG §5 */}
            <div className="flex justify-center gap-6 mb-4 text-xs">
              <Link
                to="/impressum"
                className="hover:text-brand-secondary transition-colors underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
              >
                {t('footer.impressum')}
              </Link>
              <Link
                to="/datenschutz"
                className="hover:text-brand-secondary transition-colors underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
              >
                {t('footer.datenschutz')}
              </Link>
              <Link
                to="/blog"
                className="hover:text-brand-secondary transition-colors underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
              >
                Blog
              </Link>
            </div>

            {/* Existing Content */}
            <p>{t('footer.copyright')}</p>
            <p className="mt-2">{t('footer.tagline')}</p>
            <LanguageToggle />
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
