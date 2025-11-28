"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Input, Select } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function GlobalHRRulesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [rules, setRules] = useState([
    { id: "1", country: "US", rule: "Minimum wage compliance", status: "active" },
    { id: "2", country: "UK", rule: "Holiday entitlement", status: "active" },
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
        currentPath: "/global-hr/rules",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Global HR Rules"
        description="Configure HR rules and compliance by country"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Global HR Rules</h3>
            <Button variant="primary">Add Rule</Button>
          </div>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-secondary-700">{rule.country} - {rule.rule}</p>
                  <p className="text-sm text-grey-600">Status: {rule.status}</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

