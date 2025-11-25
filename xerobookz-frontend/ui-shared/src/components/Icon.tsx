import React from "react";
import { cn } from "../utils/cn";
import {
  FileText,
  Globe,
  Users,
  Folder,
  Clock,
  Zap,
  Shield,
  Building2,
  User,
  CheckCircle,
  AlertCircle,
  Calendar,
  Briefcase,
  FileCheck,
  Sparkles,
  Settings,
  UserCog,
  UserCircle,
  Building,
  Timer,
  Rocket,
  Plane,
  UserPlus,
  Files,
} from "lucide-react";

export type IconName =
  | "file-text"
  | "globe"
  | "users"
  | "folder"
  | "clock"
  | "zap"
  | "shield"
  | "building"
  | "user"
  | "check-circle"
  | "alert-circle"
  | "calendar"
  | "briefcase"
  | "file-check"
  | "sparkles"
  | "settings"
  | "user-cog"
  | "user-circle"
  | "building2"
  | "timer"
  | "rocket"
  | "plane"
  | "user-plus"
  | "files";

const iconMap: Record<IconName, React.ComponentType<any>> = {
  "file-text": FileText,
  globe: Globe,
  users: Users,
  folder: Folder,
  clock: Clock,
  zap: Zap,
  shield: Shield,
  building: Building,
  user: User,
  "check-circle": CheckCircle,
  "alert-circle": AlertCircle,
  calendar: Calendar,
  briefcase: Briefcase,
  "file-check": FileCheck,
  sparkles: Sparkles,
  settings: Settings,
  "user-cog": UserCog,
  "user-circle": UserCircle,
  building2: Building2,
  timer: Timer,
  rocket: Rocket,
  plane: Plane,
  "user-plus": UserPlus,
  files: Files,
};

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  variant?: "default" | "primary" | "accent" | "secondary" | "gradient";
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  strokeWidth = 2,
  variant = "default",
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const variantClasses = {
    default: "text-secondary-700",
    primary: "text-primary-600",
    accent: "text-accent-600",
    secondary: "text-secondary-600",
    gradient: "bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent",
  };

  return (
    <IconComponent
      size={typeof size === "string" ? parseInt(size) : size}
      className={cn(
        "transition-all duration-200",
        variantClasses[variant],
        className
      )}
      strokeWidth={strokeWidth}
    />
  );
};

