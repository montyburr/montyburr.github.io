// Floating pill nav: docks flush to the viewport top on scroll, collapses to a
// hamburger below 768px, and marks the section currently in view as active.

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
    const wide = window.matchMedia("(min-width: 769px)");
    const onWide = (event) => {
      if (event.matches) setOpen(false);
    };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
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
