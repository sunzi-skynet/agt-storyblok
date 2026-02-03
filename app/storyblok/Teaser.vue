<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <section
    v-editable="blok"
    class="hero-section"
  >
    <!-- Background Image -->
    <img
      v-if="blok.background_image"
      :src="blok.background_image"
      alt=""
      class="hero-bg"
    />
    
    <!-- Gradient overlay -->
    <div class="hero-gradient" />

    <!-- Content -->
    <div class="hero-content">
      <div class="hero-inner">
        
        <!-- Headlines Row -->
        <div class="hero-headlines">
          <h1 class="hero-headline-left">
            Bus mieten.<br>Deutsch-<br>landweit.
          </h1>
          
          <p class="hero-headline-right">
            Experience<br>Mobility.
          </p>
        </div>

        <!-- Text Paragraphs Row -->
        <div class="hero-texts">
          <p class="hero-text">
            Mit der agency for global transport reisen Gruppen, Unternehmen und Organisationen in Deutschland und Europa komfortabel ans Ziel. Mit über 100 Jahren Erfahrungen als Busvermietung sind Gruppenfahrten bis hin zur komplexen Eventlogistik kein Problem für uns. ISO-zertifiziert, transparent und zuverlässig.
          </p>
          
          <p class="hero-text">
            Als Full-Service Anbieter für Busvermietung und Personenlogistik kombiniert die agt effiziente Organisation mit persönlicher Betreuung.<br>
            Von der ersten Anfrage bis zur letzten Fahrt sorgen wir für unvergessliche Servicequalität.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(4, 11, 47, 0.85) 0%, rgba(4, 11, 47, 0.4) 40%, transparent 70%);
  z-index: 2;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 3;
}

.hero-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px 24px;
}

.hero-headlines {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.hero-headline-left {
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 500;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
}

.hero-headline-right {
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 500;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-style: italic;
  text-align: right;
  margin: 0;
}

.hero-texts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.hero-text {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

@media (max-width: 768px) {
  .hero-headlines,
  .hero-texts {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .hero-headline-right {
    text-align: left;
  }
  
  .hero-inner {
    padding-bottom: 48px;
  }
}
</style>
