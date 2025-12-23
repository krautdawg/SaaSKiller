// Blog posts index - dynamically imported content
// This file serves as the central registry for all blog posts

import { SaaSBloatPillar } from './pillars/saas-bloat-pillar';
import { CRMBloatPillar } from './pillars/crm-bloat-pillar';
import { OverpricedSaasPillar } from './pillars/overpriced-saas-pillar';

export const blogPosts = [
  {
    slug: 'saas-bloat-what-it-costs-your-business',
    title: 'SaaS Bloat: What It Costs Your Business (And How to Fix It)',
    excerpt: 'Most small businesses are drowning in SaaS tools they don\'t need. Discover how bloat happens, how much it really costs, and the simple system to eliminate it.',
    date: '2025-12-23',
    category: 'saas-bloat',
    readingTime: 12,
    author: 'Tim Neunzig',
    authorRole: 'Founder, SaaSKiller',
    tags: ['SaaS Bloat', 'Cost Reduction', 'Small Business', 'Software Audit'],
    content: <SaaSBloatPillar />,
    relatedSlugs: ['crm-bloat-how-it-happened-and-how-to-fix-it', 'why-overpriced-saas-tools-destroy-small-business-margins'],
    seoKeywords: ['SaaS bloat', 'SaaS tool bloat', 'software bloat', 'redundant SaaS', 'SaaS spending'],
    metaDescription: 'Discover how SaaS bloat costs your business thousands monthly. Learn what causes it and get a proven system to eliminate unnecessary tools.'
  },
  {
    slug: 'crm-bloat-how-it-happened-and-how-to-fix-it',
    title: 'CRM Bloat: How It Happened And How to Fix It',
    excerpt: 'Your CRM started simple. Now it\'s a monster. We show you exactly why this happens and what to do about it—without losing your data.',
    date: '2025-12-22',
    category: 'saas-bloat',
    readingTime: 10,
    author: 'Tim Neunzig',
    authorRole: 'Founder, SaaSKiller',
    tags: ['CRM', 'CRM Bloat', 'Salesforce Alternative', 'Cost Reduction'],
    content: <CRMBloatPillar />,
    relatedSlugs: ['saas-bloat-what-it-costs-your-business', 'why-overpriced-saas-tools-destroy-small-business-margins'],
    seoKeywords: ['CRM bloat', 'Salesforce bloat', 'overly complex CRM', 'CRM too expensive'],
    metaDescription: 'Why does CRM bloat happen? Learn how it develops and get a practical guide to simplify your CRM without losing critical data.'
  },
  {
    slug: 'why-overpriced-saas-tools-destroy-small-business-margins',
    title: 'Why Overpriced SaaS Tools Destroy Small Business Margins',
    excerpt: 'You\'re not cheap. You\'re not bad at business. You\'re paying too much for SaaS. Here\'s the math on how it happens and what to do about it.',
    date: '2025-12-21',
    category: 'cost-reduction',
    readingTime: 11,
    author: 'Tim Neunzig',
    authorRole: 'Founder, SaaSKiller',
    tags: ['SaaS Pricing', 'Cost Reduction', 'Small Business', 'Budget'],
    content: <OverpricedSaasPillar />,
    relatedSlugs: ['saas-bloat-what-it-costs-your-business', 'crm-bloat-how-it-happened-and-how-to-fix-it'],
    seoKeywords: ['overpriced SaaS', 'SaaS too expensive', 'reduce SaaS costs', 'SaaS budgeting'],
    metaDescription: 'SaaS tools are expensive. See the real cost of overpriced software and learn a proven formula to cut your SaaS spending by 30-50%.'
  }
];
