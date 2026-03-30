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
}

// Vehicle database - same data as the carousel cards
const vehicles: BrandVehicle[] = [
  { brand: 'Mercedes-Benz', model: 'S-Class 500', year: '2024', price: 1250000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '449 cv', color: 'Preto Obsidiana' },
  { brand: 'BMW', model: 'Série 7 740i', year: '2024', price: 980000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '380 cv', color: 'Branco Mineral' },
  { brand: 'Porsche', model: '911 Turbo S', year: '2024', price: 1890000, km: '0', fuel: 'Gasolina', transmission: 'PDK', power: '650 cv', color: 'Cinza Quartzo' },
  { brand: 'Audi', model: 'A8 L 60 TFSI', year: '2024', price: 890000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '460 cv', color: 'Azul Navarra' },
  { brand: 'CAOA Chery', model: 'Tiggo 8 Pro', year: '2024', price: 230000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '186 cv', color: 'Preto Onyx' },
  { brand: 'Ferrari', model: 'Roma', year: '2023', price: 3200000, km: '1200', fuel: 'Gasolina', transmission: 'DCT', power: '620 cv', color: 'Rosso Corsa' },
  // Extra vehicles per brand
  { brand: 'Mercedes-Benz', model: 'AMG GT 63 S', year: '2024', price: 1680000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '639 cv', color: 'Cinza Selenita' },
  { brand: 'Mercedes-Benz', model: 'GLE 53 AMG Coupé', year: '2024', price: 920000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '435 cv', color: 'Branco Polar' },
  { brand: 'BMW', model: 'M4 Competition', year: '2024', price: 850000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '510 cv', color: 'Verde Isle of Man' },
  { brand: 'BMW', model: 'X7 M60i', year: '2024', price: 1100000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '530 cv', color: 'Preto Safira' },
  { brand: 'Porsche', model: 'Cayenne Turbo GT', year: '2024', price: 1450000, km: '0', fuel: 'Gasolina', transmission: 'Tiptronic', power: '640 cv', color: 'Branco Carrara' },
  { brand: 'Audi', model: 'RS e-tron GT', year: '2024', price: 1200000, km: '0', fuel: 'Elétrico', transmission: 'Automático', power: '646 cv', color: 'Cinza Daytona' },
  { brand: 'Ferrari', model: '296 GTB', year: '2024', price: 4500000, km: '500', fuel: 'Híbrido', transmission: 'DCT', power: '830 cv', color: 'Giallo Modena' },
  { brand: 'CAOA Chery', model: 'Tiggo 7 Pro', year: '2024', price: 185000, km: '0', fuel: 'Gasolina', transmission: 'CVT', power: '150 cv', color: 'Branco Perolizado' },
];

// Brand logos: image path or SVG fallback
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
  const buttons = document.querySelectorAll<HTMLButtonElement>('.brands__brand-btn');

  if (!grid || !brandName) return;

  let currentBrand = 'Mercedes-Benz';

  function renderCards(brand: string): void {
    const filtered = vehicles.filter(v => v.brand === brand);

    grid.innerHTML = filtered.map(v => {
      const kmDisplay = v.km === '0' ? '0 km' : `${parseInt(v.km).toLocaleString('pt-BR')} km`;
      const priceDisplay = 'R$ ' + v.price.toLocaleString('pt-BR');

      return `
        <div class="brands__card">
          <div class="brands__card-image">
            <span>${v.model}</span>
          </div>
          <div class="brands__card-body">
            <h3 class="brands__card-name">${v.model}</h3>
            <div class="brands__card-specs">
              <span>${v.power}</span>
              <span>${v.fuel}</span>
              <span>${v.transmission}</span>
            </div>
            <div class="brands__card-price-box">
              <p class="brands__card-price-label">Preço sugerido</p>
              <p class="brands__card-price">${priceDisplay}</p>
            </div>
            <div class="brands__card-features">
              <span class="brands__card-feature">${v.year}</span>
              <span class="brands__card-feature">${kmDisplay}</span>
              <span class="brands__card-feature">${v.color}</span>
            </div>
            <a href="#cadastro" class="brands__card-link">Ir para o Showroom</a>
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
    brandLogoText.textContent = brand;

    // Update large logo
    const oldLogo = brandSvgContainer.querySelector('.brands__active-img, .brands__active-svg');
    if (oldLogo) oldLogo.remove();

    const logo = brandLogos[brand];
    if (logo) {
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
  renderCards(currentBrand);
}
