<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoryblokApi } from '@storyblok/vue'

const props = defineProps<{
  blok: {
    title?: string
    description?: string
    icon_and_link?: Array<{
      _uid: string
      component: string
      icon?: { filename: string; alt?: string }
      label?: string
      url?: { url?: string; cached_url?: string }
    }>
    _uid: string
    component: string
    _editable?: string
  }
}>()

// Form state
const currentStep = ref(1)
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Form data - Step 1
const tripType = ref('')
const date = ref('')
const departureTime = ref('')
const departureLocation = ref('')
const destination = ref('')
const passengerCount = ref('')
const additionalTrips = ref('')
const noSingleTickets = ref(false)

// Form data - Step 2
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const company = ref('')
const phone = ref('')
const notes = ref('')
const privacyAccepted = ref(false)

// Labels from Datasource - initialized with fallback values for SSR
const labels = ref<Record<string, string>>({
  label_trip_type: 'Fahrttyp auswählen (z. B. Hin- & Rückfahrt)*',
  label_date: 'Datum (TT.MM.JJJJ)*',
  label_departure_time: 'Abfahrtszeit*',
  label_departure_location: 'Abreiseort (Adresse, PLZ, Ort)*',
  label_destination: 'Zielort (Adresse, PLZ, Ort)*',
  label_passenger_count: 'Anzahl der Fahrgäste (min. 6)*',
  label_additional_trips: 'Weitere Fahrten am Zielort',
  label_no_single_tickets: 'Ich habe zur Kenntnis genommen, dass die agt keine Einzeltickets oder Taxifahrten, sondern ausschließlich Gruppenreisen und weitere private Transfers anbietet.*',
  btn_next_step: 'Weiter zu Schritt 2 von 2',
  label_first_name: 'Vorname*',
  label_last_name: 'Nachname*',
  label_email: 'E-Mail-Adresse*',
  label_company: 'Firmenname (optional)',
  label_phone: 'Telefonnummer*',
  label_notes: 'Sonstige Anmerkungen...',
  label_privacy: 'Ich habe die Allgemeinen Geschäftsbedingungen (AGB) zur Kenntnis genommen.*',
  label_privacy_link_text: 'Datenschutzhinweis',
  btn_back: 'Zurück',
  btn_submit: 'Absenden',
  option_trip_single: 'Einzelfahrt',
  option_trip_roundtrip: 'Hin- und Rückfahrt',
  option_yes: 'Ja',
  option_no: 'Nein',
  option_select: 'Bitte auswählen'
})

// Load labels from Storyblok Datasource on client (overrides fallbacks)
onMounted(async () => {
  try {
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/datasource_entries', {
      datasource: 'form-labels'
    })
    
    if (data?.datasource_entries) {
      data.datasource_entries.forEach((entry: { name: string; value: string }) => {
        labels.value[entry.name] = entry.value
      })
    }
  } catch (e) {
    console.error('Failed to load form labels from datasource:', e)
  }
})

const getLabel = (key: string) => labels.value[key] || key

// Generate time options (00:00 - 23:30 in 30min intervals)
const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2).toString().padStart(2, '0')
  const mins = i % 2 === 0 ? '00' : '30'
  return `${hours}:${mins}`
})

// Validation
const validateStep1 = () => {
  return tripType.value && 
         date.value && 
         departureTime.value && 
         departureLocation.value && 
         destination.value && 
         passengerCount.value && 
         parseInt(passengerCount.value) >= 6 &&
         additionalTrips.value && 
         noSingleTickets.value
}

const validateStep2 = () => {
  return firstName.value && 
         lastName.value && 
         email.value && 
         phone.value && 
         privacyAccepted.value
}

// Navigation
const goToStep2 = () => {
  if (validateStep1()) {
    currentStep.value = 2
  }
}

const goToStep1 = () => {
  currentStep.value = 1
}

// Submit
const submitForm = async () => {
  if (!validateStep2()) return
  
  isSubmitting.value = true
  submitError.value = ''
  
  const formData = {
    // Step 1
    tripType: tripType.value,
    date: date.value,
    departureTime: departureTime.value,
    departureLocation: departureLocation.value,
    destination: destination.value,
    passengerCount: passengerCount.value,
    additionalTrips: additionalTrips.value,
    // Step 2
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    company: company.value,
    phone: phone.value,
    notes: notes.value
  }
  
  // TODO: Implement actual submit logic from AGT-5
  console.log('Form submitted:', formData)
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSubmitting.value = false
  submitSuccess.value = true
}
</script>

<template>
  <section v-editable="blok" class="request-form">
    <div class="request-form__container">
      <!-- Left Side: Info -->
      <div class="request-form__info">
        <h3 v-if="blok.title" class="request-form__title">
          {{ blok.title }}
        </h3>
        <p v-if="blok.description" class="request-form__description">
          {{ blok.description }}
        </p>
        
        <!-- Icon Links -->
        <div v-if="blok.icon_and_link?.length" class="request-form__links">
          <StoryblokComponent
            v-for="link in blok.icon_and_link"
            :key="link._uid"
            :blok="link"
          />
        </div>
      </div>
      
      <!-- Right Side: Form -->
      <div class="request-form__form-wrapper">
        <!-- Success Message -->
        <div v-if="submitSuccess" class="request-form__success">
          <h4>Vielen Dank für Ihre Anfrage!</h4>
          <p>Wir werden uns in Kürze bei Ihnen melden.</p>
        </div>
        
        <!-- Form -->
        <form v-else class="request-form__form" @submit.prevent>
          <!-- Step 1 -->
          <div v-show="currentStep === 1" class="request-form__step">
            <!-- Trip Type - Full Width -->
            <div class="form-field form-field--full">
              <select 
                id="tripType" 
                v-model="tripType" 
                required
                :class="{ 'has-value': tripType }"
              >
                <option value="" disabled>{{ getLabel('label_trip_type') }}</option>
                <option value="single">{{ getLabel('option_trip_single') }}</option>
                <option value="roundtrip">{{ getLabel('option_trip_roundtrip') }}</option>
              </select>
              <svg class="field-icon field-icon--chevron" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            
            <!-- Date & Time Row -->
            <div class="form-row">
              <div class="form-field">
                <input 
                  id="date" 
                  v-model="date" 
                  type="text"
                  :placeholder="getLabel('label_date')"
                  onfocus="(this.type='date')"
                  onblur="if(!this.value)this.type='text'"
                  required 
                  :min="new Date().toISOString().split('T')[0]"
                  :class="{ 'has-value': date }"
                />
                <svg class="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              
              <div class="form-field">
                <select 
                  id="departureTime" 
                  v-model="departureTime" 
                  required
                  :class="{ 'has-value': departureTime }"
                >
                  <option value="" disabled>{{ getLabel('label_departure_time') }}</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <svg class="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            
            <!-- Locations Row -->
            <div class="form-row">
              <div class="form-field">
                <input 
                  id="departureLocation" 
                  v-model="departureLocation" 
                  type="text" 
                  :placeholder="getLabel('label_departure_location')"
                  required 
                  :class="{ 'has-value': departureLocation }"
                />
              </div>
              
              <div class="form-field">
                <input 
                  id="destination" 
                  v-model="destination" 
                  type="text" 
                  :placeholder="getLabel('label_destination')"
                  required 
                  :class="{ 'has-value': destination }"
                />
              </div>
            </div>
            
            <!-- Passengers & Additional Trips Row -->
            <div class="form-row">
              <div class="form-field">
                <input 
                  id="passengerCount" 
                  v-model="passengerCount" 
                  type="number" 
                  :placeholder="getLabel('label_passenger_count')"
                  min="6" 
                  required 
                  :class="{ 'has-value': passengerCount }"
                />
              </div>
              
              <div class="form-field">
                <select 
                  id="additionalTrips" 
                  v-model="additionalTrips" 
                  required
                  :class="{ 'has-value': additionalTrips }"
                >
                  <option value="" disabled>{{ getLabel('label_additional_trips') }}</option>
                  <option value="yes">{{ getLabel('option_yes') }}</option>
                  <option value="no">{{ getLabel('option_no') }}</option>
                </select>
                <svg class="field-icon field-icon--chevron" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            
            <!-- Checkbox -->
            <label class="checkbox-field">
              <input type="checkbox" v-model="noSingleTickets" required />
              <span class="checkbox-text">{{ getLabel('label_no_single_tickets') }}</span>
            </label>
            
            <!-- Next Button -->
            <button 
              type="button" 
              class="btn btn--primary btn--full"
              :disabled="!validateStep1()"
              @click="goToStep2"
            >
              {{ getLabel('btn_next_step') }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <!-- Step 2 -->
          <div v-show="currentStep === 2" class="request-form__step">
            <!-- Name Row -->
            <div class="form-row">
              <div class="form-field">
                <input 
                  id="firstName" 
                  v-model="firstName" 
                  type="text" 
                  :placeholder="getLabel('label_first_name')"
                  required 
                  :class="{ 'has-value': firstName }"
                />
              </div>
              
              <div class="form-field">
                <input 
                  id="lastName" 
                  v-model="lastName" 
                  type="text" 
                  :placeholder="getLabel('label_last_name')"
                  required 
                  :class="{ 'has-value': lastName }"
                />
              </div>
            </div>
            
            <!-- Email & Company Row -->
            <div class="form-row">
              <div class="form-field">
                <input 
                  id="email" 
                  v-model="email" 
                  type="email" 
                  :placeholder="getLabel('label_email')"
                  required 
                  :class="{ 'has-value': email }"
                />
              </div>
              
              <div class="form-field">
                <input 
                  id="company" 
                  v-model="company" 
                  type="text" 
                  :placeholder="getLabel('label_company')"
                  :class="{ 'has-value': company }"
                />
              </div>
            </div>
            
            <!-- Phone - Full Width -->
            <div class="form-field form-field--full">
              <input 
                id="phone" 
                v-model="phone" 
                type="tel" 
                :placeholder="getLabel('label_phone')"
                required 
                :class="{ 'has-value': phone }"
              />
            </div>
            
            <!-- Notes - Full Width -->
            <div class="form-field form-field--full">
              <textarea 
                id="notes" 
                v-model="notes" 
                :placeholder="getLabel('label_notes')"
                rows="4"
                :class="{ 'has-value': notes }"
              ></textarea>
            </div>
            
            <!-- Privacy Checkbox -->
            <div class="checkbox-group">
              <label class="checkbox-field">
                <input type="checkbox" v-model="privacyAccepted" required />
                <span class="checkbox-text">{{ getLabel('label_privacy') }}</span>
              </label>
              <p class="privacy-link">
                Mehr zur Verarbeitung personenbezogener Daten: 
                <a href="/datenschutz">{{ getLabel('label_privacy_link_text') }}</a>
              </p>
            </div>
            
            <!-- Buttons Row -->
            <div class="btn-row">
              <button 
                type="button" 
                class="btn btn--secondary"
                @click="goToStep1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ getLabel('btn_back') }}
              </button>
              
              <button 
                type="submit" 
                class="btn btn--primary"
                :disabled="!validateStep2() || isSubmitting"
                @click="submitForm"
              >
                {{ isSubmitting ? 'Wird gesendet...' : getLabel('btn_submit') }}
                <svg v-if="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <!-- Error Message -->
            <p v-if="submitError" class="error-message">{{ submitError }}</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.request-form {
  background: #F5F5F5;
  padding: 80px 24px;
}

.request-form__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 80px;
  align-items: start;
}

/* Left Side */
.request-form__info {
  /* static positioning - no scroll following */
}

.request-form__title {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 700;
  color: #00000E;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.request-form__description {
  font-size: 16px;
  color: #666666;
  line-height: 1.6;
  margin: 0 0 40px;
}

.request-form__links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Right Side - Form */
.request-form__form-wrapper {
  background: transparent;
}

.request-form__form {
  display: flex;
  flex-direction: column;
}

.request-form__step {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Form Fields */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field {
  position: relative;
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 16px 48px 16px 16px;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background: white;
  color: #00000E;
  outline: none;
  transition: border-color 0.2s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: #265BF6;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: #666666;
}

.form-field select {
  appearance: none;
  cursor: pointer;
  color: #666666;
}

.form-field select.has-value {
  color: #00000E;
}

.form-field select option {
  color: #00000E;
}

.form-field select option:first-child {
  color: #666666;
}

/* Field Icons */
.field-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #265BF6;
  pointer-events: none;
}

.field-icon--chevron {
  color: #265BF6;
}

/* Checkbox */
.checkbox-field {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 24px 0;
  cursor: pointer;
}

.checkbox-field input[type="checkbox"] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: #265BF6;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #00000E;
  line-height: 1.5;
}

.checkbox-group {
  padding: 16px 0;
}

.privacy-link {
  font-size: 13px;
  color: #666666;
  margin: 8px 0 0 30px;
}

.privacy-link a {
  color: #265BF6;
  text-decoration: none;
}

.privacy-link a:hover {
  text-decoration: underline;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: #265BF6;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #1a4cd4;
}

.btn--secondary {
  background: #265BF6;
  color: white;
}

.btn--secondary:hover:not(:disabled) {
  background: #1a4cd4;
}

.btn--full {
  width: 100%;
  margin-top: 24px;
}

.btn-row {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.btn-row .btn {
  flex: 1;
}

/* Success */
.request-form__success {
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: 12px;
}

.request-form__success h4 {
  font-size: 24px;
  color: #00000E;
  margin: 0 0 12px;
}

.request-form__success p {
  color: #666666;
  margin: 0;
}

/* Error */
.error-message {
  color: #E53935;
  font-size: 14px;
  margin: 16px 0 0;
  text-align: center;
}

/* Hide number input spinners */
.form-field input[type="number"]::-webkit-outer-spin-button,
.form-field input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-field input[type="number"] {
  -moz-appearance: textfield;
}

/* Responsive */
@media (max-width: 1024px) {
  .request-form__container {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  
  .request-form__info {
    position: static;
  }
}

@media (max-width: 640px) {
  .request-form {
    padding: 48px 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .btn-row {
    flex-direction: column;
  }
}
</style>
