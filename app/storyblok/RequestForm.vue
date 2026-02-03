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

// Labels from Datasource
const labels = ref<Record<string, string>>({})

// Load labels from Storyblok Datasource
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
    console.error('Failed to load form labels:', e)
    // Fallback labels
    labels.value = {
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
    }
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
  // For now, just log and show success
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
            <!-- Trip Type -->
            <div class="form-group form-group--full">
              <label for="tripType">{{ getLabel('label_trip_type') }}</label>
              <select id="tripType" v-model="tripType" required>
                <option value="" disabled>{{ getLabel('option_select') }}</option>
                <option value="single">{{ getLabel('option_trip_single') }}</option>
                <option value="roundtrip">{{ getLabel('option_trip_roundtrip') }}</option>
              </select>
            </div>
            
            <!-- Date & Time Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="date">{{ getLabel('label_date') }}</label>
                <div class="input-with-icon">
                  <input 
                    id="date" 
                    v-model="date" 
                    type="date" 
                    required 
                    :min="new Date().toISOString().split('T')[0]"
                  />
                  <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
              
              <div class="form-group">
                <label for="departureTime">{{ getLabel('label_departure_time') }}</label>
                <div class="input-with-icon">
                  <select id="departureTime" v-model="departureTime" required>
                    <option value="" disabled>{{ getLabel('option_select') }}</option>
                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                  </select>
                  <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Locations Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="departureLocation">{{ getLabel('label_departure_location') }}</label>
                <input 
                  id="departureLocation" 
                  v-model="departureLocation" 
                  type="text" 
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="destination">{{ getLabel('label_destination') }}</label>
                <input 
                  id="destination" 
                  v-model="destination" 
                  type="text" 
                  required 
                />
              </div>
            </div>
            
            <!-- Passengers & Additional Trips Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="passengerCount">{{ getLabel('label_passenger_count') }}</label>
                <input 
                  id="passengerCount" 
                  v-model="passengerCount" 
                  type="number" 
                  min="6" 
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="additionalTrips">{{ getLabel('label_additional_trips') }}</label>
                <select id="additionalTrips" v-model="additionalTrips" required>
                  <option value="" disabled>{{ getLabel('option_select') }}</option>
                  <option value="yes">{{ getLabel('option_yes') }}</option>
                  <option value="no">{{ getLabel('option_no') }}</option>
                </select>
              </div>
            </div>
            
            <!-- Checkbox -->
            <div class="form-group form-group--checkbox">
              <label class="checkbox-label">
                <input type="checkbox" v-model="noSingleTickets" required />
                <span class="checkbox-text">{{ getLabel('label_no_single_tickets') }}</span>
              </label>
            </div>
            
            <!-- Next Button -->
            <button 
              type="button" 
              class="btn btn--primary btn--full"
              :disabled="!validateStep1()"
              @click="goToStep2"
            >
              {{ getLabel('btn_next_step') }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <!-- Step 2 -->
          <div v-show="currentStep === 2" class="request-form__step">
            <!-- Name Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">{{ getLabel('label_first_name') }}</label>
                <input id="firstName" v-model="firstName" type="text" required />
              </div>
              
              <div class="form-group">
                <label for="lastName">{{ getLabel('label_last_name') }}</label>
                <input id="lastName" v-model="lastName" type="text" required />
              </div>
            </div>
            
            <!-- Email & Company Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="email">{{ getLabel('label_email') }}</label>
                <input id="email" v-model="email" type="email" required />
              </div>
              
              <div class="form-group">
                <label for="company">{{ getLabel('label_company') }}</label>
                <input id="company" v-model="company" type="text" />
              </div>
            </div>
            
            <!-- Phone -->
            <div class="form-group form-group--full">
              <label for="phone">{{ getLabel('label_phone') }}</label>
              <input id="phone" v-model="phone" type="tel" required />
            </div>
            
            <!-- Notes -->
            <div class="form-group form-group--full">
              <label for="notes">{{ getLabel('label_notes') }}</label>
              <textarea id="notes" v-model="notes" rows="4"></textarea>
            </div>
            
            <!-- Privacy Checkbox -->
            <div class="form-group form-group--checkbox">
              <label class="checkbox-label">
                <input type="checkbox" v-model="privacyAccepted" required />
                <span class="checkbox-text">
                  {{ getLabel('label_privacy') }}
                </span>
              </label>
              <p class="privacy-info">
                Mehr zur Verarbeitung personenbezogener Daten in: 
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg v-if="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  padding: 64px 24px;
}

.request-form__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 64px;
  align-items: start;
}

/* Left Side */
.request-form__info {
  position: sticky;
  top: 100px;
}

.request-form__title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 500;
  color: #00000E;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}

.request-form__description {
  font-size: 18px;
  color: #666666;
  line-height: 1.5;
  margin: 0 0 32px;
}

.request-form__links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Right Side - Form */
.request-form__form-wrapper {
  background: white;
  border-radius: 12px;
  padding: 40px;
}

.request-form__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.request-form__step {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Form Elements */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group--full {
  grid-column: 1 / -1;
}

.form-group label:not(.checkbox-label) {
  font-size: 14px;
  color: #666666;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #E7E7E7;
  border-radius: 8px;
  background: white;
  color: #00000E;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #265BF6;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #898989;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 44px;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-with-icon input,
.input-with-icon select {
  width: 100%;
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
  pointer-events: none;
}

.input-with-icon select {
  background-image: none;
}

/* Checkbox */
.form-group--checkbox {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: #265BF6;
}

.checkbox-text {
  font-size: 14px;
  color: #00000E;
  line-height: 1.5;
}

.privacy-info {
  font-size: 14px;
  color: #666666;
  margin: 8px 0 0 32px;
}

.privacy-info a {
  color: #265BF6;
  text-decoration: underline;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
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
  background: #1A3CCF;
}

.btn--secondary {
  background: #040B2F;
  color: white;
}

.btn--secondary:hover:not(:disabled) {
  background: #0a1654;
}

.btn--full {
  width: 100%;
}

.btn-row {
  display: flex;
  gap: 16px;
}

.btn-row .btn {
  flex: 1;
}

/* Success */
.request-form__success {
  text-align: center;
  padding: 40px;
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
  color: #FF4500;
  font-size: 14px;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .request-form__container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .request-form__info {
    position: static;
  }
}

@media (max-width: 640px) {
  .request-form {
    padding: 48px 16px;
  }
  
  .request-form__form-wrapper {
    padding: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .btn-row {
    flex-direction: column;
  }
}
</style>
