// AOS 초기화
AOS.init({ duration: 700, once: true, offset: 60 });

// ── 네비 스크롤 효과 ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ── 파트너 탭 전환 ──
const tabContents = {
  '수익형': [
    '플랫폼별 자유롭게 게재에 단가 결정',
    '판매이익을 통한 최대 수익 창출',
    '파트너 전용 관리페이지 제공',
  ],
  '절약형': [
    '월정액 고정 비용으로 예산 관리 용이',
    '무제한 발행으로 비용 절감 극대화',
    '자동화로 인건비 90% 절감 가능',
  ],
};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t === tab);
      t.classList.toggle('inactive', t !== tab);
    });
    const list = document.querySelector('.partner-features');
    if (list) {
      const items = tabContents[tab.textContent.trim()] || [];
      list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
    }
  });
});

// ── 스토리 슬라이더 (모바일) ──
const storyCards = document.querySelectorAll('.story-card');
let currentStory = 0;

function showStory(idx) {
  if (window.innerWidth > 768) return;
  storyCards.forEach((c, i) => {
    c.style.display = i === idx ? 'block' : 'none';
  });
}

document.querySelector('.arrow-btn.prev')?.addEventListener('click', () => {
  currentStory = (currentStory - 1 + storyCards.length) % storyCards.length;
  showStory(currentStory);
});
document.querySelector('.arrow-btn.next')?.addEventListener('click', () => {
  currentStory = (currentStory + 1) % storyCards.length;
  showStory(currentStory);
});

// ── FAQ 아코디언 ──
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── 문의 폼 + 스무스 스크롤 ──
document.addEventListener('DOMContentLoaded', () => {

  // 스무스 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('mainNav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const successMsg = form.closest('.form-box')?.querySelector('.form-success');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (submitBtn) { submitBtn.textContent = '전송 중...'; submitBtn.disabled = true; }

    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        alert('전송 실패: ' + (json.message || '잠시 후 다시 시도해주세요.'));
        if (submitBtn) { submitBtn.textContent = '문의 보내기 →'; submitBtn.disabled = false; }
      }
    } catch (err) {
      alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      if (submitBtn) { submitBtn.textContent = '문의 보내기 →'; submitBtn.disabled = false; }
    }
  });
});
