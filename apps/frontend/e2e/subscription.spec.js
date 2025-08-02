"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)("should complete subscription flow", async ({ page }) => {
    await page.goto("/pricing");
    await page.click("text=Start with Pro");
    // Test Stripe Checkout mock
    await page.waitForURL(/checkout\.stripe\.com/);
    await page.fill("#email", "test@example.com");
    await page.click("text=Subscribe");
    await page.waitForURL("/success");
    await (0, test_1.expect)(page).toHaveText("Subscription Successful");
});
