<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  blok: {
    title?: string
    subtitle?: string
    cta_text?: string
    cta_link?: string
    bg_color?: 'primary' | 'secondary' | 'light'
    bg_image?: { filename: string; alt?: string }
    _uid: string
    component: string
    _editable?: string
  }
}>()

const sectionClass = computed(() => {
  if (props.blok.bg_image?.filename) return ''
  const colorMap: Record<string, string> = {
    primary: 'cta-banner--primary',
    secondary: 'cta-banner--dark',
    light: 'cta-banner--light'
  }
  return colorMap[props.blok.bg_color || 'primary'] || 'cta-banner--primary'
})

const hasImage = computed(() => !!props.blok.bg_image?.filename)
</script>

<template>
  <section
    v-editable="blok"
    class="cta-banner agt-section"
    :class="sectionClass"
    :style="hasImage ? {
      background: `linear-gradient(var(--color-secondary-light), var(--color-secondary-light)), url(${blok.bg_image?.filename}) center/cover`
    } : undefined"
  >
    <div class="agt-container cta-banner__inner">
      <div class="cta-banner__content">
        <h2 v-if="blok.title" class="cta-banner__title">
          {{ blok.title }}
        </h2>
        <p v-if="blok.subtitle" class="cta-banner__subtitle">
          {{ blok.subtitle }}
        </p>
      </div>

      <a
        v-if="blok.cta_text"
        :href="blok.cta_link || '#'"
        class="cta-banner__button"
      >
        {{ blok.cta_text }}
        <svg class="agt-btn__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.cta-banner__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.cta-banner__content {
  flex: 1;
  min-width: 280px;
}

.cta-banner__title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--space-xs);
  letter-spacing: -0.02em;
}

.cta-banner__subtitle {
  font-size: 18px;
  margin: 0;
  opacity: 0.9;
}

.cta-banner__button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  white-space: nowrap;
}

.cta-banner__button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Color Variants */
.cta-banner--primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.cta-banner--primary .cta-banner__button {
  background: var(--color-text-inverse);
  color: var(--color-primary);
}

.cta-banner--dark {
  background-color: var(--color-bg-dark);
  color: var(--color-text-inverse);
}

.cta-banner--dark .cta-banner__button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.cta-banner--light {
  background-color: var(--color-bg-alt);
  color: var(--color-text);
}

.cta-banner--light .cta-banner__button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

/* Image variant (always dark text-inverse) */
.cta-banner:not(.cta-banner--primary):not(.cta-banner--dark):not(.cta-banner--light) {
  color: var(--color-text-inverse);
}

.cta-banner:not(.cta-banner--primary):not(.cta-banner--dark):not(.cta-banner--light) .cta-banner__button {
  background: var(--color-text-inverse);
  color: var(--color-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-banner__inner {
    flex-direction: column;
    text-align: center;
  }

  .cta-banner__button {
    width: 100%;
    justify-content: center;
  }
}
</style>
