import { useApiQuery, useApiMutation } from "../core/hooks";
import { PayrollRun, PayrollRunCreate, PayrollEntry, HeadcountPlan, HeadcountPlanCreate } from "./types";

// ========== ENTERPRISE: PAYROLL HOOKS ==========

export const useGetPayrollRuns = (status?: string) => {
  const params = status ? `?status=${status}` : "";
  return useApiQuery<PayrollRun[]>(["finance", "payroll", "runs", status], `/finance/payroll/runs${params}`);
};

export const useCreatePayrollRun = () => {
  return useApiMutation<PayrollRun, PayrollRunCreate>("/finance/payroll/run", "POST");
};

export const useGetEmployeePayroll = (employeeId: string) => {
  return useApiQuery<PayrollEntry[]>(["finance", "payroll", "employees", employeeId], `/finance/payroll/employees/${employeeId}`);
};

// ========== ENTERPRISE: HEADCOUNT PLANNING HOOKS ==========

export const useGetHeadcountPlans = (fiscalYear?: string) => {
  const params = fiscalYear ? `?fiscal_year=${fiscalYear}` : "";
  return useApiQuery<HeadcountPlan[]>(["finance", "headcount", "plans", fiscalYear], `/finance/headcount/plans${params}`);
};

export const useCreateHeadcountPlan = () => {
  return useApiMutation<HeadcountPlan, HeadcountPlanCreate>("/finance/headcount/plan", "POST");
};

export const useGetHeadcountProjections = (fiscalYear: string) => {
  return useApiQuery<Record<string, any>>(["finance", "headcount", "projections", fiscalYear], `/finance/headcount/projections?fiscal_year=${fiscalYear}`);
};

