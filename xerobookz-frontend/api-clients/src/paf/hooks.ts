import { useApiQuery, useApiMutation } from "../core/hooks";
import { pafApi } from "./client";
import { PAF } from "./types";

export const useGeneratePAF = () => {
  return useApiMutation((lcaId: string) => pafApi.generatePAF(lcaId));
};

export const useGetPAF = (id: string) => {
  return useApiQuery<PAF>(["paf", id], `/paf/${id}`, {
    enabled: !!id,
  });
};

