"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function AttendanceDashboardPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [stats] = useState({
    clockedIn: 45,
    onTime: 42,
    late: 3,
    absent: 2,
  });

  const sidebarItems = [
    { label: "Recruiting Dashboard", href: "/recruiting/dashboard" },
    { label: "Jobs", href: "/recruiting/jobs" },
    { label: "Applications", href: "/recruiting/applications" },
    { label: "Performance Dashboard", href: "/performance/dashboard" },
    { label: "Performance Reviews", href: "/performance/reviews" },
    { label: "HRIS Employees", href: "/hris/employees" },
    { label: "Surveys", href: "/surveys/dashboard" },
    { label: "LMS Portal", href: "/lms/portal" },
    { label: "Expenses", href: "/expenses/management" },
    { label: "Attendance", href: "/attendance/dashboard" },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/attendance/dashboard",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Attendance Dashboard"
        description="Monitor employee attendance and time tracking"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Clocked In</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.clockedIn}</p>
            </div>
            <IconBox icon="clock" size="md" variant="primary" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">On Time</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.onTime}</p>
            </div>
            <IconBox icon="check-circle" size="md" variant="accent" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Late</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.late}</p>
            </div>
            <IconBox icon="alert-circle" size="md" variant="warning" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.absent}</p>
            </div>
            <IconBox icon="x-circle" size="md" variant="danger" />
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

