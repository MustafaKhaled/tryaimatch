import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blogs: defineCollection({
      type: 'page',
      source: 'blogs/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.date(),
        author: z.string().optional()
      })
    })
  }
})
