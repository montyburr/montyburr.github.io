// The Skillset section.
//
// This list is authoritative — edit it directly to add or remove an entry.
//
// `tab` puts a group behind either the Skills or the Tools toggle. Within a
// tab, groups render one per row sorted widest first, so the sizes below are
// what produce the tapering shape — see renderSkillset in main.js.
//
// `technical: false` keeps a group out of the hero's rotating tagline, which
// types one line per technical group.

const SKILL_CATEGORIES = [
  /* --- Skills ----------------------------------------------------------- */
  {
    tab: "skills",
    name: "Security",
    skills: [
      "Cybersecurity",
      "Cyber Defense",
      "SIEM",
      "Security Awareness",
      "Threat Intelligence",
      "Secure System Design",
      "Network Security",
    ],
  },
  {
    // HTML and CSS sit here rather than under Languages: neither is a
    // programming language.
    tab: "skills",
    name: "Frontend",
    skills: ["React", "Next.js", "Tkinter", "HTML", "CSS"],
  },
  {
    tab: "skills",
    name: "Data",
    skills: [
      "SQLite",
      "MongoDB",
      "Matplotlib",
      "Data Analysis",
      "Data Structures",
    ],
  },
  {
    tab: "skills",
    name: "AI & LLMs",
    skills: [
      "AI",
      "AWS Bedrock",
      "LLM Integration",
      "Prompt Engineering",
      "AI-Assisted Development",
    ],
  },
  {
    tab: "skills",
    name: "Professional",
    technical: false,
    skills: [
      "Teamwork",
      "Leadership",
      "Communication",
      "Time Management",
      "Customer Service",
    ],
  },
  {
    tab: "skills",
    name: "Languages",
    skills: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    tab: "skills",
    name: "Backend & APIs",
    skills: ["FastAPI", "Flask"],
  },

  /* --- Tools ------------------------------------------------------------ */
  {
    // No `name`, so this group renders without a heading — the Tools tab is a
    // single flat set. Add a name here to bring a heading back, and split into
    // several entries if it ever needs grouping again.
    tab: "tools",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "VS Code",
      "PyCharm",
      "IntelliJ IDEA",
      "Cursor",
    ],
  },
];
