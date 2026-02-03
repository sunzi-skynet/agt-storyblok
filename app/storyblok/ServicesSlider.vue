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
              ? `url(${slide.background_image.filename}/m/1920x0/filters:quality(80))` 
              : 'none'
          }"
        />
        <div class="services-slider__overlay" />
        <div class="services-slider__content">
          <h2 class="services-slider__title">{{ slide.title }}</h2>
          <p class="services-slider__description">{{ slide.description }}</p>
          <NuxtLink 
            v-if="slide.button_link?.cached_url || slide.button_link?.url"
            :to="'/' + (slide.button_link.cached_url || slide.button_link.url)"
            class="services-slider__button"
          >
            {{ slide.button_text || 'Mehr erfahren' }}
            <svg class="services-slider__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

.services-slider__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

.services-slider__content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 4rem 6rem;
  max-width: 800px;
  color: white;
}

.services-slider__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 500;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-style: italic;
}

.services-slider__description {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  opacity: 0.95;
}

.services-slider__button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: fit-content;
  background: transparent;
}

.services-slider__button:hover {
  background: white;
  color: #1a1a2e;
}

.services-slider__arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.services-slider__button:hover .services-slider__arrow {
  transform: translateX(4px);
}

/* Pagination bullets */
:deep(.services-slider__bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  margin: 0 6px !important;
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.services-slider__bullet--active) {
  background: white;
  width: 48px;
  border-radius: 6px;
}

:deep(.swiper-pagination) {
  bottom: 2rem !important;
}

/* Responsive */
@media (max-width: 768px) {
  .services-slider {
    min-height: 500px;
    max-height: 700px;
  }
  
  .services-slider__content {
    padding: 2rem 1.5rem;
  }
  
  .services-slider__description {
    font-size: 0.95rem;
  }
}
</style>
