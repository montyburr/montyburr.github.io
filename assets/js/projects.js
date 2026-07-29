// Projects section — the website2 pattern: full-width numbered rows with a
// floating cover image that appears on hover, cross-fades between projects and
// trails the active row's vertical position.
//
// Recoloured to the site's gold accent and set in the website1 display serif;
// the row/preview interaction is the only thing borrowed from website2.

(function () {
  const list = document.getElementById("project-list");
  const preview = document.getElementById("project-preview");
  if (!list || typeof PROJECTS === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // The floating preview is a pointer affordance — only wire it up where
  // there's a real hovering pointer and room for it beside the rows.
  const canPreview = window.matchMedia("(hover: hover) and (min-width: 900px)");

  const ARROW =
    '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>';

  /* --- Build the rows ---------------------------------------------------- */

  function coverFor(project) {
    const media = project.media || {};
    // A video entry has no still of its own beyond its poster frame.
    return media.type === "video" ? media.poster || null : media.src || null;
  }

  function buildRow(project, index) {
    const li = document.createElement("li");
    li.className = "project-row";
    li.dataset.cover = coverFor(project) || "";

    const link = document.createElement("a");
    link.className = "project-row__link";
    link.href = `project.html?id=${project.id}`;

    const num = document.createElement("span");
    num.className = "project-row__num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(index + 1).padStart(2, "0") + ".";

    const title = document.createElement("span");
    title.className = "project-row__title";
    // data-text drives the gold wipe overlay; both layers must match exactly.
    title.dataset.text = project.title;
    title.textContent = project.title;

    const icon = document.createElement("span");
    icon.className = "project-row__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = ARROW;

    link.append(num, title, icon);

    // No tech tags on the row by design — the stack is listed once, in the
    // Skillset section, rather than repeated under every project.

    // The scroll-driven transform lives on this inner wrapper, not on the row
    // itself, so it can't fight the row's hover/sibling-dimming opacity. The
    // divider sits on it too, so the rule travels with the text it belongs to.
    const inner = document.createElement("div");
    inner.className = "project-row__inner";
    inner.append(link);

    li.append(inner);
    return li;
  }

  PROJECTS.forEach((project, index) => list.appendChild(buildRow(project, index)));

  /* --- Floating preview -------------------------------------------------- */

  if (!preview) return;

  const layers = Array.from(preview.querySelectorAll(".project-preview__img"));
  let front = 0; // index of the layer currently on top
  let currentSrc = null;
  let frame = null;

  function showCover(src) {
    if (!src || src === currentSrc) return;
    currentSrc = src;

    const next = layers[1 - front];
    next.src = src;
    next.classList.add("is-front");
    layers[front].classList.remove("is-front");
    front = 1 - front;
  }

  function positionTo(row) {
    // Trail the row's vertical centre; CSS eases the move so it lags slightly.
    const rowRect = row.getBoundingClientRect();
    const height = preview.offsetHeight || 0;
    const margin = 24;
    const raw = rowRect.top + rowRect.height / 2 - height / 2;
    const max = window.innerHeight - height - margin;
    const y = Math.max(margin, Math.min(raw, Math.max(margin, max)));
    preview.style.transform = `translate3d(0, ${Math.round(y)}px, 0)`;
  }

  function markActive(row) {
    Array.from(list.children).forEach((el) => {
      el.classList.toggle("is-active", el === row);
    });
  }

  function activate(row) {
    if (!canPreview.matches) return;
    const cover = row.dataset.cover;
    if (!cover) {
      deactivate();
      return;
    }
    list.classList.add("is-hovering");
    markActive(row);
    preview.classList.add("is-visible");
    showCover(cover);
    positionTo(row);
  }

  function deactivate() {
    list.classList.remove("is-hovering");
    markActive(null);
    preview.classList.remove("is-visible");
  }

  function bind(row) {
    row.addEventListener("pointerenter", () => activate(row));
    // Keyboard users get the same reveal when the row's link takes focus.
    row.addEventListener("focusin", () => activate(row));
  }

  Array.from(list.children).forEach(bind);

  list.addEventListener("pointerleave", deactivate);
  list.addEventListener("focusout", (event) => {
    if (!list.contains(event.relatedTarget)) deactivate();
  });

  // Keep the preview aligned while the page moves under it.
  function syncPosition() {
    frame = null;
    if (!preview.classList.contains("is-visible")) return;
    const row = list.querySelector(".project-row.is-active");
    if (row) positionTo(row);
  }

  function queueSync() {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(syncPosition);
  }

  window.addEventListener("scroll", queueSync, { passive: true });
  window.addEventListener("resize", queueSync, { passive: true });

  // Dropping below the preview breakpoint should never strand it on screen.
  const onPreviewChange = () => {
    if (!canPreview.matches) deactivate();
  };
  if (canPreview.addEventListener) canPreview.addEventListener("change", onPreviewChange);
  else if (canPreview.addListener) canPreview.addListener(onPreviewChange);

  // Referenced so the intent is explicit: the CSS reduced-motion block already
  // collapses the wipe, fade and trailing transitions to near-instant.
  void reduceMotion;
})();
