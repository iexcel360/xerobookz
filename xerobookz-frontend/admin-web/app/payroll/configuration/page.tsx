"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Input } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function PayrollConfigurationPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [config, setConfig] = useState({
    payFrequency: "biweekly",
    payDay: "Friday",
    defaultCurrency: "USD",
    taxProvider: "internal",
  });

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
        currentPath: "/payroll/configuration",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Payroll Configuration"
        description="Configure payroll settings and tax providers"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <h3 className="text-lg font-bold text-secondary-700 mb-4">Payroll Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Pay Frequency</label>
              <select
                value={config.payFrequency}
                onChange={(e) => setConfig({ ...config, payFrequency: e.target.value })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Pay Day</label>
              <select
                value={config.payDay}
                onChange={(e) => setConfig({ ...config, payDay: e.target.value })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Friday">Friday</option>
                <option value="Monday">Monday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Default Currency</label>
              <Input
                value={config.defaultCurrency}
                onChange={(e) => setConfig({ ...config, defaultCurrency: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button variant="primary">Save Configuration</Button>
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

