import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  Course, CourseCreate, CourseAssignment, CourseAssignmentCreate,
  Survey, SurveyCreate, SurveyResponse, SurveyResponseCreate,
  CRMContact, CRMContactCreate, CRMLead, CRMLeadCreate, CRMOpportunity, CRMOpportunityCreate
} from "./types";

// ========== ENTERPRISE: LMS HOOKS ==========

export const useGetCourses = (status?: string) => {
  const params = status ? `?status=${status}` : "";
  return useApiQuery<Course[]>(["marketing", "lms", "courses", status], `/marketing/lms/courses${params}`);
};

export const useCreateCourse = () => {
  return useApiMutation<Course, CourseCreate>("/marketing/lms/courses", "POST");
};

export const useCreateCourseAssignment = () => {
  return useApiMutation<CourseAssignment, CourseAssignmentCreate>("/marketing/lms/assignments", "POST");
};

// ========== ENTERPRISE: SURVEYS HOOKS ==========

export const useGetSurveys = (status?: string) => {
  const params = status ? `?status=${status}` : "";
  return useApiQuery<Survey[]>(["marketing", "surveys", status], `/marketing/surveys${params}`);
};

export const useCreateSurvey = () => {
  return useApiMutation<Survey, SurveyCreate>("/marketing/surveys", "POST");
};

export const useCreateSurveyResponse = (surveyId: string) => {
  return useApiMutation<SurveyResponse, SurveyResponseCreate>(`/marketing/surveys/${surveyId}/responses`, "POST");
};

// ========== ENTERPRISE: CRM HOOKS ==========

export const useCreateCRMContact = () => {
  return useApiMutation<CRMContact, CRMContactCreate>("/marketing/crm/contacts", "POST");
};

export const useCreateCRMLead = () => {
  return useApiMutation<CRMLead, CRMLeadCreate>("/marketing/crm/leads", "POST");
};

export const useCreateCRMOpportunity = () => {
  return useApiMutation<CRMOpportunity, CRMOpportunityCreate>("/marketing/crm/opportunities", "POST");
};

