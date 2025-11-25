import React from "react";
import { cn } from "../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 shadow-soft",
        secondary: "bg-secondary-700 text-white hover:bg-secondary-800 shadow-soft",
        accent: "bg-accent-500 text-white hover:bg-accent-600 shadow-soft",
        danger: "bg-danger-500 text-white hover:bg-danger-600 shadow-soft",
        outline: "border border-grey-300 bg-white text-secondary-700 hover:bg-grey-50",
        ghost: "bg-transparent text-secondary-700 hover:bg-grey-100",
        gradient: "bg-gradient-primary text-white shadow-soft hover:shadow-elevated",
        glass: "bg-white/90 backdrop-blur-sm text-secondary-700 border border-grey-200 shadow-soft hover:bg-white",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg",
        default: "h-10 px-5 text-sm rounded-xl",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
