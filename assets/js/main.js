/* ============================================================
   BERGMANN & CO. — Main JavaScript
   GSAP Animations, Loader, Scroll Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('smooth', '0.16, 1, 0.3, 1');

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderLogo = loader.querySelector('.loader__logo');

  // Animate logo in
  gsap.to(loaderLogo, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  });

  // Progress bar
  gsap.to(loaderProgress, {
    width: '100%',
    duration: 1.4,
    ease: 'smooth',
    delay: 0.3,
    onComplete: () => {
      // Fade out loader
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.classList.add('is-done');
          loader.style.display = 'none';
          // Trigger hero animations
          animateHero();
          // Init scroll animations
          initScrollAnimations();
          initProcessTimeline();
        }
      });
    }
  });

  // ---- NAVIGATION ----
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Burger menu
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
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- HERO ANIMATION ----
  function animateHero() {
    const heroElements = document.querySelectorAll('.hero .anim-fade-up');
    heroElements.forEach((el, i) => {
      const delay = parseFloat(el.dataset.delay || 0) + 0.1;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: delay,
        ease: 'smooth'
      });
    });
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
            delay: delay,
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

    // Animate process line fill on scroll
    ScrollTrigger.create({
      trigger: '.process__timeline',
      start: 'top 70%',
      end: 'bottom 50%',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(lineFill, {
          height: `${progress * 100}%`,
          duration: 0.2,
          ease: 'none'
        });

        // Activate steps as line passes them
        steps.forEach((step, i) => {
          const stepProgress = (i + 0.5) / steps.length;
          if (progress >= stepProgress) {
            step.classList.add('is-active');
          } else {
            step.classList.remove('is-active');
          }
        });
      },
      scrub: false
    });

    // Create the scroll trigger with scrub for smooth progress
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

  // ---- PARALLAX-LIKE EFFECTS ----
  // Subtle movement for section backgrounds
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

  // ---- SERVICE CARD HOVER GLOW FOLLOW ----
  document.querySelectorAll('.service-card').forEach(card => {
    const glow = card.querySelector('.service-card__glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percent = (x / width) * 100;
      glow.style.left = `${percent - 30}%`;
      glow.style.right = `${100 - percent - 30}%`;
    });
  });

  // ---- INDUSTRY CARD STAGGER ON SCROLL ----
  const industryCards = document.querySelectorAll('.industry-card');
  if (industryCards.length) {
    ScrollTrigger.create({
      trigger: '.industries__grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(industryCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'smooth',
            overwrite: true
          }
        );
      }
    });
  }

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
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'smooth',
            overwrite: true
          }
        );
      }
    });
  }

  // ---- NAV LOGO SCROLL LINK ----
  const navLogo = document.querySelector('.nav__logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
