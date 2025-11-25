"use client";

import { useState, useEffect } from "react";
import { LayoutShell, PageHeader, Card, Badge, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import { apiClient } from "@xerobookz/api-clients";

export default function SystemPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    apiClient.get("/system/health")
      .then((result) => {
        if (result.success) {
          setHealthData(result.data);
        }
      })
      .catch(() => {
        // Handle error silently
      });
  }, []);

  const sidebarItems = [
    { label: "Tenants", href: "/tenants" },
    { label: "Users", href: "/users" },
    { label: "System", href: "/system" },
    { label: "Audit", href: "/audit" },
  ];

  const services = [
    { name: "auth-service", status: "up", latency: "12ms", icon: "shield" as const },
    { name: "user-service", status: "up", latency: "15ms", icon: "user" as const },
    { name: "employee-service", status: "up", latency: "18ms", icon: "users" as const },
    { name: "i9-service", status: "up", latency: "20ms", icon: "file-check" as const },
    { name: "document-service", status: "up", latency: "22ms", icon: "files" as const },
    { name: "immigration-service", status: "up", latency: "25ms", icon: "plane" as const },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/system",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="System Dashboard"
        description="Monitor system health and service status"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={service.name}
            variant="floating"
            hover
            className="p-6 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <IconBox
                icon={service.icon}
                size="md"
                variant="primary"
                gradient
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <Badge variant={service.status === "up" ? "success" : "danger"}>
                {service.status}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-secondary-700 mb-2">
              {service.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-grey-600">Latency</span>
                <span className="text-sm font-semibold text-primary-600">{service.latency}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}
