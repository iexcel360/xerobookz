import React from "react";
import { Badge } from "./Badge";

export interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  variant = "default",
}) => {
  return (
    <Badge variant={variant} className="flex items-center space-x-1">
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-gray-600"
          type="button"
        >
          ×
        </button>
      )}
    </Badge>
  );
};

