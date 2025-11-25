import React from "react";
import { cn } from "../utils/cn";

export interface ProgressProps {
  value: number; // 0-100
  className?: string;
  variant?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className,
  variant = "primary",
  size = "md",
  showLabel = false,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantClasses = {
    primary: "bg-primary-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-grey-200 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-300", variantClasses[variant])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-grey-600 mt-1">{clampedValue}%</p>
      )}
    </div>
  );
};

