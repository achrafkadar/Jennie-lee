#!/usr/bin/env bash
set -euo pipefail
URL="${1:-https://hook.us2.make.com/9flmf1issmtsqj2fdiw0umkknz6hhnt2}"
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "sell",
    "prenom": "Test",
    "nom": "Vendeur",
    "telephone": "8195551234",
    "email": "test@example.com",
    "adresse": "123 rue Test, Gatineau",
    "langue": "FR",
    "page_url": "https://test.local/",
    "submitted_at": "2026-05-27T12:00:00.000Z"
  }'
echo ""
echo "→ Vérifiez Make (historique) + courriel Resend + SMS Twilio."
