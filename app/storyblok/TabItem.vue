<template>
  <div v-editable="blok" class="tab-item">
    <!-- This component is rendered by TabModule, not standalone -->
    <slot />
  </div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Minimal styling - parent handles display */
</style>
