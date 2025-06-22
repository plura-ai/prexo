import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import health from "../routes/alive";

export const runtime = "edge";
const app = new Hono().basePath("/v1");

app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  );
  
  app.use(logger());

// Import routes
app.route("/health", health);

  const GET = handle(app);
  const POST = handle(app);
  const PATCH = handle(app);
  const DELETE = handle(app);
  const OPTIONS = handle(app);
  const PUT = handle(app);
  
  export { GET, PUT, PATCH, POST, DELETE, OPTIONS };