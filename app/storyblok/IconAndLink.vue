<script setup lang="ts">
defineProps<{
  blok: {
    icon?: { filename: string; alt?: string }
    icon_type?: 'phone' | 'email' | 'callback' | 'custom'
    label?: string
    url?: { url?: string; cached_url?: string }
    _uid: string
    component: string
    _editable?: string
  }
}>()

const getUrl = (link: { url?: string; cached_url?: string } | undefined) => {
  if (!link) return '#'
  return link.url || link.cached_url || '#'
}
</script>

<template>
  <a
    v-editable="blok"
    :href="getUrl(blok.url)"
    class="icon-link"
  >
    <span class="icon-link__icon">
      <!-- Custom icon from Storyblok -->
      <img 
        v-if="blok.icon?.filename" 
        :src="blok.icon.filename" 
        :alt="blok.icon.alt || ''" 
      />
      <!-- Fallback: Phone icon -->
      <svg 
        v-else-if="blok.icon_type === 'phone' || !blok.icon_type"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
      <!-- Email icon -->
      <svg 
        v-else-if="blok.icon_type === 'email'"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
        <path 
          d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"
        />
      </svg>
      <!-- Callback icon (phone with arrow) -->
      <svg 
        v-else-if="blok.icon_type === 'callback'"
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M19 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 011.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L5.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0119 16.92z" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
        <path 
          d="M23 6l-4-4m0 0l-4 4m4-4v10" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="icon-link__label">{{ blok.label }}</span>
  </a>
</template>

<style scoped>
.icon-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #00000E;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s;
}

.icon-link:hover {
  color: #265BF6;
}

.icon-link__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #265BF6;
}

.icon-link__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-link__icon svg {
  width: 24px;
  height: 24px;
}

.icon-link__label {
  letter-spacing: -0.02em;
}
</style>
