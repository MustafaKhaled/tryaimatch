import type { Category } from '../schema'

export const dataCategory: Category = {
  id: 'data',
  label: 'Data analysis',
  icon: 'ti-chart-bar',
  questions: [
    {
      id: 'use',
      num: 1,
      title: 'What do you mostly do with your data?',
      subtitle: 'Sets the type of tool we recommend',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'explore', label: 'Quick exploration', desc: 'Upload a file, ask questions in chat',
          effects: [{ kind: 'numeric', field: 'explore', weight: 3 }] },
        { id: 'viz',     label: 'Charts & dashboards', desc: 'Make visualizations to share',
          effects: [{ kind: 'numeric', field: 'viz', weight: 3 }] },
        { id: 'sql',     label: 'SQL & notebooks', desc: 'Query databases, blend with code',
          effects: [{ kind: 'numeric', field: 'sql', weight: 3 }] },
        { id: 'csv',     label: 'Just talk to a CSV', desc: 'Simple Q&A on one spreadsheet',
          effects: [{ kind: 'numeric', field: 'csv', weight: 3 }] }
      ]
    },
    {
      id: 'size',
      num: 2,
      title: 'How big is your data?',
      subtitle: 'Some tools choke on large datasets',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'small',  label: 'Small (under 100k rows)', desc: 'Single spreadsheets',
          effects: [{ kind: 'numeric', field: 'small', weight: 2 }] },
        { id: 'medium', label: 'Medium (up to a few million)', desc: 'Departmental datasets',
          effects: [{ kind: 'numeric', field: 'medium', weight: 2 }] },
        { id: 'big',    label: 'Big (warehouse-scale)', desc: 'BigQuery, Snowflake, Redshift',
          effects: [{ kind: 'numeric', field: 'big', weight: 2 }] }
      ]
    },
    {
      id: 'skill',
      num: 3,
      title: 'How technical are you with data?',
      subtitle: 'No-code chat vs SQL/python notebook',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'nocode', label: 'No code, please', desc: 'Plain English questions only',
          effects: [{ kind: 'numeric', field: 'noCode', weight: 2 }] },
        { id: 'mix',    label: 'Some SQL or formulas', desc: 'I can read a query',
          effects: [{ kind: 'numeric', field: 'mixed', weight: 2 }] },
        { id: 'pro',    label: 'I live in notebooks', desc: 'SQL + Python is my default',
          effects: [{ kind: 'numeric', field: 'pro', weight: 2 }] }
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
        { id: 'under100',label: 'Under $100/mo', desc: 'Pro plan budget',
          effects: [{ kind: 'priceFilter', max: 100, penalty: 50, reason: '${price}/mo exceeds $100 budget' }] },
        { id: 'noLimit', label: 'No limit',      desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'julius',   name: 'Julius AI', maker: 'Julius',   icon: 'ti-chart-bar',     color: 'primary', affiliateUrl: 'https://julius.ai',
      explore: 10, viz: 9, sql: 7, csv: 9, small: 10, medium: 8, big: 5, noCode: 10, mixed: 8, pro: 6, hasFree: true,  price: 20 },
    { id: 'chatgptAdv', name: 'ChatGPT Advanced Data', maker: 'OpenAI', icon: 'ti-message-chatbot', color: 'accent', affiliateUrl: 'https://chatgpt.com',
      explore: 9, viz: 8, sql: 8, csv: 10, small: 10, medium: 7, big: 4, noCode: 9, mixed: 9, pro: 8, hasFree: false, price: 20 },
    { id: 'hex',      name: 'Hex Magic',  maker: 'Hex',     icon: 'ti-notebook',      color: 'match',   affiliateUrl: 'https://hex.tech',
      explore: 8, viz: 10, sql: 10, csv: 6, small: 8,  medium: 10, big: 10, noCode: 6, mixed: 9, pro: 10, hasFree: true,  price: 24 },
    { id: 'chatcsv',  name: 'ChatCSV',   maker: 'ChatCSV',  icon: 'ti-file-spreadsheet', color: 'primary', affiliateUrl: 'https://chatcsv.co',
      explore: 7, viz: 6, sql: 4, csv: 10, small: 10, medium: 6, big: 3, noCode: 10, mixed: 6, pro: 4, hasFree: true,  price: 10 }
  ]
}
