<script setup lang="ts">
interface SubLink {
  _uid: string
  label: string
  link: { cached_url: string }
}

interface NavLink {
  _uid: string
  label: string
  link: { cached_url: string }
  sub_items?: SubLink[]
}

interface NavColumn {
  _uid: string
  items: NavLink[]
}

interface NavItem {
  _uid: string
  label: string
  link?: { cached_url: string }
  has_dropdown: boolean
  tagline?: string
  teaser_image?: { filename: string; alt?: string }
  columns?: NavColumn[]
}

interface Navigation {
  logo?: { filename: string; alt?: string }
  phone_number?: string
  show_search?: boolean
  show_language?: boolean
  nav_items?: NavItem[]
}

// Fetch navigation data from Storyblok
const storyblokApi = useStoryblokApi()
const { data: navData } = await useAsyncData('navigation', async () => {
  try {
    const { data } = await storyblokApi.get('cdn/stories/navigation', {
      version: 'draft',
      resolve_links: 'url'
    })
    return data?.story?.content as Navigation
  } catch (e) {
    console.warn('Navigation not found in Storyblok')
    return null
  }
})

const navigation = computed(() => navData.value)

// Desktop: Active dropdown state
const activeDropdown = ref<string | null>(null)
const hoveredLink = ref<string | null>(null)

// Mobile: Menu state
const mobileMenuOpen = ref(false)
const mobileExpandedItems = ref<Set<string>>(new Set())
const mobileExpandedSubItems = ref<Set<string>>(new Set())
const searchQuery = ref('')

const openDropdown = (uid: string) => {
  activeDropdown.value = uid
}

const closeDropdown = () => {
  activeDropdown.value = null
  hoveredLink.value = null
}

const toggleDropdown = (uid: string) => {
  if (activeDropdown.value === uid) {
    closeDropdown()
  } else {
    openDropdown(uid)
  }
}

// Mobile menu functions
const openMobileMenu = () => {
  mobileMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleMobileItem = (uid: string) => {
  if (mobileExpandedItems.value.has(uid)) {
    mobileExpandedItems.value.delete(uid)
  } else {
    mobileExpandedItems.value.add(uid)
  }
}

const toggleMobileSubItem = (uid: string) => {
  if (mobileExpandedSubItems.value.has(uid)) {
    mobileExpandedSubItems.value.delete(uid)
  } else {
    mobileExpandedSubItems.value.add(uid)
  }
}

const handleMobileNavClick = () => {
  closeMobileMenu()
}

// Get active sub-items for hovered link (desktop)
const getActiveSubItems = (item: NavItem): SubLink[] => {
  if (!hoveredLink.value || !item.columns) return []
  
  for (const column of item.columns) {
    for (const link of column.items) {
      if (link._uid === hoveredLink.value && link.sub_items?.length) {
        return link.sub_items
      }
    }
  }
  return []
}

// Get all links from all columns (for mobile)
const getAllLinksFromItem = (item: NavItem): NavLink[] => {
  if (!item.columns) return []
  return item.columns.flatMap(col => col.items)
}

// Check if item has any sub-items
const hasSubItems = (item: NavItem): boolean => {
  return item.has_dropdown && (item.columns?.length ?? 0) > 0
}
</script>

<template>
  <header class="app-header">
    <!-- Main Header Bar -->
    <div class="header-main">
      <div class="header-container">
        <!-- Logo -->
        <NuxtLink to="/" class="header-logo">
          <img 
            v-if="navigation?.logo?.filename" 
            :src="navigation.logo.filename" 
            :alt="navigation.logo.alt || 'AGT Logo'"
            class="logo-image"
          />
          <svg v-else class="logo-placeholder" viewBox="0 0 120 40" fill="currentColor">
            <text x="0" y="30" font-size="24" font-weight="bold">agt</text>
          </svg>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="header-nav desktop-only">
          <template v-for="item in navigation?.nav_items" :key="item._uid">
            <!-- Item with dropdown -->
            <div 
              v-if="hasSubItems(item)"
              class="nav-item has-dropdown"
              :class="{ 'is-active': activeDropdown === item._uid }"
            >
              <button 
                class="nav-link"
                @click="toggleDropdown(item._uid)"
                :aria-expanded="activeDropdown === item._uid"
              >
                {{ item.label }}
                <svg class="nav-chevron" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Simple link -->
            <NuxtLink 
              v-else
              :to="item.link?.cached_url || '#'"
              class="nav-item nav-link"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Desktop Utilities -->
        <div class="header-utils desktop-only">
          <button v-if="navigation?.show_search !== false" class="util-btn" aria-label="Suche">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <span>Suche</span>
          </button>

          <button v-if="navigation?.show_language !== false" class="util-btn" aria-label="Sprache">
            <span>DE</span>
            <svg class="util-chevron" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <a 
            v-if="navigation?.phone_number" 
            :href="`tel:${navigation.phone_number.replace(/\s/g, '')}`"
            class="util-phone"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>{{ navigation.phone_number }}</span>
          </a>
        </div>

        <!-- Mobile Header Actions -->
        <div class="mobile-header-actions mobile-only">
          <a 
            v-if="navigation?.phone_number" 
            :href="`tel:${navigation.phone_number.replace(/\s/g, '')}`"
            class="mobile-icon-btn"
            aria-label="Anrufen"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
          <a href="mailto:info@agtlogistik.de" class="mobile-icon-btn" aria-label="E-Mail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <button class="mobile-menu-btn" @click="openMobileMenu" aria-label="Menü öffnen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Mega Menu -->
    <Transition name="mega-menu">
      <div 
        v-if="activeDropdown" 
        class="mega-menu-overlay desktop-only"
        @click.self="closeDropdown"
      >
        <template v-for="item in navigation?.nav_items" :key="'menu-' + item._uid">
          <div 
            v-if="item._uid === activeDropdown && hasSubItems(item)"
            class="mega-menu"
          >
            <div class="mega-menu-container">
              <button class="mega-menu-close" @click="closeDropdown" aria-label="Menü schließen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              <div v-if="item.tagline" class="mega-menu-tagline">
                {{ item.tagline }}
              </div>

              <div class="mega-menu-columns">
                <div 
                  v-for="column in item.columns" 
                  :key="column._uid" 
                  class="mega-menu-column"
                >
                  <ul class="mega-menu-list">
                    <li 
                      v-for="link in column.items" 
                      :key="link._uid"
                      class="mega-menu-item"
                      :class="{ 'has-sub': link.sub_items?.length }"
                      @mouseenter="hoveredLink = link._uid"
                    >
                      <NuxtLink 
                        :to="link.link?.cached_url || '#'"
                        class="mega-menu-link"
                        @click="closeDropdown"
                      >
                        {{ link.label }}
                        <svg v-if="link.sub_items?.length" class="mega-menu-arrow" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>

                <Transition name="sub-menu">
                  <div 
                    v-if="getActiveSubItems(item).length"
                    class="mega-menu-column mega-menu-sub-column"
                  >
                    <ul class="mega-menu-list">
                      <li 
                        v-for="subLink in getActiveSubItems(item)" 
                        :key="subLink._uid"
                        class="mega-menu-item"
                      >
                        <NuxtLink 
                          :to="subLink.link?.cached_url || '#'"
                          class="mega-menu-link"
                          @click="closeDropdown"
                        >
                          {{ subLink.label }}
                          <svg class="mega-menu-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>

              <div v-if="item.teaser_image?.filename" class="mega-menu-teaser">
                <img 
                  :src="item.teaser_image.filename" 
                  :alt="item.teaser_image.alt || ''"
                  class="mega-menu-teaser-image"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </Transition>

    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay">
        <div class="mobile-menu">
          <!-- Mobile Menu Header -->
          <div class="mobile-menu-header">
            <NuxtLink to="/" class="mobile-menu-logo" @click="closeMobileMenu">
              <img 
                v-if="navigation?.logo?.filename" 
                :src="navigation.logo.filename" 
                :alt="navigation.logo.alt || 'AGT Logo'"
                class="logo-image"
              />
              <svg v-else class="logo-placeholder" viewBox="0 0 120 40" fill="currentColor">
                <text x="0" y="30" font-size="24" font-weight="bold">agt</text>
              </svg>
            </NuxtLink>
            <div class="mobile-menu-header-actions">
              <a 
                v-if="navigation?.phone_number" 
                :href="`tel:${navigation.phone_number.replace(/\s/g, '')}`"
                class="mobile-icon-btn blue"
                aria-label="Anrufen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href="mailto:info@agtlogistik.de" class="mobile-icon-btn blue" aria-label="E-Mail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <button class="mobile-close-btn" @click="closeMobileMenu" aria-label="Menü schließen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Menu Content -->
          <div class="mobile-menu-content">
            <!-- Language Selector -->
            <div class="mobile-language">
              <button class="mobile-language-btn">
                <span>DE</span>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Search Field -->
            <div class="mobile-search">
              <input 
                v-model="searchQuery"
                type="search" 
                placeholder="Suchbegriff eingeben..."
                class="mobile-search-input"
              />
              <svg class="mobile-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>

            <!-- Navigation -->
            <nav class="mobile-nav">
              <ul class="mobile-nav-list">
                <template v-for="item in navigation?.nav_items" :key="item._uid">
                  <!-- Item with children -->
                  <li v-if="hasSubItems(item)" class="mobile-nav-item">
                    <button 
                      class="mobile-nav-link"
                      :class="{ 'is-expanded': mobileExpandedItems.has(item._uid) }"
                      @click="toggleMobileItem(item._uid)"
                    >
                      <span>{{ item.label }}</span>
                      <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </button>
                    
                    <!-- Expanded sub-navigation -->
                    <Transition name="accordion">
                      <div v-if="mobileExpandedItems.has(item._uid)" class="mobile-subnav">
                        <ul class="mobile-subnav-list">
                          <!-- Overview link -->
                          <li class="mobile-subnav-item">
                            <NuxtLink 
                              :to="item.link?.cached_url || '#'"
                              class="mobile-subnav-link"
                              @click="handleMobileNavClick"
                            >
                              Übersicht
                            </NuxtLink>
                          </li>
                          <!-- All links from columns -->
                          <template v-for="link in getAllLinksFromItem(item)" :key="link._uid">
                            <li class="mobile-subnav-item">
                              <!-- Link with sub-items -->
                              <template v-if="link.sub_items?.length">
                                <button 
                                  class="mobile-subnav-link has-children"
                                  :class="{ 'is-expanded': mobileExpandedSubItems.has(link._uid) }"
                                  @click="toggleMobileSubItem(link._uid)"
                                >
                                  <span>{{ link.label }}</span>
                                  <svg class="mobile-subnav-chevron" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                  </svg>
                                </button>
                                <!-- Third level -->
                                <Transition name="accordion">
                                  <ul v-if="mobileExpandedSubItems.has(link._uid)" class="mobile-subsubnav-list">
                                    <li v-for="subLink in link.sub_items" :key="subLink._uid" class="mobile-subsubnav-item">
                                      <NuxtLink 
                                        :to="subLink.link?.cached_url || '#'"
                                        class="mobile-subsubnav-link"
                                        @click="handleMobileNavClick"
                                      >
                                        {{ subLink.label }}
                                        <svg class="mobile-subnav-chevron" viewBox="0 0 20 20" fill="currentColor">
                                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                      </NuxtLink>
                                    </li>
                                  </ul>
                                </Transition>
                              </template>
                              <!-- Simple link -->
                              <NuxtLink 
                                v-else
                                :to="link.link?.cached_url || '#'"
                                class="mobile-subnav-link"
                                @click="handleMobileNavClick"
                              >
                                <span>{{ link.label }}</span>
                                <svg class="mobile-subnav-chevron" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                              </NuxtLink>
                            </li>
                          </template>
                        </ul>
                      </div>
                    </Transition>
                  </li>

                  <!-- Simple link -->
                  <li v-else class="mobile-nav-item">
                    <NuxtLink 
                      :to="item.link?.cached_url || '#'"
                      class="mobile-nav-link"
                      @click="handleMobileNavClick"
                    >
                      <span>{{ item.label }}</span>
                    </NuxtLink>
                  </li>
                </template>
              </ul>
            </nav>
          </div>

          <!-- Mobile Menu Footer CTA -->
          <div class="mobile-menu-footer">
            <NuxtLink to="/anfragen" class="mobile-cta-btn" @click="closeMobileMenu">
              Jetzt anfragen
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ============================================
   BASE STYLES
   ============================================ */
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
}

/* Responsive visibility */
.desktop-only {
  display: flex !important;
}

.mobile-only {
  display: none !important;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none !important;
  }
  
  .mobile-only {
    display: flex !important;
  }
}

/* ============================================
   HEADER BAR
   ============================================ */
.header-main {
  border-bottom: 1px solid #e5e7eb;
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  height: 80px;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .header-container {
    padding: 0 1rem;
    height: 65px;
    justify-content: space-between;
  }
}

/* Logo */
.header-logo {
  flex-shrink: 0;
}

.logo-image {
  height: 40px;
  width: auto;
}

@media (max-width: 1024px) {
  .logo-image {
    height: 32px;
  }
}

.logo-placeholder {
  height: 40px;
  width: 120px;
  color: #040B2F;
}

/* ============================================
   DESKTOP NAVIGATION
   ============================================ */
.header-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #040B2F;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #265BF6;
}

.nav-item.is-active .nav-link {
  color: #040B2F;
  border-bottom: 2px solid #265BF6;
}

.nav-chevron {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.nav-item.is-active .nav-chevron {
  transform: rotate(180deg);
}

/* Desktop Utilities */
.header-utils {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.util-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #040B2F;
  background: none;
  border: none;
  cursor: pointer;
}

.util-btn svg {
  width: 20px;
  height: 20px;
}

.util-chevron {
  width: 16px;
  height: 16px;
}

.util-phone {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #040B2F;
  text-decoration: none;
}

.util-phone svg {
  width: 18px;
  height: 18px;
}

/* ============================================
   MOBILE HEADER ACTIONS
   ============================================ */
.mobile-header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #265BF6;
  text-decoration: none;
}

.mobile-icon-btn svg {
  width: 24px;
  height: 24px;
}

.mobile-icon-btn.blue {
  color: #265BF6;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: #040B2F;
  cursor: pointer;
}

.mobile-menu-btn svg {
  width: 28px;
  height: 28px;
}

/* ============================================
   DESKTOP MEGA MENU
   ============================================ */
.mega-menu-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: transparent;
}

.mega-menu-overlay::before {
  content: '';
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.mega-menu {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.mega-menu-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 2rem;
  position: relative;
}

.mega-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.mega-menu-close:hover {
  color: #040B2F;
}

.mega-menu-close svg {
  width: 24px;
  height: 24px;
}

.mega-menu-tagline {
  font-size: 0.875rem;
  color: #265BF6;
  line-height: 1.5;
  padding-top: 1rem;
  white-space: pre-line;
}

.mega-menu-columns {
  display: flex;
  gap: 2rem;
}

.mega-menu-column {
  min-width: 180px;
}

.mega-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mega-menu-item {
  margin-bottom: 0.75rem;
}

.mega-menu-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #040B2F;
  text-decoration: none;
  transition: color 0.2s;
}

.mega-menu-link:hover {
  color: #265BF6;
  text-decoration: underline;
}

.mega-menu-arrow {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.mega-menu-link:hover .mega-menu-arrow {
  color: #265BF6;
}

.mega-menu-sub-column {
  border-left: 1px solid #e5e7eb;
  padding-left: 2rem;
}

.mega-menu-teaser {
  max-width: 400px;
}

.mega-menu-teaser-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* ============================================
   MOBILE MENU
   ============================================ */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Mobile Menu Header */
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 65px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.mobile-menu-logo .logo-image {
  height: 32px;
}

.mobile-menu-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: #040B2F;
  cursor: pointer;
}

.mobile-close-btn svg {
  width: 28px;
  height: 28px;
}

/* Mobile Menu Content */
.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem;
}

/* Language Selector */
.mobile-language {
  margin-bottom: 1.5rem;
}

.mobile-language-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #040B2F;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-language-btn svg {
  width: 20px;
  height: 20px;
}

/* Search Field */
.mobile-search {
  position: relative;
  margin-bottom: 2rem;
}

.mobile-search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  font-size: 1rem;
  color: #040B2F;
  background: #fff;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  outline: none;
}

.mobile-search-input::placeholder {
  color: #9ca3af;
}

.mobile-search-input:focus {
  border-bottom-color: #265BF6;
}

.mobile-search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  pointer-events: none;
}

/* Mobile Navigation */
.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-item {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: #040B2F;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.mobile-nav-link:hover {
  color: #265BF6;
}

.mobile-nav-icon {
  width: 24px;
  height: 24px;
  color: #040B2F;
  transition: transform 0.2s;
}

.mobile-nav-link.is-expanded .mobile-nav-icon {
  transform: rotate(45deg);
}

/* Mobile Sub-Navigation */
.mobile-subnav {
  padding-bottom: 0.5rem;
}

.mobile-subnav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 0;
}

.mobile-subnav-item {
  /* No bottom border for sub-items */
}

.mobile-subnav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #6b7280;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.mobile-subnav-link:hover {
  color: #265BF6;
}

.mobile-subnav-link.has-children {
  color: #040B2F;
}

.mobile-subnav-link.is-expanded .mobile-subnav-chevron {
  transform: rotate(90deg);
}

.mobile-subnav-chevron {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  transition: transform 0.2s;
}

/* Third level nav */
.mobile-subsubnav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
}

.mobile-subsubnav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  color: #6b7280;
  text-decoration: none;
}

.mobile-subsubnav-link:hover {
  color: #265BF6;
}

/* Mobile Menu Footer */
.mobile-menu-footer {
  padding: 1rem;
  flex-shrink: 0;
}

.mobile-cta-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background: #265BF6;
  border-radius: 8px;
}

.mobile-cta-btn:hover {
  background: #1d4ed8;
}

/* ============================================
   TRANSITIONS
   ============================================ */
.mega-menu-enter-active,
.mega-menu-leave-active {
  transition: opacity 0.2s ease;
}

.mega-menu-enter-from,
.mega-menu-leave-to {
  opacity: 0;
}

.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.sub-menu-enter-from,
.sub-menu-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
