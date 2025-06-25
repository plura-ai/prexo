import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import health from "../routes/alive";
import ai from "../routes/ai";
import auth from "../routes/auth";

export const runtime = "edge";
const app = new Hono().basePath("/v1");

const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
    "*",
    cors({
      origin: allowedOrigins,
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
app.route("/auth", auth);
app.route("/ai", ai);

  const GET = handle(app);
  const POST = handle(app);
  const PATCH = handle(app);
  const DELETE = handle(app);
  const OPTIONS = handle(app);
  const PUT = handle(app);
  
  export { GET, PUT, PATCH, POST, DELETE, OPTIONS };