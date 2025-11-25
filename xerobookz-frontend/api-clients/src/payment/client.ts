import { apiClient } from "../core/client";
import {
  CorporateCard, CorporateCardCreate,
  CorporateCardLimitUpdate, CorporateCardMerchantUpdate
} from "./types";
import { APIResponse } from "../types";

export const paymentApi = {
  // ========== ENTERPRISE: CORPORATE CARDS ==========
  createCorporateCard: async (data: CorporateCardCreate): Promise<APIResponse<CorporateCard>> => {
    return apiClient.post("/payment/corporate-cards", data);
  },

  getCorporateCards: async (employeeId?: string): Promise<APIResponse<CorporateCard[]>> => {
    const params = employeeId ? `?employee_id=${employeeId}` : "";
    return apiClient.get(`/payment/corporate-cards${params}`);
  },

  updateCardLimits: async (cardId: string, data: CorporateCardLimitUpdate): Promise<APIResponse<CorporateCard>> => {
    return apiClient.post(`/payment/corporate-cards/${cardId}/limits`, data);
  },

  updateCardMerchants: async (cardId: string, data: CorporateCardMerchantUpdate): Promise<APIResponse<CorporateCard>> => {
    return apiClient.post(`/payment/corporate-cards/${cardId}/merchants`, data);
  },
};

