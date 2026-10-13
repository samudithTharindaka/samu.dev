export const contact = {
  heading: "Let's Connect",
  subheading: "Open to collaborations, freelance work, and interesting projects.",
  email: "samudiththarindaka@gmail.com",
  phone: "070 374 1107",
  location: "Malabe, Colombo",
  socials: [
    { id: "github", label: "GitHub", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "x", label: "X / Twitter", href: "#" },
    {
      id: "email",
      label: "Email",
      href: "mailto:samudiththarindaka@gmail.com",
    },
  ],
  form: {
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell me about your project…",
    submitLabel: "Send Message",
    note: "Form is a visual placeholder — wire it up when ready.",
  },
} as const;
