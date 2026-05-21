<script setup lang="ts">
useHead({ title: 'Blogs · tryaimatch' })
const router = useRouter()
</script>

<template>
  <div class="page">
    <SiteNav />

    <main class="wrap">
      <span class="kicker">BLOGS</span>
      <h1 class="title">Coming soon.</h1>
      <p class="lede">
        We're putting together hands-on reviews, deep dives, and category
        comparisons. In the meantime, the quiz already does the matching for you.
      </p>
      <div class="cta-row">
        <button class="btn-primary" @click="router.push('/quiz')">
          <i class="ti ti-sparkles" aria-hidden="true" /> Take the quiz
        </button>
        <button class="btn-secondary" @click="router.push('/contact')">
          Suggest a topic <span aria-hidden="true">→</span>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.wrap{max-width:680px;margin:0 auto;padding:80px 0;text-align:center}
.kicker{font-size:12px;font-weight:600;letter-spacing:2px;color:var(--primary)}
.title{
  font-family:var(--font-hand);
  font-size:clamp(44px,6vw,68px);font-weight:700;
  color:var(--text);line-height:1.05;letter-spacing:-.5px;
  margin:14px 0 18px;
}
.lede{font-size:16px;color:var(--text-muted);line-height:1.6;max-width:520px;margin:0 auto 32px}

.cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  font-size:15px;font-weight:600;
  background:var(--primary);color:#fffffe;
  padding:13px 26px;border-radius:100px;border:none;cursor:pointer;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-primary:hover{transform:translateY(2px);box-shadow:0 2px 0 rgba(15,14,23,.85)}
.btn-secondary{
  display:inline-flex;align-items:center;gap:10px;
  font-size:15px;font-weight:600;color:var(--text);
  background:var(--base);
  padding:13px 26px;border-radius:100px;
  border:1.5px solid var(--border2);cursor:pointer;
}
.btn-secondary:hover{background:var(--surface)}
</style>
