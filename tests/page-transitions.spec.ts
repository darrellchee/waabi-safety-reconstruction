import { expect, test, type Page } from "@playwright/test";

/** Observe the browser's actual snapshot animations, rather than a click timer. */
async function instrumentTransitions(page: Page) {
  await page.addInitScript(() => {
    const probe = { marker: crypto.randomUUID(), calls: 0, ready: 0, finished: 0, samples: [] as {
      incomingName: string;
      outgoingName: string;
      incomingDuration: string;
      incomingEasing: string;
      headerName: string;
      animations: { name: string; frames: Record<string, unknown>[] }[];
    }[] };
    Object.assign(window, { __routeTransitionProbe: probe });
    const start = document.startViewTransition?.bind(document);
    if (!start) return;
    document.startViewTransition = (...args) => {
      probe.calls++;
      const transition = start(...args);
      transition.ready.then(() => {
        const incoming = getComputedStyle(document.documentElement, "::view-transition-new(root)");
        const outgoing = getComputedStyle(document.documentElement, "::view-transition-old(root)");
        probe.samples.push({
          incomingName: incoming.animationName,
          outgoingName: outgoing.animationName,
          incomingDuration: incoming.animationDuration,
          incomingEasing: incoming.animationTimingFunction,
          headerName: getComputedStyle(document.querySelector(".site-header")!).viewTransitionName,
          animations: document.getAnimations()
            .filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation && /^css-page-(in|out)$/.test(animation.animationName))
            .map(animation => ({ name: animation.animationName, frames: animation.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [] })),
        });
        probe.ready++;
      }).catch(() => { /* A superseded transition may be skipped by the browser. */ });
      transition.finished.then(() => probe.finished++);
      return transition;
    };
  });
}

async function probe(page: Page) {
  return page.evaluate(() => (window as unknown as { __routeTransitionProbe: {
    marker: string; calls: number; ready: number; finished: number;
    samples: { incomingName: string; outgoingName: string; incomingDuration: string; incomingEasing: string; headerName: string; animations: { name: string; frames: Record<string, unknown>[] }[] }[];
  } }).__routeTransitionProbe);
}

async function menuNavigate(page: Page, name: string) {
  await page.getByRole("button", { name: "Menu", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("navigation", { name: "Global navigation" })
    .getByRole("link", { name, exact: true }).click();
}

for (const width of [1440, 390]) {
  test(`native route transition at ${width}px preserves the document and matches REA keyframes`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await instrumentTransitions(page);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    const marker = (await probe(page)).marker;
    expect((await probe(page)).calls).toBe(0);
    await menuNavigate(page, "Careers");
    await expect(page).toHaveURL(/\/careers$/);
    await expect.poll(async () => (await probe(page)).ready).toBe(1);
    const sample = (await probe(page)).samples[0];
    expect(sample.incomingName).toBe("css-page-in");
    expect(sample.outgoingName).toBe("css-page-out");
    expect(sample.incomingDuration).toBe("0.8s");
    // Chromium canonicalizes this exact cubic Bezier to its `ease` keyword.
    expect(["ease", "cubic-bezier(0.25, 0.1, 0.25, 1)"]).toContain(sample.incomingEasing);
    expect(sample.headerName).toBe("header");
    const incoming = sample.animations.find(animation => animation.name === "css-page-in");
    const outgoing = sample.animations.find(animation => animation.name === "css-page-out");
    expect(incoming?.frames[0].clipPath).toBe("inset(50% round 12px)");
    expect(incoming?.frames.at(-1)?.clipPath).toMatch(/^inset\(0(?:%|px)?\)$/);
    expect(incoming?.frames[0].transform).toMatch(/1\.1/);
    expect(outgoing?.frames[0].opacity).toBe("1");
    expect(outgoing?.frames.at(-1)?.opacity).toBe("0.5");
    expect(outgoing?.frames.at(-1)?.scale).toBe("1.1");
    await expect.poll(async () => (await probe(page)).finished).toBe(1);
    expect((await probe(page)).marker).toBe(marker);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find your place in Physical AI.");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await menuNavigate(page, "Safety");
    await expect(page).toHaveURL(/\/safety$/);
    await expect.poll(async () => (await probe(page)).finished).toBe(2);
    expect((await probe(page)).marker).toBe(marker);
    expect(errors).toEqual([]);
  });
}

test("browser back and forward retain native transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await instrumentTransitions(page);
  await page.goto("/company");
  const marker = (await probe(page)).marker;
  await menuNavigate(page, "Safety");
  await expect.poll(async () => (await probe(page)).finished).toBe(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/company$/);
  await expect.poll(async () => (await probe(page)).finished).toBe(2);
  await page.goForward();
  await expect(page).toHaveURL(/\/safety$/);
  await expect.poll(async () => (await probe(page)).finished).toBe(3);
  expect((await probe(page)).marker).toBe(marker);
});

test("reduced motion removes the page zoom and clipping animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await instrumentTransitions(page);
  await page.goto("/company");
  const marker = (await probe(page)).marker;
  await menuNavigate(page, "Careers");
  await expect(page).toHaveURL(/\/careers$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(async () => {
    const state = await probe(page);
    return state.finished === state.calls;
  }).toBe(true);
  const state = await probe(page);
  expect(state.marker).toBe(marker);
  // An implementation may bypass snapshots completely or disable their motion.
  for (const sample of state.samples) {
    expect(sample.incomingName).not.toBe("css-page-in");
    expect(sample.outgoingName).not.toBe("css-page-out");
  }
});

test("navigation falls back to client routing when View Transitions is unavailable", async ({ page }) => {
  await page.addInitScript(() => { delete (Document.prototype as Partial<Document>).startViewTransition; });
  await instrumentTransitions(page);
  await page.goto("/company");
  const marker = (await probe(page)).marker;
  await menuNavigate(page, "Careers");
  await expect(page).toHaveURL(/\/careers$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect((await probe(page)).marker).toBe(marker);
  expect((await probe(page)).calls).toBe(0);
});

test("content links and the footer share route transitions while same-page actions do not", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await instrumentTransitions(page);
  await page.goto("/company");
  const marker = (await probe(page)).marker;
  await page.locator('main a[href="/careers"]').click();
  await expect(page).toHaveURL(/\/careers$/);
  await expect.poll(async () => (await probe(page)).finished).toBe(1);
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(async () => (await probe(page)).finished).toBe(2);
  await menuNavigate(page, "Home");
  expect((await probe(page)).calls).toBe(2);
  await page.locator('a[href="#our-road"]').click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  expect((await probe(page)).calls).toBe(2);
  await page.locator('main a[href="/safety"]').click();
  await expect(page).toHaveURL(/\/safety$/);
  await expect.poll(async () => (await probe(page)).finished).toBe(3);
  expect((await probe(page)).marker).toBe(marker);
});

test("modified navigation opens another tab without snapshotting the current page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await instrumentTransitions(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).focus();
  await page.keyboard.press("Enter");
  const [opened] = await Promise.all([
    page.context().waitForEvent("page", { timeout: 8000 }),
    page.getByRole("navigation", { name: "Global navigation" })
      .getByRole("link", { name: "Careers", exact: true }).click({ modifiers: ["ControlOrMeta"] }),
  ]);
  await opened.waitForURL(/\/careers$/);
  await expect(page).toHaveURL(/\/$/);
  expect((await probe(page)).calls).toBe(0);
  await opened.close();
});
