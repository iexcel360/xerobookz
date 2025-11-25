// Core
export { apiClient } from "./core/client";
export { useApiQuery, useApiMutation } from "./core/hooks";

// Auth
export * from "./auth";

// Employee
export * from "./employee";

// I9
export * from "./i9";

// Document
export * from "./document";

// Organization
export * from "./organization";

// Timesheet
export * from "./timesheet";

// Leave
export * from "./leave";

// Immigration
export * from "./immigration";

// PAF
export * from "./paf";

// Notification
export * from "./notification";

// ========== ENTERPRISE: NEW API CLIENTS ==========

// Onboarding (HR Agent + Recruiting)
export * from "./onboarding";

// Finance (Payroll + Headcount)
export * from "./finance";

// Workflow (Performance + PM)
export * from "./workflow";

// Marketing (LMS + Surveys + CRM)
export * from "./marketing";

// Invoice (Expenses + Bill Pay + Travel)
export * from "./invoice";

// Payment (Corporate Cards)
export * from "./payment";

// Types
export type { APIResponse, ErrorDetail } from "./types";

