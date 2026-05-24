// Brand domain per tool id — used to fetch the logo via Clearbit's free
// logo API (https://logo.clearbit.com/<domain>). The domain is the company's
// canonical root, not necessarily our affiliate URL.
//
// To add a new tool: add the row. To override a bad/missing logo, change
// the domain or add a custom URL in the component fallback.

export const toolBrandDomains: Record<string, string> = {
  // Video
  heygen:     'heygen.com',
  synthesia:  'synthesia.io',
  pictory:    'pictory.ai',
  runway:     'runwayml.com',
  kling:      'klingai.com',

  // Voiceover & audio
  elevenlabs: 'elevenlabs.io',
  murf:       'murf.ai',
  descript:   'descript.com',
  playht:     'play.ht',

  // Image generation
  firefly:    'adobe.com',
  leonardo:   'leonardo.ai',
  midjourney: 'midjourney.com',
  ideogram:   'ideogram.ai',
  dalle3:     'openai.com',

  // Writing & copywriting
  jasper:     'jasper.ai',
  writesonic: 'writesonic.com',
  grammarly:  'grammarly.com',
  copyai:     'copy.ai',
  claude:     'anthropic.com',
  chatgpt:    'openai.com',

  // Coding & development
  'claude-code':    'anthropic.com',
  cursor:           'cursor.com',
  'github-copilot': 'github.com',
  grok:             'x.ai',
  windsurf:         'windsurf.com',
  replit:           'replit.com',
  'gemini-cli':     'google.com',

  // Presentation & slides
  gamma:        'gamma.app',
  canva:        'canva.com',
  beautifulai:  'beautiful.ai',

  // SEO & research
  surfer:     'surferseo.com',
  semrush:    'semrush.com',
  frase:      'frase.io',
  ahrefs:     'ahrefs.com',
  perplexity: 'perplexity.ai',

  // Chatbots & automation
  zapier:   'zapier.com',
  make:     'make.com',
  n8n:      'n8n.io',
  botpress: 'botpress.com',

  // Customer support
  tidio:     'tidio.com',
  intercom:  'intercom.com',
  freshdesk: 'freshworks.com',

  // Data analysis
  julius:     'julius.ai',
  chatgptAdv: 'openai.com',
  hex:        'hex.tech',
  chatcsv:    'chatcsv.co'
}

export function getLogoUrl(toolId: string): string | null {
  const domain = toolBrandDomains[toolId]
  if (!domain) return null
  // Clearbit's logo endpoint — free, no API key, returns a square PNG.
  return `https://logo.clearbit.com/${domain}?size=128`
}
