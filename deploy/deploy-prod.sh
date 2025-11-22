#!/usr/bin/env bash
set -euo pipefail
echo "Desplegando a production..."
kubectl apply -f infra/k8s/production/
echo "Despliegue aplicado a production."
