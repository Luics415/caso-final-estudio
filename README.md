# Caso Final de Estudio. - Pipeline CI/CD con Node.js

Repositorio de ejemplo para el Tercer Parcial. Implementa una API REST básica de órdenes (Node.js) y un pipeline de liberación y despliegue continuo (CI/CD) con GitHub Actions, Docker, Terraform y Kubernetes.

## Contenido
- `src/` : Código de la API (Express), tests con Jest.
- `docker/Dockerfile` : Dockerfile para empaquetar la app.
- `.github/workflows/` : Workflows para CI, release y deploy.
- `infra/terraform/` : Terraform básico para namespaces.
- `infra/k8s/` : Manifiestos Kubernetes (staging y production).
- `release/` : Scripts para crear entorno y ejecutar tests.
- `deploy/` : Scripts para desplegar y smoke-tests.

## Requisitos locales
- Node.js 20+
- Docker
- kubectl configurado
- Terraform
- Git y (opcional) GitHub CLI

## Instalación local (pruebas rápidas)
```bash
# Clona el repo
git clone <TU_REPO_URL>
cd "Caso Final de Estudio."

# Ejecuta localmente (modo desarrollo)
cd src
npm ci
npm start
# API escuchará en http://localhost:3000
```

## Despliegue en staging (guía rápida)
1. Configura secrets en GitHub:
   - `GHCR_PAT` (para push a GHCR)
   - `KUBE_CONFIG` (base64 del kubeconfig)
   - `TF_VAR_*` (si usas provider cloud)
2. Ejecuta pipeline CI (push a `develop`/`main`) o usa `workflow_dispatch` en `Release`.
3. Desde Actions se crea infra (Terraform), se despliega a staging y se ejecutan tests.
4. Revisa resultados en la pestaña **Actions** del repo.

## SLAs y métricas (definido en el caso de estudio)
- Disponibilidad objetivo: **≥ 99.5%** (producción).
- Tiempo de respuesta P95: **≤ 450 ms**.
- Pipeline completo: **≤ 7 minutos** (objetivo).
- Monitoreo: Prometheus + Grafana (configurar dashboards y alertas).

## Métricas a monitorear
- RPS, latencias (P50/P95/P99), errores 4xx/5xx.
- Uso CPU/RAM por pod, reinicios, latencia BD.
- Tiempo total del pipeline y tiempos por etapa.

## Notas de seguridad
- Nunca subas tokens ni kubeconfig al repo.
- Usa GitHub Secrets y OIDC si tu proveedor lo soporta.
- Habilita escaneos SAST/SCA (SonarCloud / Dependabot).

