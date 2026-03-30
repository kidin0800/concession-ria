export function initCounters() {
    const countersSection = document.getElementById('counters');
    if (!countersSection)
        return;
    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    observer.observe(countersSection);
}
function animateCounters() {
    const counters = document.querySelectorAll('.about__counter');
    counters.forEach(counter => {
        const numberEl = counter.querySelector('.about__counter-number');
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        if (!numberEl || target === 0)
            return;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                numberEl.textContent = Math.floor(current).toString();
                requestAnimationFrame(updateCounter);
            }
            else {
                numberEl.textContent = target.toString();
            }
        };
        requestAnimationFrame(updateCounter);
    });
}
//# sourceMappingURL=counter.js.map