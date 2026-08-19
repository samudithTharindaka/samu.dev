import climateImpact from "../assets/projects/climate-impact.png";

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  /** Placeholder — replace later */
  githubUrl: string;
  liveUrl: string;
};

export const webProjects: Project[] = [
  {
    slug: "climate-impact",
    title: "AI Assisted Environment Climate Impact Assessment Application",
    tags: ["AI Agentic Development", "Fullstack", "VPS Hosting"],
    description:
      "A Climate-Risk Intelligence Platform That Helps Businesses Understand, Measure, And Report The Financial Impact Of Climate Change. I Worked On Building The Digital Experience Behind A Platform That Connects Climate Data, Financial Analysis, And IFRS S2 Reporting.",
    image: climateImpact,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    slug: "portfolio-systems",
    title: "Internal Business Systems Dashboard",
    tags: ["Fullstack", "ERP Integration", "UI Engineering"],
    description:
      "A Modular Operations Dashboard Connecting Finance, Inventory, And Reporting Workflows. Built To Help Teams Move Faster With Clearer Visibility Across Business Processes.",
    image: climateImpact,
    githubUrl: "#",
    liveUrl: "#",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return webProjects.find((project) => project.slug === slug);
}
