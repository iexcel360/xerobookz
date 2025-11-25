import { apiClient } from "../core/client";
import { Employee, EmployeeCreate, EmployeeUpdate } from "./types";
import { APIResponse } from "../types";

export const employeeApi = {
  getEmployees: async (): Promise<APIResponse<Employee[]>> => {
    return apiClient.get("/employees");
  },

  getEmployee: async (id: string): Promise<APIResponse<Employee>> => {
    return apiClient.get(`/employees/${id}`);
  },

  createEmployee: async (data: EmployeeCreate): Promise<APIResponse<Employee>> => {
    return apiClient.post("/employees", data);
  },

  updateEmployee: async (id: string, data: EmployeeUpdate): Promise<APIResponse<Employee>> => {
    return apiClient.patch(`/employees/${id}`, data);
  },

  getEmployeeDocuments: async (id: string): Promise<APIResponse<any[]>> => {
    return apiClient.get(`/employees/${id}/documents`);
  },
};

