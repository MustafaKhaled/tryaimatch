<script setup lang="ts">
import { categories, type CategoryId } from '~/data/categories'
import type { Answers } from '~/data/schema'

const router = useRouter()

const chosenCategory = useState<CategoryId | null>('chosenCategory', () => null)
const categoryAnswers = useState<Answers>('categoryAnswers', () => ({}))

// ───── category-picker (Q0) ─────
const categoryOptions = [
  { id: 'video',   label: 'Video maker',            icon: 'ti-video' },
  { id: 'voice',   label: 'Voiceover & audio',      icon: 'ti-microphone' },
  { id: 'image',   label: 'Image generation',       icon: 'ti-photo' },
  { id: 'writing', label: 'Writing & copywriting',  icon: 'ti-writing' },
  { id: 'code',    label: 'Coding & development',   icon: 'ti-code' },
  { id: 'slides',  label: 'Presentation & slides',  icon: 'ti-presentation' },
  { id: 'seo',     label: 'SEO & research',         icon: 'ti-search' },
  { id: 'chatbot', label: 'Chatbots & automation',  icon: 'ti-robot' },
  { id: 'support', label: 'Customer support',       icon: 'ti-headset' },
  { id: 'data',    label: 'Data analysis',          icon: 'ti-chart-bar' }
]

// ───── flow state ─────
// step 0 = category picker, 1..N = category's own questions
const step = ref(0)
const pickerAnswer = ref<CategoryId | null>(null)

const activeCategory = computed(() =>
  chosenCategory.value ? categories[chosenCategory.value] : null
)
const total = computed(() => 1 + (activeCategory.value?.questions.length ?? 0))
const progress = computed(() => Math.round((step.value / total.value) * 100))
const isLast = computed(() => step.value === total.value - 1)

const currentCatQuestion = computed(() =>
  step.value === 0 || !activeCategory.value
    ? null
    : activeCategory.value.questions[step.value - 1]
)

const currentAnswer = computed(() => {
  if (step.value === 0) return pickerAnswer.value
  if (!currentCatQuestion.value) return null
  return categoryAnswers.value[currentCatQuestion.value.id] ?? null
})

const canNext = computed(() => !!currentAnswer.value)

function selectCategory(id: CategoryId) {
  pickerAnswer.value = id
  chosenCategory.value = id
  // reset answers + analytics flag for the new run
  categoryAnswers.value = {}
  useState<boolean>('completionTracked').value = false
  setTimeout(() => { step.value = 1 }, 220)
}

function selectAnswer(optionId: string) {
  if (!currentCatQuestion.value) return
  categoryAnswers.value = {
    ...categoryAnswers.value,
    [currentCatQuestion.value.id]: optionId
  }
  setTimeout(() => {
    if (isLast.value) router.push('/loading')
    else step.value++
  }, 220)
}

function back() {
  if (step.value > 0) step.value--
  else router.push('/')
}

function next() {
  if (!canNext.value) return
  if (step.value === 0) {
    step.value = 1
    return
  }
  if (isLast.value) router.push('/loading')
  else step.value++
}

function weightClass(w: string) {
  if (w.startsWith('Hard')) return 'weight-hard'
  if (w.includes('Medium')) return 'weight-med'
  return 'weight-high'
}
</script>

<template>
  <div class="page">
    <header class="nav">
      <a href="/" class="brand">
        <span class="brand-mark"><i class="ti ti-hexagon" aria-hidden="true" /></span>
        <span class="brand-name">tryaimatch</span>
      </a>
      <button class="exit" @click="router.push('/')">
        <i class="ti ti-x" aria-hidden="true" /> Exit
      </button>
    </header>

    <div class="progress-bar">
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress + '%' }" />
      </div>
      <div class="progress-meta">
        <span>{{ activeCategory ? activeCategory.label : 'Find your AI tool' }}</span>
        <span>Question {{ step + 1 }} of {{ total }} · {{ progress }}%</span>
      </div>
    </div>

    <main class="stage">
      <transition name="slide" mode="out-in">
        <!-- step 0: pick a category -->
        <section v-if="step === 0" key="picker" class="q-card">
          <h2 class="quiz-q">What do you spend most time creating?</h2>
          <div class="quiz-options">
            <button
              v-for="opt in categoryOptions"
              :key="opt.id"
              class="quiz-opt"
              :class="{ selected: pickerAnswer === opt.id }"
              @click="selectCategory(opt.id as CategoryId)"
            >
              <i class="ti" :class="opt.icon" aria-hidden="true" />
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </section>

        <!-- category-specific question -->
        <section v-else-if="currentCatQuestion" :key="`q-${step}`" class="q-card rich">
          <header class="q-head">
            <span class="q-num">{{ currentCatQuestion.num }}</span>
            <div>
              <h2 class="q-title">{{ currentCatQuestion.title }}</h2>
              <p class="q-sub">{{ currentCatQuestion.subtitle }}</p>
            </div>
          </header>

          <span class="weight" :class="weightClass(currentCatQuestion.weightLabel)">{{ currentCatQuestion.weightLabel }}</span>

          <div class="opt-grid">
            <button
              v-for="opt in currentCatQuestion.options"
              :key="opt.id"
              class="opt"
              :class="{ selected: currentAnswer === opt.id }"
              @click="selectAnswer(opt.id)"
            >
              <div class="opt-label">{{ opt.label }}</div>
              <div class="opt-desc">{{ opt.desc }}</div>
            </button>
          </div>
        </section>
      </transition>

      <footer class="actions">
        <button class="btn-back" @click="back">
          <i class="ti ti-arrow-left" aria-hidden="true" />
          {{ step === 0 ? 'Back to home' : 'Previous' }}
        </button>
        <button class="btn-next" :disabled="!canNext" @click="next">
          {{ isLast ? 'See my matches' : 'Next' }}
          <i class="ti" :class="isLast ? 'ti-sparkles' : 'ti-arrow-right'" aria-hidden="true" />
        </button>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.page{
  height:100vh;background:var(--base);
  padding:0 4vw;
  display:flex;flex-direction:column;
  overflow:hidden;
}

.nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 0;border-bottom:1px solid var(--border);
  flex-shrink:0;
}
.brand{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:600;color:var(--text);letter-spacing:-.5px}
.exit{
  display:inline-flex;align-items:center;gap:6px;
  font-size:14px;color:var(--text-muted);
  padding:8px 14px;border-radius:100px;
}
.exit:hover{color:var(--text);background:var(--surface)}

.progress-bar{padding:16px 0 8px;flex-shrink:0}
.progress-track{height:5px;background:var(--surface2);border-radius:100px;overflow:hidden}
.progress-fill{height:100%;background:var(--primary);border-radius:100px;transition:width .35s ease}
.progress-meta{display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-top:8px}

.stage{
  flex:1;min-height:0;
  display:flex;flex-direction:column;justify-content:center;
  max-width:920px;width:100%;margin:0 auto;
  padding:24px 0;
}

.q-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:20px;
  padding:32px;
}

/* picker / generic step */
.quiz-q{font-size:22px;font-weight:600;color:var(--text);margin-bottom:24px;letter-spacing:-.3px}
.quiz-options{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:560px){.quiz-options{grid-template-columns:1fr}}

.quiz-opt{
  display:flex;align-items:center;gap:12px;
  background:var(--base);
  border:1.5px solid var(--border);
  border-radius:12px;
  padding:16px 18px;
  font-size:15px;font-weight:500;
  color:var(--text-muted);
  text-align:left;cursor:pointer;
  transition:border-color .15s,color .15s,background .15s;
}
.quiz-opt i{font-size:18px;color:var(--text-faint);transition:color .15s}
.quiz-opt:hover{border-color:var(--border2);color:var(--text)}
.quiz-opt:hover i{color:var(--text-muted)}
.quiz-opt.selected{border-color:var(--primary);color:var(--text);background:var(--primary-dim)}
.quiz-opt.selected i{color:var(--primary)}

/* category-question step */
.q-head{display:flex;align-items:flex-start;gap:14px;margin-bottom:14px}
.q-num{
  flex-shrink:0;width:36px;height:36px;border-radius:50%;
  background:var(--primary);color:#fffffe;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:600;
}
.q-title{font-size:22px;font-weight:600;color:var(--text);line-height:1.3;letter-spacing:-.3px}
.q-sub{font-size:14px;color:var(--text-muted);margin-top:3px}

.weight{
  display:inline-flex;align-items:center;
  font-size:13px;font-weight:500;
  padding:5px 14px;border-radius:100px;
  margin:4px 0 22px 50px;
}
.weight-high{background:var(--primary-dim);color:var(--primary)}
.weight-med{background:var(--accent-dim);color:var(--accent)}
.weight-hard{background:var(--pop-dim);color:var(--pop)}

.opt-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-left:50px}
@media(max-width:680px){
  .opt-grid,.weight{margin-left:0}
  .opt-grid{grid-template-columns:1fr}
  .q-card{padding:22px}
}

.opt{
  background:var(--base);
  border:1.5px solid var(--border);
  border-radius:14px;
  padding:16px 18px;
  text-align:left;cursor:pointer;
  transition:border-color .15s,background .15s;
}
.opt:hover{border-color:var(--border2)}
.opt.selected{border-color:var(--primary);background:var(--primary-dim)}
.opt-label{font-size:15px;font-weight:600;color:var(--text);margin-bottom:4px}
.opt-desc{font-size:13px;color:var(--text-muted);line-height:1.45}

.actions{display:flex;justify-content:space-between;align-items:center;margin-top:24px}
.btn-back{
  display:inline-flex;align-items:center;gap:6px;
  font-size:14px;font-weight:500;color:var(--text-muted);
  padding:10px 18px;border-radius:100px;
  transition:color .15s,background .15s;
}
.btn-back:hover{color:var(--text);background:var(--surface)}
.btn-next{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--primary);color:#fffffe;
  font-size:15px;font-weight:600;
  padding:12px 26px;border-radius:100px;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s,opacity .15s;
}
.btn-next:disabled{opacity:.4;box-shadow:0 2px 0 rgba(15,14,23,.5);cursor:not-allowed}
.btn-next:not(:disabled):hover{transform:translateY(2px);box-shadow:0 2px 0 rgba(15,14,23,.85)}

.slide-enter-active,.slide-leave-active{transition:opacity .22s ease,transform .22s ease}
.slide-enter-from{opacity:0;transform:translateX(20px)}
.slide-leave-to{opacity:0;transform:translateX(-20px)}
</style>
