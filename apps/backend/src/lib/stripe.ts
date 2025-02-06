import { Stripe } from "stripe";
import { Hono } from "hono";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";
import { sendWelcomeEmail } from "@repo/services/email";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  httpClient: Stripe.createFetchHttpClient(),
});

export const stripeWebhook = new Hono();

stripeWebhook.post("/", async (c) => {
  const sig = c.req.header("stripe-signature");
  const body = await c.req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object);
        break;
    }

    return c.json({ received: true });
  } catch (err) {
    return c.json({ error: err }, 400);
  }
});

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.subscription) return;
  
  const [user] = await db.insert(users).values({
    clerkId: session.client_reference_id!,
    email: session.customer_email!,
    stripeCustomerId: typeof session.customer === "string" 
      ? session.customer 
      : session.customer.id,
    stripeSubscriptionId: typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id,
  }).returning();

  if (user) {
    await sendWelcomeEmail(user.email, user.name || "User");
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  await db
    .update(users)
    .set({
      stripeSubscriptionStatus: subscription.status,
    })
    .where({ stripeSubscriptionId: subscription.id });
} 