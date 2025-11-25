import { apiClient } from "../core/client";
import { I9Form, I9CreateRequest, I9Section1Update, I9Section2Update } from "./types";
import { APIResponse } from "../types";

export const i9Api = {
  createI9: async (data: I9CreateRequest): Promise<APIResponse<I9Form>> => {
    return apiClient.post("/i9", data);
  },

  getI9: async (id: string): Promise<APIResponse<I9Form>> => {
    return apiClient.get(`/i9/${id}`);
  },

  updateSection1: async (id: string, data: I9Section1Update): Promise<APIResponse<I9Form>> => {
    return apiClient.patch(`/i9/${id}/section1`, data);
  },

  updateSection2: async (id: string, data: I9Section2Update): Promise<APIResponse<I9Form>> => {
    return apiClient.patch(`/i9/${id}/section2`, data);
  },

  reverify: async (id: string): Promise<APIResponse<I9Form>> => {
    return apiClient.post(`/i9/${id}/reverify`);
  },
};

