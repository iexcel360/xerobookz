"use client";

import { Sidebar, TopNav, Card, DataGrid, Button, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function I9Page() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Employees", href: "/employees" },
    { label: "I-9", href: "/i9" },
    { label: "PAF", href: "/paf" },
    { label: "Immigration", href: "/immigration" },
    { label: "Timesheets", href: "/timesheets" },
    { label: "Leave", href: "/leave" },
    { label: "Safety", href: "/safety" },
    { label: "Finance", href: "/finance" },
  ];

  const columns = [
    { key: "employee_name", label: "Employee" },
    { key: "status", label: "Status", render: (value: string) => <Badge variant={value === "complete" ? "success" : "warning"}>{value}</Badge> },
    { key: "section1_date", label: "Section 1" },
    { key: "section2_date", label: "Section 2" },
    { key: "actions", label: "Actions" },
  ];

  const mockData = [
    {
      employee_name: "John Doe",
      status: "pending",
      section1_date: "2024-01-15",
      section2_date: "-",
      actions: "View",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        currentPath="/i9"
        onNavigate={(href) => (window.location.href = href)}
      />
      <div className="flex-1 flex flex-col">
        <TopNav user={user} tenant={currentTenant} onLogout={logout} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary">I-9 Forms</h1>
            <Button>Create I-9</Button>
          </div>
          <Card>
            <DataGrid columns={columns} data={mockData} />
          </Card>
        </main>
      </div>
    </div>
  );
}

