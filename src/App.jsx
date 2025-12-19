import React, { useState } from 'react';
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
import { api } from './services/api';

/**
 * HomePage Component - Original audit flow
 */
const HomePage = () => {
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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <main id="main-content" className="container mx-auto px-4 py-12 max-w-5xl">

      {currentStep === 'search' && <ToolSearch />}

      {currentStep === 'audit' && selectedTool && (
        <div className="animate-fade-in">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-bold mb-4 font-heading">We found <span className="text-brand-secondary">{selectedTool.name}</span>.</h2>
             <p className="text-lg font-sans">Uncheck the features you NEVER use.</p>
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
           <h2 className="text-4xl font-bold mb-4 font-heading">Great Choice.</h2>
           <p className="text-xl text-gray-600 mb-8 font-sans">
             You could save <span className="font-bold text-green-600 font-mono">${(calculateBleed() - ((calculateBuildCost().min + calculateBuildCost().max) / 2)).toLocaleString()}</span> over the next 3 years.
           </p>
           <div className="p-6 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
             <h3 className="text-xl font-bold mb-4 font-heading">Where should we send your official quote?</h3>

             {submitSuccess ? (
               <div className="text-center py-8 animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                   ✅
                 </div>
                 <h4 className="text-xl font-bold mb-2 font-heading">Report Sent!</h4>
                 <p className="text-gray-600 font-sans">
                   Check your email for your detailed audit report PDF.
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
                     estimatedHours: f.estimatedHours
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
                     roiMonths
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
                   <label className="block font-bold text-sm mb-1 font-sans">Full Name</label>
                   <input
                     type="text"
                     className="w-full border p-3 rounded-lg font-sans"
                     placeholder="John Doe"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                   />
                 </div>
                 <div>
                   <label className="block font-bold text-sm mb-1 font-sans">Email Address</label>
                   <input
                     type="email"
                     className="w-full border p-3 rounded-lg font-sans"
                     placeholder="you@company.com"
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
                   {submitting ? 'Sending...' : 'Get My Sovereign Software Quote'}
                 </button>
                 <p className="text-xs text-center text-gray-400 mt-4 font-sans">
                   No spam. Just a PDF with specs and a contract.
                 </p>
               </form>
             )}
           </div>
           <button
             onClick={() => setStep('audit')}
             className="mt-8 text-gray-500 underline hover:text-gray-800 font-sans"
           >
             Back to Audit
           </button>
        </div>
      )}

    </main>
  );
};

const App = () => {
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
                       rounded transition-colors">Audit Tool</Link>
            <Link to="/browse" className="font-medium text-gray-600 hover:text-brand-secondary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       rounded transition-colors">Browse Tools</Link>
            <Link to="/pricing" className="font-medium text-gray-600 hover:text-brand-secondary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       rounded transition-colors">Pricing</Link>
          </nav>

          {/* Desktop CTA Button */}
          <Link to="/" onClick={handleResetToSearch} className="hidden md:inline-block bg-brand-accent text-brand-surface px-4 py-2 rounded-lg font-bold
                     hover:bg-red-600 hover:-translate-y-1
                     active:translate-y-0 active:scale-95 active:shadow-none
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                     shadow-lg transition-all transform duration-200 text-sm font-sans">
              Kill that SaaS!
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
                Audit Tool
              </Link>
              <Link
                to="/browse"
                onClick={closeMobileMenu}
                className="font-medium text-gray-600 hover:text-brand-secondary py-2 px-3 rounded
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         transition-colors"
              >
                Browse Tools
              </Link>
              <Link
                to="/pricing"
                onClick={closeMobileMenu}
                className="font-medium text-gray-600 hover:text-brand-secondary py-2 px-3 rounded
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         transition-colors"
              >
                Pricing
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
                Get Started
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-12 text-center text-gray-700 text-sm border-t mt-20 font-sans">
          <p>&copy; 2025 SaaSKiller. All rights reserved.</p>
          <p className="mt-2">Built with <span className="text-brand-error">♥</span> and Vibe Coding.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
