// Hero behaviour: the ambient gold particle field and the rotating typewriter
// tagline. Both honour prefers-reduced-motion.

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ======================================================================
     Particle / constellation field
     Single canvas, capped particle count, and the loop is suspended whenever
     the tab is hidden or the hero has scrolled out of view.
     ====================================================================== */

  const PARTICLES = {
    areaPerParticle: 17000, // one particle per ~17000 css px² …
    maxCount: 90, //           … capped here regardless of viewport size
    minCount: 18,
    linkDistance: 132, // px within which two particles are joined by a line
    speed: 0.017, // px per ms
    radius: [0.7, 1.9],
    dotAlpha: [0.25, 0.75],
    lineAlpha: 0.22,
    maxDpr: 2, // retina is enough; 3x costs a lot for a background
  };

  function initParticles() {
    const canvas = document.getElementById("hero-particles");
    const hero = canvas && canvas.closest(".hero");
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

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Lines first, so dots sit on top of their own connections.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > PARTICLES.linkDistance) continue;

          const strength = 1 - dist / PARTICLES.linkDistance;
          ctx.strokeStyle = `rgba(${goldParts}, ${
            strength * PARTICLES.lineAlpha
          })`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(${goldParts}, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function step(time) {
      // Clamp dt so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min(time - lastTime || 16, 50);
      lastTime = time;

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
     Rotating typewriter tagline

     Every phrase comes from content already in the repo: the tagline written
     in index.html, then one line per technical group from skills-data.js, in
     the order they are declared. Nothing invented.

     This used to read the tech tags off projects-data.js. Those were removed
     when the stack moved to living in exactly one place, so it reads the Tech
     Stack list instead — which is now the single source for it.
     ====================================================================== */

  const TYPE = {
    typeMs: 45,
    eraseMs: 24,
    holdMs: 2100, // pause on a completed phrase
    gapMs: 420, // pause after erasing, before the next phrase
  };

  function buildPhrases(seed) {
    const phrases = [seed];

    if (typeof SKILL_CATEGORIES === "undefined" || !Array.isArray(SKILL_CATEGORIES)) {
      return phrases;
    }

    SKILL_CATEGORIES.forEach((category) => {
      // `technical: false` marks a group as not belonging in a tech line.
      if (category.technical === false) return;
      const skills = category.skills || [];
      if (skills.length) phrases.push(skills.join(" · "));
    });

    return phrases;
  }

  function initTypewriter() {
    const target = document.getElementById("hero-type");
    const caret = document.getElementById("hero-caret");
    if (!target) return;

    const seed = target.textContent.trim();

    // Motion off: leave the tagline exactly as authored in the HTML.
    if (reduceMotion.matches) return;

    const phrases = buildPhrases(seed);
    if (phrases.length < 2) return; // nothing to rotate through

    if (caret) caret.hidden = false;

    let index = 0;
    let chars = seed.length;
    let erasing = true;
    let timer = null;

    function tick() {
      const phrase = phrases[index];

      if (erasing) {
        chars -= 1;
        target.textContent = phrase.slice(0, Math.max(chars, 0));
        if (chars <= 0) {
          erasing = false;
          index = (index + 1) % phrases.length;
          timer = window.setTimeout(tick, TYPE.gapMs);
          return;
        }
        timer = window.setTimeout(tick, TYPE.eraseMs);
        return;
      }

      chars += 1;
      target.textContent = phrase.slice(0, chars);
      if (chars >= phrase.length) {
        erasing = true;
        timer = window.setTimeout(tick, TYPE.holdMs);
        return;
      }
      timer = window.setTimeout(tick, TYPE.typeMs);
    }

    // Don't burn timers on a hidden tab.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearTimeout(timer);
        timer = null;
      } else if (timer === null) {
        tick();
      }
    });

    // Hold the authored tagline briefly before the first erase.
    timer = window.setTimeout(tick, TYPE.holdMs);
  }

  initParticles();
  initTypewriter();
})();
