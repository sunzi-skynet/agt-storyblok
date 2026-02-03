<script setup lang="ts">
const route = useRoute()

// Get slug from route params, default to 'home'
const slug = route.params.slug 
  ? (route.params.slug as string[]).join('/') 
  : 'home'

// useAsyncStoryblok enables the Storyblok Bridge automatically
// This allows: live preview updates + visual editing
const story = await useAsyncStoryblok(slug, { version: 'draft' })

// 404 if no story found
if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

// SEO
useHead({
  title: story.value?.name || 'AGT Logistik',
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
