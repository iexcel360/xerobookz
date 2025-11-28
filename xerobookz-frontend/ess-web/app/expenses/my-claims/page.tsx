"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge, Table } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function MyExpensesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [claims] = useState([
    { id: "1", amount: "$250.00", category: "Travel", status: "pending", date: "2024-01-15" },
    { id: "2", amount: "$150.00", category: "Meals", status: "approved", date: "2024-01-14" },
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
        currentPath: "/expenses/my-claims",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="My Expense Claims"
        description="Submit and track your expense claims"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Expense Claims</h3>
            <Button variant="primary">New Claim</Button>
          </div>
          <Table
            columns={[
              { key: "amount", label: "Amount" },
              { key: "category", label: "Category" },
              { key: "date", label: "Date" },
              { key: "status", label: "Status", render: (value) => <Badge variant={value === "approved" ? "success" : "warning"}>{value}</Badge> },
              { key: "actions", label: "Actions", render: () => <Button variant="ghost" size="sm">View</Button> },
            ]}
            data={claims}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

