# Content Model Registry

**Zweck:** Zentrale Übersicht aller Blöcke und Felder für Konsistenz & Duplikat-Erkennung.

---

## Blöcke (Components)

### cta_button ✅
**Status:** Done | **Typ:** Nested Block (Reusable)

Der zentrale Button-Block für alle CTAs. Wird von hero_teaser, footer, slider_item, image_text_section, etc. verwendet.

- **label** (text, required) — Button-Text
- **link** (multilink) — Ziel-URL
- **style** (option) — `primary` (Blau) / `secondary` (Dunkelblau) / `white` (Hell)
- **size** (option) — `sm` / `md` (default) / `lg`
- **icon_left** (asset) — Icon links vom Text (optional)
- **icon_right** (asset) — Icon rechts vom Text (optional)

**Farben nach Style:**

| Style | Default | Hover | Active | Focus Ring |
|-------|---------|-------|--------|------------|
| primary | #265BF6 | #4070F7 | #1D4AC4 | #c3ddfd |
| secondary | #040B2F | #1A2850 | #020618 | #7B8AA8 |
| white | #FFFFFF | #E5E7EB | #D1D5DB | #7B8AA8 |

---

### header_nav ⚠️ DEPRECATED
**Status:** Deprecated | **Ersetzt durch:** navigation + mega_nav_* Blocks

Alte simple Navigation. Nicht mehr verwenden!

---

### navigation ✅
**Status:** Done | **Typ:** Content Type (Singleton) | **Trello:** [#36](https://trello.com/c/54WmPB0y) | **Datum:** 2026-02-04

Globale Navigation mit Mega-Menu Support. Wird von `AppHeader.vue` (in `app/components/`) geladen.

**Hinweis:** Nicht als Storyblok-Block registriert! Die Vue-Komponente ist hardcoded und lädt die Daten via `useStoryblokApi().get('cdn/stories/navigation')`.

- **logo** (asset) — Logo-Bild
- **phone_number** (text) — Telefonnummer (z.B. "0800 50 50 50 3")
- **show_search** (boolean) — Suchfeld anzeigen
- **show_language** (boolean) — Sprachauswahl anzeigen
- **nav_items** (blocks: mega_nav_item) — Hauptmenü-Einträge

### mega_nav_item ✅
**Status:** Done | **Typ:** Nested Block

- **label** (text, required) — Menü-Label
- **link** (multilink) — URL (wenn kein Dropdown)
- **has_dropdown** (boolean) — Hat Mega-Menü Dropdown
- **tagline** (text) — Tagline links im Dropdown (z.B. "agency for\nglobal\ntransport")
- **teaser_image** (asset) — Bild rechts im Dropdown
- **columns** (blocks: mega_nav_column) — Spalten im Dropdown

### mega_nav_column ✅
**Status:** Done | **Typ:** Nested Block

- **items** (blocks: mega_nav_link) — Links in der Spalte

### mega_nav_link ✅
**Status:** Done | **Typ:** Nested Block

- **label** (text, required) — Link-Text
- **link** (multilink) — Ziel-URL
- **sub_items** (blocks: mega_nav_sub_link) — Sub-Links bei Hover

### mega_nav_sub_link ✅
**Status:** Done | **Typ:** Nested Block

- **label** (text, required) — Link-Text
- **link** (multilink) — Ziel-URL

---

### footer ✅
**Status:** Done | **Trello:** [footer](https://trello.com/c/z5l5wA3f)

- **title** (text) — H3: Main heading (z.B. "Benötigen Sie einen zuverlässigen Mobilitätspartner?")
- **cta_wrapper** (blocks: cta_button) — Bis zu 2 Buttons
- **navigation_section** (blocks: navigation_column) — Spalten-Container
- **copyright** (text) — Copyright-Text unten links
- **slogan** (text) — Branding-Slogan unten rechts
- **background_image** (asset) — Hintergrundbild (Kreismuster)

### navigation_column ✅
**Status:** Done | **Typ:** Nested Block

- **items** (blocks: navigation_item) — Links in der Spalte

### navigation_item ✅
**Status:** Done | **Typ:** Nested Block

- **label** (text) — Link-Text
- **url** (text) — URL

---

### testimonial_section ✅
**Status:** Done | **Trello:** [testimonial_card](https://trello.com/c/QqfOX1ON)

- **title** (text) — Sektions-Überschrift (z.B. "Unsere Kunden")
- **subtitle** (text) — Unterüberschrift
- **testimonials** (blocks: testimonial_card) — Array von Testimonials

**Layout:** Interaktives Tab-Design
- Links: Klickbare Firmennamen-Liste (aktiv = blau mit Bullet)
- Mitte: Zitat in Anführungszeichen
- Rechts: Firmenlogo (optional)

### testimonial_card ✅
**Status:** Done | **Typ:** Nested Block

- **company_name** (text) — Firmenname (für Tab-Liste)
- **quote** (textarea) — Das Zitat
- **company_logo** (asset) — Firmenlogo (optional)

---

### text_section ✅
**Status:** Done | **Trello:** [text_section](https://trello.com/c/XCeGSEBl)

- **title** (text) — Überschrift
- **subtitle** (text) — Unterüberschrift
- **body** (richtext) — Formatierter Textinhalt
- **text_align** (option: left, center, right) — Textausrichtung
- **max_width** (option: narrow, medium, full) — Container-Breite

---

### cta_banner ✅
**Status:** Done | **Trello:** [cta_banner](https://trello.com/c/s2mUiFgS)

- **title** (text) — Headline
- **subtitle** (text) — Subtext
- **cta_text** (text) — Button-Text
- **cta_link** (text) — Button-URL
- **bg_color** (option: primary, secondary, light) — Hintergrundfarbe
- **bg_image** (asset) — Hintergrundbild (optional)

---

### hero_teaser ✅
**Status:** Done | **Trello:** [hero_teaser](https://trello.com/c/VxvitIf3)

- **background_image** (asset) — Vollbild-Hintergrundbild
- **title_left** (text) — H1 Headline links
- **description_left** (textarea) — Body-Text links
- **cta_left** (blocks: cta_button, max 1) — Button links
- **title_right** (text) — Headline rechts (kursiv)
- **description_right** (textarea) — Body-Text rechts
- **cta_right** (blocks: cta_button, max 1) — Button rechts

---

### hero_teaser_2 ✅
**Status:** Done | **Trello:** [hero_teaser_2](https://trello.com/c/Ezfq2aup) | **Datum:** 2026-02-04

Simplere Hero-Variante ohne CTAs. Alles links gestapelt (Titel → Subtitle → Description).

- **background_image** (asset) — Vollbild-Hintergrundbild
- **title_left** (text) — H1 Headline links
- **sub_title_right** (text) — Subtitle rechts (gold/gelb)
- **description_right** (textarea) — Body-Text rechts

---

### page ✅
**Status:** Done | **Typ:** Content Type

- **body** (blocks) — Array von nestable Blocks

---

### teaser ✅
**Status:** Done (alt, ersetzt durch hero_teaser)

- **headline** (text)
- **subheadline** (text)
- **image** (asset)
- **cta_text** (text)
- **cta_link** (text)

---

### grid ✅
**Status:** Done

- **columns** (blocks) — Grid-Items

---

### feature ✅
**Status:** Done

- **icon** (text) — Icon-Name
- **title** (text)
- **description** (textarea)

---

## Feld-Patterns (Wiederverwendbar)

### CTA Pattern (NEU: cta_button Block verwenden!)
```
buttons (blocks: cta_button) — Wiederverwendbarer Button-Block
```
⚠️ **Veraltet:** `cta_text` + `cta_link` Felder — bitte auf `cta_button` Block migrieren.

### Background Pattern
```
bg_image (asset) — Hintergrundbild
bg_color (text) — Fallback-Farbe (optional)
bg_overlay (boolean) — Gradient-Overlay
```

### Title Pattern
```
title (text) — Hauptüberschrift
subtitle (text) — Unterüberschrift (optional)
```

### Rich Content Pattern
```
body_richtext (richtext) — Formatierter Text
```

---

## Ähnlichkeits-Check

Wenn ein neuer Block diese Felder hat, prüfen ob bestehender Block passt:

| Neuer Block hat... | Prüfe... |
|-------------------|----------|
| bg_image + title + cta | hero_teaser, teaser |
| title + description + icon | feature |
| items/columns array | grid |
| quote + author | testimonial (neu) |

---

## Changelog

- **2026-02-04:** cta_button refactored — 3 Styles (primary/secondary/white), 3 Sizes (sm/md/lg), Icons; image_text_section aktualisiert
- **2026-02-03:** Registry erstellt, hero_teaser dokumentiert

### client_logos
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### fleet_list
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### stats_bar
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### accordion
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### accordion_item
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### image_text_section ✅
**Status:** Done | **Typ:** Nestable Block

- **image** (asset) — Bild
- **image_position** (option: left/right) — Bild-Position
- **title** (text) — Überschrift
- **body** (richtext) — Inhalt
- **buttons** (blocks: cta_button, max 2) — CTA-Buttons


### services_slider
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt


### tab_module
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt

---

### horizontal_slider_module ✅
**Status:** Done | **Trello:** [AGT-38](https://sunzinet.atlassian.net/browse/AGT-38)

- **title** (text) — Main heading (text only, no styling)
- **description** (textarea) — Multi-line introductory text
- **agt_theme** (option: agt-theme datasource) — Light or dark mode styling
- **slider_section** (blocks: slider_item) — Individual slider cards (min. 1 required)

**Features:**
- Arrow buttons to move items ±1 position
- Scrollbar with dynamic handle width
- Swipe gestures (touch-enabled)
- Light/dark theme support
- Responsive breakpoints

### slider_item ✅
**Status:** Done | **Typ:** Nested Block

- **title** (text) — The heading
- **background_image** (asset) — Background image for the card
- **background_colour** (option: agt-colour datasource) — Optional fallback colour
- **icon** (asset) — Optional icon image
- **description** (textarea) — Optional description text
- **button** (blocks: cta_button) — Call-to-action button

---

### request_form ✅
**Status:** Done | **Trello:** TBD

- **title** (text) — H3: Only the text can be changed, no styling
- **description** (textarea) — Text can be formatted as required
- **icon_and_link** (blocks: icon_and_link) — 0-5 contact links

**Layout:** 2-column (Info left, Form right), 2-step form
**Datasource:** `form-labels` for all labels (central maintenance)

---

### hero_teaser_6 ✅
**Status:** Done | **Datum:** 2026-02-05

Hero mit integriertem Inline-Anfrageformular. Klick auf "Anfragen" leitet zu `/anfragen/?` mit URL-Parametern weiter.

- **background_image** (asset) — Vollbild-Hintergrundbild
- **title** (text) — H1: Nur Text änderbar, kein Styling
- **form_title** (text) — Text über dem Formular (z.B. "Jetzt kostenlos anfragen!")
- **teaser_form** (blocks: teaser_form, max 1) — Inline-Formular

### teaser_form ✅
**Status:** Done | **Typ:** Nested Block | **Datum:** 2026-02-05

Inline-Formular für hero_teaser_6. Feldlabels kommen aus `form-labels` Datasource.

- **target_url** (text) — Ziel-URL (default: `/anfragen/`)
- **button_text** (text) — Button-Text (default: "Anfragen")

**Felder (im Template):**
- Abreiseort → `?departure=...`
- Reiseziel → `?destination=...`
- Personenanzahl (min. 6) → `?passengers=...`

**Datasource Labels:**
- `teaser_departure` = "Abreiseort eingeben"
- `teaser_destination` = "Reiseziel eingeben"
- `teaser_passengers` = "Mindestanzahl 6 Personen"

### icon_and_link ✅
**Status:** Done | **Typ:** Nested Block

- **icon** (asset) — Icon image
- **label** (text) — Link text
- **url** (multilink) — Target URL (e.g. mailto:, tel:)


- **title** (text) — Überschrift
- **body** (richtext) — Inhalt

