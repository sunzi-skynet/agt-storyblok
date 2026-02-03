<script setup lang="ts">
defineProps<{
  blok: {
    quote: string
    author_name: string
    author_title?: string
    company?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <section v-editable="blok" class="testimonial agt-section agt-section--alt">
    <div class="agt-container">
      <figure class="testimonial__figure">
        <!-- Quote Mark -->
        <div class="testimonial__quote-mark">"</div>
        
        <!-- Quote Text -->
        <blockquote class="testimonial__quote">
          {{ blok.quote }}
        </blockquote>

        <!-- Author -->
        <figcaption class="testimonial__author">
          <cite class="testimonial__cite">
            <span class="testimonial__name">
              {{ blok.author_name }}
            </span>
            <span v-if="blok.author_title || blok.company" class="testimonial__role">
              {{ blok.author_title }}
              <template v-if="blok.author_title && blok.company">, </template>
              {{ blok.company }}
            </span>
          </cite>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.testimonial__figure {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.testimonial__quote-mark {
  color: var(--color-primary);
  font-size: 4rem;
  line-height: 1;
  margin-bottom: var(--space-sm);
}

.testimonial__quote {
  font-size: clamp(20px, 3vw, 32px);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  line-height: 1.4;
  margin: 0;
  padding: 0;
}

.testimonial__author {
  margin-top: var(--space-lg);
}

.testimonial__cite {
  font-style: normal;
}

.testimonial__name {
  display: block;
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.testimonial__role {
  display: block;
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}
</style>
