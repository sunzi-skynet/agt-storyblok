<script setup lang="ts">
defineProps<{
  blok: {
    headline: string
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
    class="relative w-full min-h-screen"
  >
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        v-if="blok.background_image"
        :src="blok.background_image"
        alt=""
        class="w-full h-full object-cover"
      />
      <!-- Gradient overlay - stronger at bottom -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#040B2F]/80 via-[#040B2F]/30 to-transparent" />
    </div>

    <!-- Content Layer -->
    <div class="relative z-10 min-h-screen flex flex-col justify-end pb-20 lg:pb-28">
      <div class="w-full max-w-[1200px] mx-auto px-6 lg:px-8">
        
        <!-- Headlines Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-16">
          <!-- Left Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] text-white font-medium leading-[1.05] tracking-[-0.02em]">
            Bus mieten.<br>Deutsch-<br>landweit.
          </h1>
          
          <!-- Right Headline (italic) -->
          <p class="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] text-white font-medium leading-[1.05] tracking-[-0.02em] italic lg:text-right">
            Experience<br>Mobility.
          </p>
        </div>

        <!-- Text Paragraphs Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-white/90">
          <!-- Left Text -->
          <p class="text-base lg:text-lg leading-relaxed">
            Mit der agency for global transport reisen Gruppen, Unternehmen und Organisationen in Deutschland und Europa komfortabel ans Ziel. Mit über 100 Jahren Erfahrungen als Busvermietung sind Gruppenfahrten bis hin zur komplexen Eventlogistik kein Problem für uns. ISO-zertifiziert, transparent und zuverlässig.
          </p>
          
          <!-- Right Text -->
          <p class="text-base lg:text-lg leading-relaxed">
            Als Full-Service Anbieter für Busvermietung und Personenlogistik kombiniert die agt effiziente Organisation mit persönlicher Betreuung.<br>
            Von der ersten Anfrage bis zur letzten Fahrt sorgen wir für unvergessliche Servicequalität.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
