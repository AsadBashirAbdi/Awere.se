export type Service = {
  id: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "architecture",
    label: "Module 01 / System Architecture",
    title: "System Architecture",
    description:
      "We map your current stack, constraints, and desired outcomes into a lean, maintainable architecture.",
    deliverables: [
      "System diagram with key flows",
      "Risk and constraint analysis",
      "Technical recommendations",
    ],
  },
  {
    id: "product-design",
    label: "Module 02 / Product Design",
    title: "Product Design",
    description:
      "We define flows, states, and UI patterns that feel like a product — not a brochure.",
    deliverables: [
      "Core user flows and wireframes",
      "Component and layout inventory",
      "Interaction and motion notes",
    ],
  },
  {
    id: "implementation",
    label: "Module 03 / Web Implementation",
    title: "Web Implementation",
    description:
      "We implement the system in Next.js with a reusable component and content layer.",
    deliverables: [
      "Production-grade Next.js implementation",
      "Content layer wired for reuse",
      "Deployment-ready Vercel setup",
    ],
  },
];

