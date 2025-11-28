"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function ClockInOutPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime] = useState(new Date().toLocaleTimeString());

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
        currentPath: "/attendance/clock",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Clock In/Out"
        description="Record your work hours"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="text-center">
            <div className="mb-6">
              <IconBox icon="clock" size="xl" variant="primary" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-700 mb-2">{currentTime}</h2>
            <p className="text-grey-600 mb-6">
              {clockedIn ? "You are currently clocked in" : "You are currently clocked out"}
            </p>
            <Button
              variant={clockedIn ? "danger" : "primary"}
              size="lg"
              onClick={() => setClockedIn(!clockedIn)}
            >
              {clockedIn ? "Clock Out" : "Clock In"}
            </Button>
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

