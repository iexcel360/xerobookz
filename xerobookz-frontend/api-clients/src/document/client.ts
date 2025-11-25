import { apiClient } from "../core/client";
import { Document } from "./types";
import { APIResponse } from "../types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const documentApi = {
  uploadDocument: async (
    file: File,
    documentType: string,
    relatedEntityId?: string,
    relatedEntityType?: string
  ): Promise<APIResponse<Document>> => {
    const formData = new FormData();
    formData.append("file", file);
    if (documentType) formData.append("document_type", documentType);
    if (relatedEntityId) formData.append("related_entity_id", relatedEntityId);
    if (relatedEntityType) formData.append("related_entity_type", relatedEntityType);

    const token = typeof window !== "undefined" ? localStorage.getItem("xerobookz_token") : null;
    const tenantId = typeof window !== "undefined" ? localStorage.getItem("xerobookz_tenant_id") : null;

    const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Tenant-ID": tenantId || "",
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as APIResponse<Document>;
  },

  getDocument: async (id: string): Promise<APIResponse<Document>> => {
    return apiClient.get(`/documents/${id}`);
  },

  downloadDocument: async (id: string): Promise<Blob> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("xerobookz_token") : null;
    const tenantId = typeof window !== "undefined" ? localStorage.getItem("xerobookz_tenant_id") : null;

    const response = await axios.get(`${API_BASE_URL}/documents/${id}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Tenant-ID": tenantId || "",
      },
      responseType: "blob",
    });

    return response.data;
  },

  deleteDocument: async (id: string): Promise<APIResponse> => {
    return apiClient.delete(`/documents/${id}`);
  },
};

