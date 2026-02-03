<script setup lang="ts">
// ServicesSlide is rendered inline by ServicesSlider
// This component exists only for Storyblok component resolution
defineProps<{
  blok: {
    _uid: string
    title: string
    description: string
    button_text: string
    button_link: {
      cached_url: string
      url?: string
    }
    background_image: {
      filename: string
      alt?: string
    }
  }
}>()
</script>

<template>
  <!-- Rendered by parent ServicesSlider -->
  <div v-editable="blok" class="services-slide">
    <slot />
  </div>
</template>
