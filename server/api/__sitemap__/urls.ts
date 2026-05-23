import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '@nuxtjs/sitemap/runtime/types'
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event): Promise<SitemapUrlInput[]> => {
  const staticUrls: SitemapUrlInput[] = [
    { loc: '/',        changefreq: 'weekly',  priority: 1.0 },
    { loc: '/tools',   changefreq: 'weekly',  priority: 0.8 },
    { loc: '/blogs',   changefreq: 'weekly',  priority: 0.7 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.5 }
  ]

  // Pull all blog posts and add them as sitemap entries
  let posts: SitemapUrlInput[] = []
  try {
    const all = await queryCollection(event, 'blogs').all()
    posts = all.map((post: any) => ({
      loc: post.path,
      lastmod: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      changefreq: 'monthly' as const,
      priority: 0.6
    }))
  } catch (e) {
    console.warn('[sitemap] failed to load blog posts', e)
  }

  return [...staticUrls, ...posts]
})
