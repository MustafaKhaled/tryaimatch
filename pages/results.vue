<script setup lang="ts">
import { categories, type CategoryId } from '~/data/categories'
import type { Answers } from '~/data/schema'
import { scoreCategory } from '~/data/scoring'

useSeoMeta({ title: 'Your matches · tryaimatch', robots: 'noindex, nofollow' })

const router = useRouter()

const chosenCategory = useState<CategoryId | null>('chosenCategory', () => null)
const categoryAnswers = useState<Answers>('categoryAnswers', () => ({}))

const activeCategory = computed(() =>
  chosenCategory.value ? categories[chosenCategory.value] : categories.video
)
const categoryLabel = computed(() => activeCategory.value.label)

type ResultCard = {
  name: string
  cat: string
  score: number
  icon: string
  color: 'primary' | 'match' | 'accent'
  badges: { label: string; kind: string }[]
  cta: string
  url: string
  best: boolean
  whyItWon?: string[]
  whyItLost?: string[]
}

const tools = computed<ResultCard[]>(() => {
  const scored = scoreCategory(activeCategory.value, categoryAnswers.value)
  return scored.slice(0, 3).map((t, i) => ({
    name: t.name,
    cat: t.maker,
    score: t.matchPercentage,
    icon: t.icon,
    color: t.color,
    badges: [
      t.hasFree
        ? { label: 'Free tier', kind: 'match' }
        : { label: 'Paid only', kind: 'muted' },
      ...(t.price === 0
        ? [{ label: 'Free forever', kind: 'pop' }]
        : [{ label: `$${t.price}/mo`, kind: 'muted' }])
    ],
    cta: `Try ${t.name}`,
    url: t.affiliateUrl,
    best: i === 0,
    whyItWon: t.whyItWon,
    whyItLost: t.whyItLost
  }))
})

// confetti / glitter
type Particle = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotate: number
  color: string
  shape: 'square' | 'circle' | 'triangle'
}
const particles = ref<Particle[]>([])
const showConfetti = ref(true)
const colors = ['#7f5af0', '#2cb67d', '#ff8906', '#e53170', '#fff3a8']

onMounted(() => {
  particles.value = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.4 + Math.random() * 1.8,
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: (['square', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)]
  }))
  setTimeout(() => { showConfetti.value = false }, 4500)
})

// rating
const rating = ref(0)
const hovered = ref(0)
const feedback = ref('')
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

async function submitRating() {
  if (rating.value === 0) return
  submitting.value = true
  submitError.value = ''
  try {
    await $fetch('/api/ratings', {
      method: 'POST',
      body: {
        rating: rating.value,
        comment: feedback.value.trim() || undefined,
        categoryId: chosenCategory.value,
        topToolId: tools.value[0]?.name
      }
    })
    submitted.value = true
  } catch (e: any) {
    submitError.value = e?.data?.statusMessage || 'Could not save — try again.'
  } finally {
    submitting.value = false
  }
}

// Track quiz completion exactly once per visit to /results
const completionStart = Date.now()
const completionTracked = useState<boolean>('completionTracked', () => false)
onMounted(async () => {
  if (completionTracked.value) return
  if (!chosenCategory.value || tools.value.length === 0) return
  completionTracked.value = true
  try {
    await $fetch('/api/quiz-completions', {
      method: 'POST',
      body: {
        categoryId: chosenCategory.value,
        answers: categoryAnswers.value,
        topTools: tools.value.map((t) => ({
          id: t.name, name: t.name, score: t.score
        })),
        durationMs: Date.now() - completionStart
      }
    })
  } catch (e) {
    // non-blocking — completion tracking failure shouldn't break results UI
    console.warn('completion tracking failed', e)
  }
})
</script>

<template>
  <div class="page">
    <div v-if="showConfetti" class="confetti" aria-hidden="true">
      <span
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :class="p.shape"
        :style="{
          left: p.left + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          background: p.shape === 'triangle' ? 'transparent' : p.color,
          borderBottomColor: p.shape === 'triangle' ? p.color : undefined,
          animationDelay: p.delay + 's',
          animationDuration: p.duration + 's',
          ['--rot' as any]: p.rotate + 'deg'
        }"
      />
    </div>

    <header class="nav">
      <a href="/" class="brand">
        <span class="brand-mark"><i class="ti ti-hexagon" aria-hidden="true" /></span>
        <span class="brand-name">tryaimatch</span>
      </a>
      <button class="btn-retake" @click="router.push('/quiz')">
        <i class="ti ti-refresh" aria-hidden="true" /> Retake quiz
      </button>
    </header>

    <main class="results-wrap">
      <div class="header-block">
        <span class="kicker">YOUR MATCHES · {{ categoryLabel.toUpperCase() }}</span>
        <h1 class="title">Your top 3 {{ categoryLabel.toLowerCase() }}<br>tools are ready.</h1>
        <p class="lede">Based on your answers, these tools fit how you create — ranked by match score.</p>
      </div>

      <section class="cards">
        <article
          v-for="t in tools"
          :key="t.name"
          class="card"
          :class="{ winner: t.best, [`accent-${t.color}`]: true }"
        >
          <div v-if="t.best" class="winner-badge">
            <i class="ti ti-star-filled" aria-hidden="true" /> Best match
          </div>

          <div class="tool-icon">
            <i class="ti" :class="t.icon" aria-hidden="true" />
          </div>

          <div class="tool-name">{{ t.name }}</div>
          <div class="tool-cat">{{ t.cat }}</div>

          <div class="score-row">
            <span class="score-label">Match score</span>
            <span class="score-val">{{ t.score }}%</span>
          </div>
          <div class="score-track">
            <div class="score-fill" :style="{ width: t.score + '%' }" />
          </div>

          <div class="card-badges">
            <span
              v-for="b in t.badges"
              :key="b.label"
              class="mini-badge"
              :class="`mini-${b.kind}`"
            >{{ b.label }}</span>
          </div>

          <ul v-if="t.whyItWon && t.whyItWon.length" class="reasons">
            <li v-for="r in t.whyItWon" :key="r" class="reason-win">
              <i class="ti ti-check" aria-hidden="true" /> {{ r }}
            </li>
            <li v-for="r in t.whyItLost" :key="r" class="reason-lose">
              <i class="ti ti-minus" aria-hidden="true" /> {{ r }}
            </li>
          </ul>

          <a class="cta" :href="t.url" target="_blank" rel="noopener noreferrer">
            <i class="ti ti-external-link" aria-hidden="true" />
            {{ t.cta }}
          </a>
        </article>
      </section>

      <section class="rating-card">
        <div v-if="!submitted">
          <h3 class="rate-title">How was your match experience?</h3>
          <p class="rate-sub">Your feedback helps us match better for everyone.</p>

          <div
            class="stars"
            @mouseleave="hovered = 0"
          >
            <button
              v-for="n in 5"
              :key="n"
              class="star-btn"
              :class="{ filled: n <= (hovered || rating) }"
              @mouseenter="hovered = n"
              @click="rating = n"
              :aria-label="`Rate ${n} of 5`"
            >
              <i class="ti ti-star-filled" aria-hidden="true" />
            </button>
          </div>

          <textarea
            v-model="feedback"
            class="feedback"
            placeholder="Anything you'd like to share? (optional)"
            rows="3"
          />

          <p v-if="submitError" class="rate-error">{{ submitError }}</p>

          <button class="submit-btn" :disabled="rating === 0 || submitting" @click="submitRating">
            <i class="ti ti-send" aria-hidden="true" />
            {{ submitting ? 'Sending…' : 'Send rating' }}
          </button>
        </div>

        <div v-else class="thanks">
          <div class="thanks-icon"><i class="ti ti-heart-filled" aria-hidden="true" /></div>
          <h3 class="rate-title">Thanks for the feedback!</h3>
          <p class="rate-sub">We've logged your {{ rating }}-star rating.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw;position:relative;overflow-x:hidden}

/* ───── confetti ───── */
.confetti{
  position:fixed;inset:0;pointer-events:none;z-index:50;overflow:hidden;
}
.particle{
  position:absolute;top:-20px;
  border-radius:2px;
  animation:fall linear forwards;
  transform:rotate(var(--rot));
}
.particle.circle{border-radius:50%}
.particle.triangle{
  background:transparent !important;
  width:0 !important;height:0 !important;
  border-left:7px solid transparent;
  border-right:7px solid transparent;
  border-bottom:12px solid;
}
@keyframes fall{
  0%{transform:translateY(-40px) rotate(var(--rot));opacity:1}
  100%{transform:translateY(110vh) rotate(calc(var(--rot) + 540deg));opacity:.85}
}

/* ───── nav ───── */
.nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:24px 0;border-bottom:1px solid var(--border);
  position:relative;z-index:1;
}
.brand{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:600;color:var(--text);letter-spacing:-.5px}
.btn-retake{
  display:inline-flex;align-items:center;gap:6px;
  font-size:14px;font-weight:500;color:var(--text);
  padding:9px 18px;border-radius:100px;
  border:1.5px solid var(--border2);
  background:var(--base);
  transition:background .15s;
}
.btn-retake:hover{background:var(--surface)}

/* ───── layout ───── */
.results-wrap{
  max-width:1100px;margin:0 auto;
  padding:48px 0 80px;position:relative;z-index:1;
}
.header-block{margin-bottom:36px;text-align:center}
.kicker{
  font-size:12px;font-weight:600;letter-spacing:2px;
  color:var(--text-muted);
}
.title{
  font-size:32px;font-weight:600;color:var(--text);
  line-height:1.2;letter-spacing:-.5px;margin:8px 0 12px;
}
.lede{font-size:15px;color:var(--text-muted);max-width:520px;margin:0 auto}

/* ───── cards ───── */
.cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:48px;
}
@media(max-width:880px){.cards{grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto}}

.card{
  position:relative;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:18px;
  padding:22px;
  display:flex;flex-direction:column;
}
.card.winner{
  border:2px solid var(--primary);
  background:var(--surface);
}
.winner-badge{
  position:absolute;top:-14px;left:50%;transform:translateX(-50%);
  background:var(--primary);color:#fffffe;
  font-size:12px;font-weight:600;
  padding:5px 14px;border-radius:100px;
  display:inline-flex;align-items:center;gap:5px;
  white-space:nowrap;
}

.tool-icon{
  width:44px;height:44px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;margin-bottom:14px;
}
.accent-primary .tool-icon{background:var(--primary-dim);color:var(--primary)}
.accent-match   .tool-icon{background:var(--match-dim);color:var(--match)}
.accent-accent  .tool-icon{background:var(--accent-dim);color:var(--accent)}

.tool-name{font-size:18px;font-weight:600;color:var(--text);margin-bottom:2px}
.tool-cat{font-size:13px;color:var(--text-muted);margin-bottom:18px}

.score-row{
  display:flex;justify-content:space-between;
  font-size:13px;color:var(--text-muted);margin-bottom:6px;
}
.accent-primary .score-val{color:var(--primary);font-weight:600}
.accent-match   .score-val{color:var(--match);font-weight:600}
.accent-accent  .score-val{color:var(--accent);font-weight:600}

.score-track{
  height:6px;background:var(--surface2);border-radius:100px;overflow:hidden;
  margin-bottom:14px;
}
.score-fill{height:100%;border-radius:100px;transition:width .6s ease}
.accent-primary .score-fill{background:var(--primary)}
.accent-match   .score-fill{background:var(--match)}
.accent-accent  .score-fill{background:var(--accent)}

.card-badges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.mini-badge{
  font-size:12px;font-weight:600;
  padding:4px 12px;border-radius:100px;
}
.mini-match{background:#dff5ea;color:#2cb67d}
.mini-accent{background:#ffe8d1;color:#ff8906}
.mini-muted{background:var(--surface2);color:var(--text-muted)}
@media(prefers-color-scheme:dark){
  .mini-match{background:var(--match-dim)}
  .mini-accent{background:var(--accent-dim)}
}

.reasons{
  list-style:none;display:flex;flex-direction:column;gap:6px;
  margin:0 0 16px;padding:0;
  font-size:12.5px;line-height:1.4;
}
.reasons li{display:flex;align-items:flex-start;gap:6px}
.reasons i{font-size:14px;margin-top:1px;flex-shrink:0}
.reason-win{color:var(--text)}
.reason-win i{color:var(--match)}
.reason-lose{color:var(--text-muted)}
.reason-lose i{color:var(--pop)}

.cta{
  margin-top:auto;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-size:14px;font-weight:600;color:var(--text);
  background:var(--base);
  border:1.5px solid var(--border2);
  padding:11px 16px;border-radius:10px;
  transition:transform .1s,background .15s;
}
.card.winner .cta{
  background:var(--primary);color:#fffffe;border-color:var(--primary);
}
.accent-match  .cta{background:var(--match);color:#fffffe;border-color:var(--match)}
.accent-accent .cta{background:var(--accent);color:#fffffe;border-color:var(--accent)}
.cta:hover{transform:translateY(-1px)}

/* ───── rating ───── */
.rating-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:18px;
  padding:28px;
  max-width:560px;margin:0 auto;
  text-align:center;
}
.rate-title{font-size:18px;font-weight:600;color:var(--text);margin-bottom:6px}
.rate-sub{font-size:14px;color:var(--text-muted);margin-bottom:18px}
.rate-error{color:var(--pop);font-size:13px;margin:0 0 12px}

.stars{display:flex;justify-content:center;gap:6px;margin-bottom:18px}
.star-btn{
  font-size:30px;color:var(--text-faint);
  transition:transform .1s,color .15s;
  padding:4px;
}
.star-btn:hover{transform:scale(1.15)}
.star-btn.filled{color:#ffb800}

.feedback{
  width:100%;
  background:var(--base);
  border:1.5px solid var(--border);
  border-radius:12px;
  padding:12px 14px;
  font-family:inherit;font-size:14px;color:var(--text);
  resize:vertical;
  margin-bottom:16px;
  transition:border-color .15s;
}
.feedback:focus{outline:none;border-color:var(--primary)}

.submit-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--primary);color:#fffffe;
  font-size:14px;font-weight:600;
  padding:11px 22px;border-radius:100px;
  transition:opacity .15s,transform .1s;
}
.submit-btn:disabled{opacity:.4;cursor:not-allowed}
.submit-btn:not(:disabled):hover{transform:translateY(-1px)}

.thanks{padding:14px 0}
.thanks-icon{
  font-size:34px;color:var(--pop);margin-bottom:10px;
  animation:pop .4s ease-out;
}
@keyframes pop{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
</style>
