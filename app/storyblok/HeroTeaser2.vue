<script setup lang="ts">
defineProps<{
  blok: {
    background_image?: { filename: string; alt?: string }
    title_left?: string
    sub_title_right?: string
    description_right?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="hero-teaser-2"
    :style="{
      backgroundImage: blok.background_image?.filename ? `url(${blok.background_image.filename})` : undefined
    }"
  >
    <!-- Gradient overlay -->
    <div class="hero-teaser-2__overlay" />

    <!-- Content -->
    <div class="hero-teaser-2__content">
      <div class="hero-teaser-2__container">
        <div class="hero-teaser-2__stack">
          <h1 class="hero-teaser-2__title">{{ blok.title_left }}</h1>
          <p v-if="blok.sub_title_right" class="hero-teaser-2__subtitle">{{ blok.sub_title_right }}</p>
          <p v-if="blok.description_right" class="hero-teaser-2__description">{{ blok.description_right }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-teaser-2 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #040B2F;
}

.hero-teaser-2__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4,11,47,0.85) 0%, rgba(4,11,47,0.4) 40%, transparent 70%);
}

.hero-teaser-2__content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 80px;
}

.hero-teaser-2__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-teaser-2__stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
}

.hero-teaser-2__title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 500;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

.hero-teaser-2__subtitle {
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 600;
  color: white;
  line-height: 1.3;
  margin: 0;
}

.hero-teaser-2__description {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 480px;
  white-space: pre-line;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-teaser-2__title {
    font-size: 32px;
  }
  
  .hero-teaser-2__subtitle {
    font-size: 18px;
  }
  
  .hero-teaser-2__description {
    font-size: 14px;
  }
  
  .hero-teaser-2__content {
    padding-bottom: 60px;
  }
}
</style>
