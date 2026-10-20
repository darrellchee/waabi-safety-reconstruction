import { expect, test } from "@playwright/test";

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  for (const route of ["/", "/safety", "/company", "/careers"]) {
    test(`${route} hydrates without console errors with motion ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => {
        if (message.type() === "error")
          errors.push(message.text());
      });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("navigation", { name: "Global navigation" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation", { name: "Global navigation" })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}
