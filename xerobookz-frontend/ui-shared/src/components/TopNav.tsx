import React from "react";
import { UserAvatar } from "./UserAvatar";
import { TenantSelector } from "./TenantSelector";
import { cn } from "../utils/cn";

export interface TopNavProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  tenant?: {
    id: string;
    name: string;
  };
  onTenantChange?: (tenantId: string) => void;
  onLogout?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  user,
  tenant,
  onTenantChange,
  onLogout,
  actions,
  className,
}) => {
  return (
    <div className={cn(
      "h-16 bg-white border-b border-grey-200 flex items-center justify-between px-6",
      className
    )}>
      <div className="flex items-center space-x-4">
        {tenant && (
          <TenantSelector
            currentTenant={tenant}
            onTenantChange={onTenantChange}
          />
        )}
      </div>
      <div className="flex items-center space-x-4">
        {actions}
        {user && (
          <div className="flex items-center space-x-3">
            <UserAvatar user={user} />
            <div className="text-sm">
              <p className="font-medium text-secondary-800">{user.name || user.email}</p>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-grey-600 hover:text-secondary-800 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
