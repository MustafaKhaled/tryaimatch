import type { Category } from '../schema'

export const slidesCategory: Category = {
  id: 'slides',
  label: 'Presentation & slides',
  icon: 'ti-presentation',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What kind of decks do you build?',
      subtitle: 'Different tools fit different audiences',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'pitch',    label: 'Investor & sales pitches', desc: 'High-stakes, polished decks',
          effects: [{ kind: 'numeric', field: 'pitch', weight: 3 }] },
        { id: 'internal', label: 'Internal & team updates', desc: 'Status, all-hands, reports',
          effects: [{ kind: 'numeric', field: 'internal', weight: 3 }] },
        { id: 'social',   label: 'Marketing & social', desc: 'Carousels, lead magnets, promo',
          effects: [{ kind: 'numeric', field: 'social', weight: 3 }] },
        { id: 'edu',      label: 'Teaching & training', desc: 'Lessons, workshops, e-learning',
          effects: [{ kind: 'numeric', field: 'edu', weight: 3 }] }
      ]
    },
    {
      id: 'design',
      num: 2,
      title: 'How much design control do you want?',
      subtitle: 'Auto-layout vs hand-crafted slides',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'auto',   label: 'AI does the design', desc: 'Type, get a deck instantly',
          effects: [{ kind: 'numeric', field: 'auto', weight: 2 }] },
        { id: 'manual', label: 'I want full control', desc: 'Pixel-level layout & branding',
          effects: [{ kind: 'numeric', field: 'manual', weight: 2 }] }
      ]
    },
    {
      id: 'collab',
      num: 3,
      title: 'Do you collaborate with a team?',
      subtitle: 'Real-time editing matters for some',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'team', label: 'Yes — team editing', desc: 'Multiple editors, comments, share links',
          effects: [{ kind: 'numeric', field: 'collab', weight: 2 }] },
        { id: 'solo', label: 'Solo work', desc: 'Just me on the deck',
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
    { id: 'gamma',        name: 'Gamma',         maker: 'Gamma',        icon: 'ti-presentation',  color: 'primary', affiliateUrl: 'https://gamma.app',
      pitch: 9, internal: 10, social: 9, edu: 9,  auto: 10, manual: 6,  collab: 9,  hasFree: true,  price: 10 },
    { id: 'canva',        name: 'Canva',         maker: 'Canva',        icon: 'ti-palette',       color: 'match',   affiliateUrl: 'https://www.canva.com',
      pitch: 8, internal: 8,  social: 10, edu: 9, auto: 8,  manual: 10, collab: 10, hasFree: true,  price: 15 },
    { id: 'beautifulai',  name: 'Beautiful.ai',  maker: 'Beautiful.ai', icon: 'ti-sparkles',      color: 'accent',  affiliateUrl: 'https://www.beautiful.ai',
      pitch: 10, internal: 9, social: 6, edu: 7,  auto: 9,  manual: 7,  collab: 8,  hasFree: false, price: 12 }
  ]
}
