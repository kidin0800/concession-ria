/* ===== Creative Giants Animation System ===== */
/* Standalone vanilla JS - loads after GSAP, ScrollTrigger, CustomEase, Lenis, SplitType */

(function () {
  'use strict';

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Guard: ensure libs loaded
    if (typeof gsap === 'undefined') {
      console.warn('[CG] GSAP not loaded');
      return;
    }

    // Register plugins
    gsap.registerPlugin(ScrollTrigger);
    if (typeof CustomEase !== 'undefined') {
      gsap.registerPlugin(CustomEase);
      CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
    }

    initLenis();
    initPageTransition();
    initLineReveal();
    initFadeUp();
    initCustomCursor();
    initParallax();
    initHeroIntro();
  }

  /* ===== Lenis Smooth Scroll ===== */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    var lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7
    });

    // Connect Lenis to GSAP ticker
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Connect ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add class to html
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Store reference for potential external use
    window.__lenis = lenis;
  }

  /* ===== Page Transition ===== */
  function initPageTransition() {
    var cols = document.querySelectorAll('.page-transition__col');
    if (!cols.length) return;

    var tl = gsap.timeline({
      delay: 0.3
    });

    tl.to(cols, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      ease: 'main',
      stagger: {
        amount: 0.3,
        from: 'center'
      }
    });

    tl.set(cols[0].parentElement, { display: 'none' });
  }

  /* ===== Line-by-Line Text Reveal ===== */
  function initLineReveal() {
    if (typeof SplitType === 'undefined') {
      console.warn('[CG] SplitType not loaded');
      return;
    }

    var els = document.querySelectorAll('[data-line-reveal]');

    els.forEach(function (el) {
      // Split into lines
      var split = new SplitType(el, { types: 'lines' });

      // Wrap each line's content for overflow hidden reveal
      split.lines.forEach(function (line) {
        var wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.paddingBottom = '0.05em';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'main',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  /* ===== Fade-Up Reveals ===== */
  function initFadeUp() {
    var els = document.querySelectorAll('[data-fade]');

    els.forEach(function (el) {
      var yVal = parseInt(el.getAttribute('data-y') || '50', 10);

      gsap.from(el, {
        y: yVal,
        opacity: 0,
        duration: 0.8,
        ease: 'main',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: function () {
            el.classList.add('is-visible');
          }
        }
      });
    });
  }

  /* ===== Custom Cursor ===== */
  function initCustomCursor() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    var cursor = document.querySelector('.custom-cursor');
    var label = document.querySelector('.custom-cursor__label');
    if (!cursor || !label) return;

    // Show cursor
    cursor.style.opacity = '1';

    var xTo = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3' });
    var yTo = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3' });
    var lxTo = gsap.quickTo(label, 'left', { duration: 0.5, ease: 'power3' });
    var lyTo = gsap.quickTo(label, 'top', { duration: 0.5, ease: 'power3' });

    document.addEventListener('mousemove', function (e) {
      xTo(e.clientX);
      yTo(e.clientY);
      lxTo(e.clientX);
      lyTo(e.clientY - 30);
    });

    // Data-cursor elements
    var cursorTargets = document.querySelectorAll('[data-cursor]');
    cursorTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('custom-cursor--active');
        label.textContent = el.getAttribute('data-cursor');
        label.classList.add('custom-cursor__label--visible');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('custom-cursor--active');
        label.classList.remove('custom-cursor__label--visible');
      });
    });
  }

  /* ===== Parallax ===== */
  function initParallax() {
    // Hero car parallax
    var heroImg = document.querySelector('.hero__car-img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // About bg text parallax (slow drift)
    var aboutBgText = document.querySelector('.about__bg-text');
    if (aboutBgText) {
      gsap.to(aboutBgText, {
        yPercent: -20,
        xPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Hero stats parallax (rises slower)
    var heroStats = document.querySelector('.hero__stats');
    if (heroStats) {
      gsap.to(heroStats, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Features section - numbers parallax
    var featureNums = document.querySelectorAll('.features__num');
    featureNums.forEach(function(num) {
      gsap.to(num, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: num,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });
  }

  /* ===== Hero Intro Animation ===== */
  function initHeroIntro() {
    var tl = gsap.timeline({ delay: 1.2 });

    var heroLabel = document.querySelector('.hero__label');
    var heroTitle = document.querySelector('.hero__title');
    var heroDesc = document.querySelector('.hero__description');
    var heroCta = document.querySelector('.hero__cta');
    var heroStats = document.querySelector('.hero__stats');
    var heroImg = document.querySelector('.hero__car-img');

    // Set initial states
    var elements = [heroLabel, heroDesc, heroCta, heroStats].filter(Boolean);
    gsap.set(elements, { opacity: 0, y: 30 });
    if (heroImg) gsap.set(heroImg, { opacity: 0, x: 60, scale: 0.95 });

    // Animate in sequence
    if (heroLabel) tl.to(heroLabel, { opacity: 1, y: 0, duration: 0.6, ease: 'main' });
    if (heroTitle) {
      // Title may already be handled by line-reveal, just ensure visibility
      tl.to(heroTitle, { opacity: 1, duration: 0.4, ease: 'main' }, '-=0.3');
    }
    if (heroDesc) tl.to(heroDesc, { opacity: 1, y: 0, duration: 0.6, ease: 'main' }, '-=0.2');
    if (heroCta) tl.to(heroCta, { opacity: 1, y: 0, duration: 0.6, ease: 'main' }, '-=0.3');
    if (heroImg) tl.to(heroImg, { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'main' }, '-=0.5');
    if (heroStats) tl.to(heroStats, { opacity: 1, y: 0, duration: 0.6, ease: 'main' }, '-=0.4');
  }

})();
