import type { Category } from '../schema'

export const chatbotCategory: Category = {
  id: 'chatbot',
  label: 'Chatbots & automation',
  icon: 'ti-robot',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What are you trying to automate?',
      subtitle: 'Routes you to the right kind of tool',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'apps',    label: 'Connect apps & SaaS', desc: 'Trigger Slack, Sheets, Notion, etc.',
          effects: [{ kind: 'numeric', field: 'apps', weight: 3 }] },
        { id: 'aiAgents',label: 'Build AI agents & workflows', desc: 'LLMs orchestrating multi-step jobs',
          effects: [{ kind: 'numeric', field: 'aiAgents', weight: 3 }] },
        { id: 'chatbot', label: 'Customer-facing chatbot', desc: 'Site widget that answers visitors',
          effects: [{ kind: 'numeric', field: 'chatbot', weight: 3 }] },
        { id: 'internal',label: 'Internal team workflows', desc: 'Approvals, ops, notifications',
          effects: [{ kind: 'numeric', field: 'internal', weight: 3 }] }
      ]
    },
    {
      id: 'host',
      num: 2,
      title: 'Where do you want it to run?',
      subtitle: 'Cloud SaaS vs self-hosted',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'cloud', label: 'Managed cloud', desc: 'No infra to set up',
          effects: [{ kind: 'hardFilter', field: 'cloud', expect: true, penalty: 30, reason: 'No managed cloud' }] },
        { id: 'self',  label: 'Self-host / open source', desc: 'Run on my own server',
          effects: [{ kind: 'hardFilter', field: 'selfHost', expect: true, penalty: 30, reason: 'Cannot self-host' }] },
        { id: 'either',label: 'Either is fine', desc: 'No preference',
          effects: [] }
      ]
    },
    {
      id: 'skill',
      num: 3,
      title: 'How technical are you?',
      subtitle: 'Visual builder vs code-friendly',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'novisual', label: 'No code — visual only', desc: 'Drag-and-drop, no scripting',
          effects: [{ kind: 'numeric', field: 'noCode', weight: 2 }] },
        { id: 'somecode', label: 'Some code is fine', desc: 'JS / Python snippets OK',
          effects: [{ kind: 'numeric', field: 'someCode', weight: 2 }] },
        { id: 'dev',      label: 'I\'m a developer', desc: 'I want full code access',
          effects: [{ kind: 'numeric', field: 'devFriendly', weight: 2 }] }
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
    { id: 'zapier',   name: 'Zapier',   maker: 'Zapier',   icon: 'ti-bolt',        color: 'accent',  affiliateUrl: 'https://zapier.com',
      apps: 10, aiAgents: 7, chatbot: 5, internal: 9, cloud: true,  selfHost: false, noCode: 10, someCode: 7, devFriendly: 5, hasFree: true,  price: 20 },
    { id: 'make',     name: 'Make',     maker: 'Make',     icon: 'ti-share',       color: 'primary', affiliateUrl: 'https://www.make.com',
      apps: 9,  aiAgents: 8, chatbot: 5, internal: 9, cloud: true,  selfHost: false, noCode: 9,  someCode: 9, devFriendly: 7, hasFree: true,  price: 11 },
    { id: 'n8n',      name: 'n8n',      maker: 'n8n',      icon: 'ti-robot',       color: 'match',   affiliateUrl: 'https://n8n.io',
      apps: 9,  aiAgents: 10, chatbot: 6, internal: 10, cloud: true, selfHost: true,  noCode: 7,  someCode: 9, devFriendly: 10, hasFree: true,  price: 24 },
    { id: 'botpress', name: 'Botpress', maker: 'Botpress', icon: 'ti-message-2',  color: 'primary', affiliateUrl: 'https://botpress.com',
      apps: 6,  aiAgents: 9, chatbot: 10, internal: 6, cloud: true,  selfHost: true,  noCode: 8,  someCode: 9, devFriendly: 9, hasFree: true,  price: 25 }
  ]
}
