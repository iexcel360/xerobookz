import React from "react";
import { cn } from "../utils/cn";

export interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.[0].toUpperCase() || "?";

  return (
    <div
      className={cn(
        "rounded-full bg-primary text-white flex items-center justify-center font-medium",
        sizeClasses[size]
      )}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name || user.email}
          className="rounded-full w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

