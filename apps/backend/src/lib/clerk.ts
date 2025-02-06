import { Clerk } from "@clerk/backend";

export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export const verifyClerkSession = async (sessionToken: string) => {
  try {
    const { userId } = await clerk.verifyToken(sessionToken);
    return clerk.users.getUser(userId);
  } catch (error) {
    throw new Error("Invalid session token");
  }
}; 