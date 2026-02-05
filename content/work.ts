export type WorkItem = {
  id: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  status: string;
  stack: string;
};

export const workItems: WorkItem[] = [
  {
    id: "saas-control-plane",
    title: "SaaS Control Plane",
    type: "SaaS",
    summary:
      "Multi-tenant control panel for a B2B SaaS with strict uptime and observability requirements.",
    tags: ["System Architecture", "App Shell", "RBAC"],
    status: "In production",
    stack: "Next.js, TypeScript, Tailwind",
  },
  {
    id: "commerce-studio",
    title: "Commerce Studio",
    type: "Commerce",
    summary:
      "Headless storefront shell focused on speed, inventory clarity, and conversion-friendly flows.",
    tags: ["Headless", "Performance", "Design System"],
    status: "In production",
    stack: "Next.js, Edge Runtime",
  },
  {
    id: "internal-ops",
    title: "Internal Ops Console",
    type: "Internal Tools",
    summary:
      "Ops console that replaces spreadsheets with a structured UI and clear system boundaries.",
    tags: ["Internal Tools", "Data Model", "Access Control"],
    status: "In discovery",
    stack: "Next.js, API Layer",
  },
];

