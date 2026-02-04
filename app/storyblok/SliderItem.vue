<script setup lang="ts">
defineProps<{
  blok: {
    _uid: string
    component: string
    title?: string
    background_image?: {
      filename: string
      alt?: string
    }
    background_colour?: string
    icon?: {
      filename: string
      alt?: string
    }
    description?: string
    button?: Array<{
      _uid: string
      component: string
      label?: string
      link?: {
        url?: string
        cached_url?: string
        linktype?: string
        target?: string
      }
      style?: 'primary' | 'secondary' | 'white'
      size?: 'sm' | 'md' | 'lg'
      icon_left?: { filename: string; alt?: string }
      icon_right?: { filename: string; alt?: string }
    }>
  }
  theme?: 'light' | 'dark'
}>()
</script>

<template>
  <div 
    v-editable="blok" 
    class="slider-item"
    :class="{ 'slider-item--dark': theme === 'dark' }"
  >
    <!-- Background Image -->
    <div 
      v-if="blok.background_image?.filename"
      class="slider-item__background"
      :style="{ backgroundImage: `url(${blok.background_image.filename})` }"
    />
    <!-- Background Colour Fallback -->
    <div 
      v-else-if="blok.background_colour"
      class="slider-item__background slider-item__background--color"
      :style="{ backgroundColor: blok.background_colour }"
    />
    
    <!-- Overlay -->
    <div class="slider-item__overlay" />
    
    <!-- Content -->
    <div class="slider-item__content">
      <!-- Icon -->
      <img 
        v-if="blok.icon?.filename"
        :src="blok.icon.filename"
        :alt="blok.icon.alt || ''"
        class="slider-item__icon"
      />
      
      <!-- Title -->
      <h3 v-if="blok.title" class="slider-item__title">
        {{ blok.title }}
      </h3>
      
      <!-- Description -->
      <p v-if="blok.description" class="slider-item__description">
        {{ blok.description }}
      </p>
    </div>
    
    <!-- Button -->
    <div v-if="blok.button && blok.button.length > 0" class="slider-item__button-wrapper">
      <StoryblokComponent
        v-for="btn in blok.button"
        :key="btn._uid"
        :blok="btn"
      />
    </div>
  </div>
</template>

<style scoped>
.slider-item {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 420px;
  border-radius: 8px;
  overflow: hidden;
  background: #181A1B;
}

/* Blue accent line removed per design */

.slider-item__background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.slider-item__background--color {
  background-size: initial;
}

.slider-item__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

.slider-item__content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  padding-bottom: 16px;
  color: white;
}

.slider-item__icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  object-fit: contain;
}

.slider-item__title {
  font-size: 28px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.slider-item__description {
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  opacity: 0.9;
}

.slider-item__button-wrapper {
  position: relative;
  z-index: 10;
  padding: 0 24px 24px;
}

/* Make CTA buttons full-width in slider cards */
.slider-item__button-wrapper :deep(.cta-button) {
  width: 100%;
  justify-content: center;
}

/* Dark theme adjustments (default is dark cards) */
.slider-item--dark {
  /* Cards stay dark even in dark section */
}

/* Responsive */
@media (max-width: 768px) {
  .slider-item {
    min-height: 360px;
  }
  
  .slider-item__title {
    font-size: 24px;
  }
  
  .slider-item__content {
    padding: 20px;
    padding-bottom: 12px;
  }
  
  .slider-item__button-wrapper {
    padding: 0 20px 20px;
  }
}
</style>
