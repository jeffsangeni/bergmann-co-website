/* ============================================================
   BERGMANN & CO. — Main JavaScript v2
   GSAP Animations, Lightbox, Counters, Particles
   ============================================================ */

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
    // Close mobile menu if open
    burger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    // Reset form after close animation
    setTimeout(() => {
      contactForm.style.display = '';
      formSuccess.classList.remove('is-visible');
      contactForm.reset();
    }, 400);
  }

  // Bind all CTA buttons to open lightbox
  document.querySelectorAll('.js-open-lightbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox();
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  // Close on backdrop click
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.classList.add('is-visible');
      // Auto-close after 3s
      setTimeout(closeLightbox, 3000);
    }, 800);
  });

  // CTA form submission
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = ctaForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.textContent = 'Gesendet!';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        ctaForm.reset();
      }, 2500);
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

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero__particle';
      container.appendChild(particle);

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 2 + Math.random() * 3;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 5;

      particle.style.left = x + '%';
      particle.style.top = y + '%';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      gsap.to(particle, {
        opacity: 0.08 + Math.random() * 0.08,
        y: -40 - Math.random() * 60,
        x: -20 + Math.random() * 40,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
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

    ScrollTrigger.create({
      trigger: '.process__timeline',
      start: 'top 70%',
      end: 'bottom 50%',
      scrub: 0.5,
      onUpdate: (self) => {
        lineFill.style.height = `${self.progress * 100}%`;

        steps.forEach((step, i) => {
          const stepProgress = (i + 0.3) / steps.length;
          if (self.progress >= stepProgress) {
            step.classList.add('is-active');
          } else {
            step.classList.remove('is-active');
          }
        });
      }
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
