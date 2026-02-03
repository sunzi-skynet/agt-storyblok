<script setup lang="ts">
const storyblokApi = useStoryblokApi()

// Load global settings (header, footer, etc.)
const { data: globalData } = await useAsyncData('global', async () => {
  try {
    const { data } = await storyblokApi.get('cdn/stories/global', {
      version: 'draft',
    })
    return data.story
  } catch (e) {
    console.warn('Global story not found')
    return null
  }
})

// Extract header and footer from global body
const headerBlok = computed(() => {
  const body = globalData.value?.content?.body || []
  return body.find((blok: any) => blok.component === 'header_nav')
})

const footerBlok = computed(() => {
  const body = globalData.value?.content?.body || []
  return body.find((blok: any) => blok.component === 'footer_section')
})
</script>

<template>
  <div class="layout">
    <!-- Header -->
    <StoryblokComponent
      v-if="headerBlok"
      :blok="headerBlok"
    />

    <!-- Main Content -->
    <main class="layout__main">
      <slot />
    </main>

    <!-- Footer -->
    <StoryblokComponent
      v-if="footerBlok"
      :blok="footerBlok"
    />
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
}
</style>
