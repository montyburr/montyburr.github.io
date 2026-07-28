// How the Skills section groups the tags that come from projects-data.js.
//
// The tags themselves are still auto-derived from PROJECTS — this file only
// decides which heading each one sits under, so adding a project with a new
// tag still surfaces it automatically. Anything not listed below is grouped
// into a trailing "Other" card so it can't silently disappear.
//
// NOTE: these category headings were drafted during the redesign, not taken
// from existing site copy. Edit them freely.

const SKILL_CATEGORIES = [
  { name: "Frontend", tags: ["React", "Tkinter"] },
  { name: "Backend & APIs", tags: ["FastAPI", "Flask", "Python"] },
  { name: "Data", tags: ["SQL", "Matplotlib"] },
  { name: "Security", tags: ["SIEM", "Security Awareness"] },
  { name: "Concepts", tags: ["AI"] },
];
