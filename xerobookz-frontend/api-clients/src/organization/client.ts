import { apiClient } from "../core/client";
import {
  Organization, Department,
  BenefitPlan, BenefitPlanCreate, BenefitEnrollment, BenefitEnrollmentCreate,
  ITTicket, ITTicketCreate, IdentityRequest, IdentityRequestCreate
} from "./types";
import { APIResponse } from "../types";

export const organizationApi = {
  getOrganization: async (): Promise<APIResponse<Organization>> => {
    return apiClient.get("/organization");
  },

  getDepartments: async (): Promise<APIResponse<Department[]>> => {
    return apiClient.get("/organization/departments");
  },

  // ========== ENTERPRISE: BENEFITS ADMIN ==========
  createBenefitPlan: async (data: BenefitPlanCreate): Promise<APIResponse<BenefitPlan>> => {
    return apiClient.post("/organization/benefits/plans", data);
  },

  getBenefitPlans: async (planType?: string, isActive?: boolean): Promise<APIResponse<BenefitPlan[]>> => {
    const params = new URLSearchParams();
    if (planType) params.append("plan_type", planType);
    if (isActive !== undefined) params.append("is_active", String(isActive));
    return apiClient.get(`/organization/benefits/plans?${params.toString()}`);
  },

  createBenefitEnrollment: async (data: BenefitEnrollmentCreate): Promise<APIResponse<BenefitEnrollment>> => {
    return apiClient.post("/organization/benefits/enrollments", data);
  },

  getBenefitEnrollments: async (employeeId?: string): Promise<APIResponse<BenefitEnrollment[]>> => {
    const params = employeeId ? `?employee_id=${employeeId}` : "";
    return apiClient.get(`/organization/benefits/enrollments${params}`);
  },

  // ========== ENTERPRISE: ITSM AGENT ==========
  createITTicket: async (data: ITTicketCreate): Promise<APIResponse<ITTicket>> => {
    return apiClient.post("/organization/it/tickets", data);
  },

  getITTickets: async (status?: string, assigneeId?: string): Promise<APIResponse<ITTicket[]>> => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (assigneeId) params.append("assignee_id", assigneeId);
    return apiClient.get(`/organization/it/tickets?${params.toString()}`);
  },

  createIdentityRequest: async (data: IdentityRequestCreate): Promise<APIResponse<IdentityRequest>> => {
    return apiClient.post("/organization/it/identity-requests", data);
  },
};

