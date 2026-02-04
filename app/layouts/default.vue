<template>
  <div class="min-h-screen flex flex-col">
    <!-- Global Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer comes from Storyblok content -->
  </div>
</template>
