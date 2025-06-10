import { betterAuth } from "better-auth";
import { db } from "@prexo/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Envs } from "@prexo/utils/envs";
import { passkey } from "better-auth/plugins/passkey"
import { haveIBeenPwned } from "better-auth/plugins"
import { createAuthClient } from "better-auth/client"
import { passkeyClient } from "better-auth/client/plugins"
// import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
// import { Polar } from "@polar-sh/sdk";
// import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
    plugins: [ 
        passkeyClient(),
        // polarClient(),
    ] 
})

// const polarInit = new Polar({
//     accessToken: Envs.POLAR_ACCESS_TOKEN,
//     // Use 'sandbox' if you're using the Polar Sandbox environment
//     // Remember that access tokens, products, etc. are completely separated between environments.
//     // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
//     server: 'sandbox'
// });

export const auth: ReturnType<typeof betterAuth> = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql", // or "pg", "sqlite"
    }),
    plugins: [ 
        passkey(), 
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Please choose a more secure password."
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
    baseURL: Envs.BETTER_AUTH_URL,
    secret: Envs.BETTER_AUTH_SECRET,
})