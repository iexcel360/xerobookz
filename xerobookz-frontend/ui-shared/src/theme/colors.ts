/**
 * XeroBookz Design System - Color Palette
 * Apple-inspired minimalist design with logo colors as subtle accents
 * Light backgrounds, muted colors, sophisticated minimalism
 */

export const colors = {
  // Primary Brand Colors - Muted logo blue, used sparingly as accent
  primary: {
    50: "#F0F9FF",   // Very light, almost white
    100: "#E0F2FE",  // Lightest blue tint
    200: "#BAE6FD",  // Subtle blue
    300: "#7DD3FC",  // Soft blue
    400: "#38BDF8",  // Medium soft blue
    500: "#0EA5E9",  // Main accent (muted from logo)
    600: "#0284C7",  // Logo blue (used sparingly)
    700: "#0369A1",  // Darker accent
    800: "#075985",  // Deep blue
    900: "#0C4A6E",  // Darkest
    DEFAULT: "#0EA5E9", // Softer, more Apple-like
  },
  
  // Secondary/Neutral Colors - Apple's sophisticated grays
  secondary: {
    50: "#FAFAFA",   // Almost white
    100: "#F5F5F5",  // Very light gray
    200: "#E5E5E5",  // Light gray
    300: "#D4D4D4",  // Medium light gray
    400: "#A3A3A3",  // Medium gray
    500: "#737373",  // Neutral gray
    600: "#525252",  // Dark gray
    700: "#404040",  // Darker gray
    800: "#262626",  // Very dark gray
    900: "#171717",  // Almost black
    DEFAULT: "#404040", // Apple's text color
  },
  
  // Accent Colors - Subtle, sophisticated green (complementary to logo)
  accent: {
    50: "#F0FDF4",   // Very light green
    100: "#DCFCE7",  // Light green
    200: "#BBF7D0",  // Soft green
    300: "#86EFAC",  // Medium soft green
    400: "#4ADE80",  // Medium green
    500: "#22C55E",  // Main accent (muted)
    600: "#16A34A",  // Darker green
    700: "#15803D",  // Deep green
    800: "#166534",  // Very deep green
    900: "#14532D",  // Darkest green
    DEFAULT: "#22C55E",
  },
  
  // Neutral/Grey Colors - Apple's clean grays
  grey: {
    50: "#FAFAFA",   // Pure white alternative
    100: "#F5F5F5",  // Very light
    200: "#E5E5E5",  // Light border
    300: "#D4D4D4",  // Medium light
    400: "#A3A3A3",  // Medium
    500: "#737373",  // Neutral
    600: "#525252",  // Dark
    700: "#404040",  // Darker
    800: "#262626",  // Very dark
    900: "#171717",  // Almost black
    DEFAULT: "#F5F5F5", // Apple's background
  },
  
  // Danger/Error Colors - Subtle red
  danger: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
    DEFAULT: "#EF4444",
  },
  
  // Warning Colors - Soft amber
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
    DEFAULT: "#F59E0B",
  },
  
  // Info Colors - Muted blue (matching logo but softer)
  info: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#BAE6FD",
    300: "#7DD3FC",
    400: "#38BDF8",
    500: "#0EA5E9",
    600: "#0284C7",
    700: "#0369A1",
    800: "#075985",
    900: "#0C4A6E",
    DEFAULT: "#0EA5E9",
  },
};

/**
 * Gradient Definitions - Minimal, Apple-inspired
 */
export const gradients = {
  // Primary - Very subtle, used sparingly
  primary: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
  primarySoft: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
  primaryStrong: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
  
  // Secondary - Minimal grays
  secondary: "linear-gradient(135deg, #404040 0%, #262626 100%)",
  
  // Accent - Subtle green
  accent: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
  
  // Hero - Very subtle, light
  hero: "linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)",
  heroSoft: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
  
  // Glass effects - Minimal
  glass: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)",
  card: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
  background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
  
  // Logo-inspired - Very subtle
  logo: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
  logoLight: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
  logoDark: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
};

/**
 * Semantic Color Mappings - Apple-style
 */
export const semanticColors = {
  text: {
    primary: colors.secondary[800], // Dark gray, not black
    secondary: colors.grey[600],    // Medium gray
    tertiary: colors.grey[500],      // Light gray
    inverse: "#FFFFFF",
    brand: colors.primary[600],      // Logo blue for subtle accents
  },
  background: {
    primary: "#FFFFFF",              // Pure white
    secondary: colors.grey[50],      // Off-white
    tertiary: colors.grey[100],       // Very light gray
    brand: colors.primary[50],       // Subtle logo tint
  },
  border: {
    light: colors.grey[200],         // Very light borders
    default: colors.grey[300],        // Standard borders
    dark: colors.grey[400],          // Darker borders
    brand: colors.primary[200],      // Subtle logo border
  },
};
