#!/bin/bash
# backup-schema.sh - Backup Storyblok component schemas
# Usage: ./backup-schema.sh

set -e

# Load credentials
source "$(dirname "$0")/load-env.sh"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$FRONTEND_DIR/storyblok-config/components.json"

echo "📦 Backing up Storyblok schema..."
echo "   Space: $STORYBLOK_SPACE_ID"
echo ""

curl -s "https://mapi.storyblok.com/v1/spaces/$STORYBLOK_SPACE_ID/components" \
  -H "Authorization: $STORYBLOK_MGMT_TOKEN" | \
  node -e "
    const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
    const clean = data.components.map(c => ({
      name: c.name,
      display_name: c.display_name,
      is_root: c.is_root,
      is_nestable: c.is_nestable,
      schema: c.schema
    }));
    console.log(JSON.stringify({ 
      exported_at: new Date().toISOString(), 
      space_id: '$STORYBLOK_SPACE_ID', 
      components: clean 
    }, null, 2));
  " > "$OUTPUT_FILE"

COMPONENT_COUNT=$(cat "$OUTPUT_FILE" | grep -c '"name":' || echo "0")
echo "✅ Backup complete: $OUTPUT_FILE"
echo "   Components: $COMPONENT_COUNT"
