// Storyblok component registration
// 
// WHY BOTH snake_case AND kebab-case?
// - Storyblok looks up components by snake_case block name (e.g. 'navigation_item')
// - Vue internally resolves templates using kebab-case (e.g. 'navigation-item')
// - Both are needed for full compatibility

import Page from '../storyblok/Page.vue'
import Teaser from '../storyblok/Teaser.vue'
import Grid from '../storyblok/Grid.vue'
import Feature from '../storyblok/Feature.vue'
import Hero from '../storyblok/Hero.vue'
import HeroTeaser from '../storyblok/HeroTeaser.vue'
import Testimonial from '../storyblok/Testimonial.vue'
import HeaderNav from '../storyblok/HeaderNav.vue'
import NavItem from '../storyblok/NavItem.vue'
import Footer from '../storyblok/Footer.vue'
import NavigationColumn from '../storyblok/NavigationColumn.vue'
import NavigationItem from '../storyblok/NavigationItem.vue'
import ImageTextSection from '../storyblok/ImageTextSection.vue'
import CtaBanner from '../storyblok/CtaBanner.vue'
import CtaButton from '../storyblok/CtaButton.vue'
import TestimonialSection from '../storyblok/TestimonialSection.vue'
import TestimonialCard from '../storyblok/TestimonialCard.vue'
import ClientLogos from '../storyblok/ClientLogos.vue'
import Accordion from '../storyblok/Accordion.vue'
import AccordionItem from '../storyblok/AccordionItem.vue'
import FleetList from '../storyblok/FleetList.vue'
import FleetItem from '../storyblok/FleetItem.vue'
import TabModule from '../storyblok/TabModule.vue'
import TabItem from '../storyblok/TabItem.vue'
import ServicesSlider from '../storyblok/ServicesSlider.vue'
import ServicesSlide from '../storyblok/ServicesSlide.vue'
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
  register(vueApp, 'page', Page)
  register(vueApp, 'teaser', Teaser)
  register(vueApp, 'grid', Grid)
  register(vueApp, 'feature', Feature)
  register(vueApp, 'hero', Hero)
  register(vueApp, 'hero_teaser', HeroTeaser)
  register(vueApp, 'testimonial', Testimonial)
  register(vueApp, 'header_nav', HeaderNav)
  register(vueApp, 'nav_item', NavItem)
  register(vueApp, 'footer', Footer)
  register(vueApp, 'navigation_column', NavigationColumn)
  register(vueApp, 'navigation_item', NavigationItem)
  register(vueApp, 'image_text_section', ImageTextSection)
  register(vueApp, 'cta_banner', CtaBanner)
  register(vueApp, 'cta_button', CtaButton)
  register(vueApp, 'testimonial_section', TestimonialSection)
  register(vueApp, 'testimonial_card', TestimonialCard)
  register(vueApp, 'client_logos', ClientLogos)
  register(vueApp, 'accordion', Accordion)
  register(vueApp, 'accordion_item', AccordionItem)
  register(vueApp, 'fleet_list', FleetList)
  register(vueApp, 'fleet_item', FleetItem)
  register(vueApp, 'tab_module', TabModule)
  register(vueApp, 'tab_item', TabItem)
  register(vueApp, 'services_slider', ServicesSlider)
  register(vueApp, 'services_slide', ServicesSlide)
  register(vueApp, 'request_form', RequestForm)
  register(vueApp, 'icon_and_link', IconAndLink)
})
