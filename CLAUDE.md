# Portfolio Site

## What this is
Personal portfolio for Monty Burr — 3rd-year BSc Computer Science with Cyber Security,
Newcastle University. Showcases coding projects with screenshots and
short screen recordings. Hosted on GitHub Pages.

The year of study is stored once, in `assets/js/timeline-data.js`. That file is
the source of truth — update it there, not here.

## Stack
- Plain static HTML/CSS/JS. NO build step, NO framework, NO npm.
  (Must deploy directly from the main branch on GitHub Pages.)
- Vanilla JS only. Keep it lightweight and fast.
- Clean, modern, professional. Dark theme leaning. Recruiter-facing.

## Structure
- index.html — hero, about, skills, projects, education & experience, contact
- project.html?id=<id> and cv.html are the only other pages
- /assets for images (WebP/compressed), video, fonts and the CV PDF
- Projects render as a numbered row list with a floating cover image on hover,
  not a card grid. One entry per project in `assets/js/projects-data.js`:
  title, 2-3 line blurb, tech tags, screenshot/GIF, links (GitHub + live demo if any)
- See README.md for the four data files and DESIGN_NOTES.md for the visual rationale

## Projects to feature
- IT Support Ticket Triage Dashboard — React/FastAPI, AI-powered triage suggestions
- Personal Finance Tracker — Python, Tkinter, Matplotlib (data viz: bar/line/pie)
- Income Inequality Insight Platform — Flask, SQL, interactive world map (team project)
- Cyber internship work @ AJW Group — SIEM research, phishing awareness campaign
  (write-up / non-code, presented as experience)

## Media rules
- Compress everything. No raw screen recordings committed — GitHub blocks >100MB.
- Prefer WebP screenshots and short optimised MP4/animated WebP clips, or embed video externally.

## Constraints
- Keep the repo small. Optimise all assets before committing.