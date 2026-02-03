<template>
  <section v-editable="blok" class="client-logos">
    <div class="client-logos__container">
      <!-- Title -->
      <h2 v-if="blok.title" class="client-logos__title">{{ blok.title }}</h2>
      
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
        <p v-if="blok.description" class="client-logos__description">
          {{ blok.description }}
        </p>
        <a 
          v-if="blok.cta_link && blok.cta_text"
          :href="blok.cta_link.cached_url || blok.cta_link.url || blok.cta_link"
          class="client-logos__cta"
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
.client-logos {
  background-color: #040B2F;
  padding: 80px 0;
}

.client-logos__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.client-logos__title {
  color: #ffffff;
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 60px;
}

.client-logos__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-bottom: 60px;
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
  transition: opacity 0.2s ease;
}

.client-logos__image:hover {
  opacity: 1;
}

.client-logos__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 30px;
}

.client-logos__description {
  color: #ffffff;
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0;
  opacity: 0.9;
}

.client-logos__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  border: 2px solid #ffffff;
  padding: 16px 32px;
  transition: all 0.2s ease;
}

.client-logos__cta:hover {
  background-color: #ffffff;
  color: #040B2F;
}

.client-logos__cta-arrow {
  font-size: 24px;
  transition: transform 0.2s ease;
}

.client-logos__cta:hover .client-logos__cta-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .client-logos {
    padding: 60px 0;
  }
  
  .client-logos__title {
    font-size: 32px;
    margin-bottom: 40px;
  }
  
  .client-logos__grid {
    gap: 40px;
  }
  
  .client-logos__image {
    max-height: 40px;
  }
  
  .client-logos__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .client-logos__cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
