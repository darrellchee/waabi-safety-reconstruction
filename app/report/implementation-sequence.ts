export const CARD_START_INTERVAL = 1000;
export const ART_CYCLE_DURATION = 2000;

export function implementationSequence(elapsed: number, count: number, started = true) {
  if (count <= 0) return { startedCards: 0, activeCard: -1, complete: true, nextAt: null };
  if (!started) return { startedCards: 0, activeCard: -1, complete: false, nextAt: 0 };
  const time = Number.isNaN(elapsed) ? 0 : Math.max(0, elapsed);
  const startedCards = Math.min(count, Math.floor(time / CARD_START_INTERVAL) + 1);
  const completeAt = (count - 1) * CARD_START_INTERVAL + ART_CYCLE_DURATION;
  const complete = time >= completeAt;
  return {
    startedCards,
    activeCard: complete ? -1 : startedCards - 1,
    complete,
    nextAt: complete ? null : startedCards < count ? startedCards * CARD_START_INTERVAL : completeAt,
  };
}

export type IllustrationBounds = { left: number; top: number; width: number; height: number };

// Two-column galleries snake between rows; downward steps stay in the same
// column and connect around its outside edge, clear of the captions.
export function implementationConnector(from: IllustrationBounds, to: IllustrationBounds, side: "left" | "right" = "right") {
  const startY = from.top + from.height / 2;
  const endY = to.top + to.height / 2;
  if (Math.abs(from.top - to.top) < 1) {
    const direction = to.left > from.left ? 1 : -1;
    const startX = direction === 1 ? from.left + from.width - 6 : from.left + 6;
    const endX = direction === 1 ? to.left + 6 : to.left + to.width - 6;
    return `M${startX} ${startY} C${startX + direction * 12} ${startY} ${endX - direction * 12} ${endY} ${endX} ${endY}`;
  }
  const startX = side === "left" ? from.left + 6 : from.left + from.width - 6;
  const endX = side === "left" ? to.left + 6 : to.left + to.width - 6;
  const outside = side === "left" ? Math.min(from.left, to.left) - 12 : Math.max(from.left + from.width, to.left + to.width) + 12;
  return `M${startX} ${startY} Q${outside} ${startY} ${outside} ${startY + 14} L${outside} ${endY - 14} Q${outside} ${endY} ${endX} ${endY}`;
}
