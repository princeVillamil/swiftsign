import { Elysia, t } from "elysia";

export const signatureRoutes = new Elysia({ prefix: "/signatures", tags: ["signatures"] })

  .post(
    "/:documentId",
    async ({ params, body }) => {
      // TODO: stamp signature onto PDF, notify requester
      return { message: "Signature submitted", documentId: params.documentId };
    },
    {
      body: t.Object({
        signatureDataUrl: t.String(),       // base64 PNG of the drawn sig
        signerName: t.String({ minLength: 1 }),
        placements: t.Array(               // where on each page to stamp it
          t.Object({
            page: t.Number({ minimum: 1 }),
            x: t.Number(),
            y: t.Number(),
            width: t.Number(),
            height: t.Number(),
          })
        ),
      }),
    }
  );