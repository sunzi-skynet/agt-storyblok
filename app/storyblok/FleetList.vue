<template>
  <section v-editable="blok" class="fleet-list agt-section agt-section--light">
    <div class="agt-container">
      <div class="fleet-list__header">
        <h2 class="fleet-list__title agt-title agt-title--italic">{{ blok.title }}</h2>
        <p v-if="blok.intro_text" class="fleet-list__intro agt-subtitle">{{ blok.intro_text }}</p>
      </div>
      <div class="fleet-list__items">
        <FleetItem
          v-for="item in blok.items"
          :key="item._uid"
          :blok="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FleetItem from './FleetItem.vue'

defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.fleet-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-xl);
  gap: var(--space-xl);
}

.fleet-list__title {
  flex: 1;
}

.fleet-list__intro {
  max-width: 320px;
  text-align: right;
}

.fleet-list__items {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .fleet-list__header {
    flex-direction: column;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .fleet-list__intro {
    text-align: left;
    max-width: 100%;
  }
}
</style>
