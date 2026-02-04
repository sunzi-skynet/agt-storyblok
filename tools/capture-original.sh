#!/bin/bash
# capture-original.sh - Screenshot Original-Seite und an Trello-Ticket hängen
#
# Usage: 
#   ./capture-original.sh component_name [--url URL] [--selector CSS]
#
# Examples:
#   ./capture-original.sh accordion
#   ./capture-original.sh accordion --url https://www.agtlogistik.de/leistungen
#   ./capture-original.sh accordion --url https://www.agtlogistik.de/leistungen --selector .accordion-section
#
# Wird automatisch:
#   1. Screenshot der Original-Seite erstellen
#   2. Als "Original" Attachment ans Trello-Ticket hängen
#   3. Kommentar mit Link zur Referenz hinzufügen
#   4. Ticket nach "In Progress" verschieben

set -e

COMPONENT_NAME=""
ORIGINAL_URL="https://www.agtlogistik.de"
SELECTOR=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --url)
      ORIGINAL_URL="$2"
      shift 2
      ;;
    --selector)
      SELECTOR="$2"
      shift 2
      ;;
    *)
      COMPONENT_NAME="$1"
      shift
      ;;
  esac
done

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: $0 component_name [--url URL] [--selector CSS]"
  echo ""
  echo "Options:"
  echo "  --url URL        Original page URL (default: https://www.agtlogistik.de)"
  echo "  --selector CSS   CSS selector to scroll to before screenshot"
  echo ""
  echo "Examples:"
  echo "  $0 accordion --url https://www.agtlogistik.de/leistungen"
  echo "  $0 hero_teaser --selector .hero-section"
  exit 1
fi

# Load credentials
source "$(dirname "$0")/load-env.sh"

# Trello credentials (from .env.local)
BOARD_ID="$TRELLO_BOARD_ID"

# List IDs
BACKLOG_ID="69813e1219b1e5ca8bf09dc2"
IN_PROGRESS_ID="69813e11e548327334319a1c"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCREENSHOTS_DIR="$SCRIPT_DIR/screenshots"

mkdir -p "$SCREENSHOTS_DIR"

echo "📸 Capture Original: $COMPONENT_NAME"
echo "   URL: $ORIGINAL_URL"
[ -n "$SELECTOR" ] && echo "   Selector: $SELECTOR"
echo ""

# 1. Find Trello card
echo "🔍 Finding Trello card..."
CARD_ID=$(curl -s "https://api.trello.com/1/boards/$BOARD_ID/cards?key=$TRELLO_KEY&token=$TRELLO_TOKEN" | \
  python3 -c "
import json, sys
cards = json.load(sys.stdin)
for c in cards:
    if c['name'].lower() == '$COMPONENT_NAME'.lower():
        print(c['id'])
        break
")

if [ -z "$CARD_ID" ]; then
  echo "   ❌ Card not found: $COMPONENT_NAME"
  echo "   Create the card in Trello first, or check the name."
  exit 1
fi
echo "   ✓ Found: $CARD_ID"

# 2. Move to In Progress
echo "📤 Moving to In Progress..."
curl -s -X PUT "https://api.trello.com/1/cards/$CARD_ID?idList=$IN_PROGRESS_ID&key=$TRELLO_KEY&token=$TRELLO_TOKEN" > /dev/null
echo "   ✓ Moved to 🔧 In Progress"

# 3. Take screenshot of original
echo "📷 Taking screenshot of original..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
SCREENSHOT_FILE="$SCREENSHOTS_DIR/original-${COMPONENT_NAME}-${TIMESTAMP}.png"

# Build API URL
API_PARAMS="access_key=$SCREENSHOT_API_KEY&url=$(echo "$ORIGINAL_URL" | sed 's/&/%26/g')&viewport_width=1440&full_page=true&delay=3&format=png"

if [ -n "$SELECTOR" ]; then
  ENCODED_SELECTOR=$(echo "$SELECTOR" | sed 's/#/%23/g; s/\./%2E/g; s/ /%20/g')
  API_PARAMS="$API_PARAMS&scroll_into_view=$ENCODED_SELECTOR"
fi

SCREENSHOT_URL="https://api.screenshotone.com/take?$API_PARAMS"

if curl -s "$SCREENSHOT_URL" -o "$SCREENSHOT_FILE"; then
  SIZE=$(du -h "$SCREENSHOT_FILE" | cut -f1)
  if [ -s "$SCREENSHOT_FILE" ]; then
    echo "   ✓ Screenshot: $SCREENSHOT_FILE ($SIZE)"
  else
    echo "   ❌ Screenshot empty"
    rm -f "$SCREENSHOT_FILE"
    exit 1
  fi
else
  echo "   ❌ Screenshot failed"
  exit 1
fi

# 4. Upload to Trello as attachment
echo "📎 Uploading to Trello..."
FILENAME="ORIGINAL-$(basename "$SCREENSHOT_FILE")"

UPLOAD_RESULT=$(curl -s -X POST "https://api.trello.com/1/cards/$CARD_ID/attachments?key=$TRELLO_KEY&token=$TRELLO_TOKEN" \
  -F "file=@$SCREENSHOT_FILE" \
  -F "name=$FILENAME")

if echo "$UPLOAD_RESULT" | grep -q '"id"'; then
  echo "   ✓ Uploaded as: $FILENAME"
else
  echo "   ⚠️ Upload failed"
fi

# 5. Add comment with reference link
echo "💬 Adding reference comment..."
TIMESTAMP_NICE=$(date '+%Y-%m-%d %H:%M UTC')

COMMENT="🎯 **Original-Referenz** ($TIMESTAMP_NICE)

**URL:** $ORIGINAL_URL"

if [ -n "$SELECTOR" ]; then
  COMMENT="$COMMENT
**Element:** \`$SELECTOR\`"
fi

COMMENT="$COMMENT

---
Screenshot vom Original angehängt. Bitte am Ende des Workflows vergleichen!"

curl -s -X POST "https://api.trello.com/1/cards/$CARD_ID/actions/comments?key=$TRELLO_KEY&token=$TRELLO_TOKEN" \
  --data-urlencode "text=$COMMENT" > /dev/null
echo "   ✓ Reference comment added"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Original captured: $COMPONENT_NAME"
echo "   Card: https://trello.com/c/$CARD_ID"
echo ""
echo "Next: Implement the component, then run:"
echo "   ./test-component.sh $COMPONENT_NAME --build"
