// Manual component registration
// Register with BOTH snake_case (Storyblok lookup) AND kebab-case (Vue internal)

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
  // Base - single word, no alias needed
  vueApp.component('page', Page)
  vueApp.component('teaser', Teaser)
  vueApp.component('grid', Grid)
  vueApp.component('feature', Feature)
  vueApp.component('hero', Hero)
  vueApp.component('testimonial', Testimonial)
  vueApp.component('footer', Footer)
  vueApp.component('accordion', Accordion)
  
  // Multi-word: register BOTH snake_case and kebab-case
  vueApp.component('hero_teaser', HeroTeaser)
  vueApp.component('hero-teaser', HeroTeaser)
  
  vueApp.component('header_nav', HeaderNav)
  vueApp.component('header-nav', HeaderNav)
  
  vueApp.component('nav_item', NavItem)
  vueApp.component('nav-item', NavItem)
  
  vueApp.component('navigation_column', NavigationColumn)
  vueApp.component('navigation-column', NavigationColumn)
  
  vueApp.component('navigation_item', NavigationItem)
  vueApp.component('navigation-item', NavigationItem)
  
  vueApp.component('image_text_section', ImageTextSection)
  vueApp.component('image-text-section', ImageTextSection)
  
  vueApp.component('cta_banner', CtaBanner)
  vueApp.component('cta-banner', CtaBanner)
  
  vueApp.component('cta_button', CtaButton)
  vueApp.component('cta-button', CtaButton)
  
  vueApp.component('testimonial_section', TestimonialSection)
  vueApp.component('testimonial-section', TestimonialSection)
  
  vueApp.component('testimonial_card', TestimonialCard)
  vueApp.component('testimonial-card', TestimonialCard)
  
  vueApp.component('client_logos', ClientLogos)
  vueApp.component('client-logos', ClientLogos)
  
  vueApp.component('accordion_item', AccordionItem)
  vueApp.component('accordion-item', AccordionItem)
  
  vueApp.component('booking_form', BookingForm)
  vueApp.component('booking-form', BookingForm)
  
  vueApp.component('fleet_list', FleetList)
  vueApp.component('fleet-list', FleetList)
  
  vueApp.component('fleet_item', FleetItem)
  vueApp.component('fleet-item', FleetItem)
  
  vueApp.component('tab_module', TabModule)
  vueApp.component('tab-module', TabModule)
  
  vueApp.component('tab_item', TabItem)
  vueApp.component('tab-item', TabItem)
  
  vueApp.component('services_slider', ServicesSlider)
  vueApp.component('services-slider', ServicesSlider)
  
  vueApp.component('services_slide', ServicesSlide)
  vueApp.component('services-slide', ServicesSlide)
})
