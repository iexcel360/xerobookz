"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function SurveysDashboardPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [surveys] = useState([
    { id: "1", title: "Employee Satisfaction", status: "active", responses: 45, completion: "75%" },
    { id: "2", title: "Onboarding Feedback", status: "closed", responses: 32, completion: "100%" },
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
        currentPath: "/surveys/dashboard",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Surveys Dashboard"
        description="Manage surveys and view responses"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Surveys</h3>
            <Button variant="primary">Create Survey</Button>
          </div>
          <Table
            headers={["Title", "Status", "Responses", "Completion", "Actions"]}
            rows={surveys.map((survey) => [
              survey.title,
              <Badge key={survey.id} variant={survey.status === "active" ? "success" : "secondary"}>{survey.status}</Badge>,
              survey.responses,
              survey.completion,
              <Button key={survey.id} variant="ghost" size="sm">View Results</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

