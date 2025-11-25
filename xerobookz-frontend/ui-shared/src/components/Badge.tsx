import React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "primary" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantClasses = {
    default: "bg-grey-200 text-grey-700",
    success: "bg-accent-100 text-accent-700",
    warning: "bg-warning-100 text-warning-700",
    danger: "bg-danger-100 text-danger-700",
    info: "bg-info-100 text-info-700",
    primary: "bg-primary-100 text-primary-700",
    accent: "bg-accent-100 text-accent-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-soft",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
