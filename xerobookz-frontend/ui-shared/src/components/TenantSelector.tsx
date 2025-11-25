import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

export interface Tenant {
  id: string;
  name: string;
}

export interface TenantSelectorProps {
  currentTenant: Tenant;
  tenants?: Tenant[];
  onTenantChange?: (tenantId: string) => void;
}

export const TenantSelector: React.FC<TenantSelectorProps> = ({
  currentTenant,
  tenants = [],
  onTenantChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-grey transition-colors"
      >
        <span className="text-sm font-medium text-secondary">
          {currentTenant.name}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
      {isOpen && tenants.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {tenants.map((tenant) => (
            <button
              key={tenant.id}
              onClick={() => {
                onTenantChange?.(tenant.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm hover:bg-grey transition-colors",
                tenant.id === currentTenant.id && "bg-primary text-white"
              )}
            >
              {tenant.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

