<script setup lang="ts">
const router = useRouter()

useSeoMeta({
  title: 'Blogs · tryaimatch',
  description: 'AI tool reviews, deep dives, and honest category comparisons. Picking a tool used to be a research project — now it isn\'t.',
  ogTitle: 'tryaimatch blog',
  ogDescription: 'AI tool reviews and comparisons.',
  ogUrl: 'https://tryaimatch.com/blogs'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://tryaimatch.com/blogs' }]
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blogs')
    .order('publishedAt', 'DESC')
    .all()
)

function formatDate(d: string | Date | undefined) {
  if (!d) return ''
  const date = new Date(d)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="page">
    <SiteNav />

    <main class="wrap">
      <header class="header">
        <span class="kicker">BLOGS</span>
        <h1 class="title">Reviews, deep dives, honest takes.</h1>
        <p class="lede">
          We write about AI tools the way you'd want a friend to brief you —
          short, useful, no sponsored fluff.
        </p>
      </header>

      <section v-if="posts && posts.length" class="list">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="post-card"
        >
          <div class="post-meta">{{ formatDate(post.publishedAt) }}</div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-desc">{{ post.description }}</p>
          <span class="post-link">Read post →</span>
        </NuxtLink>
      </section>

      <section v-else class="empty">
        <p>No posts yet — check back soon.</p>
        <button class="btn-secondary" @click="router.push('/quiz')">
          <i class="ti ti-sparkles" aria-hidden="true" /> Take the quiz instead
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.wrap{max-width:780px;margin:0 auto;padding:64px 0 80px}

.header{text-align:center;margin-bottom:48px}
.kicker{font-size:12px;font-weight:600;letter-spacing:2px;color:var(--primary)}
.title{
  font-family:var(--font-hand);
  font-size:clamp(40px,5vw,56px);font-weight:700;
  color:var(--text);line-height:1.1;letter-spacing:-.5px;
  margin:14px 0 14px;
}
.lede{font-size:15px;color:var(--text-muted);max-width:520px;margin:0 auto;line-height:1.6}

.list{display:flex;flex-direction:column;gap:14px}
.post-card{
  display:block;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:18px;
  padding:24px 28px;
  text-decoration:none;color:inherit;
  transition:border-color .15s,transform .1s;
}
.post-card:hover{border-color:var(--border2);transform:translateY(-1px)}
.post-meta{font-size:12px;color:var(--text-faint);font-weight:500;letter-spacing:.5px;margin-bottom:6px}
.post-title{font-size:22px;font-weight:600;color:var(--text);margin-bottom:8px;line-height:1.3}
.post-desc{font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:10px}
.post-link{font-size:13px;font-weight:600;color:var(--primary)}

.empty{text-align:center;color:var(--text-muted);padding:32px}
.empty p{margin-bottom:18px}
.btn-secondary{
  display:inline-flex;align-items:center;gap:8px;
  font-size:14px;font-weight:600;color:var(--text);
  background:var(--base);
  padding:11px 22px;border-radius:100px;
  border:1.5px solid var(--border2);cursor:pointer;
}
.btn-secondary:hover{background:var(--surface)}
</style>
