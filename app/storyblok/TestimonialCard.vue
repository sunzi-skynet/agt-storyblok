<script setup lang="ts">
defineProps<{
  blok: {
    quote?: string
    author_name?: string
    author_role?: string
    author_company?: string
    company_logo?: { filename: string; alt?: string }
    author_image?: { filename: string; alt?: string }
    _uid: string
    component: string
    _editable?: string
  }
}>()
</script>

<template>
  <article v-editable="blok" class="testimonial-card">
    <!-- Quote icon -->
    <div class="testimonial-card__quote-icon">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
        <path d="M12 34h6l4-8v-12h-12v12h6zm16 0h6l4-8v-12h-12v12h6z" opacity="0.3"/>
      </svg>
    </div>

    <!-- Quote text -->
    <blockquote class="testimonial-card__quote">
      {{ blok.quote }}
    </blockquote>

    <!-- Author -->
    <footer class="testimonial-card__author">
      <img
        v-if="blok.author_image?.filename"
        :src="blok.author_image.filename"
        :alt="blok.author_name"
        class="testimonial-card__avatar"
      />
      <div class="testimonial-card__author-info">
        <cite class="testimonial-card__name">{{ blok.author_name }}</cite>
        <span v-if="blok.author_role || blok.author_company" class="testimonial-card__role">
          {{ blok.author_role }}
          <template v-if="blok.author_role && blok.author_company">, </template>
          {{ blok.author_company }}
        </span>
      </div>
      <img
        v-if="blok.company_logo?.filename"
        :src="blok.company_logo.filename"
        :alt="blok.author_company"
        class="testimonial-card__company-logo"
      />
    </footer>
  </article>
</template>

<style scoped>
.testimonial-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(4, 11, 47, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.testimonial-card__quote-icon {
  color: #265BF6;
}

.testimonial-card__quote {
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 500;
  line-height: 1.5;
  color: #040B2F;
  margin: 0;
  letter-spacing: -0.01em;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid #E7E7E7;
}

.testimonial-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-card__author-info {
  flex: 1;
}

.testimonial-card__name {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #040B2F;
  font-style: normal;
}

.testimonial-card__role {
  display: block;
  font-size: 14px;
  color: #898989;
  margin-top: 2px;
}

.testimonial-card__company-logo {
  height: 32px;
  width: auto;
  opacity: 0.7;
}
</style>
