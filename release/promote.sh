#!/usr/bin/env bash
set -euo pipefail
# Promote: etiqueta la imagen y la sube como latest
REGISTRY=${REGISTRY:-"ghcr.io/$GITHUB_ACTOR/${GITHUB_REPOSITORY##*/}"}
IMAGE_TAG=${IMAGE_TAG:-$(git rev-parse --short HEAD)}

echo "Promoviendo imagen $REGISTRY:$IMAGE_TAG -> $REGISTRY:latest"
docker tag "$REGISTRY:$IMAGE_TAG" "$REGISTRY:latest"
docker push "$REGISTRY:latest"
echo "Imagen promovida."
