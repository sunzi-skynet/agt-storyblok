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

    <!-- Footer comes from Storyblok content -->
  </div>
</template>
