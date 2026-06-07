#!/usr/bin/env bash
# Test du webhook Make — usage :
#   ./scripts/test-lead-webhook.sh "https://hook.eu2.make.com/..."
set -euo pipefail
URL="${1:-}"
if [[ -z "$URL" ]]; then
  echo "Usage: $0 <webhook_url>"
  exit 1
fi
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "sell",
    "prenom": "Test",
    "telephone": "8195551234",
    "email": "test@example.com",
    "adresse": "123 rue Test, Gatineau",
    "typePropriete": "Maison unifamiliale",
    "quandVendre": "Moins de 3 mois",
    "page_url": "https://test.local/evaluation-montreal.html",
    "submitted_at": "2026-05-27T12:00:00.000Z"
  }'
echo ""
echo "→ Vérifiez Make (historique) + courriel Resend + SMS Twilio."
