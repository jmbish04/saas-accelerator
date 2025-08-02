"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const vitest_1 = require("vitest");
// Mock Stripe
vitest_1.vi.mock("../../src/lib/stripe", () => ({
    stripe: {
        checkout: {
            sessions: {
                create: vitest_1.vi.fn().mockResolvedValue({ url: "https://stripe.com/mock" }),
            },
        },
    },
}));
