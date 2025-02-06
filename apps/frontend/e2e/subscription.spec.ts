import { test, expect } from "@playwright/test";

test("should complete subscription flow", async ({ page }) => {
  await page.goto("/pricing");
  await page.click("text=Start with Pro");
  
  // Test Stripe Checkout mock
  await page.waitForURL(/checkout\.stripe\.com/);
  await page.fill("#email", "test@example.com");
  await page.click("text=Subscribe");
  
  await page.waitForURL("/success");
  await expect(page).toHaveText("Subscription Successful");
}); 