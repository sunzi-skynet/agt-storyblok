<script setup lang="ts">
/**
 * TestimonialCard - Nested data block for testimonials
 * 
 * This component is rendered inline by TestimonialSection.
 * It's kept as a component for Storyblok's visual editor compatibility,
 * but the actual rendering happens in the parent section.
 */
defineProps<{
  blok: {
    quote?: string
    company_name?: string
    company_logo?: { filename: string; alt?: string }
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <!-- 
    This block is rendered by TestimonialSection, not standalone.
    Fallback display for Storyblok editor preview:
  -->
  <div v-editable="blok" class="testimonial-card-preview">
    <strong>{{ blok.company_name }}</strong>
    <p>{{ blok.quote }}</p>
  </div>
</template>

<style scoped>
.testimonial-card-preview {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
}

.testimonial-card-preview strong {
  color: #265BF6;
}

.testimonial-card-preview p {
  margin: 8px 0 0;
  color: #666;
}
</style>
