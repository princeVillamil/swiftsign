import { Elysia, t } from "elysia";
import { db, type DocumentRow } from "../db";
import { saveSignedFile, streamFile } from "../services/storage";
import { stampSignature, type SignaturePlacement } from "../services/pdf";
import { sendSignedNotification } from "../services/email";

export const signRoutes = new Elysia({ prefix: "/sign", tags: ["signatures"] })

  // Get document info by signing token (public — signer uses this)
  .get("/:token", ({ params, set }) => {
    const row = db.query("SELECT * FROM documents WHERE signing_token = $token")
      .get({ $token: params.token }) as DocumentRow | null;

    if (!row) { set.status = 404; return { error: "Invalid or expired link" }; }

    if (row.status === "signed") {
      return { error: "already_signed", status: "signed" };
    }

    if (new Date(row.expires_at) < new Date()) {
      db.query("UPDATE documents SET status = 'expired' WHERE id = $id")
        .run({ $id: row.id });
      set.status = 410; return { error: "This signing link has expired" };
    }

    // Return enough info for the frontend to render the document
    return {
      id: row.id,
      title: row.title,
      signerEmail: row.signer_email,
      requesterEmail: row.requester_email,
      status: row.status,
      expiresAt: row.expires_at,
    };
  })

  // Stream the original PDF (for the PDF viewer)
  .get("/:token/pdf", async ({ params, set }) => {
    const row = db.query("SELECT * FROM documents WHERE signing_token = $token")
      .get({ $token: params.token }) as DocumentRow | null;

    if (!row || row.status !== "pending") {
      set.status = 404; return { error: "Not found" };
    }

    const file = await streamFile(row.file_path);
    set.headers["Content-Type"] = "application/pdf";
    return file;
  })

  // Submit signature
  .post(
    "/:token",
    async ({ params, body, set }) => {
      const row = db.query("SELECT * FROM documents WHERE signing_token = $token")
        .get({ $token: params.token }) as DocumentRow | null;

      if (!row) { set.status = 404; return { error: "Invalid link" }; }
      if (row.status !== "pending") {
        set.status = 409; return { error: "Document already processed" };
      }
      if (new Date(row.expires_at) < new Date()) {
        set.status = 410; return { error: "Link expired" };
      }

      // Stamp the signature onto the PDF
      const signedBytes = await stampSignature(
        row.file_path,
        body.signatureDataUrl,
        body.placements as SignaturePlacement[]
      );

      // Save signed PDF
      const signedFilePath = await saveSignedFile(signedBytes, row.id);

      // Update DB
      db.query(`
        UPDATE documents
        SET status = 'signed', signed_file_path = $path, signed_at = $now
        WHERE id = $id
      `).run({
        $path: signedFilePath,
        $now: new Date().toISOString(),
        $id: row.id,
      });

      // Notify requester
      await sendSignedNotification({
        to: row.requester_email,
        title: row.title,
        signerEmail: row.signer_email,
        documentId: row.id,
      });

      return { message: "Document signed successfully", documentId: row.id };
    },
    {
      body: t.Object({
        signatureDataUrl: t.String(),
        signerName: t.String({ minLength: 1 }),
        placements: t.Array(
          t.Object({
            page: t.Number({ minimum: 1 }),
            xPct: t.Number({ minimum: 0, maximum: 1 }),
            yPct: t.Number({ minimum: 0, maximum: 1 }),
            widthPct: t.Number({ minimum: 0, maximum: 1 }),
            heightPct: t.Number({ minimum: 0, maximum: 1 }),
          }),
          { minItems: 1 }
        ),
      }),
    }
  );