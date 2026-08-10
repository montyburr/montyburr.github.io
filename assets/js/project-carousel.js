// Titled image carousel for a project's own page (project.html?id=<id>).
// Vanilla JS coverflow: the active slide sits centred and full-size, its
// neighbours fan out to either side, tilted and scaled down. No framework —
// this site ships no build step, so the effect is done with inline
// transforms driven by one active-index state var, transitioned via CSS.

function buildCarousel(slides) {
  const root = document.createElement("div");
  root.className = "project-carousel";
  if (!slides || slides.length === 0) return root;

  let active = 0;

  const stage = document.createElement("div");
  stage.className = "project-carousel__stage";

  const cards = slides.map((slide, i) => {
    const card = document.createElement("figure");
    card.className = "project-carousel__card";

    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.alt || "";
    img.loading = "lazy";
    card.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.className = "project-carousel__caption";
    caption.textContent = slide.title || "";
    card.appendChild(caption);

    card.addEventListener("click", () => {
      if (i === active) openLightbox(i);
      else setActive(i);
    });
    stage.appendChild(card);
    return card;
  });

  const controls = document.createElement("div");
  controls.className = "project-carousel__controls";

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "project-carousel__arrow";
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M15 5 8 12l7 7"/></svg>';

  const dots = document.createElement("div");
  dots.className = "project-carousel__dots";
  const dotEls = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "project-carousel__dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => setActive(i));
    dots.appendChild(dot);
    return dot;
  });

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "project-carousel__arrow";
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="m9 5 7 7-7 7"/></svg>';

  prevBtn.addEventListener("click", () => setActive(Math.max(0, active - 1)));
  nextBtn.addEventListener("click", () => setActive(Math.min(slides.length - 1, active + 1)));

  controls.append(prevBtn, dots, nextBtn);
  root.append(stage, controls);

  // Lightbox — opened by clicking the centred slide, fills most of the viewport.
  const lightbox = document.createElement("div");
  lightbox.className = "project-carousel__lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.hidden = true;

  const lightboxImg = document.createElement("img");
  lightboxImg.className = "project-carousel__lightbox-img";

  const lightboxCaption = document.createElement("div");
  lightboxCaption.className = "project-carousel__lightbox-caption";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "project-carousel__lightbox-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M6 6l12 12M18 6 6 18"/></svg>';

  const lbPrevBtn = prevBtn.cloneNode(true);
  lbPrevBtn.className = "project-carousel__lightbox-arrow project-carousel__lightbox-arrow--prev";
  const lbNextBtn = nextBtn.cloneNode(true);
  lbNextBtn.className = "project-carousel__lightbox-arrow project-carousel__lightbox-arrow--next";

  const lightboxFigure = document.createElement("div");
  lightboxFigure.className = "project-carousel__lightbox-figure";
  lightboxFigure.append(lightboxImg, lightboxCaption);

  lightbox.append(closeBtn, lbPrevBtn, lightboxFigure, lbNextBtn);
  root.appendChild(lightbox);

  function openLightbox(index) {
    setActive(index);
    updateLightbox();
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { lightbox.hidden = true; }, 220);
  }

  function updateLightbox() {
    lightboxImg.src = slides[active].src;
    lightboxImg.alt = slides[active].alt || "";
    lightboxCaption.textContent = slides[active].title || "";
    lbPrevBtn.disabled = active === 0;
    lbNextBtn.disabled = active === slides.length - 1;
  }

  lbPrevBtn.addEventListener("click", () => { setActive(Math.max(0, active - 1)); updateLightbox(); });
  lbNextBtn.addEventListener("click", () => { setActive(Math.min(slides.length - 1, active + 1)); updateLightbox(); });
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") { setActive(Math.max(0, active - 1)); updateLightbox(); }
    if (e.key === "ArrowRight") { setActive(Math.min(slides.length - 1, active + 1)); updateLightbox(); }
  });

  function setActive(index) {
    active = index;
    cards.forEach((card, i) => {
      const offset = i - active;
      const abs = Math.abs(offset);
      card.style.transform =
        `translateX(${offset * 46}%) rotateY(${offset * -32}deg) scale(${abs === 0 ? 1 : 0.82})`;
      card.style.opacity = abs > 2 ? "0" : abs === 0 ? "1" : "0.45";
      card.style.zIndex = String(slides.length - abs);
      card.style.pointerEvents = abs > 2 ? "none" : "auto";
      card.classList.toggle("is-active", abs === 0);
    });
    dotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    prevBtn.disabled = active === 0;
    nextBtn.disabled = active === slides.length - 1;
  }

  setActive(active);
  return root;
}
