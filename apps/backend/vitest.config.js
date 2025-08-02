"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        environment: "cloudflare",
        globals: true,
        setupFiles: ["./test/setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
        },
    },
});
