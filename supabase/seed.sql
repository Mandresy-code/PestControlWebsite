-- ════════════════════════════════════════════════════════════════════════════
-- ESEIS Pest Control — Seed data
-- Exécute après schema.sql dans Supabase SQL Editor
-- ════════════════════════════════════════════════════════════════════════════

-- ─── services ────────────────────────────────────────────────────────────────
insert into services (slug, index, title, short_title, icon, description, long_description, chips, methods, urgent, sort_order) values
(
  'deratisation', '01', 'Dératisation', 'Rats & souris', 'Rat',
  'Protocoles IPM ciblés pour éliminer durablement rongeurs et campagnols, sans survente de biocides.',
  'Rats, souris, mulots : leur présence n''est jamais anodine. Contamination alimentaire, dégâts matériels, risques sanitaires réels. Notre approche IPM combine diagnostic comportemental, poses stratégiques et suivi documenté — sans pulvérisation systématique. Résultat : une infestation résolue, pas masquée.',
  array['IPM', 'Sans contamination', 'Traçabilité', 'Certibiocide'],
  array['Diagnostic comportemental et cartographie des points d''entrée', 'Poses de pièges mécaniques et appâts sécurisés', 'Traitement des gîtes et voies de passage', 'Rapport d''intervention et plan de prévention'],
  true, 1
),
(
  'desinsectisation', '02', 'Désinsectisation', 'Insectes rampants', 'Bug',
  'Traitement des nuisibles rampants (cafards, fourmis, puces, acariens) adapté à chaque contexte d''activité.',
  'Blattes, fourmis, puces, mites alimentaires : chaque espèce exige un protocole distinct. Nous identifions l''espèce, localisons les nids et gîtes, puis intervenons avec les insecticides les mieux ciblés — en respectant vos contraintes d''exploitation.',
  array['Blattes', 'Fourmis', 'Puces', 'Mites', 'Gel appât'],
  array['Identification de l''espèce et de la source d''infestation', 'Application de gel appât ou traitement résiduel selon la zone', 'Suivi 15 j et 30 j post-intervention', 'Conseils d''hygiène préventifs écrits'],
  false, 2
),
(
  'punaises', '03', 'Punaises de lit', 'Punaises de lit', 'BedDouble',
  'Traitement thermique et chimique combiné pour une éradication totale, avec garantie de résultat.',
  'La punaise de lit est l''insecte le plus difficile à éliminer sans protocole rigoureux. Notre méthode combine traitement thermique (chaleur 56 °C) et application résiduelle ciblée — l''unique combinaison qui atteint les œufs. Garantie de résultat écrite, re-traitement inclus si nécessaire.',
  array['Traitement thermique', 'Garantie résultat', 'Hôtellerie', 'Résidentiel'],
  array['Inspection et cartographie de l''infestation', 'Traitement thermique à 56 °C (tueur d''œufs)', 'Application résiduelle ciblée post-chaleur', 'Rapport et garantie écrite'],
  true, 3
),
(
  'desinfection', '04', 'Désinfection', 'Désinfection', 'Droplets',
  'Désinfection de surfaces et d''ambiances (ULV) pour les environnements à risque sanitaire élevé.',
  'Dans les cuisines professionnelles, blocs opératoires ou espaces de soins, la désinfection n''est pas une option. Nous intervenons avec des produits virucides, bactéricides et fongicides homologués, appliqués par nébulisation ULV ou traitement manuel de surface selon les protocoles HACCP.',
  array['ULV', 'HACCP', 'Virucide', 'Fongicide', 'Santé'],
  array['Évaluation du niveau de risque et sélection du biocide', 'Traitement ULV ou manuel selon la zone', 'Temps de contact et aération contrôlés', 'Attestation de désinfection fournie'],
  false, 4
),
(
  'volants', '05', 'Nuisibles volants', 'Insectes volants', 'Wind',
  'Gestion des guêpes, frelons (dont frelon asiatique), mouches et moustiques en milieu professionnel.',
  'Nids de guêpes et frelons, prolifération de mouches en restauration, moustiques en espaces verts : chaque situation est différente. Nous intervenons en sécurité sur les nids à risque et déployons des solutions durables.',
  array['Frelons asiatiques', 'Mouches', 'Moustiques', 'Guêpes'],
  array['Localisation et évaluation du nid ou de la source', 'Traitement du nid (équipements de protection Niveau 3)', 'Pose de pièges préventifs adaptés', 'Surveillance et maintenance trimestrielle'],
  true, 5
),
(
  'prevention', '06', 'Prévention & audit', 'Prévention', 'ShieldCheck',
  'Audit IFS/BRC, plans de lutte préventifs, formations du personnel et suivi documenté.',
  'La meilleure intervention est celle qu''on n''a pas eu à faire. Nos auditeurs certifiés analysent vos locaux, cartographient les vulnérabilités et établissent un plan de maîtrise des nuisibles (PMN) conforme aux référentiels IFS, BRC et HACCP.',
  array['IFS / BRC', 'PMN', 'Formation', 'Certibiocide'],
  array['Audit terrain complet (intérieur + extérieur)', 'Cartographie des risques et des points critiques', 'Rédaction du plan de maîtrise des nuisibles', 'Sessions de formation du personnel sur site'],
  false, 6
)
on conflict (slug) do nothing;

-- ─── sectors ─────────────────────────────────────────────────────────────────
insert into sectors (slug, title, badge, icon, description, services, challenges, sort_order) values
('restauration', 'Restauration', 'Professionnels', 'UtensilsCrossed',
  'Cuisines, offices, zones de stockage : protocoles HACCP et interventions hors heures d''ouverture.',
  array['deratisation','desinsectisation','desinfection','prevention'],
  array['Contraintes HACCP et inspections sanitaires','Interventions de nuit ou en dehors du service','Confidentialité et discrétion absolues','Traçabilité documentaire exigée'], 1),
('hotellerie', 'Hôtellerie', 'Professionnels', 'Hotel',
  'Punaises de lit, rongeurs et nuisibles volants : protection discrète de votre réputation.',
  array['punaises','deratisation','volants','prevention'],
  array['Intervention sans fermeture de chambre si possible','Discrétion vis-à-vis des clients','Garantie écrite et re-traitement inclus','Protocole punaises de lit certifié'], 2),
('industrie', 'Industrie & agroalimentaire', 'Professionnels', 'Factory',
  'Référentiels IFS, BRC, ISO 22000 : audit PMN, traçabilité et conformité documentaire.',
  array['deratisation','desinsectisation','prevention','desinfection'],
  array['Conformité aux référentiels IFS / BRC','Zéro tolérance rongeurs en zone de production','Documentation et traçabilité complète','Coordination avec les équipes QSE'], 3),
('sante', 'Santé & médico-social', 'Professionnels', 'HeartPulse',
  'Hôpitaux, EHPAD, cliniques : protocoles adaptés aux zones à risque.',
  array['desinfection','deratisation','desinsectisation','prevention'],
  array['Zones stériles et patients vulnérables','Produits biocides adaptés aux espaces de soins','Intervention en dehors des heures de soins','Traçabilité et conformité CCLIN'], 4),
('logistique', 'Logistique & stockage', 'Professionnels', 'Warehouse',
  'Entrepôts, quais de chargement et zones de stockage : protection continue des marchandises.',
  array['deratisation','desinsectisation','prevention'],
  array['Flux entrants permanents (marchandises, camions)','Surfaces importantes à protéger','Risque de contamination des stocks','Monitoring continu et rapports périodiques'], 5),
('particuliers', 'Particuliers', 'Particuliers', 'Home',
  'Maison, appartement, jardin : interventions rapides, sans produits agressifs.',
  array['deratisation','desinsectisation','punaises','volants'],
  array['Présence d''enfants et animaux domestiques','Produits à faible impact en espace de vie','Délai d''intervention rapide','Explications claires et sans jargon'], 6)
on conflict (slug) do nothing;

-- ─── pests ────────────────────────────────────────────────────────────────────
insert into pests (pest_id, name, icon, service_slug, urgent, signs, sort_order) values
('rats', 'Rats & souris', 'Rat', 'deratisation', true,
  '{"interieur": ["Crottes le long des murs", "Bruits nocturnes", "Câbles rongés", "Odeur forte"], "exterieur": ["Terriers au pied des murs", "Végétaux rongés", "Traces de passages"]}', 1),
('blattes', 'Blattes', 'Bug', 'desinsectisation', false,
  '{"interieur": ["Crottes en forme de grain de riz", "Odeur rance", "Individus vus de nuit"], "exterieur": []}', 2),
('punaises', 'Punaises de lit', 'BedDouble', 'punaises', true,
  '{"interieur": ["Piqûres en ligne sur la peau", "Taches rouges sur le linge", "Petits points noirs sur le matelas"], "exterieur": []}', 3),
('fourmis', 'Fourmis', 'Binoculars', 'desinsectisation', false,
  '{"interieur": ["Colonnes de fourmis vers la cuisine", "Sciure de bois (fourmis charpentières)"], "exterieur": ["Fourmilières au pied des murs", "Colonnes sur les arbres"]}', 4),
('guepes', 'Guêpes & frelons', 'Zap', 'volants', true,
  '{"interieur": ["Nid dans une comble ou un mur creux", "Présence répétée d''individus"], "exterieur": ["Nid visible sous avant-toit", "Va-et-vient intense"]}', 5),
('mouches', 'Mouches', 'Wind', 'volants', false,
  '{"interieur": ["Nombreuses mouches dans les pièces", "Individus morts sur les rebords"], "exterieur": ["Prolifération autour des poubelles", "Présence près des points d''eau"]}', 6),
('moustiques', 'Moustiques', 'Droplets', 'volants', false,
  '{"interieur": ["Piqûres nocturnes répétées", "Bourdonnements"], "exterieur": ["Points d''eau stagnante", "Présence au crépuscule"]}', 7),
('nuisibles-volants', 'Autres volants', 'Feather', 'volants', false,
  '{"interieur": ["Individus piégés à l''intérieur", "Dégâts sur tissus ou câbles"], "exterieur": ["Nids sur structures", "Présence sur denrées stockées"]}', 8)
on conflict (pest_id) do nothing;

-- ─── method_steps ─────────────────────────────────────────────────────────────
insert into method_steps (index, title, description, icon, sort_order) values
('01', 'Diagnostic terrain',
  'Chaque intervention commence par une inspection complète : état des locaux, points d''entrée, sources alimentaires, niveaux d''infestation. Pas de devis au téléphone.',
  'Search', 1),
('02', 'Plan de traitement ciblé',
  'On ne traite pas pour traiter. Le plan IPM sélectionne les méthodes les moins invasives en premier : mécanique, physique, puis chimique si nécessaire et toujours en dernier recours.',
  'ClipboardList', 2),
('03', 'Intervention maîtrisée',
  'Nos techniciens Certibiocide interviennent selon le protocole défini, documentent chaque action et adaptent en temps réel si la réalité terrain le demande.',
  'Wrench', 3),
('04', 'Suivi & prévention',
  'Une intervention réussie ne s''arrête pas au traitement. Rapport écrit, visites de contrôle, recommandations structurelles : on s''assure que le problème ne revient pas.',
  'BarChart3', 4)
on conflict do nothing;

-- ─── stats ────────────────────────────────────────────────────────────────────
insert into stats (value, label, mono, sort_order) values
('48h',  'Délai d''intervention garanti',          true, 1),
('100%', 'Techniciens certifiés Certibiocide',     true, 2),
('24/7', 'Astreinte pour les urgences',            true, 3),
('12',   'Secteurs d''activité couverts',          true, 4)
on conflict do nothing;

-- ─── proofs ───────────────────────────────────────────────────────────────────
insert into proofs (icon, title, description, sort_order) values
('Award', 'Certibiocide',
  'Tous nos techniciens sont titulaires du certificat Certibiocide, obligatoire pour l''application professionnelle de produits biocides en France.', 1),
('FileCheck', 'Conformité IFS / BRC',
  'Nos protocoles s''intègrent directement dans les systèmes qualité IFS Food et BRC — documentation et traçabilité conformes aux audits.', 2),
('Leaf', 'Lutte raisonnée (IPM)',
  'L''IPM — Integrated Pest Management — est notre philosophie : d''abord comprendre, puis agir avec précision, jamais en excès.', 3),
('Clock', 'Astreinte 24/7',
  'Nid de frelons, infestation soudaine avant inspection : notre astreinte répond 7j/7, jours fériés inclus.', 4)
on conflict do nothing;

-- ─── articles ─────────────────────────────────────────────────────────────────
insert into articles (slug, title, excerpt, category, read_time, date, published) values
('ipm-lutte-raisonnee',
  'Qu''est-ce que l''IPM ? La lutte antiparasitaire raisonnée expliquée',
  'L''Integrated Pest Management n''est pas une mode : c''est la seule approche qui réconcilie efficacité, sécurité et durabilité. Tour d''horizon.',
  'Méthode', '6 min', '2025-11-12', true),
('punaises-lit-hotel',
  'Punaises de lit en hôtellerie : ce que les avis clients ne vous disent pas',
  'Un seul signalement sur TripAdvisor peut coûter des semaines de réservations. Voici comment les hôtels sérieux gèrent le risque en amont.',
  'Hôtellerie', '8 min', '2025-10-28', true),
('frelon-asiatique-risques',
  'Frelon asiatique : identification, risques et procédure d''intervention',
  'Vespa velutina s''installe durablement en France. Comment le reconnaître, pourquoi ne pas intervenir seul, et quand appeler un professionnel.',
  'Nuisibles', '5 min', '2025-09-15', true),
('audit-ifs-brc-nuisibles',
  'Audit IFS/BRC : comment préparer votre plan de maîtrise des nuisibles',
  'Les auditeurs IFS et BRC scrutent votre PMN de près. Ce guide détaille les exigences, les pièges fréquents et les bonnes pratiques documentaires.',
  'Industrie', '10 min', '2025-08-30', true)
on conflict (slug) do nothing;
