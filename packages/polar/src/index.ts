import { Polar } from '@polar-sh/sdk'
import { authClient } from "@prexo/auth/client";

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
})

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