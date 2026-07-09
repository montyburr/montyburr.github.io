Skill: ContentEditor

Purpose:
- Guide agents that edit the site's content (pages, project data, and imagery).

Scope:
- Allowed files: `index.html`, `README.md`, `assets/js/projects-data.js`, `assets/css/style.css`, files in `assets/img/`.
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
