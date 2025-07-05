import { verifyApi } from "@prexo/keys";
import { UnkeyConfig } from "@unkey/hono";
import { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

export function verifyApiKey(config: UnkeyConfig, cost?: number): MiddlewareHandler {
    return async (c, next) => {
      const key = config.getKey
        ? config.getKey(c)
        : (c.req.header("Authorization")?.replace("Bearer ", "") ?? null);
      if (!key) {
        return c.json({ error: "unauthorized" }, { status: 401 });
      }
      if (typeof key !== "string") {
        return key;
      }
  
      const res = await verifyApi(key, config.tags, cost)

      if (res.error) {
        const { code, requestId, message, docs } = res.error as {
          code?: string;
          requestId?: string;
          message?: string;
          docs?: string;
        };
        throw new HTTPException(500, {
          message: `unkey error: [CODE: ${code ?? "unknown"}] - [REQUEST_ID: ${requestId ?? "unknown"}] - ${message ?? "No message"} - read more at ${docs ?? "N/A"}`,
        });
      }

      if (!res.result?.valid && config.handleInvalidKey) {
        return config.handleInvalidKey(c, res.result);
      }

      c.set("prexo-unkey", res);

      await next();
    };
  }