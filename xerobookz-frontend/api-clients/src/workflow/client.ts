import { apiClient } from "../core/client";
import {
  OKR, OKRCreate,
  OneOnOne, OneOnOneCreate,
  Project, ProjectCreate,
  Task, TaskCreate,
  Sprint, SprintCreate
} from "./types";
import { APIResponse } from "../types";

export const workflowApi = {
  // ========== ENTERPRISE: PERFORMANCE MANAGEMENT ==========
  createOKR: async (data: OKRCreate): Promise<APIResponse<OKR>> => {
    return apiClient.post("/workflow/performance/okrs", data);
  },

  getOKRs: async (employeeId?: string): Promise<APIResponse<OKR[]>> => {
    const params = employeeId ? `?employee_id=${employeeId}` : "";
    return apiClient.get(`/workflow/performance/okrs${params}`);
  },

  createOneOnOne: async (data: OneOnOneCreate): Promise<APIResponse<OneOnOne>> => {
    return apiClient.post("/workflow/performance/one-on-ones", data);
  },

  // ========== ENTERPRISE: PM AGENT ==========
  createProject: async (data: ProjectCreate): Promise<APIResponse<Project>> => {
    return apiClient.post("/workflow/projects", data);
  },

  getProjects: async (status?: string): Promise<APIResponse<Project[]>> => {
    const params = status ? `?status=${status}` : "";
    return apiClient.get(`/workflow/projects${params}`);
  },

  createTask: async (projectId: string, data: TaskCreate): Promise<APIResponse<Task>> => {
    return apiClient.post(`/workflow/projects/${projectId}/tasks`, data);
  },

  createSprint: async (projectId: string, data: SprintCreate): Promise<APIResponse<Sprint>> => {
    return apiClient.post(`/workflow/projects/${projectId}/sprints`, data);
  },
};

