import { describe, it, expect } from "bun:test";
import { Elysia } from "elysia";

describe("Health endpoint", () => {
  it("returns status ok", async () => {
    const app = new Elysia().get("/health", () => ({
      status: "ok",
      ts: new Date().toISOString(),
    }));

    const res = await app.handle(new Request("http://localhost/health"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe("ok");
    expect(typeof json.ts).toBe("string");
  });
});