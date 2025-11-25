// ========== ENTERPRISE: RECRUITING TYPES ==========

export interface JobPosting {
  id: string;
  tenant_id: string;
  title: string;
  department_id?: string;
  job_code?: string;
  description?: string;
  requirements?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
  status: string;
  posted_at?: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface JobPostingCreate {
  title: string;
  department_id?: string;
  job_code?: string;
  description?: string;
  requirements?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
}

export interface Application {
  id: string;
  tenant_id: string;
  job_posting_id: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  status: string;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationCreate {
  job_posting_id: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  source?: string;
}

export interface Interview {
  id: string;
  tenant_id: string;
  application_id: string;
  interviewer_id: string;
  scheduled_at: string;
  interview_type: string;
  location?: string;
  status: string;
  notes?: string;
  rating?: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewCreate {
  application_id: string;
  interviewer_id: string;
  scheduled_at: string;
  interview_type: string;
  location?: string;
}

export interface OfferLetter {
  id: string;
  tenant_id: string;
  application_id: string;
  offer_details?: Record<string, any>;
  status: string;
  sent_at?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OfferLetterCreate {
  application_id: string;
  offer_details: Record<string, any>;
}

// ========== ENTERPRISE: HR AGENT TYPES ==========

export interface HRAgentActionRequest {
  action_type: string;
  input_data: Record<string, any>;
  context?: Record<string, any>;
}

export interface HRAgentActionResponse {
  success: boolean;
  result: Record<string, any>;
  confidence?: number;
  message?: string;
}

export interface HRAgentPolicyGuidanceRequest {
  question: string;
  context?: Record<string, any>;
  employee_id?: string;
}

export interface HRAgentPolicyGuidanceResponse {
  answer: string;
  sources?: string[];
  related_policies?: string[];
}

export interface HRAgentAutoFillRequest {
  form_type: string;
  document_content?: string;
  document_url?: string;
  existing_data?: Record<string, any>;
}

export interface HRAgentAutoFillResponse {
  form_data: Record<string, any>;
  confidence?: number;
  fields_filled: number;
  fields_total: number;
}

