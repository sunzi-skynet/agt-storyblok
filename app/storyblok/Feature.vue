<script setup lang="ts">
defineProps<{
  blok: {
    name: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <div v-editable="blok" class="p-8 bg-surface-alt rounded-xl text-center">
    <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
      <span class="text-2xl">✨</span>
    </div>
    <h3 class="text-body-lg font-medium text-text">
      {{ blok.name }}
    </h3>
  </div>
</template>
