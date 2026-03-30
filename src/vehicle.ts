interface VehicleData {
  vehicle: string;
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

interface BuyerData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

let currentVehicle: VehicleData | null = null;
let currentBuyer: BuyerData | null = null;

export function initVehicle(): void {
  initCarousel();

  const modal = document.getElementById('vehicleModal') as HTMLElement;
  const overlay = modal.querySelector('.modal__overlay') as HTMLElement;
  const closeBtn = document.getElementById('modalClose') as HTMLElement;

  // Open modal on card click
  document.querySelectorAll<HTMLElement>('.vehicles__card').forEach(card => {
    card.addEventListener('click', () => {
      currentVehicle = {
        vehicle: card.dataset.vehicle || '',
        brand: card.dataset.brand || '',
        model: card.dataset.model || '',
        year: card.dataset.year || '',
        price: parseInt(card.dataset.price || '0', 10),
        km: card.dataset.km || '0',
        fuel: card.dataset.fuel || '',
        transmission: card.dataset.transmission || '',
        power: card.dataset.power || '',
        color: card.dataset.color || ''
      };
      openModal();
    });
  });

  // Close modal
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Step navigation
  document.getElementById('btnBuy')!.addEventListener('click', () => showStep('stepBuyer'));
  document.getElementById('btnContact')!.addEventListener('click', () => {
    closeModal();
    const cadastro = document.getElementById('cadastro');
    if (cadastro) cadastro.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('btnBackToDetails')!.addEventListener('click', () => showStep('stepDetails'));
  document.getElementById('btnBackToBuyer')!.addEventListener('click', () => showStep('stepBuyer'));
  document.getElementById('btnCloseConfirm')!.addEventListener('click', closeModal);

  // Buyer form submit
  const buyerForm = document.getElementById('buyerForm') as HTMLFormElement;
  buyerForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    currentBuyer = {
      name: (document.getElementById('buyerName') as HTMLInputElement).value.trim(),
      cpf: (document.getElementById('buyerCpf') as HTMLInputElement).value.trim(),
      email: (document.getElementById('buyerEmail') as HTMLInputElement).value.trim(),
      phone: (document.getElementById('buyerPhone') as HTMLInputElement).value.trim(),
      address: (document.getElementById('buyerAddress') as HTMLInputElement).value.trim(),
      city: (document.getElementById('buyerCity') as HTMLInputElement).value.trim()
    };
    showPaymentStep();
  });

  // Confirm purchase
  document.getElementById('btnConfirm')!.addEventListener('click', confirmPurchase);
}

function initCarousel(): void {
  const grid = document.querySelector('.vehicles__grid') as HTMLElement;
  const leftBtn = document.getElementById('vehiclesLeft') as HTMLButtonElement;
  const rightBtn = document.getElementById('vehiclesRight') as HTMLButtonElement;

  if (!grid || !leftBtn || !rightBtn) return;

  const scrollAmount = 320; // card width + gap

  rightBtn.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  leftBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

function formatPrice(value: number): string {
  return 'R$ ' + value.toLocaleString('pt-BR');
}

function openModal(): void {
  if (!currentVehicle) return;

  const modal = document.getElementById('vehicleModal') as HTMLElement;

  // Fill details
  const modalImage = document.getElementById('modalImage') as HTMLElement;
  modalImage.textContent = currentVehicle.brand;

  (document.getElementById('modalTitle') as HTMLElement).textContent =
    `${currentVehicle.brand} ${currentVehicle.model}`;

  (document.getElementById('modalPrice') as HTMLElement).textContent =
    formatPrice(currentVehicle.price);

  // Fill specs
  const specsContainer = document.getElementById('modalSpecs') as HTMLElement;
  const specs = [
    { label: 'Marca', value: currentVehicle.brand },
    { label: 'Modelo', value: currentVehicle.model },
    { label: 'Ano', value: currentVehicle.year },
    { label: 'Quilometragem', value: currentVehicle.km === '0' ? '0 km (Novo)' : `${parseInt(currentVehicle.km).toLocaleString('pt-BR')} km` },
    { label: 'Combustível', value: currentVehicle.fuel },
    { label: 'Câmbio', value: currentVehicle.transmission },
    { label: 'Potência', value: currentVehicle.power },
    { label: 'Cor', value: currentVehicle.color }
  ];

  specsContainer.innerHTML = specs.map(s =>
    `<div class="modal__spec">
      <span class="modal__spec-label">${s.label}</span>
      <span class="modal__spec-value">${s.value}</span>
    </div>`
  ).join('');

  showStep('stepDetails');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(): void {
  const modal = document.getElementById('vehicleModal') as HTMLElement;
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Reset forms
  (document.getElementById('buyerForm') as HTMLFormElement).reset();
}

function showStep(stepId: string): void {
  document.querySelectorAll('.modal__step').forEach(step => {
    step.classList.add('hidden');
  });
  document.getElementById(stepId)!.classList.remove('hidden');

  // Scroll modal to top
  const content = document.querySelector('.modal__content') as HTMLElement;
  content.scrollTop = 0;
}

function showPaymentStep(): void {
  if (!currentVehicle) return;

  const price = currentVehicle.price;

  // Payment summary
  const summary = document.getElementById('paymentSummary') as HTMLElement;
  summary.innerHTML = `
    <span class="modal__payment-summary-vehicle">${currentVehicle.brand} ${currentVehicle.model}</span>
    <span class="modal__payment-summary-price">${formatPrice(price)}</span>
  `;

  // À vista (5% discount)
  const avista = Math.round(price * 0.95);
  (document.getElementById('priceAvista') as HTMLElement).textContent = formatPrice(avista);

  // Financiamento (60x, 30% entrada)
  const entrada = Math.round(price * 0.30);
  const parcela = Math.round((price - entrada) * 1.08 / 60);
  (document.getElementById('priceFinanciamento') as HTMLElement).textContent =
    `Entrada ${formatPrice(entrada)} + 60x de ${formatPrice(parcela)}`;

  // Consórcio (80x)
  const parcelaConsorcio = Math.round(price / 80);
  (document.getElementById('priceConsorcio') as HTMLElement).textContent =
    `80x de ${formatPrice(parcelaConsorcio)}`;

  showStep('stepPayment');
}

function confirmPurchase(): void {
  if (!currentVehicle || !currentBuyer) return;

  const paymentMethod = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement).value;

  const paymentLabels: Record<string, string> = {
    'avista': 'À Vista (5% desconto)',
    'financiamento': 'Financiamento (60x)',
    'consorcio': 'Consórcio (80x)'
  };

  // Save to localStorage
  const order = {
    vehicle: `${currentVehicle.brand} ${currentVehicle.model}`,
    price: currentVehicle.price,
    buyer: currentBuyer,
    payment: paymentMethod,
    date: new Date().toISOString(),
    orderId: 'GA-' + Date.now().toString().slice(-6)
  };

  const orders = JSON.parse(localStorage.getItem('grandAutoOrders') || '[]');
  orders.push(order);
  localStorage.setItem('grandAutoOrders', JSON.stringify(orders));

  // Show confirmation
  const details = document.getElementById('confirmationDetails') as HTMLElement;
  details.innerHTML = `
    <strong>Pedido:</strong> ${order.orderId}<br>
    <strong>Veículo:</strong> ${order.vehicle}<br>
    <strong>Valor:</strong> ${formatPrice(order.price)}<br>
    <strong>Pagamento:</strong> ${paymentLabels[paymentMethod]}<br>
    <strong>Comprador:</strong> ${currentBuyer.name}<br>
    <strong>E-mail:</strong> ${currentBuyer.email}<br>
    <strong>Telefone:</strong> ${currentBuyer.phone}
  `;

  showStep('stepConfirmation');
}
