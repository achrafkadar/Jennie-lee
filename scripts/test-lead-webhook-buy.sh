#!/usr/bin/env bash
set -euo pipefail
URL="${1:-https://hook.us2.make.com/9flmf1issmtsqj2fdiw0umkknz6hhnt2}"
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "buy",
    "prenom": "Test",
    "nom": "Acheteur",
    "telephone": "8195551234",
    "email": "test@example.com",
    "langue": "EN",
    "page_url": "https://test.local/#buy",
    "submitted_at": "2026-05-27T12:00:00.000Z"
  }'
echo ""
echo "→ Vérifiez Make : intent doit être buy"
