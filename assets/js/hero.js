// Hero behaviour: the ambient gold particle field, the cursor spotlight, and
// the rolling tagline. All three honour prefers-reduced-motion.

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // The pointer effects are a mouse affordance. On touch there is no hover
  // state to speak of, and a sticky "last tapped" position looks broken.
  const canPoint = window.matchMedia("(hover: hover) and (pointer: fine)");

  const hero = document.querySelector(".hero");

  /* ======================================================================
     Shared pointer state

     One listener feeds both the particle repulsion and the spotlight, so the
     two can never drift out of sync. Coordinates are hero-local.
     ====================================================================== */

  const pointer = { x: 0, y: 0, active: false };

  function initPointer() {
    if (!hero || !canPoint.matches || reduceMotion.matches) return;

    let rect = null;

    // getBoundingClientRect on every pointermove would force layout at pointer
    // rate; cache it and only re-read when something could have moved it.
    const invalidate = () => {
      rect = null;
    };
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });

    hero.addEventListener(
      "pointermove",
      (event) => {
        if (!rect) rect = hero.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.active = true;
        hero.classList.add("is-pointing");
        hero.style.setProperty("--mx", `${pointer.x}px`);
        hero.style.setProperty("--my", `${pointer.y}px`);
      },
      { passive: true }
    );

    hero.addEventListener("pointerleave", () => {
      pointer.active = false;
      hero.classList.remove("is-pointing");
    });
  }

  /* ======================================================================
     Particle / constellation field

     Single canvas, capped particle count, and the loop is suspended whenever
     the tab is hidden or the hero has scrolled out of view.
     ====================================================================== */

  const PARTICLES = {
    // Density roughly doubled from the original 17000/90. The cursor only
    // influences particles within pointerRadius, so a sparse field left barely
    // half a dozen reacting and the effect went unnoticed.
    areaPerParticle: 8000, // one particle per ~8000 css px² …
    maxCount: 170, //         … capped here regardless of viewport size
    minCount: 26,
    // Pulled in from 132 alongside the density increase: pair count grows with
    // the square of the particle count, so holding the old radius turned the
    // field into a solid mesh.
    linkDistance: 112, // px within which two particles are joined by a line
    speed: 0.017, // px per ms
    radius: [0.7, 1.9],
    dotAlpha: [0.25, 0.75],
    lineAlpha: 0.17, // eased down for the same reason
    maxDpr: 2, // retina is enough; 3x costs a lot for a background

    pointerRadius: 165, // px of influence around the cursor
    pointerPush: 34, // px a particle is displaced at the very centre
    pointerLineBoost: 2.4, // multiplier on line alpha nearest the cursor
    pointerEase: 0.09, // how fast influence fades in and out, per frame
  };

  function initParticles() {
    const canvas = document.getElementById("hero-particles");
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Read the accent straight off the custom property so the palette stays
    // single-sourced in CSS.
    const gold =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--c-gold-rgb")
        .trim() || "209 164 40";
    const goldParts = gold.split(/[\s,]+/).join(", ");

    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let lastTime = 0;
    let onScreen = true;
    // Eased 0→1 so the field doesn't snap when the cursor enters or leaves.
    let influence = 0;

    const rand = (min, max) => min + Math.random() * (max - min);

    function targetCount() {
      const byArea = Math.round((width * height) / PARTICLES.areaPerParticle);
      return Math.max(
        PARTICLES.minCount,
        Math.min(PARTICLES.maxCount, byArea)
      );
    }

    function makeParticle() {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * PARTICLES.speed,
        vy: Math.sin(angle) * PARTICLES.speed,
        r: rand(PARTICLES.radius[0], PARTICLES.radius[1]),
        a: rand(PARTICLES.dotAlpha[0], PARTICLES.dotAlpha[1]),
        // Where the particle is actually painted, once the cursor has pushed
        // it. Kept separate from x/y on purpose — see displace().
        dx: 0,
        dy: 0,
      };
    }

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, PARTICLES.maxDpr);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grow or trim in place so a resize doesn't restart the whole field.
      const count = targetCount();
      while (particles.length < count) particles.push(makeParticle());
      if (particles.length > count) particles.length = count;

      particles.forEach((p) => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      });
    }

    // Repulsion is applied as a *paint-time offset*, never to x/y themselves.
    // Pushing the real positions would permanently deform the field — the
    // particles would never return once the cursor left, and repeated passes
    // would carve holes in it. This way the drift underneath is untouched and
    // the field restores itself exactly as the influence eases back to 0.
    function displace(p) {
      if (influence <= 0.001) {
        p.dx = 0;
        p.dy = 0;
        return;
      }
      const ox = p.x - pointer.x;
      const oy = p.y - pointer.y;
      const dist = Math.hypot(ox, oy);
      if (dist > PARTICLES.pointerRadius || dist === 0) {
        p.dx = 0;
        p.dy = 0;
        return;
      }
      // Squared falloff: a firm shove up close, almost nothing at the edge.
      const fall = 1 - dist / PARTICLES.pointerRadius;
      const push = fall * fall * PARTICLES.pointerPush * influence;
      p.dx = (ox / dist) * push;
      p.dy = (oy / dist) * push;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(displace);

      // Lines first, so dots sit on top of their own connections.
      ctx.lineWidth = 1;
      // Cull on squared distance and only take the root for pairs that survive.
      // At this density the inner loop runs ~26k times a frame, and Math.hypot
      // on every one of those was the single most expensive thing here.
      const linkSq = PARTICLES.linkDistance * PARTICLES.linkDistance;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + a.dx;
        const ay = a.y + a.dy;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + b.dx;
          const by = b.y + b.dy;
          const dx = ax - bx;
          const dy = ay - by;
          const distSq = dx * dx + dy * dy;
          if (distSq > linkSq) continue;
          const dist = Math.sqrt(distSq);

          const strength = 1 - dist / PARTICLES.linkDistance;

          // Lines near the cursor glow, which reads as the field noticing you
          // rather than merely getting out of the way.
          let boost = 1;
          if (influence > 0.001) {
            const mx = (ax + bx) / 2 - pointer.x;
            const my = (ay + by) / 2 - pointer.y;
            const near = 1 - Math.min(1, Math.hypot(mx, my) / PARTICLES.pointerRadius);
            boost = 1 + near * near * (PARTICLES.pointerLineBoost - 1) * influence;
          }

          const alpha = Math.min(1, strength * PARTICLES.lineAlpha * boost);
          ctx.strokeStyle = `rgba(${goldParts}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(${goldParts}, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x + p.dx, p.y + p.dy, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function step(time) {
      // Clamp dt so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min(time - lastTime || 16, 50);
      lastTime = time;

      const wanted = pointer.active ? 1 : 0;
      influence += (wanted - influence) * PARTICLES.pointerEase;

      particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap rather than bounce — keeps the drift directionless.
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      });

      draw();
      rafId = window.requestAnimationFrame(step);
    }

    function play() {
      if (rafId !== null || reduceMotion.matches) return;
      if (!onScreen || document.hidden) return;
      lastTime = 0;
      rafId = window.requestAnimationFrame(step);
    }

    function pause() {
      if (rafId === null) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function start() {
      resize();
      if (reduceMotion.matches) {
        // Motion is off: paint the field once and leave it still.
        draw();
        return;
      }
      play();
    }

    // Pause when the hero scrolls away…
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
          if (onScreen) play();
          else pause();
        },
        { threshold: 0 }
      ).observe(hero);
    }

    // …and when the tab is hidden.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else play();
    });

    let resizeTimer = null;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          resize();
          if (reduceMotion.matches) draw();
        }, 150);
      },
      { passive: true }
    );

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        pause();
        influence = 0;
        particles.forEach((p) => {
          p.dx = 0;
          p.dy = 0;
        });
        draw();
      } else {
        play();
      }
    };
    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener("change", onMotionChange);
    } else if (reduceMotion.addListener) {
      reduceMotion.addListener(onMotionChange);
    }

    start();
  }

  /* ======================================================================
     Rolling tagline

     The settled line slides up out of a fixed-height window while the next
     slides in from below. Every phrase comes from content already in the repo:
     the tagline written in index.html, then the technical groups from
     skills-data.js in the order they are declared, split into short runs.
     Nothing invented.

     The animated span is aria-hidden and the real sentence sits beside it in a
     .visually-hidden span, so none of this reaches assistive tech.
     ====================================================================== */

  const ROLL = {
    durationMs: 620, // slide out / slide in
    holdMs: 3400, // pause on a settled phrase
    // Characters per rotating line. The window is a fixed two lines tall and
    // .hero__tagline is 30ch wide, so a phrase over roughly 46 characters wraps
    // to three lines and gets clipped. Budgeting by length rather than by item
    // count matters: three short skills fit, but "Security Awareness · Threat
    // Intelligence · Secure System Design" is 62 characters and would not.
    maxChars: 46,
  };

  function buildPhrases(seed) {
    const phrases = [seed];

    if (typeof SKILL_CATEGORIES === "undefined" || !Array.isArray(SKILL_CATEGORIES)) {
      return phrases;
    }

    SKILL_CATEGORIES.forEach((category) => {
      // `technical: false` marks a group as not belonging in a tech line.
      if (category.technical === false) return;
      let run = [];
      const flush = () => {
        if (run.length) phrases.push(run.join(" · "));
        run = [];
      };
      (category.skills || []).forEach((skill) => {
        const candidate = run.concat(skill).join(" · ");
        if (run.length && candidate.length > ROLL.maxChars) flush();
        run.push(skill);
      });
      flush();
    });

    return phrases;
  }

  function initTagline() {
    const target = document.getElementById("hero-type");
    const caret = document.getElementById("hero-caret");
    if (!target) return;

    const seed = target.textContent.trim();

    // Motion off: leave the tagline exactly as authored in the HTML. Nothing
    // below runs, so the DOM is never restructured either.
    if (reduceMotion.matches) return;

    const phrases = buildPhrases(seed);
    if (phrases.length < 2) return; // nothing to rotate through

    // The caret belonged to the typewriter — a blinking bar makes no sense
    // against a line that arrives whole. Left hidden.
    if (caret) caret.hidden = true;

    // Turn the span into a clipping window holding one absolutely-positioned
    // line. Both lines are absolute during a roll so neither contributes to
    // height, which is what keeps the CTAs below from shifting.
    target.classList.add("hero__type--roll");
    target.textContent = "";

    function makeLine(text) {
      const line = document.createElement("span");
      line.className = "hero__line";
      line.textContent = text;
      return line;
    }

    let currentEl = makeLine(seed);
    target.appendChild(currentEl);

    let index = 0;
    let holdTimer = null;
    let rollTimer = null;

    function roll(next, done) {
      const incoming = makeLine(next);
      incoming.style.transform = "translateY(100%)";
      incoming.style.opacity = "0";
      target.appendChild(incoming);

      const outgoing = currentEl;

      // Force a style flush so the browser has a start state to animate from —
      // without this both properties are set in the same frame and the
      // transition never runs.
      void incoming.offsetHeight;

      incoming.classList.add("is-moving");
      outgoing.classList.add("is-moving");
      incoming.style.transform = "translateY(0)";
      incoming.style.opacity = "1";
      outgoing.style.transform = "translateY(-100%)";
      outgoing.style.opacity = "0";

      currentEl = incoming;
      rollTimer = window.setTimeout(() => {
        rollTimer = null;
        outgoing.remove();
        incoming.classList.remove("is-moving");
        done();
      }, ROLL.durationMs + 40);
    }

    function advance() {
      index = (index + 1) % phrases.length;
      roll(phrases[index], () => {
        holdTimer = window.setTimeout(advance, ROLL.holdMs);
      });
    }

    function stop() {
      window.clearTimeout(holdTimer);
      window.clearTimeout(rollTimer);
      holdTimer = null;
      rollTimer = null;
    }

    // Don't burn timers on a hidden tab. Resuming snaps to the settled line
    // rather than picking up mid-roll.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else if (holdTimer === null && rollTimer === null) {
        holdTimer = window.setTimeout(advance, ROLL.holdMs);
      }
    });

    holdTimer = window.setTimeout(advance, ROLL.holdMs);
  }

  initPointer();
  initParticles();
  initTagline();
})();
