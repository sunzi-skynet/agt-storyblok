<script setup lang="ts">
defineProps<{
  blok: {
    logo?: { filename: string; alt?: string }
    tagline?: string
    nav_columns?: Array<{
      title?: string
      links?: Array<any>
      _uid: string
      component: string
    }>
    contact_phone?: string
    contact_email?: string
    social_links?: Array<{
      platform?: string
      url?: string
      _uid: string
      component: string
    }>
    copyright_text?: string
    legal_links?: Array<{
      label?: string
      url?: string
      _uid: string
      component: string
    }>
    _uid: string
    component: string
    _editable?: string
  }
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer v-editable="blok" class="footer">
    <div class="footer__container">
      <!-- Top section: Logo + Columns -->
      <div class="footer__top">
        <!-- Logo & Contact -->
        <div class="footer__brand">
          <a href="/" class="footer__logo">
            <img
              v-if="blok.logo?.filename"
              :src="blok.logo.filename"
              :alt="blok.logo.alt || 'AGT Logistik'"
              class="footer__logo-img"
            />
            <span v-else class="footer__logo-text">agt</span>
          </a>
          <p v-if="blok.tagline" class="footer__tagline">
            {{ blok.tagline }}
          </p>

          <!-- Contact -->
          <div class="footer__contact">
            <a v-if="blok.contact_phone" :href="`tel:${blok.contact_phone}`" class="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ blok.contact_phone }}
            </a>
            <a v-if="blok.contact_email" :href="`mailto:${blok.contact_email}`" class="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {{ blok.contact_email }}
            </a>
          </div>

          <!-- Social -->
          <div v-if="blok.social_links?.length" class="footer__social">
            <StoryblokComponent
              v-for="social in blok.social_links"
              :key="social._uid"
              :blok="social"
            />
          </div>
        </div>

        <!-- Nav Columns -->
        <div class="footer__columns">
          <StoryblokComponent
            v-for="column in blok.nav_columns"
            :key="column._uid"
            :blok="column"
          />
        </div>
      </div>

      <!-- Bottom: Copyright + Legal -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          {{ blok.copyright_text || `© ${currentYear} AGT Logistik. Alle Rechte vorbehalten.` }}
        </p>
        <nav v-if="blok.legal_links?.length" class="footer__legal">
          <a
            v-for="link in blok.legal_links"
            :key="link._uid"
            :href="link.url || '#'"
            class="footer__legal-link"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #040B2F;
  color: white;
  padding: 64px 0 32px;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer__top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brand section */
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer__logo {
  display: inline-block;
  text-decoration: none;
}

.footer__logo-img {
  height: 40px;
  width: auto;
}

.footer__logo-text {
  font-size: 36px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.03em;
}

.footer__tagline {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer__contact-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer__contact-item:hover {
  color: white;
}

.footer__social {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

/* Columns */
.footer__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 32px;
}

/* Bottom */
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  gap: 24px;
}

.footer__copyright {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.footer__legal {
  display: flex;
  gap: 24px;
}

.footer__legal-link {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__legal-link:hover {
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 48px 0 24px;
  }

  .footer__top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer__columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer__legal {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
