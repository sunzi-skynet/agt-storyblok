<script setup lang="ts">
defineProps<{
  blok: {
    label?: string
    placeholder?: string
    field_type?: 'text' | 'date' | 'time' | 'number' | 'select'
    required?: boolean
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <div v-editable="blok" class="form-field">
    <label v-if="blok.label" class="form-field__label">
      {{ blok.label }}
      <span v-if="blok.required" class="form-field__required">*</span>
    </label>
    
    <input
      v-if="blok.field_type !== 'select'"
      :type="blok.field_type || 'text'"
      :placeholder="blok.placeholder"
      :required="blok.required"
      class="form-field__input"
    />
    
    <select
      v-else
      :required="blok.required"
      class="form-field__input form-field__select"
    >
      <option value="" disabled selected>{{ blok.placeholder || 'Bitte wählen' }}</option>
    </select>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 150px;
}

.form-field__label {
  font-size: 14px;
  font-weight: 500;
  color: #040B2F;
  letter-spacing: -0.02em;
}

.form-field__required {
  color: #FF4500;
  margin-left: 2px;
}

.form-field__input {
  padding: 14px 16px;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #D2D2D2;
  border-radius: 6px;
  background: white;
  color: #00000E;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-field__input:focus {
  outline: none;
  border-color: #265BF6;
  box-shadow: 0 0 0 3px rgba(38, 91, 246, 0.15);
}

.form-field__input::placeholder {
  color: #898989;
}

.form-field__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23898989' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  cursor: pointer;
}
</style>
