"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Input, Table } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function CompensationBandsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [bands, setBands] = useState([
    { id: "1", name: "Engineering L1", min: 80000, max: 120000, currency: "USD" },
    { id: "2", name: "Engineering L2", min: 120000, max: 160000, currency: "USD" },
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
        currentPath: "/compensation/bands",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Compensation Bands"
        description="Manage compensation bands and salary ranges"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Compensation Bands</h3>
            <Button variant="primary">Add Band</Button>
          </div>
          <Table
            headers={["Name", "Min Salary", "Max Salary", "Currency", "Actions"]}
            rows={bands.map((band) => [
              band.name,
              `$${band.min.toLocaleString()}`,
              `$${band.max.toLocaleString()}`,
              band.currency,
              <Button key={band.id} variant="ghost" size="sm">Edit</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

