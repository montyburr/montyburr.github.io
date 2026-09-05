// About-panel cathode workstation: an isometric CRT monitor, keyboard, and
// mouse built from real projection math (not CSS 3D transforms) — every
// shape comes from one project(x,y,z) function over one shared set of world
// coordinates, and the terminal overlay is positioned with a CSS matrix
// derived from that same projection, which is what keeps it flush on the
// tilted screen face. Ported from a standalone prototype: the projection
// math, world coordinates, and screen-overlay matrix are unchanged from
// that file — only wiring, styling, and pause/resize behaviour were
// adapted to this site's conventions (see hero.js for the same pattern).
//
// This site has no component-mount lifecycle to unmount from (static HTML,
// no SPA), so "cleanup on unmount" here means the same thing it means in
// hero.js: pause the animation loops when the tab is hidden or the section
// is scrolled out of view, and debounce the resize listener.

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const stageEl = document.getElementById("workstation");
  const svg = document.getElementById("workstation-svg");
  const screenOverlay = document.getElementById("workstation-screen");
  const terminal = document.getElementById("workstation-terminal");
  if (!stageEl || !svg || !screenOverlay || !terminal) return;

  /* ========================================================================
     Isometric projection — unchanged from the prototype
     ==================================================================== */

  const COS30 = Math.cos(Math.PI / 6);
  const SIN30 = Math.sin(Math.PI / 6);

  function project(x, y, z) {
    return [(x - z) * COS30, (x + z) * SIN30 - y];
  }

  function cuboidFaces(cx, cy, cz, w, h, d) {
    const hw = w / 2,
      hh = h / 2,
      hd = d / 2;
    return {
      top: [
        [cx - hw, cy + hh, cz - hd],
        [cx + hw, cy + hh, cz - hd],
        [cx + hw, cy + hh, cz + hd],
        [cx - hw, cy + hh, cz + hd],
      ],
      right: [
        [cx + hw, cy - hh, cz - hd],
        [cx + hw, cy - hh, cz + hd],
        [cx + hw, cy + hh, cz + hd],
        [cx + hw, cy + hh, cz - hd],
      ],
      front: [
        [cx - hw, cy - hh, cz + hd],
        [cx + hw, cy - hh, cz + hd],
        [cx + hw, cy + hh, cz + hd],
        [cx - hw, cy + hh, cz + hd],
      ],
    };
  }
  function projFace(face) {
    return face.map((p) => project(...p));
  }
  function pointsAttr(pts) {
    return pts.map((p) => p[0].toFixed(2) + "," + p[1].toFixed(2)).join(" ");
  }

  /* ========================================================================
     Scene definition (world units) — unchanged from the prototype. Reposition
     or resize by editing these coordinates, never by adjusting the projected
     output, or the pieces drift apart / overlap.
     ==================================================================== */

  const monitor = { cx: 0, cy: 57.5, cz: 0, w: 150, h: 115, d: 80 };
  const keyboard = { cx: 0, cy: 7, cz: 66.5, w: 130, h: 14, d: 45 };
  const mouse = { cx: 88, cy: 7, cz: 70, w: 26, h: 14, d: 40 };

  const svgNS = "http://www.w3.org/2000/svg";

  let allPts = [];
  function collect(o) {
    const f = cuboidFaces(o.cx, o.cy, o.cz, o.w, o.h, o.d);
    Object.values(f).forEach((face) => face.forEach((p) => allPts.push(project(...p))));
  }
  collect(monitor);
  collect(keyboard);
  collect(mouse);

  const floorPts = [];
  for (let gx = -240; gx <= 240; gx += 20) {
    for (let gz = -240; gz <= 240; gz += 20) {
      if (gx * gx + gz * gz < 240 * 240) {
        floorPts.push([gx, gz, project(gx, 0, gz)]);
        allPts.push(project(gx, 0, gz));
      }
    }
  }

  const xs = allPts.map((p) => p[0]),
    ys = allPts.map((p) => p[1]);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const MARGIN = 30;
  const VBW = maxX - minX + MARGIN * 2;
  const VBH = maxY - minY + MARGIN * 2;
  const OFFX = -minX + MARGIN;
  const OFFY = -minY + MARGIN;

  function addPoly(fill, pts, opacity) {
    const el = document.createElementNS(svgNS, "polygon");
    const shifted = pts.map((p) => [p[0] + OFFX, p[1] + OFFY]);
    el.setAttribute("points", pointsAttr(shifted));
    el.setAttribute("fill", fill);
    if (opacity !== undefined) el.setAttribute("fill-opacity", opacity);
    el.setAttribute("stroke", "#040404");
    el.setAttribute("stroke-width", "1");
    svg.appendChild(el);
    return el;
  }
  function addCircle(x, y, r, fill, opacity) {
    const el = document.createElementNS(svgNS, "circle");
    el.setAttribute("cx", x + OFFX);
    el.setAttribute("cy", y + OFFY);
    el.setAttribute("r", r);
    el.setAttribute("fill", fill);
    if (opacity !== undefined) el.setAttribute("fill-opacity", opacity);
    svg.appendChild(el);
    return el;
  }

  // ---- floor ----
  const floorOutline = [
    [-240, 0, -240],
    [240, 0, -240],
    [240, 0, 240],
    [-240, 0, 240],
  ].map((p) => project(...p));
  addPoly("#0d0d0d", floorOutline);
  floorPts.forEach(([, , pr]) => {
    addCircle(pr[0], pr[1], 1.3, "#888", 0.35);
  });

  // ---- objects: top/right/front, skip 'front' fill for the monitor's screen ----
  function drawBox(o, colors, opts) {
    opts = opts || {};
    const f = cuboidFaces(o.cx, o.cy, o.cz, o.w, o.h, o.d);
    addPoly(colors.top, projFace(f.top));
    addPoly(colors.right, projFace(f.right));
    if (!opts.skipFront) addPoly(colors.front, projFace(f.front));
    return f;
  }

  drawBox(keyboard, { top: "#242424", right: "#141414", front: "#1a1a1a" });

  (function keysTexture() {
    const hw = keyboard.w / 2,
      hd = keyboard.d / 2,
      topY = keyboard.cy + keyboard.h / 2;
    const cols = 13,
      rows = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = keyboard.cx - hw + 10 + c * ((keyboard.w - 20) / (cols - 1));
        const z = keyboard.cz - hd + 8 + r * ((keyboard.d - 16) / (rows - 1));
        const p = project(x, topY + 0.1, z);
        addCircle(p[0], p[1], 1.1, "#e8e8e8", 0.85);
      }
    }
  })();

  drawBox(mouse, { top: "#262626", right: "#151515", front: "#1c1c1c" });

  const monitorFaces = drawBox(
    monitor,
    { top: "#2a2a2a", right: "#161616", front: "#202020" },
    { skipFront: true }
  );
  // Bezel drawn as a plain dark plate; the live screen content sits in an
  // HTML overlay positioned exactly on top of it via a matching matrix.
  addPoly("#141414", projFace(monitorFaces.front));

  // ---- position the HTML screen overlay to match the monitor's screen inset,
  // using the same projection math ----
  (function placeScreenOverlay() {
    const hw = monitor.w / 2,
      hh = monitor.h / 2,
      z = monitor.cz + monitor.d / 2;
    const marginSide = 10,
      marginTop = 10,
      marginBottom = 14;
    const x0 = monitor.cx - hw + marginSide;
    const x1 = monitor.cx + hw - marginSide;
    const y0 = monitor.cy - hh + marginBottom;
    const y1 = monitor.cy + hh - marginTop;
    const W = x1 - x0,
      H = y1 - y0;

    const O = project(x0, y1, z);
    const Ux = project(x1, y1, z);
    const Vy = project(x0, y0, z);

    const a = (Ux[0] - O[0]) / W;
    const b = (Ux[1] - O[1]) / W;
    const c = (Vy[0] - O[0]) / H;
    const d = (Vy[1] - O[1]) / H;
    const e = O[0] + OFFX;
    const f = O[1] + OFFY;

    screenOverlay.style.width = W + "px";
    screenOverlay.style.height = H + "px";
    screenOverlay.style.transform = `matrix(${a},${b},${c},${d},${e},${f})`;
  })();

  const wrapW = VBW,
    wrapH = VBH;
  screenOverlay.style.position = "absolute";

  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.left = "50%";
  wrapper.style.top = "50%";
  wrapper.style.width = wrapW + "px";
  wrapper.style.height = wrapH + "px";

  function applyStageScale() {
    const rect = stageEl.getBoundingClientRect();
    const scale = Math.min(rect.width / wrapW, rect.height / wrapH);
    wrapper.style.transform = `translate(-50%,-50%) scale(${scale})`;
  }

  stageEl.appendChild(wrapper);
  wrapper.appendChild(svg);
  wrapper.appendChild(screenOverlay);
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.setAttribute("width", wrapW);
  svg.setAttribute("height", wrapH);
  svg.removeAttribute("viewBox");
  applyStageScale();

  let resizeTimer = null;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyStageScale, 150);
  }
  window.addEventListener("resize", onResize, { passive: true });

  /* ========================================================================
     Terminal typewriter — paused (not merely left to run) when the tab is
     hidden or the section is off-screen, and skipped to a static settled
     frame under prefers-reduced-motion.
     ==================================================================== */

  const LOG_LINES = ["> boot init", "> mem ok", "> mount vol", "> daemon up", "> ready_"];

  let onScreen = true;
  let paused = false;

  function sleep(ms) {
    return new Promise((resolve) => {
      function attempt() {
        if (paused) {
          window.setTimeout(attempt, 200); // keep polling rather than firing while paused
          return;
        }
        window.setTimeout(resolve, ms);
      }
      attempt();
    });
  }

  function render(text) {
    terminal.innerHTML = text + '<span class="workstation__cursor">_</span>';
  }

  async function typeLoop() {
    let full = "";
    for (const line of LOG_LINES) {
      for (const ch of line) {
        full += ch;
        render(full);
        await sleep(18);
      }
      full += "\n";
      await sleep(220);
    }
    await sleep(1800);
    while (full.length) {
      full = full.slice(0, -1);
      render(full);
      await sleep(6);
    }
    await sleep(400);
    typeLoop();
  }

  function updatePaused() {
    paused = !onScreen || document.hidden || reduceMotion.matches;
  }

  if (reduceMotion.matches) {
    // Motion off: show the settled boot log once, no looping typewriter.
    render(LOG_LINES.join("\n"));
  } else {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
          updatePaused();
        },
        { threshold: 0 }
      ).observe(stageEl);
    }
    document.addEventListener("visibilitychange", updatePaused);
    const onMotionChange = () => {
      if (reduceMotion.matches) render(LOG_LINES.join("\n"));
      updatePaused();
    };
    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onMotionChange);
    else if (reduceMotion.addListener) reduceMotion.addListener(onMotionChange);

    typeLoop();
  }
})();
