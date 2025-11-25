import React from "react";
import { cn } from "../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "default" | "glass" | "elevated" | "floating";
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, children, variant = "default", hover = false, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-grey-200 shadow-soft rounded-xl",
      glass: "bg-white/95 backdrop-blur-sm border border-grey-200/50 shadow-soft rounded-xl",
      elevated: "bg-white shadow-elevated border border-grey-100 rounded-xl",
      floating: "bg-white shadow-floating border border-grey-200/50 rounded-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 transition-all duration-200",
          variantStyles[variant],
          hover && "hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer",
          className
        )}
        {...props}
      >
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-secondary-800 mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-grey-600 leading-relaxed">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
