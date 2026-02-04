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

// Active dropdown state
const activeDropdown = ref<string | null>(null)
const hoveredLink = ref<string | null>(null)

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

// Get active sub-items for hovered link
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

        <!-- Main Navigation -->
        <nav class="header-nav">
          <template v-for="item in navigation?.nav_items" :key="item._uid">
            <!-- Item with dropdown -->
            <div 
              v-if="item.has_dropdown && item.columns?.length"
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

        <!-- Utilities -->
        <div class="header-utils">
          <!-- Search -->
          <button v-if="navigation?.show_search !== false" class="util-btn" aria-label="Suche">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <span>Suche</span>
          </button>

          <!-- Language -->
          <button v-if="navigation?.show_language !== false" class="util-btn" aria-label="Sprache">
            <span>DE</span>
            <svg class="util-chevron" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Phone -->
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
      </div>
    </div>

    <!-- Mega Menu Dropdown -->
    <Transition name="mega-menu">
      <div 
        v-if="activeDropdown" 
        class="mega-menu-overlay"
        @click.self="closeDropdown"
      >
        <template v-for="item in navigation?.nav_items" :key="'menu-' + item._uid">
          <div 
            v-if="item._uid === activeDropdown && item.has_dropdown"
            class="mega-menu"
          >
            <div class="mega-menu-container">
              <!-- Close button -->
              <button class="mega-menu-close" @click="closeDropdown" aria-label="Menü schließen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              <!-- Tagline -->
              <div v-if="item.tagline" class="mega-menu-tagline">
                {{ item.tagline }}
              </div>

              <!-- Columns -->
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

                <!-- Sub-items column (appears on hover) -->
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

              <!-- Teaser Image -->
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
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
}

/* Main Header Bar */
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

/* Logo */
.header-logo {
  flex-shrink: 0;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-placeholder {
  height: 40px;
  width: 120px;
  color: #040B2F;
}

/* Navigation */
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

/* Utilities */
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

/* Mega Menu Overlay */
.mega-menu-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

/* Mega Menu */
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

/* Close Button */
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

/* Tagline */
.mega-menu-tagline {
  font-size: 0.875rem;
  color: #265BF6;
  line-height: 1.5;
  padding-top: 1rem;
}

/* Columns */
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

/* Sub-column */
.mega-menu-sub-column {
  border-left: 1px solid #e5e7eb;
  padding-left: 2rem;
}

/* Teaser Image */
.mega-menu-teaser {
  max-width: 400px;
}

.mega-menu-teaser-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* Transitions */
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

/* Responsive */
@media (max-width: 1024px) {
  .header-container {
    padding: 0 1rem;
  }

  .header-nav {
    display: none; /* TODO: Mobile menu */
  }

  .mega-menu-container {
    grid-template-columns: 1fr;
  }

  .mega-menu-teaser {
    display: none;
  }
}
</style>
