import { join } from "path";
import { mkdir } from "fs/promises";

const UPLOAD_DIR = Bun.env.UPLOAD_DIR ?? "./uploads";

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveFile(file: File, id: string): Promise<string> {
  await ensureUploadDir();
  // Force .pdf extension regardless of the uploaded filename to prevent spoofing
  const fileName = `${id}.pdf`;
  const filePath = join(UPLOAD_DIR, fileName);
  await Bun.write(filePath, file);
  return filePath;
}

export async function saveSignedFile(
  bytes: Uint8Array,
  id: string
): Promise<string> {
  await ensureUploadDir();
  const filePath = join(UPLOAD_DIR, `${id}-signed.pdf`);
  await Bun.write(filePath, bytes);
  return filePath;
}

export async function readFile(filePath: string): Promise<ArrayBuffer> {
  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    console.error(`File not found internally: ${filePath}`);
    throw new Error(`File access failed`);
  }
  return file.arrayBuffer();
}

export async function streamFile(filePath: string) {
  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    console.error(`File not found internally: ${filePath}`);
    throw new Error(`File access failed`);
  }
  return file;
}