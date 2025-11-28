"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function RecruitingJobsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [jobs] = useState([
    { id: "1", title: "Senior Software Engineer", department: "Engineering", status: "published", applications: 12 },
    { id: "2", title: "Product Manager", department: "Product", status: "draft", applications: 0 },
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
        currentPath: "/recruiting/jobs",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Job Postings"
        description="Manage job postings and positions"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Job Postings</h3>
            <Button variant="primary">Post New Job</Button>
          </div>
          <Table
            headers={["Title", "Department", "Status", "Applications", "Actions"]}
            rows={jobs.map((job) => [
              job.title,
              job.department,
              <Badge key={job.id} variant={job.status === "published" ? "success" : "secondary"}>{job.status}</Badge>,
              job.applications,
              <Button key={job.id} variant="ghost" size="sm">View</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

