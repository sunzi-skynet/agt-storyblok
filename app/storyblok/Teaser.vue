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
    :style="bgStyle"
    style="position: relative; width: 100%; min-height: 100vh; background-size: cover; background-position: center;"
  >
    <!-- Gradient overlay -->
    <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,11,47,0.85) 0%, rgba(4,11,47,0.4) 40%, transparent 70%);" />

    <!-- Content -->
    <div style="position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 80px;">
      <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px;">
        
        <!-- Headlines Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px;">
          <h1 style="font-size: clamp(36px, 6vw, 72px); font-weight: 500; color: white; line-height: 1.05; letter-spacing: -0.02em; margin: 0;">
            Bus mieten.<br>Deutsch-<br>landweit.
          </h1>
          
          <p style="font-size: clamp(36px, 6vw, 72px); font-weight: 500; color: white; line-height: 1.05; letter-spacing: -0.02em; font-style: italic; text-align: right; margin: 0;">
            Experience<br>Mobility.
          </p>
        </div>

        <!-- Text Paragraphs Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.9); margin: 0;">
            Mit der agency for global transport reisen Gruppen, Unternehmen und Organisationen in Deutschland und Europa komfortabel ans Ziel. Mit über 100 Jahren Erfahrungen als Busvermietung sind Gruppenfahrten bis hin zur komplexen Eventlogistik kein Problem für uns. ISO-zertifiziert, transparent und zuverlässig.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.9); margin: 0;">
            Als Full-Service Anbieter für Busvermietung und Personenlogistik kombiniert die agt effiziente Organisation mit persönlicher Betreuung.<br>
            Von der ersten Anfrage bis zur letzten Fahrt sorgen wir für unvergessliche Servicequalität.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
