import { MiddlewareHandler } from "hono";
import { Logflare } from "logflare";

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    const logflare = new Logflare({
      apiKey: process.env.LOGFLARE_API_KEY!,
      sourceToken: process.env.LOGFLARE_SOURCE_TOKEN!,
    });

    // Log to Logflare
    await logflare.addEvent({
      message: error.message,
      metadata: {
        path: c.req.path,
        method: c.req.method,
        error: error.stack,
      },
    });

    // Return sanitized error
    return c.json(
      { error: "Internal server error" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}; 