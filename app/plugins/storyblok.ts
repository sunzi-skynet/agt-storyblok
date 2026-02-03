import { StoryblokVue } from '@storyblok/vue'

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
import FooterSection from '../storyblok/FooterSection.vue'
import FooterColumn from '../storyblok/FooterColumn.vue'
import LinkItem from '../storyblok/LinkItem.vue'
import SocialLink from '../storyblok/SocialLink.vue'

// Content blocks
import TextSection from '../storyblok/TextSection.vue'
import ImageTextSection from '../storyblok/ImageTextSection.vue'
import CtaBanner from '../storyblok/CtaBanner.vue'
import TestimonialSection from '../storyblok/TestimonialSection.vue'
import TestimonialCard from '../storyblok/TestimonialCard.vue'

// Forms
import BookingForm from '../storyblok/BookingForm.vue'
import FormField from '../storyblok/FormField.vue'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(StoryblokVue)
  
  // Register all components with snake_case names to match Storyblok
  vueApp.component('page', Page)
  vueApp.component('teaser', Teaser)
  vueApp.component('hero_teaser', HeroTeaser)
  vueApp.component('grid', Grid)
  vueApp.component('feature', Feature)
  vueApp.component('hero', Hero)
  vueApp.component('testimonial', Testimonial)
  
  // Layout
  vueApp.component('header_nav', HeaderNav)
  vueApp.component('nav_item', NavItem)
  vueApp.component('footer_section', FooterSection)
  vueApp.component('footer_column', FooterColumn)
  vueApp.component('link_item', LinkItem)
  vueApp.component('social_link', SocialLink)
  
  // Content blocks
  vueApp.component('text_section', TextSection)
  vueApp.component('image_text_section', ImageTextSection)
  vueApp.component('cta_banner', CtaBanner)
  vueApp.component('testimonial_section', TestimonialSection)
  vueApp.component('testimonial_card', TestimonialCard)
  
  // Forms
  vueApp.component('booking_form', BookingForm)
  vueApp.component('form_field', FormField)
})
