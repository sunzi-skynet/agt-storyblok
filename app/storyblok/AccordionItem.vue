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
      <div class="accordion-item__content agt-richtext" v-html="renderRichText(blok.content)"></div>
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
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg);
  transition: box-shadow var(--transition-base);
}

.accordion-item:hover {
  box-shadow: var(--shadow-sm);
}

.accordion-item__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  transition: background-color var(--transition-base);
}

.accordion-item__header:hover {
  background-color: var(--color-bg-alt);
}

.accordion-item__header-content {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
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
  transition: transform var(--transition-slow);
  color: var(--color-text-muted);
}

.accordion-item--open .accordion-item__chevron {
  transform: rotate(180deg);
}

.accordion-item__content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-slow);
}

.accordion-item--open .accordion-item__content-wrapper {
  grid-template-rows: 1fr;
}

.accordion-item__content {
  overflow: hidden;
  padding: 0 var(--space-md);
}

.accordion-item--open .accordion-item__content {
  padding: 0 var(--space-md) var(--space-md);
}

/* Rich text link color */
.accordion-item__content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .accordion-item__header {
    padding: var(--space-sm) var(--space-md);
    font-size: 1rem;
  }
  
  .accordion-item__icon {
    width: 28px;
    height: 28px;
  }
}
</style>
