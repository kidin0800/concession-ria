export function initShowroom() {
    const stage = document.getElementById('showroomStage');
    const car = document.getElementById('showroomCar');
    if (!stage || !car)
        return;
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let targetRotation = 0;
    let autoRotate = true;
    let autoRotateId;
    let resumeTimeout;
    // Auto-rotate
    function startAutoRotate() {
        autoRotate = true;
        function animate() {
            if (!autoRotate)
                return;
            targetRotation += 0.3;
            currentRotation += (targetRotation - currentRotation) * 0.05;
            car.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
            autoRotateId = requestAnimationFrame(animate);
        }
        autoRotateId = requestAnimationFrame(animate);
    }
    function stopAutoRotate() {
        autoRotate = false;
        cancelAnimationFrame(autoRotateId);
    }
    // Smooth rotation loop
    function smoothUpdate() {
        if (isDragging) {
            currentRotation += (targetRotation - currentRotation) * 0.15;
            car.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
            requestAnimationFrame(smoothUpdate);
        }
    }
    // Mouse events
    stage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        stopAutoRotate();
        clearTimeout(resumeTimeout);
        smoothUpdate();
        e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging)
            return;
        const deltaX = e.clientX - startX;
        targetRotation = currentRotation + deltaX * 0.8;
    });
    window.addEventListener('mouseup', () => {
        if (!isDragging)
            return;
        isDragging = false;
        currentRotation = targetRotation;
        // Resume auto-rotate after 3 seconds
        resumeTimeout = window.setTimeout(() => {
            startAutoRotate();
        }, 3000);
    });
    // Touch events
    stage.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoRotate();
        clearTimeout(resumeTimeout);
        smoothUpdate();
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (!isDragging)
            return;
        const deltaX = e.touches[0].clientX - startX;
        targetRotation = currentRotation + deltaX * 0.8;
    }, { passive: true });
    window.addEventListener('touchend', () => {
        if (!isDragging)
            return;
        isDragging = false;
        currentRotation = targetRotation;
        resumeTimeout = window.setTimeout(() => {
            startAutoRotate();
        }, 3000);
    });
    // Start auto-rotate
    startAutoRotate();
}
//# sourceMappingURL=showroom.js.map