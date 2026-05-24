<script setup lang="ts">
import { getLogoUrl } from '~/data/toolBrandDomains'

const props = withDefaults(defineProps<{
  toolId: string
  toolName: string
  fallbackIcon: string // Tabler icon class like 'ti-video'
  color?: 'primary' | 'match' | 'accent'
  size?: number // px — square
}>(), {
  color: 'primary',
  size: 40
})

const logoUrl = computed(() => getLogoUrl(props.toolId))
const failed = ref(false)

function onError() {
  failed.value = true
}
</script>

<template>
  <div
    class="logo-wrap"
    :class="[`accent-${color}`, { 'has-logo': logoUrl && !failed }]"
    :style="{ width: size + 'px', height: size + 'px' }"
    :aria-label="`${toolName} logo`"
  >
    <img
      v-if="logoUrl && !failed"
      :src="logoUrl"
      :alt="`${toolName} logo`"
      width="128"
      height="128"
      loading="lazy"
      referrerpolicy="no-referrer"
      @error="onError"
    />
    <i v-else :class="['ti', fallbackIcon]" aria-hidden="true" />
  </div>
</template>

<style scoped>
.logo-wrap{
  border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  overflow:hidden;
  background:var(--surface2);
}
.logo-wrap.has-logo{background:#fff}
@media(prefers-color-scheme:dark){
  .logo-wrap.has-logo{background:#fff}
}

.logo-wrap img{
  width:100%;height:100%;
  object-fit:contain;
  padding:4px;
}

.logo-wrap i{font-size:18px}
.accent-primary i{color:var(--primary)}
.accent-match   i{color:var(--match)}
.accent-accent  i{color:var(--accent)}

.accent-primary:not(.has-logo){background:var(--primary-dim)}
.accent-match:not(.has-logo){background:var(--match-dim)}
.accent-accent:not(.has-logo){background:var(--accent-dim)}
</style>
