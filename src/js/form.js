'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.quote-form');
  if (!form) return;

  // Pre-select service from URL parameter
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  if (serviceParam) {
    const serviceSelect = form.querySelector('select[name="service"]');
    if (serviceSelect) {
      const options = serviceSelect.querySelectorAll('option');
      options.forEach(opt => {
        if (opt.value === serviceParam || opt.textContent.trim() === serviceParam) {
          opt.selected = true;
        }
      });
    }
  }

  // Validation helpers
  const showError = (input, message) => {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  };

  const clearError = (input) => {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  };

  const validateField = (input) => {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;

    if (input.required && !value) {
      showError(input, 'This field is required.');
      return false;
    }

    if (type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showError(input, 'Please enter a valid email address.');
        return false;
      }
    }

    if (name === 'phone' && value) {
      const phonePattern = /^[\d\s\-+()]{8,15}$/;
      if (!phonePattern.test(value)) {
        showError(input, 'Please enter a valid phone number.');
        return false;
      }
    }

    clearError(input);
    return true;
  };

  // Real-time validation on blur
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault();
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // If using Formspree AJAX submission
    e.preventDefault();
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.style.display = 'none';
        const successMsg = document.querySelector('.form-success');
        if (successMsg) successMsg.classList.add('visible');
      } else {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or contact us directly.');
      }
    })
    .catch(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or contact us directly.');
    });
  });
});
