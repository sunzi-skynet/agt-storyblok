<script setup lang="ts">
defineProps<{
  blok: {
    icon?: { filename: string; alt?: string }
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
    <span v-if="blok.icon?.filename" class="icon-link__icon">
      <img :src="blok.icon.filename" :alt="blok.icon.alt || ''" />
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
}

.icon-link__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-link__label {
  letter-spacing: -0.02em;
}
</style>
