import { useApiQuery, useApiMutation } from "../core/hooks";
import { i9Api } from "./client";
import { I9Form, I9CreateRequest, I9Section1Update, I9Section2Update } from "./types";

export const useGetI9 = (id: string) => {
  return useApiQuery<I9Form>(["i9", id], `/i9/${id}`, {
    enabled: !!id,
  });
};

export const useCreateI9 = () => {
  return useApiMutation((data: I9CreateRequest) => i9Api.createI9(data));
};

export const useUpdateI9Section1 = () => {
  return useApiMutation(({ id, data }: { id: string; data: I9Section1Update }) =>
    i9Api.updateSection1(id, data)
  );
};

export const useUpdateI9Section2 = () => {
  return useApiMutation(({ id, data }: { id: string; data: I9Section2Update }) =>
    i9Api.updateSection2(id, data)
  );
};

export const useReverifyI9 = () => {
  return useApiMutation((id: string) => i9Api.reverify(id));
};

