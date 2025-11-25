export interface I9Form {
  id: string;
  tenant_id: string;
  employee_id: string;
  status: string;
  form_version: string;
  section1_completed_at?: string;
  section2_completed_at?: string;
  reverification_required: boolean;
  reverification_date?: string;
  created_at: string;
  updated_at: string;
}

export interface I9CreateRequest {
  employee_id: string;
}

export interface I9Section1Update {
  last_name: string;
  first_name: string;
  middle_initial?: string;
  other_last_names?: string;
  address: string;
  date_of_birth: string;
  ssn?: string;
  citizenship_status: string;
  alien_number?: string;
  admission_number?: string;
  foreign_passport_number?: string;
  country_of_issuance?: string;
  preparer_translator_used: boolean;
  preparer_name?: string;
  preparer_address?: string;
  employee_signature?: string;
  employee_signature_date?: string;
}

export interface I9Section2Update {
  document_a: boolean;
  document_b: boolean;
  document_c: boolean;
  document_title?: string;
  document_number?: string;
  document_issuing_authority?: string;
  document_expiration_date?: string;
  first_day_of_employment: string;
  employer_name: string;
  employer_address: string;
  employer_city?: string;
  employer_state?: string;
  employer_zip?: string;
  authorized_representative_name?: string;
  authorized_representative_title?: string;
  authorized_representative_signature?: string;
  authorized_representative_signature_date?: string;
}

