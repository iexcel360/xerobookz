import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  JobPosting, JobPostingCreate,
  Application, ApplicationCreate,
  Interview, InterviewCreate,
  OfferLetter, OfferLetterCreate,
  HRAgentActionRequest, HRAgentActionResponse,
  HRAgentPolicyGuidanceRequest, HRAgentPolicyGuidanceResponse,
  HRAgentAutoFillRequest, HRAgentAutoFillResponse
} from "./types";

// ========== ENTERPRISE: HR AGENT HOOKS ==========

export const useHRAgentAction = () => {
  return useApiMutation<HRAgentActionResponse, HRAgentActionRequest>("/onboarding/hr-agent/action", "POST");
};

export const useHRAgentPolicyGuidance = () => {
  return useApiMutation<HRAgentPolicyGuidanceResponse, HRAgentPolicyGuidanceRequest>("/onboarding/hr-agent/policy-guidance", "POST");
};

export const useHRAgentAutoFill = () => {
  return useApiMutation<HRAgentAutoFillResponse, HRAgentAutoFillRequest>("/onboarding/hr-agent/auto-fill", "POST");
};

// ========== ENTERPRISE: RECRUITING HOOKS ==========

export const useGetJobPostings = (status?: string) => {
  const params = status ? `?status=${status}` : "";
  return useApiQuery<JobPosting[]>(["onboarding", "recruiting", "job-postings", status], `/onboarding/recruiting/job-postings${params}`);
};

export const useCreateJobPosting = () => {
  return useApiMutation<JobPosting, JobPostingCreate>("/onboarding/recruiting/job-postings", "POST");
};

export const useGetApplications = (jobPostingId?: string, status?: string) => {
  const params = new URLSearchParams();
  if (jobPostingId) params.append("job_posting_id", jobPostingId);
  if (status) params.append("status", status);
  return useApiQuery<Application[]>(["onboarding", "recruiting", "applications", jobPostingId, status], `/onboarding/recruiting/applications?${params.toString()}`);
};

export const useCreateApplication = () => {
  return useApiMutation<Application, ApplicationCreate>("/onboarding/recruiting/applications", "POST");
};

export const useCreateInterview = () => {
  return useApiMutation<Interview, InterviewCreate>("/onboarding/recruiting/interviews", "POST");
};

export const useCreateOfferLetter = () => {
  return useApiMutation<OfferLetter, OfferLetterCreate>("/onboarding/recruiting/offers", "POST");
};

