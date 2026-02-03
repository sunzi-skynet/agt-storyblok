<script setup lang="ts">
defineProps<{
  blok: {
    title?: string
    subtitle?: string
    testimonials?: Array<{
      quote?: string
      author_name?: string
      author_role?: string
      author_company?: string
      company_logo?: { filename: string; alt?: string }
      author_image?: { filename: string; alt?: string }
      _uid: string
      component: string
    }>
    layout?: 'single' | 'slider' | 'grid'
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="testimonial-section">
    <div class="testimonial-section__container">
      <!-- Header -->
      <header v-if="blok.title || blok.subtitle" class="testimonial-section__header">
        <h2 v-if="blok.title" class="testimonial-section__title">
          {{ blok.title }}
        </h2>
        <p v-if="blok.subtitle" class="testimonial-section__subtitle">
          {{ blok.subtitle }}
        </p>
      </header>

      <!-- Testimonials -->
      <div
        class="testimonial-section__content"
        :class="`testimonial-section__content--${blok.layout || 'single'}`"
      >
        <StoryblokComponent
          v-for="testimonial in blok.testimonials"
          :key="testimonial._uid"
          :blok="testimonial"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-section {
  padding: 80px 0;
  background: #F5F5F5;
}

.testimonial-section__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.testimonial-section__header {
  text-align: center;
  margin-bottom: 48px;
}

.testimonial-section__title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 500;
  color: #040B2F;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}

.testimonial-section__subtitle {
  font-size: 18px;
  color: #666666;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Layout: Single */
.testimonial-section__content--single {
  max-width: 800px;
  margin: 0 auto;
}

/* Layout: Grid */
.testimonial-section__content--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

/* Layout: Slider (basic horizontal scroll for now) */
.testimonial-section__content--slider {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 16px;
}

.testimonial-section__content--slider > :deep(*) {
  flex: 0 0 min(100%, 500px);
  scroll-snap-align: start;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonial-section {
    padding: 48px 0;
  }

  .testimonial-section__content--grid {
    grid-template-columns: 1fr;
  }
}
</style>
