import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, AlertCircle, ArrowRight, DollarSign, Clock, Shield, Code } from 'lucide-react';
import { useLang } from '../lang';

const PricingPage = () => {
  const { t, lang } = useLang();
  const [calculatorTool, setCalculatorTool] = useState('');
  const [monthlyCost, setMonthlyCost] = useState(50);
  const [teamSize, setTeamSize] = useState(5);

  // Calculate 3-year bleed and example build cost
  const threeYearBleed = monthlyCost * teamSize * 36;
  const exampleBuildCost = 3500; // Example mid-range cost
  const savings = threeYearBleed - exampleBuildCost;
  const breakevenMonths = Math.ceil(exampleBuildCost / (monthlyCost * teamSize));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: lang === 'de' ? 'EUR' : 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-white to-brand-surface">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            {t('pricing.heroTitle')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto font-sans">
            {t('pricing.heroSubtitle')}
          </p>

          {/* ROI Calculator Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 font-heading">{t('pricing.calcTitle')}</h3>

            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-bold mb-2 font-sans">{t('pricing.calcMonthly')}</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-mono">{lang === 'de' ? '€' : '$'}</span>
                  <input
                    type="number"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary font-mono"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm font-bold mb-2 font-sans">{t('pricing.calcTeam')}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-error"
                />
                <div className="text-right font-bold mt-1 text-2xl font-mono">{teamSize} {t('audit.users')}</div>
              </div>

              <div className="bg-red-50 border-l-4 border-brand-error p-6 rounded-lg">
                <div className="text-sm text-gray-600 mb-2 font-sans">{t('pricing.calcBleed')}</div>
                <div className="relative">
                  <div className="text-4xl font-bold text-brand-error mb-4 font-mono animate-pulse">
                    {formatCurrency(threeYearBleed)}
                  </div>
                  <div className="absolute inset-0 bg-red-400 blur-xl opacity-20 animate-pulse"></div>
                </div>
                <div className="text-xs text-red-600 font-sans">{t('bleed.note')}</div>
              </div>

              <div className="text-2xl font-bold text-gray-500 font-heading">{t('pricing.vs')}</div>

              <div className="bg-green-50 border-l-4 border-brand-secondary p-6 rounded-lg">
                <div className="text-sm text-gray-600 mb-2 font-sans">{t('pricing.calcBuild')}</div>
                <div className="text-4xl font-bold text-brand-secondary mb-4 font-mono">
                  {formatCurrency(exampleBuildCost)}
                </div>
                <div className="text-xs text-green-700 font-sans">{t('pricing.calcYours')}</div>
              </div>

              {savings > 0 && (
                <div className="bg-brand-primary/20 border-2 border-brand-primary p-6 rounded-lg">
                  <div className="text-sm font-bold text-gray-700 mb-1 font-sans">{t('pricing.calcYouSave')}</div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-2 font-mono">
                    {formatCurrency(savings)}
                  </div>
                  <div className="text-sm text-gray-600 font-sans">
                    {t('pricing.calcBreakeven', breakevenMonths)}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              className="mt-8 inline-block bg-brand-accent text-white px-8 py-4 rounded-lg font-bold
                         hover:bg-red-600 hover:-translate-y-1
                         active:translate-y-0 active:scale-95 active:shadow-none
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         shadow-lg transition-all transform duration-200 text-lg font-sans"
            >
              {t('pricing.auditCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.title')}</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-sans">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-brand-secondary hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">{t('pricing.starter.name')}</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  {t('pricing.starter.price')}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">{t('pricing.starter.desc')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {t('pricing.starter.features').map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-sans">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                {t('pricing.bestFor', t('pricing.starter.bestFor'))}
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all font-sans"
              >
                {t('pricing.freeQuote')}
              </Link>
            </div>

            {/* Professional Tier */}
            <div className="border-2 border-brand-secondary rounded-xl p-8 relative shadow-xl transform scale-105 hover:shadow-[0_0_40px_rgba(30,168,151,0.25)] transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-white px-4 py-1 rounded-full text-sm font-bold font-sans">
                {t('pricing.popular')}
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">{t('pricing.pro.name')}</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  {t('pricing.pro.price')}
                </div>
                <p className="text-sm text-gray-600 font-sans">{t('pricing.pro.desc')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {t('pricing.pro.features').map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-sans">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                {t('pricing.bestFor', t('pricing.pro.bestFor'))}
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-brand-accent text-white px-6 py-3 rounded-lg font-bold
                         hover:bg-red-600 hover:-translate-y-1
                         active:translate-y-0 active:scale-95 active:shadow-none
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                         shadow-lg transition-all transform duration-200 font-sans"
              >
                {t('pricing.freeQuote')}
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-brand-secondary hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-heading">{t('pricing.enterprise.name')}</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">
                  {t('pricing.enterprise.price')}
                </div>
                <p className="text-sm text-gray-600 font-sans">{t('pricing.enterprise.desc')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {t('pricing.enterprise.features').map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-sans">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs text-gray-500 italic mb-6 font-sans">
                {t('pricing.bestFor', t('pricing.enterprise.bestFor'))}
              </div>

              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all font-sans"
              >
                {t('pricing.freeQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-brand-surface">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.howItWorksTitle')}</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-sans">{t('pricing.howItWorksSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{t('pricing.step1.title')}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                {t('pricing.step1.desc')}
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">{t('pricing.step1.time')}</div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{t('pricing.step2.title')}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                {t('pricing.step2.desc')}
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">{t('pricing.step2.time')}</div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{t('pricing.step3.title')}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                {t('pricing.step3.desc')}
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">{t('pricing.step3.time')}</div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{t('pricing.step4.title')}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                {t('pricing.step4.desc')}
              </p>
              <div className="text-xs text-brand-secondary font-bold font-sans">{t('pricing.step4.time')}</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block bg-brand-accent text-white px-8 py-4 rounded-lg font-bold
                       hover:bg-red-600 hover:-translate-y-1
                       active:translate-y-0 active:scale-95 active:shadow-none
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                       shadow-lg transition-all transform duration-200 text-lg font-sans"
            >
              {t('pricing.auditCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.includedTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-heading">{t('pricing.everyBuildTitle')}</h3>
              <ul className="space-y-3">
                {t('pricing.everyBuildItems').map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 font-heading">{t('pricing.optionalTitle')}</h3>
              <ul className="space-y-3">
                {t('pricing.optionalItems').map((item, idx) => (
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
                <h4 className="font-bold mb-2 font-heading">{t('pricing.hostingTitle')}</h4>
                <p className="text-sm text-gray-700 font-sans">
                  {t('pricing.hostingDesc')}
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
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.compareTitle')}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold font-heading"></th>
                  <th className="px-6 py-4 text-center font-bold font-heading bg-brand-secondary/10">{t('pricing.compare.header1')}</th>
                  <th className="px-6 py-4 text-center font-bold font-heading">{t('pricing.compare.header2')}</th>
                  <th className="px-6 py-4 text-center font-bold font-heading">{t('pricing.compare.header3')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row1')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-mono">{t('pricing.starter.price')}-{t('pricing.pro.price')}</td>
                  <td className="px-6 py-4 text-center font-mono">{formatCurrency(0)}</td>
                  <td className="px-6 py-4 text-center font-mono">{formatCurrency(15000)}-{formatCurrency(100000)}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row2')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-mono">{t('pricing.compare.same')}</td>
                  <td className="px-6 py-4 text-center font-mono">{formatCurrency(10800)}-{formatCurrency(65000)}+</td>
                  <td className="px-6 py-4 text-center font-mono">{t('pricing.compare.same')}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row3')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5 font-sans">3-4 {t('bleed.build.weeks')}</td>
                  <td className="px-6 py-4 text-center font-sans">{t('pricing.compare.immediate')}</td>
                  <td className="px-6 py-4 text-center font-sans">3-12 {t('bleed.build.months')}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row4')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">{t('pricing.compare.sometimes')}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row5')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">{t('pricing.compare.payForBloat')}</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row6')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <X className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">{t('pricing.compare.forever')}</td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">{t('pricing.compare.sometimes')}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row7')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-gray-500">{t('pricing.compare.vendorCloud')}</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold font-sans">{t('pricing.compare.row8')}</td>
                  <td className="px-6 py-4 text-center bg-brand-secondary/5">
                    <X className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">{t('pricing.compare.priceHikes')}</td>
                  <td className="px-6 py-4 text-center font-sans text-red-600">{t('pricing.compare.scopeCreep')}</td>
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
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.faqTitle')}</h2>
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <details key={num} className="group border border-gray-200 rounded-lg p-6 hover:border-brand-secondary transition-colors">
                <summary className="font-bold text-lg cursor-pointer font-heading flex justify-between items-center">
                  {t(`pricing.faq.q${num}.q`)}
                  <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed font-sans">
                  {t(`pricing.faq.q${num}.a`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">{t('pricing.trustTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">{t('pricing.trust.price.title')}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {t('pricing.trust.price.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">{t('pricing.trust.code.title')}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {t('pricing.trust.code.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">{t('pricing.trust.time.title')}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {t('pricing.trust.time.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 font-heading">{t('pricing.trust.process.title')}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {t('pricing.trust.process.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-brand-surface">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-bold mb-6 font-heading">
            {t('pricing.finalTitle').split('. ')[0]}. <span className="text-brand-error">{t('pricing.finalTitle').split('. ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-sans">
            {t('pricing.finalSubtitle')}
          </p>

          <Link
            to="/"
            className="inline-block bg-brand-accent text-white px-12 py-5 rounded-lg font-bold
                     hover:bg-red-600 hover:-translate-y-1
                     active:translate-y-0 active:scale-95 active:shadow-none
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2
                     shadow-xl transition-all transform duration-200 text-xl font-sans mb-6"
          >
            {t('pricing.auditCta')}
          </Link>

          <p className="text-sm text-gray-500 leading-relaxed font-sans">
            {t('pricing.or')} <Link to="/browse" className="text-brand-secondary hover:underline">{t('pricing.browseLibrary')}</Link> {t('pricing.browseSuffix')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;