<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  blok: {
    logo?: { filename: string; alt?: string }
    nav_items?: Array<{
      label?: string
      link?: string
      is_dropdown?: boolean
      _uid: string
      component: string
    }>
    cta_text?: string
    cta_link?: string
    show_search?: boolean
    show_language?: boolean
    _uid: string
    component: string
    _editable?: string
  }
}>()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    v-editable="blok"
    class="header"
    :class="{ 'header--scrolled': isScrolled, 'header--menu-open': isMobileMenuOpen }"
  >
    <div class="header__container">
      <!-- Logo -->
      <a href="/" class="header__logo">
        <img
          v-if="blok.logo?.filename"
          :src="blok.logo.filename"
          :alt="blok.logo.alt || 'AGT Logistik'"
          class="header__logo-img"
        />
        <span v-else class="header__logo-text">agt</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <StoryblokComponent
          v-for="item in blok.nav_items"
          :key="item._uid"
          :blok="item"
        />
      </nav>

      <!-- Right side: CTA -->
      <div class="header__actions">
        <a
          v-if="blok.cta_text"
          :href="blok.cta_link || '#'"
          class="header__cta agt-btn agt-btn--primary agt-btn--sm"
        >
          {{ blok.cta_text }}
        </a>

        <!-- Mobile hamburger -->
        <button
          class="header__hamburger"
          :class="{ 'header__hamburger--open': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="header__mobile-menu" :class="{ 'header__mobile-menu--open': isMobileMenuOpen }">
      <nav class="header__mobile-nav">
        <a
          v-for="item in blok.nav_items"
          :key="item._uid"
          :href="item.link || '#'"
          class="header__mobile-link"
          @click="isMobileMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
      <a
        v-if="blok.cta_text"
        :href="blok.cta_link || '#'"
        class="header__mobile-cta agt-btn agt-btn--primary"
        @click="isMobileMenuOpen = false"
      >
        {{ blok.cta_text }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background var(--transition-slow), box-shadow var(--transition-slow);
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header--scrolled .header__logo-text,
.header--scrolled .header__nav :deep(.nav-item) {
  color: var(--color-secondary);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-sm) var(--container-padding);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
}

.header__logo-img {
  height: 40px;
  width: auto;
}

.header__logo-text {
  font-size: 32px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  letter-spacing: -0.03em;
  transition: color var(--transition-slow);
}

.header--scrolled .header__logo-text {
  color: var(--color-secondary);
}

/* Desktop nav */
.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.header__nav :deep(.nav-item) {
  color: var(--color-text-inverse);
}

.header--scrolled .header__nav :deep(.nav-item) {
  color: var(--color-secondary);
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.header__cta {
  border-radius: var(--radius-md);
}

/* Hamburger */
.header__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.header__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-inverse);
  transition: transform var(--transition-slow), opacity var(--transition-slow), background var(--transition-slow);
}

.header--scrolled .header__hamburger span {
  background: var(--color-secondary);
}

.header__hamburger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__hamburger--open span:nth-child(2) {
  opacity: 0;
}

.header__hamburger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.header__mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg);
  padding: 100px var(--container-padding) var(--space-xl);
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-slow), visibility var(--transition-slow);
}

.header__mobile-menu--open {
  opacity: 1;
  visibility: visible;
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.header__mobile-link {
  padding: var(--space-sm) 0;
  font-size: 24px;
  font-weight: var(--font-weight-medium);
  color: var(--color-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border-light);
}

.header__mobile-cta {
  margin-top: auto;
  width: 100%;
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .header__nav {
    display: none;
  }

  .header__cta {
    display: none;
  }

  .header__hamburger {
    display: flex;
  }

  .header--menu-open .header__hamburger span {
    background: var(--color-secondary);
  }
}
</style>
