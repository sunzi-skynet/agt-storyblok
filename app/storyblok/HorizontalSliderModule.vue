<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

defineProps<{
  blok: {
    _uid: string
    component: string
    title?: string
    description?: string
    agt_theme?: string
    slider_section?: Array<{
      _uid: string
      component: string
      title?: string
      background_image?: { filename: string; alt?: string }
      background_colour?: string
      icon?: { filename: string; alt?: string }
      description?: string
      button?: Array<{ _uid: string; text?: string; link?: string }>
    }>
  }
}>()

const modules = [Navigation, Scrollbar]
const swiperInstance = ref<SwiperType | null>(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  updateNavState()
}

const onSlideChange = () => {
  updateNavState()
}

const updateNavState = () => {
  if (swiperInstance.value) {
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
  }
}

const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}

const slideNext = () => {
  swiperInstance.value?.slideNext()
}
</script>

<template>
  <section 
    v-editable="blok" 
    class="horizontal-slider-module"
    :class="{ 'horizontal-slider-module--dark': blok.agt_theme === 'dark' }"
  >
    <div class="horizontal-slider-module__container">
      <!-- Top Row: Title left, Description right -->
      <div class="horizontal-slider-module__header">
        <div class="horizontal-slider-module__header-left">
          <h2 v-if="blok.title" class="horizontal-slider-module__title">
            {{ blok.title }}
          </h2>
        </div>
        <p v-if="blok.description" class="horizontal-slider-module__description">
          {{ blok.description }}
        </p>
      </div>
      
      <!-- Content Row: Navigation left, Slider right -->
      <div class="horizontal-slider-module__content">
        <!-- Left: Navigation Arrows -->
        <div class="horizontal-slider-module__nav-column">
          <ClientOnly>
          <div class="horizontal-slider-module__navigation">
            <button 
              class="horizontal-slider-module__nav-button horizontal-slider-module__nav-button--prev"
              :class="{ 'horizontal-slider-module__nav-button--disabled': isBeginning }"
              :disabled="isBeginning"
              aria-label="Vorheriges Slide"
              @click="slidePrev"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              class="horizontal-slider-module__nav-button horizontal-slider-module__nav-button--next"
              :class="{ 'horizontal-slider-module__nav-button--disabled': isEnd }"
              :disabled="isEnd"
              aria-label="Nächstes Slide"
              @click="slideNext"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          </ClientOnly>
        </div>
        
        <!-- Right: Slider -->
        <div class="horizontal-slider-module__slider-wrapper">
          <ClientOnly>
          <Swiper
            :modules="modules"
            slides-per-view="auto"
            :space-between="16"
            :grab-cursor="true"
            :scrollbar="{
              draggable: true,
              hide: false
            }"
            class="horizontal-slider-module__swiper"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
            @reach-beginning="isBeginning = true"
            @reach-end="isEnd = true"
            @from-edge="updateNavState"
          >
            <SwiperSlide
              v-for="item in blok.slider_section"
              :key="item._uid"
              class="horizontal-slider-module__slide"
            >
              <StoryblokComponent 
                :blok="item" 
                :theme="blok.agt_theme"
              />
            </SwiperSlide>
          </Swiper>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.horizontal-slider-module {
  padding: 80px 0;
  background: #F5F5F5;
  overflow: hidden;
}

.horizontal-slider-module--dark {
  background: #181A1B;
}

.horizontal-slider-module--dark .horizontal-slider-module__title,
.horizontal-slider-module--dark .horizontal-slider-module__description {
  color: white;
}

.horizontal-slider-module__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
}

.horizontal-slider-module__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  margin-bottom: 40px;
}

.horizontal-slider-module__title {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0;
  color: #00000E;
  flex-shrink: 0;
}

.horizontal-slider-module__description {
  font-size: 16px;
  line-height: 1.6;
  color: #666666;
  margin: 0;
  max-width: 500px;
}

.horizontal-slider-module__content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  align-items: start;
}

.horizontal-slider-module__nav-column {
  padding-top: 180px; /* Align buttons with card middle */
}

.horizontal-slider-module__slider-wrapper {
  position: relative;
  overflow: visible;
}

.horizontal-slider-module__swiper {
  overflow: visible;
}

.horizontal-slider-module__slide {
  height: auto;
  width: 280px !important;
  flex-shrink: 0;
}

/* Swiper Scrollbar */
:deep(.swiper-scrollbar) {
  position: relative !important;
  margin-top: 32px;
  height: 4px !important;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  left: 0 !important;
  width: calc(100% - 40px) !important;
}

:deep(.swiper-scrollbar-drag) {
  background: #00000E;
  border-radius: 2px;
  cursor: grab;
}

.horizontal-slider-module--dark :deep(.swiper-scrollbar) {
  background: rgba(255, 255, 255, 0.2);
}

.horizontal-slider-module--dark :deep(.swiper-scrollbar-drag) {
  background: white;
}

/* Navigation */
.horizontal-slider-module__navigation {
  display: flex;
  gap: 12px;
}

.horizontal-slider-module__nav-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #00000E;
  background: transparent;
  color: #00000E;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.horizontal-slider-module--dark .horizontal-slider-module__nav-button {
  border-color: white;
  color: white;
}

.horizontal-slider-module__nav-button svg {
  width: 20px;
  height: 20px;
}

.horizontal-slider-module__nav-button:hover:not(:disabled) {
  background: #00000E;
  color: white;
}

.horizontal-slider-module--dark .horizontal-slider-module__nav-button:hover:not(:disabled) {
  background: white;
  color: #181A1B;
}

.horizontal-slider-module__nav-button--disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .horizontal-slider-module__container {
    padding: 0 24px;
  }
  
  .horizontal-slider-module__header {
    flex-direction: column;
    gap: 16px;
  }
  
  .horizontal-slider-module__description {
    max-width: 100%;
  }
  
  .horizontal-slider-module__title {
    font-size: 42px;
  }
  
  .horizontal-slider-module__content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .horizontal-slider-module__nav-column {
    padding-top: 0;
    order: 2;
  }
  
  .horizontal-slider-module__slider-wrapper {
    order: 1;
  }
  
  .horizontal-slider-module__slide {
    width: 260px !important;
  }
}

@media (max-width: 768px) {
  .horizontal-slider-module {
    padding: 60px 0;
  }
  
  .horizontal-slider-module__container {
    padding: 0 16px;
  }
  
  .horizontal-slider-module__title {
    font-size: 32px;
  }
  
  .horizontal-slider-module__description {
    font-size: 14px;
  }
  
  .horizontal-slider-module__nav-button {
    width: 44px;
    height: 44px;
  }
  
  .horizontal-slider-module__slide {
    width: 240px !important;
  }
}
</style>
