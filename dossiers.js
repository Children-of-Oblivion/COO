/* Dossiers des Ombres Supérieurs et du Conseiller (page Effectifs) */
(function () {
  function sect(t) { return '<div class="profil-sect">' + t + '</div>'; }
  function par(t) { return '<p class="dos-par">' + t + '</p>'; }
  function liste(items) { return '<ul class="profil-liste">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function table(head, rows) {
    return '<table class="dos-table"><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>'
      + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function bar(p) { return '<div class="dos-bar"><i style="width:' + p + '%"></i></div>'; }
  function attente() {
    return sect('Lore') + '<p class="profil-attente">Le lore de cet Ombre Supérieur est en construction. Son dossier sera complété prochainement.</p>';
  }
  function fiche(spec, statut) {
    return sect('Fiche') + liste(['<strong>Grade :</strong> Ombre Supérieur', '<strong>Spécialisation :</strong> ' + spec, '<strong>Statut :</strong> ' + statut]);
  }

  var DOSSIERS = {
    arknights: {
      nom: 'Arknights', handle: 'Indicatif · ancien chef de l\'unité médicale de terrain, Delta Force',
      role: 'Ombre Supérieur · Médecin de Guerre',
      corps: fiche('Médecin de Guerre', 'Actif') + sect('Lore')
        + par('Chef de l\'unité médicale de terrain de la Delta Force, il est rapidement remarqué par ses supérieurs pour son travail, son expérience et ses responsabilités. Du fait de son appartenance à la Delta Force et de son parcours, son nom et ses actifs sont hautement classifiés.')
        + par('Lors d\'une opération « black ops », son escadron est anéanti. Ses supérieurs lui en font porter la responsabilité, ce qui le pousse à démissionner de la Delta Force.')
        + par('Il devient ensuite mercenaire et agit dans diverses régions du monde, se forgeant une réputation dans le milieu du mercenariat et des contractors. Personne ne sait avec qui il travaillait : du jour au lendemain, il disparaît.')
        + par('C\'est à ce moment qu\'il rejoint les COO. Il y porte son propre indicatif, « Arknights », remplace un ancien membre et intègre directement les Ombres Supérieurs, par recrutement exceptionnel décidé par le Spectre Noir, délaissant son identité. Il devient une Ombre.')
    },
    requiem: { nom: 'REQUIEM', handle: 'Ombre Supérieur', role: 'Ombre Supérieur · Exécuteur', corps: fiche('Exécuteur', 'Actif') + attente() },
    warden: { nom: 'WARDEN', handle: 'Ombre Supérieur', role: 'Ombre Supérieur · Bouclier', corps: fiche('Bouclier', 'Actif') + attente() },
    vesper: { nom: 'VESPER', handle: 'Ombre Supérieur', role: 'Ombre Supérieur · Technicien', corps: fiche('Technicien', 'Actif') + attente() },
    wraith: { nom: 'WRAITH', handle: 'Ombre Supérieur', role: 'Ombre Supérieur · Éclaireur', corps: fiche('Éclaireur', 'Actif') + attente() },
    nox: { nom: 'NOX', handle: 'Ombre Supérieur', role: 'Ombre Supérieur · Analyste SCP', corps: fiche('Analyste SCP', 'Actif') + attente() },

    conseiller: {
      nom: 'Le Conseiller', handle: 'Victor Aaron Vane · alias Janus',
      role: 'Conseiller Principal du Spectre Noir',
      wide: true,
      corps: '<span class="stamp stamp-red dos-stamp">Dossier classifié</span>'
        + par('<em>Extrait public. Dossier complet : niveau d\'habilitation Ombre Supérieur / Conseil des Ombres uniquement.</em>')
        + sect('1. Identité et alias')
        + liste([
          '<strong>Nom de naissance :</strong> Vane, Victor Aaron',
          '<strong>Nom d\'usage opératif :</strong> Le Conseiller',
          '<strong>Alias répertoriés :</strong> « L\'Archiviste du Néant », « Scribe-0 », « Le Masque de Plomb », « Janus »',
          '<strong>Âge :</strong> 52 ans (physique conservé, altérations biologiques minimes post-transfuge)',
          '<strong>Origine :</strong> Strasbourg, France, avec des influences familiales d\'Europe centrale',
          '<strong>Statut civil officiel :</strong> décédé (déclaré mort au combat lors de la brèche du Site-54 pour la Fondation SCP)',
          '<strong>Statut opérationnel actuel :</strong> actif, Conseiller Principal du Spectre Noir (COO)'
        ])
        + table(['Paramètre', 'Registre officiel (Fondation SCP)', 'Registre réel (COO)'], [
          ['Identité civile', 'Victor Aaron Vane', '[EFFACÉ / ARCHIVISTE]'],
          ['Niveau d\'habilitation', 'Niveau 4 (révoqué / effacé)', 'Rang 0 : Conseiller Principal'],
          ['Dernier emplacement connu', 'Site-54 (zone de confinement)', 'Mobile / Sanctuaires du Conseil'],
          ['Menace tactique', 'Absolue (fuite stratégique majeure)', 'Pilier de Commandement']
        ])
        + sect('2. Origines et vie avant la Fondation SCP')
        + par('Victor Aaron Vane naît au sein d\'une ancienne famille aristocratique de Strasbourg, aux ramifications complexes en Europe centrale. Élevé dans un environnement austère où la démonstration d\'émotions est perçue comme une défaillance structurelle, il subit l\'influence directe de son grand-père paternel, ancien haut gradé militaire issu des services de renseignement d\'après-guerre. Sous cette tutelle intransigeante, il développe une rigueur intellectuelle quasi pathologique, complétée par un pragmatisme glacial.')
        + par('Sa formation académique est exemplaire. Admis à Sciences Po Paris puis transféré à l\'École de Guerre dans les cursus de spécialisation stratégique, il décroche des doctorats en géopolitique, en cryptographie avancée et en analyse comportementale systémique. Ses travaux, portant sur « La prédictibilité des ruptures étatiques dans les systèmes à haute opacité », attirent rapidement la curiosité des services secrets civils français (DGSE), où il intègre la direction de la stratégie.')
        + par('Durant six ans, Vane orchestre dans l\'ombre la gestion de crises géopolitiques majeures et le décodage de réseaux d\'espionnage rivaux. Sa capacité à anticiper les comportements adverses à partir de signaux faibles microscopiques le démarque. À la suite de l\'interception d\'un signal cryptographique anormal d\'origine inconnue en Europe de l\'Est, classé par la Fondation SCP sous l\'étiquette d\'événement anormal Anomaly-E44, il est repéré par ses recruteurs. Impressionnée par sa neutralité morale face à l\'incompréhensible et par sa maîtrise absolue de la discrétion, la Fondation simule son recrutement au sein d\'un cabinet ministériel fantôme pour l\'absorber définitivement dans ses rangs.')
        + sect('3. Carrière au sein de la Fondation SCP')
        + par('Incorporé dans la Division du Renseignement, Vane monte rapidement jusqu\'au Niveau 4 d\'habilitation. Il est nommé à la tête de la Section d\'Analyse des Risques Existentiels et des Relations Inter-Factions. Son rôle consiste à cartographier les équilibres de force entre la Fondation et les Groupes d\'Intérêt (GdI) tels que la Coalition Mondiale de l\'Occultisme (CMO), l\'Insurrection du Chaos ou la Main du Serpent, tout en prédisant les scénarios d\'effondrement stratégique interne.')
        + par('C\'est au sommet de sa carrière que la désillusion s\'installe. Grâce à l\'accès aux registres profonds de la supervision O5, Vane découvre l\'envers du décor : la gestion des ressources humaines de la Fondation ne répond pas à une logique de sauvegarde de l\'humanité, mais à un cynisme bureaucratique poussé à l\'extrême. Il met en lumière plusieurs opérations où des escadrons d\'élite complets ont été sciemment envoyés à la mort pour étouffer des erreurs administratives ou dissimuler la mauvaise gestion d\'artefacts anormaux par le Conseil O5.')
        + par('Le point de rupture survient lors de l\'Affaire Lazare. L\'Escadron « Lazare », envoyé contenir une entité de classe Keter dans une installation abandonnée d\'Europe de l\'Est, est laissé sans renforts : la Fondation choisit de le sacrifier plutôt que d\'exposer la mauvaise gestion qui a mené à cette opération. Vane tente d\'avertir discrètement l\'escadron, mais l\'avertissement arrive trop tard : l\'unité est décimée. Cet événement scelle sa conviction : la Fondation n\'est plus un rempart contre le chaos, mais une machine autocratique obsolète et dangereuse.')
        + sect('4. La rupture et le ralliement aux COO')
        + par('Au lieu d\'organiser une dissidence interne vouée à l\'échec, Victor Vane planifie sa disparition avec une précision chirurgicale. Durant deux ans, il accumule, crypte et extrait une quantité industrielle de données stratégiques, logistiques et confidentielles sur le fonctionnement interne des Sites majeurs de la Fondation.')
        + par('Lors d\'un transfert d\'urgence d\'artefacts au Site-54, il orchestre une brèche de confinement artificielle d\'une précision millimétrique, ciblant un secteur secondaire sans mettre en danger la moindre entité de classe Keter. Profitant de la confusion, il efface ses empreintes numériques des serveurs centraux, administre un amnésique ciblé aux seuls témoins directs de sa présence dans la zone d\'évacuation, et laisse derrière lui des restes biologiques altérés pour confirmer sa mort.')
        + par('Libéré de son passé, Vane entre en contact clandestin avec le réseau d\'ombre du Spectre Noir. Lors d\'une rencontre historique dans un lieu neutre, il lui présente un boîtier crypté contenant l\'intégralité de la cartographie vulnérable de la Fondation, les itinéraires de ravitaillement et les profils psychologiques des directeurs de sites. Convaincu par la vision du Spectre Noir, un ordre rigoureux libéré des dogmes étriqués des anciennes factions, Vane prête un serment d\'allégeance indéfectible. Il devient l\'un des architectes de la structure moderne de l\'organisation, sous le nom d\'opération : Le Conseiller.')
        + sect('5. Rôle et fonctions actuelles')
        + par('Conseiller Principal du Spectre Noir, Victor Vane occupe la position la plus influente après le dirigeant suprême lui-même. Ses responsabilités sont vastes et névralgiques :')
        + liste([
          '<strong>Modérateur du Conseil :</strong> il préside et canalise les débats entre les Ombres Supérieurs. Grâce à son impartialité stricte, il empêche les guerres d\'ego et garantit que chaque décision soit prise par pure logique stratégique.',
          '<strong>Gardien du protocole « Dernier Recours » :</strong> pilote les procédures d\'urgence ultime en cas de compromission totale de l\'organisation ou de neutralisation du Spectre Noir, et assure la transition jusqu\'à l\'accession d\'un nouveau Spectre Noir.',
          '<strong>Gestionnaire du contre-espionnage :</strong> il dirige le réseau d\'informateurs et d\'analystes infiltrés dans les autres factions. Aucune anomalie de sécurité interne ne lui échappe.',
          '<strong>Garant de la neutralité idéologique :</strong> il veille à ce que l\'organisation ne sombre ni dans le fanatisme anormal (comme l\'Insurrection du Chaos) ni dans la bureaucratie aveugle (comme la Fondation SCP).'
        ])
        + '<div class="dos-quote">« Une décision prise sous le coup de l\'émotion est une faille stratégique. Une décision prise sous le coup d\'un dogme est un arrêt de mort. »<span>Extrait des notes personnelles du Conseiller</span></div>'
        + sect('6. Spécialités et compétences')
        + par('Le Conseiller ne s\'appuie pas sur des capacités anormales ou des altérations génétiques, mais sur une maîtrise absolue de l\'esprit humain et de l\'information.')
        + table(['Compétence', 'Évaluation', ''], [
          ['Guerre psychologique', '98 %', bar(98)],
          ['Analyse prédictive', '95 %', bar(95)],
          ['Cryptométrie et codage', '92 %', bar(92)],
          ['Résistance cognitohazard', '94 %', bar(94)],
          ['Maniement d\'armes de poing', '70 %', bar(70)]
        ])
        + liste([
          '<strong>Analyse prédictive de données :</strong> capable de synthétiser des téraoctets de rapports bruts pour en extraire les mouvements stratégiques futurs des ennemis, avec un taux de succès prouvé de 94,8 %.',
          '<strong>Guerre psychologique et négociation :</strong> expert dans la manipulation de la dynamique des groupes et le démantèlement mental d\'un interlocuteur lors de négociations tendues.',
          '<strong>Résistance aux manipulations mnésiques et cognitives :</strong> après un entraînement intensif et des conditionnements psychologiques secrets, il possède une immunité naturelle élevée contre les agents amnésiques de classe A à C et les anomalies à effet cognitif mineur.',
          '<strong>Armes de défense :</strong> non-combattant de première ligne, il maîtrise le tir réflexe à courte portée (Glock 19 customisé, Sig Sauer P226) pour sa protection rapprochée.'
        ])
        + sect('7. Psychologie, habitudes et relations')
        + par('Le Conseiller est le prototype du stoïcien moderne. Méthodique, courtois jusqu\'à l\'effroi, d\'un calme imperturbable, il ne hausse jamais la voix. Son autorité repose sur la précision chirurgicale de ses propos. Derrière cette façade de plomb se cache une loyauté absolue et quasi religieuse envers le Spectre Noir, qu\'il considère comme le seul esprit capable de guider le monde anormal vers un équilibre durable.')
        + liste([
          '<strong>Routines :</strong> il dort exactement quatre heures par nuit, en cycles courts, et consacre ses heures d\'isolement à la rédaction manuelle d\'archives codées à l\'encre permanente.',
          '<strong>Apparence :</strong> toujours en costume trois pièces sombre sur mesure, d\'une propreté clinique, souvent accompagné d\'un masque partiel ou d\'un col haut dissimulant le bas de son visage lors des réunions formelles du Conseil (« Le Masque de Plomb »).',
          '<strong>Le Spectre Noir :</strong> une relation de confiance totale, mutuelle et intellectuelle. Vane est l\'un des rares hommes à pouvoir lui parler franchement sans risquer l\'exécution.',
          '<strong>Les Ombres Supérieurs :</strong> il maintient une distance professionnelle stricte et refuse toute amitié pour éviter les conflits d\'intérêts lors des évaluations de sécurité.',
          '<strong>Famille :</strong> il a une sœur cadette, Éléonore Vane, qui vit toujours à Strasbourg. Elle le croit mort depuis six ans, victime d\'un accident de la route en Europe de l\'Est : la version officielle donnée à sa famille après la brèche du Site-54. Il la fait surveiller à distance par deux agents passifs pour garantir sa sécurité, sans jamais intervenir dans sa vie.'
        ])
        + sect('8. Projets futurs et fin de carrière')
        + par('<strong>Le plan « Oblivion Zero ».</strong> Le Conseiller élabore le protocole stratégique ultime de l\'organisation. Ce projet vise à institutionnaliser les rouages du Conseil des Ombres pour rendre l\'organisation éternelle, autonome et incorruptible, capable de survivre et d\'opérer avec la même efficacité même en cas de disparition simultanée de ses dirigeants actuels.')
        + par('<strong>Clause de fin de carrière.</strong> Vane sait qu\'un homme détenant autant de secrets stratégiques constitue un risque systémique en vieillissant. Il a lui-même rédigé le protocole de sa propre fin :')
        + liste([
          '<strong>Procédure de retrait :</strong> le jour où ses facultés cognitives déclineront de plus de 5 %, il subira un effacement mémoriel complet et irréversible, de sa propre conception.',
          '<strong>Issue finale :</strong> une fois dépossédé de toute information sur le Spectre Noir et la Fondation, une euthanasie programmée sera exécutée sans douleur, suivie de l\'incinération totale de son corps et de la dissolution chimique des cendres, pour empêcher tout rééchantillonnage nécro-anormal.'
        ])
        + '<div class="dos-quote">« Il n\'y a pas de haine dans ce que je fais. La Fondation est une horloge dont les engrenages sont brisés. Nous sommes simplement les artisans qui construisons la machine suivante. »<span>V. A. Vane, Conseiller Principal</span></div>'
    }
  };

  window.openDossier = function (cle) {
    var d = DOSSIERS[cle];
    if (!d) return;
    var box = document.querySelector('#profil-modal .profil-box');
    if (box) { box.classList.toggle('dossier-box', !!d.wide); box.scrollTop = 0; }
    var av = document.getElementById('profil-avatar');
    if (av) av.style.display = 'none';
    document.getElementById('profil-nom').textContent = d.nom;
    document.getElementById('profil-handle').textContent = d.handle;
    document.getElementById('profil-role').textContent = d.role;
    document.getElementById('profil-corps').innerHTML = d.corps;
    document.getElementById('profil-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
})();
