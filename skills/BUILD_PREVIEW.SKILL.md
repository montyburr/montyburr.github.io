Skill: SiteBuilder

Purpose:
- Build, preview, and smoke-test the static site locally.

Commands:
- Quick preview (Python): `python -m http.server 8000` from the repo root.
- Alternative: install `http-server` and run `npx http-server`.

Checks to perform:
- Open `http://localhost:8000` and visually verify pages.
- Confirm that `assets/js/projects-data.js` loads and project cards render.
- Verify CSS loads and images appear.

Reporting:
- Report any console errors and broken links.
- For build issues, include exact commands run and OS details (macOS).
