import React, { useState, useEffect } from 'react';

// --- Design System Tokens ---
const COLORS = {
  primary: '#E8D619',      // Desaturated Yellow
  secondary: '#1EA897',    // Deep Teal
  accent: '#FF4A3A',       // Red-Orange Wrecking Ball
  surface: '#F9FAF9',      // Background
  text: '#0A0A0A',         // On-Primary
  error: '#D32F2F',        // Danger
  white: '#FFFFFF',
  border: '#E0E0E0',
  textSecondary: '#4A4A4A'
};

const FONTS = {
  heading: '"Inter", "DM Sans", sans-serif',
  body: '"Inter", "DM Sans", sans-serif',
  mono: '"Fira Code", monospace'
};

// --- Mock Data ---
const MOCK_TOOLS = [
  { id: 1, name: 'Salesforce', cost: 150, features: [
    { name: 'Lead Management', type: 'core' },
    { name: 'Opportunity Tracking', type: 'core' },
    { name: 'Einstein AI', type: 'bloat' },
    { name: 'Custom Reports', type: 'bloat' },
    { name: 'Team Chat', type: 'bloat' }
  ]},
  { id: 2, name: 'HubSpot', cost: 800, features: [
    { name: 'CRM', type: 'core' },
    { name: 'Email Marketing', type: 'core' },
    { name: 'Ad Management', type: 'bloat' },
    { name: 'Social Media Posting', type: 'bloat' },
    { name: 'Service Hub', type: 'bloat' }
  ]},
  { id: 3, name: 'Monday.com', cost: 60, features: [
    { name: 'Task Tracking', type: 'core' },
    { name: 'Kanban Boards', type: 'core' },
    { name: 'Gantt Charts', type: 'bloat' },
    { name: 'Automations', type: 'bloat' },
    { name: 'Dashboards', type: 'bloat' }
  ]}
];

// --- Components ---

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: `bg-[${COLORS.accent}] text-white hover:bg-red-600 hover:-translate-y-1 shadow-lg`,
    secondary: `bg-[${COLORS.primary}] text-[${COLORS.text}] hover:bg-yellow-400 hover:-translate-y-1 shadow-md`,
    ghost: `bg-transparent border-2 border-[${COLORS.secondary}] text-[${COLORS.secondary}] hover:bg-[${COLORS.secondary}] hover:text-white`
  };

  // Inline style fallback for the specific colors since Tailwind config isn't loaded here
  const style = {
    backgroundColor: variant === 'primary' ? COLORS.accent : variant === 'secondary' ? COLORS.primary : 'transparent',
    color: variant === 'primary' ? COLORS.white : variant === 'secondary' ? COLORS.text : COLORS.secondary,
    border: variant === 'ghost' ? `2px solid ${COLORS.secondary}` : 'none',
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', highlight = false }) => {
  const style = {
    backgroundColor: highlight ? '#FFF0F0' : COLORS.white,
    borderColor: highlight ? COLORS.accent : COLORS.border,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  return (
    <div 
      className={`p-6 rounded-xl border ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const WreckingBall = () => (
  <div className="flex justify-center mb-8 animate-swing origin-top">
    <div className="relative">
      <div className="w-1 h-20 bg-gray-800 mx-auto"></div>
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: COLORS.accent }}
      >
        KILL
      </div>
    </div>
  </div>
);

// --- Main Application ---

const SaaSKillerApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('search'); // search, audit, results
  const [checkedFeatures, setCheckedFeatures] = useState({});
  const [userCount, setUserCount] = useState(5);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API/LLM delay
    setTimeout(() => {
      const found = MOCK_TOOLS.find(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
      // Fallback if not found (simulating LLM "Auditor Agent")
      const toolData = found || {
        name: searchTerm,
        cost: 100, // Fallback cost
        features: [
          { name: 'Core Functionality', type: 'core' },
          { name: 'Basic Reporting', type: 'core' },
          { name: 'Advanced Analytics', type: 'bloat' },
          { name: 'Enterprise API', type: 'bloat' },
          { name: 'White Labeling', type: 'bloat' }
        ]
      };
      
      setSelectedTool(toolData);
      // Initialize checklist: Core checked, Bloat checked (user unchecks bloat)
      const initialChecks = {};
      toolData.features.forEach(f => initialChecks[f.name] = true);
      setCheckedFeatures(initialChecks);
      
      setLoading(false);
      setStep('audit');
    }, 1500);
  };

  const toggleFeature = (featureName) => {
    setCheckedFeatures(prev => ({
      ...prev,
      [featureName]: !prev[featureName]
    }));
  };

  const addCustomFeature = (e) => {
    e.preventDefault();
    if (newFeatureInput.trim()) {
      setCustomFeatures([...customFeatures, { name: newFeatureInput, price: 500 }]);
      setNewFeatureInput('');
    }
  };

  const calculateBleed = () => {
    if (!selectedTool) return 0;
    // Bleed = Monthly Cost * Users * 36 Months
    return selectedTool.cost * userCount * 36;
  };

  const calculateBuildCost = () => {
    const base = 2800;
    const coreFeaturesCount = selectedTool?.features.filter(f => checkedFeatures[f.name]).length || 0;
    const customCost = customFeatures.length * 500;
    const featureCost = coreFeaturesCount * 100;
    const total = base + featureCost + customCost;
    return Math.max(3000, total);
  };

  const getBloatPercentage = () => {
    if (!selectedTool) return 0;
    const total = selectedTool.features.length;
    const used = selectedTool.features.filter(f => checkedFeatures[f.name]).length;
    const unused = total - used;
    return Math.round((unused / total) * 100);
  };

  // --- Styles Injection ---
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.surface, color: COLORS.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');
        
        body { font-family: ${FONTS.body}; }
        h1, h2, h3, h4 { font-family: ${FONTS.heading}; }
        
        .wrecking-ball-anim { animation: swing 2s infinite ease-in-out; }
        
        @keyframes swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-15deg); }
          100% { transform: rotate(0deg); }
        }
        
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
           {/* Placeholder for Logo */}
           <div className="w-8 h-8 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
           <span className="font-bold text-xl tracking-tight">SaaSKiller</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="font-medium hover:text-[color:var(--secondary)]" style={{ color: COLORS.secondary }}>How it Works</a>
          <a href="#" className="font-medium hover:text-[color:var(--secondary)]" style={{ color: COLORS.secondary }}>Pricing</a>
        </nav>
        <Button variant="primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Get Started</Button>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Step 1: Search (Hero) */}
        {step === 'search' && (
          <div className="text-center py-20 fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stop Renting.<br/>
              <span style={{ color: COLORS.accent }}>Start Owning.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              You're paying for 80% bloat. We build you a custom tool with only the 20% you use. One-time fee. Yours forever.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <form onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="What SaaS are we killing today? (e.g., Salesforce)"
                  className="w-full px-6 py-4 text-lg rounded-full border-2 focus:outline-none shadow-lg"
                  style={{ borderColor: COLORS.text }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-2 top-2">
                  <Button type="submit" variant="primary" className="rounded-full" disabled={!searchTerm}>
                    {loading ? 'Scanning...' : 'Kill It'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-32 fade-in">
             <WreckingBall />
             <h2 className="text-2xl font-bold mb-2">Auditing {searchTerm}...</h2>
             <p className="text-gray-500">Analysing feature bloat and cost structures.</p>
          </div>
        )}

        {/* Step 2: Audit Checklist */}
        {step === 'audit' && !loading && selectedTool && (
          <div className="fade-in">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold mb-4">We found <span style={{ color: COLORS.secondary }}>{selectedTool.name}</span>.</h2>
               <p className="text-lg">Uncheck the features you NEVER use.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Checklist Column */}
              <div>
                <Card>
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold">Feature Audit</h3>
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100" style={{ color: COLORS.error }}>
                      {getBloatPercentage()}% Bloat Identified
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedTool.features.map((feature, idx) => (
                      <label key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
                        <input 
                          type="checkbox" 
                          checked={!!checkedFeatures[feature.name]} 
                          onChange={() => toggleFeature(feature.name)}
                          className="w-5 h-5 rounded border-gray-300 focus:ring-offset-0 focus:ring-0 mr-4 accent-teal-600"
                          style={{ accentColor: COLORS.secondary }}
                        />
                        <div className="flex-1">
                          <span className={`font-medium ${!checkedFeatures[feature.name] ? 'line-through text-gray-400' : ''}`}>
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
                    <h4 className="font-bold mb-3">Add Custom "Vibe" Features</h4>
                    <form onSubmit={addCustomFeature} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="+ Add custom AI workflow..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        value={newFeatureInput}
                        onChange={(e) => setNewFeatureInput(e.target.value)}
                      />
                      <Button variant="secondary" type="submit" style={{ padding: '8px 16px' }}>Add</Button>
                    </form>
                    {customFeatures.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {customFeatures.map((f, i) => (
                          <div key={i} className="flex justify-between text-sm bg-yellow-50 p-2 rounded text-yellow-800 border border-yellow-200">
                            <span>✨ {f.name}</span>
                            <span>+${f.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Calculator Column */}
              <div className="space-y-6">
                <Card highlight className="text-center">
                   <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-gray-500">The 3-Year Bleed</h3>
                   
                   <div className="mb-6">
                     <label className="block text-sm font-bold mb-2 text-left">Team Size (Users)</label>
                     <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        value={userCount} 
                        onChange={(e) => setUserCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: COLORS.error }}
                     />
                     <div className="text-right font-bold mt-1 text-2xl">{userCount} Users</div>
                   </div>

                   <div className="py-6 border-t border-b border-red-200 my-6 bg-white rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Total Rent Paid to {selectedTool.name}</div>
                      <div className="text-5xl font-extrabold" style={{ color: COLORS.error }}>
                        ${calculateBleed().toLocaleString()}
                      </div>
                      <div className="text-xs text-red-400 mt-2 font-medium">Money gone forever.</div>
                   </div>
                </Card>

                <Card className="bg-teal-50 border-teal-200 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: COLORS.secondary }}></div>
                   <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-teal-800">SaaSKiller Solution</h3>
                   <div className="flex justify-between items-end mb-2">
                      <div className="text-4xl font-bold" style={{ color: COLORS.text }}>
                         ${calculateBuildCost().toLocaleString()}
                      </div>
                      <div className="text-sm font-bold mb-2 bg-yellow-300 px-2 py-1 rounded text-yellow-900">One-Time Fee</div>
                   </div>
                   <p className="text-sm text-gray-600 mb-6">
                     Includes custom build, {Object.keys(checkedFeatures).filter(k => checkedFeatures[k]).length} features, 
                     {customFeatures.length > 0 ? ` plus ${customFeatures.length} custom AI add-ons` : ''}, and data ownership.
                   </p>
                   <Button variant="primary" className="w-full text-lg" onClick={() => setStep('results')}>
                     Kill the Rent. Own the Code.
                   </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Results / Lead Gen */}
        {step === 'results' && (
          <div className="max-w-2xl mx-auto text-center py-12 fade-in">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
               🎉
             </div>
             <h2 className="text-4xl font-bold mb-4">Great Choice.</h2>
             <p className="text-xl text-gray-600 mb-8">
               You could save <span className="font-bold text-green-600">${(calculateBleed() - calculateBuildCost()).toLocaleString()}</span> over the next 3 years.
             </p>
             <Card>
               <h3 className="text-xl font-bold mb-4">Where should we send your official quote?</h3>
               <form className="space-y-4 text-left">
                 <div>
                   <label className="block font-bold text-sm mb-1">Email Address</label>
                   <input type="email" className="w-full border p-3 rounded-lg" placeholder="you@company.com" />
                 </div>
                 <Button variant="primary" className="w-full">
                   Get My Sovereign Software Quote
                 </Button>
                 <p className="text-xs text-center text-gray-400 mt-4">
                   No spam. Just a PDF with specs and a contract.
                 </p>
               </form>
             </Card>
             <button 
               onClick={() => setStep('audit')} 
               className="mt-8 text-gray-500 underline hover:text-gray-800"
             >
               Back to Audit
             </button>
          </div>
        )}

      </main>

      <footer className="py-12 text-center text-gray-500 text-sm border-t mt-20">
        <p>&copy; 2025 SaaSKiller. All rights reserved.</p>
        <p className="mt-2">Built with <span style={{ color: COLORS.error }}>♥</span> and Vibe Coding.</p>
      </footer>
    </div>
  );
};

export default SaaSKillerApp;
