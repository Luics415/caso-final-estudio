#!/usr/bin/env bash
set -euo pipefail
echo "Ejecutando pruebas de integración contra staging..."

# Si quieres ejecutar pruebas via Jest
cd src
npm run test:integration || { echo "Tests de integración fallaron"; exit 1; }

# Ejemplo de test de carga (requiere k6 instalado en el entorno donde corre)
# kubectl run loadtest --rm -i --image=loadimpact/k6 -- k6 run /tests/k6/script.js

echo "Pruebas de integración finalizadas correctamente."
