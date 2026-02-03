<script setup lang="ts">
defineProps<{
  blok: {
    title?: string
    fields?: Array<{
      label?: string
      placeholder?: string
      field_type?: string
      required?: boolean
      _uid: string
      component: string
    }>
    cta_text?: string
    cta_link?: string
    step_indicator?: boolean
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="booking-form">
    <div class="booking-form__container">
      <!-- Step indicator -->
      <div v-if="blok.step_indicator" class="booking-form__steps">
        <div class="booking-form__step booking-form__step--active">
          <span class="booking-form__step-number">1</span>
          <span class="booking-form__step-label">Anfrage</span>
        </div>
        <div class="booking-form__step-divider"></div>
        <div class="booking-form__step">
          <span class="booking-form__step-number">2</span>
          <span class="booking-form__step-label">Details</span>
        </div>
        <div class="booking-form__step-divider"></div>
        <div class="booking-form__step">
          <span class="booking-form__step-number">3</span>
          <span class="booking-form__step-label">Fertig</span>
        </div>
      </div>

      <!-- Title -->
      <h2 v-if="blok.title" class="booking-form__title">
        {{ blok.title }}
      </h2>

      <!-- Form -->
      <form class="booking-form__form" @submit.prevent>
        <div class="booking-form__fields">
          <StoryblokComponent
            v-for="field in blok.fields"
            :key="field._uid"
            :blok="field"
          />
        </div>

        <a
          v-if="blok.cta_text"
          :href="blok.cta_link || '#'"
          class="booking-form__submit"
        >
          {{ blok.cta_text }}
          <svg class="booking-form__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </form>
    </div>
  </section>
</template>

<style scoped>
.booking-form {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(4, 11, 47, 0.12);
  margin: -60px auto 0;
  position: relative;
  z-index: 20;
  max-width: 1100px;
  width: calc(100% - 48px);
}

.booking-form__container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Step indicator */
.booking-form__steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.booking-form__step {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #898989;
}

.booking-form__step--active {
  color: #265BF6;
}

.booking-form__step--active .booking-form__step-number {
  background: #265BF6;
  color: white;
}

.booking-form__step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #E7E7E7;
  color: #898989;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
}

.booking-form__step-label {
  font-size: 14px;
  font-weight: 500;
}

.booking-form__step-divider {
  width: 40px;
  height: 2px;
  background: #E7E7E7;
}

/* Title */
.booking-form__title {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  color: #040B2F;
  text-align: center;
  margin: 0;
  letter-spacing: -0.02em;
}

/* Form */
.booking-form__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.booking-form__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Submit button */
.booking-form__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: #265BF6;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s, transform 0.2s;
  align-self: flex-end;
}

.booking-form__submit:hover {
  background: #1A3CCF;
  transform: translateY(-1px);
}

.booking-form__arrow {
  transition: transform 0.2s;
}

.booking-form__submit:hover .booking-form__arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .booking-form {
    padding: 24px;
    margin: -40px 16px 0;
    width: auto;
  }

  .booking-form__steps {
    flex-wrap: wrap;
  }

  .booking-form__step-divider {
    width: 20px;
  }

  .booking-form__fields {
    flex-direction: column;
  }

  .booking-form__submit {
    width: 100%;
  }
}
</style>
