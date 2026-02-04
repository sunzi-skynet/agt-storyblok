#!/bin/bash
# trello-update.sh - Move card to Review, add comment, and upload screenshot
# Usage: ./trello-update.sh component_name [screenshot_path]
# Example: ./trello-update.sh client_logos tools/screenshots/client_logos-20260203.png

set -e

# Load credentials
source "$(dirname "$0")/load-env.sh"

COMPONENT_NAME="$1"
SCREENSHOT_PATH="$2"

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: $0 component_name [screenshot_path]"
  exit 1
fi

# Trello credentials (from .env.local)
BOARD_ID="$TRELLO_BOARD_ID"

# List IDs (from board)
BACKLOG_ID="69813e1219b1e5ca8bf09dc2"
IN_PROGRESS_ID="69813e11e548327334319a1c"
REVIEW_ID="69813e11656a2f607bfbfda3"
DONE_ID="69813e119454490f5a7a018c"

LIVE_URL="https://agt-storyblok.vercel.app"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "📋 Trello Update: $COMPONENT_NAME"
echo ""

# 1. Find card by name (search in all lists)
echo "🔍 Finding card..."
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
  echo "   Creating new card in Review..."
  
  CARD_ID=$(curl -s -X POST "https://api.trello.com/1/cards?key=$TRELLO_KEY&token=$TRELLO_TOKEN" \
    --data-urlencode "name=$COMPONENT_NAME" \
    --data-urlencode "idList=$REVIEW_ID" | \
    python3 -c "import json,sys; print(json.load(sys.stdin)['id'])")
  
  echo "   ✓ Created card: $CARD_ID"
else
  echo "   ✓ Found card: $CARD_ID"
  
  # 2. Move to Review
  echo "📤 Moving to Review..."
  curl -s -X PUT "https://api.trello.com/1/cards/$CARD_ID?idList=$REVIEW_ID&key=$TRELLO_KEY&token=$TRELLO_TOKEN" > /dev/null
  echo "   ✓ Moved to 👀 Review"
fi

# 3. Upload screenshot as attachment (if provided and exists)
SCREENSHOT_UPLOADED=false
if [ -n "$SCREENSHOT_PATH" ]; then
  # Resolve path (could be relative or absolute)
  if [[ "$SCREENSHOT_PATH" = /* ]]; then
    FULL_PATH="$SCREENSHOT_PATH"
  else
    FULL_PATH="$PROJECT_DIR/$SCREENSHOT_PATH"
  fi
  
  if [ -f "$FULL_PATH" ]; then
    echo "📎 Uploading screenshot..."
    FILENAME=$(basename "$SCREENSHOT_PATH")
    
    UPLOAD_RESULT=$(curl -s -X POST "https://api.trello.com/1/cards/$CARD_ID/attachments?key=$TRELLO_KEY&token=$TRELLO_TOKEN" \
      -F "file=@$FULL_PATH" \
      -F "name=$FILENAME")
    
    if echo "$UPLOAD_RESULT" | grep -q '"id"'; then
      echo "   ✓ Screenshot uploaded: $FILENAME"
      SCREENSHOT_UPLOADED=true
      
      # Set as cover if it's an image
      ATTACHMENT_ID=$(echo "$UPLOAD_RESULT" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))")
      if [ -n "$ATTACHMENT_ID" ]; then
        curl -s -X PUT "https://api.trello.com/1/cards/$CARD_ID?idAttachmentCover=$ATTACHMENT_ID&key=$TRELLO_KEY&token=$TRELLO_TOKEN" > /dev/null
        echo "   ✓ Set as card cover"
      fi
    else
      echo "   ⚠️ Upload failed: $UPLOAD_RESULT"
    fi
  else
    echo "   ⚠️ Screenshot not found: $FULL_PATH"
  fi
fi

# 4. Add comment
echo "💬 Adding comment..."
TIMESTAMP=$(date '+%Y-%m-%d %H:%M UTC')

COMMENT="✅ Workflow komplett ($TIMESTAMP)

- Build: PASS
- Render: PASS  
- Deploy: Live auf $LIVE_URL"

if [ "$SCREENSHOT_UPLOADED" = true ]; then
  COMMENT="$COMMENT
- Screenshot: angehängt ☝️"
fi

curl -s -X POST "https://api.trello.com/1/cards/$CARD_ID/actions/comments?key=$TRELLO_KEY&token=$TRELLO_TOKEN" \
  --data-urlencode "text=$COMMENT" > /dev/null
echo "   ✓ Comment added"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Trello updated: $COMPONENT_NAME → Review"
echo "   https://trello.com/c/$CARD_ID"
