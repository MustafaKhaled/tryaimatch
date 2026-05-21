<script setup lang="ts">
const router = useRouter()
function startQuiz() {
  router.push('/quiz')
}

useSeoMeta({
  title: 'tryaimatch — Find the AI tool built for how you work',
  description: 'Take a 90-second quiz, get your top-3 AI tool matches across video, voice, image, writing, coding, and more. No jargon, no ads, no bias.',
  ogTitle: 'tryaimatch — Find the AI tool built for how you work',
  ogDescription: 'Take a 90-second quiz, get your top-3 AI tool matches.',
  ogUrl: 'https://tryaimatch.com',
  ogImage: 'https://tryaimatch.com/og-image.png',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://tryaimatch.com/' }]
})

// JSON-LD: WebSite + Organization
useSchemaOrg([
  defineWebSite({
    name: 'tryaimatch',
    url: 'https://tryaimatch.com'
  }),
  defineOrganization({
    name: 'tryaimatch',
    url: 'https://tryaimatch.com',
    logo: 'https://tryaimatch.com/logo.png',
    sameAs: []
  })
])
</script>

<template>
  <div class="page">
    <SiteNav />

    <main class="hero">
      <section class="hero-left">
        <span class="pill">
          <i class="ti ti-star-filled" aria-hidden="true" />
          87 tools · matched to you
        </span>

        <h1 class="headline">
          Find the <span class="hl-yellow">AI tool</span><br>
          built for <span class="hl-underline">how you work.</span>
        </h1>

        <p class="lede">
          Answer a few quick questions. We'll match you with the right tools — no
          jargon, no endless review tabs, no "best AI for X" listicles.
        </p>

        <div class="badges">
          <span class="badge badge-match">
            <i class="ti ti-infinity" aria-hidden="true" /> Free forever
          </span>
          <span class="badge badge-primary">
            <i class="ti ti-user-off" aria-hidden="true" /> No registration
          </span>
          <span class="badge badge-accent">
            <i class="ti ti-ad-off" aria-hidden="true" /> No ads
          </span>
          <span class="badge badge-pop">
            <i class="ti ti-scale" aria-hidden="true" /> No AI biased
          </span>
        </div>

        <div class="cta-row">
          <button class="btn-primary" @click="startQuiz">
            <i class="ti ti-star-filled" aria-hidden="true" />
            Start now
          </button>
          <button class="btn-secondary">
            Browse all tools <span aria-hidden="true">→</span>
          </button>
        </div>

        <div class="social">
          <span class="stars">★★★★★</span>
          <span class="social-text">4.8 · 12k makers this week</span>
        </div>
      </section>

      <section class="hero-right">
        <div class="annotation">
          <svg class="arrow" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M85 8 C 60 4, 35 14, 20 30 C 14 36, 12 44, 18 50"
              stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" fill="none"
            />
            <path
              d="M18 50 L 10 44 M 18 50 L 26 44"
              stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" fill="none"
            />
          </svg>
          <span class="annotation-text">live preview of a match card</span>
        </div>

        <article class="match-card">
          <div class="match-label">YOUR MATCH</div>
          <div class="match-head">
            <div class="match-logo">Hg</div>
            <div>
              <div class="match-name">HeyGen</div>
              <div class="match-meta">AI video maker · 98% match</div>
            </div>
          </div>
          <div class="score-track">
            <div class="score-fill" />
          </div>
          <div class="match-tags">
            <span class="mini-badge mini-match">free tier</span>
            <span class="mini-badge mini-accent">popular</span>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{
  min-height:100vh;
  background:var(--base);
  padding:0 4vw;
}

/* ───── nav ───── */
.nav{
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  padding:24px 0;
  border-bottom:1px solid var(--border);
}
.brand{
  display:flex;align-items:center;gap:8px;
  font-size:20px;font-weight:600;letter-spacing:-.5px;
  color:var(--text);
  justify-self:start;
}
.brand-mark{font-size:20px;color:var(--text);display:inline-flex}
.tabs{display:flex;gap:4px;justify-self:center}
.tab{
  font-size:15px;font-weight:500;
  color:var(--text-muted);
  padding:8px 18px;border-radius:100px;
  transition:color .15s,background .15s;
}
.tab:hover{color:var(--text)}
.tab.active{color:var(--text);background:var(--surface)}
.btn-start{
  justify-self:end;
  font-size:14px;font-weight:600;
  background:var(--primary);color:#fffffe;
  padding:10px 22px;border-radius:100px;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-start:hover{transform:translateY(1px);box-shadow:0 3px 0 rgba(15,14,23,.85)}

/* ───── hero ───── */
.hero{
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:64px;
  align-items:center;
  padding:80px 0 100px;
}
@media(max-width:920px){
  .hero{grid-template-columns:1fr;padding:48px 0}
  .nav{grid-template-columns:auto auto auto;gap:12px}
}

.hero-left{display:flex;flex-direction:column;gap:24px;max-width:560px}

.pill{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--primary-dim);
  color:var(--primary);
  border:1px solid var(--border2);
  border-radius:100px;
  padding:5px 14px;
  font-size:13px;font-weight:500;
  width:fit-content;
}

.headline{
  font-family:var(--font-hand);
  font-size:clamp(44px,6vw,68px);
  font-weight:700;line-height:1.05;
  color:var(--text);
  letter-spacing:-.5px;
}
.hl-yellow{
  background:linear-gradient(transparent 55%,var(--highlight) 55%);
  padding:0 4px;
}
.hl-underline{
  position:relative;display:inline-block;
}
.hl-underline::after{
  content:"";
  position:absolute;
  left:0;right:0;bottom:-6px;
  height:8px;border-radius:4px;
  background:var(--primary);
}

.lede{
  font-size:16px;line-height:1.6;color:var(--text-muted);max-width:480px;
}

.badges{display:flex;flex-wrap:wrap;gap:8px}
.badge{
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 14px;border-radius:100px;
  font-size:13px;font-weight:600;
  border:none;
}
.badge i{font-size:14px}
.badge-match{background:#dff5ea;color:#2cb67d}
.badge-primary{background:#ece7ff;color:#7f5af0}
.badge-accent{background:#ffe8d1;color:#ff8906}
.badge-pop{background:#fde0ec;color:#e53170}
@media(prefers-color-scheme:dark){
  .badge-match{background:var(--match-dim)}
  .badge-primary{background:var(--primary-dim)}
  .badge-accent{background:var(--accent-dim)}
  .badge-pop{background:var(--pop-dim)}
}

.cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:8px}
.btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  font-size:16px;font-weight:600;
  background:var(--primary);color:#fffffe;
  padding:14px 28px;border-radius:100px;
  box-shadow:0 5px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-primary:hover{transform:translateY(2px);box-shadow:0 3px 0 rgba(15,14,23,.85)}
.btn-secondary{
  display:inline-flex;align-items:center;gap:10px;
  font-size:16px;font-weight:600;
  background:var(--base);color:var(--text);
  padding:14px 28px;border-radius:100px;
  border:2px solid var(--text);
  box-shadow:0 5px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-secondary:hover{transform:translateY(2px);box-shadow:0 3px 0 rgba(15,14,23,.85)}

.social{display:flex;align-items:center;gap:10px;margin-top:8px}
.stars{color:var(--text);letter-spacing:2px;font-size:14px}
.social-text{font-size:14px;color:var(--text-muted)}

/* ───── right card ───── */
.hero-right{
  position:relative;
  display:flex;flex-direction:column;align-items:center;
  padding-top:70px;
}
.annotation{
  position:absolute;
  top:0;right:8%;
  display:flex;align-items:flex-end;gap:8px;
  font-family:var(--font-hand);font-size:24px;color:var(--primary);
  transform:rotate(-4deg);
  pointer-events:none;
}
.annotation-text{line-height:1;padding-bottom:6px;white-space:nowrap}
.arrow{width:64px;height:44px;color:var(--primary);flex-shrink:0}
@media(max-width:920px){
  .hero-right{padding-top:90px}
  .annotation{right:auto;left:8%}
}

.match-card{
  width:100%;max-width:340px;
  background:var(--base);
  border:2px solid var(--text);
  border-radius:18px;
  padding:22px;
  box-shadow:8px 8px 0 rgba(15,14,23,.85);
}
.match-label{
  font-size:11px;font-weight:600;letter-spacing:2px;
  color:var(--text-muted);margin-bottom:14px;
}
.match-head{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.match-logo{
  width:54px;height:54px;border-radius:12px;
  background:var(--primary-dim);
  border:1.5px solid var(--primary);
  color:var(--primary);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;font-weight:600;
}
.match-name{font-size:18px;font-weight:600;color:var(--text);line-height:1.2}
.match-meta{font-size:13px;color:var(--text-muted);margin-top:4px}
.score-track{
  background:var(--surface2);height:8px;border-radius:100px;overflow:hidden;
  border:1.5px solid var(--text);
  margin-bottom:14px;
}
.score-fill{height:100%;width:98%;background:var(--primary)}
.match-tags{display:flex;gap:8px}
.mini-badge{
  font-size:12px;font-weight:600;
  padding:3px 10px;border-radius:100px;
}
.mini-match{background:#dff5ea;color:#2cb67d}
.mini-accent{background:#ffe8d1;color:#ff8906}
@media(prefers-color-scheme:dark){
  .mini-match{background:var(--match-dim)}
  .mini-accent{background:var(--accent-dim)}
}
</style>
