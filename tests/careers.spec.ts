import { expect, test } from "@playwright/test";

const sizes = [
  { width: 1440, height: 900, sections: [484, 1466, 820, 854, 966] },
  { width: 1920, height: 1080, sections: [484, 1466, 820, 854, 1134] },
  { width: 768, height: 1024, sections: [572, 1766, 833.390625, 734, 784.796875] },
  { width: 390, height: 844, sections: [514, 1082.75, 728.4375, 637.84375, 517.671875] },
];
for (const size of sizes) {
  test(`Careers ${size.width}: reference section geometry, assets and shared chrome`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize(size);
    await page.goto("/careers", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find your place in Physical AI.");
    await page.evaluate(() => document.fonts.ready);
    const heights = await page.locator("main > section").evaluateAll(sections => sections.map(section => section.getBoundingClientRect().height));
    heights.forEach((height, index) => expect(Math.abs(height - size.sections[index])).toBeLessThan(.2));
    if (size.width === 390) {
      const lines = await page.locator(".careers-values-title .careers-title-word").evaluateAll(words => {
        const first = words[0].getBoundingClientRect().y;
        return words.map(word => Math.round((word.getBoundingClientRect().y - first) / 30.6));
      });
      // Native text balancing depends on the reference's nested whitespace spans.
      expect(lines).toEqual([0, 0, 0, 1, 1, 2]);
    }
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += size.height * .8) {
      await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(80);
    }
    await expect.poll(() => page.locator("main img").evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || !(image as HTMLImageElement).naturalWidth).length)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.locator(".announcement,.cookie-notice")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Join the team", exact: true })).toHaveAttribute("href", "https://jobs.lever.co/waabi");
    await expect(page.getByRole("link", { name: "Explore open roles" })).toHaveAttribute("href", "https://jobs.lever.co/waabi");
    await expect(page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Careers" })).toHaveAttribute("href", "/careers");
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Menu", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation", { name: "Global navigation" }).getByRole("link")).toHaveText(["Home", "Safety", "Company"]);
    expect(errors).toEqual([]);
  });
}

test("Careers testimonials wrap all nine quotes and values arrows retain measured native step", async ({ page }) => {
  await page.goto("/careers", { waitUntil: "domcontentloaded" });
  const voices = page.getByRole("region", { name: "Waabi voices" });
  await voices.scrollIntoViewIfNeeded();
  const counter = page.locator(".careers-voices-counter");
  const names = ["Sahil Jain", "Jaime Villalta", "Joseph Sunga", "Richard Xu", "Candyce Holloway", "Nicholas Vozza", "Valeriia Fakhrutdinova", "Niharika Bhargava", "Corbin Jackson"];
  for (let i = 0; i < names.length; i++) {
    await expect(counter).toHaveAttribute("aria-label", `Testimonial ${i + 1} of 9`);
    await expect(page.locator('.careers-voice-quote[aria-hidden="false"]')).toContainText(names[i]);
    await page.getByRole("button", { name: "Next testimonial" }).click();
  }
  await expect(counter).toHaveAttribute("aria-label", "Testimonial 1 of 9");
  await page.getByRole("button", { name: "Previous testimonial" }).click();
  await expect(counter).toHaveAttribute("aria-label", "Testimonial 9 of 9");
  const rail = page.getByRole("region", { name: "Our values" });
  await rail.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Next value", exact: true }).filter({ visible: true }).click();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBe(339);
  await page.getByRole("button", { name: "Previous value", exact: true }).filter({ visible: true }).click();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBe(0);
});

test("Careers normal motion reverses hero parallax and pauses photo rotation outside the viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/careers", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const image = page.locator(".careers-hero-image");
  const y = () => image.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42);
  await expect.poll(y).toBeCloseTo(0, 1);
  await page.evaluate(() => scrollTo({ top: 450, behavior: "instant" }));
  await expect.poll(y).toBeCloseTo(54, 1);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(y).toBeCloseTo(0, 1);
  const stack = page.locator(".careers-photo-stack--portrait");
  const active = () => stack.locator('.careers-stack-photo[data-slot="1"]:not(.is-exiting)').getAttribute("data-index");
  await stack.scrollIntoViewIfNeeded();
  const first = await active();
  await expect.poll(active, { timeout: 5000 }).not.toBe(first);
  await expect(page.locator(".careers-voices-counter")).toHaveAttribute("aria-label", "Testimonial 1 of 9");
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(900);
  const paused = await active();
  await page.waitForTimeout(2200);
  expect(await active()).toBe(paused);
});
