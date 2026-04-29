import { Database } from "bun:sqlite";

const DB_PATH = Bun.env.DATABASE_URL?.replace("file:", "") ?? "./esign.db";

export const db = new Database(DB_PATH, { create: true });

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA foreign_keys = ON");

db.run(`
  CREATE TABLE IF NOT EXISTS documents (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    requester_email  TEXT NOT NULL,
    signer_email     TEXT NOT NULL,
    file_path        TEXT NOT NULL,
    signed_file_path TEXT,
    status           TEXT NOT NULL DEFAULT 'pending',
    signing_token    TEXT UNIQUE NOT NULL,
    expires_at       TEXT NOT NULL,
    created_at       TEXT NOT NULL,
    signed_at        TEXT
  )
`);

export interface DocumentRow {
  id: string;
  title: string;
  requester_email: string;
  signer_email: string;
  file_path: string;
  signed_file_path: string | null;
  status: "pending" | "signed" | "expired";
  signing_token: string;
  expires_at: string;
  created_at: string;
  signed_at: string | null;
}