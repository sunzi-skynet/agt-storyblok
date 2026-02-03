<script setup lang="ts">
import { renderRichText } from '@storyblok/vue'
import { computed } from 'vue'

const props = defineProps<{
  blok: {
    title?: string
    subtitle?: string
    body?: any
    text_align?: 'left' | 'center' | 'right'
    max_width?: 'narrow' | 'medium' | 'full'
    _uid: string
    component: string
    _editable?: string
  }
}>()

const renderedBody = computed(() => {
  if (!props.blok.body) return ''
  return renderRichText(props.blok.body)
})

const maxWidthPx = computed(() => {
  switch (props.blok.max_width) {
    case 'narrow': return '600px'
    case 'full': return '1200px'
    default: return '800px'
  }
})
</script>

<template>
  <section v-editable="blok" class="text-section">
    <div
      class="text-section__container"
      :style="{ maxWidth: maxWidthPx, textAlign: blok.text_align || 'left' }"
    >
      <h2 v-if="blok.title" class="text-section__title">
        {{ blok.title }}
      </h2>

      <p v-if="blok.subtitle" class="text-section__subtitle">
        {{ blok.subtitle }}
      </p>

      <div
        v-if="renderedBody"
        class="text-section__body"
        v-html="renderedBody"
      />
    </div>
  </section>
</template>

<style scoped>
.text-section {
  padding: 64px 24px;
  background: white;
}

.text-section__container {
  margin: 0 auto;
}

.text-section__title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 500;
  color: #040B2F;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}

.text-section__subtitle {
  font-size: clamp(18px, 2vw, 21px);
  color: #666666;
  margin: 0 0 32px;
  line-height: 1.5;
}

.text-section__body {
  font-size: 18px;
  line-height: 1.7;
  color: #333333;
}

/* Rich text styling */
.text-section__body :deep(p) {
  margin: 0 0 1.5em;
}

.text-section__body :deep(p:last-child) {
  margin-bottom: 0;
}

.text-section__body :deep(a) {
  color: #265BF6;
  text-decoration: none;
}

.text-section__body :deep(a:hover) {
  text-decoration: underline;
}

.text-section__body :deep(strong) {
  font-weight: 600;
  color: #040B2F;
}

.text-section__body :deep(ul),
.text-section__body :deep(ol) {
  margin: 0 0 1.5em;
  padding-left: 1.5em;
}

.text-section__body :deep(li) {
  margin-bottom: 0.5em;
}

.text-section__body :deep(h3) {
  font-size: 24px;
  font-weight: 500;
  color: #040B2F;
  margin: 2em 0 1em;
}

.text-section__body :deep(h4) {
  font-size: 20px;
  font-weight: 500;
  color: #040B2F;
  margin: 1.5em 0 0.75em;
}

/* Responsive */
@media (max-width: 768px) {
  .text-section {
    padding: 48px 16px;
  }
}
</style>
