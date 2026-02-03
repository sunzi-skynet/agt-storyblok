<script setup lang="ts">
defineProps<{
  blok: {
    columns: any[]
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="py-16 lg:py-24 bg-surface">
    <div class="container-agt">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StoryblokComponent
          v-for="item in blok.columns"
          :key="item._uid"
          :blok="item"
        />
      </div>
    </div>
  </section>
</template>
