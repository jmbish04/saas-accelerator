"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.stripe = void 0;
const stripe_1 = require("stripe");
const hono_1 = require("hono");
const db_1 = require("@repo/db");
const schema_1 = require("@repo/db/schema");
const email_1 = require("@repo/services/email");
exports.stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    httpClient: stripe_1.Stripe.createFetchHttpClient(),
});
exports.stripeWebhook = new hono_1.Hono();
exports.stripeWebhook.post("/", async (c) => {
    const sig = c.req.header("stripe-signature");
    const body = await c.req.text();
    try {
        const event = exports.stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        switch (event.type) {
            case "checkout.session.completed":
                await handleCheckoutSessionCompleted(event.data.object);
                break;
            case "customer.subscription.updated":
                await handleSubscriptionUpdate(event.data.object);
                break;
        }
        return c.json({ received: true });
    }
    catch (err) {
        return c.json({ error: err }, 400);
    }
});
async function handleCheckoutSessionCompleted(session) {
    if (!session.customer || !session.subscription)
        return;
    const [user] = await db_1.db.insert(schema_1.users).values({
        clerkId: session.client_reference_id,
        email: session.customer_email,
        stripeCustomerId: typeof session.customer === "string"
            ? session.customer
            : session.customer.id,
        stripeSubscriptionId: typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id,
    }).returning();
    if (user) {
        await (0, email_1.sendWelcomeEmail)(user.email, user.name || "User");
    }
}
async function handleSubscriptionUpdate(subscription) {
    await db_1.db
        .update(schema_1.users)
        .set({
        stripeSubscriptionStatus: subscription.status,
    })
        .where({ stripeSubscriptionId: subscription.id });
}
