// Floating pill nav: docks flush to the viewport top on scroll, collapses to a
// hamburger below 768px, marks the section currently in view as active, and
// slides an underline to sit beneath whichever link that is.

(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!header) return;

  const DOCK_AFTER = 24; // px of scroll before the pill loses its top gap

  /* --- Dock on scroll ---------------------------------------------------- */

  let ticking = false;

  function syncDocked() {
    header.classList.toggle("is-docked", window.scrollY > DOCK_AFTER);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncDocked);
    },
    { passive: true }
  );

  syncDocked();

  /* --- Collapsed menu ---------------------------------------------------- */

  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close on navigation, on Escape, and on any click outside the pill.
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      setOpen(false);
      toggle.focus();
    });

    document.addEventListener("click", (event) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!event.target.closest(".nav-pill")) setOpen(false);
    });

    // Leaving the collapsed breakpoint should never strand the menu open.
    const wide = window.matchMedia("(min-width: 841px)");
    const onWide = (event) => {
      if (event.matches) setOpen(false);
    };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* --- Sliding marker ---------------------------------------------------- */

  // Follows whichever link carries .is-active. That class is set by the
  // section observer below on the homepage and written into the markup on
  // cv.html, so the marker works on both without knowing the difference.
  const pill = header.querySelector(".nav-pill");
  const marker = header.querySelector(".nav-pill__marker");
  const wideNav = window.matchMedia("(min-width: 841px)");

  function syncMarker() {
    if (!marker || !pill || !menu) return;

    const active = menu.querySelector("a.is-active");
    // Below the collapsed breakpoint the links live in a dropdown that is shut
    // most of the time, and CSS hides the marker there — measuring it would
    // only produce a stale position for when the window widens again.
    if (!active || !wideNav.matches) {
      marker.classList.remove("is-visible");
      return;
    }

    const pillRect = pill.getBoundingClientRect();
    const rect = active.getBoundingClientRect();

    // First placement must not animate in from the pill's left edge, so the
    // transition is suppressed for exactly that one write.
    const first = !marker.classList.contains("is-visible");
    if (first) marker.style.transition = "none";

    // getBoundingClientRect is a border-box measurement, but `left: 0` on an
    // absolutely positioned child anchors to the padding box — so the pill's
    // 1px border has to come back out or the marker sits a pixel right and low.
    const insetX = pillRect.left + pill.clientLeft;
    const insetY = pillRect.top + pill.clientTop;

    marker.style.setProperty("--nav-marker-x", `${rect.left - insetX}px`);
    marker.style.setProperty("--nav-marker-y", `${rect.bottom - insetY}px`);
    marker.style.setProperty("--nav-marker-w", `${rect.width}px`);

    if (first) {
      void marker.offsetWidth; // flush the jump before the transition returns
      marker.style.transition = "";
      marker.classList.add("is-visible");
    }
  }

  if (marker) {
    window.addEventListener("resize", syncMarker, { passive: true });
    if (wideNav.addEventListener) wideNav.addEventListener("change", syncMarker);
    else if (wideNav.addListener) wideNav.addListener(syncMarker);

    // Poppins is swapped in after first paint, and the fallback metrics are a
    // different width — without this the marker sits under the old text box.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncMarker);
    }

    syncMarker();
  }

  /* --- Active section ---------------------------------------------------- */

  const links = Array.from(menu ? menu.querySelectorAll("a[href^='#']") : []);
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
    syncMarker();
  };

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // With several sections in view, the topmost one wins.
      const current = sections.find((section) => visible.has(section.id));
      if (current) setActive(current.id);
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();
