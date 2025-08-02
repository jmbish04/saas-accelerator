"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_1 = require("../../src/middleware/auth");
const context_1 = require("../../src/lib/context");
(0, vitest_1.describe)("Auth Middleware", () => {
    (0, vitest_1.test)("rejects unauthorized requests", async () => {
        const ctx = (0, context_1.createContext)(new Request("http://localhost"));
        const result = await (0, auth_1.authMiddleware)(ctx, vitest_1.vi.fn());
        (0, vitest_1.expect)(result?.status).toBe(401);
    });
});
