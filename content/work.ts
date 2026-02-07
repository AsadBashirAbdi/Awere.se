export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  status: string;
  stack: string;
  year?: string;
  scope?: string;
  overview?: string;
  whatWeBuilt?: string[];
  systemsNotes?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "saas-control-plane",
    slug: "saas-control-plane",
    title: "SaaS Control Plane",
    type: "SaaS",
    summary:
      "Multi-tenant control panel for a B2B SaaS with strict uptime and observability requirements.",
    tags: ["System Architecture", "App Shell", "RBAC"],
    status: "In production",
    stack: "Next.js, TypeScript, Tailwind",
    year: "2024",
    scope: "6-month engagement: architecture, design system, and implementation",
    overview:
      "Built a production-grade control plane for a B2B SaaS serving 200+ enterprise customers. The system needed to handle multi-tenancy, role-based access control, real-time observability, and strict uptime requirements.",
    whatWeBuilt: [
      "App shell architecture with persistent navigation and layout system",
      "RBAC framework with granular permissions and audit logging",
      "Real-time dashboard with WebSocket-based updates",
      "Design system built on Tailwind with token-based theming",
      "Comprehensive error boundaries and fallback UI",
    ],
    systemsNotes:
      "Focused on deterministic state management, clear component boundaries, and graceful degradation. All user-facing errors map to actionable messages.",
  },
  {
    id: "commerce-studio",
    slug: "commerce-studio",
    title: "Commerce Studio",
    type: "Commerce",
    summary:
      "Headless storefront shell focused on speed, inventory clarity, and conversion-friendly flows.",
    tags: ["Headless", "Performance", "Design System"],
    status: "In production",
    stack: "Next.js, Edge Runtime",
    year: "2024",
    scope: "3-month sprint: storefront architecture and design system",
    overview:
      "Implemented a headless commerce storefront optimized for speed and conversion. The system integrates with Shopify via GraphQL and runs on Edge Runtime for sub-100ms response times globally.",
    whatWeBuilt: [
      "Headless storefront with SSR/ISR hybrid rendering strategy",
      "Cart and checkout flows with optimistic UI patterns",
      "Product filtering and search with instant feedback",
      "Image optimization pipeline (WebP, blur placeholders, lazy loading)",
      "Edge-deployed API routes for real-time inventory checks",
    ],
    systemsNotes:
      "Sub-1s LCP achieved via aggressive preloading, route prefetching, and edge caching. No client-side framework overhead—pure React SSR.",
  },
  {
    id: "internal-ops",
    slug: "internal-ops-console",
    title: "Internal Ops Console",
    type: "Internal Tools",
    summary:
      "Ops console that replaces spreadsheets with a structured UI and clear system boundaries.",
    tags: ["Internal Tools", "Data Model", "Access Control"],
    status: "In discovery",
    stack: "Next.js, API Layer",
    year: "2024",
    scope: "4-week discovery: data model design and prototype",
    overview:
      "Designed an internal operations console to replace fragmented spreadsheets and manual processes. The system provides structured data entry, validation, and audit trails for operational workflows.",
    whatWeBuilt: [
      "Data model design with clear entity relationships",
      "Form-heavy UI with inline validation and error recovery",
      "Access control framework with department-level permissions",
      "Audit log system with immutable history tracking",
      "Export pipelines to maintain compatibility with legacy systems",
    ],
    systemsNotes:
      "Prioritized clarity over cleverness: every field has help text, every error has a fix suggestion, every action has a confirmation step.",
  },
];

