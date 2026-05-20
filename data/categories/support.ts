import type { Category } from '../schema'

export const supportCategory: Category = {
  id: 'support',
  label: 'Customer support',
  icon: 'ti-headset',
  questions: [
    {
      id: 'size',
      num: 1,
      title: 'How big is your team?',
      subtitle: 'Some tools shine for SMBs, others for enterprises',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'solo',    label: 'Solo or tiny team', desc: 'Under 5 people total',
          effects: [{ kind: 'numeric', field: 'solo', weight: 3 }] },
        { id: 'sme',     label: 'Small business', desc: '5–50 people',
          effects: [{ kind: 'numeric', field: 'sme', weight: 3 }] },
        { id: 'enterprise', label: 'Mid-market or enterprise', desc: '50+ agents, complex routing',
          effects: [{ kind: 'numeric', field: 'enterprise', weight: 3 }] }
      ]
    },
    {
      id: 'channels',
      num: 2,
      title: 'Which channels do you support?',
      subtitle: 'Email-only vs omnichannel',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'chat',  label: 'Live chat on my site', desc: 'In-page widget for visitors',
          effects: [{ kind: 'numeric', field: 'chat', weight: 2 }] },
        { id: 'email', label: 'Email & tickets', desc: 'Shared inbox + ticket workflow',
          effects: [{ kind: 'numeric', field: 'email', weight: 2 }] },
        { id: 'omni',  label: 'Omnichannel', desc: 'Chat, email, social, voice, all in one',
          effects: [{ kind: 'numeric', field: 'omni', weight: 2 }] }
      ]
    },
    {
      id: 'ai',
      num: 3,
      title: 'How much AI automation do you want?',
      subtitle: 'Full AI agent vs human-first',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'fullAi', label: 'AI handles most tickets', desc: 'Resolve autonomously, escalate when needed',
          effects: [{ kind: 'numeric', field: 'aiResolve', weight: 2 }] },
        { id: 'assist', label: 'AI assists my humans', desc: 'Draft replies, suggest articles',
          effects: [{ kind: 'numeric', field: 'aiAssist', weight: 2 }] }
      ]
    },
    {
      id: 'budget',
      num: 4,
      title: 'What is your per-agent budget?',
      subtitle: 'Support tools price per seat',
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only',         desc: 'Free plan for small teams',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under50', label: 'Under $50/agent',   desc: 'SMB-friendly seat pricing',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '${price}/agent exceeds $50 budget' }] },
        { id: 'under150',label: 'Under $150/agent',  desc: 'Pro plan budget',
          effects: [{ kind: 'priceFilter', max: 150, penalty: 50, reason: '${price}/agent exceeds $150 budget' }] },
        { id: 'noLimit', label: 'No limit',          desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'tidio',     name: 'Tidio',     maker: 'Tidio',     icon: 'ti-message-circle', color: 'accent',  affiliateUrl: 'https://www.tidio.com',
      solo: 10, sme: 9, enterprise: 5, chat: 10, email: 6, omni: 7, aiResolve: 8, aiAssist: 8, hasFree: true,  price: 29 },
    { id: 'intercom',  name: 'Intercom',  maker: 'Intercom',  icon: 'ti-headset',        color: 'primary', affiliateUrl: 'https://www.intercom.com',
      solo: 6,  sme: 9, enterprise: 10, chat: 10, email: 8, omni: 10, aiResolve: 10, aiAssist: 10, hasFree: false, price: 74 },
    { id: 'freshdesk', name: 'Freshdesk', maker: 'Freshworks',icon: 'ti-ticket',        color: 'match',   affiliateUrl: 'https://www.freshworks.com/freshdesk',
      solo: 7,  sme: 10, enterprise: 9, chat: 8, email: 10, omni: 9,  aiResolve: 8,  aiAssist: 9, hasFree: true,  price: 35 }
  ]
}
