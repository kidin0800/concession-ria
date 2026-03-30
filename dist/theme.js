export function initTheme() {
    const switcher = document.getElementById('themeSwitcher');
    if (!switcher)
        return;
    const buttons = switcher.querySelectorAll('.theme-switcher__btn');
    // Load saved theme
    const saved = localStorage.getItem('grandAutoTheme') || 'default';
    applyTheme(saved);
    setActiveButton(saved);
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme || 'default';
            applyTheme(theme);
            setActiveButton(theme);
            localStorage.setItem('grandAutoTheme', theme);
        });
    });
    function applyTheme(theme) {
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        }
        else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
    function setActiveButton(theme) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }
}
//# sourceMappingURL=theme.js.map