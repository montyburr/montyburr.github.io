// Logo lookup for the Skillset marquee (index.html #skillset).
// The marquee's rows are built from every skill in SKILL_CATEGORIES
// (assets/js/skills-data.js) — this file only supplies how to draw a logo
// for the ones that have a real brand mark. Anything in neither map below
// (soft skills, security concepts, ...) renders as a text-only tile instead.

// Simple Icons CDN (cdn.simpleicons.org/<slug>/<hex>) — used wherever it has
// the mark.
const SKILL_LOGO_SLUGS = {
  React: "react",
  "Next.js": "nextdotjs",
  HTML: "html5",
  CSS: "css",
  SQLite: "sqlite",
  MongoDB: "mongodb",
  Python: "python",
  Java: "openjdk",
  JavaScript: "javascript",
  FastAPI: "fastapi",
  Flask: "flask",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  PyCharm: "pycharm",
  "IntelliJ IDEA": "intellijidea",
  Cursor: "cursor",
};

// Simple Icons has pulled several Microsoft-brand marks (VS Code included —
// same story as AWS, Slack). Path sourced from Devicon's `vscode-plain`
// variant (MIT licensed), which ships with no baked-in fill, so it inherits
// `color` like the rest of this site's inline icons instead of showing
// Microsoft's blue.
const SKILL_LOGO_INLINE_SVG = {
  "VS Code":
    '<svg viewBox="0 0 128 128" width="34" height="34" aria-hidden="true" focusable="false" fill="currentColor">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z"/>' +
    "</svg>",
};
