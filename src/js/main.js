/* Texas Light Crew — main.js */
(function () {
  'use strict';

  /* === HEADER SCROLL === */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* === MOBILE NAV === */
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openNav() {
    primaryNav.classList.add('is-open');
    navBackdrop.classList.add('is-visible');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    primaryNav.classList.remove('is-open');
    navBackdrop.classList.remove('is-visible');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      navToggle.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
    });
    navBackdrop && navBackdrop.addEventListener('click', closeNav);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) closeNav();
    });
  }

  /* === DROPDOWN (mobile) === */
  document.querySelectorAll('.nav-link--dropdown').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.nextElementSibling.classList.toggle('is-open', !expanded);
    });
  });

  /* === QUOTE MODAL === */
  const modal = document.getElementById('quote-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');

  function openModal() {
    if (!modal) return;
    modal.showModal ? modal.showModal() : modal.setAttribute('open', '');
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    // focus first link
    const first = modal.querySelector('a, button');
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.close ? modal.close() : modal.removeAttribute('open');
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  // All buttons that open the modal
  document.querySelectorAll('[id$="quote-btn"], [data-quote-trigger]').forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  modalClose && modalClose.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);

  modal && modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Trap focus inside modal
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hidden);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* === REVEAL ON SCROLL === */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* === FOOTER YEAR === */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
