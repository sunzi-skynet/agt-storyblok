<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineProps<{
  blok: {
    slides: Array<{
      _uid: string
      component: string
      title: string
      description: string
      button_text: string
      button_link: {
        cached_url: string
        url?: string
      }
      background_image: {
        filename: string
        alt?: string
      }
    }>
  }
}>()

const modules = [Pagination, Autoplay]
</script>

<template>
  <section v-editable="blok" class="services-slider">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      }"
      :pagination="{
        clickable: true,
        bulletClass: 'services-slider__bullet',
        bulletActiveClass: 'services-slider__bullet--active'
      }"
      class="services-slider__swiper"
    >
      <SwiperSlide
        v-for="slide in blok.slides"
        :key="slide._uid"
        class="services-slider__slide"
      >
        <div 
          class="services-slider__background"
          :style="{
            backgroundImage: slide.background_image?.filename 
              ? `url(${slide.background_image.filename})` 
              : 'none'
          }"
        />
        <div class="agt-overlay agt-overlay--gradient-left" />
        <div class="services-slider__content">
          <h2 class="services-slider__title agt-title agt-title--italic">{{ slide.title }}</h2>
          <p class="services-slider__description agt-lead">{{ slide.description }}</p>
          <NuxtLink 
            v-if="slide.button_link?.cached_url || slide.button_link?.url"
            :to="'/' + (slide.button_link.cached_url || slide.button_link.url)"
            class="agt-btn agt-btn--secondary"
          >
            {{ slide.button_text || 'Mehr erfahren' }}
            <svg class="agt-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.services-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 900px;
}

.services-slider__swiper {
  width: 100%;
  height: 100%;
}

.services-slider__slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.services-slider__background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.services-slider__content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: var(--space-xl) var(--space-2xl);
  max-width: 800px;
  color: var(--color-text-inverse);
}

.services-slider__title {
  color: var(--color-text-inverse);
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin-bottom: var(--space-md);
}

.services-slider__description {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: var(--space-lg);
  max-width: 600px;
}

/* Pagination bullets */
:deep(.services-slider__bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-full);
  margin: 0 6px !important;
  cursor: pointer;
  transition: all var(--transition-slow);
}

:deep(.services-slider__bullet--active) {
  background: var(--color-text-inverse);
  width: 48px;
  border-radius: 6px;
}

:deep(.swiper-pagination) {
  bottom: var(--space-lg) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .services-slider {
    min-height: 500px;
    max-height: 700px;
  }
  
  .services-slider__content {
    padding: var(--space-lg) var(--container-padding-mobile);
  }
}
</style>
