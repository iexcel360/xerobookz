import { apiClient } from "../core/client";
import { PAF } from "./types";
import { APIResponse } from "../types";

export const pafApi = {
  generatePAF: async (lcaId: string): Promise<APIResponse<PAF>> => {
    return apiClient.post("/paf/generate", { lca_id: lcaId });
  },

  getPAF: async (id: string): Promise<APIResponse<PAF>> => {
    return apiClient.get(`/paf/${id}`);
  },
};

