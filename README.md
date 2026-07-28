# montyburr.github.io

Personal portfolio site for Monty Burr — static HTML/CSS/JS, no build step,
deployed directly from `main` via GitHub Pages.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. See [skills/BUILD_PREVIEW.SKILL.md](skills/BUILD_PREVIEW.SKILL.md)
for the full smoke-test checklist.

## Structure

- `index.html` — landing page: hero, about, skills, projects, education & experience, contact
- `project.html` — single template for every project's own page (`project.html?id=<id>`),
  rendered by `assets/js/project-detail.js` from the same project data
- `cv.html` — CV download plus an inline PDF viewer (`assets/js/cv.js`)
- `assets/css/style.css`, `assets/js/` — styles and rendering logic
- `assets/img/` — images (compressed; no raw screen recordings)
- `assets/fonts/` — self-hosted woff2 latin subsets (see `assets/fonts/README.md`)
- `assets/cv/` — the CV PDF
- `DESIGN_NOTES.md` — where the colours, type and interactions came from

Content lives in four data files, all plain `const` arrays with no build step:

- `assets/js/projects-data.js` — projects; `tags` feed the Skills section and
  `details` feed each project's own page, both automatically
- `assets/js/timeline-data.js` — the combined Education & Experience timeline
- `assets/js/skills-data.js` — the category groupings for the Skills cards
- `assets/js/achievements-data.js` — empty by design; the section and its nav
  link stay hidden until it has entries

## Editing content

See [skills/CONTENT_EDITOR.SKILL.md](skills/CONTENT_EDITOR.SKILL.md) for the allowed
files and guidelines when updating content or project cards.

## Agents and automation

- [AGENTS.md](AGENTS.md) — agent roles and rules for this repo
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — GitHub Copilot repo instructions
- [CLAUDE.md](CLAUDE.md) — project brief for Claude Code
- [skills/](skills/) — task-specific guides (content editing, build/preview)
