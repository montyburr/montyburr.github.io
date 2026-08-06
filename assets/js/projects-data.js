// Edit this list to add, remove, or update project cards.
// media.type: "image" -> renders an <img>. "video" -> renders a <video> (add media.poster too).
// links.github / links.demo: set to null to hide that button. `writeup` shows a
// "Read write-up" link instead, for non-code entries.
// Projects deliberately carry no tech tags — the stack is listed once, in the
// Skillset section (assets/js/skills-data.js), rather than repeated per card.
// `details` (array of paragraph strings) powers each project's own page at
// project.html?id=<id> — linked automatically from its card.
// `gallery` (optional, array of { src, alt, title }) drives the titled image
// carousel on the project's own page. Falls back to a single-slide gallery
// built from `media` when omitted. Use the placeholder SVG for slots that
// don't have a real screenshot yet.

const PROJECTS = [
  {
    id: "project-kickoff",
    title: "AI Project Kickoff Assistant",
    blurb:
      "A tool that takes a project idea in plain language, raises a Jira " +
      "ticket for it, writes specifications from that ticket, and then builds " +
      "a prototype of the idea.",
    media: {
      type: "image",
      src: "assets/img/placeholder/project-placeholder.svg",
      alt: "Screenshot placeholder — AI Project Kickoff Assistant",
    },
    gallery: [
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — AI Project Kickoff Assistant", title: "Preview 1" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — AI Project Kickoff Assistant", title: "Preview 2" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — AI Project Kickoff Assistant", title: "Preview 3" },
    ],
    links: { github: null, demo: null },
    details: [
      "A tool that takes a project idea entered in plain language and carries it through the opening stages of delivery in one pass: it raises a Jira ticket for the idea, writes a set of specifications from that ticket, and then produces a prototype based on those specs.",
      "Built with a Next.js and React front end for entering and reviewing ideas, with Python behind it and AWS Bedrock providing the model that drafts the specifications and the prototype.",
      "The result is that an idea doesn't sit in a backlog as a single line of text — it arrives already written up as a ticket, with specs attached and something runnable to react to.",
    ],
  },
  {
    id: "ticket-triage",
    title: "IT Support Ticket Triage Dashboard",
    blurb:
      "A dashboard for IT support teams that ingests incoming tickets and " +
      "suggests priority and routing using AI. Built to cut manual triage " +
      "time and reduce misrouted tickets.",
    media: {
      type: "image",
      src: "assets/img/screenshots/ticket-triage.png",
      alt: "IT Support Ticket Triage Dashboard — ticket list with AI Copilot panel showing category, priority, and suggested action",
    },
    gallery: [
      { src: "assets/img/screenshots/ticket-triage.png", alt: "IT Support Ticket Triage Dashboard — ticket list with AI Copilot panel showing category, priority, and suggested action", title: "Overview" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — IT Support Ticket Triage Dashboard", title: "Preview 2" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — IT Support Ticket Triage Dashboard", title: "Preview 3" },
    ],
    links: { github: "#", demo: null },
    details: [
      "This dashboard helps IT support teams cut through a backlog of incoming tickets by automatically suggesting a category, priority, and first action for each one, using an AI Copilot panel alongside the ticket view.",
      "Built with a React front end and a FastAPI back end, it lets an agent open a ticket, see the suggested triage in one place, and accept or reject the AI's recommendation before it's applied — keeping a human in the loop rather than fully automating routing decisions.",
      "The goal was to reduce the time agents spend manually reading and classifying each ticket, and to cut down on tickets that get routed to the wrong team.",
    ],
  },
  {
    id: "inequality-platform",
    title: "Income Inequality Insight Platform",
    blurb:
      "A team project presenting global income inequality data through an " +
      "interactive world map, backed by a Flask API and SQL database.",
    media: {
      type: "image",
      src: "assets/img/placeholder/project-placeholder.svg",
      alt: "Screenshot placeholder — Income Inequality Insight Platform",
    },
    gallery: [
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — Income Inequality Insight Platform", title: "Preview 1" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — Income Inequality Insight Platform", title: "Preview 2" },
      { src: "assets/img/placeholder/project-placeholder.svg", alt: "Screenshot placeholder — Income Inequality Insight Platform", title: "Preview 3" },
    ],
    links: { github: "#", demo: null },
    details: [
      "A team project exploring global income inequality through an interactive world map, letting users click into a country and see how its inequality metrics compare over time.",
      "The front end renders the map and visualisations, backed by a Flask API and a SQL database storing the underlying inequality datasets.",
      "Built collaboratively as part of a university group project, splitting work across data handling, the API, and the map interface.",
    ],
  },
];
