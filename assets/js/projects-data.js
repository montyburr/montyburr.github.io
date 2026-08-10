// Edit this list to add, remove, or update project cards.
// media.type: "image" -> renders an <img>. "video" -> renders a <video> (add media.poster too).
// No GitHub/live-demo links — code isn't public and there's nothing to demo
// live yet. `writeup` still shows a "Read write-up" link instead, for
// non-code entries.
// `details` (array of paragraph strings) and `features` (array of bullet
// strings, optional) power each project's own page at project.html?id=<id>
// — linked automatically from its card.
// `tools` (optional, array of strings) renders as a tag row on the project's
// own page. Names should match an entry in SKILL_CATEGORIES
// (assets/js/skills-data.js) so the tag stays consistent with the Skillset
// marquee — a name with no match there just renders as plain text.
// `pipeline` (optional, array of stage-label strings, project-kickoff only
// so far) renders as an animated step diagram on the project's own page.
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
    tools: ["React", "Next.js", "Python", "AWS Bedrock", "AI", "LLM Integration", "Prompt Engineering", "AI-Assisted Development"],
    pipeline: [
      "Idea",
      "Jira Ticket",
      "Approval",
      "Functional Spec",
      "Technical Spec",
      "Approval",
      "Dev Tasks",
      "Prototype",
    ],
    details: [
      "An end-to-end automation pipeline that takes a project idea from initial concept through to a working prototype, using AI at every stage of the software development lifecycle.",
      "Users submit a project idea through a simple form, which the system uses to automatically generate a structured Jira ticket for review by the Project Approval Board (PAB). A role-based authentication system distinguishes between standard users and admins: admins can view every submitted project across the pipeline and are responsible for granting stage-gate approvals before work progresses.",
      "Once a project idea is approved, the AI moves to the next stage of the pipeline, generating a functional specification and technical specification automatically formatted against the company's internal templates. Each pipeline stage runs its own custom-tuned AI prompt, so the model's output style, structure, and level of technical detail adapts depending on whether it's drafting a spec, generating tickets, or writing code — rather than relying on one generic prompt for every task.",
      "After the specifications are reviewed and approved, the system automatically breaks the tech spec down into individual development tasks and begins building a version 1 prototype. As it works, the AI ticks off each dev task in real time, giving admins full visibility into build progress. The pipeline concludes with a functional working prototype of the original idea, generated with minimal manual intervention beyond the approval gates.",
    ],
    features: [
      "Idea-to-Jira-ticket generation for PAB review",
      "Role-based login system (user / admin) with admin-level visibility across all projects",
      "Multi-stage approval workflow with gated progression",
      "Automated functional and technical spec generation against company templates",
      "Stage-specific custom AI prompting for tailored outputs at each pipeline step",
      "Automatic dev task creation and self-tracked completion",
      "Fully automated version 1 prototype generation",
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
    tools: ["React", "FastAPI", "Python", "AI", "LLM Integration", "Prompt Engineering"],
    details: [
      "A centralised platform for managing and analysing IT service desk tickets, combining ticket visibility with AI-assisted triage and response generation.",
      "The platform includes role-based authentication, with admin accounts able to view all tickets across the service desk and standard users restricted to tickets assigned to them. Each user gets an analytics view over their own ticket history, surfacing trends and workload data alongside the raw ticket list.",
      "At the core of the platform is an AI analysis feature: users can select a specific ticket and have it analysed to generate suggested treatment or response options, which can be sent directly to the requester from within the platform. If a generated response isn't quite right, users can leave feedback and regenerate it, refining the output iteratively rather than starting from scratch.",
      "Rather than using a single generic AI model for every ticket type, the platform supports specialised agents, each with its own purpose-built prompt. A security agent, for example, is tuned specifically to handle security-related tickets and can raise targeted alerts based on ticket content. Users aren't limited to the built-in agents either — they can create and configure their own custom agents for ticket types specific to their workflow.",
    ],
    features: [
      "Role-based login (admin sees all tickets, users see their own)",
      "Personal analytics dashboard over ticket history",
      "AI-powered ticket analysis with suggested response generation",
      "One-click sending of AI-generated responses to requesters",
      "Feedback-driven response regeneration",
      "Specialised AI agents (e.g. a security-focused agent for security tickets) with dedicated prompts",
      "User-created custom agents for tailored ticket handling",
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
    tools: ["Flask", "SQL", "Python", "API Integration", "JavaScript", "HTML", "CSS", "Teamwork", "Communication"],
    details: [
      "An interactive learning platform that turns global inequality data into an engaging, exploration-driven experience, built as a team software engineering project.",
      "After logging in, users land on a fully interactive world map with zoom and click functionality. Countries are shaded and coloured according to inequality data, with multiple selectable metric keys letting users switch between different datasets and view the map through different lenses.",
      "The platform's standout feature is the link between exploration and assessment: as users click through countries and read the data presented, their click history is recorded. When they move on to the quiz section, questions are dynamically generated based on the specific countries the user has actually researched, rather than being pulled from a static question bank. This ties the learning experience directly to what each user has explored, reinforcing retention of the data they engaged with.",
      "The quiz provides feedback and results on completion, and both quiz results and high scores are stored per user, allowing them to track their progress and improvement over repeated use of the platform.",
    ],
    features: [
      "Login-protected platform with a fully interactive, zoomable world map",
      "Multiple inequality metric keys for switching between datasets",
      "Colour/shading-based data visualisation across countries",
      "Click-history tracking linking map exploration to quiz content",
      "Dynamically generated quiz questions based on researched countries",
      "Stored results and high scores for ongoing progress tracking",
      "Built collaboratively as part of a team software engineering project (Flask backend, SQL database)",
    ],
  },
];
