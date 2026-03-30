export function initNavbar(): void {
  const navbar = document.getElementById('navbar') as HTMLElement;
  const hamburger = document.getElementById('hamburger') as HTMLButtonElement;
  const navMenu = document.getElementById('navMenu') as HTMLUListElement;

  // Scroll: transparent → solid
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  const navLinks = navMenu.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}
