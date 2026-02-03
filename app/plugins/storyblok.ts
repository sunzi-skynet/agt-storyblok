// Manual component registration
// NOTE: @storyblok/vue converts snake_case to kebab-case internally
// So booking_form becomes booking-form when resolving

// Base components
import Page from '../storyblok/Page.vue'
import Teaser from '../storyblok/Teaser.vue'
import Grid from '../storyblok/Grid.vue'
import Feature from '../storyblok/Feature.vue'
import Hero from '../storyblok/Hero.vue'
import HeroTeaser from '../storyblok/HeroTeaser.vue'
import Testimonial from '../storyblok/Testimonial.vue'

// Layout components
import HeaderNav from '../storyblok/HeaderNav.vue'
import NavItem from '../storyblok/NavItem.vue'

// Content blocks
import ImageTextSection from '../storyblok/ImageTextSection.vue'
import CtaBanner from '../storyblok/CtaBanner.vue'
import TestimonialSection from '../storyblok/TestimonialSection.vue'
import TestimonialCard from '../storyblok/TestimonialCard.vue'
import ClientLogos from '../storyblok/ClientLogos.vue'
import Accordion from '../storyblok/Accordion.vue'
import AccordionItem from '../storyblok/AccordionItem.vue'

// Forms
import BookingForm from '../storyblok/BookingForm.vue'

// Sliders
import ServicesSlider from '../storyblok/ServicesSlider.vue'

export default defineNuxtPlugin(({ vueApp }) => {
  // Register with KEBAB-CASE names (Storyblok converts _ to - internally)
  vueApp.component('page', Page)
  vueApp.component('teaser', Teaser)
  vueApp.component('hero-teaser', HeroTeaser)
  vueApp.component('grid', Grid)
  vueApp.component('feature', Feature)
  vueApp.component('hero', Hero)
  vueApp.component('testimonial', Testimonial)
  
  // Layout
  vueApp.component('header-nav', HeaderNav)
  vueApp.component('nav-item', NavItem)
  
  // Content blocks
  vueApp.component('image-text-section', ImageTextSection)
  vueApp.component('cta-banner', CtaBanner)
  vueApp.component('testimonial-section', TestimonialSection)
  vueApp.component('testimonial-card', TestimonialCard)
  vueApp.component('client-logos', ClientLogos)
  vueApp.component('accordion', Accordion)
  vueApp.component('accordion-item', AccordionItem)
  
  // Forms
  vueApp.component('booking-form', BookingForm)
  
  // Sliders
  vueApp.component('services-slider', ServicesSlider)
})
