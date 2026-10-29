export const reportNavigation = [
  { label: "Summary", id: "summary", href: "/report" },
  { label: "Project details", id: "project-details", href: "/project-details" },
  { label: "Background", id: "background", href: "/background" },
  { label: "Design Solutions", id: "options", href: "/design-solutions" },
  { label: "Detailed Design", id: "design", href: "/detailed-design" },
  { label: "Prototype", id: "prototyping", href: "/prototype" },
  { label: "Implementation", id: "implementation", href: "/implementation" },
  { label: "Cost", id: "cost", href: "/cost" },
  { label: "Other Considerations", id: "other-considerations", href: "/other-considerations" },
  { label: "Recommendations", id: "recommendations", href: "/recommendations" },
  { label: "Appendix and Supporting Documentation", id: "supporting-documents", href: "/appendix-and-supporting-documentation" },
  { label: "References", id: "references", href: "/references" },
  { label: "AI Logs", id: "ai-logs", href: "/ai-logs" },
] as const;

export type ReportPageId = typeof reportNavigation[number]["id"];
