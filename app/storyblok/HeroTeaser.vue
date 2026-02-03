<script setup lang="ts">
const props = defineProps<{
  blok: {
    background_image?: { filename: string; alt?: string }
    title_left?: string
    description_left?: string
    cta_left_text?: string
    cta_left_link?: string
    title_right?: string
    description_right?: string
    cta_right_text?: string
    cta_right_link?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()

const bgStyle = computed(() => ({
  backgroundImage: props.blok.background_image?.filename 
    ? `url(${props.blok.background_image.filename})` 
    : undefined
}))
</script>

<template>
  <section
    v-editable="blok"
    :style="bgStyle"
    style="position: relative; width: 100%; min-height: 100vh; background-size: cover; background-position: center;"
  >
    <!-- Gradient overlay -->
    <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,11,47,0.85) 0%, rgba(4,11,47,0.4) 40%, transparent 70%);" />

    <!-- Content -->
    <div style="position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 80px;">
      <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px;">
        
        <!-- Headlines Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px;">
          <h1 style="font-size: clamp(36px, 6vw, 72px); font-weight: 500; color: white; line-height: 1.05; letter-spacing: -0.02em; margin: 0;">
            {{ blok.title_left }}
          </h1>
          
          <p style="font-size: clamp(36px, 6vw, 72px); font-weight: 500; color: white; line-height: 1.05; letter-spacing: -0.02em; font-style: italic; text-align: right; margin: 0;">
            {{ blok.title_right }}
          </p>
        </div>

        <!-- Text + CTA Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
          <!-- Left Column -->
          <div>
            <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.9); margin: 0;">
              {{ blok.description_left }}
            </p>
            <a
              v-if="blok.cta_left_text"
              :href="blok.cta_left_link || '#'"
              style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #265BF6; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;"
            >
              {{ blok.cta_left_text }}
            </a>
          </div>
          
          <!-- Right Column -->
          <div>
            <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.9); margin: 0;">
              {{ blok.description_right }}
            </p>
            <a
              v-if="blok.cta_right_text"
              :href="blok.cta_right_link || '#'"
              style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #265BF6; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;"
            >
              {{ blok.cta_right_text }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
