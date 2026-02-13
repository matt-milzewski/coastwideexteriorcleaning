'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Before/After slider functionality
  const sliders = document.querySelectorAll('.ba-slider');

  sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-slider__handle');
    const before = slider.querySelector('.ba-slider__before');
    if (!handle || !before) return;

    let isDragging = false;

    const updateSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      handle.style.left = pos + '%';
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      slider.setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerUp);
    slider.addEventListener('pointercancel', onPointerUp);

    // Keyboard accessibility
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', 'Before and after comparison slider');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');

    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.style.left) || 50;
      let next = current;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        next = Math.max(0, current - 2);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        next = Math.min(100, current + 2);
        e.preventDefault();
      }
      handle.style.left = next + '%';
      before.style.clipPath = `inset(0 ${100 - next}% 0 0)`;
      handle.setAttribute('aria-valuenow', String(Math.round(next)));
    });
  });
});
