import { describe, it, expect, mock } from "bun:test";

// Mock the services BEFORE importing the routes
mock.module("../src/services/pdf", () => ({
  getPageCount: () => Promise.resolve(1),
  stampSignature: () => Promise.resolve(new Uint8Array([1, 2, 3])),
}));

mock.module("../src/services/email", () => ({
  sendSigningRequest: () => Promise.resolve(true),
  sendSignedNotification: () => Promise.resolve(true),
}));

import { Elysia } from "elysia";
import { documentRoutes } from "../src/routes/documents";
import { signRoutes } from "../src/routes/sign";
import { db } from "../src/db";

describe("Document Lifecycle Integration", () => {
  const app = new Elysia()
    .use(documentRoutes)
    .use(signRoutes);

  it("Full flow: Upload -> Get Info -> Sign -> Download", async () => {
    // 1. UPLOAD
    // Use a slightly more realistic dummy PDF header to satisfy simple checks
    const dummyPdf = new Blob(["%PDF-1.4\n%EOF"], { type: "application/pdf" });
    const formData = new FormData();
    formData.append("file", dummyPdf, "test.pdf");
    formData.append("title", "Integration Test Doc");
    formData.append("requesterEmail", "requester@test.com");
    formData.append("signerEmail", "signer@test.com");

    const uploadRes = await app.handle(new Request("http://localhost/documents", {
      method: "POST",
      body: formData,
    }));

    if (uploadRes.status !== 201) {
        console.error(await uploadRes.json());
    }
    expect(uploadRes.status).toBe(201);
    
    const uploadJson = await uploadRes.json();
    const docId = uploadJson.id;
    expect(docId).toBeDefined();

    // 2. GET SIGNING TOKEN
    const row: any = db.query("SELECT signing_token FROM documents WHERE id = $id").get({ $id: docId });
    const token = row.signing_token;
    expect(token).toBeDefined();

    // 3. SIGNER GETS DOC INFO
    const infoRes = await app.handle(new Request(`http://localhost/sign/${token}`));
    expect(infoRes.status).toBe(200);
    const infoJson = await infoRes.json();
    expect(infoJson.title).toBe("Integration Test Doc");

    // 4. SUBMIT SIGNATURE
    const signRes = await app.handle(new Request(`http://localhost/sign/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signatureDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        signerName: "Integration Tester",
        placements: [{ page: 1, xPct: 0.5, yPct: 0.5, widthPct: 0.2, heightPct: 0.1 }]
      })
    }));

    expect(signRes.status).toBe(200);

    // 5. DOWNLOAD SIGNED PDF
    const downloadRes = await app.handle(new Request(`http://localhost/documents/${docId}/download`));
    expect(downloadRes.status).toBe(200);
    expect(downloadRes.headers.get("Content-Type")).toBe("application/pdf");
  });

  it("prevents signing an already signed document", async () => {
    const signedRow: any = db.query("SELECT signing_token FROM documents WHERE status = 'signed' LIMIT 1").get();
    if (signedRow) {
      const res = await app.handle(new Request(`http://localhost/sign/${signedRow.signing_token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            signatureDataUrl: "data:image/png;base64,abc",
            signerName: "Liar",
            placements: [{ page: 1, xPct: 0.1, yPct: 0.1, widthPct: 0.1, heightPct: 0.1 }]
        })
      }));
      expect(res.status).toBe(409);
    }
  });
});