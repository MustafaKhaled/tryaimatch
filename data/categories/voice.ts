import type { Category } from '../schema'

export const voiceCategory: Category = {
  id: 'voice',
  label: 'Voiceover & audio',
  icon: 'ti-microphone',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What are you producing?',
      subtitle: 'Different tools excel at different formats',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'narration', label: 'Narration & voiceover', desc: 'YouTube, ads, e-learning',
          effects: [{ kind: 'numeric', field: 'narration', weight: 3 }] },
        { id: 'podcast',   label: 'Podcasts & interviews', desc: 'Multi-speaker recording & editing',
          effects: [{ kind: 'numeric', field: 'podcast', weight: 3 }] },
        { id: 'cloning',   label: 'Voice cloning', desc: 'Clone my own or a custom voice',
          effects: [{ kind: 'numeric', field: 'cloning', weight: 3 }] },
        { id: 'characters',label: 'Characters & audiobooks', desc: 'Multiple voices, emotion, range',
          effects: [{ kind: 'numeric', field: 'characters', weight: 3 }] }
      ]
    },
    {
      id: 'langs',
      num: 2,
      title: 'How many languages do you need?',
      subtitle: 'Multilingual coverage varies a lot',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'one',    label: 'Just English', desc: 'English-only is fine',
          effects: [] },
        { id: 'few',    label: 'A handful', desc: '2–5 major languages',
          effects: [{ kind: 'numeric', field: 'multilingual', weight: 1 }] },
        { id: 'many',   label: 'Many languages', desc: '20+ languages required',
          effects: [{ kind: 'numeric', field: 'multilingual', weight: 2 }] }
      ]
    },
    {
      id: 'edit',
      num: 3,
      title: 'Do you need editing tools too?',
      subtitle: 'Some tools are pure TTS, others are full studios',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'tts',    label: 'Just TTS output', desc: 'Generate audio, edit elsewhere',
          effects: [{ kind: 'numeric', field: 'ttsOnly', weight: 2 }] },
        { id: 'studio', label: 'Full audio studio', desc: 'Record, edit, transcript, multitrack',
          effects: [{ kind: 'numeric', field: 'studio', weight: 2 }] }
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
    { id: 'elevenlabs', name: 'ElevenLabs', maker: 'ElevenLabs', icon: 'ti-microphone',     color: 'primary', affiliateUrl: 'https://elevenlabs.io',
      narration: 10, podcast: 7, cloning: 10, characters: 10, multilingual: 10, ttsOnly: 10, studio: 5, hasFree: true,  price: 22 },
    { id: 'murf',       name: 'Murf',       maker: 'Murf.ai',   icon: 'ti-speakerphone',   color: 'match',   affiliateUrl: 'https://murf.ai',
      narration: 10, podcast: 5, cloning: 6,  characters: 7,  multilingual: 9,  ttsOnly: 9,  studio: 6, hasFree: true,  price: 19 },
    { id: 'descript',   name: 'Descript',   maker: 'Descript',  icon: 'ti-wave-sine',      color: 'accent',  affiliateUrl: 'https://www.descript.com',
      narration: 7,  podcast: 10, cloning: 7, characters: 6,  multilingual: 6,  ttsOnly: 5,  studio: 10, hasFree: true,  price: 16 },
    { id: 'playht',     name: 'Play.ht',    maker: 'Play.ht',   icon: 'ti-player-play',    color: 'primary', affiliateUrl: 'https://play.ht',
      narration: 9,  podcast: 7,  cloning: 9, characters: 8,  multilingual: 9,  ttsOnly: 9,  studio: 5, hasFree: true,  price: 17 }
  ]
}
