import { stripe } from "../lib/stripe";

type PlanId = "basic" | "pro" | "enterprise";

const PLANS: Record<PlanId, Striripe.Price> = {
  basic: {
    id: process.env.STRIPE_BASIC_PRICE_ID!,
    unit_amount: 999,
  },
  pro: {
    id: process.env.STRIPE_PRO_PRICE_ID!,
    unit_amount: 2999,
  },
  enterprise: {
    id: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    unit_amount: 9999,
  },
};

export const createCheckoutSession = async (
  userId: string,
  planId: PlanId,
  successUrl: string,
  cancelUrl: string
) => {
  return stripe.checkout.sessions.create({
    customer_email: user.email,
    payment_method_types: ["card"],
    line_items: [{
      price: PLANS[planId].id,
      quantity: 1,
    }],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    subscription_data: {
      metadata: { userId },
    },
  });
}; 