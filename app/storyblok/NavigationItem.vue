<script setup lang="ts">
defineProps<{
  blok: {
    label?: string
    url?: string
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <a
    v-if="blok.label"
    v-editable="blok"
    :href="blok.url || '#'"
    class="navigation-item"
  >
    {{ blok.label }}
  </a>
</template>

<style scoped>
.navigation-item {
  display: block;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.navigation-item:hover {
  color: #265BF6;
}
</style>
