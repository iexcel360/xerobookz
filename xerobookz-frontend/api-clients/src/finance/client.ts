import { apiClient } from "../core/client";
import { PayrollRun, PayrollRunCreate, PayrollEntry, HeadcountPlan, HeadcountPlanCreate } from "./types";
import { APIResponse } from "../types";

export const financeApi = {
  // ========== ENTERPRISE: PAYROLL ==========
  createPayrollRun: async (data: PayrollRunCreate): Promise<APIResponse<PayrollRun>> => {
    return apiClient.post("/finance/payroll/run", data);
  },

  getPayrollRuns: async (status?: string): Promise<APIResponse<PayrollRun[]>> => {
    const params = status ? `?status=${status}` : "";
    return apiClient.get(`/finance/payroll/runs${params}`);
  },

  getEmployeePayroll: async (employeeId: string): Promise<APIResponse<PayrollEntry[]>> => {
    return apiClient.get(`/finance/payroll/employees/${employeeId}`);
  },

  // ========== ENTERPRISE: HEADCOUNT PLANNING ==========
  createHeadcountPlan: async (data: HeadcountPlanCreate): Promise<APIResponse<HeadcountPlan>> => {
    return apiClient.post("/finance/headcount/plan", data);
  },

  getHeadcountPlans: async (fiscalYear?: string): Promise<APIResponse<HeadcountPlan[]>> => {
    const params = fiscalYear ? `?fiscal_year=${fiscalYear}` : "";
    return apiClient.get(`/finance/headcount/plans${params}`);
  },

  getHeadcountProjections: async (fiscalYear: string): Promise<APIResponse<Record<string, any>>> => {
    return apiClient.get(`/finance/headcount/projections?fiscal_year=${fiscalYear}`);
  },
};

