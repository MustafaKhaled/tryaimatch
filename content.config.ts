import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blogs: defineCollection({
      type: 'page',
      // Top-level .md files only — anything under _drafts/ is excluded
      source: {
        include: 'blogs/*.md',
        exclude: ['blogs/_drafts/**']
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.date(),
        author: z.string().optional(),
        // Optional fields some posts include — schema accepts them but
        // they aren't required and the post still routes off its filename.
        slug: z.string().optional(),
        coverImage: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    })
  }
})
