"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function PerformanceDashboardPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [stats] = useState({
    reviewsCompleted: 45,
    reviewsPending: 12,
    averageRating: 4.2,
    okrsActive: 23,
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
        currentPath: "/performance/dashboard",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Performance Dashboard"
        description="Overview of performance metrics and reviews"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Reviews Completed</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.reviewsCompleted}</p>
            </div>
            <IconBox icon="check-circle" size="md" variant="success" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Reviews Pending</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.reviewsPending}</p>
            </div>
            <IconBox icon="clock" size="md" variant="warning" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Average Rating</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.averageRating}</p>
            </div>
            <IconBox icon="star" size="md" variant="accent" />
          </div>
        </Card>
        <Card variant="floating" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-grey-600 mb-1">Active OKRs</p>
              <p className="text-2xl font-bold text-secondary-700">{stats.okrsActive}</p>
            </div>
            <IconBox icon="target" size="md" variant="primary" />
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

