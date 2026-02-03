<script setup lang="ts">
import { ref } from 'vue'
import CtaButton from './CtaButton.vue'

interface CtaButtonBlok {
  text?: string
  link?: string
  variant?: 'primary' | 'secondary'
  _uid: string
  component: string
}

defineProps<{
  blok: {
    background_image?: { filename: string; alt?: string }
    title_left?: string
    description_left?: string
    cta_left?: CtaButtonBlok[]
    title_right?: string
    description_right?: string
    cta_right?: CtaButtonBlok[]
    _uid: string
    component: string
    _editable?: string
  }
}>()

// Mobile toggle: 0 = left, 1 = right
const activeSlide = ref(0)

const hasRightContent = (blok: any) => {
  return blok.title_right || blok.description_right || (blok.cta_right && blok.cta_right.length > 0)
}
</script>

<template>
  <section
    v-editable="blok"
    class="hero-teaser"
    :style="{
      backgroundImage: blok.background_image?.filename ? `url(${blok.background_image.filename})` : undefined
    }"
  >
    <!-- Gradient overlay -->
    <div class="hero-teaser__overlay" />

    <!-- Content -->
    <div class="hero-teaser__content">
      <div class="hero-teaser__container">
        
        <!-- Desktop: Two Column Layout -->
        <div class="hero-teaser__grid hero-teaser__grid--desktop">
          <!-- Left Column -->
          <div class="hero-teaser__column">
            <h1 class="hero-teaser__title">{{ blok.title_left }}</h1>
            <p class="hero-teaser__description">{{ blok.description_left }}</p>
            <div v-if="blok.cta_left && blok.cta_left.length" class="hero-teaser__cta">
              <CtaButton 
                v-for="cta in blok.cta_left" 
                :key="cta._uid" 
                :blok="cta" 
              />
            </div>
          </div>
          
          <!-- Right Column -->
          <div v-if="hasRightContent(blok)" class="hero-teaser__column hero-teaser__column--right">
            <p class="hero-teaser__title hero-teaser__title--right">{{ blok.title_right }}</p>
            <p class="hero-teaser__description">{{ blok.description_right }}</p>
            <div v-if="blok.cta_right && blok.cta_right.length" class="hero-teaser__cta">
              <CtaButton 
                v-for="cta in blok.cta_right" 
                :key="cta._uid" 
                :blok="cta" 
              />
            </div>
          </div>
        </div>

        <!-- Mobile: Slide Layout with Toggle -->
        <div class="hero-teaser__grid hero-teaser__grid--mobile">
          <!-- Slides Container -->
          <div class="hero-teaser__slides">
            <!-- Left Slide -->
            <div 
              class="hero-teaser__slide"
              :class="{ 'hero-teaser__slide--active': activeSlide === 0 }"
            >
              <h1 class="hero-teaser__title">{{ blok.title_left }}</h1>
              <p class="hero-teaser__description">{{ blok.description_left }}</p>
              <div v-if="blok.cta_left && blok.cta_left.length" class="hero-teaser__cta">
                <CtaButton 
                  v-for="cta in blok.cta_left" 
                  :key="cta._uid" 
                  :blok="cta" 
                />
              </div>
            </div>
            
            <!-- Right Slide -->
            <div 
              v-if="hasRightContent(blok)"
              class="hero-teaser__slide"
              :class="{ 'hero-teaser__slide--active': activeSlide === 1 }"
            >
              <p class="hero-teaser__title hero-teaser__title--right">{{ blok.title_right }}</p>
              <p class="hero-teaser__description">{{ blok.description_right }}</p>
              <div v-if="blok.cta_right && blok.cta_right.length" class="hero-teaser__cta">
                <CtaButton 
                  v-for="cta in blok.cta_right" 
                  :key="cta._uid" 
                  :blok="cta" 
                />
              </div>
            </div>
          </div>
          
          <!-- Mobile Toggle Button -->
          <button 
            v-if="hasRightContent(blok)"
            class="hero-teaser__toggle"
            @click="activeSlide = activeSlide === 0 ? 1 : 0"
            :aria-label="activeSlide === 0 ? 'Nächste Ansicht' : 'Vorherige Ansicht'"
          >
            <span class="hero-teaser__toggle-arrow hero-teaser__toggle-arrow--left" :class="{ active: activeSlide === 1 }">←</span>
            <span class="hero-teaser__toggle-arrow hero-teaser__toggle-arrow--right" :class="{ active: activeSlide === 0 }">→</span>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-teaser {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #040B2F;
}

.hero-teaser__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4,11,47,0.85) 0%, rgba(4,11,47,0.4) 40%, transparent 70%);
}

.hero-teaser__content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 80px;
}

.hero-teaser__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Desktop Grid */
.hero-teaser__grid--desktop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.hero-teaser__grid--mobile {
  display: none;
}

.hero-teaser__column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-teaser__column--right {
  text-align: right;
}

.hero-teaser__title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 500;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

.hero-teaser__title--right {
  font-style: italic;
}

.hero-teaser__description {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 480px;
}

.hero-teaser__column--right .hero-teaser__description {
  margin-left: auto;
}

.hero-teaser__cta {
  margin-top: 8px;
}

.hero-teaser__column--right .hero-teaser__cta {
  display: flex;
  justify-content: flex-end;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-teaser__grid--desktop {
    display: none;
  }
  
  .hero-teaser__grid--mobile {
    display: block;
    position: relative;
  }
  
  .hero-teaser__slides {
    position: relative;
    min-height: 280px;
  }
  
  .hero-teaser__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .hero-teaser__slide--active {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
  
  .hero-teaser__title {
    font-size: 32px;
  }
  
  .hero-teaser__description {
    font-size: 14px;
  }
  
  /* Mobile: both columns left-aligned */
  .hero-teaser__column--right,
  .hero-teaser__slide .hero-teaser__title--right {
    text-align: left;
  }
  
  .hero-teaser__column--right .hero-teaser__description {
    margin-left: 0;
  }
  
  .hero-teaser__column--right .hero-teaser__cta {
    justify-content: flex-start;
  }
  
  /* Toggle Button */
  .hero-teaser__toggle {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .hero-teaser__toggle:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .hero-teaser__toggle-arrow {
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
    transition: color 0.2s ease;
  }
  
  .hero-teaser__toggle-arrow.active {
    color: white;
  }
  
  .hero-teaser__content {
    padding-bottom: 100px;
  }
}
</style>
