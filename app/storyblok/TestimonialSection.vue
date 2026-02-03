<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  blok: {
    title?: string
    subtitle?: string
    testimonials?: Array<{
      quote?: string
      company_name?: string
      company_logo?: { filename: string; alt?: string }
      _uid: string
      component: string
    }>
    _uid: string
    component: string
    _editable?: string
  }
}>()

const activeIndex = ref(0)

const activeTestimonial = computed(() => {
  return props.blok.testimonials?.[activeIndex.value]
})
</script>

<template>
  <section v-editable="blok" class="testimonial-section">
    <div class="testimonial-section__container">
      <!-- Header -->
      <header class="testimonial-section__header">
        <h2 v-if="blok.title" class="testimonial-section__title">
          {{ blok.title }}
        </h2>
        <p v-if="blok.subtitle" class="testimonial-section__subtitle">
          {{ blok.subtitle }}
        </p>
      </header>

      <!-- Testimonial Content -->
      <div class="testimonial-section__content">
        <!-- Company List (Left) -->
        <nav class="testimonial-section__companies">
          <button
            v-for="(testimonial, index) in blok.testimonials"
            :key="testimonial._uid"
            class="testimonial-section__company"
            :class="{ 'testimonial-section__company--active': index === activeIndex }"
            @click="activeIndex = index"
          >
            <span class="testimonial-section__bullet"></span>
            {{ testimonial.company_name }}
          </button>
        </nav>

        <!-- Quote (Center) -->
        <blockquote v-if="activeTestimonial" class="testimonial-section__quote">
          „{{ activeTestimonial.quote }}"
        </blockquote>

        <!-- Logo (Right) -->
        <div class="testimonial-section__logo-wrapper">
          <img
            v-if="activeTestimonial?.company_logo?.filename"
            :src="activeTestimonial.company_logo.filename"
            :alt="activeTestimonial.company_name"
            class="testimonial-section__logo"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-section {
  padding: 80px 0;
  background: #FFFFFF;
}

.testimonial-section__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.testimonial-section__header {
  margin-bottom: 48px;
}

.testimonial-section__title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 500;
  color: #040B2F;
  margin: 0;
  letter-spacing: -0.02em;
}

.testimonial-section__subtitle {
  font-size: 16px;
  color: #666666;
  margin: 16px 0 0;
  max-width: 500px;
  line-height: 1.6;
  text-align: right;
  margin-left: auto;
}

/* Content Grid */
.testimonial-section__content {
  display: grid;
  grid-template-columns: 220px 1fr 180px;
  gap: 48px;
  align-items: start;
  min-height: 300px;
}

/* Company List */
.testimonial-section__companies {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.testimonial-section__company {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  color: #040B2F;
  text-align: left;
  transition: color 0.2s ease;
}

.testimonial-section__company:hover {
  color: #265BF6;
}

.testimonial-section__company--active {
  color: #265BF6;
}

.testimonial-section__bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.testimonial-section__company--active .testimonial-section__bullet {
  background: #265BF6;
}

/* Quote */
.testimonial-section__quote {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 400;
  line-height: 1.6;
  color: #040B2F;
  margin: 0;
  padding: 0;
  letter-spacing: -0.01em;
}

/* Logo */
.testimonial-section__logo-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-height: 80px;
}

.testimonial-section__logo {
  max-width: 160px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 900px) {
  .testimonial-section__content {
    grid-template-columns: 180px 1fr;
    gap: 32px;
  }

  .testimonial-section__logo-wrapper {
    grid-column: 2;
    justify-content: flex-start;
    margin-top: 24px;
  }
}

@media (max-width: 640px) {
  .testimonial-section {
    padding: 48px 0;
  }

  .testimonial-section__content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .testimonial-section__companies {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px 16px;
  }

  .testimonial-section__company {
    font-size: 14px;
    padding: 8px 0;
  }

  .testimonial-section__quote {
    font-size: 18px;
  }

  .testimonial-section__logo-wrapper {
    justify-content: center;
  }
}
</style>
