<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
    headline_secondary?: string
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
    class="relative w-full min-h-screen overflow-hidden"
  >
    <!-- Background Image (full bleed) -->
    <img
      v-if="blok.background_image"
      :src="blok.background_image"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
    />
    
    <!-- Subtle gradient for text readability -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

    <!-- Content positioned at bottom -->
    <div class="absolute inset-0 flex flex-col justify-end">
      <div class="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        
        <!-- Two-column headline grid -->
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-16">
          
          <!-- Left: Primary headline -->
          <div class="lg:flex-1">
            <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-medium leading-[0.95] tracking-tight">
              {{ blok.headline?.replace(/\\n/g, '\n') }}
            </h1>
          </div>

          <!-- Right: Secondary headline -->
          <div v-if="blok.headline_secondary" class="lg:flex-1 lg:text-right">
            <p class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-medium leading-[0.95] tracking-tight italic">
              {{ blok.headline_secondary?.replace(/\\n/g, '\n') }}
            </p>
          </div>
        </div>

        <!-- Subheadline & CTA -->
        <div class="mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <p v-if="blok.subheadline" class="text-lg lg:text-xl text-white/90">
            {{ blok.subheadline }}
          </p>
          
          <a
            v-if="blok.cta_text"
            :href="blok.cta_link || '#'"
            class="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded hover:bg-primary-hover transition-colors"
          >
            {{ blok.cta_text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
