<script setup lang="ts">
const props = defineProps<{
  blok: {
    background_image?: {
      filename: string
      alt?: string
    }
    title?: string
    form_title?: string
    teaser_form?: Array<{
      _uid: string
      component: string
      [key: string]: unknown
    }>
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section 
    v-editable="blok" 
    class="hero-teaser-6"
    :style="blok.background_image?.filename ? {
      backgroundImage: `url(${blok.background_image.filename}/m/1920x0)`
    } : undefined"
  >
    <!-- Gradient Overlay -->
    <div class="hero-teaser-6__overlay"></div>

    <div class="hero-teaser-6__container">
      <!-- Title -->
      <h1 v-if="blok.title" class="hero-teaser-6__title">
        {{ blok.title }}
      </h1>

      <!-- Form Section -->
      <div class="hero-teaser-6__form-section">
        <!-- Form Title -->
        <p v-if="blok.form_title" class="hero-teaser-6__form-title">
          {{ blok.form_title }}
        </p>

        <!-- Teaser Form -->
        <StoryblokComponent
          v-for="formBlok in blok.teaser_form"
          :key="formBlok._uid"
          :blok="formBlok"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-teaser-6 {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: flex-end;
  padding: 0 24px 80px;
  background-color: #040B2F;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-teaser-6__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
}

.hero-teaser-6__container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.hero-teaser-6__title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  color: white;
  margin: 0 0 48px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hero-teaser-6__form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-teaser-6__form-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-teaser-6 {
    min-height: 100vh;
    padding: 0 16px 48px;
  }

  .hero-teaser-6__title {
    margin-bottom: 32px;
  }
}
</style>
