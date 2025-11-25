"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Tenant {
  id: string;
  name: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  setTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const tenantId = localStorage.getItem("xerobookz_tenant_id");
    const tenantName = localStorage.getItem("xerobookz_tenant_name");
    if (tenantId && tenantName) {
      setCurrentTenant({ id: tenantId, name: tenantName });
    }
  }, []);

  const setTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    localStorage.setItem("xerobookz_tenant_id", tenant.id);
    localStorage.setItem("xerobookz_tenant_name", tenant.name);
  };

  return (
    <TenantContext.Provider value={{ currentTenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}

