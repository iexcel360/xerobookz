"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Badge } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function MyReviewsPage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [reviews] = useState([
    { id: "1", cycle: "Q1 2024", status: "completed", rating: 4.5, completedDate: "2024-03-31" },
    { id: "2", cycle: "Q2 2024", status: "pending", rating: null, completedDate: null },
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
        currentPath: "/performance/my-reviews",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="My Performance Reviews"
        description="View your performance reviews and ratings"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-secondary-700">{review.cycle}</p>
                  <p className="text-sm text-grey-600">
                    {review.status === "completed" ? `Completed: ${review.completedDate}` : "Pending review"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {review.rating && (
                    <Badge variant="success">Rating: {review.rating}</Badge>
                  )}
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

