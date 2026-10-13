var PAGE_FILES = {"accueil": "index.html", "presentation": "presentation.html", "lore": "lore.html", "relations": "relations.html", "archives": "archives.html", "recrutement": "recrutement.html", "registre": "registre.html", "effectifs": "effectifs.html", "acces": "acces.html", "legal": "legal.html"};
  function currentPageId() { return document.body.getAttribute('data-page') || 'accueil'; }
  function showPage(id) {
    var nlm = document.querySelector('.nav-links'); if (nlm) nlm.classList.remove('open');
    if (id === currentPageId()) {
      window.scrollTo(0, 0);
      var tt = document.querySelector('.page.active .page-title');
      if (tt) typeText(tt, 14);
      return;
    }
    location.href = PAGE_FILES[id] || 'index.html';
  }

  // ===== ACCÈS RESTREINT =====
  var ARCHIVES_URL = 'https://children-of-oblivion.github.io/Archives-Noires/?v=4';
  var ARCHIVES_PHRASE = 'le seuil est ouvert';
  var accesEchecs = 0;
  function normPhrase(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u2019\u2018`\u00b4]/g, "'").replace(/\s+/g, ' ').trim();
  }
  function tryAcces() {
    var input = document.getElementById('acces-input');
    var btn = document.getElementById('acces-btn');
    var err = document.getElementById('acces-error');
    var lines = document.getElementById('acces-lines');
    if (input.disabled) return;
    if (normPhrase(input.value) === ARCHIVES_PHRASE) {
      err.textContent = '';
      input.disabled = true; btn.disabled = true;
      var msgs = ['> Phrase acceptée.', '> Ouverture du canal Niveau 4…', '> Transfert vers les archives du Commandement.'];
      msgs.forEach(function (m, i) {
        setTimeout(function () { var p = document.createElement('p'); p.className = 'ok'; p.textContent = m; lines.appendChild(p); }, 350 * (i + 1));
      });
      setTimeout(function () { location.href = ARCHIVES_URL; }, 1700);
      return;
    }
    accesEchecs++;
    input.value = '';
    if (accesEchecs >= 3) {
      var reste = 30;
      input.disabled = true; btn.disabled = true;
      err.textContent = 'Trois échecs. Canal verrouillé ' + reste + ' secondes.';
      var t = setInterval(function () {
        reste--;
        if (reste <= 0) {
          clearInterval(t); accesEchecs = 0;
          input.disabled = false; btn.disabled = false;
          err.textContent = 'Canal déverrouillé. Tentatives restantes : 3.';
          input.focus();
        } else {
          err.textContent = 'Trois échecs. Canal verrouillé ' + reste + ' secondes.';
        }
      }, 1000);
    } else {
      err.innerHTML = 'Phrase refusée. Tentative consignée pour <span class="nowrap">' + getOperatorId() + '</span>. Restantes : ' + (3 - accesEchecs) + '.';
      input.focus();
    }
  }

  function showLegal(id, btn) {
    document.querySelectorAll('.legal-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#page-legal .lore-nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('legal-' + id).classList.add('active');
    btn.classList.add('active');
  }

  function showLore(id, btn) {
    document.querySelectorAll('.lore-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#page-lore .lore-nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('lore-' + id).classList.add('active');
    btn.classList.add('active');
  }

  function toggleArchive(header) {
    const card = header.parentElement;
    card.classList.toggle('open');
  }

  function unlockPdi08() {
    var input = document.getElementById('lock-pdi08-input');
    var errorEl = document.getElementById('lock-pdi08-error');
    var norm = (input.value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, ' ').trim();
    if (norm === 'cadrage') {
      document.getElementById('lock-pdi08').style.display = 'none';
      document.getElementById('content-pdi08').style.display = 'block';
    } else {
      errorEl.textContent = 'Code incorrect.';
      input.value = '';
      input.focus();
    }
  }

  function unlock008() {
    var input = document.getElementById('lock-008-input');
    var errorEl = document.getElementById('lock-008-error');
    var norm = (input.value || '').toLowerCase().replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, ' ').trim();
    var target = "l'ombre ne peut disparaître";
    if (norm === target) {
      document.getElementById('lock-008').style.display = 'none';
      document.getElementById('content-008').style.display = 'block';
    } else {
      errorEl.textContent = 'Code incorrect.';
      input.value = '';
      input.focus();
    }
  }

  var BADGE_INFO = {
    neutralite: {
      title: "Neutralité idéologique",
      body: "Les Children of Oblivion ne servent <strong>aucun drapeau, aucune doctrine, aucune institution</strong>. Ni la Fondation, ni le Chaos Insurgent, ni aucun gouvernement ne peut prétendre nous posséder. Nous ne répondons qu'à deux choses : le contrat, et le Code de l'Ombre. Cette neutralité n'est pas de l'indifférence, c'est notre liberté. Quand on n'appartient à personne, <em>personne ne peut nous trahir d'en haut</em>."
    },
    loyaute: {
      title: "Loyauté absolue",
      body: "On ne trahit jamais un frère d'ombre. C'est la <strong>seule ligne rouge</strong> des COO, et la seule règle vraiment sacrée. Un opérateur en difficulté n'est jamais abandonné : la loyauté envers le groupe prime sur tout le reste, et elle est réciproque. La trahison, elle, est le seul crime impardonnable, aucune circonstance atténuante. <em>Demandez à l'Ombre-7.</em>"
    },
    paraanomales: {
      title: "Opérations para-anomales",
      body: "Les COO n'évitent pas l'anormal : ils opèrent dedans. Là où les autres factions confinent ou fuient, nous intervenons, en présence de <strong>SCP</strong>, d'entités para-normales et de phénomènes que la plupart préfèrent ignorer. Nos Analystes maintiennent le <em>Registre de l'Oubli</em>, notre base de données interne sur tout ce que nous croisons dans le noir. Tarif majoré. Risque assumé."
    },
    intersite: {
      title: "Intersite",
      body: "Les COO ne sont liés à <strong>aucune base, aucun site, aucun territoire</strong>. Pas de QG fixe à assiéger, pas d'adresse à brûler. Le Spectre Noir coordonne depuis un quartier général mobile dont seuls les Ombres Supérieurs connaissent la position. Nos cellules opèrent partout où un contrat les appelle, <em>d'un site à l'autre, sans frontière et sans signature</em>."
    }
  };

  var OPS_INFO = {
    reconnaissance: { title: "Reconnaissance & Infiltration", body: "Avant chaque contrat, il y a les Éclaireurs. Ce sont eux qui entrent en premier, seuls, parfois des jours avant le reste de la cellule. Ils cartographient, ils écoutent, ils comptent les gardes et mémorisent les rotations. Un bon Éclaireur peut passer une semaine dans une installation ennemie sans qu'un seul capteur ne s'allume. Chez les COO, on dit qu'une mission est gagnée ou perdue <em>avant</em> qu'elle ne commence, dans le silence du repérage. Tout ce qu'ils rapportent alimente le Registre de l'Oubli." },
    neutralisation: { title: "Neutralisation ciblée", body: "La spécialité qui a forgé la réputation des COO. Une cible désignée, un dossier, une fenêtre d'action. Les Exécuteurs n'improvisent pas : ils étudient, ils attendent, ils frappent une seule fois. <strong>Pas de témoins, pas de signature, pas de revendication.</strong> Les Exécuteurs ne tuent pas par plaisir et n'ajoutent jamais une victime sans raison. Mais ils ne s'embarrassent pas de sentiments : si un contrat est assez important, un civil peut devenir une cible, c'est le prix qui décide, pas la morale." },
    protection: { title: "Protection & Escorte", body: "Tout le monde croit que les COO ne savent que détruire. Les Boucliers prouvent le contraire. Escorter une cible de haute valeur à travers une zone hostile demande plus de sang-froid qu'un assaut : il faut tout prévoir, ne rien provoquer, et rester prêt à transformer une ruelle calme en zone de tir en une seconde. <em>Ce qui doit arriver à destination, arrive.</em> C'est une promesse, pas un slogan." },
    extraction: { title: "Extraction", body: "Sortir quelqu'un, ou quelque chose, d'un endroit dont il n'était pas censé sortir. Parfois la cible coopère. Souvent non. Les COO ne jugent pas : ils extraient. Scientifiques en fuite, prisonniers, données classifiées, objets anormaux scellés… le principe reste le même : entrer, récupérer, disparaître avant que l'alarme ne veuille dire quelque chose. L'Opération Voile Blanc reste l'exemple enseigné à chaque recrue." },
    sabotage: { title: "Sabotage", body: "Pas d'explosions spectaculaires, pas de signature. Le sabotage des COO est invisible : un système qui tombe en panne « tout seul », une chaîne logistique qui se grippe, une installation qui devient inutilisable sans qu'on sache jamais pourquoi. Les meilleurs sabotages ne sont attribués à personne, la cible croit à un accident. <strong>Proprement. Efficacement. Sans laisser de trace.</strong>" },
    anomales: { title: "Opérations anomales", body: "Le domaine que les autres factions refusent de toucher. Là où il y a un SCP, une entité, un phénomène que personne ne comprend, les COO acceptent quand même, pour un tarif majoré, et le risque pleinement assumé. Ce sont les Analystes SCP qui dirigent ces opérations et consignent tout dans le <em>Registre de l'Oubli</em>. Certaines de ces missions ne sont jamais revenues complètes. Demandez à ce qui reste de la cellule de l'Opération Dent Noire." }
  };

  var SPEC_INFO = {
    eclaireur: { title: "🎯 Éclaireur", body: "L'œil des COO. Un Éclaireur travaille seul, léger, silencieux. Sa mission n'est pas de combattre mais de <em>savoir</em>, où sont les gardes, où sont les caméras, où est la faille. On dit qu'un bon Éclaireur entend une installation respirer. Mentalité : patience absolue, ego nul. Un Éclaireur qui se fait remarquer est un Éclaireur mort. La plupart des opérateurs les plus respectés des COO sont passés par là." },
    bouclier: { title: "🛡 Bouclier", body: "Là où les autres apprennent à frapper, le Bouclier apprend à encaisser. Spécialiste de la protection rapprochée et de la sécurisation de zone, il se place entre la menace et ce qu'il protège, sans hésiter. C'est un état d'esprit autant qu'une compétence : le Bouclier accepte de tomber pour que la mission tienne debout. <strong>Un frère d'ombre ne tombe jamais seul.</strong>" },
    executeur: { title: "☠ Exécuteur", body: "La spécialisation la plus crainte, et la plus encadrée. Un Exécuteur est entraîné à la neutralisation ciblée et aux opérations létales, mais le Code de l'Ombre le tient en laisse : jamais par plaisir, jamais sans contrat. Un civil peut entrer dans le contrat si le prix le justifie, mais un Exécuteur qui tue par goût, et non sur ordre, est un danger pour les COO eux-mêmes. La précision avant la force. <em>Une seule fois, proprement.</em>" },
    analyste: { title: "🧬 Analyste SCP", body: "Le cerveau anomal des COO. L'Analyste étudie ce que les autres fuient : SCP, entités, phénomènes para-normaux. C'est lui qui tient le <strong>Registre de l'Oubli</strong>, la base de données interne qui recense tout ce que le groupe a croisé dans le noir. Sur le terrain, son rôle est de dire quand continuer, et quand annuler. Les cellules qui ignorent l'avis de leur Analyste finissent souvent dans le Registre… du mauvais côté." },
    medecin: { title: "⚕ Médecin de Guerre", body: "On ne disparaît pas en laissant ses blessés derrière. Le Médecin de Guerre maintient les opérateurs en vie là où il n'y a ni hôpital, ni renforts, ni seconde chance. Stabiliser sous le feu, opérer dans le noir, décider en quelques secondes qui peut être sauvé. C'est aussi souvent la dernière voix qu'un opérateur entend. Chez les COO, le Médecin est protégé comme un trésor." },
    technicien: { title: "📡 Technicien", body: "Les mains invisibles de l'opération. Le Technicien ouvre les portes verrouillées, aveugle les caméras, brouille les communications et fait parler les systèmes ennemis. Sans lui, l'Éclaireur reste dehors et l'Exécuteur n'a pas de fenêtre. Hacking, intrusion, matériel sur mesure : le Technicien transforme une cible impénétrable en simple question de temps." }
  };

  function _openModal(eyebrow, title, bodyHTML) {
    document.getElementById('badge-eyebrow').textContent = eyebrow;
    document.getElementById('badge-title').textContent = title;
    document.getElementById('badge-text').innerHTML = bodyHTML;
    document.getElementById('badge-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openBadge(key) {
    var info = BADGE_INFO[key];
    if (info) _openModal("COO-UNIT-01 · Doctrine de l'Ombre", info.title, info.body);
  }

  function openOps(key) {
    var info = OPS_INFO[key];
    if (info) _openModal("COO-UNIT-01 · Domaine d'intervention", info.title, info.body);
  }

  function openSpec(key) {
    var info = SPEC_INFO[key];
    if (info) _openModal("COO-UNIT-01 · Spécialisation", info.title, info.body);
  }

  function closeBadge() {
    document.getElementById('badge-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ===== PROFILS DE L'ÉQUIPE =====
  var MEMBRES = {
    space: {
      nom: 'Space', handle: '@.space.1 · Roblox DOUDOU20087',
      role: 'Fondateur et gérant', groupe: 'Direction', av: 'space',
      fait: [
        'Création et direction du projet',
        'Écriture intégrale du lore et des dossiers du Registre de l\'Oubli',
        'Conception et développement des deux sites',
        'Bannière des COO (le logo est de Gruyere)',
        'Gestion du serveur Discord',
        'Build'
      ],
      visuels: [
        { cap: 'Bannière des COO', css: 'var(--banner)' }
      ],
      liens: [{ label: 'Registre de l\'Oubli', page: 'registre' }, { label: 'Lore du projet', page: 'lore' }]
    },
    antho: {
      nom: '\uD835\uDD6C\uD835\uDD93\uD835\uDD99\uD835\uDD8D\uD835\uDD94', handle: '@y.u.t.a',
      role: 'Co-gérant', groupe: 'Direction', av: 'antho',
      fait: ['Gestion du serveur Discord', 'Build de la map']
    },
    gruyere: {
      nom: 'Gruyere', handle: '@gruyere_666',
      role: 'Graphiste', groupe: 'Graphisme', av: 'gruyere',
      fem: true,
      fait: ['Réalisation du logo des COO', 'Représentation visuelle des SCP'],
      visuels: [{ cap: 'Logo des COO', css: 'var(--logo)' }],
      attente: 'Travaux en cours. Les représentations visuelles des SCP arrivent prochainement et seront ajoutées ici.'
    },
    winter: {
      nom: 'Winter', handle: '@winter057659',
      role: 'Graphiste', groupe: 'Graphisme', av: 'winter',
      fait: ['Représentation visuelle des SCP'],
      attente: 'Travaux en cours. Les représentations visuelles des SCP arrivent prochainement et seront ajoutées ici.'
    },
    anonyme: {
      nom: 'Anonyme', handle: 'Identité non communiquée',
      role: 'Builder', groupe: 'Build', av: null,
      fait: ['Build'],
      attente: 'Souhaite rester anonyme. Aucune information d\'identification ne figure sur ce profil, à sa demande.'
    },
    h3x: {
      nom: 'h3x', handle: '@kekh3x',
      role: 'Contribution ponctuelle', groupe: 'Contributions ponctuelles', av: 'h3x',
      fait: ['Écriture du lore de la personnalité d\'intérêt « Le Photographe »'],
      liens: [{ label: 'Ouvrir PDI-08 « Le Photographe »', ref: 'PDI-08' }],
      attente: 'Rejoindra peut-être l\'équipe comme loriste.'
    },
    kaito: {
      nom: 'Kaito', handle: '@kaito_no.fear',
      role: 'Contribution ponctuelle', groupe: 'Contributions ponctuelles', av: 'kaito',
      fait: ['Amélioration du lore de la personnalité d\'intérêt « Le Transfuge »'],
      liens: [{ label: 'Ouvrir PDI-04 « Le Transfuge »', ref: 'PDI-04' }],
      attente: 'Rejoindra peut-être l\'équipe comme loriste.'
    },
    b: {
      nom: 'B', handle: '@zek.no1',
      role: 'Contribution ponctuelle', groupe: 'Contributions ponctuelles', av: 'b',
      fait: ['Réalisation d\'un serveur Discord']
    }
  };

  function openProfil(cle) {
    var m = MEMBRES[cle];
    if (!m) return;
    var avEl = document.getElementById('profil-avatar');
    avEl.style.backgroundImage = m.av ? 'var(--av-' + m.av + ')' : 'none';
    document.getElementById('profil-nom').textContent = m.nom;
    document.getElementById('profil-handle').textContent = m.handle;
    document.getElementById('profil-role').textContent = m.role;

    var html = '<div class="profil-sect">Au sein du projet</div>';
    html += '<ul class="profil-liste"><li>' + m.groupe + '</li></ul>';

    html += '<div class="profil-sect">Ce qu\'' + (m.fem ? 'elle' : 'il') + ' a fait</div><ul class="profil-liste">';
    for (var i = 0; i < m.fait.length; i++) html += '<li>' + m.fait[i] + '</li>';
    html += '</ul>';

    if (m.visuels && m.visuels.length) {
      html += '<div class="profil-sect">Créations</div><div class="profil-visuels">';
      for (var v = 0; v < m.visuels.length; v++) {
        html += '<div class="profil-visuel"><div class="profil-visuel-img" style="background-image:'
             + m.visuels[v].css + '"></div><div class="profil-visuel-cap">'
             + m.visuels[v].cap + '</div></div>';
      }
      html += '</div>';
    }

    if (m.liens && m.liens.length) {
      if (!m.visuels) html += '<div class="profil-sect">Créations</div>';
      html += '<div>';
      for (var l = 0; l < m.liens.length; l++) {
        var lien = m.liens[l];
        var act = lien.ref ? "allerDossier('" + lien.ref + "')" : "allerPage('" + lien.page + "')";
        html += '<button type="button" class="profil-lien" onclick="' + act + '">' + lien.label + '</button>';
      }
      html += '</div>';
    }

    if (m.attente) html += '<div class="profil-sect">Note</div><p class="profil-attente">' + m.attente + '</p>';

    document.getElementById('profil-corps').innerHTML = html;
    document.getElementById('profil-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProfil() {
    document.getElementById('profil-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function allerPage(id) {
    closeProfil();
    showPage(id);
  }

  function allerDossier(ref) {
    closeProfil();
    if (currentPageId() === 'registre') { ouvrirDossier(ref); return; }
    location.href = 'registre.html#dossier=' + encodeURIComponent(ref);
  }
  function ouvrirDossier(ref) {
    var cibles = [].slice.call(document.querySelectorAll('#page-registre .threat-id'));
    var el = null;
    for (var i = 0; i < cibles.length; i++) {
      if (cibles[i].textContent.trim() === ref) { el = cibles[i]; break; }
    }
    if (!el) return;
    var card = el.closest('.threat-card');
    card.classList.add('open');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('profil-modal').classList.contains('open')) closeProfil();
  });

  var GRADE_INFO = {
    spectre: { title: "☠ Spectre Noir", body: "<span class='stamp stamp-red' style='margin-top:0;margin-bottom:0.9rem;'>Identité classifiée</span><br>Le sommet. Une seule personne porte ce nom de code, et son identité est le secret le mieux gardé des COO. Le Spectre Noir a autorité absolue : dernier mot sur chaque contrat, chaque promotion, chaque décision stratégique. Il ne rend de comptes à personne, sauf à l'Oubli. On ne le choisit pas : on <em>devient</em> Spectre Noir. Sa section dans le Lore lui est entièrement consacrée." },
    superieur: { title: "Ombre Supérieur", body: "Le bras droit du Spectre Noir. Les Ombres Supérieurs commandent les opérations et gèrent les cellules en son absence ou sur son ordre. Sur le terrain, leur autorité est absolue. C'est le seul grade autorisé à choisir librement son nom de code, un privilège qui se mérite, jamais qui se demande. <strong>Nom de code : libre.</strong>" },
    veteran: { title: "Wither", body: "Les piliers opérationnels des COO. Chefs de section, les Wither font le lien entre le commandement et les opérateurs actifs. Ils ont prouvé leur valeur sur le terrain et leur loyauté dans l'adversité, et décident des promotions au sein de leurs sections. <strong>Nom de code : Wither-[chiffre].</strong>" },
    confirme: { title: "Ombre", body: "Opérateurs pleinement intégrés et spécialisés. Une Ombre a fait ses preuves, obtenu une spécialisation selon ses aptitudes et gagné la confiance du groupe. C'est à partir de ce grade qu'on peut porter une spécialisation et encadrer des Fantômes. <strong>Nom de code : Ombre-[chiffre].</strong>" },
    fantome: { title: "Fantôme", body: "Le point d'entrée dans les COO. Le Fantôme est accepté, pas encore confirmé. Il observe, il apprend, il exécute les ordres sans les questionner. Pas de spécialisation, accès limité, période d'observation permanente. C'est ici que tout le monde commence, et ici que la plupart abandonnent. <strong>Nom de code : Fantôme-[chiffre].</strong>" }
  };

  function openGrade(key) {
    var info = GRADE_INFO[key];
    if (info) _openModal("COO-UNIT-01 · Grade", info.title, info.body);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeBadge();
  });

  // ===== AMBIANCE =====
  function getOperatorId() {
    try {
      var id = localStorage.getItem('coo_operator_id');
      if (!id) { id = 'OMBRE-' + Math.floor(1000 + Math.random() * 9000); localStorage.setItem('coo_operator_id', id); }
      return id;
    } catch (e) { return 'OMBRE-????'; }
  }
  function initHud() {
    var opEl = document.getElementById('hud-opid');
    if (opEl) opEl.textContent = getOperatorId();
    var accesOp = document.getElementById('acces-opid');
    if (accesOp) accesOp.textContent = getOperatorId();
    var clockEl = document.getElementById('hud-clock');
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tickClock() {
      if (!clockEl) return;
      var d = new Date();
      clockEl.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    tickClock();
    setInterval(tickClock, 1000);
    startSessionTimer();
  }

  var SESSION_DURATION = 5 * 60;
  var SESSION_KEY = 'coo_session_start';
  var sessionRemaining = SESSION_DURATION;
  var sessionInterval = null;
  function resetSessionStart() {
    var n = Date.now();
    try { sessionStorage.setItem(SESSION_KEY, String(n)); } catch (e) {}
    return n;
  }
  function getSessionStart() {
    try { var v = parseInt(sessionStorage.getItem(SESSION_KEY), 10); if (v) return v; } catch (e) {}
    return resetSessionStart();
  }
  function computeRemaining() {
    return Math.max(0, SESSION_DURATION - Math.floor((Date.now() - getSessionStart()) / 1000));
  }
  function startSessionTimer() {
    clearInterval(sessionInterval);
    sessionRemaining = computeRemaining();
    updateSessionDisplay();
    if (sessionRemaining <= 0) { triggerSessionLock(); return; }
    sessionInterval = setInterval(function () {
      sessionRemaining = computeRemaining();
      updateSessionDisplay();
      if (sessionRemaining <= 0) {
        clearInterval(sessionInterval);
        triggerSessionLock();
      }
    }, 1000);
  }
  function updateSessionDisplay() {
    var el = document.getElementById('session-timer');
    if (!el) return;
    var m = Math.floor(sessionRemaining / 60), s = sessionRemaining % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    el.classList.remove('warn', 'critical');
    if (sessionRemaining <= 30) el.classList.add('critical');
    else if (sessionRemaining <= 90) el.classList.add('warn');
  }
  function triggerSessionLock() {
    var lock = document.getElementById('session-lock');
    if (lock) lock.classList.add('open');
  }
  function reconnectSession() {
    var lock = document.getElementById('session-lock');
    if (lock) lock.classList.remove('open');
    resetSessionStart();
    startSessionTimer();
  }

  var BOOT_LINES = ["> COO-UNIT-01 :: terminal sécurisé","> Chiffrement du canal… OK","> Authentification biométrique… OK","> Connexion au Registre de l'Oubli…","> Session limitée à 05:00, accès révoqué au-delà.","> Accès accordé.","> Bienvenue, opérateur."];
  var bootSkipped = false, bootDone = false;
  function runBoot() {
    var el = document.getElementById('boot-text');
    var bar = document.getElementById('boot-bar');
    var idEl = document.getElementById('boot-id');
    if (!el) { typeTagline(); initHud(); return; }
    var li = 0, ci = 0, out = '';
    function tick() {
      if (bootSkipped) return;
      if (bar) bar.style.width = Math.min(100, Math.round((li / BOOT_LINES.length) * 100)) + '%';
      if (li < BOOT_LINES.length) {
        var line = BOOT_LINES[li];
        if (ci <= line.length) { el.textContent = out + line.slice(0, ci); ci++; setTimeout(tick, 20); }
        else { out += line + '\n'; li++; ci = 0; setTimeout(tick, 220); }
      } else {
        if (bar) bar.style.width = '100%';
        if (idEl) { idEl.textContent = 'Identifiant opérateur : ' + getOperatorId(); idEl.classList.add('show'); }
        setTimeout(endBoot, 750);
      }
    }
    tick();
  }
  function skipBoot() { bootSkipped = true; endBoot(); }
  function endBoot() {
    if (bootDone) return; bootDone = true;
    try { sessionStorage.setItem('coo_booted', '1'); } catch (e) {}
    var boot = document.getElementById('boot');
    if (boot) { boot.classList.add('done'); setTimeout(function(){ boot.style.display = 'none'; }, 650); }
    typeTagline();
    initHud();
  }
  function typeText(el, speed) {
    if (!el) return;
    var full = el.getAttribute('data-full');
    if (!full) { full = el.textContent; el.setAttribute('data-full', full); }
    clearInterval(el._typeInterval);
    el.textContent = '';
    var i = 0;
    el._typeInterval = setInterval(function () {
      el.textContent = full.slice(0, i);
      i++;
      if (i > full.length) clearInterval(el._typeInterval);
    }, speed || 16);
  }
  function typeTagline() {
    var el = document.querySelector('.hero-tagline');
    if (!el || el.dataset.typed) return;
    el.dataset.typed = '1';
    var full = el.textContent;
    el.style.minHeight = el.offsetHeight + 'px';
    el.textContent = '';
    var i = 0;
    (function t() { if (i <= full.length) { el.textContent = full.slice(0, i); i++; setTimeout(t, 24); } })();
  }
  window.addEventListener('load', runBoot);

  function toggleNav() { var n = document.querySelector('.nav-links'); if (n) n.classList.toggle('open'); }

  var skullCount = 0;
  function skullClick() {
    skullCount++;
    if (skullCount >= 7) {
      skullCount = 0;
      _openModal("Accès non répertorié", "☠ L'Oubli t'a trouvé", "Sept. C'est le nombre de survivants de l'Escadron Lazare, sept ombres qui auraient dû mourir, et qui ont choisi de disparaître à la place. <em>Tu viens de retrouver ce que tout le monde a oublié.</em><br><br><strong>« 7 survivants. 1 serment. Aucun retour. »</strong>");
    }
  }

  var MATRICULES = {
    "Wither-1": { g: "Wither", s: "Médecin de guerre", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-2": { g: "Wither", s: "Éclaireur", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-3": { g: "Wither", s: "Bouclier", st: "Disparu", fl: "Disparu en marge d'une opération de routine. Aucun signe de lutte, aucune trace. Matricule maintenu." },
    "Wither-4": { g: "Wither", s: "Exécuteur", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-5": { g: "Wither", s: "Exécuteur", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-6": { g: "Wither", s: "Exécuteur", st: "Disparu", fl: "Disparu sans témoin ni explication. Le rang suivant se demande s'il est le prochain." },
    "Wither-7": { g: "Wither", s: "Analyste SCP", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-8": { g: "Wither", s: "Médecin de guerre", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Wither-9": { g: "Wither", s: "Technicien", st: "Disparu", fl: "Porté disparu entre deux transmissions radio. Le dernier message ne contenait rien d'alarmant." },
    "Wither-10": { g: "Wither", s: "Éclaireur", st: "Actif", fl: "En service actif. Chef de section, pilier opérationnel des COO." },
    "Ombre-1": { g: "Ombre", s: "Éclaireur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-2": { g: "Ombre", s: "Éclaireur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-3": { g: "Ombre", s: "Éclaireur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-4": { g: "Ombre", s: "Éclaireur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-5": { g: "Ombre", s: "Éclaireur", st: "Disparu", fl: "Disparu sans trace. Aucun signe de lutte relevé sur le dernier site connu." },
    "Ombre-6": { g: "Ombre", s: "Bouclier", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-7": { g: "Ombre", s: "Bouclier", st: "Décédé", fl: "Tombé pour protéger sa cellule. Son matricule ne sera jamais réattribué." },
    "Ombre-8": { g: "Ombre", s: "Bouclier", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-9": { g: "Ombre", s: "Bouclier", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-10": { g: "Ombre", s: "Bouclier", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-11": { g: "Ombre", s: "Exécuteur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-12": { g: "Ombre", s: "Exécuteur", st: "En mission", fl: "Déployé sur un contrat en cours. Injoignable jusqu'à extraction." },
    "Ombre-13": { g: "Ombre", s: "Exécuteur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-14": { g: "Ombre", s: "Exécuteur", st: "Disparu", fl: "Disparu en poste. Aucune trace, aucune revendication, aucune explication." },
    "Ombre-15": { g: "Ombre", s: "Exécuteur", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-16": { g: "Ombre", s: "Analyste SCP", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-17": { g: "Ombre", s: "Analyste SCP", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-18": { g: "Ombre", s: "Analyste SCP", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-19": { g: "Ombre", s: "Analyste SCP", st: "Blessé", fl: "En convalescence suite à une opération. Retour au service prévu prochainement." },
    "Ombre-20": { g: "Ombre", s: "Analyste SCP", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-21": { g: "Ombre", s: "Médecin de Guerre", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-22": { g: "Ombre", s: "Médecin de Guerre", st: "En recherche", fl: "A quitté son poste pour retrouver quelqu'un. Statut non confirmé, matricule maintenu." },
    "Ombre-23": { g: "Ombre", s: "Médecin de Guerre", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-24": { g: "Ombre", s: "Médecin de Guerre", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-25": { g: "Ombre", s: "Médecin de Guerre", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-26": { g: "Ombre", s: "Technicien", st: "En mission", fl: "Déployé sur un contrat en cours. Injoignable jusqu'à extraction." },
    "Ombre-27": { g: "Ombre", s: "Technicien", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-28": { g: "Ombre", s: "Technicien", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-29": { g: "Ombre", s: "Technicien", st: "Actif", fl: "En service actif au sein des Children of Oblivion." },
    "Ombre-30": { g: "Ombre", s: "Technicien", st: "Coma", fl: "Ramené d'une opération entre la vie et la mort. Toujours inconscient, les COO veillent sur lui." },
    "Fantôme-1": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-2": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-3": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-4": { g: "Fantôme", s: "-", st: "Blessé", fl: "Blessé lors d'un exercice. En convalescence, statut de Fantôme maintenu." },
    "Fantôme-5": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-6": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-7": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-8": { g: "Fantôme", s: "-", st: "Décédé", fl: "Mort avant d'avoir pu devenir une Ombre. Le premier nom qu'on oublie." },
    "Fantôme-9": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-10": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-11": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-12": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-13": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-14": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-15": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-16": { g: "Fantôme", s: "-", st: "Suspendu", fl: "Période d'observation suspendue à titre disciplinaire. Réintégration non garantie." },
    "Fantôme-17": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-18": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-19": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." },
    "Fantôme-20": { g: "Fantôme", s: "-", st: "Actif", fl: "En période d'observation. Pas encore confirmé, pas de spécialisation." }
  };

  function openMatricule(id) {
    var m = MATRICULES[id];
    if (!m) return;
    var body = "<strong>Grade :</strong> " + m.g + "<br><strong>Spécialisation :</strong> " + m.s + "<br><strong>Statut :</strong> " + m.st + "<br><br><em>" + m.fl + "</em>";
    _openModal("COO-UNIT-01 · Matricule", id, body);
  }

  // ============ RECHERCHE ============
  var SEARCH_INDEX = [], SEARCH_RESULTS = [];
  function loadSearchIndex(cb) {
    if (SEARCH_INDEX.length) { cb(); return; }
    function prep() {
      SEARCH_INDEX = (window.COO_SEARCH_DATA || []).map(function (e) { e.low = e.raw.toLowerCase(); return e; });
      cb();
    }
    if (window.COO_SEARCH_DATA) { prep(); return; }
    var s = document.createElement('script');
    s.src = 'search-index.js';
    s.onload = prep;
    s.onerror = function () { var box = document.getElementById('search-results'); if (box) box.innerHTML = '<div class="search-empty">Index de recherche indisponible.</div>'; };
    document.head.appendChild(s);
  }
  function openSearch() {
    document.getElementById('search-overlay').classList.add('open');
    var inp = document.getElementById('search-input');
    inp.value = ''; runSearch('');
    loadSearchIndex(function () { if (inp.value) runSearch(inp.value); });
    setTimeout(function(){ inp.focus(); }, 50);
  }
  function closeSearch() {
    var ov = document.getElementById('search-overlay');
    if (ov) ov.classList.remove('open');
  }
  function _esc(t){ return (t+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _snippet(raw, low, q) {
    var i = low.indexOf(q);
    if (i < 0) return raw.slice(0, 95) + '…';
    var start = Math.max(0, i - 35);
    return (start > 0 ? '…' : '') + raw.slice(start, i + q.length + 55).trim() + '…';
  }
  function runSearch(q) {
    q = (q||'').trim().toLowerCase();
    var box = document.getElementById('search-results');
    if (!box) return;
    if (!q) { box.innerHTML = '<div class="search-hint">Tape un mot ou une phrase, on te propose la bonne catégorie.</div>'; return; }
    SEARCH_RESULTS = SEARCH_INDEX.filter(function(e){ return e.low.indexOf(q) !== -1 || e.label.toLowerCase().indexOf(q) !== -1; });
    if (!SEARCH_RESULTS.length) { box.innerHTML = '<div class="search-empty">Aucun résultat pour « ' + _esc(q) + ' ».</div>'; return; }
    box.innerHTML = SEARCH_RESULTS.map(function(e, idx){
      return '<button class="search-item" onclick="searchGo(' + idx + ')"><div class="si-cat">' + _esc(e.cat) + '</div><div class="si-label">' + _esc(e.label) + '</div><div class="si-snippet">' + _esc(_snippet(e.raw, e.low, q)) + '</div></button>';
    }).join('');
  }
  function searchGo(i) {
    var r = SEARCH_RESULTS[i]; if (!r) return;
    closeSearch();
    if (r.page !== currentPageId()) {
      location.href = (PAGE_FILES[r.page] || 'index.html') + (r.lore ? '#lore=' + r.lore : '');
      return;
    }
    window.scrollTo(0, 0);
    if (r.lore) ouvrirLore(r.lore);
  }
  function ouvrirLore(id) {
    var btns = document.querySelectorAll('.lore-nav button');
    for (var k = 0; k < btns.length; k++) {
      if ((btns[k].getAttribute('onclick')||'').indexOf("'" + id + "'") !== -1) { btns[k].click(); break; }
    }
  }
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); openSearch(); }
  });


  // ===== INITIALISATION PAGE (multi-pages) =====
  function initFromHash() {
    var h = ''; try { h = decodeURIComponent((location.hash || '').slice(1)); } catch (e) {}
    var m;
    if ((m = h.match(/^lore=(.+)$/))) { ouvrirLore(m[1]); window.scrollTo(0, 0); }
    else if ((m = h.match(/^dossier=(.+)$/))) { setTimeout(function () { ouvrirDossier(m[1]); }, 150); }
  }
  window.addEventListener('load', function () {
    if (currentPageId() !== 'accueil') {
      var tt = document.querySelector('.page.active .page-title');
      if (tt) typeText(tt, 14);
    }
    initFromHash();
  });
