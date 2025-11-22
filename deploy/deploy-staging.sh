#!/usr/bin/env bash
set -euo pipefail
echo "Desplegando a staging..."
kubectl apply -f infra/k8s/staging/
echo "Despliegue aplicado a staging."
