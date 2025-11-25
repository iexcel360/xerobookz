"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Input } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function HRISConfigurationPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [config, setConfig] = useState({
    enableCompensation: true,
    enableBenefits: true,
    enablePerformance: true,
    enableSkills: true,
    enableGlobalProfile: true,
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
        currentPath: "/hris/configuration",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="HRIS Configuration"
        description="Configure HRIS features and settings"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <h3 className="text-lg font-bold text-secondary-700 mb-4">Feature Toggles</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-700">Compensation Management</label>
              <input
                type="checkbox"
                checked={config.enableCompensation}
                onChange={(e) => setConfig({ ...config, enableCompensation: e.target.checked })}
                className="w-5 h-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-700">Benefits Administration</label>
              <input
                type="checkbox"
                checked={config.enableBenefits}
                onChange={(e) => setConfig({ ...config, enableBenefits: e.target.checked })}
                className="w-5 h-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-700">Performance Reviews</label>
              <input
                type="checkbox"
                checked={config.enablePerformance}
                onChange={(e) => setConfig({ ...config, enablePerformance: e.target.checked })}
                className="w-5 h-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-700">Skills Tracking</label>
              <input
                type="checkbox"
                checked={config.enableSkills}
                onChange={(e) => setConfig({ ...config, enableSkills: e.target.checked })}
                className="w-5 h-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-secondary-700">Global Profile</label>
              <input
                type="checkbox"
                checked={config.enableGlobalProfile}
                onChange={(e) => setConfig({ ...config, enableGlobalProfile: e.target.checked })}
                className="w-5 h-5 text-primary-600"
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

