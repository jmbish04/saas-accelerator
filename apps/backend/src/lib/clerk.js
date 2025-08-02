"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClerkSession = exports.clerk = void 0;
const backend_1 = require("@clerk/backend");
exports.clerk = (0, backend_1.Clerk)({
    secretKey: process.env.CLERK_SECRET_KEY,
});
const verifyClerkSession = async (sessionToken) => {
    try {
        const { userId } = await exports.clerk.verifyToken(sessionToken);
        return exports.clerk.users.getUser(userId);
    }
    catch (error) {
        throw new Error("Invalid session token");
    }
};
exports.verifyClerkSession = verifyClerkSession;
