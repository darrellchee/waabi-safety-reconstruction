import { test, expect } from "@playwright/test";

test("Safety route contains complete page with healthy local assets", async ({
  page,
}) => {
  const errors: string[] = [];
  const failedAssets: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      new URL(response.url()).hostname === "127.0.0.1" &&
      response.status() >= 400
    )
      failedAssets.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/safety");
  await expect(page).toHaveURL(/\/safety$/);
  await expect(
    page.getByRole("heading", { name: "Redefining safety." }),
  ).toBeVisible();
  for (const id of [
    "stakes",
    "philosophy",
    "technology",
    "practices",
    "insights",
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(
    page.getByRole("navigation", { name: "Footer navigation" }),
  ).toBeAttached();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.onload = () => resolve();
              image.onerror = () => resolve();
            }),
      ),
    );
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (image) =>
              !(image as HTMLImageElement).complete ||
              (image as HTMLImageElement).naturalWidth === 0,
          )
          .map((image) => (image as HTMLImageElement).src),
      ),
  ).toEqual([]);
  expect(errors).toEqual([]);
  expect(failedAssets).toEqual([]);
});

test("navigation opens, closes with Escape, and links Safety locally", async ({
  page,
}) => {
  await page.goto("/safety");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  const navigation = page.getByRole("navigation", {
    name: "Global navigation",
  });
  await expect(navigation).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(
    navigation.getByRole("link", { name: "Safety", exact: true }),
  ).toHaveAttribute("href", "/safety");
  await page.keyboard.press("Escape");
  await expect(navigation).toHaveCount(0);
  await expect(menu).toBeFocused();
});

test("technology panels and safety practices respond to keyboard and click", async ({
  page,
}) => {
  await page.goto("/safety");
  await page.getByRole("button", { name: "Reject All", exact: true }).click();
  const world = page.getByRole("button", {
    name: "Explore Waabi World",
    exact: true,
  });
  await world.scrollIntoViewIfNeeded();
  await world.focus();
  await page.keyboard.press("Enter");
  await expect(world).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "Explore Waabi Driver", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  const next = page.getByRole("button", { name: "Next safety practice" });
  await next.click();
  await expect(
    page.locator('.practice-slide[aria-hidden="false"]'),
  ).toContainText("Testing & Validation");
  await page.getByRole("button", { name: "Previous safety practice" }).click();
  await expect(
    page.locator('.practice-slide[aria-hidden="false"]'),
  ).toContainText("Design");
  await next.click();
  await next.click();
  await next.click();
  await expect(
    page.locator('.practice-slide[aria-hidden="false"]'),
  ).toContainText("Monitoring");
  await next.click();
  await expect(
    page.locator('.practice-slide[aria-hidden="false"]'),
  ).toContainText("Monitoring");
});

test("cookie choices persist and custom preferences can be saved", async ({
  page,
}) => {
  await page.goto("/safety");
  await page.getByRole("button", { name: "Customize", exact: true }).click();
  const dialog = page.getByRole("dialog", {
    name: "Customize consent preferences",
  });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("checkbox", { name: "Analytics cookies" }).check();
  await dialog.getByRole("button", { name: "Save preferences" }).click();
  await expect(
    page.getByRole("complementary", { name: "Cookie privacy preferences" }),
  ).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("complementary", { name: "Cookie privacy preferences" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("waabi-prototype-cookie-consent")!),
    ),
  ).toEqual({ analytics: true, marketing: false });
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]) {
  test(`responsive ${viewport.width}x${viewport.height}: no page overflow and usable menu`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/safety");
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(
      page.getByRole("navigation", { name: "Global navigation" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Global navigation" }),
    ).toHaveCount(0);
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await expect(
      page.getByRole("link", { name: "LinkedIn", exact: true }),
    ).toBeVisible();
  });
}
