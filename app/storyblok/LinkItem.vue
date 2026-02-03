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
    v-editable="blok"
    :href="blok.url || '#'"
    class="link-item"
  >
    {{ blok.label }}
  </a>
</template>

<style scoped>
.link-item {
  display: block;
  padding: 6px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.link-item:hover {
  color: white;
}
</style>
