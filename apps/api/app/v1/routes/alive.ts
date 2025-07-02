import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    runtime: "edge",
  });
});

export default health;
