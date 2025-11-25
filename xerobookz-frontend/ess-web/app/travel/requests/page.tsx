"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge, Table } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function TravelRequestsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [requests] = useState([
    { id: "1", destination: "New York", startDate: "2024-02-15", endDate: "2024-02-18", status: "pending", amount: "$500" },
    { id: "2", destination: "San Francisco", startDate: "2024-03-01", endDate: "2024-03-03", status: "approved", amount: "$800" },
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
        currentPath: "/travel/requests",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Travel Requests"
        description="Submit and track travel requests"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Travel Requests</h3>
            <Button variant="primary">New Request</Button>
          </div>
          <Table
            headers={["Destination", "Start Date", "End Date", "Amount", "Status", "Actions"]}
            rows={requests.map((req) => [
              req.destination,
              req.startDate,
              req.endDate,
              req.amount,
              <Badge key={req.id} variant={req.status === "approved" ? "success" : "warning"}>{req.status}</Badge>,
              <Button key={req.id} variant="ghost" size="sm">View</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

