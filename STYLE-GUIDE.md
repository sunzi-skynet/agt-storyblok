# AGT Style Guide

## CSS Architecture

Das Projekt nutzt ein **hybrides CSS-System**:
- **CSS Custom Properties** für Design Tokens (Farben, Spacing, etc.)
- **Global Component Classes** (`agt-*`) für wiederverwendbare UI-Elemente
- **Tailwind Utilities** für Layout-Helfer
- **Scoped CSS** in Vue-Komponenten für spezifische Styles

---

## Design Tokens (CSS Variables)

### Farben

```css
/* Brand */
var(--color-primary)        /* #265BF6 - Links, Buttons, Akzente */
var(--color-primary-hover)  /* #1e4bc7 - Hover-State */
var(--color-secondary)      /* #040B2F - Dark backgrounds */

/* Text */
var(--color-text)           /* #00000E - Haupttext */
var(--color-text-muted)     /* #898989 - Sekundär */
var(--color-text-light)     /* #666666 - Tertiär */
var(--color-text-inverse)   /* #FFFFFF - Auf dunklem Hintergrund */

/* Backgrounds */
var(--color-bg)             /* #FFFFFF - Standard */
var(--color-bg-alt)         /* #F5F5F5 - Alternativ */
var(--color-bg-dark)        /* #040B2F - Dark sections */
```

### Spacing

```css
var(--space-xs)   /* 8px */
var(--space-sm)   /* 16px */
var(--space-md)   /* 24px */
var(--space-lg)   /* 32px */
var(--space-xl)   /* 48px */
var(--space-2xl)  /* 64px */
var(--space-3xl)  /* 80px */

var(--section-padding-y)        /* 80px Desktop */
var(--section-padding-y-mobile) /* 48px Mobile */
```

### Layout

```css
var(--container-max)      /* 1140px */
var(--container-padding)  /* 24px / 16px mobile */
```

---

## Global Component Classes

### Container & Sections

```html
<!-- Standard Container -->
<div class="agt-container">...</div>

<!-- Section mit Padding -->
<section class="agt-section">
  <div class="agt-container">...</div>
</section>

<!-- Section Varianten -->
<section class="agt-section agt-section--light">...</section>  <!-- Weiß -->
<section class="agt-section agt-section--alt">...</section>    <!-- Hellgrau -->
<section class="agt-section agt-section--dark">...</section>   <!-- Dunkelblau -->
```

### Buttons

```html
<!-- Primary (auf hellem Hintergrund) -->
<a href="#" class="agt-btn agt-btn--primary">
  Mehr erfahren
  <svg class="agt-btn__icon">...</svg>
</a>

<!-- Secondary (auf dunklem Hintergrund) -->
<a href="#" class="agt-btn agt-btn--secondary">Kontakt</a>

<!-- Outline (auf hellem Hintergrund) -->
<a href="#" class="agt-btn agt-btn--outline">Details</a>

<!-- Größen -->
<a href="#" class="agt-btn agt-btn--primary agt-btn--sm">Klein</a>
<a href="#" class="agt-btn agt-btn--primary agt-btn--lg">Groß</a>
```

### Typography

```html
<!-- Titles -->
<h2 class="agt-title">Große Section-Überschrift</h2>
<h2 class="agt-title agt-title--sm">Kleinere Überschrift</h2>
<h2 class="agt-title agt-title--italic">Kursiv</h2>

<!-- Subtitle -->
<p class="agt-subtitle">Ergänzender Text zur Überschrift</p>

<!-- Lead Text -->
<p class="agt-lead">Größerer Einleitungstext</p>

<!-- Rich Text Content (für Storyblok richtext) -->
<div class="agt-richtext" v-html="renderRichText(blok.body)"></div>
```

### Grids

```html
<!-- 2-Spalten Grid -->
<div class="agt-grid agt-grid--2">
  <div>Spalte 1</div>
  <div>Spalte 2</div>
</div>

<!-- 3-Spalten Grid -->
<div class="agt-grid agt-grid--3">...</div>

<!-- 4-Spalten Grid -->
<div class="agt-grid agt-grid--4">...</div>
```

### Hero Overlays

```html
<!-- Gradient von unten nach oben -->
<div class="agt-overlay agt-overlay--gradient-up"></div>

<!-- Gradient von links nach rechts -->
<div class="agt-overlay agt-overlay--gradient-left"></div>

<!-- Dunkler Overlay -->
<div class="agt-overlay agt-overlay--dark"></div>
```

### Cards

```html
<div class="agt-card agt-card--elevated">
  <img src="..." class="agt-card__image">
  <div class="agt-card__body">
    <h3>Titel</h3>
    <p>Beschreibung</p>
  </div>
</div>
```

---

## Migration Guide

### ❌ Alt → ✅ Neu

| Alt (Component-spezifisch) | Neu (Global) |
|---------------------------|--------------|
| `max-width: 1200px` | `max-width: var(--container-max)` |
| `max-width: 1140px` | `max-width: var(--container-max)` |
| `padding: 80px 0` | `padding: var(--section-padding-y) 0` |
| `padding: 0 24px` | `padding: 0 var(--container-padding)` |
| `background: #265BF6` | `background: var(--color-primary)` |
| `background: #040B2F` | `background: var(--color-bg-dark)` |
| `color: #666666` | `color: var(--color-text-light)` |
| `font-family: 'TT Hoves Pro'` | `font-family: var(--font-family)` |

### Komponenten-Refactoring Priorität

| Komponente | Status | Notwendige Änderungen |
|------------|--------|----------------------|
| CtaButton.vue | 🟡 | Variablen statt hardcoded Farben |
| CtaBanner.vue | 🟡 | Container/Section Classes nutzen |
| ImageTextSection.vue | 🟡 | Variablen + agt-container |
| ServicesSlider.vue | 🟡 | Variablen für Overlay/Farben |
| TestimonialSection.vue | 🟡 | Variablen + Section padding |
| Accordion.vue | 🟡 | Variablen + Section classes |
| ClientLogos.vue | 🟡 | Variablen + Container |
| HeroTeaser.vue | 🟡 | Overlay-Klassen + Variablen |
| Hero.vue | ✅ | Nutzt bereits Tailwind tokens |
| Feature.vue | ✅ | Nutzt bereits Tailwind tokens |

---

## Best Practices

### 1. Nutze CSS Variables für alle Farben

```css
/* ❌ Schlecht */
.my-component {
  background: #040B2F;
  color: #265BF6;
}

/* ✅ Gut */
.my-component {
  background: var(--color-bg-dark);
  color: var(--color-primary);
}
```

### 2. Nutze die globalen Container-Klassen

```vue
<!-- ❌ Schlecht -->
<template>
  <div class="my-container">...</div>
</template>
<style scoped>
.my-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>

<!-- ✅ Gut -->
<template>
  <div class="agt-container">...</div>
</template>
```

### 3. Nutze agt-section für konsistentes Spacing

```vue
<!-- ❌ Schlecht -->
<section class="my-section">
<style>
.my-section { padding: 64px 0; }
</style>

<!-- ✅ Gut -->
<section class="agt-section agt-section--light">
```

### 4. Behalte scoped CSS nur für komponentenspezifisches

```vue
<style scoped>
/* NUR für Dinge, die wirklich nur diese Komponente betreffen */
.hero-teaser__slides {
  position: relative;
  min-height: 280px;
}

/* NICHT für allgemeine Styles wie Farben, Container, etc. */
</style>
```

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1440px) { /* 2xl */ }
```

Die globalen Klassen sind bereits responsive:
- `.agt-section` passt Padding automatisch an
- `.agt-container` passt Padding automatisch an  
- `.agt-grid--*` wird auf Mobile zu 1 Spalte
- `.agt-title` nutzt `clamp()` für fluid Typography
