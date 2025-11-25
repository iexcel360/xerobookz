import React from "react";
import { cn } from "../utils/cn";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumbs,
  className,
}) => {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-3 flex items-center space-x-2 text-sm text-grey-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-grey-400">/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-secondary-700 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-secondary-800 mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-base text-grey-600 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
