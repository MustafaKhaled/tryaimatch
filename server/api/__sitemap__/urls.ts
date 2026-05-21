import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '@nuxtjs/sitemap/runtime/types'

export default defineSitemapEventHandler((): SitemapUrlInput[] => [
  { loc: '/',        changefreq: 'weekly',  priority: 1.0 },
  { loc: '/blogs',   changefreq: 'weekly',  priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.5 }
])
