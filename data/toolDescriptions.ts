// Short, factual descriptions for the directory page (/tools).
// Keyed by tool id. Sentence-or-two each — punchy, not a sales pitch.

export const toolDescriptions: Record<string, string> = {
  // ── Video ────────────────────────────────────────────────
  heygen:
    'AI avatar video maker — type a script, get a presenter video in 40+ languages. The best all-rounder for talking-head content.',
  synthesia:
    'Corporate-grade AI presenter video with 140+ languages. The go-to for L&D and enterprise training.',
  pictory:
    'Repurposes long video into highlights and short clips. Best for podcasters and YouTubers cutting up existing footage.',
  runway:
    'Cinematic generative video with camera motion and editing tools. Made for filmmakers and creative pros.',
  kling:
    'Stylised AI clips with strong motion realism on a generous free tier. A Midjourney-style aesthetic for video.',

  // ── Voiceover & audio ────────────────────────────────────
  elevenlabs:
    'The clear leader for realistic AI voice. Cloning, narration, multilingual, and character work all at studio quality.',
  murf:
    'Solid TTS narration at a fraction of ElevenLabs\' price. Best when you need decent voice on a budget.',
  descript:
    'Edit audio (and video) like a Google Doc. Best AI-powered podcast and screencast workflow.',
  playht:
    'Voice cloning specialist — competitive with ElevenLabs on cloning quality at lower price points.',

  // ── Image generation ─────────────────────────────────────
  firefly:
    'Adobe\'s commercially-safe AI image generator. Trained only on licensed content — peace of mind for brand work.',
  leonardo:
    'Powerful AI art with ControlNet, references, and inpainting. The best mix of control and quality.',
  midjourney:
    'Still the prettiest output in the category. Pure quality at the cost of a free tier and deep control.',
  ideogram:
    'The AI image generator that nails readable text. Best for posters, social graphics, and typography.',
  dalle3:
    'Best prompt-following in the category, included in ChatGPT. The "type and it just works" option.',

  // ── Writing & copywriting ───────────────────────────────
  jasper:
    'Marketing-first AI copywriter with strict brand voice training. Best for teams that publish copy weekly.',
  writesonic:
    'Affordable middle ground between Jasper and ChatGPT. Strong SEO content templates.',
  grammarly:
    'The AI editor that lives where you write. Best at polishing prose you\'ve already drafted.',
  copyai:
    'Short-form marketing copy specialist — ads, social posts, lead magnets.',
  claude:
    'The most consistent AI for long-form writing, with a 200k-token context window. Our pick for blog posts and essays.',
  chatgpt:
    'The Swiss Army knife of AI assistants. Fast, broadly capable, includes image generation via DALL·E 3.',

  // ── Coding & development ────────────────────────────────
  'claude-code':
    'Anthropic\'s agentic coding CLI — best at building full features end-to-end across many files.',
  cursor:
    'A VS Code fork with AI built in at every layer. Best in-editor experience with fast diff review.',
  'github-copilot':
    'The widest IDE coverage — VS Code, JetBrains, Neovim, Visual Studio. Best for mixed-editor teams.',
  grok:
    'xAI\'s assistant with real-time web awareness. Strong for live debugging against current docs and library changes.',
  windsurf:
    'Codeium\'s VS Code-like IDE with the Cascade agent. A generous free tier and Cursor-class capability.',
  replit:
    'Browser-based dev environment with AI built in. Best for learning, prototyping, and zero local setup.',
  'gemini-cli':
    'Google\'s terminal coding agent with a 1M-token context and free tier. Best free option for power users.',

  // ── Presentation & slides ───────────────────────────────
  gamma:
    'Type a topic, get a full deck instantly. The best AI-first presentation generator.',
  canva:
    'Design control plus AI generation, with a huge template library. Best when brand consistency matters.',
  beautifulai:
    'Pitch-deck specialist with smart slide design templates. For high-stakes presentations.',

  // ── SEO & research ──────────────────────────────────────
  surfer:
    'On-page SEO optimisation done right — content scoring against the live SERP. Pro-grade.',
  semrush:
    'The all-in-one SEO suite with AI features baked in. Best for agencies and serious teams.',
  frase:
    'AI-driven content briefs and on-page optimisation at a mid-tier price. Strong Surfer alternative.',
  ahrefs:
    'The gold standard for keyword and backlink data, with AI content tools added recently.',
  perplexity:
    'AI search with citations — way better than Google for research and competitor analysis.',

  // ── Chatbots & automation ───────────────────────────────
  zapier:
    'The largest no-code automation library — connects 7,000+ apps. Easiest path for non-developers.',
  make:
    'Visual automation with serious depth at a lower price than Zapier. Best mid-tier choice.',
  n8n:
    'Open-source automation you can self-host, with first-class AI agent support. Most powerful option.',
  botpress:
    'Specialised AI chatbot builder for customer-facing site widgets.',

  // ── Customer support ────────────────────────────────────
  tidio:
    'Easy AI live chat for solo founders and tiny teams. Strongest free tier in the category.',
  intercom:
    'Their Fin AI agent leads the industry on autonomous ticket resolution at scale.',
  freshdesk:
    'Mid-market omnichannel helpdesk with solid AI assistance. Best price-to-capability for SMBs.',

  // ── Data analysis ───────────────────────────────────────
  julius:
    'Upload a CSV, ask questions in plain English. The best non-technical data analyst tool.',
  chatgptAdv:
    'ChatGPT\'s built-in code interpreter for data work. Included with ChatGPT Plus — no separate subscription.',
  hex:
    'AI-augmented data notebooks with SQL + Python. Best for analysts working with warehouse-scale data.',
  chatcsv:
    'Lightweight CSV Q&A at the lowest price in the category. Single-purpose, easy.'
}
