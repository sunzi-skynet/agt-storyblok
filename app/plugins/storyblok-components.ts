// Manual component registration
// Register with SNAKE_CASE names (matching Storyblok component names exactly)

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
import Footer from '../storyblok/Footer.vue'
import NavigationColumn from '../storyblok/NavigationColumn.vue'
import NavigationItem from '../storyblok/NavigationItem.vue'

// Content blocks
import ImageTextSection from '../storyblok/ImageTextSection.vue'
import CtaBanner from '../storyblok/CtaBanner.vue'
import CtaButton from '../storyblok/CtaButton.vue'
import TestimonialSection from '../storyblok/TestimonialSection.vue'
import TestimonialCard from '../storyblok/TestimonialCard.vue'
import ClientLogos from '../storyblok/ClientLogos.vue'
import Accordion from '../storyblok/Accordion.vue'
import AccordionItem from '../storyblok/AccordionItem.vue'
import BookingForm from '../storyblok/BookingForm.vue'
import FleetList from '../storyblok/FleetList.vue'
import FleetItem from '../storyblok/FleetItem.vue'
import TabModule from '../storyblok/TabModule.vue'
import TabItem from '../storyblok/TabItem.vue'
import ServicesSlider from '../storyblok/ServicesSlider.vue'
import ServicesSlide from '../storyblok/ServicesSlide.vue'

export default defineNuxtPlugin(({ vueApp }) => {
  // Base
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
  vueApp.component('footer', Footer)
  vueApp.component('navigation_column', NavigationColumn)
  vueApp.component('navigation_item', NavigationItem)
  
  // Content blocks
  vueApp.component('image_text_section', ImageTextSection)
  vueApp.component('cta_banner', CtaBanner)
  vueApp.component('cta_button', CtaButton)
  vueApp.component('testimonial_section', TestimonialSection)
  vueApp.component('testimonial_card', TestimonialCard)
  vueApp.component('client_logos', ClientLogos)
  vueApp.component('accordion', Accordion)
  vueApp.component('accordion_item', AccordionItem)
  vueApp.component('booking_form', BookingForm)
  vueApp.component('fleet_list', FleetList)
  vueApp.component('fleet_item', FleetItem)
  vueApp.component('tab_module', TabModule)
  vueApp.component('tab_item', TabItem)
  vueApp.component('services_slider', ServicesSlider)
  vueApp.component('services_slide', ServicesSlide)
})
