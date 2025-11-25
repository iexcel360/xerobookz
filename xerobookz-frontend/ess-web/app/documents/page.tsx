"use client";

import { useState, useEffect } from "react";
import { LayoutShell, PageHeader, Card, Button, Icon } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { employeeApi } from "@xerobookz/api-clients";

export default function MyDocumentsPage() {
  const { user } = useAuth();
  // In real app, get employee ID from auth context
  const employeeId = "employee-id";
  const [documentsData, setDocumentsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (employeeId) {
      employeeApi.getEmployeeDocuments(employeeId)
        .then((result) => {
          if (result.success) {
            setDocumentsData(result);
          }
        })
        .catch(() => {
          // Handle error silently
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [employeeId]);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Documents", href: "/documents" },
    { label: "Timesheets", href: "/timesheets" },
  ];

  return (
    <LayoutShell
      sidebar={{
        items: sidebarItems,
        currentPath: "/documents",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user,
      }}
    >
      <PageHeader
        title="My Documents"
        description="Access and manage your personal documents"
        actions={
          <Button variant="gradient">
            Upload Document
          </Button>
        }
      />

      <Card variant="floating" className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          </div>
        ) : documentsData?.data?.length > 0 ? (
          <div className="space-y-4">
            {documentsData.data.map((doc: any, index: number) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-grey-200 bg-white/50 hover:bg-white hover:shadow-soft transition-all duration-200 animate-fade-in-up flex items-center gap-4 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-3 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors">
                  <Icon name="file-text" size={24} variant="primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-700 mb-1">{doc.filename}</h3>
                  <p className="text-sm text-grey-600">{doc.document_type}</p>
                </div>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary-50">
                  <Icon name="folder" size={16} variant="primary" className="mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="files" size={48} variant="primary" className="mx-auto mb-4 opacity-50" />
            <p className="text-grey-600">No documents found</p>
          </div>
        )}
      </Card>
    </LayoutShell>
  );
}
