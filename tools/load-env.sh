#!/bin/bash
# load-env.sh - Load credentials from .env.local
# Source this in other scripts: source "$(dirname "$0")/load-env.sh"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Missing credentials file: $ENV_FILE"
  echo "   Copy .env.example to .env.local and fill in your tokens."
  exit 1
fi

# Load env vars (skip comments and empty lines)
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  # Remove leading/trailing whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  # Export
  export "$key=$value"
done < "$ENV_FILE"
