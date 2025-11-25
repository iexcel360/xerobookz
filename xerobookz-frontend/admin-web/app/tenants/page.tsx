"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, DataGrid, Button, Modal, Input, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function TenantsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sidebarItems = [
    { label: "Tenants", href: "/tenants", icon: "building2" as const },
    { label: "Users", href: "/users", icon: "users" as const },
    { label: "System", href: "/system", icon: "settings" as const },
    { label: "Audit", href: "/audit", icon: "file-text" as const },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "domain", label: "Domain" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
        {value}
      </span>
    )},
    { key: "created_at", label: "Created" },
  ];

  const mockData = [
    {
      name: "Acme Corp",
      domain: "acme.xerobookz.com",
      status: "Active",
      created_at: "2024-01-15",
    },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/tenants",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Tenants"
        description="Manage all tenant organizations and their configurations"
        actions={
          <Button
            variant="gradient"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Icon name="user-plus" size={18} className="mr-2" />
            Create Tenant
          </Button>
        }
      />

      <Card variant="floating" className="p-6">
        <DataGrid columns={columns} data={mockData} />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Tenant"
        variant="glass"
      >
        <div className="space-y-4">
          <Input label="Tenant Name" placeholder="Enter tenant name" />
          <Input label="Domain" placeholder="tenant.xerobookz.com" />
          <Input label="Contact Email" type="email" placeholder="contact@tenant.com" />
          <div className="flex gap-3 pt-4">
            <Button
              variant="gradient"
              className="flex-1"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Create Tenant
            </Button>
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </LayoutShell>
  );
}
