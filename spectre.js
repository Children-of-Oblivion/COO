/* Dossier du Spectre Noir : contenu chiffré (AES-GCM), déchiffré dans le navigateur avec la phrase d'ouverture. */
(function () {
  var DATA_URL = 'spectre-data.js';
  var parts = null, echecs = 0, verrou = null;

  function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function b64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function el(id) { return document.getElementById(id); }

  function charger(cb, ko) {
    if (window.SPECTRE_DATA) return cb();
    var s = document.createElement('script');
    s.src = DATA_URL; s.onload = cb; s.onerror = ko;
    document.head.appendChild(s);
  }

  async function dechiffrer(code) {
    var d = window.SPECTRE_DATA, enc = new TextEncoder();
    var base = await crypto.subtle.importKey('raw', enc.encode(norm(code)), 'PBKDF2', false, ['deriveKey']);
    for (var k = 0; k < d.w.length; k++) {
      try {
        var w = d.w[k];
        var kek = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(w.s), iterations: d.iter, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        var raw = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(w.i) }, kek, b64(w.c));
        var ck = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
        var pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(d.i) }, ck, b64(d.c));
        return JSON.parse(new TextDecoder().decode(pt)).parts;
      } catch (e) { /* mauvaise phrase pour ce bloc */ }
    }
    return null;
  }

  function entete() {
    var box = document.querySelector('#profil-modal .profil-box');
    if (box) { box.classList.add('dossier-box'); box.scrollTop = 0; }
    var av = el('profil-avatar'); if (av) av.style.display = 'none';
    el('profil-nom').textContent = 'Le Spectre Noir';
    el('profil-handle').textContent = 'Dossier biographique classifié · COO-CMD-SN-2026-001';
    el('profil-role').textContent = 'Commandant suprême · Accréditation Niveau O';
  }

  function porte() {
    var op = (typeof getOperatorId === 'function') ? getOperatorId() : 'OMBRE-????';
    el('profil-corps').innerHTML =
      '<div class="acces-terminal sp-gate">' +
      '<div class="acces-lines" id="sp-lines">' +
      '<p>&gt; Dossier scellé. Accréditation requise : Niveau O.</p>' +
      '<p>&gt; Son contenu ne figure dans aucun registre en clair.</p>' +
      '<p>&gt; Chaque tentative est consignée avec votre identifiant : <span>' + esc(op) + '</span></p>' +
      '</div>' +
      '<label class="acces-label" for="sp-input">Phrase d\'ouverture</label>' +
      '<div class="acces-row"><input id="sp-input" type="password" autocomplete="off" spellcheck="false">' +
      '<button type="button" id="sp-btn">Ouvrir le dossier</button></div>' +
      '<p class="acces-error" id="sp-error" role="alert"></p></div>';
    el('sp-input').addEventListener('keydown', function (e) { if (e.key === 'Enter') essayer(); });
    el('sp-btn').addEventListener('click', essayer);
    setTimeout(function () { var i = el('sp-input'); if (i) i.focus(); }, 60);
    if (verrou) verrouiller(verrou.reste);
  }

  function verrouiller(reste) {
    var i = el('sp-input'), b = el('sp-btn'), e = el('sp-error');
    if (!i) return;
    i.disabled = true; b.disabled = true;
    verrou = { reste: reste };
    e.textContent = 'Trois échecs. Canal verrouillé ' + reste + ' secondes.';
    var t = setInterval(function () {
      verrou.reste--;
      var i2 = el('sp-input'), b2 = el('sp-btn'), e2 = el('sp-error');
      if (verrou.reste <= 0) {
        clearInterval(t); verrou = null; echecs = 0;
        if (i2) { i2.disabled = false; b2.disabled = false; e2.textContent = 'Canal déverrouillé. Tentatives restantes : 3.'; i2.focus(); }
      } else if (e2 && i2 && i2.disabled) {
        e2.textContent = 'Trois échecs. Canal verrouillé ' + verrou.reste + ' secondes.';
      }
    }, 1000);
  }

  async function essayer() {
    var i = el('sp-input'), b = el('sp-btn'), e = el('sp-error');
    if (!i || i.disabled) return;
    var code = i.value;
    if (!norm(code)) return;
    if (!(window.crypto && crypto.subtle)) { e.textContent = 'Ce navigateur ne permet pas le déchiffrement (connexion sécurisée requise).'; return; }
    i.disabled = true; b.disabled = true; e.textContent = 'Vérification…';
    charger(async function () {
      var res = null;
      try { res = await dechiffrer(code); } catch (x) { res = null; }
      if (res) {
        parts = res; echecs = 0;
        var l = el('sp-lines');
        ['> Phrase acceptée.', '> Déchiffrement du dossier…'].forEach(function (m) { var p = document.createElement('p'); p.className = 'ok'; p.textContent = m; l.appendChild(p); });
        e.textContent = '';
        setTimeout(afficher, 800);
        return;
      }
      echecs++;
      i.value = '';
      if (echecs >= 3) { verrouiller(30); return; }
      i.disabled = false; b.disabled = false;
      e.innerHTML = 'Phrase refusée. Tentative consignée pour <span class="nowrap">' + esc((typeof getOperatorId === 'function') ? getOperatorId() : 'OMBRE-????') + '</span>. Restantes : ' + (3 - echecs) + '.';
      i.focus();
    }, function () {
      e.textContent = 'Dossier indisponible pour le moment. Réessayez dans un instant.';
      i.disabled = false; b.disabled = false;
    });
  }

  function afficher() {
    entete();
    var h = '<div class="dos-warn">Ce document est classé Niveau O. Si vous ne disposez pas des autorisations nécessaires, fermez cette fenêtre immédiatement. Chaque consultation est consignée.</div>';
    h += '<div class="profil-sect">Sommaire</div><ol class="sp-toc">';
    parts.forEach(function (p) { h += '<li><button type="button" data-sp="' + p[0] + '"><span>' + (p[0] < 10 ? '0' : '') + p[0] + '</span>' + esc(p[1]) + '</button></li>'; });
    h += '</ol><div class="sp-tools"><button type="button" data-sp-all="1">Tout déplier</button><button type="button" data-sp-all="0">Tout replier</button></div>';
    parts.forEach(function (p, k) {
      h += '<details class="dos-part" id="sp-p' + p[0] + '"' + (k === 0 ? ' open' : '') + '><summary><span class="dp-n">PARTIE ' + p[0] + '</span><span class="dp-t">' + esc(p[1]) + '</span></summary><div class="dp-body">' + p[2] + '</div></details>';
    });
    h += '<div class="dos-end">Fin du dossier · COO-CMD-SN-2026-001</div>';
    var c = el('profil-corps');
    c.innerHTML = h;
    c.onclick = function (ev) {
      var t = ev.target.closest('[data-sp],[data-sp-all]'); if (!t) return;
      if (t.hasAttribute('data-sp')) {
        var d = el('sp-p' + t.getAttribute('data-sp'));
        if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      } else {
        var o = t.getAttribute('data-sp-all') === '1';
        [].forEach.call(c.querySelectorAll('details.dos-part'), function (x) { x.open = o; });
      }
    };
    var box = document.querySelector('#profil-modal .profil-box'); if (box) box.scrollTop = 0;
  }

  window.openSpectre = function () {
    entete();
    if (parts) afficher(); else porte();
    el('profil-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
})();
