"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function PerformanceCyclesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [cycles, setCycles] = useState([
    { id: "1", name: "Q1 2024", startDate: "2024-01-01", endDate: "2024-03-31", status: "active" },
    { id: "2", name: "Q2 2024", startDate: "2024-04-01", endDate: "2024-06-30", status: "upcoming" },
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
        currentPath: "/performance/cycles",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Performance Cycles"
        description="Manage performance review cycles"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Performance Cycles</h3>
            <Button variant="primary">Create Cycle</Button>
          </div>
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "startDate", label: "Start Date" },
              { key: "endDate", label: "End Date" },
              { key: "status", label: "Status", render: (value) => <Badge variant={value === "active" ? "success" : "default"}>{value}</Badge> },
              { key: "actions", label: "Actions", render: () => <Button variant="ghost" size="sm">Edit</Button> },
            ]}
            data={cycles}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

