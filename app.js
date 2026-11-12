(function () {
  var root = document.documentElement;

  // tema claro/escuro (lembrado por visitante)
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : !window.matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // menu do celular
  var menu = document.getElementById('menu');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
  }
  menu.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // filtro de tecnologias
  var chips = document.querySelectorAll('.chip');
  var techs = document.querySelectorAll('#techs li');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.f;
      chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });
      techs.forEach(function (t) { t.classList.toggle('is-dim', f !== 'all' && t.dataset.c !== f); });
    });
  });

  // ano do rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // animação de entrada (só com IntersectionObserver e sem redução de movimento)
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('.sec__head, .prod, .ramo, .mini, .skill, .timeline li, .ia__list li, .about > *, .cta__in');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();
