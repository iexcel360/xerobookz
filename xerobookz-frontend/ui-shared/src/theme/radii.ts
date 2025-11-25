/**
 * XeroBookz Design System - Border Radius System
 * Consistent rounded corners for modern, friendly UI
 */

export const radii = {
  none: "0px",
  sm: "4px",
  default: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
};

/**
 * Radius utilities for common components
 */
export const componentRadii = {
  button: radii.lg,
  input: radii.lg,
  card: radii["2xl"],
  modal: radii["2xl"],
  badge: radii.full,
  avatar: radii.full,
  sidebar: radii.xl,
  navbar: radii.lg,
};

