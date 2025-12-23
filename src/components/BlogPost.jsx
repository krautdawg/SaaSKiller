import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../lang';
import { blogPosts } from '../content/blog/index.jsx';
import { ChevronLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const { lang } = useLang();

  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug);
  }, [slug]);

  if (!post) {
    return (
      <main id="main-content" className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4 font-heading">Article Not Found</h1>
          <p className="text-gray-600 mb-8 font-sans">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-brand-secondary text-white px-6 py-3 rounded-lg font-bold
                     hover:bg-opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-brand-secondary font-bold mb-8 hover:gap-3 transition-all
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Blog
      </Link>

      {/* Article Header */}
      <article className="prose prose-lg max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-brand-secondary uppercase tracking-wider">
              {post.category}
            </span>
            <time className="text-sm text-gray-500 font-sans">
              {new Date(post.date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.readingTime && (
              <span className="text-sm text-gray-500 font-sans">
                {post.readingTime} min read
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4 font-heading">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6 font-sans">{post.excerpt}</p>

          {post.author && (
            <div className="flex items-center gap-4 py-6 border-t border-b border-gray-200">
              <div>
                <p className="font-bold font-sans">{post.author}</p>
                {post.authorRole && <p className="text-sm text-gray-600 font-sans">{post.authorRole}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="my-8 text-gray-700 font-sans leading-relaxed">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {post.relatedSlugs && post.relatedSlugs.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-8 font-heading">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {post.relatedSlugs.map(relatedSlug => {
              const relatedPost = blogPosts.find(p => p.slug === relatedSlug);
              if (!relatedPost) return null;
              return (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-brand-secondary
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                >
                  <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                    {relatedPost.category}
                  </span>
                  <h4 className="text-lg font-bold mt-2 font-heading hover:text-brand-secondary transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 font-sans">{relatedPost.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 pt-12 border-t border-gray-200 bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 font-heading">
          Ready to Stop Wasting Money on SaaS?
        </h3>
        <p className="text-gray-600 mb-6 font-sans">
          Use our free audit tool to find which of your SaaS tools you could replace or eliminate.
        </p>
        <Link
          to="/"
          className="inline-block bg-brand-accent text-white px-8 py-3 rounded-lg font-bold
                   hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          Get Your Free Audit
        </Link>
      </div>
    </main>
  );
};

export default BlogPost;
