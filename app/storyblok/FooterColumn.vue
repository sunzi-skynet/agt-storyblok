<script setup lang="ts">
defineProps<{
  blok: {
    title?: string
    links?: Array<{
      label?: string
      url?: string
      _uid: string
      component: string
    }>
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <div v-editable="blok" class="footer-column">
    <h4 v-if="blok.title" class="footer-column__title">
      {{ blok.title }}
    </h4>
    <nav class="footer-column__links">
      <StoryblokComponent
        v-for="link in blok.links"
        :key="link._uid"
        :blok="link"
      />
    </nav>
  </div>
</template>

<style scoped>
.footer-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-column__title {
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.footer-column__links {
  display: flex;
  flex-direction: column;
}
</style>
