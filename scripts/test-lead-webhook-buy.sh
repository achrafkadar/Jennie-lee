#!/usr/bin/env bash
# Test webhook Make — formulaire ACHAT
set -euo pipefail
URL="${1:-https://hook.us2.make.com/9flmf1issmtsqj2fdiw0umkknz6hhnt2}"
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "buy",
    "prenom": "TestAchat",
    "telephone": "8195551234",
    "email": "test@example.com",
    "secteur": "Gatineau",
    "typePropriete": "Maison unifamiliale",
    "budget": "350 000 $ – 500 000 $",
    "quandAcheter": "Moins de 3 mois",
    "preapproval": "Pas encore",
    "page_url": "https://test.local/#buy",
    "submitted_at": "2026-05-27T12:00:00.000Z"
  }'
echo ""
echo "→ Vérifiez Make : intent doit être buy"
