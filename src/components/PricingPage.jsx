import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, AlertCircle, ArrowRight, DollarSign, Clock, Shield, Code } from 'lucide-react';

const PricingPage = () => {
  const [calculatorTool, setCalculatorTool] = useState('');
  const [monthlyCost, setMonthlyCost] = useState(50);
  const [teamSize, setTeamSize] = useState(5);

  // Calculate 3-year bleed and example build cost
  const threeYearBleed = monthlyCost * teamSize * 36;
  const exampleBuildCost = 3500; // Example mid-range cost
  const savings = threeYearBleed - exampleBuildCost;
  const breakevenMonths = Math.ceil(exampleBuildCost / (monthlyCost * teamSize));

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-white to-brand-surface">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            One-Time Fee. <span className="text-brand-secondary">Lifetime Ownership.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-sans">
            Custom-built tools that do exactly what you need—nothing more, nothing less.
          </p>

          {/* ROI Calculator Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 font-heading">Calculate Your Savings</h3>

            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-bold mb-2 font-sans">Current Monthly Cost (per user)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-mono">$</span>
                  <input
                    type="number"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary font-mono"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm font-bold mb-2 font-sans">Team Size</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-error"
                />
                <div className="text-right font-bold mt-1 text-2xl font-mono">{teamSize} Users</div>
              </div>

              <div className="bg-red-50 border-l-4 border-brand-error p-6 rounded-lg">
                <div className="text-sm text-gray-600 mb-2 font-sans">3-Year SaaS Cost (The Bleed)</div>
                <div className="text-4xl font-bold text-brand-error mb-4 font-mono">
                  ${threeYearBleed.toLocaleString()}
                </div>
                <div className="text-xs text-red-600 font-sans">Money gone forever.</div>
              </div>

              <div className="text-2xl font-bold text-gray-400 font-heading">vs</div>

              <div className="bg-green-50 border-l-4 border-brand-secondary p-6 rounded-lg">
                <div className="text-sm text-gray-600 mb-2 font-sans">One-Time Build Cost (Example)</div>
                <div className="text-4xl font-bold text-brand-secondary mb-4 font-mono">
                  ${exampleBuildCost.toLocaleString()}
                </div>
                <div className="text-xs text-green-700 font-sans">Yours forever.</div>
              </div>

              {savings > 0 && (
                <div className="bg-brand-primary/20 border-2 border-brand-primary p-6 rounded-lg">
                  <div className="text-sm font-bold text-gray-700 mb-1 font-sans">YOU SAVE</div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-2 font-mono">
                    ${savings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 font-sans">
                    Breakeven in {breakevenMonths} months
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              className="mt-8 inline-block bg-brand-accent text-white px-8 py-4 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 text-lg font-sans"
            >
              Start Your Free Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">Transparent Pricing</h2>
            <p className="text-xl text-gray-600 font-sans">
              Estimates based on complexity. Final price locked in after your 1-hour scoping call.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-brand-secondary transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">Starter</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  $750 - $2.5K
                </div>
                <p className="text-sm text-gray-600 font-sans">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">3-5 core features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Simple UI (forms, tables, dashboards)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Mobile-responsive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">30 days refinement support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Full source code ownership</span>
                </li>
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                Best for: Replacing simple tools like Typeform, Calendly
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all font-sans"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Professional Tier */}
            <div className="border-2 border-brand-secondary rounded-xl p-8 relative shadow-xl transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-white px-4 py-1 rounded-full text-sm font-bold font-sans">
                MOST POPULAR
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">Professional</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  $2.5K - $8K
                </div>
                <p className="text-sm text-gray-600 font-sans">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">5-20 features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Custom workflows & automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">API integrations (3rd party)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Advanced UI components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">90 days support + 2 feature updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Priority tweaks for 1 month</span>
                </li>
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                Best for: Replacing Airtable, Notion, Monday.com
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-brand-accent hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:-translate-y-1 shadow-lg transition-all transform duration-200 font-sans"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-brand-secondary transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">Enterprise</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  $8K+
                </div>
                <p className="text-sm text-gray-600 font-sans">One-time payment</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">20+ features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Complex business logic</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Multi-role permissions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Advanced integrations & webhooks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">12 months support + quarterly planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans">Dedicated dev team</span>
                </li>
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                Best for: Replacing Salesforce, HubSpot, custom CRMs
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all font-sans"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-brand-surface">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">How It Works</h2>
            <p className="text-xl text-gray-600 font-sans">From audit to launch in 4 weeks</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Free Audit</h3>
              <p className="text-sm text-gray-600 mb-4 font-sans">
                Search your current tool. We analyze features and show you exactly what you pay for vs. what you use.
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">15 minutes</div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Scope & Quote</h3>
              <p className="text-sm text-gray-600 mb-4 font-sans">
                1-hour call to understand your needs. We create a product development document with fixed pricing.
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">1 hour + 24hr quote</div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Build</h3>
              <p className="text-sm text-gray-600 mb-4 font-sans">
                Pay 50% to start. We build with AI-assisted development. Weekly check-ins and preview builds.
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">3 weeks</div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Launch & Own</h3>
              <p className="text-sm text-gray-600 mb-4 font-sans">
                We deploy to your server. Pay remaining 50%. Full code handoff. 30-day refinement period.
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">Instant</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block bg-brand-accent text-white px-8 py-4 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-lg transition-all transform duration-200 text-lg font-sans"
            >
              Start Your Free Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">What's Included</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-heading">Every Build Comes With:</h3>
              <ul className="space-y-3">
                {[
                  'Clean, modern UI design',
                  'Secure authentication & data storage',
                  'Mobile-responsive',
                  'Deployment to your cloud',
                  'Complete source code (MIT license)',
                  'Documentation',
                  '1st month of hosting included'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 font-heading">Optional Add-Ons:</h3>
              <ul className="space-y-3">
                {[
                  'Extended support ($200/month)',
                  'Feature expansions ($150/hour)',
                  'Priority updates & bug fixes',
                  'Training sessions',
                  'White-label reseller license'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2 font-heading">Hosting & Deployment</h4>
                <p className="text-sm text-gray-700 font-sans">
                  We preferably deploy on <strong>Hetzner Cloud</strong> ($5-$100/month depending on usage).
                  You can also use your own server if preferred. First month included free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-brand-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">How We Compare</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold font-heading"></th>
                  <th className="px-6 py-4 text-center font-bold font-heading bg-brand-secondary/10">SaaS Killer</th>
                  <th className="px-6 py-4 text-center font-bold font-heading">Keep Renting</th>
                  <th className="px-6 py-4 text-center font-bold font-heading">Traditional Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Upfront Cost</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-mono">$750-$8,000</td>
                  <td className="px-6 py-4 text-center font-mono">$0</td>
                  <td className="px-6 py-4 text-center font-mono">$15,000-$100,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">3-Year Cost</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-mono">Same</td>
                  <td className="px-6 py-4 text-center font-mono">$10,800-$65,000+</td>
                  <td className="px-6 py-4 text-center font-mono">Same</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Timeline</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-sans">3-4 weeks</td>
                  <td className="px-6 py-4 text-center font-sans">Immediate</td>
                  <td className="px-6 py-4 text-center font-sans">3-12 months</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Code Ownership</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">Sometimes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Custom Features</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">Pay for bloat</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Monthly Fees</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <X className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">Forever</td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">Sometimes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Data Control</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">Vendor cloud</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">Surprise Costs</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <X className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">Price hikes</td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">Scope creep</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                How do you build so fast?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                We use AI-assisted development (Vibe Coding) that cuts coding time by 75%. What used to take 40 hours now takes 10. This speed lets us offer fixed pricing at a fraction of traditional agency costs.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                Who owns the code?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                You do. 100%. MIT license. Do whatever you want with it—modify it, sell it, hire any developer to maintain it. No strings attached.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                What if I don't like it after a week?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                No problem. We offer tweaks and refinements for up to 1 month after delivery. We'll work with you to get it right.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                What if I need changes later?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                You can hire us at $150/hour or hire any developer—it's your code. We also offer monthly support packages starting at $200/month.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                Do you handle hosting?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                We deploy to Hetzner Cloud (preferred) or your own server. Hosting costs $5-$100/month depending on usage. First month included free.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                What if the build takes longer?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                Fixed-price guarantee. If we quoted $3,000, you pay $3,000—even if it takes us longer. That's our risk, not yours.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                Can you integrate with other services?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                Most integrations are possible (Stripe, APIs, webhooks, etc.). We'll evaluate during the 1-hour scoping call and include in the quote.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
              <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                How does payment work?
                <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 font-sans">
                50% down when you approve the quote to start work. 50% on delivery when we hand over the code and deployment.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">No Contracts. No Retainers. No Surprises.</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">Fixed Price Guarantee</h3>
              <p className="text-sm text-gray-400 font-sans">
                You'll know the exact cost before we write a single line of code.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">Code Ownership</h3>
              <p className="text-sm text-gray-400 font-sans">
                MIT license. Your intellectual property. No strings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">1-Month Refinements</h3>
              <p className="text-sm text-gray-400 font-sans">
                Don't like something? We'll tweak it for up to a month after delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">Transparent Process</h3>
              <p className="text-sm text-gray-400 font-sans">
                Weekly demos. Direct Slack access. See progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-brand-surface">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-bold mb-6 font-heading">
            Stop Bleeding Cash. <span className="text-brand-error">Start Building Equity.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-sans">
            Get your free quote. No commitment required.
          </p>

          <Link
            to="/"
            className="inline-block bg-brand-accent text-white px-12 py-5 rounded-lg font-bold hover:bg-red-600 hover:-translate-y-1 shadow-xl transition-all transform duration-200 text-xl font-sans mb-6"
          >
            Start Your Free Audit →
          </Link>

          <p className="text-sm text-gray-500 font-sans">
            Or <Link to="/browse" className="text-brand-secondary hover:underline">browse our library</Link> of 100+ pre-analyzed SaaS tools
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
