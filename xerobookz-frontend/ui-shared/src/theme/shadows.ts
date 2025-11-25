/**
 * XeroBookz Design System - Shadow System
 * Elevation-based shadow system for depth and hierarchy
 */

export const shadows = {
  // Soft shadows for subtle elevation
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  
  // Colored shadows for interactive elements
  primary: "0 10px 25px -5px rgba(42, 127, 255, 0.3)",
  primaryHover: "0 15px 35px -5px rgba(42, 127, 255, 0.4)",
  accent: "0 10px 25px -5px rgba(55, 214, 122, 0.3)",
  accentHover: "0 15px 35px -5px rgba(55, 214, 122, 0.4)",
  
  // Glassmorphism shadow
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  
  // Inner shadows
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
  
  // Floating card shadow
  floating: "0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  
  // Soft glow
  glow: "0 0 20px rgba(42, 127, 255, 0.2)",
  glowAccent: "0 0 20px rgba(55, 214, 122, 0.2)",
};

/**
 * Shadow utilities for Tailwind
 */
export const shadowUtilities = {
  "shadow-soft": shadows.md,
  "shadow-elevated": shadows.xl,
  "shadow-floating": shadows.floating,
  "shadow-glass": shadows.glass,
  "shadow-glow": shadows.glow,
  "shadow-glow-accent": shadows.glowAccent,
  "shadow-primary": shadows.primary,
  "shadow-primary-hover": shadows.primaryHover,
};

