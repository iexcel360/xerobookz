export interface ImmigrationCase {
  id: string;
  tenant_id: string;
  employee_id: string;
  case_type: string;
  status: string;
  created_at: string;
}

// ========== ENTERPRISE: GLOBAL CONTRACTORS + EOR TYPES ==========

export interface Contractor {
  id: string;
  tenant_id: string;
  name: string;
  country_code: string;
  contract_type: string;
  start_date: string;
  end_date?: string;
  hourly_rate?: string;
  monthly_rate?: string;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContractorCreate {
  name: string;
  country_code: string;
  contract_type: string;
  start_date: string;
  end_date?: string;
  hourly_rate?: string;
  monthly_rate?: string;
  currency?: string;
}

export interface EORWorkflow {
  id: string;
  tenant_id: string;
  contractor_id: string;
  country_code: string;
  workflow_type: string;
  status: string;
  workflow_data?: Record<string, any>;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EORWorkflowCreate {
  contractor_id: string;
  country_code: string;
  workflow_type: string;
  workflow_data?: Record<string, any>;
}

export interface GlobalPayout {
  id: string;
  tenant_id: string;
  contractor_id: string;
  amount: string;
  currency: string;
  payout_date: string;
  payment_method?: string;
  status: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface GlobalPayoutCreate {
  contractor_id: string;
  amount: string;
  currency: string;
  payout_date: string;
  payment_method?: string;
}

