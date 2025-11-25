"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function ExpensesManagementPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [expenses] = useState([
    { id: "1", employee: "John Doe", amount: "$250.00", category: "Travel", status: "pending", date: "2024-01-15" },
    { id: "2", employee: "Jane Smith", amount: "$150.00", category: "Meals", status: "approved", date: "2024-01-14" },
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
        currentPath: "/expenses/management",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Expense Management"
        description="Review and approve employee expense claims"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <Table
            headers={["Employee", "Amount", "Category", "Status", "Date", "Actions"]}
            rows={expenses.map((expense) => [
              expense.employee,
              expense.amount,
              expense.category,
              <Badge key={expense.id} variant={expense.status === "approved" ? "success" : "warning"}>{expense.status}</Badge>,
              expense.date,
              <Button key={expense.id} variant="ghost" size="sm">Review</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

