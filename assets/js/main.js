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

/* --- Education ---------------------------------------------------------- */

function buildEducationEntry(entry) {
  const item = document.createElement("div");
  item.className = "timeline__item";

  const node = document.createElement("span");
  node.className = "timeline__node";
  node.setAttribute("aria-hidden", "true");

  const card = document.createElement("article");
  card.className = "timeline__card card-spotlight";

  const title = document.createElement("h3");
  title.className = "timeline__title";
  title.textContent = entry.qualification;
  card.appendChild(title);

  const institution = document.createElement("p");
  institution.className = "timeline__institution";
  institution.textContent = entry.institution;
  card.appendChild(institution);

  // period and status are both optional — neither is invented when absent.
  const meta = [entry.period, entry.status].filter(Boolean);
  if (meta.length) {
    const metaEl = document.createElement("p");
    metaEl.className = "timeline__meta";
    metaEl.textContent = meta.join(" · ");
    card.appendChild(metaEl);
  }

  if (entry.detail) {
    const detail = document.createElement("p");
    detail.className = "timeline__detail";
    detail.textContent = entry.detail;
    card.appendChild(detail);
  }

  item.append(node, card);
  return item;
}

function renderEducation() {
  const timeline = document.getElementById("education-timeline");
  if (!timeline || typeof EDUCATION === "undefined") return;

  const section = timeline.closest("section");
  if (!EDUCATION.length) {
    if (section) section.hidden = true;
    return;
  }

  const progress = document.createElement("span");
  progress.className = "timeline__progress";
  progress.setAttribute("aria-hidden", "true");
  timeline.appendChild(progress);

  EDUCATION.forEach((entry) => timeline.appendChild(buildEducationEntry(entry)));

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
renderEducation();
renderAchievements();
initCardSpotlight();
setYear();
