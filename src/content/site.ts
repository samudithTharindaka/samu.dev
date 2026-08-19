export const site = {
  name: "Samudith Tharindaka",
  greeting: "Hello! I Am",
  title: "Samu.dev",
  tagline: "I build across games, interactive worlds, and business systems.",
} as const;

export const navItems = [
  { id: "contact", label: "Contacts", sceneIndex: 3 },
  { id: "experience", label: "Experience", sceneIndex: 1 },
  { id: "works", label: "Works", sceneIndex: 2 },
  { id: "about", label: "About Me", sceneIndex: 1 },
] as const;

export const aboutLines = [
  { text: "I Started With Games.", active: true },
  { text: "Then Came Interactive Worlds.", active: false },
  { text: "Then Came Business Systems.", active: false },
  { text: "Today, I Build Across All Three.", active: false },
] as const;

export const journeyCtas = [
  {
    id: "interactive",
    label: "Interactive Dev Journey",
    to: "/journey/interactive",
  },
  {
    id: "business",
    label: "Business System Journey",
    to: "/journey/business",
  },
] as const;

export const aboutTimeline = [
  {
    id: "2020",
    year: "2020",
    logos: ["roblox", "unity"] as const,
  },
  {
    id: "2022",
    year: "2022-Now",
    logos: ["ifs"] as const,
  },
  {
    id: "2024",
    year: "2024-Now",
    logos: ["epic", "odoo"] as const,
  },
] as const;

export const worksHub = {
  web: {
    title: "Web And Applications Done",
    visitLabel: "Visit",
    to: "/works/web",
  },
  games: {
    title: "Some Game Related\nWorks I Did",
    visitLabel: "Visit",
    to: "/works/games",
  },
} as const;

export const scenes = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
] as const;
