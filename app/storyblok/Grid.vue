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
  <section v-editable="blok" class="grid-section agt-section agt-section--light">
    <div class="agt-container">
      <div class="agt-grid agt-grid--3">
        <StoryblokComponent
          v-for="item in blok.columns"
          :key="item._uid"
          :blok="item"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Uses global agt-grid classes */
</style>
