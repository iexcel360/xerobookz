import React from "react";
import { cn } from "../utils/cn";
import { XeroBookzLogo } from "./XeroBookzLogo";
import { Icon, IconName } from "./Icon";

export interface SidebarItem {
  label: string;
  href: string;
  icon?: IconName;
  badge?: number;
}

export interface SidebarProps {
  items: SidebarItem[];
  currentPath?: string;
  onNavigate?: (href: string) => void;
  collapsed?: boolean;
  homeHref?: string;
  onHomeClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  currentPath,
  onNavigate,
  collapsed = false,
  homeHref = "/",
  onHomeClick,
}) => {
  return (
    <div className={cn(
      "h-full bg-white border-r border-grey-200 flex flex-col transition-all duration-200",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 border-b border-grey-200">
        {homeHref ? (
          <a href={homeHref} onClick={onHomeClick}>
            <XeroBookzLogo size={collapsed ? "md" : "xl"} />
          </a>
        ) : (
          <XeroBookzLogo size={collapsed ? "md" : "xl"} onClick={onHomeClick} />
        )}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item, index) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(item.href);
                }
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150",
                "hover:bg-grey-50",
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-secondary-600 hover:text-secondary-800",
                collapsed && "justify-center"
              )}
            >
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={20}
                    variant={isActive ? "primary" : "default"}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-primary-600" : "text-grey-500"
                    )}
                  />
                )}
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </div>
              {!collapsed && item.badge && (
                <span className="bg-danger-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
