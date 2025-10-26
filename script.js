const form = document.getElementById('contactForm');
const successMessage = document.querySelector('[data-testid="test-contact-success"]');

const showError = (field, message) => {
  const errorElement = document.querySelector(`[data-testid="test-contact-error-${field}"]`);
  if (errorElement) {
    errorElement.textContent = message;
    document.getElementById(field).setAttribute('aria-invalid', 'true');
  }
};

const clearErrors = () => {
  document.querySelectorAll('[data-testid^="test-contact-error"]').forEach(el => {
    el.textContent = '';
    const fieldId = el.id.split('-')[1];
    document.getElementById(fieldId)?.removeAttribute('aria-invalid');
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
  };

  let isValid = true;

  if (fields.name.value.trim().length < 2) {
    showError('name', 'Minimum 2 characters required');
    isValid = false;
  }

  if (fields.subject.value.trim().length < 5) {
    showError('subject', 'Subject must be at least 5 characters');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email.value)) {
    showError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (fields.message.value.trim().length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = 'Message sent successfully!';
    successMessage.classList.add('show');
    form.reset();
    
    setTimeout(() => {
      successMessage.classList.remove('show');
      successMessage.textContent = '';
    }, 5000);
  }
});

// Real-time validation
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', () => {
    const field = input.id;
    const errorElement = document.querySelector(`[data-testid="test-contact-error-${field}"]`);
    if (errorElement) {
      errorElement.textContent = '';
      input.removeAttribute('aria-invalid');
    }
  });
});
