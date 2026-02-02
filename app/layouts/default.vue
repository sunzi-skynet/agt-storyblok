<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header (hardcoded navigation) -->
    <header class="bg-white border-b border-border sticky top-0 z-50">
      <div class="container-agt">
        <nav class="flex items-center justify-between h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-medium text-primary">agt</span>
          </NuxtLink>

          <!-- Navigation Links -->
          <div class="hidden lg:flex items-center gap-8">
            <NuxtLink to="/leistungen" class="text-body-sm hover:text-primary">
              Leistungen
            </NuxtLink>
            <NuxtLink to="/flotte" class="text-body-sm hover:text-primary">
              Flotte
            </NuxtLink>
            <NuxtLink to="/ueber-uns" class="text-body-sm hover:text-primary">
              Über uns
            </NuxtLink>
            <NuxtLink to="/kontakt" class="text-body-sm hover:text-primary">
              Kontakt
            </NuxtLink>
          </div>

          <!-- CTA Button -->
          <div class="flex items-center gap-4">
            <NuxtLink to="/anfrage" class="btn-primary text-sm">
              Jetzt anfragen
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-secondary text-white py-12">
      <div class="container-agt">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <span class="text-2xl font-medium text-primary">agt</span>
            <p class="mt-4 text-sm text-white/70">
              Deutschlands größte Busvermietung mit über 1.500 Partnern.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-medium mb-4">Leistungen</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li><NuxtLink to="/leistungen/busreisen" class="hover:text-white">Busreisen</NuxtLink></li>
              <li><NuxtLink to="/leistungen/shuttles" class="hover:text-white">Shuttle-Service</NuxtLink></li>
              <li><NuxtLink to="/leistungen/events" class="hover:text-white">Event-Logistik</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium mb-4">Unternehmen</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li><NuxtLink to="/ueber-uns" class="hover:text-white">Über uns</NuxtLink></li>
              <li><NuxtLink to="/karriere" class="hover:text-white">Karriere</NuxtLink></li>
              <li><NuxtLink to="/presse" class="hover:text-white">Presse</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium mb-4">Rechtliches</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li><NuxtLink to="/impressum" class="hover:text-white">Impressum</NuxtLink></li>
              <li><NuxtLink to="/datenschutz" class="hover:text-white">Datenschutz</NuxtLink></li>
              <li><NuxtLink to="/agb" class="hover:text-white">AGB</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-white/20 text-sm text-white/50 text-center">
          © {{ new Date().getFullYear() }} AGT Bus- & Eventlogistik GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  </div>
</template>
