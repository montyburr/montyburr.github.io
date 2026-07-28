(function () {
  function getProjectId() {
    return new URLSearchParams(window.location.search).get("id");
  }

  function renderNotFound(container) {
    const heading = document.createElement("h1");
    heading.textContent = "Project not found";

    const text = document.createElement("p");
    text.className = "project-detail__blurb";
    text.textContent = "That project doesn't exist. Head back to the projects section to pick one.";

    container.append(heading, text);
  }

  function renderProject(container, project) {
    document.title = `${project.title} — Monty Burr's Portfolio`;
    const descriptionMeta = document.getElementById("page-description");
    if (descriptionMeta) descriptionMeta.setAttribute("content", project.blurb);

    const heading = document.createElement("h1");
    heading.textContent = project.title;

    const tags = buildTags(project.tags);
    tags.classList.add("project-detail__tags");

    const media = buildMedia(project.media);
    media.classList.add("project-detail__media");

    const body = document.createElement("div");
    body.className = "project-detail__body";
    const paragraphs = project.details?.length ? project.details : [project.blurb];
    paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      body.appendChild(p);
    });

    const links = document.createElement("div");
    links.className = "project-card__links project-detail__links";
    if (project.links?.github) links.appendChild(makeLink(project.links.github, "GitHub"));
    if (project.links?.demo) links.appendChild(makeLink(project.links.demo, "Live Demo"));
    if (project.writeup) links.appendChild(makeLink(project.writeup, "Read Write-up"));

    container.append(heading, tags, media, body, links);
  }

  function init() {
    const container = document.getElementById("project-detail-content");
    if (!container) return;

    const project = PROJECTS.find((p) => p.id === getProjectId());
    if (project) {
      renderProject(container, project);
    } else {
      renderNotFound(container);
    }
  }

  init();
})();
