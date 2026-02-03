<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
    subheadline?: string
    background_image?: {
      filename: string
      alt?: string
    }
    cta_text?: string
    cta_link?: {
      url?: string
      cached_url?: string
    }
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="hero"
  >
    <!-- Background Image -->
    <div
      v-if="blok.background_image?.filename"
      class="hero__background"
    >
      <img
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt || ''"
        class="hero__bg-image"
      />
    </div>

    <!-- Content -->
    <div class="agt-container hero__content">
      <div class="hero__inner">
        <h1 class="hero__headline agt-title">
          {{ blok.headline }}
        </h1>
        
        <p
          v-if="blok.subheadline"
          class="hero__subheadline agt-lead"
        >
          {{ blok.subheadline }}
        </p>

        <NuxtLink
          v-if="blok.cta_text && blok.cta_link"
          :to="blok.cta_link.cached_url || blok.cta_link.url || '#'"
          class="agt-btn agt-btn--primary"
        >
          {{ blok.cta_text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-dark);
  overflow: hidden;
}

.hero__background {
  position: absolute;
  inset: 0;
}

.hero__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}

.hero__content {
  position: relative;
  z-index: 10;
  padding: var(--space-3xl) 0;
}

.hero__inner {
  max-width: 800px;
}

.hero__headline {
  color: var(--color-text-inverse);
}

.hero__subheadline {
  margin-top: var(--space-md);
  color: rgba(255, 255, 255, 0.8);
}

.hero .agt-btn {
  margin-top: var(--space-lg);
}
</style>
