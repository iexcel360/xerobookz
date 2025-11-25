import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  OKR, OKRCreate,
  OneOnOne, OneOnOneCreate,
  Project, ProjectCreate,
  Task, TaskCreate,
  Sprint, SprintCreate
} from "./types";

// ========== ENTERPRISE: PERFORMANCE MANAGEMENT HOOKS ==========

export const useGetOKRs = (employeeId?: string) => {
  const params = employeeId ? `?employee_id=${employeeId}` : "";
  return useApiQuery<OKR[]>(["workflow", "performance", "okrs", employeeId], `/workflow/performance/okrs${params}`);
};

export const useCreateOKR = () => {
  return useApiMutation<OKR, OKRCreate>("/workflow/performance/okrs", "POST");
};

export const useCreateOneOnOne = () => {
  return useApiMutation<OneOnOne, OneOnOneCreate>("/workflow/performance/one-on-ones", "POST");
};

// ========== ENTERPRISE: PM AGENT HOOKS ==========

export const useGetProjects = (status?: string) => {
  const params = status ? `?status=${status}` : "";
  return useApiQuery<Project[]>(["workflow", "projects", status], `/workflow/projects${params}`);
};

export const useCreateProject = () => {
  return useApiMutation<Project, ProjectCreate>("/workflow/projects", "POST");
};

export const useCreateTask = (projectId: string) => {
  return useApiMutation<Task, TaskCreate>(`/workflow/projects/${projectId}/tasks`, "POST");
};

export const useCreateSprint = (projectId: string) => {
  return useApiMutation<Sprint, SprintCreate>(`/workflow/projects/${projectId}/sprints`, "POST");
};

