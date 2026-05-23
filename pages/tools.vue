<script setup lang="ts">
import { categories } from '~/data/categories'
import { toolDescriptions } from '~/data/toolDescriptions'

useSeoMeta({
  title: 'Browse All AI Tools | tryaimatch',
  description: 'The complete directory of AI tools we review and match — across video, voice, image, writing, coding, presentations, SEO, automation, support, and data.',
  ogTitle: 'Browse All AI Tools | tryaimatch',
  ogDescription: 'Every AI tool in our match engine, with descriptions and pricing.',
  ogUrl: 'https://tryaimatch.com/tools'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://tryaimatch.com/tools' }]
})

type FlatTool = {
  id: string
  name: string
  maker: string
  icon: string
  color: 'primary' | 'match' | 'accent'
  affiliateUrl: string
  hasFree: boolean
  price: number
  description: string
  categoryId: string
  categoryLabel: string
}

const allTools = computed<FlatTool[]>(() => {
  const out: FlatTool[] = []
  for (const cat of Object.values(categories)) {
    for (const t of cat.tools) {
      out.push({
        id: t.id,
        name: t.name,
        maker: t.maker,
        icon: t.icon,
        color: t.color,
        affiliateUrl: t.affiliateUrl,
        hasFree: t.hasFree,
        price: t.price,
        description: toolDescriptions[t.id] ?? '',
        categoryId: cat.id,
        categoryLabel: cat.label
      })
    }
  }
  return out
})

const totalCount = computed(() => allTools.value.length)

const activeFilter = ref<string>('all')
const filters = computed(() => [
  { id: 'all', label: `All (${totalCount.value})` },
  ...Object.values(categories).map((c) => ({
    id: c.id,
    label: `${c.label} (${c.tools.length})`
  }))
])

const filteredTools = computed(() => {
  if (activeFilter.value === 'all') return allTools.value
  return allTools.value.filter((t) => t.categoryId === activeFilter.value)
})

function priceLabel(t: FlatTool) {
  if (t.price === 0) return 'Free'
  return t.hasFree ? `Free + from $${t.price}/mo` : `From $${t.price}/mo`
}
</script>

<template>
  <div class="page">
    <SiteNav />

    <main class="wrap">
      <header class="header">
        <span class="kicker">AI TOOL DIRECTORY</span>
        <h1 class="title">Browse All AI Tools</h1>
        <p class="lede">
          The complete directory of {{ totalCount }} AI tools we review and
          match against your needs — across every category we cover.
        </p>
        <div class="cta-row">
          <NuxtLink to="/quiz" class="btn-primary">
            <i class="ti ti-sparkles" aria-hidden="true" /> Find my best-fit tool
          </NuxtLink>
        </div>
      </header>

      <section class="intro">
        <p>
          Reading a directory is fine when you already know what you're
          shopping for. But if you want the right tool matched to your specific
          stack, budget, and workflow, the
          <NuxtLink to="/quiz">90-second quiz</NuxtLink>
          is faster. It applies the same weighted scoring engine that ranks
          every tool you see below.
        </p>
      </section>

      <nav class="filters" aria-label="Filter by category">
        <button
          v-for="f in filters"
          :key="f.id"
          class="filter-chip"
          :class="{ active: activeFilter === f.id }"
          @click="activeFilter = f.id"
        >
          {{ f.label }}
        </button>
      </nav>

      <section class="grid">
        <article
          v-for="t in filteredTools"
          :key="t.categoryId + '-' + t.id"
          class="tool-card"
          :class="`accent-${t.color}`"
        >
          <header class="tool-head">
            <div class="tool-icon"><i :class="['ti', t.icon]" aria-hidden="true" /></div>
            <div class="tool-id">
              <div class="tool-name">{{ t.name }}</div>
              <div class="tool-maker">{{ t.maker }}</div>
            </div>
          </header>

          <p class="tool-desc">{{ t.description }}</p>

          <div class="tool-meta">
            <span class="cat-tag">{{ t.categoryLabel }}</span>
            <span class="price-tag" :class="{ free: t.price === 0 }">
              {{ priceLabel(t) }}
            </span>
          </div>

          <a
            :href="t.affiliateUrl"
            target="_blank"
            rel="sponsored noopener noreferrer"
            class="visit-link"
          >
            Visit {{ t.name }} <i class="ti ti-external-link" aria-hidden="true" />
          </a>
        </article>
      </section>

      <section class="outro">
        <p>
          Don't see your tool listed? We add new tools to the directory as
          they hit production traction.
          <NuxtLink to="/contact">Submit it via the contact form</NuxtLink>
          and we'll review it for inclusion.
        </p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.wrap{max-width:1100px;margin:0 auto;padding:56px 0 80px}

.header{text-align:center;margin-bottom:36px}
.kicker{font-size:12px;font-weight:600;letter-spacing:2px;color:var(--primary)}
.title{
  font-family:var(--font-hand);
  font-size:clamp(40px,5vw,56px);font-weight:700;
  color:var(--text);line-height:1.1;letter-spacing:-.5px;
  margin:14px 0 14px;
}
.lede{font-size:16px;color:var(--text-muted);max-width:600px;margin:0 auto 22px;line-height:1.6}

.cta-row{display:flex;justify-content:center;gap:12px}
.btn-primary{
  display:inline-flex;align-items:center;gap:8px;
  font-size:15px;font-weight:600;
  background:var(--primary);color:#fffffe;text-decoration:none;
  padding:12px 22px;border-radius:100px;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-primary:hover{transform:translateY(2px);box-shadow:0 2px 0 rgba(15,14,23,.85)}

.intro{max-width:760px;margin:0 auto 32px}
.intro p{font-size:15px;color:var(--text-muted);line-height:1.7;margin:0}
.intro a{color:var(--primary);text-decoration:underline;text-underline-offset:3px}

.filters{
  display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
  margin-bottom:32px;
}
.filter-chip{
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:100px;
  padding:7px 16px;
  font-size:13px;font-weight:500;color:var(--text-muted);
  cursor:pointer;
  transition:border-color .15s,color .15s,background .15s;
}
.filter-chip:hover{color:var(--text);border-color:var(--border2)}
.filter-chip.active{
  background:var(--primary-dim);
  border-color:var(--primary);
  color:var(--primary);
  font-weight:600;
}

.grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
@media(max-width:920px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.grid{grid-template-columns:1fr}}

.tool-card{
  display:flex;flex-direction:column;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:16px;
  padding:18px 18px 16px;
}

.tool-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.tool-icon{
  width:40px;height:40px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;flex-shrink:0;
}
.accent-primary .tool-icon{background:var(--primary-dim);color:var(--primary)}
.accent-match   .tool-icon{background:var(--match-dim);color:var(--match)}
.accent-accent  .tool-icon{background:var(--accent-dim);color:var(--accent)}

.tool-id{min-width:0}
.tool-name{font-size:15px;font-weight:600;color:var(--text);line-height:1.2}
.tool-maker{font-size:12px;color:var(--text-faint);margin-top:2px}

.tool-desc{
  font-size:13.5px;color:var(--text-muted);line-height:1.55;
  margin:0 0 12px;flex:1;
}

.tool-meta{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.cat-tag{
  font-size:11px;font-weight:500;
  background:var(--surface2);color:var(--text-muted);
  padding:3px 10px;border-radius:100px;
}
.price-tag{
  font-size:11px;font-weight:600;
  background:var(--surface2);color:var(--text-muted);
  padding:3px 10px;border-radius:100px;
}
.price-tag.free{background:#dff5ea;color:#2cb67d}
@media(prefers-color-scheme:dark){.price-tag.free{background:var(--match-dim)}}

.visit-link{
  display:inline-flex;align-items:center;gap:5px;
  font-size:13px;font-weight:600;color:var(--primary);
  text-decoration:none;margin-top:auto;
}
.visit-link:hover{text-decoration:underline;text-underline-offset:3px}
.visit-link i{font-size:14px}

.outro{
  max-width:760px;margin:48px auto 0;
  padding-top:28px;border-top:1px solid var(--border);
}
.outro p{font-size:14px;color:var(--text-muted);line-height:1.7;margin:0}
.outro a{color:var(--primary);text-decoration:underline;text-underline-offset:3px}
</style>
