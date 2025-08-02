"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "d1",
    dbCredentials: {
        wranglerConfigPath: "../../apps/backend/wrangler.toml",
        dbName: "permit-dashboard",
    },
};
