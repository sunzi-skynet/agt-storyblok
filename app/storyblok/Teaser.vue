<script setup lang="ts">
const props = defineProps<{
  blok: {
    headline?: string
    headline_secondary?: string
    text_left?: string
    text_right?: string
    subheadline?: string
    background_image?: string
    cta_text?: string
    cta_link?: string
    _uid: string
    component: string
    _editable?: string
  }
}>()

const bgStyle = computed(() => ({
  backgroundImage: props.blok.background_image ? `url(${props.blok.background_image})` : undefined
}))
</script>

<template>
  <section
    v-editable="blok"
    class="teaser"
    :style="bgStyle"
  >
    <!-- Gradient overlay -->
    <div class="agt-overlay agt-overlay--gradient-up" />

    <!-- Content -->
    <div class="teaser__content">
      <div class="agt-container">
        
        <!-- Headlines Row -->
        <div class="teaser__headlines">
          <h1 class="teaser__title">
            Bus mieten.<br>Deutsch-<br>landweit.
          </h1>
          
          <p class="teaser__title teaser__title--right">
            Experience<br>Mobility.
          </p>
        </div>

        <!-- Text Paragraphs Row -->
        <div class="teaser__text-row">
          <p class="teaser__text">
            Mit der agency for global transport reisen Gruppen, Unternehmen und Organisationen in Deutschland und Europa komfortabel ans Ziel. Mit über 100 Jahren Erfahrungen als Busvermietung sind Gruppenfahrten bis hin zur komplexen Eventlogistik kein Problem für uns. ISO-zertifiziert, transparent und zuverlässig.
          </p>
          
          <p class="teaser__text">
            Als Full-Service Anbieter für Busvermietung und Personenlogistik kombiniert die agt effiziente Organisation mit persönlicher Betreuung.<br>
            Von der ersten Anfrage bis zur letzten Fahrt sorgen wir für unvergessliche Servicequalität.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.teaser {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: var(--color-bg-dark);
}

.teaser__content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: var(--space-3xl);
}

.teaser__headlines {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.teaser__title {
  font-size: clamp(36px, 6vw, 72px);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
}

.teaser__title--right {
  font-style: italic;
  text-align: right;
}

.teaser__text-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
}

.teaser__text {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

@media (max-width: 768px) {
  .teaser__headlines,
  .teaser__text-row {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  
  .teaser__title--right {
    text-align: left;
  }
}
</style>
