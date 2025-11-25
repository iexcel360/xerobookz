import { apiClient } from "../core/client";
import {
  JobPosting, JobPostingCreate,
  Application, ApplicationCreate,
  Interview, InterviewCreate,
  OfferLetter, OfferLetterCreate,
  HRAgentActionRequest, HRAgentActionResponse,
  HRAgentPolicyGuidanceRequest, HRAgentPolicyGuidanceResponse,
  HRAgentAutoFillRequest, HRAgentAutoFillResponse
} from "./types";
import { APIResponse } from "../types";

export const onboardingApi = {
  // ========== ENTERPRISE: HR AGENT ==========
  hrAgentAction: async (data: HRAgentActionRequest): Promise<APIResponse<HRAgentActionResponse>> => {
    return apiClient.post("/onboarding/hr-agent/action", data);
  },

  hrAgentPolicyGuidance: async (data: HRAgentPolicyGuidanceRequest): Promise<APIResponse<HRAgentPolicyGuidanceResponse>> => {
    return apiClient.post("/onboarding/hr-agent/policy-guidance", data);
  },

  hrAgentAutoFill: async (data: HRAgentAutoFillRequest): Promise<APIResponse<HRAgentAutoFillResponse>> => {
    return apiClient.post("/onboarding/hr-agent/auto-fill", data);
  },

  // ========== ENTERPRISE: RECRUITING ==========
  createJobPosting: async (data: JobPostingCreate): Promise<APIResponse<JobPosting>> => {
    return apiClient.post("/onboarding/recruiting/job-postings", data);
  },

  getJobPostings: async (status?: string): Promise<APIResponse<JobPosting[]>> => {
    const params = status ? `?status=${status}` : "";
    return apiClient.get(`/onboarding/recruiting/job-postings${params}`);
  },

  createApplication: async (data: ApplicationCreate): Promise<APIResponse<Application>> => {
    return apiClient.post("/onboarding/recruiting/applications", data);
  },

  getApplications: async (jobPostingId?: string, status?: string): Promise<APIResponse<Application[]>> => {
    const params = new URLSearchParams();
    if (jobPostingId) params.append("job_posting_id", jobPostingId);
    if (status) params.append("status", status);
    return apiClient.get(`/onboarding/recruiting/applications?${params.toString()}`);
  },

  createInterview: async (data: InterviewCreate): Promise<APIResponse<Interview>> => {
    return apiClient.post("/onboarding/recruiting/interviews", data);
  },

  createOfferLetter: async (data: OfferLetterCreate): Promise<APIResponse<OfferLetter>> => {
    return apiClient.post("/onboarding/recruiting/offers", data);
  },
};

