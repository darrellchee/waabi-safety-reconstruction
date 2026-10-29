import assert from "node:assert/strict";
import test from "node:test";
import { implementationConnector, implementationSequence } from "./implementation-sequence.ts";

test("cards start one second apart and previously started cards keep running", () => {
  for (let step = 0; step < 6; step++) {
    const state = implementationSequence(step * 1000, 6);
    assert.equal(state.startedCards, step + 1);
    assert.equal(state.activeCard, step);
    assert.equal(state.complete, false);
    assert.equal(implementationSequence(step * 1000 + 999, 6).startedCards, step + 1);
  }
});

test("completion waits for the final card's full first cycle", () => {
  assert.deepEqual(implementationSequence(5000, 6), { startedCards: 6, activeCard: 5, complete: false, nextAt: 7000 });
  assert.equal(implementationSequence(6999, 6).complete, false);
  assert.deepEqual(implementationSequence(7000, 6), { startedCards: 6, activeCard: -1, complete: true, nextAt: null });
  assert.deepEqual(implementationSequence(12000, 6), implementationSequence(7000, 6));
});

test("idle galleries stay idle; reduced motion can use the completed state", () => {
  assert.deepEqual(implementationSequence(0, 6, false), { startedCards: 0, activeCard: -1, complete: false, nextAt: 0 });
  assert.deepEqual(implementationSequence(Infinity, 6), { startedCards: 6, activeCard: -1, complete: true, nextAt: null });
  assert.equal(implementationSequence(-1000, 6).activeCard, 0);
  assert.equal(implementationSequence(NaN, 6).activeCard, 0);
  assert.equal(implementationSequence(2000, 1).complete, true);
  assert.equal(implementationSequence(0, 0).complete, true);
});

test("every pending timer boundary lies in the future", () => {
  for (let elapsed = 0; elapsed < 7000; elapsed += 37) {
    assert.ok(implementationSequence(elapsed, 6).nextAt > elapsed);
  }
});

const first = { left: 0, top: 0, width: 300, height: 225 };

test("same-row arrows point into the next card", () => {
  const second = { ...first, left: 316 };
  assert.equal(implementationConnector(first, second), "M294 112.5 C306 112.5 310 112.5 322 112.5");
});

test("the middle row points from right to left", () => {
  const third = { ...first, left: 316, top: 318 };
  const fourth = { ...first, top: 318 };
  assert.equal(implementationConnector(third, fourth), "M322 430.5 C310 430.5 306 430.5 294 430.5");
});

test("step 2 connects to step 3 directly beneath it along the right side", () => {
  const second = { ...first, left: 316 };
  const third = { ...second, top: 318 };
  assert.equal(implementationConnector(second, third, "right"), "M610 112.5 Q628 112.5 628 126.5 L628 416.5 Q628 430.5 610 430.5");
});

test("step 4 connects to step 5 directly beneath it along the left side", () => {
  const fourth = { ...first, top: 318 };
  const fifth = { ...first, top: 636 };
  assert.equal(implementationConnector(fourth, fifth, "left"), "M6 430.5 Q-12 430.5 -12 444.5 L-12 734.5 Q-12 748.5 6 748.5");
});

test("single-column arrows avoid captions by using the outer edge", () => {
  const below = { ...first, top: 318 };
  assert.equal(implementationConnector(first, below), "M294 112.5 Q312 112.5 312 126.5 L312 416.5 Q312 430.5 294 430.5");
});
