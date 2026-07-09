# Agents for this repository

This repository includes lightweight agents and skills to help manage content, build, and maintenance tasks.

- **Explore**: Read-only agent for fast codebase exploration and Q&A. Use when you want a quick summary or to locate files.

- **ContentEditor**: Edits site content files (`index.html`, `assets/js/projects-data.js`, `assets/css/style.css`, images). Rules: keep site style, avoid large structural rewrites without confirmation, and update `projects-data.js` in the same PR when adding projects.

- **SiteBuilder**: Builds and previews the static site locally. Recommended commands: `python -m http.server 8000` (or `npx http-server`) from the repo root. Use for smoke tests and visual checks.

- **AgentCustomizer**: Maintains the `skills/` and agent definition files in the repo (this document, `.github/copilot-instructions.md`, and skill files). Use to update agent behaviors and permissions.

How to invoke:
- Use your agent framework's subagent/task-delegation mechanism, passing the agent name above and a clear prompt describing the desired task and constraints.

Notes:
- Agents should make small, focused changes and open PRs for review.
- If a change touches multiple areas (content + layout + scripts), ask for confirmation first.
