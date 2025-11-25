// ========== ENTERPRISE: EXPENSE MANAGEMENT TYPES ==========

export interface ExpenseClaim {
  id: string;
  tenant_id: string;
  employee_id: string;
  total_amount: string;
  currency: string;
  status: string;
  submitted_at?: string;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseClaimCreate {
  employee_id: string;
  total_amount: string;
  currency?: string;
  receipts?: Array<Record<string, any>>;
}

export interface ExpenseReceipt {
  id: string;
  tenant_id: string;
  expense_claim_id: string;
  receipt_url?: string;
  amount: string;
  merchant?: string;
  date?: string;
  category?: string;
  description?: string;
  created_at: string;
}

// ========== ENTERPRISE: BILL PAY TYPES ==========

export interface Vendor {
  id: string;
  tenant_id: string;
  name: string;
  contact_info?: Record<string, any>;
  tax_id?: string;
  payment_terms?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorCreate {
  name: string;
  contact_info?: Record<string, any>;
  tax_id?: string;
  payment_terms?: string;
}

export interface Payable {
  id: string;
  tenant_id: string;
  vendor_id: string;
  invoice_number: string;
  amount: string;
  due_date: string;
  status: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PayableCreate {
  vendor_id: string;
  invoice_number: string;
  amount: string;
  due_date: string;
}

// ========== ENTERPRISE: TRAVEL TYPES ==========

export interface TravelRequest {
  id: string;
  tenant_id: string;
  employee_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  purpose?: string;
  estimated_cost?: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TravelRequestCreate {
  employee_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  purpose?: string;
  estimated_cost?: string;
}

