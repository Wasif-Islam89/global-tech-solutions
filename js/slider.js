/* Mani Corps — Testimonial slider */
(function () {
  const track = document.querySelector('.t-track');
  if (!track) return;

  const slides = track.querySelectorAll('.t-slide');
  const dotsWrap = document.querySelector('.t-nav');
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.t-dot');

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
    resetTimer();
  }

  function next() { goTo(index + 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  resetTimer();

  /* Swipe support */
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (delta > 50) goTo(index - 1);
    else if (delta < -50) goTo(index + 1);
  }, { passive: true });
})();
