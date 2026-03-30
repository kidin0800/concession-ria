export function initForm() {
    const form = document.getElementById('registerForm');
    if (!form)
        return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            saveToLocalStorage();
            showSuccess();
            form.reset();
        }
    });
    // Remove error on input
    const inputs = form.querySelectorAll('.register__input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorEl = document.getElementById(`${input.id}Error`);
            if (errorEl)
                errorEl.textContent = '';
        });
    });
}
function validateForm() {
    let isValid = true;
    // Name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim() || name.value.trim().length < 3) {
        showError(name, nameError, 'Informe seu nome completo (mínimo 3 caracteres)');
        isValid = false;
    }
    // Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, emailError, 'Informe um e-mail válido');
        isValid = false;
    }
    // Phone
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, phoneError, 'Informe um telefone válido (ex: (11) 99999-9999)');
        isValid = false;
    }
    // Vehicle
    const vehicle = document.getElementById('vehicle');
    const vehicleError = document.getElementById('vehicleError');
    if (!vehicle.value) {
        showError(vehicle, vehicleError, 'Selecione um veículo de interesse');
        isValid = false;
    }
    return isValid;
}
function showError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
}
function saveToLocalStorage() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        vehicle: document.getElementById('vehicle').value,
        date: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('grandAutoRegistrations') || '[]');
    existing.push(formData);
    localStorage.setItem('grandAutoRegistrations', JSON.stringify(existing));
}
function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.register__submit');
    successMessage.classList.add('show');
    submitBtn.style.display = 'none';
    setTimeout(() => {
        successMessage.classList.remove('show');
        submitBtn.style.display = 'block';
    }, 5000);
}
//# sourceMappingURL=form.js.map