<script setup lang="ts">
const router = useRouter()

useSeoMeta({
  title: 'List your product on tryaimatch',
  description: 'Have an AI tool you want listed on tryaimatch? Fill the form and we\'ll schedule a meeting to walk through your product and our match criteria.',
  ogTitle: 'List your product on tryaimatch',
  ogDescription: 'Submit your AI tool to be matched to creators looking for exactly what you build.',
  ogUrl: 'https://tryaimatch.com/contact'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://tryaimatch.com/contact' }]
})

const form = reactive({
  name: '',
  email: '',
  productName: '',
  productUrl: '',
  category: '',
  message: ''
})

const categoryOptions = [
  'Video maker', 'Voiceover & audio', 'Image generation',
  'Writing & copywriting', 'Coding & development', 'Presentation & slides',
  'SEO & research', 'Chatbots & automation', 'Customer support',
  'Data analysis', 'Other'
]

const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

async function submit() {
  errorMsg.value = ''
  submitting.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    submitted.value = true
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || e?.statusMessage || 'Could not send — please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <SiteNav />

    <main class="contact-wrap">
      <div class="header-block">
        <span class="kicker">LIST YOUR PRODUCT</span>
        <h1 class="title">
          Have a product you want to list on
          <span class="hl-yellow">tryaimatch?</span>
        </h1>
        <p class="lede">
          Fill the form below and we'll schedule a meeting as soon as possible
          to walk through your tool and the match criteria.
        </p>
      </div>

      <section v-if="!submitted" class="form-card">
        <form @submit.prevent="submit">
          <div class="row">
            <label class="field">
              <span class="label">Your name <span class="req">*</span></span>
              <input v-model="form.name" required type="text" placeholder="Jane Founder" />
            </label>
            <label class="field">
              <span class="label">Work email <span class="req">*</span></span>
              <input v-model="form.email" required type="email" placeholder="jane@yourproduct.com" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span class="label">Product name <span class="req">*</span></span>
              <input v-model="form.productName" required type="text" placeholder="e.g. HeyGen" />
            </label>
            <label class="field">
              <span class="label">Product URL</span>
              <input v-model="form.productUrl" type="url" placeholder="https://yourproduct.com" />
            </label>
          </div>

          <label class="field">
            <span class="label">Closest category</span>
            <select v-model="form.category">
              <option value="">Pick one (optional)</option>
              <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
            </select>
          </label>

          <label class="field">
            <span class="label">Tell us about your product <span class="req">*</span></span>
            <textarea
              v-model="form.message"
              required
              rows="5"
              placeholder="What does it do, who it's for, pricing, anything else we should know."
            />
          </label>

          <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

          <button type="submit" class="submit" :disabled="submitting">
            <i class="ti ti-send" aria-hidden="true" />
            {{ submitting ? 'Sending…' : 'Request a meeting' }}
          </button>
        </form>
      </section>

      <section v-else class="thanks-card">
        <div class="thanks-icon"><i class="ti ti-check" aria-hidden="true" /></div>
        <h2 class="thanks-title">Thanks — we'll be in touch.</h2>
        <p class="thanks-sub">
          We've logged your submission and will reach out to <strong>{{ form.email }}</strong>
          within a few working days to schedule a meeting.
        </p>
        <button class="btn-secondary" @click="router.push('/')">
          <i class="ti ti-arrow-left" aria-hidden="true" /> Back to home
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page{min-height:100vh;background:var(--base);padding:0 4vw}

.nav{
  display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  padding:24px 0;border-bottom:1px solid var(--border);
}
.brand{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:600;color:var(--text);letter-spacing:-.5px;justify-self:start}
.brand-mark{font-size:20px;display:inline-flex}
.tabs{display:flex;gap:4px;justify-self:center}
.tab{
  font-size:15px;font-weight:500;color:var(--text-muted);
  padding:8px 18px;border-radius:100px;
  transition:color .15s,background .15s;
}
.tab:hover{color:var(--text)}
.tab.active{color:var(--text);background:var(--surface)}
.btn-start{
  justify-self:end;font-size:14px;font-weight:600;
  background:var(--primary);color:#fffffe;
  padding:10px 22px;border-radius:100px;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s;
}
.btn-start:hover{transform:translateY(1px);box-shadow:0 3px 0 rgba(15,14,23,.85)}

.contact-wrap{max-width:680px;margin:0 auto;padding:56px 0 80px}

.header-block{text-align:center;margin-bottom:36px}
.kicker{font-size:12px;font-weight:600;letter-spacing:2px;color:var(--primary)}
.title{
  font-family:var(--font-hand);
  font-size:clamp(38px,5vw,52px);font-weight:700;
  color:var(--text);line-height:1.1;letter-spacing:-.5px;
  margin:14px 0 14px;
}
.hl-yellow{
  background:linear-gradient(transparent 55%,var(--highlight) 55%);padding:0 4px;
}
.lede{font-size:15px;color:var(--text-muted);max-width:540px;margin:0 auto;line-height:1.6}

.form-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:20px;
  padding:32px;
}
form{display:flex;flex-direction:column;gap:18px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:560px){.row{grid-template-columns:1fr}}

.field{display:flex;flex-direction:column;gap:6px}
.label{font-size:13px;font-weight:600;color:var(--text)}
.req{color:var(--pop)}

input,select,textarea{
  background:var(--base);
  border:1.5px solid var(--border);
  border-radius:12px;
  padding:12px 14px;
  font-family:inherit;font-size:14px;color:var(--text);
  transition:border-color .15s;
}
textarea{resize:vertical;min-height:120px}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--primary)}

.submit{
  align-self:flex-start;
  display:inline-flex;align-items:center;gap:8px;
  background:var(--primary);color:#fffffe;
  font-size:15px;font-weight:600;
  padding:13px 26px;border-radius:100px;
  box-shadow:0 4px 0 rgba(15,14,23,.85);
  transition:transform .1s,box-shadow .1s,opacity .15s;
}
.submit:disabled{opacity:.5;cursor:not-allowed}
.submit:not(:disabled):hover{transform:translateY(2px);box-shadow:0 2px 0 rgba(15,14,23,.85)}
.error{color:var(--pop);font-size:13px;margin:0}

.thanks-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:20px;
  padding:48px 32px;
  text-align:center;
}
.thanks-icon{
  width:64px;height:64px;border-radius:50%;
  background:var(--match-dim);color:var(--match);
  display:flex;align-items:center;justify-content:center;
  font-size:32px;margin:0 auto 18px;
}
.thanks-title{font-size:22px;font-weight:600;color:var(--text);margin-bottom:8px}
.thanks-sub{font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:24px}
.btn-secondary{
  display:inline-flex;align-items:center;gap:6px;
  font-size:14px;font-weight:500;color:var(--text);
  border:1.5px solid var(--border2);
  padding:10px 20px;border-radius:100px;
  transition:background .15s;
}
.btn-secondary:hover{background:var(--surface2)}
</style>
