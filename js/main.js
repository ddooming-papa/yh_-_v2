/* ── MOUSE SPOTLIGHT ─────────────────────────────────── */
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--mouse-x', e.clientX + 'px');
  document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});

/* ── SIDEBAR SCROLL SPY ──────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.sidebar__nav-item[data-section]');

function updateActiveNav() {
  let current = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 160;
    if (scrollY >= top) current = section.id;
  });

  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === current);
  });
}

if (navItems.length) {
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ── MOBILE HAMBURGER ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── FADE-UP INTERSECTION OBSERVER ──────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '-20px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  io.observe(el);
});

/* ── STAGGER DELAYS ──────────────────────────────────── */
document.querySelectorAll('.skills__grid .fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});

document.querySelectorAll('.projects__list .fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${i * 40}ms`;
});

document.querySelectorAll('.experience__list .fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

/* ── SMOOTH SCROLL FOR SIDEBAR LINKS ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
