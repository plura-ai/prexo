import { betterAuth } from "better-auth";
import { prisma } from "@prexo/db";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { haveIBeenPwned } from "better-auth/plugins";

// import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
// import { Polar } from "@polar-sh/sdk";
// import { polarClient } from "@polar-sh/better-auth";

// const polarInit = new Polar({
//     accessToken: Envs.POLAR_ACCESS_TOKEN,
//     // Use 'sandbox' if you're using the Polar Sandbox environment
//     // Remember that access tokens, products, etc. are completely separated between environments.
//     // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
//     server: 'sandbox'
// });
const isDev = process.env.NODE_ENV === "development";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    // polar({
    //     client: polarInit,
    //     createCustomerOnSignUp: true,
    //     use: [
    //         checkout({
    //             products: [
    //                 {
    //                     productId: "123-456-789", // ID of Product from Polar Dashboard
    //                     slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
    //                 }
    //             ],
    //             successUrl: "/success?checkout_id={CHECKOUT_ID}",
    //             authenticatedUsersOnly: true
    //         }),
    //         portal(),
    //         usage(),
    //         webhooks({
    //             secret: Envs.POLAR_WEBHOOK_SECRET,
    //             // onCustomerStateChanged: (payload: any) => {
    //             //     // Triggered when anything regarding a customer changes
    //             // },
    //             // onOrderPaid: (payload: any) => {
    //             //     // Triggered when an order was paid (purchase, subscription renewal, etc.)
    //             // },
    //             // onPayload: (payload: any) => {
    //             //     // Catch-all for all events
    //             // }
    //         })
    //     ],
    // })
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
