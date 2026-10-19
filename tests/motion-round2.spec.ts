import { expect, test } from "@playwright/test";

test.describe("source-measured motion regression", () => {
  test.use({ reducedMotion: "no-preference" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("Home title lines follow the reference opposing parallax and reverse exactly", async ({ page }) => {
    await page.waitForTimeout(500);
    const pose = () => page.locator(".home-title-line").evaluateAll(lines => lines.map(line => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(line).transform);
      return { x: matrix.m41, y: line.getBoundingClientRect().y };
    }));
    const initial = await pose();
    await page.evaluate(() => scrollTo({ top: 540, behavior: "instant" }));
    await expect.poll(async () => (await pose())[0].x).toBeCloseTo(29.2208, 1);
    const forward = await pose();
    // The source moves each line independently; its containing title remains at x103.
    expect((await page.locator(".home-hero h1").boundingBox())!.x).toBeCloseTo(103, 1);
    // Live source at 1440×900: first line +29.2208px, second −29.2208px.
    expect(forward[1].x).toBeCloseTo(-29.2208, 1);
    expect(forward[0].y - initial[0].y).toBeCloseTo(-540, 0);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(async () => (await pose())[0].x).toBeCloseTo(0, 1);
    const restored = await pose();
    expect(restored[1].x).toBeCloseTo(0, 1);
    expect(restored[0].y).toBeCloseTo(initial[0].y, 0);
  });

  test("Safety DNA preserves the measured 200/400/600px entrance spring and reveals once", async ({ page }) => {
    await page.goto("/safety", { waitUntil: "domcontentloaded" });
    const frames = await page.evaluate(async () => {
      const story = document.querySelector(".story")!;
      const nodes = [".story-counter", ".story-copy", ".story-visual-inner"].map(s => document.querySelector(s)!);
      const offset = (node: Element) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42;
      const top = story.getBoundingClientRect().top + scrollY;
      scrollTo({ top: Math.round(top - innerHeight + story.getBoundingClientRect().height * .2 + 12), behavior: "instant" });
      const frames: number[][] = [];
      const start = performance.now();
      await new Promise<void>(resolve => {
        const sample = () => {
          frames.push(nodes.map(offset));
          if (performance.now() - start < 1100) requestAnimationFrame(sample);
          else resolve();
        };
        requestAnimationFrame(sample);
      });
      return frames;
    });
    const transient = frames.find(frame => frame[0] > 30 && frame[0] < 150);
    expect(transient, "must capture an entrance frame, rather than only the settled pose").toBeDefined();
    // All three source FadeIn instances share stiffness80/damping20; only distance changes.
    expect(transient![1] / transient![0]).toBeCloseTo(2, 1);
    expect(transient![2] / transient![0]).toBeCloseTo(3, 1);
    await expect.poll(() => page.locator(".story-counter").evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m42)).toBeLessThan(1);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(100);
    expect(await page.locator(".story-counter").evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m42)).toBeLessThan(1);
  });

  test("Safety technology layout remains continuous when its expansion is interrupted", async ({ page }) => {
    await page.goto("/safety", { waitUntil: "domcontentloaded" });
    await page.locator(".technology-panels").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const result = await page.evaluate(async () => {
      const panels = [...document.querySelectorAll(".technology-panel")];
      const activate = (index: number) => (panels[index].querySelector("button") as HTMLButtonElement).click();
      const sample = () => panels.map(p => ({ x: p.getBoundingClientRect().x, width: p.getBoundingClientRect().width }));
      activate(1); await new Promise(resolve => setTimeout(resolve, 100));
      const before = sample(); activate(2);
      await new Promise(requestAnimationFrame); const interrupted = sample();
      await new Promise(resolve => setTimeout(resolve, 650)); const settled = sample();
      activate(0); await new Promise(resolve => setTimeout(resolve, 650));
      return { before, interrupted, settled, restored: sample() };
    });
    for (let i = 0; i < result.before.length; i++) {
      // Layout projection must continue from its displayed pose instead of snapping to CSS flex bounds.
      expect(Math.abs(result.interrupted[i].x - result.before[i].x)).toBeLessThan(160);
      expect(Math.abs(result.interrupted[i].width - result.before[i].width)).toBeLessThan(160);
    }
    expect(result.settled[2].width).toBeGreaterThan(result.settled[0].width * 2);
    expect(result.restored[0].width).toBeGreaterThan(result.restored[2].width * 2);
  });
  test("Safety mobile expansion preserves the source 600px panel and complete section height", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/safety", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.locator(".technology").evaluate(section => ({
      section: section.getBoundingClientRect().height,
      expanded: section.querySelector(".technology-panel.expanded")!.getBoundingClientRect().height,
    }));
    expect(dimensions.expanded).toBeCloseTo(600, 0);
    // Live source at 390×844 measures 1196.578px including the heading and rail.
    expect(Math.abs(dimensions.section - 1196.578)).toBeLessThan(2);
    // The source supports mouse hover even at a narrow viewport; touch users tap.
    const world = page.locator(".technology-panel").nth(1);
    await world.hover();
    await expect(world).toHaveClass(/expanded/);
    await expect.poll(() => world.evaluate(panel => panel.getBoundingClientRect().height)).toBeCloseTo(600, 0);
  });

  test("Home hero film pauses offscreen and resumes the retained frame on reverse scroll", async ({ page }) => {
    const film = page.locator(".home-hero video");
    await expect.poll(() => film.evaluate(video => (video as HTMLVideoElement).currentTime), { timeout: 10_000 }).toBeGreaterThan(.2);
    await page.evaluate(() => scrollTo({ top: 3500, behavior: "instant" }));
    await expect.poll(() => film.evaluate(video => (video as HTMLVideoElement).paused)).toBe(true);
    const pausedTime = await film.evaluate(video => (video as HTMLVideoElement).currentTime);
    await page.waitForTimeout(450);
    expect(await film.evaluate(video => (video as HTMLVideoElement).currentTime)).toBeCloseTo(pausedTime, 2);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(() => film.evaluate(video => (video as HTMLVideoElement).paused)).toBe(false);
    await expect.poll(() => film.evaluate(video => (video as HTMLVideoElement).currentTime)).toBeGreaterThan(pausedTime + .1);
  });

  test("Safety desktop dragging follows the source momentum snap", async ({ page }) => {
    await page.goto("/safety", { waitUntil: "domcontentloaded" });
    const rail = page.locator(".practice-slides");
    await rail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = (await rail.boundingBox())!;
    const y = Math.max(160, Math.min(700, box.y + box.height * .45));
    await page.mouse.move(1150, y);
    await page.mouse.down();
    for (let step = 1; step <= 20; step++) {
      await page.mouse.move(1150 - 950 * step / 20, y);
      await page.waitForTimeout(12);
    }
    await page.mouse.up();
    // The same source gesture ends at exactly one 1440px full-bleed slide.
    await expect.poll(() => rail.evaluate(e => e.scrollLeft), { timeout: 5000 }).toBeCloseTo(1440, 0);
    await expect(page.locator('.practice-slide[aria-hidden="false"]')).toContainText("Testing & Validation");
    await page.getByRole("button", { name: "Previous safety practice" }).click();
    await expect.poll(() => rail.evaluate(e => e.scrollLeft)).toBeLessThan(1);
  });

  for (const measured of [
    { width: 1440, height: 900, imageX: 810, imageY: 148.859, imageWidth: 526.984, counterX: 103, counterY: 428, copyX: 266.016 },
    { width: 1920, height: 1080, imageX: 1050, imageY: 238.859, imageWidth: 527, counterX: 343, counterY: 518, copyX: 506.016 },
    { width: 768, height: 1024, imageX: 586.203, imageY: 439.516, imageWidth: 126.859, counterX: 54.938, counterY: 490, copyX: 217.953 },
  ]) {
    test(`Safety sticky composition matches the reference at ${measured.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: measured.width, height: measured.height });
      await page.goto("/safety", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => scrollTo({ top: 3400, behavior: "instant" }));
      await page.waitForTimeout(2200);
      const image = (await page.locator(".story-visual-inner").boundingBox())!;
      const counter = (await page.locator(".story-number").boundingBox())!;
      const copy = (await page.locator(".story-copy h3").first().boundingBox())!;
      expect(Math.abs(image.x - measured.imageX)).toBeLessThan(.2);
      expect(Math.abs(image.y - measured.imageY)).toBeLessThan(.8);
      expect(Math.abs(image.width - measured.imageWidth)).toBeLessThan(.2);
      expect(Math.abs(counter.x - measured.counterX)).toBeLessThan(.2);
      expect(Math.abs(counter.y - measured.counterY)).toBeLessThan(.2);
      expect(Math.abs(copy.x - measured.copyX)).toBeLessThan(.2);
    });
  }

  test("Home mobile selects the reference portrait hero media", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const video = page.locator(".home-hero video");
    await expect.poll(() => video.evaluate(e => (e as HTMLVideoElement).currentSrc)).toContain("Hero_27Sec_responsive.mp4");
    await expect.poll(() => video.evaluate(e => (e as HTMLVideoElement).videoWidth), { timeout: 10_000 }).toBe(1080);
    expect(await video.evaluate(e => (e as HTMLVideoElement).videoHeight)).toBe(1920);
  });

});
