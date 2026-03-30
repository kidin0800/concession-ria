// Vehicle database - same data as the carousel cards
const vehicles = [
    { brand: 'Mercedes-Benz', model: 'S-Class 500', year: '2024', price: 1250000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '449 cv', color: 'Preto Obsidiana' },
    { brand: 'BMW', model: 'Série 7 740i', year: '2024', price: 980000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '380 cv', color: 'Branco Mineral' },
    { brand: 'Porsche', model: '911 Turbo S', year: '2024', price: 1890000, km: '0', fuel: 'Gasolina', transmission: 'PDK', power: '650 cv', color: 'Cinza Quartzo' },
    { brand: 'Audi', model: 'A8 L 60 TFSI', year: '2024', price: 890000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '460 cv', color: 'Azul Navarra' },
    { brand: 'Land Rover', model: 'Range Rover Autobiography', year: '2024', price: 1150000, km: '0', fuel: 'Diesel', transmission: 'Automático', power: '350 cv', color: 'Verde British Racing' },
    { brand: 'Ferrari', model: 'Roma', year: '2023', price: 3200000, km: '1200', fuel: 'Gasolina', transmission: 'DCT', power: '620 cv', color: 'Rosso Corsa' },
    // Extra vehicles per brand
    { brand: 'Mercedes-Benz', model: 'AMG GT 63 S', year: '2024', price: 1680000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '639 cv', color: 'Cinza Selenita' },
    { brand: 'Mercedes-Benz', model: 'GLE 53 AMG Coupé', year: '2024', price: 920000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '435 cv', color: 'Branco Polar' },
    { brand: 'BMW', model: 'M4 Competition', year: '2024', price: 850000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '510 cv', color: 'Verde Isle of Man' },
    { brand: 'BMW', model: 'X7 M60i', year: '2024', price: 1100000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '530 cv', color: 'Preto Safira' },
    { brand: 'Porsche', model: 'Cayenne Turbo GT', year: '2024', price: 1450000, km: '0', fuel: 'Gasolina', transmission: 'Tiptronic', power: '640 cv', color: 'Branco Carrara' },
    { brand: 'Audi', model: 'RS e-tron GT', year: '2024', price: 1200000, km: '0', fuel: 'Elétrico', transmission: 'Automático', power: '646 cv', color: 'Cinza Daytona' },
    { brand: 'Ferrari', model: '296 GTB', year: '2024', price: 4500000, km: '500', fuel: 'Híbrido', transmission: 'DCT', power: '830 cv', color: 'Giallo Modena' },
    { brand: 'Land Rover', model: 'Defender V8', year: '2024', price: 980000, km: '0', fuel: 'Gasolina', transmission: 'Automático', power: '525 cv', color: 'Cinza Eiger' },
];
const brandLogos = {
    'Mercedes-Benz': `<svg width="70" height="70" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" stroke-width="3"/><line x1="50" y1="50" x2="15" y2="75" stroke="currentColor" stroke-width="3"/><line x1="50" y1="50" x2="85" y2="75" stroke="currentColor" stroke-width="3"/></svg>`,
    'BMW': `<svg width="70" height="70" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="3"/><text x="50" y="38" text-anchor="middle" fill="currentColor" font-size="14" font-family="sans-serif" font-weight="700">B M W</text></svg>`,
    'Porsche': `<svg width="70" height="70" viewBox="0 0 100 100"><path d="M50 5 L90 30 L90 75 L50 95 L10 75 L10 30 Z" fill="none" stroke="currentColor" stroke-width="4"/><text x="50" y="55" text-anchor="middle" fill="currentColor" font-size="16" font-family="serif" font-weight="700">P</text></svg>`,
    'Audi': `<svg width="100" height="50" viewBox="0 0 200 60"><circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="72" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="114" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="156" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`,
    'Land Rover': `<svg width="100" height="50" viewBox="0 0 160 60"><ellipse cx="80" cy="30" rx="72" ry="26" fill="none" stroke="currentColor" stroke-width="4"/><text x="80" y="36" text-anchor="middle" fill="currentColor" font-size="14" font-family="sans-serif" font-weight="700" letter-spacing="3">LAND ROVER</text></svg>`,
    'Ferrari': `<svg width="55" height="70" viewBox="0 0 60 80"><rect x="5" y="5" width="50" height="70" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M30 20 L18 52 L30 46 L42 52 Z" fill="currentColor"/></svg>`,
};
export function initBrand() {
    const grid = document.getElementById('brandsGrid');
    const brandName = document.getElementById('brandName');
    const brandLogoText = document.getElementById('brandLogoText');
    const brandSvgContainer = document.getElementById('brandLogo');
    const buttons = document.querySelectorAll('.brands__brand-btn');
    if (!grid || !brandName)
        return;
    let currentBrand = 'Mercedes-Benz';
    function renderCards(brand) {
        const filtered = vehicles.filter(v => v.brand === brand);
        grid.innerHTML = filtered.map(v => {
            const kmDisplay = v.km === '0' ? '0 km' : `${parseInt(v.km).toLocaleString('pt-BR')} km`;
            const priceDisplay = 'R$ ' + v.price.toLocaleString('pt-BR');
            return `
        <div class="brands__card">
          <div class="brands__card-image">
            <span>${v.brand}</span>
          </div>
          <div class="brands__card-body">
            <h3 class="brands__card-title">${v.brand} ${v.model}</h3>
            <div class="brands__card-specs">
              <span>${v.year}</span>
              <span>${kmDisplay}</span>
              <span>${v.power}</span>
              <span>${v.transmission}</span>
            </div>
            <p class="brands__card-price">${priceDisplay}</p>
          </div>
        </div>
      `;
        }).join('');
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="brands__empty">Nenhum veículo disponível para esta marca.</div>';
        }
    }
    function switchBrand(brand) {
        currentBrand = brand;
        brandName.textContent = brand;
        brandLogoText.textContent = brand;
        // Update large SVG logo
        const svgEl = brandSvgContainer.querySelector('.brands__active-svg');
        if (svgEl)
            svgEl.remove();
        const logoHtml = brandLogos[brand] || '';
        const temp = document.createElement('div');
        temp.innerHTML = logoHtml;
        const newSvg = temp.firstElementChild;
        if (newSvg) {
            newSvg.classList.add('brands__active-svg');
            brandSvgContainer.insertBefore(newSvg, brandLogoText);
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
//# sourceMappingURL=brand.js.map