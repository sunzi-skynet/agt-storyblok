#!/bin/bash
# check-schema.sh - Compare Vue props with Storyblok schema
#
# Usage: ./check-schema.sh component_name
#
# Checks if the Vue component's TypeScript interface matches
# the Storyblok component schema. Warns about mismatches.

set -e

# Load credentials
source "$(dirname "$0")/load-env.sh"

COMPONENT_NAME="$1"

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: ./check-schema.sh component_name"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Convert to PascalCase for Vue filename
PASCAL_CASE=$(echo "$COMPONENT_NAME" | sed -r 's/(^|_)([a-z])/\U\2/g')
VUE_FILE="$FRONTEND_DIR/app/storyblok/${PASCAL_CASE}.vue"

# Storyblok API (from .env.local)
SPACE_ID="$STORYBLOK_SPACE_ID"
MGMT_TOKEN="$STORYBLOK_MGMT_TOKEN"

echo "🔍 Schema Check: $COMPONENT_NAME"
echo ""

# 1. Check Vue file exists
if [ ! -f "$VUE_FILE" ]; then
  echo "❌ Vue file not found: $VUE_FILE"
  exit 1
fi
echo "✓ Vue file: $VUE_FILE"

# 2. Get Storyblok schema
echo "📡 Fetching Storyblok schema..."
SCHEMA_JSON=$(curl -s "https://mapi.storyblok.com/v1/spaces/$SPACE_ID/components?search=$COMPONENT_NAME" \
  -H "Authorization: $MGMT_TOKEN")

COMPONENT_ID=$(echo "$SCHEMA_JSON" | node -e "
const d=require('fs').readFileSync(0,'utf8');
const r=JSON.parse(d);
const c = r.components?.find(c => c.name === '$COMPONENT_NAME');
if (c) console.log(c.id);
")

if [ -z "$COMPONENT_ID" ]; then
  echo "❌ Storyblok component not found: $COMPONENT_NAME"
  exit 1
fi

# Get full schema
FULL_SCHEMA=$(curl -s "https://mapi.storyblok.com/v1/spaces/$SPACE_ID/components/$COMPONENT_ID" \
  -H "Authorization: $MGMT_TOKEN")

echo "✓ Storyblok component ID: $COMPONENT_ID"
echo ""

# 3. Extract and compare fields
echo "📋 Field comparison:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "%-20s %-15s %-15s %s\n" "FIELD" "STORYBLOK" "VUE" "STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Extract Storyblok fields
SB_FIELDS=$(echo "$FULL_SCHEMA" | node -e "
const d=require('fs').readFileSync(0,'utf8');
const r=JSON.parse(d);
const schema = r.component?.schema || {};
Object.keys(schema).forEach(k => {
  console.log(k + ':' + schema[k].type);
});
")

# Extract Vue props (simplified - looks for field names in blok interface)
VUE_CONTENT=$(cat "$VUE_FILE")

WARNINGS=0
ERRORS=0

while IFS=: read -r field type; do
  [ -z "$field" ] && continue
  
  # Check if field exists in Vue file
  if echo "$VUE_CONTENT" | grep -q "$field"; then
    VUE_STATUS="found"
    STATUS="✓"
  else
    VUE_STATUS="missing"
    STATUS="⚠️"
    WARNINGS=$((WARNINGS + 1))
  fi
  
  printf "%-20s %-15s %-15s %s\n" "$field" "$type" "$VUE_STATUS" "$STATUS"
done <<< "$SB_FIELDS"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $WARNINGS -gt 0 ]; then
  echo "⚠️  $WARNINGS field(s) in Storyblok but not referenced in Vue"
  echo "   (May be intentional if field is optional)"
else
  echo "✅ All Storyblok fields referenced in Vue component"
fi
