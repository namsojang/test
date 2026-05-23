// AOS 초기화
AOS.init({ duration: 700, once: true, offset: 60 });

// ── 네비 스크롤 효과 ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ── 파트너 탭 전환 ──
const tabs = document.querySelectorAll('.tab');
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
const featureList = document.querySelector('.partner-features');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.classList.add('inactive'); });
    tab.classList.add('active'); tab.classList.remove('inactive');
    const items = tabContents[tab.textContent.trim()] || [];
    featureList.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  });
});

// ── 스토리 슬라이더 ──
const storyCards = document.querySelectorAll('.story-card');
let currentStory = 0;

function showStory(idx) {
  if (window.innerWidth > 768) return; // 데스크탑은 전체 표시
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

// ── 문의 폼 제출 (Web3Forms) ──
const form = document.getElementById('contactForm');
const submitBtn = form?.querySelector('.form-submit');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;

    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        form.style.display = 'none';
        document.querySelector('.form-success').style.display = 'block';
      } else {
        alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        submitBtn.textContent = '문의 보내기 →';
        submitBtn.disabled = false;
      }
    } catch {
      alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      submitBtn.textContent = '문의 보내기 →';
      submitBtn.disabled = false;
    }
  });
}

// ── 스무스 스크롤 (네비 링크) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
