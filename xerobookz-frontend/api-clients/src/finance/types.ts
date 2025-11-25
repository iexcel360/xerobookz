// ========== ENTERPRISE: PAYROLL TYPES ==========

export interface PayrollRun {
  id: string;
  tenant_id: string;
  run_date: string;
  pay_period_start: string;
  pay_period_end: string;
  status: string;
  total_amount?: string;
  employee_count: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PayrollRunCreate {
  run_date: string;
  pay_period_start: string;
  pay_period_end: string;
  notes?: string;
}

export interface PayrollEntry {
  id: string;
  tenant_id: string;
  payroll_run_id: string;
  employee_id: string;
  gross_pay: string;
  deductions?: Record<string, any>;
  taxes?: Record<string, any>;
  net_pay: string;
  pay_frequency?: string;
  created_at: string;
}

// ========== ENTERPRISE: HEADCOUNT PLANNING TYPES ==========

export interface HeadcountPlan {
  id: string;
  tenant_id: string;
  plan_name: string;
  fiscal_year: string;
  department_id?: string;
  planned_headcount: number;
  current_headcount: number;
  budget?: string;
  projections?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface HeadcountPlanCreate {
  plan_name: string;
  fiscal_year: string;
  department_id?: string;
  planned_headcount: number;
  budget?: string;
  projections?: Record<string, any>;
}

