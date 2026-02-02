<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
    subheadline?: string
    background_image?: string
    cta_text?: string
    cta_link?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section
    v-editable="blok"
    class="relative min-h-[60vh] flex items-center bg-secondary overflow-hidden"
  >
    <!-- Background Image -->
    <div
      v-if="blok.background_image"
      class="absolute inset-0"
    >
      <img
        :src="blok.background_image"
        alt=""
        class="w-full h-full object-cover opacity-50"
      />
    </div>

    <!-- Content -->
    <div class="container-agt relative z-10 py-20 text-center">
      <h1 class="text-4xl md:text-display-5 lg:text-display-4 text-white font-medium leading-tight">
        {{ blok.headline }}
      </h1>
      
      <p
        v-if="blok.subheadline"
        class="mt-4 text-body-lg text-white/80 max-w-2xl mx-auto"
      >
        {{ blok.subheadline }}
      </p>

      <a
        v-if="blok.cta_text"
        :href="blok.cta_link || '#'"
        class="btn-primary mt-8 inline-block"
      >
        {{ blok.cta_text }}
      </a>
    </div>
  </section>
</template>
