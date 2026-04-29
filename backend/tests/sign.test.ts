import { describe, it, expect, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { signRoutes } from "../src/routes/sign";

describe("Sign routes", () => {
  const app = new Elysia().use(signRoutes);

  it("GET /sign/:token returns 404 for unknown token", async () => {
    const res = await app.handle(
      new Request("http://localhost/sign/totally-fake-token-that-doesnt-exist")
    );
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it("POST /sign/:token returns 404 for unknown token", async () => {
    const res = await app.handle(
      new Request("http://localhost/sign/bad-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signatureDataUrl: "data:image/png;base64,abc",
          signerName: "Test Signer",
          placements: [{ page: 1, xPct: 0.1, yPct: 0.1, widthPct: 0.2, heightPct: 0.05 }],
        }),
      })
    );
    expect(res.status).toBe(404);
  });
});