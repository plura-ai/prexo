import { betterAuth } from "better-auth";
import { prisma } from "@prexo/db";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { haveIBeenPwned } from "better-auth/plugins";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "@prexo/polar";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
            checkout({
                products: [
                  {
                    productId: "40aaafdf-3ebc-44fe-b11b-883e610a363b",
                    slug: "Prexo-Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Prexo-Pro
                }
                ],
                successUrl: "/success?checkout_id={CHECKOUT_ID}",
                authenticatedUsersOnly: true
            }),
            portal(),
            usage(),
        ],
    })
  ],
  trustedOrigins: ["*"],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  user: {
    additionalFields: {
      role: {
        type: "string",
        nullable: false,
        required: true,
        input: false,
        defaultValue: "user",
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
