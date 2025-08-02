"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const db_1 = require("@repo/db");
const schema_1 = require("@repo/db/schema");
const admin = new hono_1.Hono();
admin.use("*", async (c, next) => {
    const user = c.get("user");
    if (!user?.isAdmin) {
        return c.json({ error: "Forbidden" }, 403);
    }
    await next();
});
admin.get("/metrics", async (c) => {
    const [totalUsers] = await db_1.db
        .select({ count: count() })
        .from(schema_1.users);
    const [activeSubscriptions] = await db_1.db
        .select({ count: count() })
        .from(schema_1.users)
        .where(gt(schema_1.users.stripeSubscriptionStatus, "active"));
    return c.json({
        "Total Users": totalUsers.count,
        "MRR": "$0", // Implement actual MRR calculation
        "Active Subscriptions": activeSubscriptions.count,
    });
});
admin.get("/users", async (c) => {
    const users = await db_1.db.query.users.findMany({
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
