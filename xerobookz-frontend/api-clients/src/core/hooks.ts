import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "./client";
import { APIResponse } from "../types";

export function useApiQuery<TData = any, TError = any>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<APIResponse<TData>, TError>, "queryKey" | "queryFn">
) {
  return useQuery<APIResponse<TData>, TError>({
    queryKey,
    queryFn: () => apiClient.get<TData>(url),
    ...options,
  });
}

export function useApiMutation<TData = any, TVariables = any, TError = any>(
  mutationFn: (variables: TVariables) => Promise<APIResponse<TData>>,
  options?: UseMutationOptions<APIResponse<TData>, TError, TVariables>
) {
  return useMutation<APIResponse<TData>, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

