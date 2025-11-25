export interface LoginRequest {
  email: string;
  password: string;
  tenant_id: string;
  mfa_code?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserResponse {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  mfa_enabled: boolean;
  created_at: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  tenant_id?: string;
  created_at: string;
}

