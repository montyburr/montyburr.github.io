// Shared helpers plus the renderers for Skills, Education and Achievements.
// buildMedia / buildTags / makeLink are also used by project-detail.js.

function buildMedia(media) {
  const wrap = document.createElement("div");
  wrap.className = "project-card__media";

  if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.src;
    video.controls = true;
    video.playsInline = true;
    video.muted = true;
    if (media.poster) video.poster = media.poster;
    wrap.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = media.src;
    img.alt = media.alt || "";
    img.loading = "lazy";
    wrap.appendChild(img);
  }

  return wrap;
}

function buildTags(tags) {
  const ul = document.createElement("ul");
  ul.className = "project-card__tags";
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    ul.appendChild(li);
  });
  return ul;
}

function makeLink(href, label) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = label;
  a.className = "btn btn--small";
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

// NON_SKILL_TAGS lives in projects-data.js — the hero's tech line uses it too.

/* --- Skills ------------------------------------------------------------- */

function projectSkillTags() {
  if (typeof PROJECTS === "undefined") return [];
  const skipped = typeof NON_SKILL_TAGS !== "undefined" ? NON_SKILL_TAGS : new Set();
  return [...new Set(PROJECTS.flatMap((project) => project.tags || []))].filter(
    (tag) => !skipped.has(tag)
  );
}

function buildSkillCard(name, tags) {
  const card = document.createElement("article");
  card.className = "skill-card card-spotlight";

  const heading = document.createElement("h3");
  heading.className = "skill-card__title";
  heading.textContent = name;

  const ul = document.createElement("ul");
  ul.className = "skill-card__list";
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    ul.appendChild(li);
  });

  card.append(heading, ul);
  return card;
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  const available = projectSkillTags();
  const categories =
    typeof SKILL_CATEGORIES !== "undefined" ? SKILL_CATEGORIES : [];
  const used = new Set();

  categories.forEach((category) => {
    // Only show tags a project actually carries, so the list stays derived.
    const tags = category.tags.filter((tag) => available.includes(tag));
    tags.forEach((tag) => used.add(tag));
    if (tags.length) grid.appendChild(buildSkillCard(category.name, tags));
  });

  // Anything a new project introduced that hasn't been categorised yet.
  const uncategorised = available.filter((tag) => !used.has(tag));
  if (uncategorised.length) {
    grid.appendChild(buildSkillCard("Other", uncategorised));
  }
}

/* --- Education & Experience timeline ------------------------------------ */

const TIMELINE_ICONS = {
  education:
    '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
    'stroke-linejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5Z"/>' +
    '<path d="M6 11.2V16c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4.8"/>' +
    '<path d="M22 9v4.5"/></svg>',
  experience:
    '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
    'stroke-linejoin="round"><rect x="2.75" y="7.25" width="18.5" height="12.5" rx="2"/>' +
    '<path d="M8.75 7.25V6a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2v1.25"/>' +
    '<path d="M2.75 12.5h18.5"/></svg>',
};

function buildTimelineEntry(entry) {
  const isExperience = entry.type === "experience";
  const kind = isExperience ? "experience" : "education";

  const item = document.createElement("div");
  item.className = `timeline__item timeline__item--${kind}`;

  const node = document.createElement("span");
  node.className = `timeline__node timeline__node--${kind}`;
  node.setAttribute("aria-hidden", "true");

  const card = document.createElement("article");
  card.className = `timeline__card timeline__card--${kind} card-spotlight`;

  // Icon badge + label, so the two kinds are separable at a glance even where
  // the node on the line isn't beside the card (mobile).
  const head = document.createElement("div");
  head.className = "timeline__head";

  const badge = document.createElement("span");
  badge.className = "timeline__badge";
  badge.setAttribute("aria-hidden", "true");
  badge.innerHTML = TIMELINE_ICONS[kind];

  const kicker = document.createElement("p");
  kicker.className = "timeline__kicker";
  kicker.textContent = isExperience ? "Experience" : "Education";

  head.append(badge, kicker);
  card.appendChild(head);

  const title = document.createElement("h3");
  title.className = "timeline__title";
  // For education without a qualification the institution is the heading, so
  // it isn't repeated on the line below.
  title.textContent = isExperience
    ? entry.role
    : entry.qualification || entry.institution;
  card.appendChild(title);

  const subtitle = isExperience
    ? [entry.organisation, entry.engagement].filter(Boolean).join(" · ")
    : entry.qualification && entry.institution;

  if (subtitle) {
    const subtitleEl = document.createElement("p");
    subtitleEl.className = "timeline__institution";
    subtitleEl.textContent = subtitle;
    card.appendChild(subtitleEl);
  }

  // period and status are both optional — neither is invented when absent.
  const meta = [entry.period, entry.status].filter(Boolean);
  if (meta.length) {
    const metaEl = document.createElement("p");
    metaEl.className = "timeline__meta";
    metaEl.textContent = meta.join(" · ");
    card.appendChild(metaEl);
  }

  if (entry.location) {
    const location = document.createElement("p");
    location.className = "timeline__location";
    location.textContent = entry.location;
    card.appendChild(location);
  }

  if (entry.detail) {
    const detail = document.createElement("p");
    detail.className = "timeline__detail";
    detail.textContent = entry.detail;
    card.appendChild(detail);
  }

  if (entry.skills && entry.skills.length) {
    const skills = document.createElement("ul");
    skills.className = "timeline__skills";
    entry.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      skills.appendChild(li);
    });
    card.appendChild(skills);
  }

  (entry.subEntries || []).forEach((sub) => {
    const block = document.createElement("div");
    block.className = "timeline__sub";

    if (sub.period) {
      const period = document.createElement("p");
      period.className = "timeline__sub-period";
      period.textContent = sub.period;
      block.appendChild(period);
    }

    if (sub.title) {
      const subTitle = document.createElement("h4");
      subTitle.className = "timeline__sub-title";
      subTitle.textContent = sub.title;
      block.appendChild(subTitle);
    }

    if (sub.results && sub.results.length) {
      const list = document.createElement("ul");
      list.className = "timeline__sub-list";
      sub.results.forEach((result) => {
        const li = document.createElement("li");
        li.textContent = result;
        list.appendChild(li);
      });
      block.appendChild(list);
    }

    // A related qualification shown under the results without its own rule.
    if (sub.note) {
      const note = document.createElement("p");
      note.className = "timeline__sub-note";
      note.textContent = sub.note;
      block.appendChild(note);
    }

    card.appendChild(block);
  });

  item.append(node, card);
  return item;
}

function renderTimeline() {
  const timeline = document.getElementById("education-timeline");
  if (!timeline || typeof TIMELINE === "undefined") return;

  const section = timeline.closest("section");
  if (!TIMELINE.length) {
    if (section) section.hidden = true;
    return;
  }

  const progress = document.createElement("span");
  progress.className = "timeline__progress";
  progress.setAttribute("aria-hidden", "true");
  timeline.appendChild(progress);

  TIMELINE.forEach((entry) => timeline.appendChild(buildTimelineEntry(entry)));

  trackTimelineProgress(timeline, progress);
}

// The scroll-linked marker that slides down the timeline's centre line.
function trackTimelineProgress(timeline, progress) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    progress.style.transform = "scaleY(1)";
    return;
  }

  let ticking = false;

  function update() {
    ticking = false;
    const rect = timeline.getBoundingClientRect();
    const travel = rect.height + window.innerHeight;
    const seen = window.innerHeight - rect.top;
    const ratio = Math.max(0, Math.min(1, seen / travel));
    progress.style.transform = `scaleY(${ratio.toFixed(4)})`;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );

  window.addEventListener("resize", update, { passive: true });
  update();
}

/* --- Achievements ------------------------------------------------------- */

const ACHIEVEMENT_BADGE =
  '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
  '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
  'stroke-linejoin="round" d="M8 3h8v5a4 4 0 0 1-8 0V3Z"/>' +
  '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
  'd="M8 4H5v2a3 3 0 0 0 3 3M16 4h3v2a3 3 0 0 1-3 3M12 12v4M9 21h6M10 18h4"/></svg>';

function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  if (!grid || typeof ACHIEVEMENTS === "undefined") return;

  const section = grid.closest("section");
  const navItem = document.querySelector("[data-nav-achievements]");

  // Empty by design: keep the whole section and its nav link out of the page
  // rather than shipping empty cards or invented placeholder copy.
  if (!ACHIEVEMENTS.length) {
    if (section) section.hidden = true;
    if (navItem) navItem.hidden = true;
    return;
  }

  ACHIEVEMENTS.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "achievement-card card-spotlight";

    const badge = document.createElement("span");
    badge.className = "achievement-card__badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = ACHIEVEMENT_BADGE;

    const body = document.createElement("div");

    const title = document.createElement("h3");
    title.className = "achievement-card__title";
    title.textContent = entry.title;
    body.appendChild(title);

    if (entry.meta) {
      const meta = document.createElement("p");
      meta.className = "achievement-card__meta";
      meta.textContent = entry.meta;
      body.appendChild(meta);
    }

    if (entry.detail) {
      const detail = document.createElement("p");
      detail.className = "achievement-card__detail";
      detail.textContent = entry.detail;
      body.appendChild(detail);
    }

    card.append(badge, body);
    grid.appendChild(card);
  });

  if (section) section.hidden = false;
  if (navItem) navItem.hidden = false;
}

/* --- Card cursor spotlight ---------------------------------------------- */

// website1's cards carry a soft gold radial highlight that follows the cursor
// inside the card. The CSS reads --mx/--my; this only keeps them current.
function initCardSpotlight() {
  if (!window.matchMedia("(hover: hover)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".card-spotlight").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      },
      { passive: true }
    );
  });
}

/* --- Misc --------------------------------------------------------------- */

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// No section entrance animation by design — DESIGN_NOTES §7 found the
// reference's cards already in place between frames, with hover as the only
// card motion.

renderSkills();
renderTimeline();
renderAchievements();
initCardSpotlight();
setYear();
