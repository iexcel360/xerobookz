"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function MySurveysPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [surveys] = useState([
    { id: "1", title: "Employee Satisfaction Survey", status: "pending", dueDate: "2024-02-15" },
    { id: "2", title: "Onboarding Feedback", status: "completed", dueDate: "2024-01-30" },
  ]);

  const sidebarItems = [
    { label: "My Reviews", href: "/performance/my-reviews" },
    { label: "My OKRs", href: "/performance/okrs" },
    { label: "My Surveys", href: "/surveys/my-surveys" },
    { label: "My Courses", href: "/learning/my-courses" },
    { label: "Global Profile", href: "/profile/global" },
    { label: "Travel Requests", href: "/travel/requests" },
    { label: "My Expenses", href: "/expenses/my-claims" },
    { label: "Clock In/Out", href: "/attendance/clock" },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/surveys/my-surveys",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="My Surveys"
        description="Complete assigned surveys"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-secondary-700">{survey.title}</p>
                  <p className="text-sm text-grey-600">Due: {survey.dueDate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={survey.status === "completed" ? "success" : "warning"}>{survey.status}</Badge>
                  {survey.status === "pending" && (
                    <Button variant="primary" size="sm">Take Survey</Button>
                  )}
                  {survey.status === "completed" && (
                    <Button variant="ghost" size="sm">View Response</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

