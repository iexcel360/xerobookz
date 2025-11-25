import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  CorporateCard, CorporateCardCreate,
  CorporateCardLimitUpdate, CorporateCardMerchantUpdate
} from "./types";

// ========== ENTERPRISE: CORPORATE CARDS HOOKS ==========

export const useGetCorporateCards = (employeeId?: string) => {
  const params = employeeId ? `?employee_id=${employeeId}` : "";
  return useApiQuery<CorporateCard[]>(["payment", "corporate-cards", employeeId], `/payment/corporate-cards${params}`);
};

export const useCreateCorporateCard = () => {
  return useApiMutation<CorporateCard, CorporateCardCreate>("/payment/corporate-cards", "POST");
};

export const useUpdateCardLimits = (cardId: string) => {
  return useApiMutation<CorporateCard, CorporateCardLimitUpdate>(`/payment/corporate-cards/${cardId}/limits`, "POST");
};

export const useUpdateCardMerchants = (cardId: string) => {
  return useApiMutation<CorporateCard, CorporateCardMerchantUpdate>(`/payment/corporate-cards/${cardId}/merchants`, "POST");
};

