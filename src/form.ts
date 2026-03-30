interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  date: string;
}

export function initForm(): void {
  const form = document.getElementById('registerForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    if (validateForm()) {
      saveToLocalStorage();
      showSuccess();
      form.reset();
    }
  });

  // Remove error on input
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.register__input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = document.getElementById(`${input.id}Error`);
      if (errorEl) errorEl.textContent = '';
    });
  });
}

function validateForm(): boolean {
  let isValid = true;

  // Name
  const name = document.getElementById('name') as HTMLInputElement;
  const nameError = document.getElementById('nameError') as HTMLElement;
  if (!name.value.trim() || name.value.trim().length < 3) {
    showError(name, nameError, 'Informe seu nome completo (mínimo 3 caracteres)');
    isValid = false;
  }

  // Email
  const email = document.getElementById('email') as HTMLInputElement;
  const emailError = document.getElementById('emailError') as HTMLElement;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, emailError, 'Informe um e-mail válido');
    isValid = false;
  }

  // Phone
  const phone = document.getElementById('phone') as HTMLInputElement;
  const phoneError = document.getElementById('phoneError') as HTMLElement;
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    showError(phone, phoneError, 'Informe um telefone válido (ex: (11) 99999-9999)');
    isValid = false;
  }

  // Vehicle
  const vehicle = document.getElementById('vehicle') as HTMLSelectElement;
  const vehicleError = document.getElementById('vehicleError') as HTMLElement;
  if (!vehicle.value) {
    showError(vehicle, vehicleError, 'Selecione um veículo de interesse');
    isValid = false;
  }

  return isValid;
}

function showError(input: HTMLInputElement | HTMLSelectElement, errorEl: HTMLElement, message: string): void {
  input.classList.add('error');
  errorEl.textContent = message;
}

function saveToLocalStorage(): void {
  const formData: FormData = {
    name: (document.getElementById('name') as HTMLInputElement).value.trim(),
    email: (document.getElementById('email') as HTMLInputElement).value.trim(),
    phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
    vehicle: (document.getElementById('vehicle') as HTMLSelectElement).value,
    date: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem('grandAutoRegistrations') || '[]');
  existing.push(formData);
  localStorage.setItem('grandAutoRegistrations', JSON.stringify(existing));
}

function showSuccess(): void {
  const successMessage = document.getElementById('successMessage') as HTMLElement;
  const submitBtn = document.querySelector('.register__submit') as HTMLButtonElement;

  successMessage.classList.add('show');
  submitBtn.style.display = 'none';

  setTimeout(() => {
    successMessage.classList.remove('show');
    submitBtn.style.display = 'block';
  }, 5000);
}
