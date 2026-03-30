export function initTheme(): void {
  const switcher = document.getElementById('themeSwitcher') as HTMLElement;
  if (!switcher) return;

  const buttons = switcher.querySelectorAll<HTMLButtonElement>('.theme-switcher__btn');

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

  function applyTheme(theme: string): void {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function setActiveButton(theme: string): void {
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }
}
