<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoryblokApi } from '@storyblok/vue'

const props = defineProps<{
  blok: {
    target_url?: string
    button_text?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()

// Form state
const departureLocation = ref('')
const destination = ref('')
const passengerCount = ref('')

// Labels from Datasource - fallback values
const labels = ref<Record<string, string>>({
  teaser_departure: 'Abreiseort eingeben',
  teaser_destination: 'Reiseziel eingeben',
  teaser_passengers: 'Mindestanzahl 6 Personen'
})

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
    console.error('Failed to load form labels from datasource:', e)
  }
})

const getLabel = (key: string) => labels.value[key] || key

// Build URL with query params and navigate
const handleSubmit = () => {
  const baseUrl = props.blok.target_url || '/anfragen/'
  const params = new URLSearchParams()
  
  if (departureLocation.value) {
    params.set('departure', departureLocation.value)
  }
  if (destination.value) {
    params.set('destination', destination.value)
  }
  if (passengerCount.value) {
    params.set('passengers', passengerCount.value)
  }
  
  const queryString = params.toString()
  const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl
  
  window.location.href = fullUrl
}
</script>

<template>
  <form v-editable="blok" class="teaser-form" @submit.prevent="handleSubmit">
    <div class="teaser-form__fields">
      <!-- Departure Location -->
      <div class="teaser-form__field">
        <input
          v-model="departureLocation"
          type="text"
          :placeholder="getLabel('teaser_departure')"
          class="teaser-form__input"
        />
        <svg class="teaser-form__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"/>
        </svg>
      </div>

      <!-- Destination -->
      <div class="teaser-form__field">
        <input
          v-model="destination"
          type="text"
          :placeholder="getLabel('teaser_destination')"
          class="teaser-form__input"
        />
        <svg class="teaser-form__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- Passenger Count -->
      <div class="teaser-form__field">
        <input
          v-model="passengerCount"
          type="number"
          min="6"
          :placeholder="getLabel('teaser_passengers')"
          class="teaser-form__input"
        />
        <svg class="teaser-form__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          <path d="M5.5 21c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="teaser-form__button">
        {{ blok.button_text || 'Anfragen' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.teaser-form {
  width: 100%;
}

.teaser-form__fields {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.teaser-form__field {
  position: relative;
  flex: 1;
}

.teaser-form__input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  font-size: 14px;
  font-family: inherit;
  border: none;
  border-radius: 8px;
  background: white;
  color: #00000E;
  outline: none;
  transition: box-shadow 0.2s;
}

.teaser-form__input:focus {
  box-shadow: 0 0 0 2px #265BF6;
}

.teaser-form__input::placeholder {
  color: #666666;
}

/* Hide number input spinners */
.teaser-form__input[type="number"]::-webkit-outer-spin-button,
.teaser-form__input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.teaser-form__input[type="number"] {
  -moz-appearance: textfield;
}

.teaser-form__icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
  pointer-events: none;
}

.teaser-form__button {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: white;
  background: #265BF6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.teaser-form__button:hover {
  background: #1a4cd4;
}

.teaser-form__button:active {
  background: #1a3eb0;
}

/* Responsive */
@media (max-width: 900px) {
  .teaser-form__fields {
    flex-direction: column;
  }

  .teaser-form__button {
    width: 100%;
  }
}
</style>
