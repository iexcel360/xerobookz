# XeroBookz Infrastructure

Complete production-ready infrastructure for XeroBookz SaaS platform.

## Structure

```
xerobookz-infrastructure/
├── docker-compose/      # Local development environment
├── k8s/                # Kubernetes manifests
│   ├── base/          # Base configurations
│   └── overlays/      # Environment-specific configs
├── helm/               # Helm charts
├── terraform/          # Infrastructure as Code
│   ├── modules/       # Reusable modules
│   └── environments/  # Environment configs
├── monitoring/         # Observability stack
├── scripts/            # Utility scripts
└── .github/workflows/  # CI/CD pipelines
```

## Quick Start

### Local Development

```bash
cd docker-compose
docker-compose up -d
```

### Kubernetes Deployment

```bash
# Development
kubectl apply -k k8s/overlays/dev

# Production
kubectl apply -k k8s/overlays/prod
```

### Terraform

```bash
cd terraform/environments/prod
terraform init
terraform plan
terraform apply
```

## Features

- ✅ Docker Compose for local dev
- ✅ Kubernetes manifests with Kustomize
- ✅ Helm charts for easy deployment
- ✅ Terraform for AWS infrastructure
- ✅ GitHub Actions CI/CD
- ✅ Prometheus + Grafana monitoring
- ✅ Automated backups
- ✅ Security hardening

## CI/CD

All services have automated CI/CD pipelines:
- Backend: Build, test, and deploy to Kubernetes
- Frontend: Build and deploy to S3 + CloudFront
- Mobile: Build Android/iOS apps

## Monitoring

- Prometheus for metrics
- Grafana for dashboards
- Loki for logs
- Tempo for tracing

## Backups

Automated backups for:
- PostgreSQL (daily)
- MongoDB (daily)
- S3 versioning enabled

## Security

- HTTPS everywhere
- Secrets management via Kubernetes Secrets
- Network policies
- Pod security policies
- WAF rules
- Rate limiting

