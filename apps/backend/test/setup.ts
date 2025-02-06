import "dotenv/config";
import { vi } from "vitest";

// Mock Stripe
vi.mock("../../src/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ url: "https://stripe.com/mock" }),
      },
    },
  },
})); 