<script setup lang="ts">
import { categories, type CategoryId } from '~/data/categories'

useSeoMeta({ title: 'Matching… · tryaimatch', robots: 'noindex, nofollow' })

const router = useRouter()
const chosenCategory = useState<CategoryId | null>('chosenCategory', () => null)

const activeCategory = computed(() =>
  chosenCategory.value ? categories[chosenCategory.value] : null
)
const toolCount = computed(() => activeCategory.value?.tools.length ?? 0)
const categoryLabel = computed(() => activeCategory.value?.label.toLowerCase() ?? 'tools')

const steps = computed(() => [
  { label: 'reading your answers…', duration: 700 },
  { label: 'applying hard filters (budget, format, fit)…', duration: 800 },
  { label: `scoring ${toolCount.value} ${categoryLabel.value} tools…`, duration: 900 },
  { label: 'ranking & surfacing top 3…', duration: 700 }
])

const stepIdx = ref(0)
const timeLeft = ref(3)

let timer: ReturnType<typeof setTimeout> | null = null
let countdown: ReturnType<typeof setInterval> | null = null

function advance(i: number) {
  if (i >= steps.value.length) {
    router.push('/results')
    return
  }
  stepIdx.value = i
  timer = setTimeout(() => advance(i + 1), steps.value[i].duration)
}

onMounted(() => {
  advance(0)
  countdown = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  if (countdown) clearInterval(countdown)
})
</script>

<template>
  <div class="page">
    <header class="nav">
      <a href="/" class="brand">
        <span class="brand-mark"><i class="ti ti-hexagon" aria-hidden="true" /></span>
        <span class="brand-name">tryaimatch</span>
      </a>
    </header>

    <main class="load-wrap">
      <div class="ring-col">
        <div class="ring">
          <svg viewBox="0 0 120 120" class="ring-svg" aria-hidden="true">
            <circle cx="60" cy="60" r="54" class="ring-bg" />
            <circle cx="60" cy="60" r="54" class="ring-fill" />
          </svg>
          <div class="ring-text">
            <span class="ring-line1">checking</span>
            <span class="ring-line2">{{ toolCount }} tools</span>
          </div>
        </div>
      </div>

      <div class="info-col">
        <div class="kicker">MATCHING…</div>
        <h2 class="title">Finding tools that<br>actually fit you.</h2>

        <ul class="check-list">
          <li
            v-for="(s, i) in steps"
            :key="i"
            class="check-item"
            :class="{
              done: i < stepIdx,
              active: i === stepIdx,
              pending: i > stepIdx
            }"
          >
            <span class="check-icon">
              <i v-if="i < stepIdx" class="ti ti-check" aria-hidden="true" />
              <i v-else-if="i === stepIdx" class="ti ti-clock" aria-hidden="true" />
              <i v-else class="ti ti-circle" aria-hidden="true" />
            </span>
            <span>{{ s.label }}</span>
          </li>
        </ul>

        <div class="time-left">~{{ timeLeft }} seconds left</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}
.nav{
  display:flex;align-items:center;padding:24px 0;
  border-bottom:1px solid var(--border);
}
.brand{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:600;color:var(--text);letter-spacing:-.5px}

.load-wrap{
  max-width:1000px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:48px;
  align-items:center;
  padding:80px 0;min-height:60vh;
}
@media(max-width:760px){
  .load-wrap{grid-template-columns:1fr;gap:32px;padding:48px 0}
}

.ring-col{display:flex;justify-content:center}

.ring{position:relative;width:220px;height:220px}
.ring-svg{width:100%;height:100%;transform:rotate(-90deg)}
.ring-bg{
  fill:none;stroke:var(--text);stroke-width:1.5;
  stroke-dasharray:4 6;opacity:.45;
}
.ring-fill{
  fill:none;stroke:var(--primary);stroke-width:3;
  stroke-linecap:round;
  stroke-dasharray:339;stroke-dashoffset:339;
  transform-origin:60px 60px;
  animation:fill 3.1s ease-out forwards;
}
@keyframes fill{
  0%{stroke-dashoffset:339}
  100%{stroke-dashoffset:60}
}

.ring-text{
  position:absolute;inset:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-family:var(--font-hand);
  color:var(--primary);
  gap:2px;
}
.ring-line1{font-size:22px;color:var(--text);transform:rotate(-3deg)}
.ring-line2{font-size:30px;font-weight:700;letter-spacing:.5px}

.info-col{display:flex;flex-direction:column}
.kicker{
  font-size:12px;font-weight:600;letter-spacing:2px;
  color:var(--text-muted);margin-bottom:14px;
}
.title{
  font-size:28px;font-weight:600;color:var(--text);
  line-height:1.2;letter-spacing:-.4px;margin-bottom:24px;
}

.check-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:24px}
.check-item{
  display:flex;align-items:center;gap:10px;
  font-size:15px;
}
.check-item.done{color:var(--text)}
.check-item.done .check-icon{color:var(--primary)}
.check-item.active{color:var(--text);font-weight:500}
.check-item.active .check-icon{color:var(--primary)}
.check-item.active .check-icon i{animation:spin 1.4s linear infinite}
.check-item.pending{color:var(--text-faint)}
.check-item.pending .check-icon{color:var(--text-faint)}
.check-icon{display:inline-flex;width:18px;justify-content:center;font-size:16px}

@keyframes spin{to{transform:rotate(360deg)}}

.time-left{font-size:13px;color:var(--text-muted)}
</style>
