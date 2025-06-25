import { auth as BetterAuth } from "@prexo/auth";
import { Hono } from "hono";
import { auth as Auth } from "@prexo/auth";

const auth = new Hono<{
  Variables: {
    user: typeof Auth.$Infer.Session.user | null;
    session: typeof Auth.$Infer.Session.session | null;
  };
}>();

auth.get("/*", (c) => BetterAuth.handler(c.req.raw));
auth.post("/*", (c) => BetterAuth.handler(c.req.raw));
export default auth;