"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function PerformanceReviewsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [reviews] = useState([
    { id: "1", employee: "John Doe", cycle: "Q1 2024", status: "completed", rating: 4.5 },
    { id: "2", employee: "Jane Smith", cycle: "Q1 2024", status: "pending", rating: null },
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
        currentPath: "/performance/reviews",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Performance Reviews"
        description="Manage employee performance reviews"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <Table
            headers={["Employee", "Cycle", "Status", "Rating", "Actions"]}
            rows={reviews.map((review) => [
              review.employee,
              review.cycle,
              <Badge key={review.id} variant={review.status === "completed" ? "success" : "warning"}>{review.status}</Badge>,
              review.rating || "N/A",
              <Button key={review.id} variant="ghost" size="sm">View</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

