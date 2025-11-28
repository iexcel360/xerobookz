"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function MyCoursesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [courses] = useState([
    { id: "1", title: "Leadership Fundamentals", progress: 60, status: "in_progress" },
    { id: "2", title: "Python Basics", progress: 100, status: "completed" },
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
        currentPath: "/learning/my-courses",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="My Learning Courses"
        description="Access your assigned courses and track progress"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-secondary-700">{course.title}</p>
                  <Badge variant={course.status === "completed" ? "success" : "info"}>{course.status}</Badge>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-2 mt-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-sm text-grey-600 mt-2">{course.progress}% complete</p>
                <div className="mt-4">
                  <Button variant="primary" size="sm">Continue Learning</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

