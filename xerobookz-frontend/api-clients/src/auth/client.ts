import { apiClient } from "../core/client";
import { LoginRequest, LoginResponse, UserResponse, RoleResponse } from "./types";
import { APIResponse } from "../types";

export const authApi = {
  login: async (data: LoginRequest): Promise<APIResponse<LoginResponse>> => {
    return apiClient.post("/auth/login", data);
  },

  refresh: async (refreshToken: string): Promise<APIResponse<LoginResponse>> => {
    return apiClient.post("/auth/refresh", { refresh_token: refreshToken });
  },

  logout: async (): Promise<APIResponse> => {
    return apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<APIResponse<UserResponse>> => {
    return apiClient.get("/auth/me");
  },

  getRoles: async (): Promise<APIResponse<RoleResponse[]>> => {
    return apiClient.get("/auth/roles");
  },
};

