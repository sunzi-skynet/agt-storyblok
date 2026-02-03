<script setup lang="ts">
defineProps<{
  blok: {
    title?: string
    cta_wrapper?: Array<{
      _uid: string
      component: string
      text?: string
      link?: string
      variant?: string
    }>
    navigation_section?: Array<{
      _uid: string
      component: string
      items?: Array<any>
    }>
    copyright?: string
    slogan?: string
    background_image?: {
      filename?: string
      alt?: string
    }
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <footer
    v-editable="blok"
    class="footer"
    :style="blok.background_image?.filename ? { backgroundImage: `url(${blok.background_image.filename})` } : {}"
  >
    <div class="footer__container">
      <!-- Header Section -->
      <div class="footer__header">
        <h3 v-if="blok.title" class="footer__title">
          {{ blok.title }}
        </h3>

        <div v-if="blok.cta_wrapper?.length" class="footer__cta-wrapper">
          <StoryblokComponent
            v-for="button in blok.cta_wrapper"
            :key="button._uid"
            :blok="button"
          />
        </div>
      </div>

      <!-- Navigation Section -->
      <nav v-if="blok.navigation_section?.length" class="footer__nav">
        <StoryblokComponent
          v-for="column in blok.navigation_section"
          :key="column._uid"
          :blok="column"
        />
      </nav>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <span v-if="blok.copyright" class="footer__copyright">
          {{ blok.copyright }}
        </span>
        <span v-if="blok.slogan" class="footer__slogan">
          {{ blok.slogan }}
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #040B2F;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 80px 0 40px;
  position: relative;
  overflow: hidden;
}

/* Decorative circles pattern */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 10% 50%, rgba(38, 91, 246, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 5% 70%, rgba(38, 91, 246, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 15% 30%, rgba(38, 91, 246, 0.08) 0%, transparent 15%),
    radial-gradient(circle at 85% 20%, rgba(38, 91, 246, 0.12) 0%, transparent 22%),
    radial-gradient(circle at 90% 60%, rgba(38, 91, 246, 0.1) 0%, transparent 18%),
    radial-gradient(circle at 95% 80%, rgba(38, 91, 246, 0.08) 0%, transparent 12%);
  pointer-events: none;
  z-index: 0;
}

.footer__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.footer__header {
  margin-bottom: 60px;
}

.footer__title {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -1px;
  margin: 0 0 32px 0;
  max-width: 700px;
}

.footer__cta-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.footer__nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__copyright,
.footer__slogan {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

/* Tablet */
@media (max-width: 1024px) {
  .footer__title {
    font-size: 42px;
  }

  .footer__nav {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .footer {
    padding: 60px 0 32px;
  }

  .footer__title {
    font-size: 32px;
    line-height: 1.2;
  }

  .footer__cta-wrapper {
    flex-direction: column;
  }

  .footer__cta-wrapper :deep(.cta-button) {
    width: 100%;
    text-align: center;
  }

  .footer__nav {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer__bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
