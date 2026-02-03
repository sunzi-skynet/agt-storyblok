<template>
  <div v-editable="blok" class="accordion-item" :class="{ 'accordion-item--open': isOpen }">
    <button 
      class="accordion-item__header" 
      @click="$emit('toggle', blok._uid)"
      :aria-expanded="isOpen"
    >
      <div class="accordion-item__header-content">
        <img 
          v-if="blok.icon?.filename" 
          :src="blok.icon.filename" 
          :alt="blok.icon.alt || ''" 
          class="accordion-item__icon"
        />
        <span class="accordion-item__title">{{ blok.title }}</span>
      </div>
      <svg 
        class="accordion-item__chevron" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="accordion-item__content-wrapper">
      <div class="accordion-item__content" v-html="renderRichText(blok.content)"></div>
    </div>
  </div>
</template>

<script setup>
import { renderRichText } from '@storyblok/vue'

defineProps({
  blok: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  allowMultiple: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.accordion-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s ease;
}

.accordion-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.accordion-item__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a2e;
  transition: background-color 0.2s ease;
}

.accordion-item__header:hover {
  background-color: #f9fafb;
}

.accordion-item__header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.accordion-item__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
}

.accordion-item__title {
  line-height: 1.4;
}

.accordion-item__chevron {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: #6b7280;
}

.accordion-item--open .accordion-item__chevron {
  transform: rotate(180deg);
}

.accordion-item__content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.accordion-item--open .accordion-item__content-wrapper {
  grid-template-rows: 1fr;
}

.accordion-item__content {
  overflow: hidden;
  padding: 0 24px;
}

.accordion-item--open .accordion-item__content {
  padding: 0 24px 24px;
}

.accordion-item__content :deep(p) {
  margin: 0 0 1em;
  line-height: 1.6;
  color: #4b5563;
}

.accordion-item__content :deep(p:last-child) {
  margin-bottom: 0;
}

.accordion-item__content :deep(ul),
.accordion-item__content :deep(ol) {
  margin: 0 0 1em;
  padding-left: 1.5em;
  color: #4b5563;
}

.accordion-item__content :deep(a) {
  color: #003366;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .accordion-item__header {
    padding: 16px 20px;
    font-size: 1rem;
  }
  
  .accordion-item__icon {
    width: 28px;
    height: 28px;
  }
  
  .accordion-item__content {
    padding: 0 20px;
  }
  
  .accordion-item--open .accordion-item__content {
    padding: 0 20px 20px;
  }
}
</style>
