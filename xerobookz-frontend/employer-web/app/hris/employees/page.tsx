"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Table, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function HRISEmployeesPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [employees] = useState([
    { id: "1", name: "John Doe", department: "Engineering", compensation: "$120,000", benefits: "Health, Dental" },
    { id: "2", name: "Jane Smith", department: "Product", compensation: "$110,000", benefits: "Health" },
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
        currentPath: "/hris/employees",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="HRIS Employees"
        description="Manage employee HRIS data, compensation, and benefits"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary-700">Employees</h3>
            <Button variant="primary">Add Employee</Button>
          </div>
          <Table
            headers={["Name", "Department", "Compensation", "Benefits", "Actions"]}
            rows={employees.map((emp) => [
              emp.name,
              emp.department,
              emp.compensation,
              emp.benefits,
              <Button key={emp.id} variant="ghost" size="sm">View Details</Button>,
            ])}
          />
        </Card>
      </div>
    </LayoutShell>
  );
}

