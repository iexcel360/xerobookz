"use client";

import { LayoutShell, PageHeader, Card, DataGrid, Button, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function UsersPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();

  const sidebarItems = [
    { label: "Tenants", href: "/tenants", icon: "building2" as const },
    { label: "Users", href: "/users", icon: "users" as const },
    { label: "System", href: "/system", icon: "settings" as const },
    { label: "Audit", href: "/audit", icon: "file-text" as const },
  ];

  const columns = [
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
        {value}
      </span>
    )},
    { key: "status", label: "Status", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
        {value}
      </span>
    )},
    { key: "created_at", label: "Created" },
  ];

  const mockData = [
    {
      email: "admin@example.com",
      role: "Super Admin",
      status: "Active",
      created_at: "2024-01-15",
    },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/users",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Users"
        description="Manage system users and their roles"
        actions={
          <Button variant="gradient">
            <Icon name="user-plus" size={18} className="mr-2" />
            Add User
          </Button>
        }
      />

      <Card variant="floating" className="p-6">
        <DataGrid columns={columns} data={mockData} />
      </Card>
    </LayoutShell>
  );
}
