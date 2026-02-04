# Storyblok Configuration Backup

Versionierte Backups der Storyblok Space-Konfiguration.

## Dateien

- `components.json` — Alle Component-Schemas (Blöcke + Felder)

## Backup erstellen

```bash
curl -s "https://mapi.storyblok.com/v1/spaces/290276210045571/components" \
  -H "Authorization: $STORYBLOK_MANAGEMENT_TOKEN" | \
  node -e "
    const data = require('/dev/stdin');
    const clean = data.components.map(c => ({
      name: c.name,
      display_name: c.display_name,
      is_root: c.is_root,
      is_nestable: c.is_nestable,
      schema: c.schema
    }));
    console.log(JSON.stringify({ 
      exported_at: new Date().toISOString(), 
      space_id: 290276210045571, 
      components: clean 
    }, null, 2));
  " > components.json
```

## Restore (manuell)

Die Storyblok Management API erlaubt `PUT /components/:id` zum Aktualisieren.
Bei größeren Restores: Storyblok CLI oder manuelles Re-Import im UI.

## Changelog

- **2026-02-04:** Initial backup nach cta_button Refactoring
