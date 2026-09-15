'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.quote-form');
  if (!form) return;

  const submitBtn = document.getElementById('quote-submit');
  const backupBtn = document.getElementById('backup-submit');
  const successMsg = document.querySelector('.form-success');
  const submitError = document.querySelector('.form-submit-error');
  const startedAtInput = document.getElementById('form-started-at');
  const idempotencyInput = document.getElementById('form-idempotency-key');
  const anchorApiBase = (form.dataset.anchorApiBase || '').trim().replace(/\/+$/, '');
  const anchorSiteId = form.dataset.anchorSiteId || 'coastwide-exterior-cleaning';
  const useAnchorForms = Boolean(anchorApiBase);

  const newIdempotencyKey = () => {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
  };

  const resetSubmissionMetadata = () => {
    if (startedAtInput) startedAtInput.value = String(Date.now());
    if (idempotencyInput) idempotencyInput.value = newIdempotencyKey();
  };

  resetSubmissionMetadata();

  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  if (serviceParam) {
    const serviceSelect = form.querySelector('select[name="service"]');
    if (serviceSelect) {
      [...serviceSelect.options].forEach((option) => {
        if (option.value === serviceParam || option.textContent.trim() === serviceParam) {
          option.selected = true;
        }
      });
    }
  }

  const showError = (input, message) => {
    input.classList.add('error');
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  };

  const clearError = (input) => {
    input.classList.remove('error');
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  };

  const validateField = (input) => {
    const value = input.type === 'checkbox' ? (input.checked ? input.value : '') : input.value.trim();

    if (input.required && !value) {
      showError(input, input.type === 'checkbox' ? 'Please provide consent so we can respond.' : 'This field is required.');
      return false;
    }

    if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showError(input, 'Please enter a valid email address.');
      return false;
    }

    if (input.name === 'phone' && value && !/^[\d\s\-+()]{8,15}$/.test(value)) {
      showError(input, 'Please enter a valid phone number.');
      return false;
    }

    clearError(input);
    return true;
  };

  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  if (backupBtn) {
    backupBtn.addEventListener('click', () => {
      backupBtn.disabled = true;
      HTMLFormElement.prototype.submit.call(form);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isValid = true;
    requiredInputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    const honeypot = document.getElementById('_gotcha');
    if (honeypot && honeypot.value.trim()) return;

    if (!isValid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitError?.classList.remove('visible');
    backupBtn?.classList.remove('visible');

    const formData = new FormData(form);

    try {
      let response;
      let result;

      if (useAnchorForms) {
        response = await fetch(`${anchorApiBase}/api/forms/${encodeURIComponent(anchorSiteId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        result = await response.json().catch(() => ({}));

        if (!response.ok || result.accepted !== true || !result.submissionId) {
          const error = new Error(result.error || result.errors?.join(' ') || 'The secure form service did not accept the enquiry.');
          error.definitiveRejection = response.status >= 400 && response.status < 500;
          throw error;
        }
      } else {
        response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
      }

      form.style.display = 'none';
      successMsg?.classList.add('visible');
      form.reset();
      resetSubmissionMetadata();
      successMsg?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error('Form submission error:', error);
      submitError?.classList.add('visible');
      if (useAnchorForms) backupBtn?.classList.add('visible');
      if (error.definitiveRejection) resetSubmissionMetadata();
      submitError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});
