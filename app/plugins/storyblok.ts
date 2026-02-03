import { StoryblokVue } from '@storyblok/vue'
import Page from '../storyblok/Page.vue'
import Teaser from '../storyblok/Teaser.vue'
import Grid from '../storyblok/Grid.vue'
import Feature from '../storyblok/Feature.vue'
import Hero from '../storyblok/Hero.vue'
import HeroTeaser from '../storyblok/hero_teaser.vue'
import Testimonial from '../storyblok/Testimonial.vue'
import TextSection from '../storyblok/TextSection.vue'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(StoryblokVue)
  
  // Register components with lowercase names to match Storyblok
  vueApp.component('page', Page)
  vueApp.component('teaser', Teaser)
  vueApp.component('hero_teaser', HeroTeaser)
  vueApp.component('grid', Grid)
  vueApp.component('feature', Feature)
  vueApp.component('hero', Hero)
  vueApp.component('testimonial', Testimonial)
  vueApp.component('text-section', TextSection)
})
