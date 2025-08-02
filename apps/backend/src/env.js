"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    CLERK_SECRET_KEY: zod_1.z.string().min(1),
    STRIPE_SECRET_KEY: zod_1.z.string().min(1),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string().min(1),
    STRIPE_BASIC_PRICE_ID: zod_1.z.string().min(1),
    STRIPE_PRO_PRICE_ID: zod_1.z.string().min(1),
    STRIPE_ENTERPRISE_PRICE_ID: zod_1.z.string().min(1),
    CORS_ORIGINS: zod_1.z.string().default("http://localhost:3000"),
    FRONTEND_URL: zod_1.z.string().url().default("http://localhost:3000"),
    RESEND_API_KEY: zod_1.z.string().min(1),
    EMAIL_FROM: zod_1.z.string().email(),
    R2_ACCESS_KEY_ID: zod_1.z.string().min(1),
    R2_SECRET_ACCESS_KEY: zod_1.z.string().min(1),
    R2_BUCKET_NAME: zod_1.z.string().min(1),
    R2_PUBLIC_DOMAIN: zod_1.z.string().url(),
});
const validateEnv = (env) => {
    try {
        return envSchema.parse(env);
    }
    catch (error) {
        throw new Error(`Environment validation failed: ${error}`);
    }
};
exports.validateEnv = validateEnv;
