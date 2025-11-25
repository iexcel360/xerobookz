# XeroBookz Kubernetes Manifests

Production-ready Kubernetes configurations for all XeroBookz microservices.

## Structure

```
k8s/
├── base/              # Base manifests for all services
├── overlays/
│   ├── dev/          # Development environment
│   ├── staging/       # Staging environment
│   └── prod/         # Production environment
```

## Deployment

### Development

```bash
kubectl apply -k overlays/dev
```

### Production

```bash
kubectl apply -k overlays/prod
```

## Features

- **Rolling Updates**: Zero-downtime deployments
- **Health Checks**: Liveness and readiness probes
- **Resource Limits**: CPU and memory constraints
- **HPA**: Horizontal Pod Autoscaling in production
- **PDB**: Pod Disruption Budgets for high availability
- **Secrets Management**: Kubernetes secrets with Vault integration

## Services

All 26 microservices are configured with:
- Deployment manifests
- Service definitions
- Resource requests/limits
- Health probes
- Environment variables

