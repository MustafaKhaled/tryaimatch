import type { Category } from '../schema'

export const videoCategory: Category = {
  id: 'video',
  label: 'Video maker',
  icon: 'ti-video',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What kind of videos do you make?',
      subtitle: 'Sets the type of generator we recommend',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'avatar',  label: 'Talking-head avatars', desc: 'AI presenter speaks your script',
          effects: [{ kind: 'numeric', field: 'avatar', weight: 3 }] },
        { id: 'shorts',  label: 'Short-form social clips', desc: 'Reels, TikToks, Shorts from text',
          effects: [{ kind: 'numeric', field: 'shorts', weight: 3 }] },
        { id: 'cinema',  label: 'Cinematic AI footage', desc: 'Generated clips with motion & camera',
          effects: [{ kind: 'numeric', field: 'cinema', weight: 3 }] },
        { id: 'repurpose', label: 'Repurpose long video', desc: 'Auto-cut highlights from existing footage',
          effects: [{ kind: 'numeric', field: 'repurpose', weight: 3 }] }
      ]
    },
    {
      id: 'voice',
      num: 2,
      title: 'How important are realistic voices?',
      subtitle: 'Voiceover quality varies a lot between tools',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'studio', label: 'Studio-grade required', desc: 'Natural, multi-language, emotion-aware',
          effects: [{ kind: 'numeric', field: 'voice', weight: 2 }] },
        { id: 'good',   label: 'Good enough is fine', desc: 'Decent TTS, no obvious robot tone',
          effects: [{ kind: 'numeric', field: 'voice', weight: 1 }] },
        { id: 'none',   label: 'I bring my own audio', desc: 'I record voice or use music only',
          effects: [] }
      ]
    },
    {
      id: 'edit',
      num: 3,
      title: 'How hands-on do you want to be?',
      subtitle: 'Some tools auto-assemble, others give you a timeline',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'auto',   label: 'Fully automatic', desc: 'Text in, video out — minimal editing',
          effects: [{ kind: 'numeric', field: 'auto', weight: 2 }] },
        { id: 'tweak',  label: 'Quick tweaks', desc: 'Auto-edit then nudge the timeline',
          effects: [{ kind: 'numeric', field: 'tweak', weight: 2 }] },
        { id: 'manual', label: 'Full control', desc: 'Pro timeline, layers, transitions',
          effects: [{ kind: 'numeric', field: 'manual', weight: 2 }] }
      ]
    },
    {
      id: 'budget',
      num: 4,
      title: 'What is your budget?',
      subtitle: 'Eliminates tools that don\'t fit',
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only', desc: 'Useful free tier, no card',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under20', label: 'Under $20/mo', desc: 'Solid individual plan',
          effects: [{ kind: 'priceFilter', max: 20, penalty: 50, reason: '${price}/mo exceeds $20 budget' }] },
        { id: 'under50', label: 'Under $50/mo', desc: 'Pro plan if it earns its keep',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '${price}/mo exceeds $50 budget' }] },
        { id: 'noLimit', label: 'No limit', desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'heygen',    name: 'HeyGen',    maker: 'HeyGen',    icon: 'ti-video',       color: 'primary', affiliateUrl: 'https://www.heygen.com',
      avatar: 10, shorts: 8, cinema: 4,  repurpose: 7, voice: 9, auto: 9, tweak: 8, manual: 5, hasFree: true,  price: 24 },
    { id: 'synthesia', name: 'Synthesia', maker: 'Synthesia', icon: 'ti-player-play', color: 'match',   affiliateUrl: 'https://www.synthesia.io',
      avatar: 10, shorts: 6, cinema: 3,  repurpose: 4, voice: 9, auto: 9, tweak: 7, manual: 4, hasFree: true,  price: 29 },
    { id: 'pictory',   name: 'Pictory',   maker: 'Pictory',   icon: 'ti-movie',       color: 'accent',  affiliateUrl: 'https://pictory.ai',
      avatar: 4,  shorts: 9, cinema: 4,  repurpose: 10, voice: 7, auto: 9, tweak: 7, manual: 5, hasFree: false, price: 23 },
    { id: 'runway',    name: 'Runway',    maker: 'Runway',    icon: 'ti-camera',      color: 'primary', affiliateUrl: 'https://runwayml.com',
      avatar: 3,  shorts: 7, cinema: 10, repurpose: 6, voice: 5, auto: 6, tweak: 8, manual: 10, hasFree: true,  price: 15 },
    { id: 'kling',     name: 'Kling',     maker: 'Kuaishou',  icon: 'ti-sparkles',    color: 'match',   affiliateUrl: 'https://klingai.com',
      avatar: 5,  shorts: 8, cinema: 10, repurpose: 4, voice: 5, auto: 8, tweak: 6, manual: 6, hasFree: true,  price: 10 }
  ]
}
