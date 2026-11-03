/* Bascule clair / sombre. Préférence gardée dans le navigateur (localStorage « coo_theme »). */
(function () {
  function actuel() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function appliquer(t) {
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('coo_theme', t); } catch (e) {}
    var b = document.getElementById('theme-toggle');
    if (b) { var l = t === 'light'; b.setAttribute('aria-pressed', l ? 'true' : 'false'); b.title = l ? 'Passer en mode sombre' : 'Passer en mode clair'; b.setAttribute('aria-label', b.title); }
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === 'light' ? '#f3eff8' : '#0a0a0f';
  }
  function creer() {
    var zone = document.querySelector('.nav-right'); if (!zone || document.getElementById('theme-toggle')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'theme-toggle'; b.className = 'theme-toggle';
    b.innerHTML = '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    b.addEventListener('click', function () { appliquer(actuel() === 'light' ? 'dark' : 'light'); });
    var cible = zone.querySelector('.nav-search');
    zone.insertBefore(b, cible ? cible.nextSibling : zone.firstChild);
    appliquer(actuel());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', creer); else creer();
})();
