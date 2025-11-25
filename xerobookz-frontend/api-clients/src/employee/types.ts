export interface Employee {
  id: string;
  tenant_id: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  hire_date?: string;
  termination_date?: string;
  status: string;
  department_id?: string;
  manager_id?: string;
  job_title?: string;
  location_id?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeCreate {
  employee_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  hire_date?: string;
  department_id?: string;
  manager_id?: string;
  job_title?: string;
  location_id?: string;
}

export interface EmployeeUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  hire_date?: string;
  termination_date?: string;
  status?: string;
  department_id?: string;
  manager_id?: string;
  job_title?: string;
  location_id?: string;
}

