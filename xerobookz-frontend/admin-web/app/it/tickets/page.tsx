"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function ITTicketsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [tickets, setTickets] = useState([
    { id: "1", number: "IT-001", subject: "Laptop issue", category: "hardware", status: "open", priority: "high" },
    { id: "2", number: "IT-002", subject: "Software access", category: "access", status: "in_progress", priority: "medium" },
  ]);

  const sidebarItems = [
    { label: "HRIS Configuration", href: "/hris/configuration" },
    { label: "Compensation Bands", href: "/compensation/bands" },
    { label: "Payroll Configuration", href: "/payroll/configuration" },
    { label: "Global HR Rules", href: "/global-hr/rules" },
    { label: "Benefits Plans", href: "/benefits/plans" },
    { label: "IT Tickets", href: "/it/tickets" },
    { label: "Recruiting Jobs", href: "/recruiting/jobs" },
    { label: "Performance Cycles", href: "/performance/cycles" },
    { label: "LMS Courses", href: "/lms/courses" },
    { label: "Survey Templates", href: "/surveys/templates" },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/it/tickets",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="IT Tickets"
        description="Manage IT service tickets and requests"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">IT Tickets</h3>
            <Button variant="primary">New Ticket</Button>
          </div>
          <Table
            columns={[
              { key: "number", label: "Ticket #" },
              { key: "subject", label: "Subject" },
              { key: "category", label: "Category" },
              { key: "status", label: "Status", render: (value) => <Badge variant={value === "open" ? "warning" : "info"}>{value}</Badge> },
              { key: "priority", label: "Priority", render: (value) => <Badge variant={value === "high" ? "danger" : "default"}>{value}</Badge> },
              { key: "actions", label: "Actions", render: () => <Button variant="ghost" size="sm">View</Button> },
            ]}
            data={tickets}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

