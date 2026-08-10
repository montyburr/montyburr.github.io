(function () {
  function getProjectId() {
    return new URLSearchParams(window.location.search).get("id");
  }

  // Animated stage diagram, e.g. Idea -> Jira Ticket -> Approval -> ... The
  // "live" motion is pure CSS (each dot's pulse keyframe staggered by --i via
  // animation-delay), not real pipeline state — see .project-detail__pipeline
  // in style.css for the timing.
  function buildPipeline(stages) {
    const wrap = document.createElement("div");
    wrap.className = "project-detail__pipeline";

    const heading = document.createElement("h3");
    heading.textContent = "Pipeline";
    wrap.appendChild(heading);

    const track = document.createElement("div");
    track.className = "project-detail__pipeline-track";

    const list = document.createElement("ol");
    list.className = "project-detail__pipeline-steps";

    stages.forEach((stage, index) => {
      if (index > 0) {
        const arrow = document.createElement("li");
        arrow.className = "project-detail__pipeline-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        list.appendChild(arrow);
      }

      const step = document.createElement("li");
      step.className = "project-detail__pipeline-step";
      step.style.setProperty("--i", index);

      const dot = document.createElement("span");
      dot.className = "project-detail__pipeline-dot";
      dot.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.className = "project-detail__pipeline-label";
      label.textContent = stage;

      step.append(dot, label);
      list.appendChild(step);
    });

    track.appendChild(list);
    wrap.appendChild(track);
    return wrap;
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

    const tags = project.tools?.length ? buildTags(project.tools) : null;

    const pipeline = project.pipeline?.length ? buildPipeline(project.pipeline) : null;

    const gallery = project.gallery?.length
      ? project.gallery
      : [{ src: project.media.src, alt: project.media.alt, title: project.title }];
    const media =
      project.media.type === "video" ? buildMedia(project.media) : buildCarousel(gallery);
    media.classList.add("project-detail__media");

    const body = document.createElement("div");
    body.className = "project-detail__body";
    const paragraphs = project.details?.length ? project.details : [project.blurb];
    paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      body.appendChild(p);
    });

    let features = null;
    if (project.features?.length) {
      features = document.createElement("div");
      features.className = "project-detail__features";

      const featuresHeading = document.createElement("h3");
      featuresHeading.textContent = "Key features";
      features.appendChild(featuresHeading);

      const list = document.createElement("ul");
      project.features.forEach((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        list.appendChild(item);
      });
      features.appendChild(list);
    }

    // No GitHub/live-demo buttons — only a write-up link, for non-code entries.
    const links = project.writeup
      ? (() => {
          const wrap = document.createElement("div");
          wrap.className = "project-card__links project-detail__links";
          wrap.appendChild(makeLink(project.writeup, "Read Write-up"));
          return wrap;
        })()
      : null;

    container.append(
      heading,
      ...(tags ? [tags] : []),
      media,
      body,
      ...(pipeline ? [pipeline] : []),
      ...(features ? [features] : []),
      ...(links ? [links] : [])
    );
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
