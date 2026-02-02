<script setup lang="ts">
const route = useRoute()

// Get slug from route params, default to 'home'
const slug = route.params.slug 
  ? (route.params.slug as string[]).join('/') 
  : 'home'

// Use the Storyblok API directly
const storyblokApi = useStoryblokApi()

const { data: story } = await useAsyncData(
  `story-${slug}`,
  async () => {
    try {
      const response = await storyblokApi.get(`cdn/stories/${slug}`, {
        version: 'draft',
      })
      return response.data.story
    } catch (e) {
      console.error('Storyblok fetch error:', e)
      return null
    }
  }
)

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
