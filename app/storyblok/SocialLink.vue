<script setup lang="ts">
defineProps<{
  blok: {
    platform?: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'twitter'
    url?: string
    _uid: string
    component: string
  }
}>()

const icons: Record<string, string> = {
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  instagram: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.7.4 3.9.7c-.9.4-1.6.8-2.4 1.6C.7 3.1.3 3.9 0 4.7c-.3.8-.5 1.8-.6 3.1C-.8 9.1-.8 9.5-.8 12.8s0 3.7.1 5c.1 1.3.3 2.3.6 3.1.3.8.7 1.6 1.5 2.4.8.8 1.5 1.2 2.4 1.5.8.3 1.8.5 3.1.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.3-.3 3.1-.6.8-.3 1.6-.7 2.4-1.5.8-.8 1.2-1.5 1.5-2.4.3-.8.5-1.8.6-3.1.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.3-.6-3.1-.3-.8-.7-1.6-1.5-2.4-.8-.8-1.5-1.2-2.4-1.5-.8-.3-1.8-.5-3.1-.6C15.7 0 15.3 0 12 0zM12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  youtube: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
}
</script>

<template>
  <a
    v-editable="blok"
    :href="blok.url || '#'"
    class="social-link"
    :aria-label="blok.platform"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path :d="icons[blok.platform || 'facebook']" />
    </svg>
  </a>
</template>

<style scoped>
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: color 0.2s, background 0.2s;
}

.social-link:hover {
  color: white;
  background: #265BF6;
}
</style>
