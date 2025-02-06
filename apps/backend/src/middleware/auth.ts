import { Context } from "hono";
import { verifyJwt } from "../lib/jwt";
import { verifyClerkSession } from "../lib/clerk";

export const authMiddleware = async (c: Context, next: Function) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { userId, sessionId } = await verifyJwt(token);
    const user = await verifyClerkSession(sessionId);
    c.set("user", user);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
}; 