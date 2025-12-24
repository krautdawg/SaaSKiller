import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../lang';
import { blogPosts } from '../content/blog/index.jsx';

const Blog = () => {
  const { t, lang } = useLang();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory]);

  const categories = ['all', ...new Set(blogPosts.map(p => p.category))];

  const getLocalizedField = (post, fieldName) => {
    const germanFieldName = fieldName + 'DE';
    return lang === 'de' && post[germanFieldName] ? post[germanFieldName] : post[fieldName];
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      'saas-bloat': lang === 'de' ? 'SaaS Bloat' : 'SaaS Bloat',
      'cost-reduction': lang === 'de' ? 'Kostenreduktion' : 'Cost Reduction',
      'tool-comparison': lang === 'de' ? 'Tool Vergleich' : 'Tool Comparison',
      'business-tips': lang === 'de' ? 'Business Tipps' : 'Business Tips',
      'all': t('blog.allPosts') || (lang === 'de' ? 'Alle Beiträge' : 'All Posts')
    };
    return labels[cat] || cat;
  };

  return (
    <main id="main-content" className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          {t('blog.title') || 'SaaSKiller Blog'}
        </h1>
        <p className="text-xl text-gray-600 font-sans">
          {t('blog.subtitle') || 'Stop wasting money on SaaS bloat. Get expert insights on cost reduction, tool selection, and business optimization.'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-sans font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-brand-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="space-y-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                      {getCategoryLabel(post.category)}
                    </span>
                    <time className="text-sm text-gray-500 font-sans">
                      {new Date(post.date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold mb-2 font-heading hover:text-brand-secondary transition-colors">
                      {getLocalizedField(post, 'title')}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 font-sans">
                    {getLocalizedField(post, 'excerpt')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(lang === 'de' && post.tagsDE ? post.tagsDE : post.tags) && (lang === 'de' && post.tagsDE ? post.tagsDE : post.tags).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-sans">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block text-brand-secondary font-bold hover:underline transition-colors
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
                  >
                    {lang === 'de' ? 'Artikel lesen →' : 'Read Article →'}
                  </Link>
                </div>
                {post.readingTime && (
                  <div className="text-sm text-gray-500 font-sans whitespace-nowrap">
                    {post.readingTime} min {lang === 'de' ? 'Lesezeit' : 'read'}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 font-sans">
              {lang === 'de' ? 'Keine Artikel in dieser Kategorie gefunden. Schaue bald vorbei!' : 'No articles found in this category. Check back soon!'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
