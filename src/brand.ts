interface BrandVehicle {
  brand: string;
  model: string;
  year: string;
  price: number;
  km: string;
  fuel: string;
  transmission: string;
  power: string;
  color: string;
  image: string;
}

// Brand ambience: each brand has its own color atmosphere
interface BrandTheme {
  glow: string;       // radial glow color
  accent: string;     // accent for borders/details
  accentRgb: string;  // rgb values
  bg: string;         // subtle background tint
}

const brandThemes: Record<string, BrandTheme> = {
  'Mercedes-Benz': { glow: '#c0c0c0', accent: '#d4d4d4', accentRgb: '212,212,212', bg: '#0c0c0c' },
  'BMW':           { glow: '#1c69d4', accent: '#4a9af5', accentRgb: '74,154,245',  bg: '#060d18' },
  'Porsche':       { glow: '#c9a84c', accent: '#e8d48b', accentRgb: '201,168,76',  bg: '#100e06' },
  'Audi':          { glow: '#cc0000', accent: '#ff3333', accentRgb: '255,51,51',   bg: '#120505' },
  'CAOA Chery':    { glow: '#8b0000', accent: '#cc3333', accentRgb: '204,51,51',   bg: '#100404' },
  'Ferrari':       { glow: '#ff2800', accent: '#ff5533', accentRgb: '255,85,51',   bg: '#140804' },
};

const brandImages: Record<string, string> = {
  'Mercedes-Benz': 'assets/images/mercedes-sclass.png',
  'BMW': 'assets/images/bmw-serie7.png',
  'Porsche': 'assets/images/porsche-911.png',
  'Audi': 'assets/images/audi-a8.png',
  'CAOA Chery': 'assets/images/caoa-tiggo8.webp',
  'Ferrari': 'assets/images/ferrari-roma.png',
};

const vehicles: BrandVehicle[] = [
  { brand: 'Mercedes-Benz', model: 'S-Class 500', year: '2024', price: 1250000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '449 cv', color: 'Preto Obsidiana', image: 'assets/images/mercedes-sclass.png' },
  { brand: 'BMW', model: 'Série 7 740i', year: '2024', price: 980000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '380 cv', color: 'Branco Mineral', image: 'assets/images/bmw-serie7.png' },
  { brand: 'Porsche', model: '911 Turbo S', year: '2024', price: 1890000, km: '0', fuel: 'Gasolina', transmission: 'PDK', power: '650 cv', color: 'Cinza Quartzo', image: 'assets/images/porsche-911.png' },
  { brand: 'Audi', model: 'A8 L 60 TFSI', year: '2024', price: 890000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '460 cv', color: 'Azul Navarra', image: 'assets/images/audi-a8.png' },
  { brand: 'CAOA Chery', model: 'Tiggo 8 Pro', year: '2024', price: 230000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '186 cv', color: 'Preto Onyx', image: 'assets/images/caoa-tiggo8.webp' },
  { brand: 'Ferrari', model: 'Roma', year: '2023', price: 3200000, km: '1200', fuel: 'Gasolina', transmission: 'DCT', power: '620 cv', color: 'Rosso Corsa', image: 'assets/images/ferrari-roma.png' },
  { brand: 'Mercedes-Benz', model: 'AMG GT 63 S', year: '2024', price: 1680000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '639 cv', color: 'Cinza Selenita', image: 'assets/images/mercedes-sclass.png' },
  { brand: 'Mercedes-Benz', model: 'GLE 53 AMG Coupé', year: '2024', price: 920000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '435 cv', color: 'Branco Polar', image: 'assets/images/mercedes-sclass.png' },
  { brand: 'BMW', model: 'M4 Competition', year: '2024', price: 850000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '510 cv', color: 'Verde Isle of Man', image: 'assets/images/bmw-serie7.png' },
  { brand: 'BMW', model: 'X7 M60i', year: '2024', price: 1100000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '530 cv', color: 'Preto Safira', image: 'assets/images/bmw-serie7.png' },
  { brand: 'Porsche', model: 'Cayenne Turbo GT', year: '2024', price: 1450000, km: '0', fuel: 'Gasolina', transmission: 'Tiptronic', power: '640 cv', color: 'Branco Carrara', image: 'assets/images/porsche-911.png' },
  { brand: 'Audi', model: 'RS e-tron GT', year: '2024', price: 1200000, km: '0', fuel: 'Elétrico', transmission: 'Automático', power: '646 cv', color: 'Cinza Daytona', image: 'assets/images/audi-a8.png' },
  { brand: 'Ferrari', model: '296 GTB', year: '2024', price: 4500000, km: '500', fuel: 'Híbrido', transmission: 'DCT', power: '830 cv', color: 'Giallo Modena', image: 'assets/images/ferrari-roma.png' },
  { brand: 'CAOA Chery', model: 'Tiggo 7 Pro', year: '2024', price: 185000, km: '0', fuel: 'Gasolina', transmission: 'CVT', power: '150 cv', color: 'Branco Perolizado', image: 'assets/images/caoa-tiggo8.webp' },
];

const brandLogos: Record<string, { type: 'img' | 'svg'; src: string }> = {
  'Mercedes-Benz': { type: 'img', src: 'assets/images/mercedes-logo.png' },
  'BMW': { type: 'img', src: 'assets/images/bmw-logo.png' },
  'Porsche': { type: 'img', src: 'assets/images/porsche-logo.png' },
  'Audi': { type: 'img', src: 'assets/images/audi-logo.png' },
  'CAOA Chery': { type: 'img', src: 'assets/images/caoa-chery-logo.png' },
  'Ferrari': { type: 'svg', src: `<svg width="55" height="70" viewBox="0 0 60 80"><rect x="5" y="5" width="50" height="70" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M30 20 L18 52 L30 46 L42 52 Z" fill="currentColor"/></svg>` },
};

export function initBrand(): void {
  const grid = document.getElementById('brandsGrid') as HTMLElement;
  const brandName = document.getElementById('brandName') as HTMLElement;
  const brandLogoText = document.getElementById('brandLogoText') as HTMLElement;
  const brandSvgContainer = document.getElementById('brandLogo') as HTMLElement;
  const brandsSection = document.querySelector('.brands') as HTMLElement;
  const buttons = document.querySelectorAll<HTMLButtonElement>('.brands__brand-btn');

  if (!grid || !brandName || !brandsSection) return;

  let currentBrand = 'Mercedes-Benz';

  function applyTheme(brand: string): void {
    const theme = brandThemes[brand];
    if (!theme || !brandsSection) return;

    brandsSection.style.setProperty('--brand-glow', theme.glow);
    brandsSection.style.setProperty('--brand-accent', theme.accent);
    brandsSection.style.setProperty('--brand-accent-rgb', theme.accentRgb);
    brandsSection.style.setProperty('--brand-bg', theme.bg);
    brandsSection.style.backgroundColor = theme.bg;
  }

  function renderCards(brand: string): void {
    const filtered = vehicles.filter(v => v.brand === brand);
    const theme = brandThemes[brand];

    grid.innerHTML = filtered.map((v, i) => {
      const kmDisplay = v.km === '0' ? '0 km' : `${parseInt(v.km).toLocaleString('pt-BR')} km`;
      const priceDisplay = 'R$ ' + v.price.toLocaleString('pt-BR');
      const delay = i * 0.1;

      return `
        <div class="brands__card" style="animation-delay: ${delay}s">
          <div class="brands__card-visual">
            <img src="${v.image}" alt="${v.brand} ${v.model}">
          </div>
          <div class="brands__card-body">
            <div class="brands__card-tags">
              <span class="brands__tag">${v.year}</span>
              <span class="brands__tag">${kmDisplay}</span>
              <span class="brands__tag">${v.fuel}</span>
            </div>
            <h3 class="brands__card-name">${v.model}</h3>
            <p class="brands__card-specs-line">${v.power} &middot; ${v.transmission} &middot; ${v.color}</p>
            <div class="brands__card-bottom">
              <p class="brands__card-price">${priceDisplay}</p>
              <a href="#cadastro" class="brands__card-cta">
                Detalhes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="brands__empty">Nenhum veículo disponível para esta marca.</div>';
    }
  }

  function switchBrand(brand: string): void {
    currentBrand = brand;
    brandName.textContent = brand;
    if (brandLogoText) brandLogoText.textContent = brand;

    // Apply brand theme (ambience)
    applyTheme(brand);

    // Update large logo
    const oldLogo = brandSvgContainer?.querySelector('.brands__active-img, .brands__active-svg');
    if (oldLogo) oldLogo.remove();

    const logo = brandLogos[brand];
    if (logo && brandSvgContainer) {
      if (logo.type === 'img') {
        const img = document.createElement('img');
        img.className = 'brands__active-img';
        if (brand === 'Audi') img.classList.add('brands__logo--large');
        img.src = logo.src;
        img.alt = brand;
        brandSvgContainer.insertBefore(img, brandLogoText);
      } else {
        const temp = document.createElement('div');
        temp.innerHTML = logo.src;
        const svg = temp.firstElementChild;
        if (svg) {
          svg.classList.add('brands__active-svg');
          brandSvgContainer.insertBefore(svg, brandLogoText);
        }
      }
    }

    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.brand === brand);
    });

    renderCards(brand);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.brand || 'Mercedes-Benz';
      switchBrand(brand);
    });
  });

  // Init
  applyTheme(currentBrand);
  renderCards(currentBrand);
}
