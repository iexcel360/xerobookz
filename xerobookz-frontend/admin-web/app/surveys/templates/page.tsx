"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function SurveyTemplatesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [surveys, setSurveys] = useState([
    { id: "1", title: "Employee Satisfaction Survey", status: "active", responses: 45 },
    { id: "2", title: "Onboarding Feedback", status: "draft", responses: 0 },
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
        currentPath: "/surveys/templates",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Survey Templates"
        description="Manage survey templates and responses"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Surveys</h3>
            <Button variant="primary">Create Survey</Button>
          </div>
          <Table
            headers={["Title", "Status", "Responses", "Actions"]}
            rows={surveys.map((survey) => [
              survey.title,
              <Badge key={survey.id} variant={survey.status === "active" ? "success" : "secondary"}>{survey.status}</Badge>,
              survey.responses,
              <Button key={survey.id} variant="ghost" size="sm">View</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

