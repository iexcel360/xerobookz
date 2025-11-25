# XeroBookz Docker Compose - Local Development

Complete local development environment for all XeroBookz microservices.

## Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose v2+

## Quick Start

```bash
cd xerobookz-infrastructure/docker-compose
docker-compose up -d
```

## Services

### Databases
- **PostgreSQL**: Port 5432
- **MongoDB**: Port 27017
- **Redis**: Port 6379
- **RabbitMQ**: Port 5672 (Management UI: http://localhost:15672)

### Microservices
All 26 microservices are included with proper dependencies.

### API Gateway
- **Traefik**: Port 80 (Reverse proxy)
- **API Gateway**: Port 8000

## Environment Variables

All services use development credentials. For production, use secrets management.

## Health Checks

All services include health checks. Check status:

```bash
docker-compose ps
```

## Logs

View logs for a specific service:

```bash
docker-compose logs -f auth-service
```

## Stop Services

```bash
docker-compose down
```

To remove volumes:

```bash
docker-compose down -v
```

