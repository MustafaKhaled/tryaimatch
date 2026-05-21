<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const tabs = [
  { id: 'home',    label: 'Home',    to: '/' },
  { id: 'blogs',   label: 'Blogs',   to: '/blogs' },
  { id: 'contact', label: 'Contact', to: '/contact' }
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

function startQuiz() { router.push('/quiz') }
</script>

<template>
  <header class="nav">
    <NuxtLink to="/" class="brand">
      <span class="brand-mark"><i class="ti ti-hexagon" aria-hidden="true" /></span>
      <span class="brand-name">tryaimatch</span>
    </NuxtLink>

    <nav class="tabs">
      <NuxtLink
        v-for="t in tabs"
        :key="t.id"
        :to="t.to"
        class="tab"
        :class="{ active: isActive(t.to) }"
      >
        {{ t.label }}
      </NuxtLink>
    </nav>

    <button class="btn-start" @click="startQuiz">Start now</button>
  </header>
</template>

<style scoped>
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
  text-decoration:none;
}
.brand-mark{font-size:20px;color:var(--text);display:inline-flex}

.tabs{display:flex;gap:4px;justify-self:center}
.tab{
  font-size:15px;font-weight:500;
  color:var(--text-muted);
  padding:8px 18px;border-radius:100px;
  text-decoration:none;
  transition:color .15s,background .15s;
}
.tab:hover{color:var(--text)}
.tab.active{color:var(--text);background:var(--surface)}

.btn-start{
  justify-self:end;
  font-size:14px;font-weight:600;
  background:var(--primary);color:#fffffe;
  padding:10px 22px;border-radius:100px;
  border:none;cursor:pointer;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-start:hover{transform:translateY(1px);box-shadow:0 3px 0 rgba(15,14,23,.85)}

@media(max-width:920px){
  .nav{grid-template-columns:auto auto auto;gap:12px}
}
</style>
