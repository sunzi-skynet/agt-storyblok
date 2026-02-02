<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
    subheadline?: string
    background_image?: {
      filename: string
      alt?: string
    }
    cta_text?: string
    cta_link?: {
      url?: string
      cached_url?: string
    }
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="relative min-h-[80vh] flex items-center bg-secondary overflow-hidden"
  >
    <!-- Background Image -->
    <div
      v-if="blok.background_image?.filename"
      class="absolute inset-0"
    >
      <img
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt || ''"
        class="w-full h-full object-cover opacity-40"
      />
    </div>

    <!-- Content -->
    <div class="container-agt relative z-10 py-20">
      <div class="max-w-4xl">
        <h1 class="text-4xl md:text-display-5 lg:text-display-4 xl:text-display-3 text-white font-medium leading-tight">
          {{ blok.headline }}
        </h1>
        
        <p
          v-if="blok.subheadline"
          class="mt-6 text-body-lg text-white/80"
        >
          {{ blok.subheadline }}
        </p>

        <NuxtLink
          v-if="blok.cta_text && blok.cta_link"
          :to="blok.cta_link.cached_url || blok.cta_link.url || '#'"
          class="btn-primary mt-8"
        >
          {{ blok.cta_text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
