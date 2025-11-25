import { useApiQuery, useApiMutation } from "../core/hooks";
import { authApi } from "./client";
import { LoginRequest, UserResponse, RoleResponse } from "./types";

export const useLogin = () => {
  return useApiMutation((data: LoginRequest) => authApi.login(data));
};

export const useGetMe = () => {
  return useApiQuery<UserResponse>(["auth", "me"], "/auth/me");
};

export const useGetRoles = () => {
  return useApiQuery<RoleResponse[]>(["auth", "roles"], "/auth/roles");
};

export const useLogout = () => {
  return useApiMutation(() => authApi.logout());
};

