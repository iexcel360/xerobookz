import { apiClient } from "../core/client";
import {
  ExpenseClaim, ExpenseClaimCreate,
  Vendor, VendorCreate, Payable, PayableCreate,
  TravelRequest, TravelRequestCreate
} from "./types";
import { APIResponse } from "../types";

export const invoiceApi = {
  // ========== ENTERPRISE: EXPENSE MANAGEMENT ==========
  createExpenseClaim: async (data: ExpenseClaimCreate): Promise<APIResponse<ExpenseClaim>> => {
    return apiClient.post("/invoice/expenses/claims", data);
  },

  getExpenseClaims: async (employeeId?: string, status?: string): Promise<APIResponse<ExpenseClaim[]>> => {
    const params = new URLSearchParams();
    if (employeeId) params.append("employee_id", employeeId);
    if (status) params.append("status", status);
    return apiClient.get(`/invoice/expenses/claims?${params.toString()}`);
  },

  approveExpenseClaim: async (claimId: string, approverId: string): Promise<APIResponse<ExpenseClaim>> => {
    return apiClient.post(`/invoice/expenses/${claimId}/approve`, { approver_id: approverId });
  },

  processExpenseReceipt: async (file: File): Promise<APIResponse<Record<string, any>>> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/invoice/expenses/process-receipt", formData);
  },

  // ========== ENTERPRISE: BILL PAY ==========
  createVendor: async (data: VendorCreate): Promise<APIResponse<Vendor>> => {
    return apiClient.post("/invoice/billpay/vendors", data);
  },

  createPayable: async (data: PayableCreate): Promise<APIResponse<Payable>> => {
    return apiClient.post("/invoice/billpay/invoices", data);
  },

  // ========== ENTERPRISE: TRAVEL ==========
  createTravelRequest: async (data: TravelRequestCreate): Promise<APIResponse<TravelRequest>> => {
    return apiClient.post("/invoice/travel/requests", data);
  },

  getTravelRequests: async (employeeId?: string, status?: string): Promise<APIResponse<TravelRequest[]>> => {
    const params = new URLSearchParams();
    if (employeeId) params.append("employee_id", employeeId);
    if (status) params.append("status", status);
    return apiClient.get(`/invoice/travel/requests?${params.toString()}`);
  },
};

