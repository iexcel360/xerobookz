"use client";

import { LayoutShell, PageHeader, Card, DataGrid, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function AuditPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();

  const sidebarItems = [
    { label: "Tenants", href: "/tenants", icon: "building2" as const },
    { label: "Users", href: "/users", icon: "users" as const },
    { label: "System", href: "/system", icon: "settings" as const },
    { label: "Audit", href: "/audit", icon: "file-text" as const },
  ];

  const columns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "user", label: "User" },
    { key: "action", label: "Action" },
    { key: "resource", label: "Resource" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
        {value}
      </span>
    )},
  ];

  const mockData = [
    {
      timestamp: "2024-01-15 10:30:00",
      user: "admin@example.com",
      action: "CREATE",
      resource: "Tenant",
      status: "Success",
    },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/audit",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Audit Logs"
        description="View system audit trail and compliance logs"
        actions={
          <div className="flex items-center gap-2 text-grey-600">
            <Icon name="file-text" size={20} />
            <span className="text-sm">Export Logs</span>
          </div>
        }
      />

      <Card variant="floating" className="p-6">
        <DataGrid columns={columns} data={mockData} />
      </Card>
    </LayoutShell>
  );
}
