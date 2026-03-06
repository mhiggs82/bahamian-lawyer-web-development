// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Demo modal
const demoModal = document.getElementById('demoModal');
const demoFrame = document.getElementById('demoFrame');
const demoModalTitle = document.getElementById('demoModalTitle');
let currentDemoUrl = '';

document.querySelectorAll('.portfolio-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    currentDemoUrl = link.getAttribute('href');
    demoModalTitle.textContent = link.closest('.portfolio-body').querySelector('.portfolio-name').textContent;
    demoFrame.src = currentDemoUrl;
    demoModal.classList.add('active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeDemoModal() {
  demoModal.classList.remove('active');
  demoModal.setAttribute('aria-hidden', 'true');
  demoFrame.src = '';
  document.body.style.overflow = '';
}

document.getElementById('demoCancel').addEventListener('click', closeDemoModal);
document.getElementById('demoOpen').addEventListener('click', () => {
  window.open(currentDemoUrl, '_blank', 'noopener');
  closeDemoModal();
});
demoModal.addEventListener('click', e => { if (e.target === demoModal) closeDemoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDemoModal(); });

// Scroll fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
