import data from "./report-blocks.json";
import type { Status } from "./ReportCodes";

type Entry = { title: string; status: Status; lines: string[]; section: number };
const all = data.blocks as unknown as Record<string, Entry>;

/** Blockquote lines of a block in REPORT_CONTENT.md, exactly as written. */
export const lines = (code: string) => all[code].lines;
export const text = (code: string) => all[code].lines.join("\n");
export const title = (code: string) => all[code].title;
export const status = (code: string) => all[code].status;

/** "Label: rest of the line" becomes ["Label:", "rest of the line"]. */
export function splitLabel(line: string): [string, string] {
  const i = line.indexOf(": ");
  return [line.slice(0, i + 1), line.slice(i + 2)];
}

/** A table block: caption line, pipe rows (separator row dropped) and any note lines after the table. */
export function parseTable(code: string) {
  const all = lines(code);
  const cells = (line: string) => line.split("|").slice(1, -1).map(cell => cell.trim());
  const rows = all.filter(line => line.startsWith("|") && !/^\|[-| ]+\|$/.test(line)).map(cells);
  return { caption: all[0], head: rows[0], rows: rows.slice(1), notes: all.slice(1).filter(line => !line.startsWith("|")) };
}
