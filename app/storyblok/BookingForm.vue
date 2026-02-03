<template>
  <section v-editable="blok" id="anfragen" class="booking-form">
    <div class="booking-form__container">
      <h2 class="booking-form__title">{{ blok.title }}</h2>
      
      <div class="booking-form__content">
        <!-- Contact Sidebar -->
        <div class="booking-form__sidebar">
          <h3 class="booking-form__sidebar-title">Kontakt</h3>
          <p class="booking-form__sidebar-text">{{ blok.contact_text }}</p>
          <a :href="'tel:' + blok.phone?.replace(/\s/g, '')" class="booking-form__phone">{{ blok.phone }}</a>
          <a :href="'mailto:' + blok.email" class="booking-form__email">{{ blok.email }}</a>
        </div>

        <!-- Form -->
        <form class="booking-form__form" @submit.prevent="nextStep">
          <div class="booking-form__grid">
            <!-- Fahrttyp -->
            <div class="booking-form__field">
              <label class="booking-form__label">Fahrttyp <span class="required">*</span></label>
              <div class="booking-form__select-wrapper">
                <select v-model="form.fahrttyp" class="booking-form__select" required>
                  <option value="" disabled selected>Fahrttyp wählen</option>
                  <option v-for="option in fahrttypen" :key="option" :value="option">{{ option }}</option>
                </select>
                <svg class="booking-form__select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <!-- Datum -->
            <div class="booking-form__field">
              <label class="booking-form__label">Datum <span class="required">*</span></label>
              <div class="booking-form__input-wrapper">
                <input 
                  v-model="form.datum" 
                  type="date" 
                  class="booking-form__input booking-form__input--date" 
                  required
                >
                <svg class="booking-form__icon booking-form__icon--calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
            </div>

            <!-- Abreiseort -->
            <div class="booking-form__field">
              <label class="booking-form__label">Ihr Abreiseort <span class="required">*</span></label>
              <input v-model="form.abreiseort" type="text" class="booking-form__input" required>
            </div>

            <!-- Abfahrtszeit -->
            <div class="booking-form__field">
              <label class="booking-form__label">Abfahrtszeit <span class="required">*</span></label>
              <div class="booking-form__select-wrapper">
                <select v-model="form.abfahrtszeit" class="booking-form__select" required>
                  <option value="" disabled selected>Uhrzeit wählen</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <svg class="booking-form__select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <!-- Reiseziel -->
            <div class="booking-form__field">
              <label class="booking-form__label">Ihr Reiseziel <span class="required">*</span></label>
              <input v-model="form.reiseziel" type="text" class="booking-form__input" required>
            </div>

            <!-- Anzahl Fahrgäste -->
            <div class="booking-form__field">
              <label class="booking-form__label">Anzahl der Fahrgäste <span class="required">*</span></label>
              <div class="booking-form__input-wrapper">
                <input v-model="form.fahrgaeste" type="number" min="1" class="booking-form__input booking-form__input--number" required>
                <svg class="booking-form__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
            </div>

            <!-- Weitere Fahrten -->
            <div class="booking-form__field">
              <label class="booking-form__label">Weitere Fahrten am Zielort <span class="required">*</span></label>
              <div class="booking-form__select-wrapper">
                <select v-model="form.weitereFahrten" class="booking-form__select" required>
                  <option value="" disabled selected>Bitte auswählen</option>
                  <option value="ja">Ja</option>
                  <option value="nein">Nein</option>
                </select>
                <svg class="booking-form__select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <!-- Checkbox -->
            <div class="booking-form__field booking-form__field--checkbox">
              <label class="booking-form__checkbox-label">
                <input v-model="form.hinweis" type="checkbox" class="booking-form__checkbox" required>
                <span>{{ blok.disclaimer_text }} <span class="required">*</span></span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="booking-form__submit">
            {{ blok.button_text || 'Weiter 1/2' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const form = ref({
  fahrttyp: '',
  datum: '',
  abreiseort: '',
  abfahrtszeit: '',
  reiseziel: '',
  fahrgaeste: '',
  weitereFahrten: '',
  hinweis: false
})

const fahrttypen = [
  'Flughafentransfer',
  'Städtereise',
  'Betriebsausflug',
  'Schulfahrt',
  'Vereinsfahrt',
  'Messefahrt',
  'Hochzeit',
  'Sonstiges'
]

const timeOptions = computed(() => {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
    }
  }
  return times
})

const nextStep = () => {
  // TODO: Handle form submission / step 2
  console.log('Form data:', form.value)
}
</script>

<style scoped>
.booking-form {
  padding: 80px 0;
  background: #fff;
}

.booking-form__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.booking-form__title {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 48px;
}

.booking-form__content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 60px;
}

.booking-form__sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.booking-form__sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.booking-form__sidebar-text {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.booking-form__phone,
.booking-form__email {
  font-size: 14px;
  color: #1a1a2e;
  text-decoration: none;
}

.booking-form__phone:hover,
.booking-form__email:hover {
  color: #2563eb;
}

.booking-form__form {
  display: flex;
  flex-direction: column;
}

.booking-form__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 40px;
}

.booking-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.booking-form__field--checkbox {
  grid-column: 2;
  justify-content: flex-end;
}

.booking-form__label {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

.required {
  color: #ef4444;
}

.booking-form__input,
.booking-form__select {
  padding: 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 0;
  font-size: 16px;
  color: #1a1a2e;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
}

.booking-form__input::placeholder {
  color: #6b7280;
}

.booking-form__select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  padding-right: 48px;
}

.booking-form__input:focus,
.booking-form__select:focus {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}

/* Select wrapper for custom dropdown icon */
.booking-form__select-wrapper {
  position: relative;
}

.booking-form__select-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
  pointer-events: none;
}

/* Input wrapper for icons */
.booking-form__input-wrapper {
  position: relative;
}

.booking-form__input-wrapper .booking-form__input {
  padding-right: 48px;
}

.booking-form__icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #9ca3af;
  pointer-events: none;
}

/* Date input - hide native picker icon */
.booking-form__input--date {
  position: relative;
}

.booking-form__input--date::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.booking-form__input--date::-webkit-datetime-edit {
  color: transparent;
}

.booking-form__input--date:valid::-webkit-datetime-edit {
  color: #1a1a2e;
}

/* Number input - hide spinners */
.booking-form__input--number {
  -moz-appearance: textfield;
}

.booking-form__input--number::-webkit-outer-spin-button,
.booking-form__input--number::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Checkbox */
.booking-form__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #1a1a2e;
  cursor: pointer;
  line-height: 1.5;
}

.booking-form__checkbox {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  flex-shrink: 0;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background: #fff;
}

.booking-form__checkbox:checked {
  background: #2563eb;
  border-color: #2563eb;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

/* Submit Button */
.booking-form__submit {
  margin-top: 32px;
  padding: 20px;
  background: #2563eb;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.booking-form__submit:hover {
  background: #1d4ed8;
}

/* Responsive */
@media (max-width: 900px) {
  .booking-form__content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .booking-form__grid {
    grid-template-columns: 1fr;
  }

  .booking-form__field--checkbox {
    grid-column: 1;
  }

  .booking-form__title {
    font-size: 32px;
  }
}
</style>
