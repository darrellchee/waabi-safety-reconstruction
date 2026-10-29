import { headingAnchor } from "./report-heading-navigation";

/** Keep existing heading IDs used by accessibility labels, while adding a stable menu target. */
export function ReportHeadingAnchor({ text, mobile = false }: { text: string; mobile?: boolean }) {
  const number = text.match(/^(\d+\.\d+)\s/)?.[1];
  if (!number) return null;
  return <span id={`${mobile ? "mobile-" : ""}${headingAnchor(number)}`} data-heading-number={number} aria-hidden="true" style={{ scrollMarginTop: "calc(var(--report-header-height, 64px) + 20px)" }} />;
}
