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

  function initCarousel(trackId, prevId, nextId){
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (!track || !prev || !next) return;

    const scrollByAmount = () => Math.max(track.clientWidth * 0.8, 280);
    const updateButtons = () => {
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      prev.classList.toggle('opacity-50', prev.disabled);
      next.classList.toggle('opacity-50', next.disabled);
    };
    updateButtons();

    prev.addEventListener('click', () => { track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' }); });
    next.addEventListener('click', () => { track.scrollBy({ left:  scrollByAmount(), behavior: 'smooth' }); });
    track.addEventListener('scroll', updateButtons, { passive:true });

    track.setAttribute('tabindex','0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev.click();
      if (e.key === 'ArrowRight') next.click();
    });
  }
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
