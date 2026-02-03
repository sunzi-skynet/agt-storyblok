<script setup lang="ts">
defineProps<{
  blok: {
    quote: string
    author_name: string
    author_title?: string
    company?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="py-16 lg:py-24 bg-surface-alt">
    <div class="container-agt">
      <figure class="max-w-4xl mx-auto text-center">
        <!-- Quote Mark -->
        <div class="text-primary text-6xl leading-none mb-4">"</div>
        
        <!-- Quote Text -->
        <blockquote class="text-body-lg md:text-display-6 lg:text-display-5 font-medium text-text leading-snug">
          {{ blok.quote }}
        </blockquote>

        <!-- Author -->
        <figcaption class="mt-8">
          <cite class="not-italic">
            <span class="block text-body font-medium text-text">
              {{ blok.author_name }}
            </span>
            <span v-if="blok.author_title || blok.company" class="block text-body-sm text-text-muted mt-1">
              {{ blok.author_title }}
              <template v-if="blok.author_title && blok.company">, </template>
              {{ blok.company }}
            </span>
          </cite>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
