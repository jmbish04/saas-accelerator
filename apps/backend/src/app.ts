import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { authMiddleware } from "./middleware/auth";
import { rateLimiter } from "./middleware/rate-limit";
import { stripeWebhook } from "./lib/stripe";
import { createCheckoutSession } from "./services/subscription";
import { storageRouter } from "./services/storage";
import { adminRouter } from "./routes/admin";

const app = new Hono();

// Base middleware
app.use("*", 
  logger(),
  secureHeaders(),
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || [],
    credentials: true,
  }),
  rateLimiter()
);

// Admin routes
app.route("/api/admin", adminRouter);

// Storage routes
app.route("/storage", storageRouter);

// Stripe webhook
app.route("/stripe", stripeWebhook);

// Health check
app.get("/health", (c) => c.text("OK"));

// Protected routes
app.get("/api/user", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json(user);
});

// Subscription routes
app.post("/api/subscribe", authMiddleware, async (c) => {
  const user = c.get("user");
  const { plan } = await c.req.json();
  
  const session = await createCheckoutSession(
    user.id,
    plan,
    `${process.env.FRONTEND_URL}/success`,
    `${process.env.FRONTEND_URL}/cancel`
  );
  
  return c.json({ url: session.url });
});

export default app; 