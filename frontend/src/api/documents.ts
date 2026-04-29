import { apiClient } from "./client";
import type { Document, UploadDocumentPayload, SignDocumentPayload } from "@/types";

export const documentsApi = {
  list: () =>
    apiClient.get<{ documents: Document[] }>("/documents"),

  upload: (payload: UploadDocumentPayload) => {
    const form = new FormData();
    form.append("file", payload.file);
    form.append("requesterEmail", payload.requesterEmail);
    form.append("signerEmail", payload.signerEmail);
    form.append("title", payload.title);
    return apiClient.post<{ id: string; message: string }>("/documents", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  get: (id: string) =>
    apiClient.get<Document>(`/documents/${id}`),

  downloadUrl: (id: string) => `/api/documents/${id}/download`,

  sign: (documentId: string, payload: SignDocumentPayload) =>
    apiClient.post(`/signatures/${documentId}`, payload),
};