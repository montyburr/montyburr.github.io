// Edit this list to add, remove, or update project cards.
// media.type: "image" -> renders an <img>. "video" -> renders a <video> (add media.poster too).
// links.github / links.demo: set to null to hide that button. `writeup` shows a
// "Read write-up" link instead, for non-code entries.
// `details` (array of paragraph strings) powers each project's own page at
// project.html?id=<id> — linked automatically from its card.

// Tags that describe a project's context rather than a skill. Kept out of the
// Skills section and out of the hero's rotating tech line.
const NON_SKILL_TAGS = new Set(["Team Project", "Internship"]);

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
    details: [
      "This dashboard helps IT support teams cut through a backlog of incoming tickets by automatically suggesting a category, priority, and first action for each one, using an AI Copilot panel alongside the ticket view.",
      "Built with a React front end and a FastAPI back end, it lets an agent open a ticket, see the suggested triage in one place, and accept or reject the AI's recommendation before it's applied — keeping a human in the loop rather than fully automating routing decisions.",
      "The goal was to reduce the time agents spend manually reading and classifying each ticket, and to cut down on tickets that get routed to the wrong team.",
    ],
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
    details: [
      "A desktop budgeting app built to make it easy to see where money is going at a glance, without needing a spreadsheet or an online service.",
      "Built with Python and Tkinter for the interface, with Matplotlib powering bar, line, and pie chart views of income and spending over time.",
      "Focused on keeping the UI simple: log a transaction, and the charts update to reflect the new balance and category breakdown.",
    ],
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
    details: [
      "A team project exploring global income inequality through an interactive world map, letting users click into a country and see how its inequality metrics compare over time.",
      "The front end renders the map and visualisations, backed by a Flask API and a SQL database storing the underlying inequality datasets.",
      "Built collaboratively as part of a university group project, splitting work across data handling, the API, and the map interface.",
    ],
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
    details: [
      "During my cyber security internship at AJW Group, I researched SIEM (Security Information and Event Management) tooling and how it's used to detect and respond to security events across the business.",
      "I also helped run a company-wide phishing awareness campaign, designing test phishing emails and follow-up training material to help staff recognise real phishing attempts.",
      "This entry is presented as a write-up rather than a code project, since the work was research- and awareness-focused rather than software development.",
    ],
  },
];
