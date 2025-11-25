// ========== ENTERPRISE: LMS TYPES ==========

export interface Course {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  category?: string;
  duration?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CourseCreate {
  title: string;
  description?: string;
  category?: string;
  duration?: number;
}

export interface CourseAssignment {
  id: string;
  tenant_id: string;
  course_id: string;
  employee_id: string;
  assigned_at: string;
  completed_at?: string;
  status: string;
  created_at: string;
}

export interface CourseAssignmentCreate {
  course_id: string;
  employee_id: string;
}

// ========== ENTERPRISE: SURVEYS TYPES ==========

export interface Survey {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  questions?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyCreate {
  title: string;
  description?: string;
  questions?: Record<string, any>;
}

export interface SurveyResponse {
  id: string;
  tenant_id: string;
  survey_id: string;
  employee_id: string;
  responses?: Record<string, any>;
  submitted_at: string;
  created_at: string;
}

export interface SurveyResponseCreate {
  survey_id: string;
  employee_id: string;
  responses: Record<string, any>;
}

// ========== ENTERPRISE: CRM TYPES ==========

export interface CRMContact {
  id: string;
  tenant_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMContactCreate {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
}

export interface CRMLead {
  id: string;
  tenant_id: string;
  contact_id?: string;
  source?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CRMLeadCreate {
  contact_id?: string;
  source?: string;
}

export interface CRMOpportunity {
  id: string;
  tenant_id: string;
  lead_id?: string;
  value?: string;
  stage: string;
  probability: number;
  created_at: string;
  updated_at: string;
}

export interface CRMOpportunityCreate {
  lead_id?: string;
  value?: string;
  stage?: string;
  probability?: number;
}

