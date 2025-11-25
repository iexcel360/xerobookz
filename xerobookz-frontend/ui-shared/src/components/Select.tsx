import React from "react";
import { cn } from "../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  error = false,
  className,
  ...props
}) => {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-3 py-2 border rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error ? "border-red-500" : "border-grey-300",
        className
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

