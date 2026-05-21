export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org'
  ],

  // Canonical site URL — used by sitemap, robots, og:url, canonical links
  site: {
    url: 'https://www.tryaimatch.com',
    name: 'tryaimatch',
    description: 'Find the AI tool built for how you work. Take a 90-second quiz, get your top-3 matches.',
    defaultLocale: 'en'
  },

  app: {
    head: {
      title: 'tryaimatch — Find the AI tool built for how you work',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Find the AI tool built for how you work. Take a 90-second quiz and get your top-3 matches across video, voice, image, writing, coding, and more — no jargon, no ads, no bias." },
        { name: 'theme-color', content: '#7f5af0' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'tryaimatch' },
        { property: 'og:title', content: 'tryaimatch — Find the AI tool built for how you work' },
        { property: 'og:description', content: 'Take a 90-second quiz, get your top-3 AI tool matches.' },
        { property: 'og:url', content: 'https://www.tryaimatch.com' },
        { property: 'og:image', content: 'https://www.tryaimatch.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'tryaimatch — Find the AI tool built for how you work' },
        { name: 'twitter:description', content: 'Take a 90-second quiz, get your top-3 AI tool matches.' },
        { name: 'twitter:image', content: 'https://www.tryaimatch.com/og-image.png' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.tryaimatch.com' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.5.0/tabler-icons.min.css' }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-HRG7JVJRMS'
        },
        {
          innerHTML: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HRG7JVJRMS');"
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  // Sitemap config — public marketing pages only, excludes quiz flow
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/quiz', '/loading', '/results'],
    autoLastmod: true,
    xsl: false
  },

  // Robots.txt — disallow the guided flow (no SEO value, state-dependent)
  robots: {
    disallow: ['/quiz', '/loading', '/results'],
    sitemap: 'https://www.tryaimatch.com/sitemap.xml'
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpSecure: process.env.SMTP_SECURE || 'false',
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || 'tryaimatch <hello@tryaimatch.com>',
    contactToEmail: process.env.CONTACT_TO_EMAIL || 'hello@tryaimatch.com'
  }
})
