// Storyblok component registration
// 
// WHY BOTH snake_case AND kebab-case?
// - Storyblok looks up components by snake_case block name (e.g. 'footer_nav_item')
// - Vue internally resolves templates using kebab-case (e.g. 'footer-nav-item')
// - Both are needed for full compatibility

// Base components
import Page from '../storyblok/Page.vue'
import Hero from '../storyblok/Hero.vue'
import HeroTeaser from '../storyblok/HeroTeaser.vue'
import HeroTeaser2 from '../storyblok/HeroTeaser2.vue'
import Testimonial from '../storyblok/Testimonial.vue'

// Layout components
import Footer from '../storyblok/Footer.vue'
import NavigationColumn from '../storyblok/NavigationColumn.vue'
import FooterNavItem from '../storyblok/FooterNavItem.vue'

// Content blocks
import ImageTextSection from '../storyblok/ImageTextSection.vue'
import CtaBanner from '../storyblok/CtaBanner.vue'
import CtaButton from '../storyblok/CtaButton.vue'
import TestimonialSection from '../storyblok/TestimonialSection.vue'
import TestimonialCard from '../storyblok/TestimonialCard.vue'
import Accordion from '../storyblok/Accordion.vue'
import AccordionItem from '../storyblok/AccordionItem.vue'

// Sliders
import ServicesSlider from '../storyblok/ServicesSlider.vue'
import ServicesSlide from '../storyblok/ServicesSlide.vue'
import HorizontalSliderModule from '../storyblok/HorizontalSliderModule.vue'
import SliderItem from '../storyblok/SliderItem.vue'

// Tabs
import TabModule from '../storyblok/TabModule.vue'
import TabItem from '../storyblok/TabItem.vue'

// Fleet
import FleetList from '../storyblok/FleetList.vue'
import FleetItem from '../storyblok/FleetItem.vue'

// Request Form
import RequestForm from '../storyblok/RequestForm.vue'
import IconAndLink from '../storyblok/IconAndLink.vue'

// Helper to register component with both naming conventions
function register(app: any, snakeName: string, component: any) {
  app.component(snakeName, component)
  if (snakeName.includes('_')) {
    app.component(snakeName.replace(/_/g, '-'), component)
  }
}

export default defineNuxtPlugin(({ vueApp }) => {
  // Base
  register(vueApp, 'page', Page)
  register(vueApp, 'hero', Hero)
  register(vueApp, 'hero_teaser', HeroTeaser)
  register(vueApp, 'hero_teaser_2', HeroTeaser2)
  register(vueApp, 'testimonial', Testimonial)
  
  // Layout
  register(vueApp, 'footer', Footer)
  register(vueApp, 'navigation_column', NavigationColumn)
  register(vueApp, 'footer_nav_item', FooterNavItem)
  // Backward compat: old content may still reference navigation_item
  register(vueApp, 'navigation_item', FooterNavItem)
  
  // Content blocks
  register(vueApp, 'image_text_section', ImageTextSection)
  register(vueApp, 'cta_banner', CtaBanner)
  register(vueApp, 'cta_button', CtaButton)
  register(vueApp, 'testimonial_section', TestimonialSection)
  register(vueApp, 'testimonial_card', TestimonialCard)
  register(vueApp, 'accordion', Accordion)
  register(vueApp, 'accordion_item', AccordionItem)
  
  // Sliders
  register(vueApp, 'services_slider', ServicesSlider)
  register(vueApp, 'services_slide', ServicesSlide)
  register(vueApp, 'horizontal_slider_module', HorizontalSliderModule)
  register(vueApp, 'slider_item', SliderItem)
  
  // Tabs
  register(vueApp, 'tab_module', TabModule)
  register(vueApp, 'tab_item', TabItem)
  
  // Fleet
  register(vueApp, 'fleet_list', FleetList)
  register(vueApp, 'fleet_item', FleetItem)
  
  // Request Form
  register(vueApp, 'request_form', RequestForm)
  register(vueApp, 'icon_and_link', IconAndLink)
})
