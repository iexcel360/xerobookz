export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ErrorDetail;
}

export interface ErrorDetail {
  code: string;
  details?: string;
  field?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

