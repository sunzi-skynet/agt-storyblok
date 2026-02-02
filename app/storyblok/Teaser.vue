<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="py-16 lg:py-24 bg-secondary text-white">
    <div class="container-agt text-center">
      <h1 class="text-4xl md:text-display-5 lg:text-display-4 font-medium">
        {{ blok.headline }}
      </h1>
    </div>
  </section>
</template>
