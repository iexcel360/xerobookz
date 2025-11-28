"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function LMSPortalPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [courses] = useState([
    { id: "1", title: "Leadership Fundamentals", category: "Management", enrollments: 25, status: "published" },
    { id: "2", title: "Python Basics", category: "Technical", enrollments: 18, status: "published" },
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
        currentPath: "/lms/portal",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="LMS Portal"
        description="Manage learning courses and assignments"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Courses</h3>
            <Button variant="primary">Create Course</Button>
          </div>
          <Table
            headers={["Title", "Category", "Enrollments", "Status", "Actions"]}
            rows={courses.map((course) => [
              course.title,
              course.category,
              course.enrollments,
              <Badge key={course.id} variant="success">{course.status}</Badge>,
              <Button key={course.id} variant="ghost" size="sm">Manage</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

