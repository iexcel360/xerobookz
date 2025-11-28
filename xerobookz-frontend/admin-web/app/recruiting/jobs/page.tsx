"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function RecruitingJobsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [jobs, setJobs] = useState([
    { id: "1", title: "Senior Software Engineer", status: "published", applications: 12 },
    { id: "2", title: "Product Manager", status: "draft", applications: 0 },
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
        title="Recruiting Jobs"
        description="Manage job postings and applications"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Job Postings</h3>
            <Button variant="primary">Post Job</Button>
          </div>
          <Table
            columns={[
              { key: "title", label: "Title" },
              { key: "status", label: "Status", render: (value) => <Badge variant={value === "published" ? "success" : "default"}>{value}</Badge> },
              { key: "applications", label: "Applications" },
              { key: "actions", label: "Actions", render: () => <Button variant="ghost" size="sm">View</Button> },
            ]}
            data={jobs}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

