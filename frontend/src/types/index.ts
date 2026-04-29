export type DocumentStatus = "pending" | "signed" | "expired" | "rejected";

export interface Document {
  id: string;
  title: string;
  status: DocumentStatus;
  requesterEmail: string;
  signerEmail: string;
  createdAt: string;
  signedAt?: string;
}

export interface SignaturePlacement {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UploadDocumentPayload {
  file: File;
  requesterEmail: string;
  signerEmail: string;
  title: string;
}

export interface SignDocumentPayload {
  signatureDataUrl: string;   // base64 PNG from the canvas
  signerName: string;
  placements: SignaturePlacement[];
}