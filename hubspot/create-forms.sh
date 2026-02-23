#!/usr/bin/env bash
#
# Create all VICUS forms in HubSpot via the Forms API v3.
#
# Usage:
#   export HUBSPOT_API_KEY="your-private-app-token"
#   ./hubspot/create-forms.sh
#
# Prerequisites:
#   - A HubSpot private app with "Forms" scope
#   - curl and jq installed
#
# The script creates each form and prints the resulting form ID.
# You can then paste the IDs into your .env file.

set -euo pipefail

API="https://api.hubapi.com/marketing/v3/forms"
DIR="$(cd "$(dirname "$0")/forms" && pwd)"

if [ -z "${HUBSPOT_API_KEY:-}" ]; then
  echo "Error: HUBSPOT_API_KEY environment variable is not set."
  echo "Create a private app at: Settings > Integrations > Private Apps"
  echo "Required scope: forms"
  exit 1
fi

echo "Creating VICUS forms in HubSpot..."
echo "-----------------------------------"

declare -A ENV_KEYS=(
  [contact]="HUBSPOT_CONTACT_FORM_ID"
  [download]="HUBSPOT_DOWNLOAD_FORM_ID"
  [demo]="HUBSPOT_DEMO_FORM_ID"
  [license]="HUBSPOT_LICENSE_FORM_ID"
  [application]="HUBSPOT_APPLICATION_FORM_ID"
  [newsletter]="HUBSPOT_NEWSLETTER_FORM_ID"
)

for form_file in "$DIR"/*.json; do
  form_name=$(basename "$form_file" .json)

  # Skip test files
  [[ "$form_name" == _* ]] && continue

  echo ""
  echo "Creating: $form_name"

  response=$(cat "$form_file" | curl -s -w "\n%{http_code}" -X POST "$API" \
    -H "Authorization: Bearer $HUBSPOT_API_KEY" \
    -H "Content-Type: application/json" \
    -d @-)

  http_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
    form_id=$(echo "$body" | jq -r '.id')
    echo "  OK  -> Form ID: $form_id"
    echo "  Set: ${ENV_KEYS[$form_name]}=$form_id"
  else
    echo "  FAIL (HTTP $http_code)"
    echo "$body" | jq . 2>/dev/null || echo "$body"
  fi
done

echo ""
echo "-----------------------------------"
echo "Done. Add the form IDs to your .env file."
