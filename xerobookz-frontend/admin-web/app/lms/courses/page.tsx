"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function LMSCoursesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [courses, setCourses] = useState([
    { id: "1", title: "Leadership Fundamentals", category: "Management", duration: 120, status: "published" },
    { id: "2", title: "Python Basics", category: "Technical", duration: 180, status: "draft" },
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
        currentPath: "/lms/courses",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="LMS Courses"
        description="Manage learning management system courses"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Courses</h3>
            <Button variant="primary">Create Course</Button>
          </div>
          <Table
            headers={["Title", "Category", "Duration (min)", "Status", "Actions"]}
            rows={courses.map((course) => [
              course.title,
              course.category,
              course.duration,
              <Badge key={course.id} variant={course.status === "published" ? "success" : "secondary"}>{course.status}</Badge>,
              <Button key={course.id} variant="ghost" size="sm">Edit</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

