import React from "react";
import { cn } from "../utils/cn";
import { Icon, IconName, IconProps } from "./Icon";

export interface IconBoxProps {
  icon: IconName;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: IconProps["variant"];
  className?: string;
  gradient?: boolean;
}

export const IconBox: React.FC<IconBoxProps> = ({
  icon,
  size = "lg",
  variant = "primary",
  className,
  gradient = false,
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl transition-all duration-200",
        gradient
          ? "bg-primary-50"
          : "bg-grey-50",
        sizeClasses[size],
        "group-hover:bg-grey-100",
        className
      )}
    >
      <Icon
        name={icon}
        size={iconSizes[size]}
        variant={variant}
        strokeWidth={2}
        className={cn(
          !gradient && "text-secondary-600"
        )}
      />
    </div>
  );
};
