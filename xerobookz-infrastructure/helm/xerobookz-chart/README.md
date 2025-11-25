# XeroBookz Helm Chart

Helm chart for deploying XeroBookz microservices to Kubernetes.

## Installation

```bash
helm install xerobookz-auth ./xerobookz-chart \
  --set service.name=auth-service \
  --set container.image=auth-service \
  --set service.port=8001
```

## Customization

Override values:

```bash
helm install xerobookz-auth ./xerobookz-chart \
  -f values.yaml \
  --set deployment.replicas=3 \
  --set autoscaling.enabled=true
```

## Features

- Rolling updates
- Health checks
- Autoscaling (HPA)
- Pod Disruption Budgets
- ServiceMonitor for Prometheus
- Ingress support

