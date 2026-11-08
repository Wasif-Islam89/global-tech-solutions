/* Mani Corps — Main site script */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Loading screen ---- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hide');
      const hero = document.querySelector('.hero');
      if (hero) hero.classList.add('loaded');
    }, 400);
  });
  // Fallback in case load event already fired
  if (document.readyState === 'complete' && loader) {
    setTimeout(() => {
      loader.classList.add('hide');
      const hero = document.querySelector('.hero');
      if (hero) hero.classList.add('loaded');
    }, 500);
  }

  /* ---- Scroll progress bar ---- */
  const progress = document.querySelector('.scroll-progress');
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Back to top ---- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Ripple buttons ---- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---- Typing effect (hero headline) ---- */
  const typeTarget = document.querySelector('[data-typing]');
  if (typeTarget) {
    const words = JSON.parse(typeTarget.dataset.typing);
    let wIndex = 0, cIndex = 0, deleting = false;
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    typeTarget.after(cursor);

    function loop() {
      const word = words[wIndex];
      if (!deleting) {
        cIndex++;
        typeTarget.textContent = word.slice(0, cIndex);
        if (cIndex === word.length) { deleting = true; setTimeout(loop, 1600); return; }
      } else {
        cIndex--;
        typeTarget.textContent = word.slice(0, cIndex);
        if (cIndex === 0) { deleting = false; wIndex = (wIndex + 1) % words.length; }
      }
      setTimeout(loop, deleting ? 40 : 70);
    }
    loop();
  }

  /* ---- Portfolio filters ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---- Contact form (front-end only demo) ---- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type=submit]');
      const original = btn.textContent;
      btn.textContent = 'Message sent ✓';
      btn.style.background = 'var(--success)';
      contactForm.reset();
      setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 3000);
    });
  }

  /* ---- Newsletter form ---- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.placeholder = 'Subscribed ✓';
      input.value = '';
    });
  }

});
