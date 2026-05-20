import type { Category } from '../schema'

export const writingCategory: Category = {
  id: 'writing',
  label: 'Writing & copywriting',
  icon: 'ti-writing',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What do you mostly write?',
      subtitle: 'Sets which tool fits best',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'longform',  label: 'Long-form articles', desc: 'Blogs, essays, deep guides',
          effects: [{ kind: 'numeric', field: 'longform', weight: 3 }] },
        { id: 'marketing', label: 'Marketing copy', desc: 'Ads, landing pages, emails',
          effects: [{ kind: 'numeric', field: 'marketing', weight: 3 }] },
        { id: 'editing',   label: 'Edit & polish my own writing', desc: 'Grammar, tone, clarity',
          effects: [{ kind: 'numeric', field: 'editing', weight: 3 }] },
        { id: 'chat',      label: 'General writing assistant', desc: 'Conversational ideation & drafts',
          effects: [{ kind: 'numeric', field: 'chat', weight: 3 }] }
      ]
    },
    {
      id: 'brand',
      num: 2,
      title: 'Do you need a consistent brand voice?',
      subtitle: 'Some tools learn your tone, others don\'t',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'strict', label: 'Strict brand voice', desc: 'Trained on my brand guidelines',
          effects: [{ kind: 'numeric', field: 'brandVoice', weight: 2 }] },
        { id: 'loose',  label: 'Loose — just sound human', desc: 'Default tone is fine',
          effects: [] }
      ]
    },
    {
      id: 'seo',
      num: 3,
      title: 'Do you need built-in SEO help?',
      subtitle: 'Keyword research, on-page scoring',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'yes', label: 'Yes — SEO is core', desc: 'Keyword targets, on-page suggestions',
          effects: [{ kind: 'numeric', field: 'seo', weight: 2 }] },
        { id: 'no',  label: 'Not important', desc: 'I handle SEO elsewhere',
          effects: [] }
      ]
    },
    {
      id: 'budget',
      num: 4,
      title: 'What is your budget?',
      subtitle: 'Eliminates tools that don\'t fit',
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only',     desc: 'Useful free tier, no card',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under20', label: 'Under $20/mo',  desc: 'Solid individual plan',
          effects: [{ kind: 'priceFilter', max: 20, penalty: 50, reason: '${price}/mo exceeds $20 budget' }] },
        { id: 'under50', label: 'Under $50/mo',  desc: 'Pro plan if it earns its keep',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '${price}/mo exceeds $50 budget' }] },
        { id: 'noLimit', label: 'No limit',      desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'jasper',     name: 'Jasper',     maker: 'Jasper.ai',   icon: 'ti-feather',     color: 'primary', affiliateUrl: 'https://www.jasper.ai',
      longform: 9,  marketing: 10, editing: 7, chat: 8,  brandVoice: 10, seo: 8, hasFree: false, price: 49 },
    { id: 'writesonic', name: 'Writesonic', maker: 'Writesonic',  icon: 'ti-pencil',      color: 'match',   affiliateUrl: 'https://writesonic.com',
      longform: 9,  marketing: 9,  editing: 6, chat: 7,  brandVoice: 8,  seo: 9, hasFree: true,  price: 16 },
    { id: 'grammarly',  name: 'Grammarly',  maker: 'Grammarly',   icon: 'ti-spell-check', color: 'accent',  affiliateUrl: 'https://www.grammarly.com',
      longform: 5,  marketing: 5,  editing: 10, chat: 5, brandVoice: 7,  seo: 3, hasFree: true,  price: 12 },
    { id: 'copyai',     name: 'Copy.ai',    maker: 'Copy.ai',     icon: 'ti-text-recognition', color: 'primary', affiliateUrl: 'https://www.copy.ai',
      longform: 7,  marketing: 10, editing: 6, chat: 7,  brandVoice: 8,  seo: 5, hasFree: true,  price: 36 },
    { id: 'claude',     name: 'Claude',     maker: 'Anthropic',   icon: 'ti-message-circle', color: 'match',  affiliateUrl: 'https://claude.ai',
      longform: 10, marketing: 8,  editing: 9, chat: 10, brandVoice: 7,  seo: 5, hasFree: true,  price: 20 },
    { id: 'chatgpt',    name: 'ChatGPT',    maker: 'OpenAI',      icon: 'ti-message-chatbot', color: 'accent', affiliateUrl: 'https://chatgpt.com',
      longform: 9,  marketing: 8,  editing: 8, chat: 10, brandVoice: 7,  seo: 6, hasFree: true,  price: 20 }
  ]
}
