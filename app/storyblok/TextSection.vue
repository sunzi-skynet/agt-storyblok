<script setup lang="ts">
import { renderRichText } from '@storyblok/vue'

defineProps<{
  blok: {
    headline?: string
    text: string
    centered?: boolean
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="py-16 lg:py-24 bg-surface">
    <div class="container-agt" :class="{ 'text-center': blok.centered }">
      <h2
        v-if="blok.headline"
        class="text-display-6 md:text-display-5 lg:text-display-4 font-medium mb-6"
      >
        {{ blok.headline }}
      </h2>
      
      <div
        class="prose prose-lg max-w-3xl"
        :class="{ 'mx-auto': blok.centered }"
        v-html="renderRichText(blok.text)"
      />
    </div>
  </section>
</template>
