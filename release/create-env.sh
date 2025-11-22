#!/usr/bin/env bash
set -euo pipefail
echo "Inicializando Terraform..."
cd infra/terraform

if [ ! -f "backend.tf" ]; then
  echo "Warning: no backend.tf configurado. Revisa infra/terraform para setup de state remoto."
fi

terraform init
terraform apply -auto-approve

echo "Infraestructura aplicada."
