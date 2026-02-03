<script setup lang="ts">
defineProps<{
  blok: {
    text?: string
    link?: string
    variant?: 'primary' | 'secondary'
    _uid: string
    component: string
  }
}>()
</script>

<template>
  <a
    v-if="blok.text"
    v-editable="blok"
    :href="blok.link || '#'"
    class="cta-button"
    :class="[`cta-button--${blok.variant || 'primary'}`]"
  >
    {{ blok.text }}
  </a>
</template>

<style scoped>
.cta-button {
  display: inline-block;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.cta-button--primary {
  background: #265BF6;
  color: white;
  border: 2px solid #265BF6;
}

.cta-button--primary:hover {
  background: #1e4bc7;
  border-color: #1e4bc7;
}

.cta-button--secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
