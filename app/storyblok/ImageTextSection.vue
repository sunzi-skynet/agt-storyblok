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
        <a
          v-if="blok.cta_text && blok.cta_link"
          :href="blok.cta_link"
          class="its-cta"
        >
          {{ blok.cta_text }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { renderRichText } from '@storyblok/vue'

defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

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

.its-cta {
  display: inline-block;
  background: #265BF6;
  color: #fff;
  padding: 14px 32px;
  border-radius: 4px;
  text-decoration: none;
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s ease;
}

.its-cta:hover {
  background: #1a4ad4;
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
}
</style>
