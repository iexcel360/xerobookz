// ========== ENTERPRISE: CORPORATE CARDS TYPES ==========

export interface CorporateCard {
  id: string;
  tenant_id: string;
  employee_id: string;
  card_number: string;
  card_type: string;
  spending_limit?: string;
  monthly_limit?: string;
  merchant_restrictions?: Record<string, any>;
  category_restrictions?: Record<string, any>;
  status: string;
  issued_at: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateCardCreate {
  employee_id: string;
  card_type: string;
  spending_limit?: string;
  monthly_limit?: string;
  merchant_restrictions?: Record<string, any>;
  category_restrictions?: Record<string, any>;
}

export interface CorporateCardLimitUpdate {
  spending_limit?: string;
  monthly_limit?: string;
}

export interface CorporateCardMerchantUpdate {
  merchant_restrictions: Record<string, any>;
}

