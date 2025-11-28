"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function RecruitingApplicationsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [applications] = useState([
    { id: "1", candidate: "John Doe", job: "Senior Software Engineer", status: "screening", appliedDate: "2024-01-15" },
    { id: "2", candidate: "Jane Smith", job: "Product Manager", status: "interview", appliedDate: "2024-01-14" },
  ]);

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
        currentPath: "/recruiting/applications",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Applications"
        description="Review and manage job applications"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <Table
            headers={["Candidate", "Job", "Status", "Applied Date", "Actions"]}
            rows={applications.map((app) => [
              app.candidate,
              app.job,
              <Badge key={app.id} variant="info">{app.status}</Badge>,
              app.appliedDate,
              <Button key={app.id} variant="ghost" size="sm">Review</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

