# XeroBookz Backend Microservices

Complete backend architecture with 26 microservices built with FastAPI, PostgreSQL, MongoDB, and Redis.

## Architecture Overview

- **26 Microservices**: Each service is independently deployable
- **FastAPI**: Modern async Python web framework
- **PostgreSQL**: Relational data storage
- **MongoDB GridFS**: Document storage (I-9, PAF, H-1B docs)
- **Redis**: Caching, rate limiting, and queues
- **RabbitMQ**: Event bus for inter-service communication
- **Multi-tenancy**: X-Tenant-ID header based isolation

## Services

1. **auth-service** (8001) - Authentication & Authorization
2. **user-service** (8002) - User profiles
3. **organization-service** (8003) - Organization management
4. **employee-service** (8004) - Employee lifecycle
5. **document-service** (8005) - Document management with GridFS
6. **i9-service** (8006) - I-9 form management
7. **e-verify-service** (8007) - E-Verify automation
8. **i9-audit-service** (8008) - I-9 compliance auditing
9. **paf-service** (8009) - Public Access File automation
10. **soc-predictor-service** (8010) - SOC code prediction
11. **immigration-service** (8011) - Immigration case management
12. **lca-service** (8012) - Labor Condition Application
13. **timesheet-service** (8013) - Timesheet management
14. **leave-service** (8014) - Leave & PTO
15. **notification-service** (8015) - Notifications
16. **audit-service** (8016) - Audit logging
17. **safety-service** (8017) - Safety compliance
18. **onboarding-service** (8018) - Onboarding workflows
19. **workflow-service** (8019) - Workflow engine
20. **invoice-service** (8020) - Invoice management
21. **payment-service** (8021) - Payment processing
22. **finance-dashboard-service** (8022) - Financial analytics
23. **marketing-service** (8023) - Marketing campaigns
24. **ess-service** (8024) - Employee Self Service
25. **api-gateway** (8000) - API Gateway & routing
26. **shared-libs** - Shared utilities and models

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- PostgreSQL
- MongoDB
- Redis
- RabbitMQ

### Environment Variables

Each service requires:

```env
POSTGRES_URI=postgresql://user:password@localhost:5432/xerobookz
MONGO_URI=mongodb://localhost:27017
REDIS_URI=redis://localhost:6379/0
RABBITMQ_URI=amqp://guest:guest@localhost:5672/
JWT_SECRET=your-secret-key
TENANT_HEADER=X-Tenant-ID
```

### Running Services

```bash
# Install shared-libs
cd shared-libs
pip install -e .

# Run a service
cd ../auth-service
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

### Docker

```bash
# Build and run a service
cd auth-service
docker build -t auth-service .
docker run -p 8001:8001 auth-service
```

## Multi-Tenancy

All requests must include:
- `X-Tenant-ID`: Tenant identifier (UUID)
- `Authorization: Bearer <JWT>`: Authentication token

## Event Bus

Services communicate via RabbitMQ using standard event envelopes:

```json
{
  "event_id": "<uuid>",
  "event_type": "user.created",
  "timestamp": "<UTC>",
  "tenant_id": "<uuid>",
  "initiated_by": "<user_id>",
  "payload": { ... }
}
```

## API Response Format

All APIs return:

```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "error": null
}
```

## Development

Each service follows the structure:

```
/service-name
  /app
    /api          # FastAPI routes
    /models       # SQLAlchemy models
    /schemas      # Pydantic schemas
    /services     # Business logic
    /repositories # Data access
    /events       # Event producers/consumers
    /workers      # Background workers
    /utils        # Utilities
    config.py
    main.py
  Dockerfile
  requirements.txt
```

## License

Proprietary - XeroBookz

