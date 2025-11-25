# XeroBookz Local Development - Quick Start

Get XeroBookz running locally in minutes!

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- 8GB+ RAM available
- Ports 8000, 5432, 27017, 6379, 5672, 15672 available

## Quick Start

### Option 1: Using Scripts (Recommended)

```bash
cd xerobookz-infrastructure/docker-compose
./start.sh
```

### Option 2: Manual

```bash
cd xerobookz-infrastructure/docker-compose

# Create .env file
cp .env.example .env

# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f api-gateway
```

## Verify Services

```bash
# Check health
./check-health.sh

# Or manually:
curl http://localhost:8000/health
```

## Service URLs

- **API Gateway**: http://localhost:8000
- **RabbitMQ Management**: http://localhost:15672
  - Username: `xerobookz`
  - Password: `xerobookz_dev`
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## Common Commands

```bash
# View logs for a specific service
docker compose logs -f auth-service

# Restart a service
docker compose restart auth-service

# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v

# Rebuild a service
docker compose build auth-service
docker compose up -d auth-service
```

## Testing the API

```bash
# Health check
curl http://localhost:8000/health

# Login (example)
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: your-tenant-id" \
  -d '{
    "email": "admin@example.com",
    "password": "password",
    "tenant_id": "your-tenant-id"
  }'
```

## Troubleshooting

### Services won't start

```bash
# Check Docker is running
docker info

# Check port conflicts
lsof -i :8000
lsof -i :5432

# View detailed logs
docker compose logs
```

### Database connection issues

```bash
# Check database is ready
docker exec xerobookz-postgres pg_isready -U xerobookz
docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Reset everything

```bash
# Stop and remove everything
docker compose down -v

# Remove all XeroBookz containers
docker ps -a | grep xerobookz | awk '{print $1}' | xargs docker rm -f

# Start fresh
./start.sh
```

## Next Steps

1. **Frontend Development**: Start the Next.js apps
   ```bash
   cd xerobookz-frontend/admin-web
   npm install
   npm run dev
   ```

2. **Backend Development**: Services are running, you can now:
   - Make code changes
   - Rebuild specific services
   - Test API endpoints

3. **Database Access**:
   ```bash
   # PostgreSQL
   docker exec -it xerobookz-postgres psql -U xerobookz -d xerobookz
   
   # MongoDB
   docker exec -it xerobookz-mongodb mongosh -u xerobookz -p xerobookz_dev
   ```

## Environment Variables

Edit `.env` file to customize:
- Database passwords
- JWT secrets
- Service ports

## Stopping Services

```bash
# Stop all services
./stop.sh

# Or manually
docker compose down
```

