# Plan: Personal Website Agents & Maintenance

TL;DR - Add lightweight agent & skill docs, centralize agent rules in the repo, remove duplicate folders, wire a simple local preview workflow, and add a small verification checklist so agents can safely make and test content changes.

## Steps
1. ✅ Discovery: confirm canonical repo path and remove duplicate sibling folder (blocking).
   Found a stray, incomplete copy at `Code/Personal Projects/Personal Website/montyburr.github.io`
   (no trailing space, no `.git`, no `index.html`/assets — just `AGENTS.md`, `copilot-instructions.md`,
   and `skills/`, byte-identical to files already present in the canonical repo). Moved to Trash
   (recoverable via Finder) rather than permanently deleted. Canonical repo is
   `Code/Personal Projects /Personal Website/montyburr.github.io` (has `.git`).
2. ✅ Documentation: finalized `AGENTS.md`, `.github/copilot-instructions.md`, and files under `skills/`;
   updated `README.md` to describe the site and reference agent docs. (*depends on step 1*)
3. ✅ Agent workflows: `copilot-instructions.md` moved to `.github/copilot-instructions.md` so GitHub
   Copilot actually picks it up (root-level placement is not a recognized location); cross-references
   in `AGENTS.md`/`README.md` updated to match.
4. Local preview & smoke tests: documented in `skills/BUILD_PREVIEW.SKILL.md`. Skipped the optional
   Makefile/script — a single `python -m http.server 8000` command didn't need wrapping, and CLAUDE.md
   asks to keep the repo build-tooling-free. (*parallel with step 3*)
5. ✅ Verification: manual preview via `python -m http.server 8000` (see report), and added
   `.github/PULL_REQUEST_TEMPLATE.md` requiring a changed-file list and screenshots. (*depends on steps 2–4*)
6. ✅ Cleanup: duplicate folder removed (see step 1). No commits made per instructions — the user
   will decide when to commit/open a PR.
7. (Optional, not done) Automation: a lightweight GitHub Action for smoke checks / Pages deployment.
   Not added — ask before adding CI, since it affects the repo's build/deploy pipeline.

## Verification
1. Run the local preview:

```bash
python -m http.server 8000
```

Open http://localhost:8000 and visually verify pages.

2. Confirm `assets/js/projects-data.js` loads, CSS and images load, and there are no console errors.

3. Create a small test PR updating `README.md` with the agents reference; include screenshots and request review.

## Decisions & Assumptions
- The canonical repo is the folder that contains `.git` (the path you work from).
- Agent docs should live inside the active repo. The duplicate found in step 1 had no unique
  content (byte-identical to files already in the canonical repo), so it was moved to Trash
  rather than archived.

## Next Questions
- Do you want a GitHub Action to run link checks and HTML smoke tests on PRs?

---

Saved by automation on 2026-07-09. Updated 2026-07-09 (duplicate removed, docs finalized, PR template added).
