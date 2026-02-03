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

const bgColors: Record<string, { bg: string; text: string; buttonBg: string; buttonText: string }> = {
  primary: { bg: '#265BF6', text: 'white', buttonBg: 'white', buttonText: '#265BF6' },
  secondary: { bg: '#040B2F', text: 'white', buttonBg: '#265BF6', buttonText: 'white' },
  light: { bg: '#F5F5F5', text: '#040B2F', buttonBg: '#265BF6', buttonText: 'white' }
}

const colors = computed(() => bgColors[props.blok.bg_color || 'primary'])
</script>

<template>
  <section
    v-editable="blok"
    class="cta-banner"
    :style="{
      background: blok.bg_image?.filename
        ? `linear-gradient(rgba(4,11,47,0.7), rgba(4,11,47,0.7)), url(${blok.bg_image.filename}) center/cover`
        : colors.bg,
      color: blok.bg_image?.filename ? 'white' : colors.text
    }"
  >
    <div class="cta-banner__container">
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
        :style="{
          background: blok.bg_image?.filename ? 'white' : colors.buttonBg,
          color: blok.bg_image?.filename ? '#040B2F' : colors.buttonText
        }"
      >
        {{ blok.cta_text }}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  padding: 64px 24px;
}

.cta-banner__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.cta-banner__content {
  flex: 1;
  min-width: 280px;
}

.cta-banner__title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 500;
  margin: 0 0 8px;
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
  gap: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.cta-banner__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-banner {
    padding: 48px 16px;
  }

  .cta-banner__container {
    flex-direction: column;
    text-align: center;
  }

  .cta-banner__button {
    width: 100%;
    justify-content: center;
  }
}
</style>
