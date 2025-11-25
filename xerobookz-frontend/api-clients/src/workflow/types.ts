// ========== ENTERPRISE: PERFORMANCE MANAGEMENT TYPES ==========

export interface OKR {
  id: string;
  tenant_id: string;
  employee_id: string;
  cycle_id?: string;
  objective: string;
  key_results?: Record<string, any>;
  status: string;
  progress: string;
  created_at: string;
  updated_at: string;
}

export interface OKRCreate {
  employee_id: string;
  cycle_id?: string;
  objective: string;
  key_results?: Record<string, any>;
}

export interface OneOnOne {
  id: string;
  tenant_id: string;
  employee_id: string;
  manager_id: string;
  scheduled_at: string;
  agenda?: string;
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OneOnOneCreate {
  employee_id: string;
  manager_id: string;
  scheduled_at: string;
  agenda?: string;
}

// ========== ENTERPRISE: PM AGENT TYPES ==========

export interface Project {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  status: string;
  start_date?: string;
  end_date?: string;
  project_manager_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  project_manager_id?: string;
}

export interface Task {
  id: string;
  tenant_id: string;
  project_id: string;
  title: string;
  description?: string;
  assignee_id?: string;
  status: string;
  priority: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  project_id: string;
  title: string;
  description?: string;
  assignee_id?: string;
  priority?: string;
  due_date?: string;
}

export interface Sprint {
  id: string;
  tenant_id: string;
  project_id: string;
  name: string;
  start_date: string;
  end_date: string;
  goal?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SprintCreate {
  project_id: string;
  name: string;
  start_date: string;
  end_date: string;
  goal?: string;
}

