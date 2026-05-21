export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'tryaimatch — Find the AI tool built for how you work',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Answer 5 quick questions and we\'ll match you with the right AI tools — no jargon, no ads, no bias.' }
      ],
      link: [
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
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpSecure: process.env.SMTP_SECURE || 'false', // 'true' for port 465
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || 'tryaimatch <hello@tryaimatch.com>',
    contactToEmail: process.env.CONTACT_TO_EMAIL || 'hello@tryaimatch.com'
  }
})
