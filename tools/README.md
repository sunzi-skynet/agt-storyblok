# AGT Visual Comparison Tools

## Setup (einmalig auf deinem Host)

```bash
cd tools
npm install
npx playwright install chromium
```

## Screenshots erstellen

```bash
# Desktop nur (schnell)
node compare.js

# Alle Viewports
node compare.js all

# Spezifisch
node compare.js mobile
node compare.js tablet
```

Screenshots landen in `tools/screenshots/`:
- `original-desktop.png` — agtlogistik.de
- `clone-desktop.png` — agt-storyblok.vercel.app

## Workflow

1. Du führst `node compare.js` auf deinem Host aus
2. Screenshots landen in `tools/screenshots/`
3. Ich kann die Screenshots lesen und vergleichen
4. Oder du schaust selbst kurz drauf

---

*Läuft nicht im Docker wegen fehlender Browser-Libs.*
