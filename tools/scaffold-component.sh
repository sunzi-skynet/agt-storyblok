#!/bin/bash
# scaffold-component.sh - Scaffold a new Storyblok component
# Usage: ./scaffold-component.sh component_name "Display Name"
# Example: ./scaffold-component.sh cta_banner "CTA Banner"

set -e

# Load credentials
source "$(dirname "$0")/load-env.sh"

COMPONENT_NAME="$1"
DISPLAY_NAME="${2:-$1}"

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: $0 component_name [display_name]"
  exit 1
fi

# Paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$PROJECT_DIR/frontend"
STORYBLOK_DIR="$FRONTEND_DIR/app/storyblok"
PLUGIN_FILE="$FRONTEND_DIR/app/plugins/storyblok.ts"
REGISTRY_FILE="$PROJECT_DIR/content-model-registry.md"

# Convert names
PASCAL_CASE=$(echo "$COMPONENT_NAME" | sed -r 's/(^|_)([a-z])/\U\2/g')
KEBAB_CASE=$(echo "$COMPONENT_NAME" | sed 's/_/-/g')

# Storyblok credentials (from .env.local)
SPACE_ID="$STORYBLOK_SPACE_ID"
MGMT_TOKEN="$STORYBLOK_MGMT_TOKEN"

echo "🔧 Scaffolding: $COMPONENT_NAME"
echo "   PascalCase: $PASCAL_CASE"
echo "   kebab-case: $KEBAB_CASE"
echo ""

# 1. Check if component already exists
if [ -f "$STORYBLOK_DIR/${PASCAL_CASE}.vue" ]; then
  echo "⚠️  Vue component already exists: ${PASCAL_CASE}.vue"
else
  # 2. Create Vue component boilerplate
  echo "📄 Creating Vue component..."
  cat > "$STORYBLOK_DIR/${PASCAL_CASE}.vue" << 'VUEEOF'
<template>
  <section v-editable="blok" class="KEBAB_CLASS">
    <div class="KEBAB_CLASS__container">
      <!-- TODO: Implement component -->
      <pre>{{ blok }}</pre>
    </div>
  </section>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.KEBAB_CLASS {
  padding: 64px 0;
}

.KEBAB_CLASS__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
VUEEOF

  # Replace placeholder with actual class name
  sed -i "s/KEBAB_CLASS/$KEBAB_CASE/g" "$STORYBLOK_DIR/${PASCAL_CASE}.vue"
  echo "   ✓ Created: $STORYBLOK_DIR/${PASCAL_CASE}.vue"
fi

# 3. Check if already in plugin
if grep -q "'$KEBAB_CASE'" "$PLUGIN_FILE" 2>/dev/null; then
  echo "⚠️  Already registered in plugin: $KEBAB_CASE"
else
  echo "📝 Updating plugin registration..."
  echo ""
  echo "   ⚠️  Manual step required!"
  echo "   Add to $PLUGIN_FILE:"
  echo ""
  echo "   Import: import ${PASCAL_CASE} from '../storyblok/${PASCAL_CASE}.vue'"
  echo "   Register: vueApp.component('$KEBAB_CASE', $PASCAL_CASE)"
  echo ""
fi

# 4. Create Storyblok schema (if not exists)
echo "🌐 Checking Storyblok schema..."
EXISTING=$(curl -s "https://mapi.storyblok.com/v1/spaces/$SPACE_ID/components" \
  -H "Authorization: $MGMT_TOKEN" | grep -o "\"name\":\"$COMPONENT_NAME\"" || true)

if [ -n "$EXISTING" ]; then
  echo "⚠️  Storyblok schema already exists: $COMPONENT_NAME"
else
  echo "   Creating Storyblok schema..."
  RESPONSE=$(curl -s -X POST "https://mapi.storyblok.com/v1/spaces/$SPACE_ID/components" \
    -H "Authorization: $MGMT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"component\": {
        \"name\": \"$COMPONENT_NAME\",
        \"display_name\": \"$DISPLAY_NAME\",
        \"is_nestable\": true,
        \"schema\": {
          \"title\": {\"type\": \"text\", \"pos\": 0},
          \"body\": {\"type\": \"richtext\", \"pos\": 1}
        }
      }
    }")
  
  if echo "$RESPONSE" | grep -q '"name"'; then
    echo "   ✓ Created Storyblok schema"
  else
    echo "   ⚠️  Schema creation response: $RESPONSE"
  fi
fi

# 5. Update registry
if grep -q "### $COMPONENT_NAME" "$REGISTRY_FILE" 2>/dev/null; then
  echo "⚠️  Already in registry: $COMPONENT_NAME"
else
  echo "📋 Adding to registry..."
  cat >> "$REGISTRY_FILE" << EOF

### $COMPONENT_NAME
**Status:** In Progress | **Trello:** TBD

- **title** (text) — Überschrift
- **body** (richtext) — Inhalt

EOF
  echo "   ✓ Added to registry"
fi

echo ""
echo "✅ Scaffold complete!"
echo ""
echo "Next steps:"
echo "1. Edit the Vue component: $STORYBLOK_DIR/${PASCAL_CASE}.vue"
echo "2. Update Storyblok schema if needed (via UI or API)"
echo "3. Run: ./test-component.sh $COMPONENT_NAME"
