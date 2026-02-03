<script setup lang="ts">
defineProps<{
  blok: {
    items?: Array<{
      _uid: string
      component: string
      label?: string
      url?: string
    }>
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <div v-editable="blok" class="navigation-column">
    <StoryblokComponent
      v-for="item in blok.items"
      :key="item._uid"
      :blok="item"
    />
  </div>
</template>

<style scoped>
.navigation-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
