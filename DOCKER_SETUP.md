# Docker Compose Setup

Dieses Projekt verwendet Docker Compose für die Orchestrierung des Fullstack-Setups mit NestJS Backend und Vite React Frontend.

## Struktur

- **Backend**: NestJS API Server (Port 3000)
- **Frontend**: Vite React App mit Nginx (Port 80)

## Production Setup

### Starten

```bash
docker-compose up -d
```

### Stoppen

```bash
docker-compose down
```

### Logs anzeigen

```bash
# Alle Services
docker-compose logs

# Nur Backend
docker-compose logs backend

# Nur Frontend
docker-compose logs frontend

# Live-Logs verfolgen
docker-compose logs -f
```

### Rebuild nach Code-Änderungen

```bash
docker-compose up -d --build
```

## Development Setup

Für die Entwicklung mit Hot-Reload verwenden Sie die Development-Konfiguration:

### Starten

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Features

- **Hot-Reload**: Code-Änderungen werden automatisch übernommen
- **Volume-Mounting**: Lokale Dateien werden in Container gemountet
- **Development-Ports**:
  - Backend: http://localhost:3000
  - Frontend: http://localhost:5173

### Stoppen

```bash
docker-compose -f docker-compose.dev.yml down
```

## Nützliche Befehle

### Container-Status prüfen

```bash
docker-compose ps
```

### In Container einloggen

```bash
# Backend Container
docker-compose exec backend sh

# Frontend Container (Development)
docker-compose -f docker-compose.dev.yml exec frontend-dev sh
```

### Volumes löschen

```bash
docker-compose down -v
```

### Images neu builden

```bash
docker-compose build --no-cache
```

## Ports

### Production

- Frontend: http://localhost:80
- Backend API: http://localhost:3000

### Development

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Troubleshooting

### Port bereits belegt

Falls Ports bereits belegt sind, können Sie diese in den docker-compose.yml Dateien anpassen:

```yaml
ports:
  - "8080:80" # Frontend auf Port 8080
  - "3001:3000" # Backend auf Port 3001
```

### Container neu starten

```bash
docker-compose restart <service-name>
```

### Alle Docker-Ressourcen löschen

```bash
docker-compose down -v --rmi all
docker system prune -a
```
