import assert from "node:assert/strict";
import test from "node:test";
import { scrollToReportHeading } from "./heading-scroll.ts";

test("heading jumps stay inside the report window and clear its header", () => {
  const calls = [];
  let top = 300;
  let visible = true;
  const target = {
    getClientRects: () => visible ? [{}] : [],
    getBoundingClientRect: () => ({ top }),
    closest: () => null,
    scrollIntoView: () => assert.fail("must not scroll ancestor embed frames"),
  };
  const previous = { window: globalThis.window, document: globalThis.document };
  globalThis.window = { innerWidth: 1200, scrollY: 200, scrollTo: options => calls.push(options) };
  globalThis.document = {
    querySelectorAll: () => [target],
    querySelector: () => ({ getBoundingClientRect: () => ({ bottom: 48 }) }),
  };
  try {
    scrollToReportHeading("6.1");
    assert.deepEqual(calls.pop(), { top: 432, behavior: "instant" });
    top = -500;
    scrollToReportHeading("6.1");
    assert.deepEqual(calls.pop(), { top: 0, behavior: "instant" });
    visible = false;
    scrollToReportHeading("6.1");
    assert.equal(calls.length, 0);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});
