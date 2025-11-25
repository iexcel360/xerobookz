"use client";

import { useState, useEffect } from "react";
import { LayoutShell, PageHeader, Card, Button, DataGrid, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { timesheetApi } from "@xerobookz/api-clients";

export default function MyTimesheetsPage() {
  const { user } = useAuth();
  const [timesheetsData, setTimesheetsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    timesheetApi.getTimesheets()
      .then((result) => {
        if (result.success) {
          setTimesheetsData(result);
        }
      })
      .catch(() => {
        // Handle error silently
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard", icon: "briefcase" as const },
    { label: "Documents", href: "/documents", icon: "files" as const },
    { label: "Timesheets", href: "/timesheets", icon: "clock" as const },
  ];

  const columns = [
    { key: "period_start", label: "Period Start" },
    { key: "period_end", label: "Period End" },
    { key: "total_hours", label: "Hours" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
        {value}
      </span>
    )},
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/timesheets",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
      }}
    >
      <PageHeader
        title="My Timesheets"
        description="View and submit your timesheets"
        actions={
          <Button variant="gradient">
            <Icon name="file-text" size={18} className="mr-2" />
            Submit Timesheet
          </Button>
        }
      />

      <Card variant="floating" className="p-6">
        <DataGrid
          columns={columns}
          data={timesheetsData?.data || []}
          loading={isLoading}
        />
      </Card>
    </LayoutShell>
  );
}
