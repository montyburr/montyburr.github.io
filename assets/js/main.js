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

function buildLinks(project) {
  const row = document.createElement("div");
  row.className = "project-card__links";

  if (project.links?.github) row.appendChild(makeLink(project.links.github, "GitHub"));
  if (project.links?.demo) row.appendChild(makeLink(project.links.demo, "Live Demo"));
  if (project.writeup) row.appendChild(makeLink(project.writeup, "Read Write-up"));

  return row;
}

function createProjectCard(project) {
  const tilt = document.createElement("div");
  tilt.className = "project-tilt";

  const card = document.createElement("article");
  card.className = "project-card";

  const glass = document.createElement("div");
  glass.className = "project-card__glass";
  glass.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "project-card__body";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const blurb = document.createElement("p");
  blurb.className = "project-card__blurb";
  blurb.textContent = project.blurb;

  body.append(title, buildTags(project.tags), blurb, buildLinks(project));
  card.append(buildMedia(project.media), body, glass);
  tilt.append(card);

  return tilt;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  PROJECTS.forEach((project) => grid.appendChild(createProjectCard(project)));
}

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function observeProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  cards.forEach((card) => observer.observe(card));
}

renderProjects();
setYear();
observeProjectCards();
