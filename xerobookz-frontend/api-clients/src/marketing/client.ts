import { apiClient } from "../core/client";
import {
  Course, CourseCreate, CourseAssignment, CourseAssignmentCreate,
  Survey, SurveyCreate, SurveyResponse, SurveyResponseCreate,
  CRMContact, CRMContactCreate, CRMLead, CRMLeadCreate, CRMOpportunity, CRMOpportunityCreate
} from "./types";
import { APIResponse } from "../types";

export const marketingApi = {
  // ========== ENTERPRISE: LMS ==========
  createCourse: async (data: CourseCreate): Promise<APIResponse<Course>> => {
    return apiClient.post("/marketing/lms/courses", data);
  },

  getCourses: async (status?: string): Promise<APIResponse<Course[]>> => {
    const params = status ? `?status=${status}` : "";
    return apiClient.get(`/marketing/lms/courses${params}`);
  },

  createCourseAssignment: async (data: CourseAssignmentCreate): Promise<APIResponse<CourseAssignment>> => {
    return apiClient.post("/marketing/lms/assignments", data);
  },

  // ========== ENTERPRISE: SURVEYS ==========
  createSurvey: async (data: SurveyCreate): Promise<APIResponse<Survey>> => {
    return apiClient.post("/marketing/surveys", data);
  },

  getSurveys: async (status?: string): Promise<APIResponse<Survey[]>> => {
    const params = status ? `?status=${status}` : "";
    return apiClient.get(`/marketing/surveys${params}`);
  },

  createSurveyResponse: async (surveyId: string, data: SurveyResponseCreate): Promise<APIResponse<SurveyResponse>> => {
    return apiClient.post(`/marketing/surveys/${surveyId}/responses`, data);
  },

  // ========== ENTERPRISE: CRM ==========
  createCRMContact: async (data: CRMContactCreate): Promise<APIResponse<CRMContact>> => {
    return apiClient.post("/marketing/crm/contacts", data);
  },

  createCRMLead: async (data: CRMLeadCreate): Promise<APIResponse<CRMLead>> => {
    return apiClient.post("/marketing/crm/leads", data);
  },

  createCRMOpportunity: async (data: CRMOpportunityCreate): Promise<APIResponse<CRMOpportunity>> => {
    return apiClient.post("/marketing/crm/opportunities", data);
  },
};

