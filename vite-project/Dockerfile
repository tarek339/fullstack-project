# Multi-stage build für Vite React App
# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci --only=production

# Source code kopieren
COPY . .

# TypeScript kompilieren und App builden
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine AS production

# Custom Nginx-Konfiguration für SPA-Support kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build-Artefakte von der Build-Stage kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80 exponieren
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]