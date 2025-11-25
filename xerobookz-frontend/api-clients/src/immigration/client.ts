import { apiClient } from "../core/client";
import {
  ImmigrationCase,
  Contractor, ContractorCreate,
  EORWorkflow, EORWorkflowCreate,
  GlobalPayout, GlobalPayoutCreate
} from "./types";
import { APIResponse } from "../types";

export const immigrationApi = {
  getCases: async (): Promise<APIResponse<ImmigrationCase[]>> => {
    return apiClient.get("/immigration/case");
  },

  // ========== ENTERPRISE: GLOBAL CONTRACTORS + EOR ==========
  createContractor: async (data: ContractorCreate): Promise<APIResponse<Contractor>> => {
    return apiClient.post("/immigration/contractors", data);
  },

  getContractors: async (countryCode?: string, status?: string): Promise<APIResponse<Contractor[]>> => {
    const params = new URLSearchParams();
    if (countryCode) params.append("country_code", countryCode);
    if (status) params.append("status", status);
    return apiClient.get(`/immigration/contractors?${params.toString()}`);
  },

  createEORWorkflow: async (data: EORWorkflowCreate): Promise<APIResponse<EORWorkflow>> => {
    return apiClient.post("/immigration/eor/workflows", data);
  },

  createGlobalPayout: async (data: GlobalPayoutCreate): Promise<APIResponse<GlobalPayout>> => {
    return apiClient.post("/immigration/eor/payouts", data);
  },
};

