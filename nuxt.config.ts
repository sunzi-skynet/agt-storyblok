// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@storyblok/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  storyblok: {
    accessToken: 'ur2ZPYt2LKS234t7IemDZQtt',
    // Disable auto-discovery - we manually register in plugin with snake_case names
    componentsDir: false,
    apiOptions: {
      region: 'eu',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  app: {
    head: {
      title: 'AGT Bus- & Eventlogistik',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Deutschlands größte Busvermietung | 1.500 Partner' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
// redeploy 1770134118
