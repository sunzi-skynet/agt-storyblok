<template>
  <section v-editable="blok" class="accordion">
    <div class="accordion__container">
      <h2 v-if="blok.title" class="accordion__title">{{ blok.title }}</h2>
      <div class="accordion__items">
        <AccordionItem
          v-for="item in blok.items"
          :key="item._uid"
          :blok="item"
          :allow-multiple="blok.allow_multiple"
          @toggle="handleToggle"
          :is-open="openItems.includes(item._uid)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AccordionItem from './AccordionItem.vue'

const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const openItems = ref([])

onMounted(() => {
  // Open items that have default_open set
  if (props.blok.items) {
    props.blok.items.forEach(item => {
      if (item.default_open) {
        openItems.value.push(item._uid)
      }
    })
  }
})

const handleToggle = (uid) => {
  const index = openItems.value.indexOf(uid)
  
  if (index > -1) {
    // Close this item
    openItems.value.splice(index, 1)
  } else {
    // Open this item
    if (props.blok.allow_multiple) {
      openItems.value.push(uid)
    } else {
      // Single mode: close all others, open this one
      openItems.value = [uid]
    }
  }
}
</script>

<style scoped>
.accordion {
  padding: 64px 0;
}

.accordion__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}

.accordion__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 32px;
  text-align: center;
}

.accordion__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 768px) {
  .accordion {
    padding: 40px 0;
  }
  
  .accordion__title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
}
</style>
