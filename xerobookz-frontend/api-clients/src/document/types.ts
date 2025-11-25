export interface Document {
  id: string;
  tenant_id: string;
  filename: string;
  content_type?: string;
  file_size: number;
  document_type: string;
  classification_tags?: string[];
  thumbnail_url?: string;
  ocr_status: string;
  virus_scan_status: string;
  uploaded_by?: string;
  related_entity_id?: string;
  related_entity_type?: string;
  storage_path?: string;
  created_at: string;
  updated_at: string;
}

