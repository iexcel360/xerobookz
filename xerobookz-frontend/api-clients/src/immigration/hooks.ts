import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  ImmigrationCase,
  Contractor, ContractorCreate,
  EORWorkflow, EORWorkflowCreate,
  GlobalPayout, GlobalPayoutCreate
} from "./types";

export const useGetImmigrationCases = () => {
  return useApiQuery<ImmigrationCase[]>(["immigration", "cases"], "/immigration/case");
};

// ========== ENTERPRISE: GLOBAL CONTRACTORS + EOR HOOKS ==========

export const useGetContractors = (countryCode?: string, status?: string) => {
  const params = new URLSearchParams();
  if (countryCode) params.append("country_code", countryCode);
  if (status) params.append("status", status);
  return useApiQuery<Contractor[]>(["immigration", "contractors", countryCode, status], `/immigration/contractors?${params.toString()}`);
};

export const useCreateContractor = () => {
  return useApiMutation<Contractor, ContractorCreate>("/immigration/contractors", "POST");
};

export const useCreateEORWorkflow = () => {
  return useApiMutation<EORWorkflow, EORWorkflowCreate>("/immigration/eor/workflows", "POST");
};

export const useCreateGlobalPayout = () => {
  return useApiMutation<GlobalPayout, GlobalPayoutCreate>("/immigration/eor/payouts", "POST");
};

