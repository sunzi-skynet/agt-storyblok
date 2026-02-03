<template>
  <section v-editable="blok" class="tab-module">
    <!-- Background image with overlay -->
    <div class="tab-module__background">
      <img 
        v-if="blok.background_image?.filename" 
        :src="blok.background_image.filename" 
        :alt="blok.background_image.alt || ''" 
        class="tab-module__bg-image"
      />
      <div class="tab-module__overlay"></div>
    </div>
    
    <div class="agt-container tab-module__inner">
      <!-- Headline with highlighted word -->
      <h2 v-if="blok.headline" class="tab-module__headline">
        <template v-for="(part, index) in headlineParts" :key="index">
          <span v-if="part.highlight" class="tab-module__headline-highlight">{{ part.text }}</span>
          <template v-else>{{ part.text }}</template>
        </template>
      </h2>
      
      <div class="tab-module__content">
        <!-- Tab Navigation (left) -->
        <nav class="tab-module__nav">
          <button
            v-for="(tab, index) in blok.tabs"
            :key="tab._uid"
            class="tab-module__tab"
            :class="{ 'tab-module__tab--active': activeIndex === index }"
            @click="activeIndex = index"
          >
            <span class="tab-module__tab-title">{{ tab.title }}</span>
            <svg class="tab-module__tab-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </nav>
        
        <!-- Tab Content (right) -->
        <div class="tab-module__panel">
          <p v-if="activeTab" class="tab-module__description agt-lead">
            {{ activeTab.description }}
          </p>
        </div>
      </div>
      
      <!-- CTA Button -->
      <div v-if="blok.cta_text && blok.cta_link" class="tab-module__cta-wrapper">
        <a 
          :href="blok.cta_link.cached_url || blok.cta_link.url || blok.cta_link" 
          class="tab-module__cta"
          :target="blok.cta_link.target || '_self'"
        >
          {{ blok.cta_text }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const activeIndex = ref(0)

// Find default active tab on mount
onMounted(() => {
  if (props.blok.tabs) {
    const defaultIndex = props.blok.tabs.findIndex(tab => tab.default_active)
    if (defaultIndex > -1) {
      activeIndex.value = defaultIndex
    }
  }
})

const activeTab = computed(() => {
  return props.blok.tabs?.[activeIndex.value]
})

// Parse headline to split highlighted word
const headlineParts = computed(() => {
  const headline = props.blok.headline || ''
  const highlightWord = props.blok.headline_highlight || ''
  
  if (!highlightWord || !headline.includes(highlightWord)) {
    return [{ text: headline, highlight: false }]
  }
  
  const parts = []
  const regex = new RegExp(`(${highlightWord})`, 'gi')
  const splits = headline.split(regex)
  
  splits.forEach(part => {
    if (part) {
      parts.push({
        text: part,
        highlight: part.toLowerCase() === highlightWord.toLowerCase()
      })
    }
  })
  
  return parts
})
</script>

<style scoped>
.tab-module {
  position: relative;
  padding: var(--section-padding-y) 0 calc(var(--section-padding-y) + 20px);
  min-height: 600px;
  display: flex;
  align-items: center;
}

.tab-module__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.tab-module__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tab-module__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(26, 26, 46, 0.85) 0%,
    rgba(26, 26, 46, 0.7) 50%,
    rgba(26, 26, 46, 0.5) 100%
  );
}

.tab-module__inner {
  position: relative;
  z-index: 1;
  width: 100%;
}

.tab-module__headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-text-inverse);
  margin-bottom: var(--space-xl);
  line-height: 1.2;
  max-width: 800px;
}

.tab-module__headline-highlight {
  color: #00b4d8;
}

.tab-module__content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

.tab-module__nav {
  display: flex;
  flex-direction: column;
}

.tab-module__tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-base);
}

.tab-module__tab:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.tab-module__tab-title {
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  color: rgba(255, 255, 255, 0.7);
  transition: color var(--transition-base);
}

.tab-module__tab:hover .tab-module__tab-title {
  color: var(--color-text-inverse);
}

.tab-module__tab--active .tab-module__tab-title {
  color: var(--color-text-inverse);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.tab-module__tab-chevron {
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition-base);
}

.tab-module__tab:hover .tab-module__tab-chevron,
.tab-module__tab--active .tab-module__tab-chevron {
  color: var(--color-text-inverse);
}

.tab-module__panel {
  padding-top: var(--space-sm);
}

.tab-module__description {
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
}

.tab-module__cta-wrapper {
  position: absolute;
  bottom: calc(-1 * var(--space-md));
  right: var(--container-padding);
}

.tab-module__cta {
  display: inline-block;
  padding: var(--space-sm) var(--space-xl);
  background: #00b4d8;
  color: var(--color-text-inverse);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-base);
}

.tab-module__cta:hover {
  background: #0096c7;
  color: var(--color-text-inverse);
}

/* Responsive */
@media (max-width: 900px) {
  .tab-module {
    min-height: auto;
  }
  
  .tab-module__headline {
    margin-bottom: var(--space-lg);
  }
  
  .tab-module__content {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  
  .tab-module__nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }
  
  .tab-module__tab {
    padding: 12px var(--space-sm);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-sm);
  }
  
  .tab-module__tab:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .tab-module__tab-chevron {
    display: none;
  }
  
  .tab-module__cta-wrapper {
    position: static;
    margin-top: var(--space-xl);
  }
}

@media (max-width: 480px) {
  .tab-module__tab-title {
    font-size: 0.9rem;
  }
}
</style>
