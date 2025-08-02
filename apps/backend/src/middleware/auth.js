"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../lib/jwt");
const clerk_1 = require("../lib/clerk");
const authMiddleware = async (c, next) => {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    try {
        const { userId, sessionId } = await (0, jwt_1.verifyJwt)(token);
        const user = await (0, clerk_1.verifyClerkSession)(sessionId);
        c.set("user", user);
        await next();
    }
    catch (error) {
        return c.json({ error: "Invalid token" }, 401);
    }
};
exports.authMiddleware = authMiddleware;
