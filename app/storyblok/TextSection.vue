<script setup lang="ts">
import { renderRichText } from '@storyblok/vue'

defineProps<{
  blok: {
    title?: string
    subtitle?: string
    body?: any
    text_align?: 'left' | 'center' | 'right'
    max_width?: 'narrow' | 'medium' | 'full'
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="text-section"
    :class="[
      `align-${blok.text_align || 'left'}`,
      `width-${blok.max_width || 'medium'}`
    ]"
  >
    <div class="ts-container">
      <h2 v-if="blok.title" class="ts-title">{{ blok.title }}</h2>
      <p v-if="blok.subtitle" class="ts-subtitle">{{ blok.subtitle }}</p>
      <div v-if="blok.body" class="ts-body" v-html="renderRichText(blok.body)"></div>
    </div>
  </section>
</template>

<style scoped>
.text-section {
  padding: 80px 0;
  background: #fff;
}

.ts-container {
  margin: 0 auto;
  padding: 0 20px;
}

/* Max Width Variants */
.width-narrow .ts-container {
  max-width: 720px;
}

.width-medium .ts-container {
  max-width: 960px;
}

.width-full .ts-container {
  max-width: 1140px;
}

/* Text Alignment */
.align-left {
  text-align: left;
}

.align-center {
  text-align: center;
}

.align-right {
  text-align: right;
}

.ts-title {
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 500;
  font-size: 2.5rem;
  color: #040B2F;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.ts-subtitle {
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.ts-body {
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #4a5568;
  line-height: 1.7;
}

.ts-body :deep(p) {
  margin: 0 0 16px 0;
}

.ts-body :deep(p:last-child) {
  margin-bottom: 0;
}

.ts-body :deep(a) {
  color: #265BF6;
  text-decoration: none;
  transition: color 0.2s;
}

.ts-body :deep(a:hover) {
  color: #1D4AC4;
  text-decoration: underline;
}

.ts-body :deep(strong) {
  font-weight: 600;
  color: #040B2F;
}

.ts-body :deep(ul),
.ts-body :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.ts-body :deep(li) {
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .text-section {
    padding: 48px 0;
  }

  .ts-title {
    font-size: 1.875rem;
  }

  .ts-subtitle {
    font-size: 1.125rem;
  }

  .ts-body {
    font-size: 1rem;
  }
}
</style>
