"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function BenefitsPlansPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [plans, setPlans] = useState([
    { id: "1", name: "Health Plan A", type: "health", status: "active", enrollments: 45 },
    { id: "2", name: "Dental Plan B", type: "dental", status: "active", enrollments: 32 },
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
        currentPath: "/benefits/plans",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Benefits Plans"
        description="Manage employee benefits plans and enrollments"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Benefits Plans</h3>
            <Button variant="primary">Add Plan</Button>
          </div>
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "type", label: "Type" },
              { key: "status", label: "Status", render: (value) => <Badge variant="success">{value}</Badge> },
              { key: "enrollments", label: "Enrollments" },
              { key: "actions", label: "Actions", render: () => <Button variant="ghost" size="sm">Edit</Button> },
            ]}
            data={plans}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

