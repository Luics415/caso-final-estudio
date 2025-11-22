#!/usr/bin/env bash
set -euo pipefail
URL=${SMOKE_URL:-"http://orders.example.com/health"}

echo "Ejecutando smoke test contra $URL"
if curl -sf "$URL" | grep -q '"status":"ok"'; then
  echo "Smoke test OK"
else
  echo "Smoke test FAILED"
  exit 1
fi
