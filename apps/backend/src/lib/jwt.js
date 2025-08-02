"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jose_1 = require("jose");
const constants_1 = require("../constants");
const jwks = (0, jose_1.createRemoteJWKSet)(new URL(constants_1.CLERK_JWKS_URL));
const verifyJwt = async (token) => {
    const { payload } = await (0, jose_1.jwtVerify)(token, jwks, {
        issuer: "clerk",
    });
    if (!payload.sub)
        throw new Error("Invalid JWT payload");
    return {
        userId: payload.sub,
        sessionId: payload.sid,
    };
};
exports.verifyJwt = verifyJwt;
