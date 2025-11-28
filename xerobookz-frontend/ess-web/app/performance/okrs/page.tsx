"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function MyOKRsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [okrs] = useState([
    { id: "1", objective: "Improve code quality", progress: 75, status: "active" },
    { id: "2", objective: "Complete project milestone", progress: 50, status: "active" },
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
        currentPath: "/performance/okrs",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="My OKRs"
        description="Track your objectives and key results"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="space-y-4">
            {okrs.map((okr) => (
              <div key={okr.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-secondary-700">{okr.objective}</p>
                  <Badge variant="success">{okr.status}</Badge>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-2 mt-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${okr.progress}%` }}></div>
                </div>
                <p className="text-sm text-grey-600 mt-2">{okr.progress}% complete</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="primary">Add OKR</Button>
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

