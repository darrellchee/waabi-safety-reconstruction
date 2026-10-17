import { expect, test } from "@playwright/test";

test.describe("normal motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("Home scroll scene returns to its initial pose when scrolling back", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    await page.waitForTimeout(1200);
    const scene = page.locator(".home-road");
    const top = await scene.evaluate((element) => element.getBoundingClientRect().top + scrollY);
    const pose = () => page.locator(".home-tile").evaluateAll((elements) => elements.slice(0, 4).map((element) => {
      const style = getComputedStyle(element);
      return { transform: style.transform, opacity: style.opacity };
    }));
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top - 500);
    await page.waitForTimeout(1200);
    const before = await pose();
    expect(before.length).toBeGreaterThan(0);
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top + 500);
    await page.waitForTimeout(1200);
    const after = await pose();
    expect(after).not.toEqual(before);
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top - 500);
    await page.waitForTimeout(1200);
    expect(await pose()).toEqual(before);
  });

  test("wheel scrolling eases to its target instead of jumping", async ({ page }) => {
    await page.goto("/company");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    await page.waitForTimeout(600);
    await page.mouse.move(1200, 700);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(60);
    const intermediate = await page.evaluate(() => scrollY);
    expect(intermediate).toBeGreaterThan(0);
    expect(intermediate).toBeLessThan(600);
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 4000 }).toBeGreaterThan(597);
    await page.mouse.wheel(0, -600);
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 4000 }).toBeLessThan(3);
  });

  test("Company word reveals remain visible after scrolling back", async ({ page }) => {
    await page.goto("/company");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    const words = page.locator(".co-word");
    const pose = () => words.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, opacity: style.opacity };
    }));
    await page.waitForTimeout(500);
    const before = await pose();
    expect(before.length).toBeGreaterThan(20);
    await page.evaluate(() => scrollTo({ top: 700, behavior: "instant" }));
    await page.waitForTimeout(250);
    await page.evaluate(() => scrollTo({ top: 1100, behavior: "instant" }));
    await page.waitForTimeout(5500);
    const revealed = await pose();
    expect(revealed).not.toEqual(before);
    expect(revealed.every((word) => word.opacity === "1")).toBe(true);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(1200);
    expect(await pose()).toEqual(revealed);
  });
  test("Company portraits rotate in view and pause outside the viewport", async ({ page }) => {
    await page.goto("/company");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    await page.locator(".co-portraits").scrollIntoViewIfNeeded();
    const generations = () => page.locator(".co-portrait").evaluateAll((portraits) => portraits.map((portrait) => portrait.getAttribute("data-generation")));
    const before = await generations();
    expect(before.length).toBeGreaterThan(0);
    await expect.poll(generations, { timeout: 5000 }).not.toEqual(before);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(1000);
    const paused = await generations();
    await page.waitForTimeout(2500);
    expect(await generations()).toEqual(paused);
  });

});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("Home starts with readable content and paused background films", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(800);
    expect(await page.locator(".home-page video").evaluateAll((videos) => videos.every((video) => (video as HTMLVideoElement).paused))).toBe(true);
  });
});
