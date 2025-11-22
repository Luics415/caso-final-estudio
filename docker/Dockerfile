# docker/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependencias (solo package.json para aprovechar cache)
COPY src/package.json ./
RUN npm ci --only=production

# Copia el resto de la aplicación
COPY src/ ./src

EXPOSE 3000

CMD ["node", "src/index.js"]
