<script setup lang="ts">
defineProps<{
  blok: {
    label?: string
    link?: string
    is_dropdown?: boolean
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <a
    v-editable="blok"
    :href="blok.link || '#'"
    class="nav-item"
    :class="{ 'nav-item--dropdown': blok.is_dropdown }"
  >
    {{ blok.label }}
    <svg v-if="blok.is_dropdown" class="nav-item__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</template>

<style scoped>
.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-xs) var(--space-sm);
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  color: var(--color-secondary);
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: color var(--transition-base);
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--color-primary);
}

.nav-item__chevron {
  transition: transform var(--transition-base);
}

.nav-item--dropdown:hover .nav-item__chevron {
  transform: rotate(180deg);
}
</style>
