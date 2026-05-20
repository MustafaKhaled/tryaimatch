import type { Category } from '../schema'

export const imageCategory: Category = {
  id: 'image',
  label: 'Image generation',
  icon: 'ti-photo',
  questions: [
    {
      id: 'style',
      num: 1,
      title: 'What style of image do you mostly make?',
      subtitle: 'Each model has its own aesthetic strengths',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'photo',     label: 'Photorealistic', desc: 'Product, portrait, scene photography',
          effects: [{ kind: 'numeric', field: 'photo', weight: 3 }] },
        { id: 'art',       label: 'Stylised art', desc: 'Illustrative, painterly, concept art',
          effects: [{ kind: 'numeric', field: 'art', weight: 3 }] },
        { id: 'design',    label: 'Brand & marketing', desc: 'Logos, social posts, ad creative',
          effects: [{ kind: 'numeric', field: 'design', weight: 3 }] },
        { id: 'text',      label: 'Images with text', desc: 'Posters, typography, infographics',
          effects: [{ kind: 'numeric', field: 'text', weight: 3 }] }
      ]
    },
    {
      id: 'commercial',
      num: 2,
      title: 'Will you use these commercially?',
      subtitle: 'Licensing rules differ by tool',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'yes', label: 'Yes — commercial use', desc: 'Need clear commercial license',
          effects: [{ kind: 'hardFilter', field: 'commercial', expect: true, penalty: 30, reason: 'Commercial use restricted' }] },
        { id: 'no',  label: 'Personal / fun only', desc: 'No license worries',
          effects: [] }
      ]
    },
    {
      id: 'control',
      num: 3,
      title: 'How much control do you want?',
      subtitle: 'Prompt-only vs deep controls',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'simple',  label: 'Just prompt and go', desc: 'Type, get image, done',
          effects: [{ kind: 'numeric', field: 'simple', weight: 2 }] },
        { id: 'advanced',label: 'Layers & references', desc: 'Reference images, inpainting, ControlNet',
          effects: [{ kind: 'numeric', field: 'advanced', weight: 2 }] }
      ]
    },
    {
      id: 'budget',
      num: 4,
      title: 'What is your budget?',
      subtitle: 'Eliminates tools that don\'t fit',
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only',         desc: 'Useful free tier, no card',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under20', label: 'Under $20/mo',      desc: 'Solid individual plan',
          effects: [{ kind: 'priceFilter', max: 20, penalty: 50, reason: '${price}/mo exceeds $20 budget' }] },
        { id: 'under50', label: 'Under $50/mo',      desc: 'Pro plan if it earns its keep',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '${price}/mo exceeds $50 budget' }] },
        { id: 'noLimit', label: 'No limit',          desc: 'Best tool regardless of price',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'firefly',    name: 'Adobe Firefly', maker: 'Adobe',   icon: 'ti-flame',         color: 'accent',  affiliateUrl: 'https://www.adobe.com/products/firefly.html',
      photo: 8,  art: 7, design: 10, text: 9,  commercial: true,  simple: 9, advanced: 8,  hasFree: true,  price: 9 },
    { id: 'leonardo',   name: 'Leonardo AI',   maker: 'Leonardo', icon: 'ti-brush',        color: 'primary', affiliateUrl: 'https://leonardo.ai',
      photo: 8,  art: 10, design: 8, text: 6,  commercial: true,  simple: 8, advanced: 10, hasFree: true,  price: 12 },
    { id: 'midjourney', name: 'Midjourney',    maker: 'Midjourney', icon: 'ti-photo',      color: 'primary', affiliateUrl: 'https://www.midjourney.com',
      photo: 10, art: 10, design: 8, text: 5,  commercial: true,  simple: 9, advanced: 7,  hasFree: false, price: 10 },
    { id: 'ideogram',   name: 'Ideogram',      maker: 'Ideogram', icon: 'ti-color-swatch', color: 'match',   affiliateUrl: 'https://ideogram.ai',
      photo: 7,  art: 8, design: 9, text: 10, commercial: true,  simple: 9, advanced: 6,  hasFree: true,  price: 8 },
    { id: 'dalle3',     name: 'DALL·E 3',      maker: 'OpenAI',   icon: 'ti-circle-dot',  color: 'accent',  affiliateUrl: 'https://openai.com/dall-e-3',
      photo: 8,  art: 8, design: 8, text: 9,  commercial: true,  simple: 10, advanced: 5,  hasFree: true,  price: 20 }
  ]
}
