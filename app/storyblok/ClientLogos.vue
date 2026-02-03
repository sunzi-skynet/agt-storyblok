<template>
  <section v-editable="blok" class="client-logos agt-section agt-section--dark">
    <div class="agt-container">
      <!-- Title -->
      <h2 v-if="blok.title" class="agt-title client-logos__title">{{ blok.title }}</h2>
      
      <!-- Logos Row -->
      <div class="client-logos__grid">
        <div 
          v-for="(logo, index) in blok.logos" 
          :key="index"
          class="client-logos__item"
        >
          <img 
            v-if="logo.filename" 
            :src="logo.filename" 
            :alt="logo.alt || 'Partner Logo'"
            class="client-logos__image"
          />
        </div>
      </div>
      
      <!-- Bottom Row: Description + CTA -->
      <div class="client-logos__bottom">
        <p v-if="blok.description" class="client-logos__description agt-subtitle">
          {{ blok.description }}
        </p>
        <a 
          v-if="blok.cta_link && blok.cta_text"
          :href="blok.cta_link.cached_url || blok.cta_link.url || blok.cta_link"
          class="agt-btn agt-btn--secondary"
        >
          {{ blok.cta_text }}
          <span class="client-logos__cta-arrow">›</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.client-logos__title {
  color: var(--color-text-inverse);
  margin-bottom: var(--space-2xl);
}

.client-logos__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.client-logos__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.client-logos__image {
  max-height: 60px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  transition: opacity var(--transition-base);
}

.client-logos__image:hover {
  opacity: 1;
}

.client-logos__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.client-logos__description {
  color: var(--color-text-inverse);
  max-width: 600px;
  margin: 0;
  opacity: 0.9;
}

.client-logos__cta-arrow {
  font-size: 24px;
  transition: transform var(--transition-base);
}

.agt-btn:hover .client-logos__cta-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .client-logos__title {
    font-size: 32px;
    margin-bottom: var(--space-xl);
  }
  
  .client-logos__grid {
    gap: var(--space-xl);
  }
  
  .client-logos__image {
    max-height: 40px;
  }
  
  .client-logos__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .client-logos__bottom .agt-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
