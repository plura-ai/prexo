import { createAuthClient } from "better-auth/client";
import { polarClient } from "@polar-sh/better-auth"; 

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  basePath: "/v1/auth",
  plugins: [
    polarClient(),
  ],
});


export async function getCheckoutLink(productsId: string[]) {
  const res = await authClient.checkout({
  products: productsId, 
});

return res.data?.url;
}

export async function getPortalLink() {
  await authClient.customer.portal();
}

export async function getCustomerState() {
  const { data: customerState } = await authClient.customer.state();
  return customerState;
}
