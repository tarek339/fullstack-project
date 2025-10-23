# Docker Setup Dokumentation - Fullstack Projekt

## Überblick

Dieses Projekt enthält ein vollständiges Docker-Setup für eine Fullstack-Anwendung bestehend aus:

- **Backend**: NestJS (TypeScript)
- **Frontend**: React mit Vite (TypeScript)
- **Reverse Proxy**: Nginx
- **Datenbank**: PostgreSQL
- **Cache**: Redis
- **Netzwerk**: Docker Compose Netzwerk für sichere Kommunikation

## Projektstruktur

```
fullstack-project/
├── project-name/                 # Backend (NestJS)
│   ├── Dockerfile.dev           # Development Dockerfile
│   ├── Dockerfile.prod          # Production Dockerfile
│   ├── .dockerignore           # Docker ignore file
│   └── .env.example            # Environment Variablen Beispiel
├── vite-project/                # Frontend (React/Vite)
│   ├── Dockerfile.dev          # Development Dockerfile
│   ├── Dockerfile.prod         # Production Dockerfile
│   ├── nginx.conf              # Nginx Konfiguration für Production
│   ├── .dockerignore          # Docker ignore file
│   └── .env.example           # Environment Variablen Beispiel
├── nginx/                      # Nginx Reverse Proxy
│   ├── nginx.conf             # Production Konfiguration
│   └── nginx.dev.conf         # Development Konfiguration
├── postgres/                   # Datenbank Initialisierung
│   └── init.sql              # SQL Initialisierungsskript
├── docker-compose.dev.yml     # Development Environment
├── docker-compose.prod.yml    # Production Environment
└── docker.md                  # Diese Dokumentation
```

## Voraussetzungen

- Docker (Version 20.10+)
- Docker Compose (Version 2.0+)
- Git

## Development Environment

### 1. Environment Variablen einrichten

```bash
# Backend Environment Variablen
cp project-name/.env.example project-name/.env

# Frontend Environment Variablen
cp vite-project/.env.example vite-project/.env
```

### 2. Development Server starten

```bash
# Alle Services im Development Modus starten
docker-compose -f docker-compose.dev.yml up --build

# Im Hintergrund starten
docker-compose -f docker-compose.dev.yml up -d --build

# Nur bestimmte Services starten
docker-compose -f docker-compose.dev.yml up backend frontend
```

### 3. Zugriff auf die Anwendung

- **Frontend**: http://localhost (über Nginx Proxy)
- **Backend API**: http://localhost/api
- **Frontend direkt**: http://localhost:5173 (Vite Dev Server)
- **Backend direkt**: http://localhost:3001 (NestJS Server)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### 4. Logs anzeigen

```bash
# Alle Logs anzeigen
docker-compose -f docker-compose.dev.yml logs -f

# Logs für spezifischen Service
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f nginx
```

### 5. Services stoppen

```bash
# Alle Services stoppen
docker-compose -f docker-compose.dev.yml down

# Services stoppen und Volumes löschen
docker-compose -f docker-compose.dev.yml down -v

# Services stoppen und Images entfernen
docker-compose -f docker-compose.dev.yml down --rmi all
```

## Production Environment

### 1. Environment Variablen konfigurieren

```bash
# Backend Production Environment
cp project-name/.env.example project-name/.env.production

# Frontend Production Environment
cp vite-project/.env.example vite-project/.env.production
```

**Wichtig**: Ändern Sie alle Passwörter und Secrets in den Production Environment Dateien!

### 2. Production Server starten

```bash
# Production Environment starten
docker-compose -f docker-compose.prod.yml up --build

# Im Hintergrund starten
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Zugriff auf die Production Anwendung

- **Anwendung**: http://localhost (über Nginx Proxy)
- **API**: http://localhost/api

### 4. Health Checks

Die Production Konfiguration enthält Health Checks für alle Services:

```bash
# Status aller Container anzeigen
docker-compose -f docker-compose.prod.yml ps

# Health Check Status
docker inspect fullstack_backend_prod --format='{{.State.Health.Status}}'
```

## Nützliche Docker Befehle

### Container Management

```bash
# Aktive Container anzeigen
docker ps

# Alle Container anzeigen (inkl. gestoppte)
docker ps -a

# Container Shell öffnen
docker exec -it fullstack_backend_dev sh
docker exec -it fullstack_frontend_dev sh

# Container neu starten
docker-compose -f docker-compose.dev.yml restart backend
```

### Image Management

```bash
# Images anzeigen
docker images

# Nicht verwendete Images löschen
docker image prune

# Alle Images neu bauen
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Volume Management

```bash
# Volumes anzeigen
docker volume ls

# Volume Inhalt inspizieren
docker run --rm -v fullstack_postgres_data_dev:/data alpine ls -la /data

# Nicht verwendete Volumes löschen
docker volume prune
```

### Datenbank Management

```bash
# PostgreSQL Shell öffnen
docker exec -it fullstack_postgres_dev psql -U dev_user -d fullstack_dev

# Datenbank Backup erstellen
docker exec fullstack_postgres_dev pg_dump -U dev_user -d fullstack_dev > backup.sql

# Datenbank Backup wiederherstellen
docker exec -i fullstack_postgres_dev psql -U dev_user -d fullstack_dev < backup.sql
```

### Redis Management

```bash
# Redis CLI öffnen
docker exec -it fullstack_redis_dev redis-cli

# Redis Daten anzeigen
docker exec fullstack_redis_dev redis-cli keys "*"
```

## Entwicklung mit Hot Reload

### Backend Hot Reload

Das Backend ist für Hot Reload konfiguriert. Änderungen im `project-name/src` Ordner werden automatisch erkannt.

### Frontend Hot Reload

Das Frontend nutzt Vite's Hot Module Replacement (HMR). Änderungen werden sofort im Browser reflektiert.

### Volumes für Development

```yaml
volumes:
  - ./project-name:/app # Source Code Mapping
  - /app/node_modules # Node Modules bleiben im Container
```

## Debugging

### Backend Debugging

```bash
# Backend im Debug Modus starten
docker-compose -f docker-compose.dev.yml run --rm -p 9229:9229 backend npm run start:debug
```

Dann in VS Code:

1. Öffnen Sie die Debug Console (F5)
2. Wählen Sie "Node.js: Attach to Remote"
3. Port: 9229

### Frontend Debugging

Das Frontend kann über die Browser Developer Tools debugged werden.

### Nginx Debugging

```bash
# Nginx Konfiguration testen
docker exec fullstack_nginx_dev nginx -t

# Nginx neu laden
docker exec fullstack_nginx_dev nginx -s reload
```

## Performance Optimierung

### Production Builds

```bash
# Images für Production optimieren
docker-compose -f docker-compose.prod.yml build --no-cache
```

### Caching

- Frontend nutzt Nginx Caching für statische Assets
- Backend kann Redis für Session/Data Caching nutzen
- Docker Layer Caching durch Multi-Stage Builds

## Security Best Practices

### 1. Environment Variablen

- Niemals `.env` Dateien in Git committen
- Nutzen Sie starke Passwörter in Production
- Rotieren Sie Secrets regelmäßig

### 2. Container Security

- Non-root User in Production Containern
- Minimale Base Images (Alpine)
- Security Headers in Nginx

### 3. Netzwerk Security

- Container kommunizieren über internes Docker Netzwerk
- Nur notwendige Ports nach außen exponiert
- Nginx als Reverse Proxy schützt Backend

## Troubleshooting

### Häufige Probleme

#### Port bereits in Verwendung

```bash
# Prüfen welcher Prozess Port 80 verwendet
lsof -i :80

# Service auf anderem Port starten
docker-compose -f docker-compose.dev.yml up -p 8080:80
```

#### Container startet nicht

```bash
# Logs für Debugging anzeigen
docker-compose -f docker-compose.dev.yml logs backend

# Container Konfiguration prüfen
docker inspect fullstack_backend_dev
```

#### Datenbank Verbindungsfehler

```bash
# PostgreSQL Container Status prüfen
docker-compose -f docker-compose.dev.yml ps postgres

# Datenbank Logs anzeigen
docker-compose -f docker-compose.dev.yml logs postgres

# Verbindung testen
docker exec fullstack_postgres_dev pg_isready -U dev_user
```

#### Frontend Build Fehler

```bash
# Node Modules neu installieren
docker-compose -f docker-compose.dev.yml run --rm frontend npm install

# Cache löschen
docker-compose -f docker-compose.dev.yml run --rm frontend npm run dev -- --force
```

### Reset & Clean Up

```bash
# Komplettes System zurücksetzen
docker-compose -f docker-compose.dev.yml down -v --rmi all
docker system prune -a --volumes

# Dann neu starten
docker-compose -f docker-compose.dev.yml up --build
```

## CI/CD Integration

### GitHub Actions Beispiel

```yaml
name: Docker Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Production Images
        run: |
          docker-compose -f docker-compose.prod.yml build

      - name: Run Tests
        run: |
          docker-compose -f docker-compose.prod.yml run --rm backend npm test

      - name: Deploy
        run: |
          docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring

### Container Health Monitoring

```bash
# Automatisches Health Check Monitoring
docker events --filter container=fullstack_backend_prod

# Resource Usage
docker stats fullstack_backend_prod fullstack_frontend_prod
```

### Logs Aggregation

```bash
# Centralized Logging Setup (optional)
docker-compose logs -f | tee application.log
```

## Backup Strategien

### Automatische Backups

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
docker exec fullstack_postgres_prod pg_dump -U prod_user -d fullstack_prod > backup_$DATE.sql
docker run --rm -v fullstack_redis_data_prod:/data -v $(pwd):/backup alpine tar czf /backup/redis_backup_$DATE.tar.gz -C /data .
```

## Support

Bei Problemen oder Fragen:

1. Prüfen Sie die Logs: `docker-compose logs -f`
2. Checken Sie die Container Status: `docker-compose ps`
3. Versuchen Sie einen Clean Restart: `docker-compose down && docker-compose up --build`

## Nächste Schritte

1. **SSL/HTTPS**: Implementieren Sie SSL Zertifikate für Production
2. **Monitoring**: Fügen Sie Prometheus/Grafana für Monitoring hinzu
3. **Backup Automation**: Automatisieren Sie Backup Prozesse
4. **Load Balancing**: Implementieren Sie Load Balancer für hohe Verfügbarkeit
5. **Security Scanning**: Integrieren Sie Docker Security Scanning Tools
