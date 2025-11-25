import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  Organization, Department,
  BenefitPlan, BenefitPlanCreate, BenefitEnrollment, BenefitEnrollmentCreate,
  ITTicket, ITTicketCreate, IdentityRequest, IdentityRequestCreate
} from "./types";

export const useGetOrganization = () => {
  return useApiQuery<Organization>(["organization"], "/organization");
};

export const useGetDepartments = () => {
  return useApiQuery<Department[]>(["organization", "departments"], "/organization/departments");
};

// ========== ENTERPRISE: BENEFITS ADMIN HOOKS ==========

export const useGetBenefitPlans = (planType?: string, isActive?: boolean) => {
  const params = new URLSearchParams();
  if (planType) params.append("plan_type", planType);
  if (isActive !== undefined) params.append("is_active", String(isActive));
  return useApiQuery<BenefitPlan[]>(["organization", "benefits", "plans", planType, isActive], `/organization/benefits/plans?${params.toString()}`);
};

export const useCreateBenefitPlan = () => {
  return useApiMutation<BenefitPlan, BenefitPlanCreate>("/organization/benefits/plans", "POST");
};

export const useGetBenefitEnrollments = (employeeId?: string) => {
  const params = employeeId ? `?employee_id=${employeeId}` : "";
  return useApiQuery<BenefitEnrollment[]>(["organization", "benefits", "enrollments", employeeId], `/organization/benefits/enrollments${params}`);
};

export const useCreateBenefitEnrollment = () => {
  return useApiMutation<BenefitEnrollment, BenefitEnrollmentCreate>("/organization/benefits/enrollments", "POST");
};

// ========== ENTERPRISE: ITSM AGENT HOOKS ==========

export const useGetITTickets = (status?: string, assigneeId?: string) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (assigneeId) params.append("assignee_id", assigneeId);
  return useApiQuery<ITTicket[]>(["organization", "it", "tickets", status, assigneeId], `/organization/it/tickets?${params.toString()}`);
};

export const useCreateITTicket = () => {
  return useApiMutation<ITTicket, ITTicketCreate>("/organization/it/tickets", "POST");
};

export const useCreateIdentityRequest = () => {
  return useApiMutation<IdentityRequest, IdentityRequestCreate>("/organization/it/identity-requests", "POST");
};

