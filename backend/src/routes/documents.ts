import { Elysia, t } from "elysia";
import { db, type DocumentRow } from "../db";
import { saveFile, streamFile } from "../services/storage";
import { sendSigningRequest } from "../services/email";
import { getPageCount } from "../services/pdf";

const EXPIRY_DAYS = 7;

function expiresAt(): string {
  const d = new Date();
  d.setDate(d.getDate() + EXPIRY_DAYS);
  return d.toISOString();
}

function rowToDto(row: DocumentRow) {
  return {
    id: row.id,
    title: row.title,
    requesterEmail: row.requester_email,
    signerEmail: row.signer_email,
    status: row.status,
    createdAt: row.created_at,
    signedAt: row.signed_at,
    expiresAt: row.expires_at,
  };
}

export const documentRoutes = new Elysia({ prefix: "/documents", tags: ["documents"] })

  // List all documents
  .get("/", () => {
    const rows = db.query(`
      SELECT id, title, requester_email, signer_email, status, created_at, signed_at, expires_at 
      FROM documents 
      ORDER BY created_at DESC
    `).all() as DocumentRow[];
    return { documents: rows.map(rowToDto) };
  })

  // Upload PDF + create signing request
  .post(
    "/",
    async ({ body, set }) => {
      const id = crypto.randomUUID();
      const signingToken = crypto.randomUUID() + crypto.randomUUID(); // long token

      const filePath = await saveFile(body.file, id);
      const pageCount = await getPageCount(filePath);

      db.query(`
        INSERT INTO documents
          (id, title, requester_email, signer_email, file_path, status, signing_token, expires_at, created_at)
        VALUES
          ($id, $title, $requesterEmail, $signerEmail, $filePath, 'pending', $signingToken, $expiresAt, $createdAt)
      `).run({
        $id: id,
        $title: body.title,
        $requesterEmail: body.requesterEmail,
        $signerEmail: body.signerEmail,
        $filePath: filePath,
        $signingToken: signingToken,
        $expiresAt: expiresAt(),
        $createdAt: new Date().toISOString(),
      });

      // Send signing request email to signer
      await sendSigningRequest({
        to: body.signerEmail,
        title: body.title,
        requesterEmail: body.requesterEmail,
        signingToken,
      });

      set.status = 201;
      return { id, pageCount, message: "Document created and signing request sent" };
    },
    {
      body: t.Object({
        file: t.File({ type: "application/pdf" }),
        requesterEmail: t.String(),
        signerEmail: t.String(),
        title: t.String({ minLength: 1 }),
      }),
    }
  )

  // Get single document
  .get("/:id", ({ params, set }) => {
    const row = db.query(`
      SELECT id, title, requester_email, signer_email, status, created_at, signed_at, expires_at 
      FROM documents 
      WHERE id = $id
    `).get({ $id: params.id }) as DocumentRow | null;

    if (!row) { set.status = 404; return { error: "Document not found" }; }
    return rowToDto(row);
  })

  // Download signed PDF
  .get("/:id/download", async ({ params, set }) => {
    const row = db.query(`
      SELECT id, title, status, signed_file_path 
      FROM documents 
      WHERE id = $id
    `).get({ $id: params.id }) as DocumentRow | null;

    if (!row) { set.status = 404; return { error: "Not found" }; }
    if (row.status !== "signed" || !row.signed_file_path) {
      set.status = 400; return { error: "Document not yet signed" };
    }

    const file = await streamFile(row.signed_file_path);
    set.headers["Content-Type"] = "application/pdf";
    set.headers["Content-Disposition"] =
      `attachment; filename="${row.title.replace(/[^a-z0-9]/gi, "_")}-signed.pdf"`;
    return file;
  });