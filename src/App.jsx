import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import useAuditStore from './store/auditStore';
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
  const { currentStep, selectedTool, calculateBleed, calculateBuildCost, setStep } = useAuditStore();

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">

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
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
             🎉
           </div>
           <h2 className="text-4xl font-bold mb-4 font-heading">Great Choice.</h2>
           <p className="text-xl text-gray-600 mb-8 font-sans">
             You could save <span className="font-bold text-green-600 font-mono">${(calculateBleed() - ((calculateBuildCost().min + calculateBuildCost().max) / 2)).toLocaleString()}</span> over the next 3 years.
           </p>
           <div className="p-6 rounded-xl border bg-white border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
             <h3 className="text-xl font-bold mb-4 font-heading">Where should we send your official quote?</h3>
             <form className="space-y-4 text-left" onSubmit={(e) => {
                 e.preventDefault();
                 alert("Lead submitted! (This would call api.submitLead)");
             }}>
               <div>
                 <label className="block font-bold text-sm mb-1 font-sans">Email Address</label>
                 <input type="email" className="w-full border p-3 rounded-lg font-sans" placeholder="you@company.com" required />
               </div>
               <button type="submit" className="w-full bg-brand-accent text-brand-surface px-6 py-3 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans">
                 Get My Sovereign Software Quote
               </button>
               <p className="text-xs text-center text-gray-400 mt-4 font-sans">
                 No spam. Just a PDF with specs and a contract.
               </p>
             </form>
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

  const handleResetToSearch = () => {
    setStep('search');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans bg-brand-surface text-brand-text">

        {/* Header */}
        <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" onClick={handleResetToSearch} className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-brand-primary"></div>
             <span className="font-bold text-xl tracking-tight font-heading">SaaSKiller</span>
          </Link>
          <nav className="hidden md:flex gap-6 font-sans">
            <Link to="/" onClick={handleResetToSearch} className="font-medium text-gray-600 hover:text-brand-secondary">Audit Tool</Link>
            <Link to="/browse" className="font-medium text-gray-600 hover:text-brand-secondary">Browse Tools</Link>
            <Link to="/pricing" className="font-medium text-gray-600 hover:text-brand-secondary">Pricing</Link>
          </nav>
          <Link to="/" onClick={handleResetToSearch} className="bg-brand-accent text-brand-surface px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 text-sm font-sans">
              Get Started
          </Link>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<ToolBrowser />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/tools/:id" element={<ToolDetailView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-12 text-center text-gray-500 text-sm border-t mt-20 font-sans">
          <p>&copy; 2025 SaaSKiller. All rights reserved.</p>
          <p className="mt-2">Built with <span className="text-brand-error">♥</span> and Vibe Coding.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
