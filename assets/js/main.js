/* ============================================================
   BERGMANN & CO. — Main JavaScript v4
   GSAP Animations, Lightbox, Counters, Particles,
   Industry Anims, Cursor Glow
   ============================================================ */

// ---- WEB3FORMS ACCESS KEY ----
// Get your free key at: https://web3forms.com (enter your email, copy the key)
const WEB3FORMS_KEY = '68766cf6-42c2-4690-ad7b-5592827cf4ae';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('smooth', '0.16, 1, 0.3, 1');

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderLogo = loader.querySelector('.loader__logo');

  gsap.to(loaderLogo, { opacity: 1, duration: 0.6, ease: 'power2.out' });

  gsap.to(loaderProgress, {
    width: '100%',
    duration: 1.4,
    ease: 'smooth',
    delay: 0.3,
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.classList.add('is-done');
          loader.style.display = 'none';
          animateHero();
          initScrollAnimations();
          initProcessTimeline();
          initCounters();
          createParticles();
          initCursorGlow();
          initFeatureAnims();
          initIndustryAnims();
        }
      });
    }
  });

  // ---- NAVIGATION ----
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link:not(.js-open-lightbox)');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
    document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('contactLightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function openLightbox() {
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    burger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      contactForm.style.display = '';
      formSuccess.classList.remove('is-visible');
      contactForm.reset();
    }, 400);
  }

  document.querySelectorAll('.js-open-lightbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox();
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ---- SHARED SUBMIT HELPER ----
  async function submitToWeb3Forms(data) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...data }),
    });
    return res.json();
  }

  // Lightbox contact form
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    const fd = new FormData(contactForm);
    try {
      const result = await submitToWeb3Forms({
        subject: 'Neue Kontaktanfrage – Bergmann & Co.',
        from_name: `${fd.get('firstName')} ${fd.get('lastName')}`,
        email: fd.get('email'),
        company: fd.get('company') || '–',
        message: fd.get('message') || '–',
      });
      if (result.success) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('is-visible');
        setTimeout(closeLightbox, 3000);
      } else {
        throw new Error('failed');
      }
    } catch {
      submitBtn.textContent = 'Fehler – bitte erneut versuchen';
      submitBtn.disabled = false;
    }
  });

  // CTA band form
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = ctaForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.textContent = 'Wird gesendet...';
      submitBtn.disabled = true;

      const fd = new FormData(ctaForm);
      try {
        const result = await submitToWeb3Forms({
          subject: 'Neue Anfrage (CTA) – Bergmann & Co.',
          from_name: fd.get('ctaName'),
          email: fd.get('ctaEmail'),
          message: fd.get('ctaMessage') || '–',
        });
        if (result.success) {
          submitBtn.textContent = 'Gesendet ✓';
          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            ctaForm.reset();
          }, 2500);
        } else {
          throw new Error('failed');
        }
      } catch {
        submitBtn.textContent = 'Fehler – erneut versuchen';
        submitBtn.disabled = false;
      }
    });
  }

  // ---- HERO ANIMATION ----
  function animateHero() {
    const heroElements = document.querySelectorAll('.hero .anim-fade-up');
    heroElements.forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0) + 0.1;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'smooth'
      });
    });
  }

  // ---- COUNTER ANIMATION ----
  function initCounters() {
    const counters = document.querySelectorAll('.hero__stat-value');
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.count);
      const decimals = parseInt(counter.dataset.decimals || 0);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          counter.textContent = obj.val.toFixed(decimals);
        }
      });
    });
  }

  // ---- PARTICLES ----
  function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const isMobile = window.innerWidth <= 767;
    const count = isMobile ? 21 : 35;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero__particle';
      container.appendChild(particle);

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 3 + Math.random() * 5;
      const duration = 5 + Math.random() * 9;
      const delay = Math.random() * 1.2;
      const baseOpacity = 0.28 + Math.random() * 0.32;

      particle.style.left = x + '%';
      particle.style.top = y + '%';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      gsap.to(particle, {
        opacity: baseOpacity,
        y: -60 - Math.random() * 80,
        x: -30 + Math.random() * 60,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // ---- CURSOR GLOW ON SERVICE CARDS ----
  function initCursorGlow() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const glowInner = card.querySelector('.service-card__glow-inner');
      if (!glowInner) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowInner.style.left = x + 'px';
        glowInner.style.top = y + 'px';
      });
    });
  }

  // ---- FEATURE CARD ANIMATIONS (GSAP, looping) ----
  function initFeatureAnims() {
    // --- Alternativen: branching paths draw out from source ---
    const fiSource = document.querySelector('.fi-source');
    const fiPaths = document.querySelectorAll('.fi-path');
    const fiEnds = document.querySelectorAll('.fi-end');

    if (fiSource && fiPaths.length) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // Source pulses
      tl.to(fiSource, { opacity: 0.4, attr: { r: 4 }, duration: 0.5, ease: 'power2.out' });

      // Paths draw out staggered
      fiPaths.forEach((p, i) => {
        tl.to(p, {
          strokeDashoffset: 0,
          opacity: 0.35,
          duration: 0.8,
          ease: 'power2.inOut'
        }, 0.3 + i * 0.15);
      });

      // End dots appear
      fiEnds.forEach((e, i) => {
        tl.to(e, { opacity: 0.4, duration: 0.4, ease: 'power2.out' }, 0.8 + i * 0.12);
      });

      // Hold
      tl.to({}, { duration: 2 });

      // Fade out
      tl.to([fiSource, ...fiPaths, ...fiEnds], {
        opacity: 0, duration: 0.8, ease: 'power2.inOut'
      });
      // Reset
      tl.set(fiPaths, { strokeDashoffset: 60 }, '>');
      tl.set(fiSource, { attr: { r: 3 }, opacity: 0.25 }, '<');
      tl.set(fiEnds, { opacity: 0.15 }, '<');
    }

    // --- Strukturierte Produkte: tiles assemble ---
    const fiTiles = document.querySelectorAll('.fi-tile');
    const fiConns = document.querySelectorAll('.fi-conn');

    if (fiTiles.length) {
      const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      fiTiles.forEach((tile, i) => {
        tl2.to(tile, {
          opacity: 0.3,
          attr: { 'fill-opacity': 0.08 },
          duration: 0.5,
          ease: 'power2.out'
        }, i * 0.2);
      });

      fiConns.forEach((conn, i) => {
        tl2.to(conn, { opacity: 0.25, duration: 0.4, ease: 'power2.out' }, 0.3 + i * 0.2);
      });

      tl2.to({}, { duration: 2 });

      tl2.to([...fiTiles, ...fiConns], {
        opacity: 0, duration: 0.8, ease: 'power2.inOut'
      });
      tl2.set(fiTiles, { opacity: 0.12, attr: { 'fill-opacity': 0.03 } }, '>');
      tl2.set(fiConns, { opacity: 0.1 }, '<');
    }

    // --- Rückgang: decline line draws with dot sliding down ---
    const fiDecline = document.querySelector('.fi-decline');
    const fiDeclineDot = document.querySelector('.fi-decline-dot');
    const fiArea = document.querySelector('.fi-area');

    if (fiDecline) {
      const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl3.to(fiDecline, {
        strokeDashoffset: 0,
        opacity: 0.35,
        duration: 1.2,
        ease: 'power2.inOut'
      });

      if (fiDeclineDot) {
        tl3.to(fiDeclineDot, { opacity: 0.5, duration: 0.3 }, 0);
        tl3.to(fiDeclineDot, {
          attr: { cx: 56, cy: 48 },
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0);
      }

      if (fiArea) {
        tl3.to(fiArea, { opacity: 0.04, duration: 0.6, ease: 'power2.out' }, 0.8);
      }

      tl3.to({}, { duration: 2 });

      tl3.to([fiDecline, fiDeclineDot, fiArea].filter(Boolean), {
        opacity: 0, duration: 0.8, ease: 'power2.inOut'
      });
      tl3.set(fiDecline, { strokeDashoffset: 70 }, '>');
      if (fiDeclineDot) tl3.set(fiDeclineDot, { attr: { cx: 8, cy: 16 }, opacity: 0.3 }, '<');
      if (fiArea) tl3.set(fiArea, { opacity: 0 }, '<');
    }
  }

  // ---- INDUSTRY CARD ANIMATIONS (GSAP, looping) ----
  function initIndustryAnims() {
    // --- Mittelstand: bars grow up ---
    const growBars = document.querySelectorAll('.ind-grow');
    if (growBars.length) {
      const heights = [15, 30, 45, 63];
      const yOffsets = [60, 45, 30, 12];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      growBars.forEach((bar, i) => {
        tl.to(bar, {
          attr: { height: heights[i], y: yOffsets[i] },
          opacity: 0.1 + i * 0.06,
          duration: 0.8,
          ease: 'power2.out'
        }, i * 0.15);
      });

      // Trend line
      const growLine = document.querySelector('.ind-grow-line');
      const growDot = document.querySelector('.ind-grow-dot');
      if (growLine) {
        tl.to(growLine, { opacity: 0.2, duration: 0.6, ease: 'power2.out' }, 0.5);
      }
      if (growDot) {
        tl.to(growDot, { opacity: 0.4, duration: 0.4, ease: 'power2.out' }, 0.9);
      }

      // Hold, then fade out
      tl.to({}, { duration: 2 });
      tl.to([...growBars, growLine, growDot].filter(Boolean), {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
      // Reset bar heights
      growBars.forEach((bar) => {
        tl.set(bar, { attr: { height: 0, y: 75 } }, '>');
      });
      if (growLine) tl.set(growLine, { opacity: 0 }, '<');
      if (growDot) tl.set(growDot, { opacity: 0 }, '<');
    }

    // --- Real Estate: buildings rise up ---
    const blds = document.querySelectorAll('.ind-bld');
    if (blds.length) {
      const bldData = [
        { h: 35, y: 40 },  // bld--1
        { h: 55, y: 20 },  // bld--2
        { h: 40, y: 35 },  // bld--3
        { h: 25, y: 50 }   // bld--4
      ];
      const wins = document.querySelector('.ind-wins');
      const winRects = wins ? wins.querySelectorAll('rect') : [];

      const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      blds.forEach((bld, i) => {
        tl2.to(bld, {
          attr: { height: bldData[i].h, y: bldData[i].y },
          opacity: 0.12 + i * 0.04,
          duration: 1,
          ease: 'power2.out'
        }, i * 0.2);
      });

      // Windows fade in
      if (winRects.length) {
        tl2.to(winRects, {
          opacity: 0.12,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }, 0.8);
      }

      tl2.to({}, { duration: 2 });
      tl2.to([...blds, ...winRects], {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
      blds.forEach((bld) => {
        tl2.set(bld, { attr: { height: 0, y: 75 } }, '>');
      });
      if (winRects.length) {
        tl2.set(winRects, { opacity: 0 }, '<');
      }
    }

    // --- High Yield: curve draws with travelling dot ---
    const curve = document.querySelector('.ind-curve');
    const curveArea = document.querySelector('.ind-curve-area');
    const curveDot = document.querySelector('.ind-curve-dot');
    if (curve) {
      const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl3.to(curve, {
        strokeDashoffset: 0,
        opacity: 0.3,
        duration: 2,
        ease: 'power2.inOut'
      });

      if (curveDot) {
        tl3.to(curveDot, {
          opacity: 0.5,
          duration: 0.3
        }, 0);
        // Animate dot along the curve path using motionPath-like manual keyframes
        tl3.to(curveDot, {
          keyframes: [
            { attr: { cx: 5, cy: 55 }, duration: 0 },
            { attr: { cx: 25, cy: 42 }, duration: 0.4, ease: 'none' },
            { attr: { cx: 45, cy: 48 }, duration: 0.4, ease: 'none' },
            { attr: { cx: 55, cy: 44 }, duration: 0.3, ease: 'none' },
            { attr: { cx: 75, cy: 36 }, duration: 0.4, ease: 'none' },
            { attr: { cx: 95, cy: 42 }, duration: 0.5, ease: 'none' }
          ]
        }, 0);
      }

      if (curveArea) {
        tl3.to(curveArea, { opacity: 0.03, duration: 0.8, ease: 'power2.out' }, 1);
      }

      tl3.to({}, { duration: 2 });
      tl3.to([curve, curveArea, curveDot].filter(Boolean), {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
      tl3.set(curve, { strokeDashoffset: 200 }, '>');
      if (curveDot) tl3.set(curveDot, { attr: { cx: 5, cy: 55 }, opacity: 0 }, '<');
      if (curveArea) tl3.set(curveArea, { opacity: 0 }, '<');
    }

    // --- Emissionen: network nodes + pulsing links ---
    const netLinks = document.querySelectorAll('.ind-net-link');
    const netNodes = document.querySelectorAll('.ind-net-node');
    const netPulses = document.querySelectorAll('.ind-net-pulse');
    if (netNodes.length) {
      const tl4 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // Center node appears
      tl4.to('.ind-net-node--c', { opacity: 0.3, duration: 0.5, ease: 'power2.out' });

      // Links draw out
      tl4.to(netLinks, {
        opacity: 0.12,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      }, 0.2);

      // Outer nodes appear
      tl4.to(['.ind-net-node--1', '.ind-net-node--2', '.ind-net-node--3', '.ind-net-node--4'], {
        opacity: 0.25,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.4);

      // Pulse dots travel
      if (netPulses.length >= 2) {
        tl4.to(netPulses[0], {
          keyframes: [
            { attr: { cx: 50, cy: 40 }, opacity: 0.5, duration: 0 },
            { attr: { cx: 20, cy: 16 }, duration: 0.8, ease: 'power2.inOut' },
            { opacity: 0, duration: 0.2 }
          ]
        }, 1.2);
        tl4.to(netPulses[1], {
          keyframes: [
            { attr: { cx: 50, cy: 40 }, opacity: 0.5, duration: 0 },
            { attr: { cx: 80, cy: 64 }, duration: 0.8, ease: 'power2.inOut' },
            { opacity: 0, duration: 0.2 }
          ]
        }, 1.5);
      }

      tl4.to({}, { duration: 1.5 });
      tl4.to([...netLinks, ...netNodes, ...netPulses], {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }

  // ---- SCROLL ANIMATIONS ----
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.anim-fade-up:not(.hero .anim-fade-up)');

    elements.forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'smooth'
          });
        }
      });
    });
  }

  // ---- PROCESS TIMELINE ----
  function initProcessTimeline() {
    const steps = document.querySelectorAll('.process__step');
    const lineFill = document.getElementById('processLineFill');

    if (!steps.length || !lineFill) return;

    const isMobile = window.innerWidth <= 767;

    // GPU-accelerated scaleY tween driven by scroll scrub
    gsap.to(lineFill, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.process__timeline',
        start: isMobile ? 'top 85%' : 'top 72%',
        end: isMobile ? 'bottom 15%' : 'bottom 45%',
        scrub: 1.8,
      }
    });

    // Activate each step as it enters view
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 68%',
        onEnter: () => step.classList.add('is-active'),
        onLeaveBack: () => step.classList.remove('is-active'),
      });
    });
  }

  // ---- PARALLAX ----
  gsap.utils.toArray('.hero__grid-overlay').forEach(el => {
    gsap.to(el, {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  });

  // ---- FEATURE CARD STAGGER ----
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length) {
    ScrollTrigger.create({
      trigger: '.features__grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(featureCards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'smooth', overwrite: true }
        );
      }
    });
  }

  // ---- INDUSTRY CARD STAGGER ----
  const industryCards = document.querySelectorAll('.industry-card');
  if (industryCards.length) {
    ScrollTrigger.create({
      trigger: '.industries__grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(industryCards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'smooth', overwrite: true }
        );
      }
    });
  }

  // ---- NAV LOGO ----
  const navLogo = document.querySelector('.nav__logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
