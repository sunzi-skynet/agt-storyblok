<script setup lang="ts">
defineProps<{
  blok: {
    body: any[]
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <main v-editable="blok">
    <StoryblokComponent
      v-for="item in blok.body"
      :key="item._uid"
      :blok="item"
    />
  </main>
</template>
