<script setup lang="ts">
defineProps<{
  blok: {
    label?: string
    link?: {
      url?: string
      cached_url?: string
      linktype?: string
      target?: string
    }
    style?: 'primary' | 'secondary' | 'white'
    size?: 'sm' | 'md' | 'lg'
    icon_left?: { filename: string; alt?: string }
    icon_right?: { filename: string; alt?: string }
    _uid: string
    component: string
  }
}>()

const getHref = (link: any): string => {
  if (!link) return '#'
  if (link.linktype === 'email') return `mailto:${link.url || link.cached_url}`
  return link.url || link.cached_url || '#'
}

const getTarget = (link: any): string | undefined => {
  if (link?.target === '_blank') return '_blank'
  if (link?.linktype === 'url' && link?.url?.startsWith('http')) return '_blank'
  return undefined
}
</script>

<template>
  <a
    v-if="blok.label"
    v-editable="blok"
    :href="getHref(blok.link)"
    :target="getTarget(blok.link)"
    :rel="getTarget(blok.link) === '_blank' ? 'noopener noreferrer' : undefined"
    class="cta-button"
    :class="[
      `cta-button--${blok.style || 'primary'}`,
      `cta-button--${blok.size || 'md'}`
    ]"
  >
    <img
      v-if="blok.icon_left?.filename"
      :src="blok.icon_left.filename"
      :alt="blok.icon_left.alt || ''"
      class="cta-button__icon cta-button__icon--left"
    />
    <span class="cta-button__label">{{ blok.label }}</span>
    <img
      v-if="blok.icon_right?.filename"
      :src="blok.icon_right.filename"
      :alt="blok.icon_right.alt || ''"
      class="cta-button__icon cta-button__icon--right"
    />
  </a>
</template>

<style scoped>
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'TT Hoves Pro', sans-serif;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 150ms ease-in-out, 
              border-color 150ms ease-in-out,
              transform 150ms ease-in-out,
              box-shadow 150ms ease-in-out;
}

/* Focus visible for keyboard navigation */
.cta-button:focus-visible {
  outline: none;
  border-radius: 7px;
}

/* Active state: scale down */
.cta-button:active {
  transform: scale(0.98);
}

/* ===== SIZES ===== */
.cta-button--sm {
  padding: 8px 16px;
  font-size: 14px;
  gap: 8px;
}

.cta-button--md {
  padding: 10px 20px;
  font-size: 16px;
  gap: 12px;
}

.cta-button--lg {
  padding: 14px 28px;
  font-size: 18px;
  gap: 14px;
}

/* ===== STYLE: PRIMARY (Blau) ===== */
.cta-button--primary {
  background-color: #265BF6;
  color: white;
}

.cta-button--primary:hover {
  background-color: #4070F7;
}

.cta-button--primary:active {
  background-color: #1D4AC4;
}

.cta-button--primary:focus-visible {
  box-shadow: 0 0 0 3px #c3ddfd;
}

.cta-button--primary:disabled,
.cta-button--primary.disabled {
  background-color: #EEEEEE;
  color: rgba(0, 0, 0, 0.4);
  cursor: not-allowed;
  transform: none;
}

/* ===== STYLE: SECONDARY (Dunkelblau) ===== */
.cta-button--secondary {
  background-color: #040B2F;
  color: white;
}

.cta-button--secondary:hover {
  background-color: #1A2850;
}

.cta-button--secondary:active {
  background-color: #020618;
}

.cta-button--secondary:focus-visible {
  box-shadow: 0 0 0 3px #7B8AA8;
}

.cta-button--secondary:disabled,
.cta-button--secondary.disabled {
  background-color: #EEEEEE;
  color: rgba(0, 0, 0, 0.4);
  cursor: not-allowed;
  transform: none;
}

/* ===== STYLE: WHITE (Hell) ===== */
.cta-button--white {
  background-color: #FFFFFF;
  color: #040B2F;
}

.cta-button--white:hover {
  background-color: #E5E7EB;
}

.cta-button--white:active {
  background-color: #D1D5DB;
}

.cta-button--white:focus-visible {
  box-shadow: 0 0 0 3px #7B8AA8;
}

.cta-button--white:disabled,
.cta-button--white.disabled {
  background-color: #F5F5F5;
  color: rgba(0, 0, 0, 0.4);
  cursor: not-allowed;
  transform: none;
}

/* ===== ICONS ===== */
.cta-button__icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.cta-button--sm .cta-button__icon {
  width: 14px;
  height: 14px;
}

.cta-button--lg .cta-button__icon {
  width: 18px;
  height: 18px;
}

/* Disabled state icon opacity */
.cta-button--primary:disabled .cta-button__icon,
.cta-button--primary.disabled .cta-button__icon,
.cta-button--secondary:disabled .cta-button__icon,
.cta-button--secondary.disabled .cta-button__icon {
  opacity: 0.5;
}

.cta-button--white:disabled .cta-button__icon,
.cta-button--white.disabled .cta-button__icon {
  opacity: 0.4;
}

/* Label */
.cta-button__label {
  white-space: nowrap;
}
</style>
