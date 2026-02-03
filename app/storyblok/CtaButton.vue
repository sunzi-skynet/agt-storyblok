<script setup lang="ts">
defineProps<{
  blok: {
    text?: string
    link?: string
    variant?: 'primary' | 'secondary'
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <a
    v-if="blok.text"
    v-editable="blok"
    :href="blok.link || '#'"
    class="agt-btn"
    :class="[`agt-btn--${blok.variant || 'primary'}`]"
  >
    {{ blok.text }}
  </a>
</template>

<style scoped>
/* Uses global .agt-btn classes from main.css */
</style>
