export type DocumentStatus = "pending" | "signed" | "expired" | "rejected";

export interface Document {
  id: string;
  title: string;
  status: DocumentStatus;
  requesterEmail: string;
  signerEmail: string;
  createdAt: string;
  signedAt?: string;
  expiresAt: string;
}

// Used on the public signing page
export interface SigningDocument {
  id: string;
  title: string;
  status: DocumentStatus;
  signerEmail: string;
  requesterEmail: string;
  expiresAt: string;
}

// Percentage-based coordinates (0–1) relative to page dimensions
export interface SignaturePlacement {
  page: number;
  xPct: number;
  yPct: number;
  widthPct: number;
  heightPct: number;
}

export interface UploadDocumentPayload {
  file: File;
  requesterEmail: string;
  signerEmail: string;
  title: string;
}

export interface SignDocumentPayload {
  signatureDataUrl: string;
  signerName: string;
  placements: SignaturePlacement[];
}