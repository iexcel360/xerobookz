import { useApiQuery, useApiMutation } from "../core/hooks";
import { documentApi } from "./client";
import { Document } from "./types";

export const useGetDocument = (id: string) => {
  return useApiQuery<Document>(["documents", id], `/documents/${id}`, {
    enabled: !!id,
  });
};

export const useUploadDocument = () => {
  return useApiMutation(
    ({
      file,
      documentType,
      relatedEntityId,
      relatedEntityType,
    }: {
      file: File;
      documentType: string;
      relatedEntityId?: string;
      relatedEntityType?: string;
    }) => documentApi.uploadDocument(file, documentType, relatedEntityId, relatedEntityType)
  );
};

export const useDeleteDocument = () => {
  return useApiMutation((id: string) => documentApi.deleteDocument(id));
};

