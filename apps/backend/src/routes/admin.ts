import { Hono } from "hono";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";

const admin = new Hono();

admin.use("*", async (c, next) => {
  const user = c.get("user");
  if (!user?.isAdmin) {
    return c.json({ error: "Forbidden" }, 403);
  }
  await next();
});

admin.get("/metrics", async (c) => {
  const [totalUsers] = await db
    .select({ count: count() })
    .from(users);

  const [activeSubscriptions] = await db
    .select({ count: count() })
    .from(users)
    .where(gt(users.stripeSubscriptionStatus, "active"));

  return c.json({
    "Total Users": totalUsers.count,
    "MRR": "$0", // Implement actual MRR calculation
    "Active Subscriptions": activeSubscriptions.count,
  });
});

admin.get("/users", async (c) => {
  const users = await db.query.users.findMany({
    columns: {
      id: true,
      email: true,
      createdAt: true,
      stripeSubscriptionStatus: true,
    },
    limit: 50,
  });

  return c.json(users);
}); 