export const reportNavigation = [
  { label: "Summary", id: "summary", href: "/report" },
  { label: "Project details", id: "project-details", href: "/project-details" },
  { label: "Background", id: "background", href: "/background" },
  { label: "Design Solution Options", id: "options", href: "/design-solution-options" },
  { label: "Detailed Design", id: "design", href: "/detailed-design" },
  { label: "Prototype", id: "prototyping", href: "/prototype" },
  { label: "Implementation", id: "implementation", href: "/implementation" },
  { label: "Cost", id: "cost", href: "/cost" },
  { label: "References", id: "references", href: "/references" },
  { label: "Appendices", id: "appendices", href: "/appendices" },
] as const;

export type ReportPageId = typeof reportNavigation[number]["id"];
