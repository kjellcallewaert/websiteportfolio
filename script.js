/* ========= Basic interactive behaviors ========= */

/* utility */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* set current year in footer(s) */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  ['year', 'year-2', 'year-3', 'year-4'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });
});

/* NAV TOGGLE for mobile */
(function navToggle() {
  const toggle = $('#nav-toggle');
  const nav = $('#nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    nav.style.display = open ? 'block' : '';
    toggle.setAttribute('aria-expanded', open);
  });
})();

/* Simple scroll reveal */
(function scrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  const elems = $$(
    '.project-card, .skill, .testi-item, .profile-card, .card, .timeline-item, .hero-text'
  );
  elems.forEach((el) => obs.observe(el));
})();

/* MODALS */
(function modals() {
  const openers = $$('[data-modal-target]');
  const closeButtons = $$('[data-close]');
  const modals = $$('.modal');

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus trap could be added
  }
  function closeModal(m) {
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-modal-target');
      openModal(id);
    });
  });

  closeButtons.forEach((b) => {
    b.addEventListener('click', () => {
      const m = b.closest('.modal');
      if (m) closeModal(m);
    });
  });

  modals.forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal[aria-hidden="false"]');
      if (open) open.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
})();

/* PROJECT FILTERS (projects page) */
(function projectFilter() {
  const filters = $$('.filter');
  const grid = $('#projects-grid');
  if (!grid || !filters.length) return;
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      const cards = $$('.project-card', grid);
      cards.forEach((card) => {
        if (f === 'all' || card.dataset.category === f) {
          card.style.display = '';
          setTimeout(() => card.classList.add('revealed'), 20);
        } else {
          card.style.display = 'none';
          card.classList.remove('revealed');
        }
      });
    });
  });
})();


/* CONTACT FORM - simple client validation + mailto fallback */
(function contactForm() {
  const form = $('#contact-form');
  const msg = $('#form-msg');
  const fallback = $('#mailto-fallback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.trim();
      const email = data.get('email')?.trim();
      const message = data.get('message')?.trim();

      if (!name || !email || !message) {
        formMessage('Vul a.u.b. alle verplichte velden in.', true);
        return;
      }

      // Simuleer verzending (hier kun je fetch naar een backend plaatsen)
      formMessage(
        'Bericht verzonden — bedankt! Ik neem snel contact op.',
        false
      );
      form.reset();
    });
  }

  if (fallback) {
    fallback.addEventListener('click', () => {
      const email = 'kjellcallewaert22@gmail.com';
      const subject = encodeURIComponent('Vul dit veld in a.u.b.');
      const body = encodeURIComponent('Vul dit veld in a.u.b.');
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }

  function formMessage(text, isError) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = isError ? '#ff7b7b' : '#9ef3c6';
    setTimeout(() => (msg.textContent = ''), isError ? 4000 : 5000);
  }
})();

const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
