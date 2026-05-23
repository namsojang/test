// AOS init
AOS.init({ duration: 700, once: true, offset: 60 });

// 바 애니메이션
const bars = document.querySelectorAll('.bar-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w;
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObs.observe(b));

// FAQ 아코디언
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// 문의 폼
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    document.querySelector('.form-success').style.display = 'block';
  });
}

// 네비 스크롤 효과
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(0,0,0,.08)'
    : 'none';
});
