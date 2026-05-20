import type { Category } from '../schema'

export const seoCategory: Category = {
  id: 'seo',
  label: 'SEO & research',
  icon: 'ti-search',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What\'s your main SEO task?',
      subtitle: 'Different tools win at different jobs',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'keywords',  label: 'Keyword research', desc: 'Find search volume & opportunity',
          effects: [{ kind: 'numeric', field: 'keywords', weight: 3 }] },
        { id: 'onpage',    label: 'On-page optimization', desc: 'Score & improve existing pages',
          effects: [{ kind: 'numeric', field: 'onpage', weight: 3 }] },
        { id: 'content',   label: 'Content briefs & writing', desc: 'AI-written SEO content',
          effects: [{ kind: 'numeric', field: 'content', weight: 3 }] },
        { id: 'research',  label: 'General web research', desc: 'Live answers with citations',
          effects: [{ kind: 'numeric', field: 'research', weight: 3 }] }
      ]
    },
    {
      id: 'depth',
      num: 2,
      title: 'How deep does your SEO go?',
      subtitle: 'Indie blogger vs full SEO team',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'casual', label: 'Casual / blogger', desc: 'A few sites, keep it simple',
          effects: [{ kind: 'numeric', field: 'casual', weight: 2 }] },
        { id: 'pro',    label: 'Pro / agency', desc: 'Backlinks, audits, competitive intel',
          effects: [{ kind: 'numeric', field: 'pro', weight: 2 }] }
      ]
    },
    {
      id: 'integrations',
      num: 3,
      title: 'Do you need CMS or docs integrations?',
      subtitle: 'Push briefs into WordPress, Google Docs',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'yes', label: 'Yes — integrate with my stack', desc: 'WordPress, Docs, CMS plugins',
          effects: [{ kind: 'numeric', field: 'integrations', weight: 2 }] },
        { id: 'no',  label: 'Not important', desc: 'Copy-paste is fine',
          effects: [] }
      ]
    },
    {
      id: 'budget',
      num: 4,
      title: 'What is your budget?',
      subtitle: 'SEO tools span a huge price range',
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only',     desc: 'Useful free tier, no card',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under50', label: 'Under $50/mo',  desc: 'Solid solo SEO plan',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '${price}/mo exceeds $50 budget' }] },
        { id: 'under150',label: 'Under $150/mo', desc: 'Pro tool budget',
          effects: [{ kind: 'priceFilter', max: 150, penalty: 50, reason: '${price}/mo exceeds $150 budget' }] },
        { id: 'noLimit', label: 'No limit',      desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'surfer',     name: 'Surfer SEO',  maker: 'Surfer',     icon: 'ti-wave-square',   color: 'primary', affiliateUrl: 'https://surferseo.com',
      keywords: 8, onpage: 10, content: 9, research: 6, casual: 8, pro: 9, integrations: 9, hasFree: false, price: 89 },
    { id: 'semrush',    name: 'Semrush',     maker: 'Semrush',    icon: 'ti-chart-line',    color: 'match',   affiliateUrl: 'https://www.semrush.com',
      keywords: 10, onpage: 9, content: 8, research: 7, casual: 6, pro: 10, integrations: 9, hasFree: true,  price: 139 },
    { id: 'frase',      name: 'Frase',       maker: 'Frase',      icon: 'ti-bulb',          color: 'accent',  affiliateUrl: 'https://www.frase.io',
      keywords: 7,  onpage: 9, content: 10, research: 7, casual: 9, pro: 7, integrations: 8, hasFree: false, price: 45 },
    { id: 'ahrefs',     name: 'Ahrefs',      maker: 'Ahrefs',     icon: 'ti-anchor',        color: 'primary', affiliateUrl: 'https://ahrefs.com',
      keywords: 10, onpage: 8, content: 7, research: 8, casual: 5, pro: 10, integrations: 8, hasFree: true,  price: 129 },
    { id: 'perplexity', name: 'Perplexity',  maker: 'Perplexity', icon: 'ti-search',        color: 'match',   affiliateUrl: 'https://www.perplexity.ai',
      keywords: 6,  onpage: 4, content: 6, research: 10, casual: 10, pro: 6, integrations: 5, hasFree: true,  price: 20 }
  ]
}
