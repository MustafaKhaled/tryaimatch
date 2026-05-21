<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blogs').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: `${post.value.title} · tryaimatch`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogUrl: `https://tryaimatch.com${post.value.path}`,
  ogType: 'article',
  articlePublishedTime: post.value.publishedAt
    ? new Date(post.value.publishedAt).toISOString()
    : undefined,
  twitterCard: 'summary_large_image'
})
useHead({
  link: [{ rel: 'canonical', href: `https://tryaimatch.com${post.value.path}` }]
})

function formatDate(d: string | Date | undefined) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="page">
    <SiteNav />

    <main v-if="post" class="wrap">
      <button class="back" @click="router.push('/blogs')">
        <i class="ti ti-arrow-left" aria-hidden="true" /> All posts
      </button>

      <article>
        <header class="post-header">
          <div class="post-meta">{{ formatDate(post.publishedAt) }}</div>
          <h1 class="post-title">{{ post.title }}</h1>
          <p v-if="post.description" class="post-lede">{{ post.description }}</p>
        </header>

        <ContentRenderer :value="post" class="prose" />
      </article>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.wrap{max-width:680px;margin:0 auto;padding:48px 0 80px}

.back{
  display:inline-flex;align-items:center;gap:6px;
  font-size:14px;color:var(--text-muted);
  margin-bottom:28px;
  background:none;border:none;cursor:pointer;
  transition:color .15s;
}
.back:hover{color:var(--text)}

.post-header{margin-bottom:36px;text-align:left}
.post-meta{font-size:12px;color:var(--text-faint);font-weight:500;letter-spacing:.5px;margin-bottom:10px}
.post-title{
  font-size:clamp(32px,4vw,44px);font-weight:600;color:var(--text);
  line-height:1.15;letter-spacing:-.5px;
  margin-bottom:14px;
}
.post-lede{font-size:17px;color:var(--text-muted);line-height:1.6}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3){
  font-weight:600;color:var(--text);letter-spacing:-.3px;
  margin:32px 0 12px;
}
.prose :deep(h1){font-size:26px}
.prose :deep(h2){font-size:22px}
.prose :deep(h3){font-size:18px}
.prose :deep(p){font-size:16px;color:var(--text);line-height:1.7;margin-bottom:16px}
.prose :deep(a){color:var(--primary);text-decoration:underline;text-underline-offset:3px}
.prose :deep(ul),.prose :deep(ol){padding-left:24px;margin-bottom:16px}
.prose :deep(li){font-size:16px;color:var(--text);line-height:1.7;margin-bottom:6px}
.prose :deep(strong){font-weight:600;color:var(--text)}
.prose :deep(code){
  background:var(--surface2);padding:2px 6px;border-radius:4px;
  font-size:14px;font-family:'IBM Plex Mono','SF Mono',monospace;
}
.prose :deep(pre){
  background:var(--surface);border:1px solid var(--border);
  border-radius:12px;padding:16px;overflow-x:auto;
  margin-bottom:16px;
}
.prose :deep(pre code){background:none;padding:0}
.prose :deep(blockquote){
  border-left:3px solid var(--primary);
  padding-left:16px;margin:16px 0;
  color:var(--text-muted);font-style:italic;
}
</style>
