import React, { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { Button } from "./Button";

export interface HeroProps {
  title: string | string[];
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  background?: "gradient" | "soft" | "none";
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  background = "none",
  className,
}) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = Array.isArray(title) ? title : [title];

  useEffect(() => {
    if (titles.length > 1) {
      const interval = setInterval(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [titles.length]);

  const backgroundStyles = {
    gradient: "bg-grey-50",
    soft: "bg-white",
    none: "bg-transparent",
  };

  return (
    <section
      className={cn(
        "relative py-20 md:py-24 text-center",
        backgroundStyles[background],
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        {subtitle && (
          <p className="text-sm font-medium text-primary-600 mb-3 uppercase tracking-wide">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-semibold text-secondary-800 leading-tight mb-6">
          {titles[currentTitleIndex]}
        </h1>
        {description && (
          <p className="text-lg text-grey-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {primaryAction && (
              <Button size="lg" variant="default" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
