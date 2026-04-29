import { describe, it, expect } from "bun:test";
import { Elysia } from "elysia";
import { documentRoutes } from "../src/routes/documents";

describe("Document routes", () => {
  const app = new Elysia().use(documentRoutes);

  it("GET /documents returns an array", async () => {
    const res = await app.handle(new Request("http://localhost/documents"));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(json.documents)).toBe(true);
  });

  it("GET /documents/:id returns 404 for unknown id", async () => {
    const res = await app.handle(
      new Request("http://localhost/documents/non-existent-id")
    );
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it("GET /documents/:id/download returns 404 for unknown id", async () => {
    const res = await app.handle(
      new Request("http://localhost/documents/non-existent-id/download")
    );
    expect(res.status).toBe(404);
  });
});