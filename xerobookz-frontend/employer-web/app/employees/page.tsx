"use client";

import { useState, useEffect } from "react";
import { LayoutShell, PageHeader, Card, DataGrid, Button, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import { employeeApi } from "@xerobookz/api-clients";

export default function EmployeesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [employeesData, setEmployeesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    employeeApi.getEmployees()
      .then((result) => {
        if (result.success) {
          setEmployeesData(result);
        }
      })
      .catch(() => {
        // Handle error silently
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard", icon: "briefcase" as const },
    { label: "Employees", href: "/employees", icon: "users" as const },
    { label: "I-9", href: "/i9", icon: "file-check" as const },
    { label: "PAF", href: "/paf", icon: "zap" as const },
    { label: "Immigration", href: "/immigration", icon: "plane" as const },
    { label: "Timesheets", href: "/timesheets", icon: "clock" as const },
    { label: "Leave", href: "/leave", icon: "calendar" as const },
    { label: "Safety", href: "/safety", icon: "shield" as const },
    { label: "Finance", href: "/finance", icon: "briefcase" as const },
  ];

  const columns = [
    { key: "employee_number", label: "Employee #" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
        {value}
      </span>
    )},
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/employees",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Employees"
        description="Manage your organization's employees"
        actions={
          <Button variant="gradient">
            <Icon name="user-plus" size={18} className="mr-2" />
            Add Employee
          </Button>
        }
      />

      <Card variant="floating" className="p-6">
        <DataGrid
          columns={columns}
          data={employeesData?.data || []}
          loading={isLoading}
        />
      </Card>
    </LayoutShell>
  );
}
