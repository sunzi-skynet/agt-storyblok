# Workflow Changelog & Fehler-Log

## Anleitung für zukünftigen Sunzi

**VOR jedem Workflow-Run:**
1. Diese Datei lesen
2. Bekannte Fehler/Workarounds beachten
3. Nach dem Run: Neue Erkenntnisse hier dokumentieren

---

## Run History

### Run #1 — 2026-02-03 (client_logos)
- **Status:** ✅ COMPLETE
- **Komponente:** client_logos (Partner & Sponsorship Section)
- **Ergebnis:** Build PASS ✅, Render PASS ✅, Deploy PASS ✅
- **Screenshot:** `screenshots/client_logos-20260203-123016.png`
- **Fehler gefunden:** test-component.sh hatte Henne-Ei-Problem (siehe unten)
- **Fix:** Script in --build und --render Modi aufgeteilt
- **Hinweis:** Logos im Content sind Platzhalter - echte Assets müssen noch hochgeladen werden

### Run #2 — 2026-02-03 (accordion)
- **Status:** ✅ COMPLETE
- **Komponente:** accordion + accordion_item (FAQ/Collapse-Sektion)
- **Ergebnis:** Build PASS ✅, Render PASS ✅, Deploy PASS ✅
- **Screenshot:** `screenshots/live-20260203-125748.png`
- **Features:** Click expand/collapse, smooth animation, icons optional, allow_multiple toggle

### Run #3 — 2026-02-03 (hero_teaser redesign)
- **Status:** ✅ COMPLETE
- **Komponente:** hero_teaser (komplett neu) + cta_button (neu)
- **Ergebnis:** Build PASS ✅, Deploy PASS ✅
- **Workflow:** Original-Bild direkt geliefert → Scaffold übersprungen → Schema updated
- **Features:** Mobile toggle button für left/right content, CTAs als nested blocks
- **Learnings:**
  - Flexible Einstiegspunkte sind wichtig (nicht immer bei 0 starten)
  - Schema-Migration: Alte Felder durch neue ersetzen erfordert Content-Update
  - Vercel-Polling braucht besseres Error-Handling (implementiert)

---

## Workflow-Regeln

### ⚠️ Content 1:1 vom Original übernehmen!
**Problem:** Test-Content (Platzhalter-Texte) macht Vergleich schwieriger und muss später sowieso ersetzt werden.

**Lösung:** Beim Anlegen von Storyblok-Content:
1. Original-Seite öffnen (URL aus Ticket)
2. Echten Text, Bilder, Links kopieren
3. 1:1 in Storyblok-Felder eintragen

Das spart Zeit und der Vergleich Original vs. Clone ist aussagekräftiger.

---

## Bekannte Probleme & Workarounds

### ✅ GELÖST: Test-Script Henne-Ei-Problem
**Problem:** `test-component.sh` prüfte ob Komponente auf der Seite rendert, aber Content wurde erst später angelegt → Test konnte nie PASS sein.

**Lösung:** Script in zwei Modi aufgeteilt:
```bash
./test-component.sh component_name --build   # Phase 1: Kompiliert es?
./test-component.sh component_name --render  # Phase 2: Rendert es?
```

**Neuer Workflow:**
1. **`./capture-original.sh component`** → Screenshot vom Original, ans Ticket hängen
2. Scaffold
3. Plugin-Registrierung  
4. Vue implementieren
5. `--build` Test → Fängt Syntax/Import-Fehler
6. Content in Storyblok anlegen
7. `--render` Test → Fängt Registrierungs-Fehler
8. Deploy & Screenshot
9. **Vergleich: Original vs. Neu** → Bei Abweichungen: Fehler korrigieren, nochmal ab Schritt 4

### ⚠️ VOR Scaffold: Original-Seite prüfen!
**Problem:** `stats_bar` existierte nicht auf agtlogistik.de - Zeitverschwendung.

**Lösung:** Immer erst prüfen ob Komponente auf Original existiert bevor Scaffold.

---

### ✅ NEU: trello-update.sh (2026-02-03)
**Hinzugefügt:** Script zum automatischen Trello-Update nach Deploy.

```bash
./trello-update.sh component_name [screenshot_path]
```

- Findet Karte by Name (oder erstellt neue)
- Verschiebt nach 👀 Review
- **Lädt Screenshot als Attachment hoch** (nicht nur Pfad!)
- **Setzt Screenshot als Card Cover** für Vorschau im Board
- Fügt Kommentar mit Timestamp hinzu

---

### ✅ NEU: capture-original.sh (2026-02-03)
**Hinzugefügt:** Erster Schritt im Workflow - Original-Referenz erfassen.

```bash
./capture-original.sh accordion --url https://www.agtlogistik.de/leistungen
./capture-original.sh hero_teaser --selector .hero-section
```

- Screenshot vom Original erstellen
- Als "ORIGINAL-..." Attachment ans Trello-Ticket hängen
- Kommentar mit Referenz-URL + Selector hinzufügen
- Ticket automatisch nach "In Progress" verschieben
- **Wichtig für Qualitätskontrolle am Ende!**

---

### ✅ NEU: Workflow-Optimierungen (2026-02-03)

**1. test-component.sh: --slug Parameter**
```bash
# Test auf spezifischer Seite statt Homepage
./test-component.sh accordion --render --slug test-accordion
```

**2. deploy-check.sh: --scroll-to Parameter**
```bash
# Screenshot scrollt zur Komponente
./deploy-check.sh accordion --scroll-to .accordion
```

**3. Storyblok-Warnungen gefiltert**
- "Component could not be found" wird nicht mehr angezeigt
- Reduziert Noise bei Tests

---

## Verbesserungsideen

- [ ] scaffold-component.sh könnte automatisch prüfen ob Schema schon existiert (tut es teilweise)
- [ ] README mit neuem Workflow aktualisieren
- [x] Trello-Update automatisieren → trello-update.sh
- [x] --slug Parameter für test-component.sh
- [x] --scroll-to Parameter für deploy-check.sh
- [x] Storyblok-Warnungen filtern
- [x] Vercel Polling mit Timeout + Error-Handling
- [x] check-schema.sh für Vue/Storyblok-Vergleich
- [x] Flexible Einstiegspunkte dokumentiert

