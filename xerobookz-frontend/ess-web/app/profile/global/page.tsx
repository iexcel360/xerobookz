"use client";

import { useState } from "react";
import { LayoutShell, PageHeader, Card, Button, Input } from "@xerobookz/ui-shared";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export default function GlobalProfilePage() {
  const { user, logout } = useAuth();
  const { currentTenant } = useTenant();
  const [profile, setProfile] = useState({
    country: "US",
    workLocation: "Remote",
    timezone: "America/New_York",
    language: "English",
    currency: "USD",
  });

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
        currentPath: "/profile/global",
        onNavigate: (href) => (window.location.href = href),
      }}
      topNav={{
        user: user || undefined,
        tenant: currentTenant || undefined,
        onLogout: logout,
      }}
    >
      <PageHeader
        title="Global Profile"
        description="Manage your global profile and preferences"
      />

      <div className="space-y-6">
        <Card variant="floating" className="p-6">
          <h3 className="text-lg font-bold text-secondary-700 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Country</label>
              <Input
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Work Location</label>
              <Input
                value={profile.workLocation}
                onChange={(e) => setProfile({ ...profile, workLocation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Timezone</label>
              <Input
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Language</label>
              <Input
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Currency</label>
              <Input
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button variant="primary">Save Changes</Button>
          </div>
        </Card>
      </div>
    </LayoutShell>
  );
}

