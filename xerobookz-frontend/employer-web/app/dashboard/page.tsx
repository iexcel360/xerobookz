"use client";

import { useState, useEffect } from "react";
import { LayoutShell, PageHeader, Card, Badge, Button, IconBox } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import { employeeApi } from "@xerobookz/api-clients";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [employeesData, setEmployeesData] = useState<any>(null);

  useEffect(() => {
    employeeApi.getEmployees()
      .then((result) => {
        if (result.success) {
          setEmployeesData(result);
        }
      })
      .catch(() => {
        // Handle error silently
      });
  }, []);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Employees", href: "/employees" },
    { label: "I-9", href: "/i9" },
    { label: "PAF", href: "/paf" },
    { label: "Immigration", href: "/immigration" },
    { label: "Timesheets", href: "/timesheets" },
    { label: "Leave", href: "/leave" },
    { label: "Safety", href: "/safety" },
    { label: "Finance", href: "/finance" },
  ];

  const stats = [
    { label: "Total Employees", value: employeesData?.data?.length || 0, icon: "users" as const, color: "primary" },
    { label: "I-9 Pending", value: 5, badge: true, icon: "file-check" as const, color: "warning" },
    { label: "E-Verify Cases", value: 12, icon: "check-circle" as const, color: "info" },
    { label: "PAFs Generated", value: 8, icon: "zap" as const, color: "accent" },
    { label: "Timesheets Awaiting", value: 15, badge: true, icon: "clock" as const, color: "warning" },
    { label: "Leave Requests", value: 3, badge: true, icon: "calendar" as const, color: "info" },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/dashboard",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
        tenant: currentTenant,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Dashboard"
        description="Overview of your HR operations and compliance status"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            variant="floating"
            hover
            className="p-6 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <IconBox
                icon={stat.icon}
                size="md"
                variant={stat.color === "primary" ? "primary" : stat.color === "accent" ? "accent" : "primary"}
                gradient
                className="group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              />
              {stat.badge && (
                <Badge variant="warning" className="animate-pulse">
                  Action Required
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-grey-600 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}
