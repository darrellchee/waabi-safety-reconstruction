import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

for (const path of ["/", "/company"]) {
  for (const viewport of viewports) {
    test(`${path} ${viewport.width}x${viewport.height}: full page, healthy assets, navigation`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(60_000);
      await page.setViewportSize(viewport);
      const errors: string[] = [];
      const failedAssets: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (
          new URL(response.url()).origin ===
            new URL(testInfo.project.use.baseURL as string).origin &&
          response.status() >= 400
        )
          failedAssets.push(`${response.status()} ${response.url()}`);
      });
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(
        new RegExp(path === "/" ? "/$" : "/company$"),
      );
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".announcement, .cookie-notice, .cookie-modal-backdrop")).toHaveCount(0);
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content: "html { scroll-behavior: auto !important; }",
      });
      // Trigger all lazy assets and scroll reveals before checking the entire page.
      const height = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      for (let y = 0; y < height; y += viewport.height * 0.8) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(70);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - innerWidth,
          ),
        ).toBeLessThanOrEqual(1);
      }
      await expect(
        page.getByRole("navigation", { name: "Footer navigation" }),
      ).toBeVisible();
      await page.waitForFunction(
        () => [...document.images].every((image) => image.complete),
        undefined,
        { timeout: 20_000 },
      );
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter((image) => (image as HTMLImageElement).naturalWidth === 0)
              .map((image) => (image as HTMLImageElement).src),
          ),
      ).toEqual([]);
      expect(errors).toEqual([]);
      expect(failedAssets).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByRole("button", { name: "Menu", exact: true }).focus();
      await page.keyboard.press("Enter");
      const navigation = page.getByRole("navigation", {
        name: "Global navigation",
      });
      await expect(navigation).toBeVisible();
      await expect(navigation.getByRole("link")).toHaveText(["Home", "Safety", "Company", "Careers"]);
      for (const [name, href] of [
        ["Home", "/"],
        ["Safety", "/safety"],
        ["Company", "/company"],
        ["Careers", "/careers"],
      ]) {
        await expect(
          navigation.getByRole("link", { name, exact: true }),
        ).toHaveAttribute("href", href);
      }
      await page.keyboard.press("Escape");
      await expect(navigation).toHaveCount(0);
    });
  }
}

test("menu connects Home, Company, Safety and Careers locally", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  for (const [name, path] of [
    ["Company", "/company"],
    ["Safety", "/safety"],
    ["Careers", "/careers"],
    ["Home", "/"],
  ]) {
    await page.getByRole("button", { name: "Menu", exact: true }).focus();
      await page.keyboard.press("Enter");
    await page
      .getByRole("navigation", { name: "Global navigation" })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(path === "/" ? "/$" : `${path}$`));
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("Home strengths, partner quotes, technology links and insights work", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const strengths = page.getByRole("tablist", { name: "Our strengths" });
  await strengths.getByRole("tab", { name: "Scalable", exact: true }).click();
  await expect(
    strengths.getByRole("tab", { name: "Scalable", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(strengths.getByRole("tabpanel")).toContainText("shared brain");
  const partnerTabs = page.getByRole("tablist", { name: "Partners" });
  const quote = page.locator('blockquote[aria-hidden="false"]');
  const firstQuote = await quote.innerText();
  await partnerTabs.getByRole("tab", { name: "Uber", exact: true }).click();
  await expect(
    partnerTabs.getByRole("tab", { name: "Uber", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(quote).not.toHaveText(firstQuote);
  for (const name of ["Waabi World", "Mixed Reality Testing", "Waabi Driver"]) {
    await expect(
      page.getByRole("link", { name: `Explore ${name}`, exact: true }),
    ).toHaveAttribute("href", /^https:\/\/waabi\.ai\/insights\//);
  }
  await page
    .getByRole("button", { name: "Next insights", exact: true })
    .click();
  await expect
    .poll(() =>
      page.locator(".home-insights-rail").evaluate((rail) => rail.scrollLeft),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("button", { name: "Previous insights", exact: true })
    .click();
  await expect
    .poll(() =>
      page.locator(".home-insights-rail").evaluate((rail) => rail.scrollLeft),
    )
    .toBe(0);
});

test("Company news carousel and location controls work", async ({
  page,
}) => {
  await page.goto("/company", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Next news", exact: true }).click();
  await expect
    .poll(() =>
      page.locator(".co-news-track").evaluate((rail) => rail.scrollLeft),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("button", { name: "Previous news", exact: true })
    .click();
  await expect
    .poll(() =>
      page.locator(".co-news-track").evaluate((rail) => rail.scrollLeft),
    )
    .toBe(0);
  const toronto = page.getByRole("button", { name: "Toronto", exact: true });
  await toronto.scrollIntoViewIfNeeded();
  await toronto.focus();
  await expect(toronto).toHaveAttribute("aria-pressed", "true");
  await expect(toronto).toContainText("Toronto");
  await page.keyboard.press("Tab");
  await expect(toronto).toHaveAttribute("aria-pressed", "false");
});
