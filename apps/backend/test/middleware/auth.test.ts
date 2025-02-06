import { describe, expect, test, vi } from "vitest";
import { authMiddleware } from "../../src/middleware/auth";
import { createContext } from "../../src/lib/context";

describe("Auth Middleware", () => {
  test("rejects unauthorized requests", async () => {
    const ctx = createContext(new Request("http://localhost"));
    
    const result = await authMiddleware(ctx, vi.fn());
    expect(result?.status).toBe(401);
  });
}); 