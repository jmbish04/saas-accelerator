"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityHeaders = void 0;
const securityHeaders = async (c, next) => {
    await next();
    c.res.headers.set("X-Frame-Options", "DENY");
    c.res.headers.set("X-Content-Type-Options", "nosniff");
    c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    c.res.headers.set("Permissions-Policy", "camera=(), microphone=()");
};
exports.securityHeaders = securityHeaders;
