export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "01 / Audit",
    title: "Audit",
    description:
      "We map your current systems, constraints, and objectives into a lightweight architecture brief.",
  },
  {
    id: "02 / Design",
    title: "Design",
    description:
      "We define flows, UI states, and content structures that align product, engineering, and operations.",
  },
  {
    id: "03 / Build",
    title: "Build",
    description:
      "We implement the system in Next.js with a reusable component library and deployment path.",
  },
];

