export function initScroll() {
    // === Loading Screen ===
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 2000);
        });
        document.body.style.overflow = 'hidden';
    }
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (!targetId)
                return;
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = 70;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // === Professional Scroll Animation System ===
    // Inspired by Champions4Good (GSAP ScrollTrigger patterns)
    // 1. Fade-in elements with stagger support
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Stagger: animate children sequentially
                const staggerChildren = el.querySelectorAll('.stagger-child');
                if (staggerChildren.length > 0) {
                    staggerChildren.forEach((child, i) => {
                        const childEl = child;
                        childEl.style.transitionDelay = `${i * 0.1}s`;
                        childEl.classList.add('visible');
                    });
                }
                el.classList.add('visible');
                fadeObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    fadeElements.forEach(el => fadeObserver.observe(el));
    // 2. Scale-in elements (cards, images)
    const scaleElements = document.querySelectorAll('.scale-in');
    const scaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scaleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });
    scaleElements.forEach(el => scaleObserver.observe(el));
    // 3. Clip reveal text (bottom-up reveal)
    const clipElements = document.querySelectorAll('.clip-reveal');
    const clipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                clipObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    });
    clipElements.forEach(el => clipObserver.observe(el));
    // 4. Hero load animation - trigger after loader
    const revealElements = document.querySelectorAll('.reveal-text');
    const heroVisual = document.querySelector('.hero__visual');
    const loaderDelay = loader ? 2200 : 300;
    setTimeout(() => {
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
        if (heroVisual) {
            heroVisual.classList.add('visible');
        }
    }, loaderDelay);
    // 5. Parallax elements on scroll
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallax || '0.1');
                        const rect = el.getBoundingClientRect();
                        const inView = rect.top < window.innerHeight && rect.bottom > 0;
                        if (inView) {
                            const offset = (scrollY - el.offsetTop + window.innerHeight) * speed;
                            el.style.transform = `translate3d(0, ${offset}px, 0)`;
                        }
                    });
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }
    // 6. Stagger grid children automatically
    const staggerGrids = document.querySelectorAll('.stagger-grid');
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, i) => {
                    const el = child;
                    el.style.transitionDelay = `${i * 0.12}s`;
                    el.classList.add('stagger-visible');
                });
                gridObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });
    staggerGrids.forEach(el => gridObserver.observe(el));
}
//# sourceMappingURL=scroll.js.map