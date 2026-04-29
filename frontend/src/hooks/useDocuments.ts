import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsApi } from "@/api/documents";
import type { UploadDocumentPayload, SignDocumentPayload } from "@/types";

// ── Queries ──────────────────────────────────────────────

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await documentsApi.list();
      return res.data.documents;
    },
  });
}

export function useDocument(id: string | undefined) {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: async () => {
      const res = await documentsApi.get(id!);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useSigningDocument(token: string | undefined) {
  return useQuery({
    queryKey: ["sign", token],
    queryFn: async () => {
      const res = await documentsApi.getByToken(token!);
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });
}

// ── Mutations ─────────────────────────────────────────────

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UploadDocumentPayload) => documentsApi.upload(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] }),
  });
}

export function useSignDocument(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignDocumentPayload) => documentsApi.sign(token, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sign", token] }),
  });
}