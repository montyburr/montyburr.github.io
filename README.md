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

- `index.html` — landing page (about + project grid)
- `assets/css/style.css`, `assets/js/` — styles and rendering logic
- `assets/js/projects-data.js` — edit this to add/update project cards
- `assets/img/` — images (compressed; no raw screen recordings)

## Editing content

See [skills/CONTENT_EDITOR.SKILL.md](skills/CONTENT_EDITOR.SKILL.md) for the allowed
files and guidelines when updating content or project cards.

## Agents and automation

- [AGENTS.md](AGENTS.md) — agent roles and rules for this repo
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — GitHub Copilot repo instructions
- [CLAUDE.md](CLAUDE.md) — project brief for Claude Code
- [skills/](skills/) — task-specific guides (content editing, build/preview)
