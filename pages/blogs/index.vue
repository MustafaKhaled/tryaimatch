<script setup lang="ts">
const router = useRouter()

useSeoMeta({
  title: 'Find Your Best-Fit AI Tool | tryaimatch Blog',
  description: 'Honest AI tool reviews and head-to-head comparisons to help you find the best AI tool for your needs — coding, video, voice, image, writing, SEO, and more.',
  ogTitle: 'Find Your Best-Fit AI Tool | tryaimatch Blog',
  ogDescription: 'Reviews, comparisons, and guides to help you find the AI tool that actually fits your needs.',
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
        <span class="kicker">THE TRYAIMATCH BLOG</span>
        <h1 class="title">Find Your Best-Fit AI Tool</h1>
        <p class="lede">
          Reviews, deep dives, and head-to-head comparisons to help you find
          the AI tool that actually fits how you work — no sponsored picks,
          no listicle fluff.
        </p>
      </header>

      <section class="intro">
        <p>
          Finding the best AI tool for your needs in 2026 takes more than
          reading a single listicle. New tools launch every week, established
          ones rebrand or pivot, and every category has dozens of "best AI
          for X" posts competing for your attention. Most are paid placements
          dressed up as editorial. The result: you spend hours comparing
          options and still aren't sure which one fits.
        </p>
        <p>
          The tryaimatch blog exists to shortcut that. Every guide here is
          written to help you find your best-fit AI tool quickly — covering
          the same ten categories our match engine ranks: coding, video,
          voiceover, image generation, writing, presentations, SEO,
          automation, customer support, and data analysis. Each post applies
          the same weighted scoring methodology we use on the quiz, so the
          verdicts line up with the personalised top three you'd get from the
          match engine itself.
        </p>
        <p>
          Each guide walks through the criteria that actually separate the
          tools in a category, ranks the top three picks, and explains
          honestly where each one falls short for certain needs. We link to
          the tools we recommend — sometimes through affiliate links — but
          the rankings come from the scoring engine, never from who pays
          the most. The deep dives go further, comparing two or three tools
          head-to-head on the dimensions buyers actually care about: pricing,
          free tier limits, integrations, output quality, and lock-in risk.
        </p>
      </section>

      <section v-if="posts && posts.length" aria-label="Latest articles">
        <h2 class="section-title">Latest articles</h2>
        <div class="list">
          <NuxtLink
            v-for="post in posts"
            :key="post.path"
            :to="post.path"
            class="post-card"
          >
            <div class="post-meta">{{ formatDate(post.publishedAt) }}</div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-desc">{{ post.description }}</p>
            <span class="post-link">Read the full review →</span>
          </NuxtLink>
        </div>
      </section>

      <section v-else class="empty">
        <p>No posts yet — check back soon.</p>
        <button class="btn-secondary" @click="router.push('/quiz')">
          <i class="ti ti-sparkles" aria-hidden="true" /> Take the quiz instead
        </button>
      </section>

      <section class="outro">
        <p>
          New guides ship weekly. If there's a tool or category you'd like us
          to cover — or a specific comparison you can't find anywhere else —
          <NuxtLink to="/contact">send us a note</NuxtLink> and we'll add it
          to the queue. Want to skip the reading and find your best-fit AI
          tool right now?
          <NuxtLink to="/quiz">Take the 90-second match quiz</NuxtLink>
          and get a personalised top three matched to your needs in under
          two minutes.
        </p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.wrap{max-width:1100px;margin:0 auto;padding:64px 0 80px}

.header{text-align:center;margin-bottom:40px}
.kicker{font-size:12px;font-weight:600;letter-spacing:2px;color:var(--primary)}
.title{
  font-family:var(--font-hand);
  font-size:clamp(40px,5vw,56px);font-weight:700;
  color:var(--text);line-height:1.1;letter-spacing:-.5px;
  margin:14px 0 14px;
}
.lede{font-size:16px;color:var(--text-muted);max-width:600px;margin:0 auto;line-height:1.6}

.intro{
  max-width:760px;margin:0 auto 56px;
}
.intro p{
  font-size:15px;color:var(--text-muted);line-height:1.7;
  margin-bottom:16px;
}
.intro p:last-child{margin-bottom:0}

.section-title{
  font-size:14px;font-weight:600;letter-spacing:1.5px;
  color:var(--text-faint);text-transform:uppercase;
  margin-bottom:18px;
}

.outro{
  max-width:760px;margin:56px auto 0;
  padding-top:32px;border-top:1px solid var(--border);
}
.outro p{
  font-size:15px;color:var(--text-muted);line-height:1.7;margin:0;
}
.outro a{color:var(--primary);text-decoration:underline;text-underline-offset:3px}

.list{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
}
@media(max-width:720px){
  .list{grid-template-columns:1fr}
}

.post-card{
  display:flex;flex-direction:column;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:18px;
  padding:24px 28px;
  text-decoration:none;color:inherit;
  transition:border-color .15s,transform .1s;
  height:100%;
}
.post-card:hover{border-color:var(--border2);transform:translateY(-1px)}
.post-meta{font-size:12px;color:var(--text-faint);font-weight:500;letter-spacing:.5px;margin-bottom:6px}
.post-title{font-size:20px;font-weight:600;color:var(--text);margin-bottom:8px;line-height:1.3}
.post-desc{font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:14px;flex:1}
.post-link{font-size:13px;font-weight:600;color:var(--primary);margin-top:auto}

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
