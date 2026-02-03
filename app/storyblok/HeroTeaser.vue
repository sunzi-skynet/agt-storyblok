<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <section
    v-editable="blok"
    :style="{
      backgroundImage: blok.background_image?.filename ? `url(${blok.background_image.filename})` : undefined,
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <!-- Gradient overlay -->
    <div 
      :style="{
        position: 'absolute',
        inset: '0',
        background: 'linear-gradient(to top, rgba(4,11,47,0.85) 0%, rgba(4,11,47,0.4) 40%, transparent 70%)'
      }"
    />

    <!-- Content -->
    <div 
      :style="{
        position: 'relative',
        zIndex: '10',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '80px'
      }"
    >
      <div :style="{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }">
        
        <!-- Headlines Row -->
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }">
          <h1 :style="{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '500', color: 'white', lineHeight: '1.05', letterSpacing: '-0.02em', margin: '0' }">
            {{ blok.title_left }}
          </h1>
          
          <p class="hero-teaser__title-right">
            {{ blok.title_right }}
          </p>
        </div>

        <!-- Text Row -->
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }">
          <div>
            <p :style="{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', margin: '0' }">
              {{ blok.description_left }}
            </p>
            <a
              v-if="blok.cta_left_text"
              :href="blok.cta_left_link || '#'"
              :style="{ display: 'inline-block', marginTop: '24px', padding: '12px 24px', background: '#265BF6', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: '500' }"
            >
              {{ blok.cta_left_text }}
            </a>
          </div>
          
          <div>
            <p :style="{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', margin: '0' }">
              {{ blok.description_right }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-teaser__title-right {
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 500;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-style: italic;
  text-align: right;
  margin: 0;
}
</style>
