// Edit this list to add, remove, or update project cards.
// media.type: "image" -> renders an <img>. "video" -> renders a <video> (add media.poster too).
// links.github / links.demo: set to null to hide that button. `writeup` shows a
// "Read write-up" link instead, for non-code entries.

const PROJECTS = [
  {
    id: "ticket-triage",
    title: "IT Support Ticket Triage Dashboard",
    blurb:
      "A dashboard for IT support teams that ingests incoming tickets and " +
      "suggests priority and routing using AI. Built to cut manual triage " +
      "time and reduce misrouted tickets.",
    tags: ["React", "FastAPI", "AI"],
    media: {
      type: "image",
      src: "assets/img/screenshots/ticket-triage.png",
      alt: "IT Support Ticket Triage Dashboard — ticket list with AI Copilot panel showing category, priority, and suggested action",
    },
    links: { github: "#", demo: null },
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker",
    blurb:
      "A desktop app for tracking income and spending, with bar, line, and " +
      "pie chart views built on Matplotlib for at-a-glance budget insight.",
    tags: ["Python", "Tkinter", "Matplotlib"],
    media: {
      type: "image",
      src: "assets/img/placeholder/project-placeholder.svg",
      alt: "Screenshot placeholder — Personal Finance Tracker",
    },
    links: { github: "#", demo: null },
  },
  {
    id: "inequality-platform",
    title: "Income Inequality Insight Platform",
    blurb:
      "A team project presenting global income inequality data through an " +
      "interactive world map, backed by a Flask API and SQL database.",
    tags: ["Flask", "SQL", "Team Project"],
    media: {
      type: "image",
      src: "assets/img/placeholder/project-placeholder.svg",
      alt: "Screenshot placeholder — Income Inequality Insight Platform",
    },
    links: { github: "#", demo: null },
  },
  {
    id: "ajw-internship",
    title: "Cyber Security Internship — AJW Group",
    blurb:
      "Internship work covering SIEM research and a company-wide phishing " +
      "awareness campaign. Presented here as a write-up rather than code.",
    tags: ["SIEM", "Security Awareness", "Internship"],
    media: {
      type: "image",
      src: "assets/img/placeholder/project-placeholder.svg",
      alt: "Placeholder graphic — AJW Group cyber security internship",
    },
    links: { github: null, demo: null },
    writeup: "#",
  },
];
