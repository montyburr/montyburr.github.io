Skill: ContentEditor

Purpose:
- Guide agents that edit the site's content (pages, project data, and imagery).

Scope:
- Allowed files: `index.html`, `project.html`, `README.md`, `assets/js/projects-data.js`, `assets/css/style.css`, files in `assets/img/`.
- `project.html` + `assets/js/project-detail.js` form one template driven by `projects-data.js` — each project's own page (`project.html?id=<id>`) and the Skills section come from that same data, so adding/editing a project's `tags` and `details` there updates both automatically. No new HTML files needed per project.
- Avoid changes to build tooling or CI.

Guidelines:
- Preserve existing HTML/CSS structure and site voice.
- For content additions (projects, blog posts), update `assets/js/projects-data.js` and include a short changelog entry in `README.md`.
- Keep PRs small and focused; include screenshots when visual changes are made.

Constraints:
- Do not alter external links without verifying they work.
- Ask the repo owner for approval before major design or layout changes.

Usage:
- Provide the exact files to change and sample content.
- Include tests or preview instructions when applicable.
