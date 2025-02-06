import { createRemoteJWKSet, jwtVerify } from "jose";
import { CLERK_JWKS_URL } from "../constants";

const jwks = createRemoteJWKSet(new URL(CLERK_JWKS_URL));

export const verifyJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: "clerk",
  });
  
  if (!payload.sub) throw new Error("Invalid JWT payload");
  
  return {
    userId: payload.sub,
    sessionId: payload.sid,
  };
}; 