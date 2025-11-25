import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  ExpenseClaim, ExpenseClaimCreate,
  Vendor, VendorCreate, Payable, PayableCreate,
  TravelRequest, TravelRequestCreate
} from "./types";

// ========== ENTERPRISE: EXPENSE MANAGEMENT HOOKS ==========

export const useGetExpenseClaims = (employeeId?: string, status?: string) => {
  const params = new URLSearchParams();
  if (employeeId) params.append("employee_id", employeeId);
  if (status) params.append("status", status);
  return useApiQuery<ExpenseClaim[]>(["invoice", "expenses", "claims", employeeId, status], `/invoice/expenses/claims?${params.toString()}`);
};

export const useCreateExpenseClaim = () => {
  return useApiMutation<ExpenseClaim, ExpenseClaimCreate>("/invoice/expenses/claims", "POST");
};

export const useApproveExpenseClaim = () => {
  return useApiMutation<ExpenseClaim, { approver_id: string }>("/invoice/expenses", "POST");
};

// ========== ENTERPRISE: BILL PAY HOOKS ==========

export const useCreateVendor = () => {
  return useApiMutation<Vendor, VendorCreate>("/invoice/billpay/vendors", "POST");
};

export const useCreatePayable = () => {
  return useApiMutation<Payable, PayableCreate>("/invoice/billpay/invoices", "POST");
};

// ========== ENTERPRISE: TRAVEL HOOKS ==========

export const useGetTravelRequests = (employeeId?: string, status?: string) => {
  const params = new URLSearchParams();
  if (employeeId) params.append("employee_id", employeeId);
  if (status) params.append("status", status);
  return useApiQuery<TravelRequest[]>(["invoice", "travel", "requests", employeeId, status], `/invoice/travel/requests?${params.toString()}`);
};

export const useCreateTravelRequest = () => {
  return useApiMutation<TravelRequest, TravelRequestCreate>("/invoice/travel/requests", "POST");
};

