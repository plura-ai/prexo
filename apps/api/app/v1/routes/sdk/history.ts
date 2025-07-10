import { UnkeyContext } from "@unkey/hono";
import { Hono } from "hono";
import { Redis } from "@upstash/redis";
import type { Message } from "ai";
import { verifyApiKey } from "@/lib/middleware";

export const maxDuration = 30;

const history = new Hono<{ Variables: { verifyApiKey: UnkeyContext } }>();
const redis = Redis.fromEnv();

history.use(
    "*",
    verifyApiKey(
      {
        apiId: process.env.UNKEY_API_ID!,
        tags: ["/sdk/history"],
        handleInvalidKey: (c, result) => {
          console.log("Invalid API key!", result);
          return c.json(
            {
              error: "unauthorized",
              reason: result?.code,
            },
            401,
          );
        },
        onError: (c, err) => {
          console.log("Unkey Error:", err.message);
          return c.text("unauthorized", 401);
        },
      },
      10,30,60
    ),
  );

history.post("/get", async (c) => {
    const { key, startIndex, endIndex } = await c.req.json();
    const msgs: Message[] = await redis.lrange(key, startIndex, endIndex); 
    return c.json({
      msgs,
    });
  });

export default history;