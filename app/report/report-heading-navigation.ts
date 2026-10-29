import data from "./report-blocks.json";
import type { ReportPageId } from "./report-navigation";

type HeadingSource = string | [code: string, line?: number];

const sources: Partial<Record<ReportPageId, HeadingSource[]>> = {
  "summary": [
    "1.1 Acknowledgment",
    ["2.4"],
    "1.3 Overview of Design",
    ["2.8"],
    ["2.8", 0],
    ["2.8", 3],
    ["2.8", 6],
    ["2.8", 11],
    ["2.9"],
    ["2.10"],
    "1.6 Group Declaration",
    ["3.1"]
  ],
  "project-details": [
    ["5.1"],
    ["5.6"],
    ["5.2"],
    ["5.3"]
  ],
  "background": [
    "3.1 Background",
    ["6.1"],
    ["6.2"],
    ["6.3"],
    ["6.4"],
    ["6.5"],
    ["6.6"],
    ["6.7"],
    "3.2 Problem Description",
    ["7.1"],
    "3.3 Design Criteria"
  ],
  "options": [
    "4.1 Design Options",
    ["9.2"],
    ["9.3"],
    ["9.4"],
    "4.2 Design Selection",
    ["10.2"],
    ["10.7"],
    ["10.8"],
    ["10.9"],
    ["10.4", 0]
  ],
  "design": [
    ["11.3"],
    ["11.4"],
    ["11.5"],
    ["11.9", 0],
    ["11.9", 1],
    ["11.9", 2],
    ["11.9", 3],
    ["11.9", 4],
    ["11.9", 5],
    ["11.10"]
  ],
  "prototyping": [
    ["12.1"],
    ["12.2"],
    ["12.3"],
    ["12.5"],
    ["12.6"],
    ["12.7"],
    ["12.8"],
    ["12.4"]
  ],
  "implementation": [
    ["13.1"],
    ["13.2"],
    ["13.3"],
    ["13.4"],
    ["13.5"],
    ["13.6"]
  ],
  "cost": [
    "8.1 Cost Analysis",
    ["14.2"],
    ["14.6"],
    ["14.4"],
    ["14.7"],
    ["14.8"],
    ["14.3"],
    ["14.9"],
    ["14.5"],
    ["14.10"]
  ],
  "other-considerations": [
    "9.1 User Journey Map"
  ],
  "recommendations": [
    ["16.3"],
    ["16.4"],
    ["16.5"],
    ["16.6"],
    ["16.7"],
    ["16.8"]
  ],
  "supporting-documents": [
    ["21.1"],
    ["21.1", 0],
    ["21.2"],
    ["21.3"],
    ["21.4"],
    ["21.5"],
    ["20.1"],
    ["20.3"],
    ["20.4"],
    ["20.5"],
    ["20.6"]
  ],
  "references": [
    "12.1 References"
  ]
};

export function headingAnchor(number: string) {
  return `report-heading-${number.replace(".", "-")}`;
}

export function headingLabel(text: string) {
  const characters = Array.from(text);
  return characters.length > 30 ? `${characters.slice(0, 29).join("")}…` : text;
}

export function pageHeadings(page: ReportPageId) {
  const blocks = data.blocks as Record<string, { title: string; lines: string[] }>;
  return (sources[page] ?? []).map(source => {
    const block = typeof source === "string" ? undefined : blocks[source[0]];
    const title = typeof source === "string" ? source : source[1] === undefined ? block!.title : block!.lines[source[1]];
    const number = title.match(/^(\d+\.\d+)\s/)![1];
    return { number, title, label: headingLabel(title), anchor: headingAnchor(number), subheading: number.split(".")[1].length > 1 };
  });
}
