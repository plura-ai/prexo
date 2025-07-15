import { verifyApiKey } from "@/lib/middleware";
import { VectorDB } from "@prexo/ai-chat-sdk/context";
import { Index } from "@upstash/vector";
import { Hono } from "hono";

export const maxDuration = 60;

const context = new Hono();
const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });
const vectorDB = new VectorDB(index);

context.use(
  "*",
  verifyApiKey({
    apiId: process.env.UNKEY_API_ID!,
    tags: ["/sdk/context"],
    handleInvalidKey: (c, result) => {
      console.log("Invalid API key!", result);
      return c.json({ error: "unauthorized", reason: result?.code }, 401);
    },
    onError: (c, err) => {
      console.log("Unkey Error:", err.message);
      return c.text("unauthorized", 401);
    },
  }, 2, 5, 60)
);

context.post("/add", async (c) => {
  try {
    const { namespace, type, url, data } = await c.req.json();
    let result;

    switch (type) {
      case "html":
        result = await vectorDB.save({
          type: "html",
          fileSource: url,
          options: { namespace }
        });
        break;
      case "text":
        result = await vectorDB.save({
          type: "text",
          data: data,
          options: { namespace }
        });
        break;
      case "pdf":
          result = await vectorDB.save({
            type: "pdf",
            fileSource: url,
            options: { namespace }
          });
        break;
      case "csv":
          result = await vectorDB.save({
            type: "csv",
            fileSource: url,
            options: { namespace }
          });
        break;
      case "text-file":
          result = await vectorDB.save({
            type: "text-file",
            fileSource: url,
            options: { namespace }
          });
        break;
        
      default:
        return c.json(
          {
            message: "Invalid type provided",
            status: 400,
          },
          400
        );
    }

    if (!result.success) {
      throw new Error(result.error || "Unknown error");
    }

    return c.json(
      {
        message: "Context added successfully!",
        status: 201,
        ids: result.ids,
      },
      201
    );
  } catch (error) {
    console.error("Error adding context:", error);
    return c.json(
      {
        message: "Failed to add context",
        error: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      500
    );
  }
});

export default context;