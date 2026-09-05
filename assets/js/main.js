document.documentElement.classList.remove('no-js');

window.addEventListener('load', () => {
  if (window.lucide && lucide.createIcons) lucide.createIcons();

  // Menu mobile
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  const tabs = Array.from(document.querySelectorAll('.tab-button'));
  const contents = Array.from(document.querySelectorAll('.tab-content'));
  function activateTab(tab){
    tabs.forEach(t => {
      t.classList.remove('text-ueg-gold','border-ueg-gold');
      t.classList.add('text-slate-300','border-transparent');
      t.setAttribute('aria-selected','false');
    });
    tab.classList.add('text-ueg-gold','border-ueg-gold');
    tab.classList.remove('text-slate-300','border-transparent');
    tab.setAttribute('aria-selected','true');

    contents.forEach(c => c.classList.add('hidden'));
    const targetId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(targetId);
    panel?.classList.remove('hidden');
    panel?.focus();

    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (idx+1) % tabs.length : (idx-1+tabs.length) % tabs.length;
        tabs[next].focus();
        activateTab(tabs[next]);
      }
    });
  });

  /* Carrossel horizontal: setas, indicadores, teclado e arrastar com o mouse. */
  function initCarousel(trackId, prevId, nextId, dotsId){
    const track = document.getElementById(trackId);
    if (!track) return;
    const prev = prevId ? document.getElementById(prevId) : null;
    const next = nextId ? document.getElementById(nextId) : null;
    const dotsBox = dotsId ? document.getElementById(dotsId) : null;
    const items = Array.from(track.children);
    if (!items.length) return;

    // Rola exatamente um item por clique, considerando o gap entre os cards.
    const step = () => {
      if (items.length < 2) return track.clientWidth;
      return items[1].offsetLeft - items[0].offsetLeft;
    };
    const maxScroll = () => track.scrollWidth - track.clientWidth;

    // Um indicador por "página" visível — com vários cards na tela, um por card confundiria.
    const pageCount = () => Math.max(1, Math.round(maxScroll() / step()) + 1);
    let dots = [];
    const buildDots = () => {
      if (!dotsBox) return;
      const total = pageCount();
      if (dots.length === total) return;
      dotsBox.innerHTML = '';
      dots = Array.from({ length: total }, (_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Ir para a posição ${i + 1} de ${total}`);
        dot.addEventListener('click', () => {
          track.scrollTo({ left: Math.min(i * step(), maxScroll()), behavior: 'smooth' });
        });
        dotsBox.appendChild(dot);
        return dot;
      });
      dotsBox.classList.toggle('hidden', total < 2);
    };

    const update = () => {
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= maxScroll() - 1;
      if (prev) { prev.disabled = atStart; prev.classList.toggle('opacity-40', atStart); }
      if (next) { next.disabled = atEnd; next.classList.toggle('opacity-40', atEnd); }
      const idx = Math.min(dots.length - 1, Math.round(track.scrollLeft / step()));
      dots.forEach((dot, i) => {
        const on = i === idx;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-selected', String(on));
      });
    };

    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', () => { buildDots(); update(); });

    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      track.scrollBy({ left: e.key === 'ArrowLeft' ? -step() : step(), behavior: 'smooth' });
    });

    // Arrastar com o mouse (o toque já funciona nativamente).
    let dragging = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      dragging = true; moved = 0;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const delta = e.clientX - startX;
      moved = Math.max(moved, Math.abs(delta));
      track.scrollLeft = startScroll - delta;
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointerleave', endDrag);
    track.addEventListener('pointercancel', endDrag);
    // Evita que o arrasto dispare cliques em links dentro dos cards.
    track.addEventListener('click', (e) => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); } }, true);

    buildDots();
    update();
  }
  initCarousel('speakersTrack','speakersPrev','speakersNext','speakersDots');
  initCarousel('galleryTrack','galleryPrev','galleryNext');

  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    if (window.scrollY > 300) { toTop.style.opacity = '1'; toTop.style.pointerEvents = 'auto'; }
    else { toTop.style.opacity = '0'; toTop.style.pointerEvents = 'none'; }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const conf = (window.STI_CONFIG && window.STI_CONFIG.links) || {};
  const map = [
    ['ctaDia1', 'dia1'],
    ['ctaDia2', 'dia2'],
    ['linkGuiaWeb', 'guiaWeb'],
    ['linkGuiaApp', 'guiaApp'],
    ['linkBaixar', 'baixar']
  ];
  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && conf[key]) el.setAttribute('href', conf[key]);
  });
});
