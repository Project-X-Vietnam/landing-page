#!/usr/bin/env bash
# Idempotent env file generator for the Alloy sandbox.
# - Reads existing values from the process env first
# - Fills only safe local-dev defaults / blanks for required keys
# - Never overwrites a non-blank, non-placeholder value already in .env.local
set -euo pipefail

cd "$(dirname "$0")/.."

ENV_FILE=".env.local"
touch "$ENV_FILE"

# get_existing KEY -> prints current value (no quotes) from $ENV_FILE, or empty
get_existing() {
  local key="$1"
  awk -F= -v k="$key" '
    $0 ~ "^"k"=" {
      sub("^"k"=", "")
      print
      exit
    }
  ' "$ENV_FILE"
}

is_blank_or_placeholder() {
  local v="$1"
  case "$v" in
    ""|"changeme"|"your-key-here"|"REPLACE_ME") return 0 ;;
  esac
  return 1
}

# upsert KEY VALUE -- only writes if the existing value is blank/placeholder
upsert() {
  local key="$1"
  local value="$2"
  local existing
  existing="$(get_existing "$key" || true)"
  if ! is_blank_or_placeholder "$existing"; then
    return 0
  fi
  if grep -q "^${key}=" "$ENV_FILE"; then
    # Replace in place
    tmpfile="$(mktemp)"
    awk -F= -v k="$key" -v v="$value" '
      $0 ~ "^"k"=" { print k"="v; next }
      { print }
    ' "$ENV_FILE" > "$tmpfile"
    mv "$tmpfile" "$ENV_FILE"
  else
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

# Pull from process env, fall back to safe blank defaults.
# These keys are all read by the app but are optional for boot in dev.
upsert "NEXT_GOOGLE_SCRIPT_URL"          "${NEXT_GOOGLE_SCRIPT_URL:-}"
upsert "NEXT_GOOGLE_SCRIPT_URL_R2"       "${NEXT_GOOGLE_SCRIPT_URL_R2:-}"
upsert "NEXT_PUBLIC_GA_MEASUREMENT_ID"   "${NEXT_PUBLIC_GA_MEASUREMENT_ID:-}"
upsert "NEXT_GOOGLE_PARTNER_SCRIPT_URL"  "${NEXT_GOOGLE_PARTNER_SCRIPT_URL:-}"
upsert "GA4_API_SECRET"                  "${GA4_API_SECRET:-}"
upsert "NEXT_PUBLIC_POSTHOG_KEY"         "${NEXT_PUBLIC_POSTHOG_KEY:-}"
upsert "NEXT_PUBLIC_POSTHOG_HOST"        "${NEXT_PUBLIC_POSTHOG_HOST:-https://us.i.posthog.com}"

# Pass through whether we're running inside Alloy
upsert "IS_ALLOY"                        "${IS_ALLOY:-true}"

chmod 600 "$ENV_FILE" 2>/dev/null || true
