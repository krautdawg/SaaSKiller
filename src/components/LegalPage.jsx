import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../lang';

const LegalPage = ({ title, lastUpdated, sections }) => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-brand-surface">
      <main id="main-content" className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-secondary mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-sans">{t('legal.backToHome')}</span>
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">{title}</h1>

        {/* Last Updated */}
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-12 font-sans">
            {t('legal.lastUpdated')}: {new Date(lastUpdated).toLocaleDateString()}
          </p>
        )}

        {/* Sections */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {sections.map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-heading text-gray-900">{section.heading}</h2>
              <div className="font-sans">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
};

export default LegalPage;
