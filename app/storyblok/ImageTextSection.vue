<script setup lang="ts">
import { renderRichText } from '@storyblok/vue'

defineProps<{
  blok: {
    image?: { filename: string; alt?: string }
    image_position?: 'left' | 'right'
    title?: string
    body?: any
    buttons?: Array<{
      _uid: string
      component: string
      label?: string
      link?: any
      style?: string
      size?: string
      icon_left?: { filename: string; alt?: string }
      icon_right?: { filename: string; alt?: string }
    }>
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="image-text-section"
    :class="{ 'image-right': blok.image_position === 'right' }"
  >
    <div class="its-container">
      <div class="its-image">
        <img
          v-if="blok.image?.filename"
          :src="blok.image.filename"
          :alt="blok.image.alt || blok.title || 'Section image'"
        />
      </div>
      <div class="its-content">
        <h2 v-if="blok.title" class="its-title">{{ blok.title }}</h2>
        <div v-if="blok.body" class="its-body" v-html="renderRichText(blok.body)"></div>
        <div v-if="blok.buttons && blok.buttons.length" class="its-buttons">
          <StoryblokComponent
            v-for="button in blok.buttons"
            :key="button._uid"
            :blok="button"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image-text-section {
  padding: 80px 0;
  background: #fff;
}

.its-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.image-right .its-container {
  direction: rtl;
}

.image-right .its-container > * {
  direction: ltr;
}

.its-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.its-content {
  padding: 20px 0;
}

.its-title {
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 500;
  font-size: 2.5rem;
  color: #040B2F;
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.its-body {
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 32px;
}

.its-body :deep(p) {
  margin: 0 0 16px 0;
}

.its-body :deep(p:last-child) {
  margin-bottom: 0;
}

.its-body :deep(ul),
.its-body :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.its-body :deep(li) {
  margin-bottom: 8px;
}

.its-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}

/* Responsive */
@media (max-width: 768px) {
  .image-text-section {
    padding: 48px 0;
  }

  .its-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .image-right .its-container {
    direction: ltr;
  }

  .its-title {
    font-size: 1.875rem;
  }

  .its-body {
    font-size: 1rem;
  }

  .its-buttons {
    flex-direction: column;
  }

  .its-buttons :deep(.cta-button) {
    width: 100%;
    justify-content: center;
  }
}
</style>
