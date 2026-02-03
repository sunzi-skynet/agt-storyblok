<template>
  <a
    v-editable="blok"
    :href="linkUrl"
    class="fleet-item"
    :class="{ 'fleet-item--active': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="fleet-item__left">
      <span class="fleet-item__number">{{ blok.number }}</span>
      <span v-if="blok.description" class="fleet-item__description">{{ blok.description }}</span>
    </div>
    <div class="fleet-item__right">
      <span class="fleet-item__name">{{ blok.name }}</span>
      <span class="fleet-item__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </a>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)

const linkUrl = computed(() => {
  if (!props.blok.link) return '#'
  if (props.blok.link.cached_url) return '/' + props.blok.link.cached_url
  if (props.blok.link.url) return props.blok.link.url
  return '#'
})
</script>

<style scoped>
.fleet-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.fleet-item:last-child {
  border-bottom: 1px solid #e5e7eb;
}

.fleet-item__left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.fleet-item__number {
  font-size: 14px;
  color: #6b7280;
  min-width: 24px;
}

.fleet-item__description {
  font-size: 14px;
  color: #9ca3af;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.fleet-item__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.fleet-item__name {
  font-size: 32px;
  font-weight: 400;
  color: #1e2a4a;
  transition: color 0.3s ease;
}

.fleet-item__arrow {
  display: flex;
  align-items: center;
  color: #1e2a4a;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

/* Hover / Active State */
.fleet-item--active {
  background-color: #1e2a4a;
}

.fleet-item--active .fleet-item__number {
  color: #9ca3af;
}

.fleet-item--active .fleet-item__description {
  opacity: 1;
  transform: translateX(0);
  color: #9ca3af;
}

.fleet-item--active .fleet-item__name {
  color: #60a5fa;
}

.fleet-item--active .fleet-item__arrow {
  opacity: 1;
  transform: translateX(0);
  color: #60a5fa;
}

@media (max-width: 768px) {
  .fleet-item {
    padding: 16px 20px;
  }

  .fleet-item__name {
    font-size: 24px;
  }

  .fleet-item__description {
    display: none;
  }
}
</style>
