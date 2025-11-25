export interface Organization {
  id: string;
  tenant_id: string;
  name: string;
  legal_name?: string;
  ein?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  hrbp_email?: string;
  settings?: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  tenant_id: string;
  organization_id: string;
  name: string;
  code?: string;
  manager_id?: string;
  parent_department_id?: string;
  created_at: string;
  updated_at: string;
}

// ========== ENTERPRISE: BENEFITS ADMIN TYPES ==========

export interface BenefitPlan {
  id: string;
  tenant_id: string;
  name: string;
  plan_type: string;
  provider?: string;
  plan_code?: string;
  description?: string;
  eligibility_rules?: Record<string, any>;
  coverage_details?: Record<string, any>;
  effective_date: string;
  expiration_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BenefitPlanCreate {
  name: string;
  plan_type: string;
  provider?: string;
  plan_code?: string;
  description?: string;
  eligibility_rules?: Record<string, any>;
  coverage_details?: Record<string, any>;
  effective_date: string;
  expiration_date?: string;
}

export interface BenefitEnrollment {
  id: string;
  tenant_id: string;
  employee_id: string;
  benefit_plan_id: string;
  enrollment_date: string;
  coverage_start_date: string;
  coverage_end_date?: string;
  dependents_count: string;
  dependents_info?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BenefitEnrollmentCreate {
  employee_id: string;
  benefit_plan_id: string;
  enrollment_date: string;
  coverage_start_date: string;
  coverage_end_date?: string;
  dependents_count: number;
  dependents_info?: Record<string, any>;
}

// ========== ENTERPRISE: ITSM AGENT TYPES ==========

export interface ITTicket {
  id: string;
  tenant_id: string;
  ticket_number: string;
  requester_id: string;
  assignee_id?: string;
  category: string;
  priority: string;
  status: string;
  subject: string;
  description?: string;
  resolution?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface ITTicketCreate {
  requester_id: string;
  assignee_id?: string;
  category: string;
  priority?: string;
  subject: string;
  description?: string;
}

export interface IdentityRequest {
  id: string;
  tenant_id: string;
  employee_id: string;
  request_type: string;
  requested_systems?: Record<string, any>;
  requested_permissions?: Record<string, any>;
  approver_id?: string;
  status: string;
  approval_workflow?: Record<string, any>;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface IdentityRequestCreate {
  employee_id: string;
  request_type: string;
  requested_systems?: Record<string, any>;
  requested_permissions?: Record<string, any>;
  approver_id?: string;
}

