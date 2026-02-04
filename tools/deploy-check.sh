#!/bin/bash
# deploy-check.sh - Push, wait for Vercel, test live site
#
# Usage: 
#   ./deploy-check.sh [component_name]
#   ./deploy-check.sh [component_name] --scroll-to .css-selector
#   ./deploy-check.sh [component_name] --skip-push
#
# Options:
#   --scroll-to SELECTOR   Scroll to element before screenshot
#   --skip-push            Skip git push (already pushed)
#   --timeout SECONDS      Max wait time (default: 180)

set -e

# Load credentials
source "$(dirname "$0")/load-env.sh"

COMPONENT_NAME=""
SCROLL_SELECTOR=""
SKIP_PUSH=false
LIVE_URL="https://agt-storyblok.vercel.app"
MAX_WAIT=180  # 3 minutes default
POLL_INTERVAL=10

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --scroll-to)
      SCROLL_SELECTOR="$2"
      shift 2
      ;;
    --skip-push)
      SKIP_PUSH=true
      shift
      ;;
    --timeout)
      MAX_WAIT="$2"
      shift 2
      ;;
    *)
      COMPONENT_NAME="$1"
      shift
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$PROJECT_DIR/frontend"
SCREENSHOTS_DIR="$SCRIPT_DIR/screenshots"

mkdir -p "$SCREENSHOTS_DIR"

echo "🚀 Deploy Check"
echo "   URL: $LIVE_URL"
echo "   Timeout: ${MAX_WAIT}s"
[ -n "$SCROLL_SELECTOR" ] && echo "   Scroll to: $SCROLL_SELECTOR"
echo ""

# 1. Git push (unless skipped)
if [ "$SKIP_PUSH" = false ]; then
  echo "📤 Pushing to GitHub..."
  cd "$FRONTEND_DIR"
  git add -A
  if git diff --cached --quiet; then
    echo "   No changes to commit"
  else
    git commit -m "deploy: update components" --quiet
  fi
  git push origin main --quiet 2>&1
  echo "   ✓ Pushed"
else
  echo "📤 Skipping push (--skip-push)"
fi

# 2. Get current page hash for comparison
echo "⏳ Waiting for Vercel deployment..."
OLD_HASH=$(curl -s --max-time 10 "$LIVE_URL" 2>/dev/null | md5sum | cut -d' ' -f1)
INITIAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$LIVE_URL" 2>/dev/null)

if [ "$INITIAL_STATUS" != "200" ]; then
  echo "   ⚠️  Site returning $INITIAL_STATUS - may be down"
fi

# Poll until content changes or timeout
ELAPSED=0
CONSECUTIVE_ERRORS=0
MAX_ERRORS=5

while [ $ELAPSED -lt $MAX_WAIT ]; do
  sleep $POLL_INTERVAL
  ELAPSED=$((ELAPSED + POLL_INTERVAL))
  
  # Check HTTP status
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$LIVE_URL" 2>/dev/null || echo "000")
  
  if [ "$HTTP_STATUS" = "000" ]; then
    CONSECUTIVE_ERRORS=$((CONSECUTIVE_ERRORS + 1))
    echo "   ... network error (${ELAPSED}s) [$CONSECUTIVE_ERRORS/$MAX_ERRORS]"
    
    if [ $CONSECUTIVE_ERRORS -ge $MAX_ERRORS ]; then
      echo "   ❌ Too many network errors - aborting"
      exit 1
    fi
    continue
  fi
  
  if [ "$HTTP_STATUS" = "500" ] || [ "$HTTP_STATUS" = "502" ] || [ "$HTTP_STATUS" = "503" ]; then
    echo "   ... deployment in progress (HTTP $HTTP_STATUS, ${ELAPSED}s)"
    CONSECUTIVE_ERRORS=0
    continue
  fi
  
  if [ "$HTTP_STATUS" != "200" ]; then
    echo "   ⚠️  Unexpected status: $HTTP_STATUS"
  fi
  
  CONSECUTIVE_ERRORS=0
  NEW_HASH=$(curl -s --max-time 10 "$LIVE_URL" 2>/dev/null | md5sum | cut -d' ' -f1)
  
  if [ "$NEW_HASH" != "$OLD_HASH" ]; then
    echo "   ✓ Deployment detected after ${ELAPSED}s"
    # Wait a bit more for assets to propagate
    sleep 3
    break
  fi
  
  echo "   ... waiting (${ELAPSED}s)"
done

if [ $ELAPSED -ge $MAX_WAIT ]; then
  echo ""
  echo "   ⚠️  Timeout after ${MAX_WAIT}s"
  echo "   Possible causes:"
  echo "   - No changes to deploy"
  echo "   - Build failed (check Vercel dashboard)"
  echo "   - Vercel queue delay"
  echo ""
  read -p "   Continue anyway? [y/N] " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "   Aborted."
    exit 1
  fi
fi

# 3. Test specific component if provided
if [ -n "$COMPONENT_NAME" ]; then
  KEBAB_CASE=$(echo "$COMPONENT_NAME" | sed 's/_/-/g')
  echo ""
  echo "🔍 Checking component: $COMPONENT_NAME"
  
  RESPONSE=$(curl -s --max-time 10 "$LIVE_URL")
  
  if echo "$RESPONSE" | grep -qi "$KEBAB_CASE\|$COMPONENT_NAME"; then
    echo "   ✓ Component found on live site"
  else
    echo "   ⚠️  Component class not found (may still render)"
  fi
fi

# 4. Take screenshot
echo ""
echo "📸 Taking screenshot..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Build filename
if [ -n "$COMPONENT_NAME" ]; then
  SCREENSHOT_FILE="$SCREENSHOTS_DIR/${COMPONENT_NAME}-$TIMESTAMP.png"
else
  SCREENSHOT_FILE="$SCREENSHOTS_DIR/live-$TIMESTAMP.png"
fi

# Build API URL with optional scroll selector
API_PARAMS="access_key=$SCREENSHOT_API_KEY&url=$LIVE_URL&viewport_width=1440&full_page=true&delay=3&format=png"

if [ -n "$SCROLL_SELECTOR" ]; then
  # URL-encode the selector
  ENCODED_SELECTOR=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SCROLL_SELECTOR'))" 2>/dev/null || echo "$SCROLL_SELECTOR" | sed 's/#/%23/g; s/\./%2E/g; s/ /%20/g')
  API_PARAMS="$API_PARAMS&scroll_into_view=$ENCODED_SELECTOR"
  echo "   Scrolling to: $SCROLL_SELECTOR"
fi

SCREENSHOT_URL="https://api.screenshotone.com/take?$API_PARAMS"

if curl -s --max-time 30 "$SCREENSHOT_URL" -o "$SCREENSHOT_FILE"; then
  SIZE=$(du -h "$SCREENSHOT_FILE" | cut -f1)
  if [ "$SIZE" != "0" ] && [ -s "$SCREENSHOT_FILE" ]; then
    echo "   ✓ Screenshot saved: $SCREENSHOT_FILE ($SIZE)"
  else
    echo "   ⚠️  Screenshot may be empty (API limit?)"
    rm -f "$SCREENSHOT_FILE"
  fi
else
  echo "   ⚠️  Screenshot failed"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deploy check complete"
echo "   Live: $LIVE_URL"
[ -f "$SCREENSHOT_FILE" ] && echo "   Screenshot: $SCREENSHOT_FILE"
