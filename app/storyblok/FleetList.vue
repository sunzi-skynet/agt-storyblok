<template>
  <section v-editable="blok" class="fleet-list">
    <div class="fleet-list__container">
      <div class="fleet-list__header">
        <h2 class="fleet-list__title">{{ blok.title }}</h2>
        <p v-if="blok.intro_text" class="fleet-list__intro">{{ blok.intro_text }}</p>
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
.fleet-list {
  padding: 80px 0;
  background-color: #ffffff;
}

.fleet-list__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.fleet-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  gap: 40px;
}

.fleet-list__title {
  font-size: 48px;
  font-weight: 400;
  color: #1e2a4a;
  margin: 0;
  font-style: italic;
  flex: 1;
}

.fleet-list__intro {
  font-size: 14px;
  line-height: 1.6;
  color: #1e2a4a;
  max-width: 320px;
  margin: 0;
  text-align: right;
}

.fleet-list__items {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .fleet-list {
    padding: 48px 0;
  }

  .fleet-list__header {
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  }

  .fleet-list__title {
    font-size: 32px;
  }

  .fleet-list__intro {
    text-align: left;
    max-width: 100%;
  }
}
</style>
