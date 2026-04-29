import { apiClient } from "./client";
import type { Document, UploadDocumentPayload, SignDocumentPayload, SigningDocument } from "@/types";

export const documentsApi = {
  list: () =>
    apiClient.get<{ documents: Document[] }>("/documents"),

  get: (id: string) =>
    apiClient.get<Document>(`/documents/${id}`),

  getByToken: (token: string) =>
    apiClient.get<SigningDocument>(`/sign/${token}`),

  pdfUrl: (token: string) => `/api/sign/${token}/pdf`,

  upload: (payload: UploadDocumentPayload) => {
    const form = new FormData();
    form.append("file", payload.file);
    form.append("requesterEmail", payload.requesterEmail);
    form.append("signerEmail", payload.signerEmail);
    form.append("title", payload.title);
    return apiClient.post<{ id: string; pageCount: number; message: string }>(
      "/documents", form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },

  downloadUrl: (id: string) => `/api/documents/${id}/download`,

  sign: (token: string, payload: SignDocumentPayload) =>
    apiClient.post(`/sign/${token}`, payload),
};