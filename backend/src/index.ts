import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { documentRoutes } from "./routes/documents";
import { signRoutes } from "./routes/sign";

const PORT = Number(Bun.env.PORT) || 3000;

const app = new Elysia()
  .onBeforeHandle(({ request }) => {
    console.log(`[API] ${request.method} ${new URL(request.url).pathname}`);
  })
  .onError(({ code, error }) => {
    // Ignore "ghost" errors that sometimes trigger in Elysia watch mode
    if (!error && !code) return new Response("Internal Server Error", { status: 500 });

    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Only log if it's a real error
    if (errorMessage !== "undefined" && errorMessage !== "null") {
      console.error(`[ERROR ${code}]:`, errorMessage);
      if (error instanceof Error && error.stack) {
        console.error(error.stack);
      }
    }

    return { 
      error: errorMessage || "Internal Server Error",
      code 
    };
  })
  .use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use(
    swagger({
      documentation: {
        info: { title: "SwiftSign API", version: "0.1.0" },
        tags: [
          { name: "documents", description: "Document management" },
          { name: "signatures", description: "Signing flow" },
        ],
      },
    })
  )
  .get("/health", () => ({ status: "ok", ts: new Date().toISOString() }))
  .use(documentRoutes)
  .use(signRoutes)
  .listen({
    port: PORT,
    // Bun's native body limit setting
    maxRequestBodySize: 10 * 1024 * 1024,
  });

console.log(`Elysia running  → http://localhost:${PORT}`);
console.log(`Swagger UI      → http://localhost:${PORT}/swagger`);

export type App = typeof app;