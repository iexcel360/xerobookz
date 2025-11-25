"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function RecruitingDashboardPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [stats] = useState({
    activeJobs: 12,
    totalApplications: 145,
    interviewsScheduled: 8,
    offersExtended: 3,
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
        currentPath: "/recruiting/dashboard",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Recruiting Dashboard"
        description="Overview of recruiting activities and metrics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Active Jobs</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.activeJobs}</p>
            </div>
            <IconBox icon="briefcase" size="md" variant="primary" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.totalApplications}</p>
            </div>
            <IconBox icon="file-text" size="md" variant="secondary" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.interviewsScheduled}</p>
            </div>
            <IconBox icon="calendar" size="md" variant="accent" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Offers Extended</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.offersExtended}</p>
            </div>
            <IconBox icon="check-circle" size="md" variant="success" />
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

