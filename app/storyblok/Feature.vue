<script setup lang="ts">
defineProps<{
  blok: {
    name: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <div v-editable="blok" class="feature agt-card agt-card--bordered">
    <div class="feature__inner">
      <div class="feature__icon">
        <span>✨</span>
      </div>
      <h3 class="feature__title">
        {{ blok.name }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.feature__inner {
  padding: var(--space-lg);
  text-align: center;
}

.feature__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(38, 91, 246, 0.1);
  border-radius: var(--radius-full);
  font-size: 24px;
}

.feature__title {
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin: 0;
}
</style>
