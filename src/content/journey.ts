import roblox1 from "../assets/gallery/roblox-1.png";
import roblox2 from "../assets/gallery/roblox-2.png";
import beachCity from "../assets/gallery/beach-city.png";
import dinosaur from "../assets/gallery/dinosaur.png";
import shot202409 from "../assets/gallery/shot-2024-09.png";
import shot202410a from "../assets/gallery/shot-2024-10a.png";
import shot202410b from "../assets/gallery/shot-2024-10b.png";
import shot202507 from "../assets/gallery/shot-2025-07.png";
import shot202508 from "../assets/gallery/shot-2025-08.png";
import shot202510 from "../assets/gallery/shot-2025-10.png";
import shot202607 from "../assets/gallery/shot-2026-07.png";
import shot15 from "../assets/gallery/shot-15.png";
import shot16 from "../assets/gallery/shot-16.png";
import shot17 from "../assets/gallery/shot-17.png";
import shot18 from "../assets/gallery/shot-18.png";
import type { LogoKey } from "./logos";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  span?: "wide" | "tall" | "square";
};

export const gameGallery: GalleryItem[] = [
  { id: "g1", src: beachCity, alt: "Beach city skyline", span: "wide" },
  { id: "g2", src: shot202507, alt: "Interior bedroom scene", span: "square" },
  { id: "g3", src: shot202410a, alt: "Tropical beach house", span: "tall" },
  { id: "g4", src: shot202508, alt: "Neon concert stage", span: "square" },
  { id: "g5", src: shot202409, alt: "City skyline night", span: "square" },
  { id: "g6", src: shot202510, alt: "Suburban aerial view", span: "square" },
  { id: "g7", src: shot15, alt: "Colorful cartoon building", span: "square" },
  { id: "g8", src: roblox1, alt: "Futuristic lab scene", span: "wide" },
  { id: "g9", src: dinosaur, alt: "Dinosaur environment", span: "tall" },
  { id: "g10", src: shot202410b, alt: "Cyberpunk street", span: "wide" },
  { id: "g11", src: roblox2, alt: "Purple town square", span: "wide" },
  { id: "g12", src: shot202607, alt: "Game environment shot", span: "square" },
  { id: "g13", src: shot16, alt: "Environment detail", span: "square" },
  { id: "g14", src: shot17, alt: "Environment detail", span: "square" },
  { id: "g15", src: shot18, alt: "Environment detail", span: "square" },
];

export type JourneyMilestone = {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  company: string;
  logo?: LogoKey;
  /** Staircase column index — milestones with the same step share a vertical segment */
  step: number;
};

export type JourneyTrack = {
  id: "interactive" | "business";
  title: string;
  milestones: JourneyMilestone[];
};

export const journeys: Record<JourneyTrack["id"], JourneyTrack> = {
  interactive: {
    id: "interactive",
    title: "Interactive Dev Journey",
    milestones: [
      {
        id: "j1",
        year: "2020",
        title: "Junior Game Developer",
        company: "Sea Pony Studios",
        logo: "seapony",
        step: 0,
      },
      {
        id: "j2",
        year: "2023",
        title: "Game Developer",
        company: "Sea Pony Studios",
        step: 0,
      },
      {
        id: "j3",
        year: "2024",
        title: "Game Developer",
        subtitle: "(Contract - 6 Months)",
        company: "MBDC",
        logo: "mbdc",
        step: 1,
      },
      {
        id: "j4",
        year: "2024",
        title: "Game Developer",
        company: "Veryability",
        logo: "veryability",
        step: 2,
      },
      {
        id: "j5",
        year: "2026",
        title: "Associate Software Engineer",
        company: "TWIST Digital",
        logo: "twist",
        step: 3,
      },
    ],
  },
  business: {
    id: "business",
    title: "Business System Journey",
    milestones: [
      {
        id: "b1",
        year: "2022",
        title: "Business Systems Contributor",
        company: "IFS",
        logo: "ifs",
        step: 0,
      },
      {
        id: "b2",
        year: "2024",
        title: "ERP Implementation Support",
        company: "Odoo",
        logo: "odoo",
        step: 1,
      },
      {
        id: "b3",
        year: "2025",
        title: "Fullstack Business Applications",
        company: "Independent",
        step: 2,
      },
      {
        id: "b4",
        year: "2026",
        title: "Associate Software Engineer",
        company: "TWIST Digital",
        logo: "twist",
        step: 3,
      },
    ],
  },
};

export function getJourney(type: string): JourneyTrack | undefined {
  if (type === "interactive" || type === "business") {
    return journeys[type];
  }
  return undefined;
}

export function groupMilestonesByStep(
  milestones: JourneyMilestone[],
): JourneyMilestone[][] {
  const groups: JourneyMilestone[][] = [];
  for (const milestone of milestones) {
    const bucket = groups[milestone.step] ?? (groups[milestone.step] = []);
    bucket.push(milestone);
  }
  return groups.filter(Boolean);
}
