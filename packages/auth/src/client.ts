import { createAuthClient } from "better-auth/client";
import { polarClient } from "@polar-sh/better-auth"; 

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  basePath: "/v1/auth",
  plugins: [
    polarClient(),
  ],
});
