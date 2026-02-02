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
    class="relative min-h-[85vh] flex items-end bg-secondary overflow-hidden"
  >
    <!-- Background Image -->
    <div
      v-if="blok.background_image"
      class="absolute inset-0"
    >
      <img
        :src="blok.background_image"
        alt=""
        class="w-full h-full object-cover"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
    </div>

    <!-- Content -->
    <div class="container-agt relative z-10 pb-16 pt-32">
      <div class="grid md:grid-cols-2 gap-8 items-end">
        <!-- Left Column -->
        <div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-medium leading-[1.1]">
            {{ blok.headline }}
          </h1>
          
          <p
            v-if="blok.subheadline && !blok.headline_secondary"
            class="mt-6 text-lg text-white/80 max-w-lg"
          >
            {{ blok.subheadline }}
          </p>
        </div>

        <!-- Right Column -->
        <div class="md:text-right">
          <p
            v-if="blok.headline_secondary"
            class="text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.1]"
          >
            {{ blok.headline_secondary }}
          </p>
          
          <p
            v-if="blok.subheadline && blok.headline_secondary"
            class="mt-6 text-lg text-white/80"
          >
            {{ blok.subheadline }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <a
        v-if="blok.cta_text"
        :href="blok.cta_link || '#'"
        class="btn-primary mt-10 inline-block"
      >
        {{ blok.cta_text }}
      </a>
    </div>
  </section>
</template>
