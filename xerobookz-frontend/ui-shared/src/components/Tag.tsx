import React from "react";
import { Badge } from "./Badge";

export interface TagProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export const Tag: React.FC<TagProps> = ({ label, variant = "default" }) => {
  return <Badge variant={variant}>{label}</Badge>;
};

