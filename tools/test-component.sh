#!/bin/bash
# test-component.sh - Build and test if a component renders
#
# Usage: 
#   ./test-component.sh component_name [--build]              # Only build (default)
#   ./test-component.sh component_name --render               # Build + check homepage
#   ./test-component.sh component_name --render --slug test   # Check specific page
#
# Examples:
#   ./test-component.sh booking_form                    # Quick build test
#   ./test-component.sh booking_form --build            # Same as above
#   ./test-component.sh booking_form --render           # Full test on homepage
#   ./test-component.sh accordion --render --slug test-accordion  # Test specific page

set -e

COMPONENT_NAME="$1"
MODE="--build"
SLUG=""
PORT="3000"

# Parse arguments
shift || true
while [[ $# -gt 0 ]]; do
  case $1 in
    --build)
      MODE="--build"
      shift
      ;;
    --render)
      MODE="--render"
      shift
      ;;
    --slug)
      SLUG="$2"
      shift 2
      ;;
    *)
      PORT="$1"
      shift
      ;;
  esac
done

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: $0 component_name [--build|--render] [--slug page-slug] [port]"
  echo ""
  echo "Modes:"
  echo "  --build         Only test if project builds (default)"
  echo "  --render        Build + check if component renders on page"
  echo ""
  echo "Options:"
  echo "  --slug NAME     Check specific page instead of homepage (e.g. --slug test-accordion)"
  echo ""
  echo "Examples:"
  echo "  $0 accordion --build"
  echo "  $0 accordion --render"
  echo "  $0 accordion --render --slug test-accordion"
  exit 1
fi

# Paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Convert names
KEBAB_CASE=$(echo "$COMPONENT_NAME" | sed 's/_/-/g')
PASCAL_CASE=$(echo "$COMPONENT_NAME" | sed -r 's/(^|_)([a-z])/\U\2/g')

# Build test URL
if [ -n "$SLUG" ]; then
  TEST_URL="http://localhost:$PORT/$SLUG"
  PAGE_INFO="page: /$SLUG"
else
  TEST_URL="http://localhost:$PORT/"
  PAGE_INFO="homepage"
fi

echo "🧪 Testing component: $COMPONENT_NAME"
echo "   Mode: $MODE"
[ -n "$SLUG" ] && echo "   Slug: $SLUG"
echo ""

# ═══════════════════════════════════════════
# PHASE 1: BUILD TEST
# ═══════════════════════════════════════════

echo "📦 Phase 1: Build test..."
cd "$FRONTEND_DIR"

# Check if Vue file exists
VUE_FILE="app/storyblok/${PASCAL_CASE}.vue"
if [ ! -f "$VUE_FILE" ]; then
  echo "   ❌ Vue file not found: $VUE_FILE"
  exit 1
fi
echo "   ✓ Vue file exists: $VUE_FILE"

# Check if registered in plugin
if grep -q "vueApp.component('$KEBAB_CASE'" app/plugins/storyblok.ts; then
  echo "   ✓ Registered in plugin as: '$KEBAB_CASE'"
else
  echo "   ❌ Not registered in plugin!"
  echo "   Add: vueApp.component('$KEBAB_CASE', $PASCAL_CASE)"
  exit 1
fi

# Check if imported in plugin
if grep -q "import $PASCAL_CASE from" app/plugins/storyblok.ts; then
  echo "   ✓ Imported in plugin: $PASCAL_CASE"
else
  echo "   ❌ Not imported in plugin!"
  echo "   Add: import $PASCAL_CASE from '../storyblok/${PASCAL_CASE}.vue'"
  exit 1
fi

# Run build
echo ""
echo "   Building..."
BUILD_OUTPUT=$(npm run build 2>&1) || {
  echo "   ❌ Build failed!"
  echo ""
  echo "$BUILD_OUTPUT" | tail -20
  exit 1
}

if [ ! -f ".output/server/index.mjs" ]; then
  echo "   ❌ Build failed - no output generated"
  exit 1
fi
echo "   ✓ Build successful"

# If only build mode, we're done
if [ "$MODE" = "--build" ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ PASS: $COMPONENT_NAME builds correctly"
  echo ""
  echo "Next: Add content to Storyblok, then run:"
  echo "  ./test-component.sh $COMPONENT_NAME --render"
  exit 0
fi

# ═══════════════════════════════════════════
# PHASE 2: RENDER TEST (only with --render)
# ═══════════════════════════════════════════

echo ""
echo "🌐 Phase 2: Render test..."
echo "   Looking for CSS class: $KEBAB_CASE"
echo "   Testing: $PAGE_INFO"

# Start server in background, filter Storyblok warnings
echo "   Starting server on port $PORT..."
node .output/server/index.mjs 2>&1 | grep -v "Component could not be found" &
SERVER_PID=$!

# Cleanup on exit
cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null || true
    # Also kill any orphaned node processes on our port
    pkill -f "index.mjs" 2>/dev/null || true
  fi
}
trap cleanup EXIT

# Wait for server
sleep 3

# Test if component renders
echo "   Fetching $PAGE_INFO..."
RESPONSE=$(curl -s "$TEST_URL" 2>/dev/null)

RENDERED=false
EMPTY_TAG=false

# Check for CSS class (component rendered)
if echo "$RESPONSE" | grep -q "class=\"$KEBAB_CASE"; then
  echo "   ✓ Component CSS class found: $KEBAB_CASE"
  RENDERED=true
fi

# Check for empty tag (component NOT registered properly)
if echo "$RESPONSE" | grep -q "<$KEBAB_CASE></$KEBAB_CASE>"; then
  echo "   ❌ Empty tag found - registration problem!"
  EMPTY_TAG=true
  RENDERED=false
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$RENDERED" = true ]; then
  echo "✅ PASS: $COMPONENT_NAME renders correctly"
  exit 0
elif [ "$EMPTY_TAG" = true ]; then
  echo "❌ FAIL: $COMPONENT_NAME has registration problem"
  echo ""
  echo "The component tag exists but is empty. Check:"
  echo "  [ ] Plugin registers with KEBAB-CASE: '$KEBAB_CASE'"
  echo "  [ ] Not snake_case: '$COMPONENT_NAME' ← WRONG"
  exit 1
else
  echo "⚠️  NOT FOUND: $COMPONENT_NAME not on $PAGE_INFO"
  echo ""
  echo "The component wasn't found on $PAGE_INFO."
  echo "Make sure you added it to Storyblok content."
  [ -z "$SLUG" ] && echo "Tip: Use --slug <page> to test a specific page"
  exit 1
fi
