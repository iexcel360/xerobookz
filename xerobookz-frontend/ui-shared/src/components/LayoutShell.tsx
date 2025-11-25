import React from "react";
import { cn } from "../utils/cn";
import { Sidebar, SidebarProps } from "./Sidebar";
import { TopNav, TopNavProps } from "./TopNav";

export interface LayoutShellProps {
  sidebar?: SidebarProps;
  topNav?: TopNavProps;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({
  sidebar,
  topNav,
  children,
  className,
  contentClassName,
}) => {
  return (
    <div className={cn("flex h-screen bg-gradient-background overflow-hidden", className)}>
      {sidebar && (
        <aside className="flex-shrink-0">
          <Sidebar {...sidebar} />
        </aside>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {topNav && (
          <header>
            <TopNav {...topNav} />
          </header>
        )}
        
        <main
          className={cn(
            "flex-1 overflow-y-auto p-8 animate-fade-in",
            contentClassName
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

