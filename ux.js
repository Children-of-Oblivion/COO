/* Confort de lecture, commun à toutes les pages. Chaque bloc est indépendant : s'il échoue, le reste du site fonctionne. */
(function () {
  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function dateFr(iso) { var p = iso.split('-'); return (+p[2] === 1 ? '1er' : +p[2]) + ' ' + MOIS[+p[1] - 1] + ' ' + p[0]; }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function sur(f) { try { f(); } catch (e) { if (window.console) console.warn('ux', e); } }
  window.cooDateFr = dateFr;

  var ICON_COPY = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';

  /* ---- 1. Lien d'accès direct au contenu ---- */
  function evitement() {
    var page = $('.page.active') || $('.page');
    if (!page || $('.skip-link')) return;
    var cible = $('.content-wrap', page) || page;
    cible.id = cible.id || 'contenu';
    if (!cible.hasAttribute('tabindex')) cible.setAttribute('tabindex', '-1');
    var a = document.createElement('a');
    a.className = 'skip-link'; a.href = '#' + cible.id; a.textContent = 'Aller au contenu';
    a.addEventListener('click', function (e) { e.preventDefault(); cible.focus(); cible.scrollIntoView(); });
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* ---- 2. Barre de progression et 3. retour en haut ---- */
  function progression() {
    var bar = document.createElement('div'); bar.className = 'read-progress'; bar.setAttribute('aria-hidden', 'true');
    var top = document.createElement('button');
    top.type = 'button'; top.className = 'to-top'; top.title = 'Retour en haut'; top.setAttribute('aria-label', 'Retour en haut');
    top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(bar); document.body.appendChild(top);
    var modal = document.getElementById('profil-modal');
    function boite() { return modal && modal.classList.contains('open') ? $('.profil-box', modal) : null; }
    var prevu = false;
    function maj() {
      prevu = false;
      var b = boite(), pos, max;
      if (b) { pos = b.scrollTop; max = b.scrollHeight - b.clientHeight; }
      else { pos = window.scrollY || document.documentElement.scrollTop; max = document.documentElement.scrollHeight - window.innerHeight; }
      var utile = max > (b ? 200 : window.innerHeight * 0.6);
      bar.classList.toggle('on', utile && pos > 4);
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, pos / max) : 0) + ')';
      top.classList.toggle('on', pos > (b ? 500 : 700));
    }
    function demande() { if (!prevu) { prevu = true; requestAnimationFrame(maj); } }
    window.addEventListener('scroll', demande, { passive: true });
    window.addEventListener('resize', demande);
    if (modal) {
      var box = $('.profil-box', modal);
      if (box) box.addEventListener('scroll', demande, { passive: true });
      new MutationObserver(demande).observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
    top.addEventListener('click', function () {
      var b = boite();
      if (b) b.scrollTo({ top: 0, behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    maj();
  }

  /* ---- 4. Afficher / masquer une phrase d'ouverture ---- */
  function oeil(input) {
    if (input.dataset.pw) return;
    input.dataset.pw = '1';
    var w = document.createElement('span'); w.className = 'pw-wrap';
    input.parentNode.insertBefore(w, input); w.appendChild(input);
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'pw-eye'; b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Afficher la saisie'); b.title = 'Afficher la saisie';
    b.innerHTML = '<svg class="i-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>' +
      '<svg class="i-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
    b.addEventListener('click', function () {
      var vis = input.type === 'password';
      input.type = vis ? 'text' : 'password';
      b.setAttribute('aria-pressed', vis ? 'true' : 'false');
      b.title = vis ? 'Masquer la saisie' : 'Afficher la saisie'; b.setAttribute('aria-label', b.title);
      input.focus();
    });
    w.appendChild(b);
  }
  function yeux(racine) { $$('input[type="password"]', racine).forEach(oeil); }

  /* ---- 5. Copier ---- */
  function copier(texte, btn) {
    function ok() {
      if (!btn) return;
      var ancien = btn.getAttribute('data-label');
      btn.classList.add('ok');
      if (ancien) btn.querySelector('span').textContent = 'Copié';
      btn.title = 'Copié';
      setTimeout(function () { btn.classList.remove('ok'); if (ancien) btn.querySelector('span').textContent = ancien; btn.title = btn.getAttribute('data-title') || 'Copier'; }, 1400);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texte).then(ok, function () { secours(texte); ok(); });
    } else { secours(texte); ok(); }
  }
  function secours(texte) {
    var t = document.createElement('textarea'); t.value = texte; t.setAttribute('readonly', '');
    t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t);
  }
  function boutonCopie(texte, label, titre) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn' + (label ? '' : ' icon');
    b.title = titre || 'Copier'; b.setAttribute('data-title', b.title); b.setAttribute('aria-label', b.title);
    b.innerHTML = ICON_COPY + (label ? '<span>' + esc(label) + '</span>' : '');
    if (label) b.setAttribute('data-label', label);
    b.addEventListener('click', function (e) { e.stopPropagation(); copier(typeof texte === 'function' ? texte() : texte, b); });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); });
    return b;
  }
  function copies() {
    // Références de dossiers (Registre, Archives)
    $$('.archive-header .archive-id').forEach(function (id) {
      var ref = id.textContent.trim();
      if (!ref || /█/.test(ref)) return;
      id.parentNode.insertBefore(boutonCopie(ref, '', 'Copier la référence ' + ref), id.nextSibling);
    });
    // Serment de l'Ombre (Lore)
    var serment = $('#lore-serment .lore-quote');
    if (serment) {
      var p = $('p', serment);
      var row = document.createElement('div'); row.className = 'copy-row';
      row.appendChild(boutonCopie(function () { return p.textContent.replace(/^["«\s]+|["»\s]+$/g, ''); }, 'Copier le Serment', 'Copier le Serment de l\'Ombre'));
      serment.appendChild(row);
    }
    // Matricules (Effectifs)
    if (typeof window.openMatricule === 'function') {
      var orig = window.openMatricule;
      window.openMatricule = function (id) {
        orig.apply(this, arguments);
        var txt = document.getElementById('badge-text');
        if (txt) {
          var row = document.createElement('div'); row.className = 'modal-tools';
          row.appendChild(boutonCopie(id, 'Copier le matricule', 'Copier le matricule ' + id));
          txt.appendChild(row);
        }
      };
    }
  }

  /* ---- 6. Date de mise à jour et journal ---- */
  function piedDePage() {
    var j = window.COO_JOURNAL; if (!j || !j.length) return;
    $$('footer').forEach(function (f) {
      if ($('.footer-maj', f)) return;
      var p = document.createElement('p'); p.className = 'footer-maj';
      p.innerHTML = 'Dernière mise à jour : ' + dateFr(j[0].date) + ' · <a href="journal.html">Journal des mises à jour</a>';
      var legal = $('.footer-legal', f);
      f.insertBefore(p, legal || null);
    });
  }
  function journal() {
    var cible = document.getElementById('journal-liste'); var j = window.COO_JOURNAL;
    if (!cible || !j) return;
    cible.innerHTML = j.map(function (e, k) {
      return '<article class="jr-entry" id="v' + e.version.replace('.', '-') + '"><div class="jr-head">' +
        '<time class="jr-date" datetime="' + e.date + '">' + dateFr(e.date) + '</time>' +
        '<span class="jr-ver">Version ' + esc(e.version) + '</span>' + (k === 0 ? '<span class="jr-new">Dernière version</span>' : '') +
        '<h3 class="jr-title">' + esc(e.titre) + '</h3></div><ul class="jr-list">' +
        e.points.map(function (pt) { return '<li>' + esc(pt) + '</li>'; }).join('') + '</ul></article>';
    }).join('');
  }

  /* ---- 7. Version imprimable ---- */
  function impression() {
    var modal = document.getElementById('profil-modal');
    var ouverts = [];
    window.addEventListener('beforeprint', function () {
      var dossier = modal && modal.classList.contains('open');
      document.body.classList.toggle('print-modal', !!dossier);
      var scelle = dossier && /COO-CMD-SN/.test((document.getElementById('profil-handle') || {}).textContent || '');
      document.body.classList.toggle('print-sealed', !!scelle);
      ouverts = [];
      $$('details:not([open])').forEach(function (d) { d.open = true; ouverts.push(d); });
    });
    window.addEventListener('afterprint', function () {
      document.body.classList.remove('print-modal', 'print-sealed');
      ouverts.forEach(function (d) { d.open = false; }); ouverts = [];
    });
    if (modal) {
      var box = $('.profil-box', modal);
      var msg = document.createElement('div'); msg.className = 'print-sealed-msg';
      msg.textContent = 'Document classé Niveau O. Impression interdite. Cette tentative a été consignée.';
      if (box) box.appendChild(msg);
      // Bouton « Imprimer » dans les dossiers et fiches, sauf le dossier scellé
      var corps = document.getElementById('profil-corps');
      if (corps) new MutationObserver(function () {
        yeux(corps);
        if ($('.modal-tools.dos-print', corps)) return;
        var handle = (document.getElementById('profil-handle') || {}).textContent || '';
        if (/COO-CMD-SN/.test(handle) || !corps.children.length || $('.sp-gate', corps)) return;
        var row = document.createElement('div'); row.className = 'modal-tools dos-print';
        var b = document.createElement('button'); b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'Imprimer';
        b.addEventListener('click', function () { window.print(); });
        row.appendChild(b); corps.appendChild(row);
      }).observe(corps, { childList: true });
    }
    // Lien « Imprimer » dans le pied de page
    $$('footer .footer-legal').forEach(function (l) {
      if ($('.print-link', l)) return;
      var a = document.createElement('a'); a.className = 'print-link'; a.textContent = 'Imprimer la page'; a.setAttribute('role', 'button'); a.tabIndex = 0;
      a.addEventListener('click', function () { window.print(); });
      a.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.print(); });
      l.appendChild(document.createTextNode(' · ')); l.appendChild(a);
    });
  }

  function init() {
    [evitement, progression, function () { yeux(document); }, copies, piedDePage, journal, impression].forEach(sur);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
