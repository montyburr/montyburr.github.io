// Three scrolling marquee rows for the Skillset section, built from
// SKILL_CATEGORIES (assets/js/skills-data.js) — the one source of truth for
// the skill list, which also drives the hero's rotating tagline:
//   1. Skills with a real logo (SKILL_LOGO_SLUGS / SKILL_LOGO_INLINE_SVG)
//   2. Skills with no logo — soft skills, security concepts — as text tiles
//   3. Tools (the old Tools tab), all of which currently have a logo
//
// Each row clones enough of its own leading items onto its own end so the
// CSS translateX loop has no visible seam. Loop distance and duration read
// a --marquee-elements custom property JS scopes per .marquee element, so
// differently-sized rows don't have to share one global value.

function skillNamesForTab(tab) {
  const categories = typeof SKILL_CATEGORIES !== "undefined" ? SKILL_CATEGORIES : [];
  return categories
    .filter((category) => (category.tab || "skills") === tab)
    .flatMap((category) => category.skills || []);
}

function hasLogo(name) {
  const slugs = typeof SKILL_LOGO_SLUGS !== "undefined" ? SKILL_LOGO_SLUGS : {};
  const inlineSvgs = typeof SKILL_LOGO_INLINE_SVG !== "undefined" ? SKILL_LOGO_INLINE_SVG : {};
  return Boolean(slugs[name] || inlineSvgs[name]);
}

function buildMarqueeItems(names) {
  const slugs = typeof SKILL_LOGO_SLUGS !== "undefined" ? SKILL_LOGO_SLUGS : {};
  const inlineSvgs = typeof SKILL_LOGO_INLINE_SVG !== "undefined" ? SKILL_LOGO_INLINE_SVG : {};

  return names.map((name) => {
    const item = document.createElement("li");
    const inlineSvg = inlineSvgs[name];
    const slug = slugs[name];

    if (inlineSvg) {
      const logo = document.createElement("span");
      logo.className = "marquee-content__logo";
      logo.innerHTML = inlineSvg;
      item.appendChild(logo);
    } else if (slug) {
      const img = document.createElement("img");
      img.className = "marquee-content__logo";
      img.src = `https://cdn.simpleicons.org/${slug}/9a9a9a`;
      img.alt = name;
      img.loading = "lazy";
      item.appendChild(img);
    } else {
      item.classList.add("marquee-content__item--text");
    }

    const label = document.createElement("span");
    label.textContent = name;
    item.appendChild(label);

    return item;
  });
}

function initSkillsetMarquee() {
  const skillNames = skillNamesForTab("skills");

  const rows = [
    { rowId: "skillset-marquee-row-1", names: skillNames.filter(hasLogo) },
    { rowId: "skillset-marquee-row-2", names: skillNames.filter((name) => !hasLogo(name)) },
    { rowId: "skillset-marquee-row-3", names: skillNamesForTab("tools") },
  ];

  rows.forEach(({ rowId, names }) => {
    const content = document.getElementById(rowId);
    const marquee = content?.closest(".marquee");
    if (!content || !marquee || !names.length) return;

    content.append(...buildMarqueeItems(names));
    marquee.style.setProperty("--marquee-elements", String(names.length));

    const displayed =
      Number(getComputedStyle(marquee).getPropertyValue("--marquee-elements-displayed")) || names.length;
    for (let i = 0; i < displayed; i++) {
      content.appendChild(content.children[i].cloneNode(true));
    }
  });
}
