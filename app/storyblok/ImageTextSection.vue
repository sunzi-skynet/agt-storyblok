<template>
  <section
    v-editable="blok"
    class="image-text-section agt-section agt-section--light"
    :class="{ 'image-text-section--reversed': blok.image_position === 'right' }"
  >
    <div class="agt-container image-text-section__grid">
      <div class="image-text-section__image">
        <img
          v-if="blok.image?.filename"
          :src="blok.image.filename"
          :alt="blok.image.alt || blok.title || 'Section image'"
          class="agt-img agt-img--cover agt-img--rounded"
        />
      </div>
      <div class="image-text-section__content">
        <h2 v-if="blok.title" class="agt-title agt-title--sm">{{ blok.title }}</h2>
        <div v-if="blok.body" class="agt-richtext" v-html="renderRichText(blok.body)"></div>
        <a
          v-if="blok.cta_text && blok.cta_link"
          :href="blok.cta_link"
          class="agt-btn agt-btn--primary"
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
.image-text-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

.image-text-section--reversed .image-text-section__grid {
  direction: rtl;
}

.image-text-section--reversed .image-text-section__grid > * {
  direction: ltr;
}

.image-text-section__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.image-text-section__content .agt-title {
  margin-bottom: var(--space-xs);
}

.image-text-section__content .agt-btn {
  align-self: flex-start;
  margin-top: var(--space-xs);
}

/* Responsive */
@media (max-width: 768px) {
  .image-text-section__grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .image-text-section--reversed .image-text-section__grid {
    direction: ltr;
  }
}
</style>
