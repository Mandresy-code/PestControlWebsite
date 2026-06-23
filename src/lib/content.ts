// Central data layer — all site content in one typed file

export type Service = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  longDescription: string;
  chips: string[];
  methods: string[];
  urgent?: boolean;
};

export type Sector = {
  slug: string;
  title: string;
  badge: "Professionnels" | "Particuliers";
  icon: string;
  description: string;
  services: string[];
  challenges: string[];
};

export type Pest = {
  id: string;
  name: string;
  icon: string;
  serviceSlug: string;
  urgent?: boolean;
  signs: Record<string, string[]>;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  body?: string;
};

export type MethodStep = {
  index: string;
  title: string;
  description: string;
  icon: string;
};

export type Stat = {
  value: string;
  label: string;
  mono?: boolean;
};

export type Proof = {
  icon: string;
  title: string;
  description: string;
};

// ─── Services ──────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    slug: "deratisation",
    index: "01",
    title: "Dératisation",
    shortTitle: "Rats & souris",
    icon: "Rat",
    description:
      "Protocoles IPM ciblés pour éliminer durablement rongeurs et campagnols, sans survente de biocides.",
    longDescription:
      "Rats, souris, mulots : leur présence n'est jamais anodine. Contamination alimentaire, dégâts matériels, risques sanitaires réels. Notre approche IPM combine diagnostic comportemental, poses stratégiques et suivi documenté, sans pulvérisation systématique. Résultat : une infestation résolue, pas masquée.",
    chips: ["IPM", "Sans contamination", "Traçabilité", "Certibiocide"],
    methods: [
      "Diagnostic comportemental et cartographie des points d'entrée",
      "Poses de pièges mécaniques et appâts sécurisés",
      "Traitement des gîtes et voies de passage",
      "Rapport d'intervention et plan de prévention",
    ],
    urgent: true,
  },
  {
    slug: "desinsectisation",
    index: "02",
    title: "Désinsectisation",
    shortTitle: "Insectes rampants",
    icon: "Bug",
    description:
      "Traitement des nuisibles rampants (cafards, fourmis, puces, acariens) adapté à chaque contexte d'activité.",
    longDescription:
      "Blattes, fourmis, puces, mites alimentaires : chaque espèce exige un protocole distinct. Nous identifions l'espèce, localisons les nids et gîtes, puis intervenons avec les insecticides les mieux ciblés, en respectant vos contraintes d'exploitation (cuisine ouverte, chambres froides, zones de soins).",
    chips: ["Blattes", "Fourmis", "Puces", "Mites"],
    methods: [
      "Identification de l'espèce et de la source d'infestation",
      "Application ciblée selon la zone (gel appât, traitement résiduel ou thermique)",
      "Visites de contrôle à 15 et 30 jours après le traitement",
      "Conseils d'hygiène préventifs écrits",
    ],
  },
  {
    slug: "punaises",
    index: "03",
    title: "Punaises de lit",
    shortTitle: "Punaises de lit",
    icon: "BedDouble",
    description:
      "Traitement thermique et chimique combiné pour une éradication totale, avec garantie de résultat.",
    longDescription:
      "La punaise de lit est l'insecte le plus difficile à éliminer sans protocole rigoureux. Notre méthode combine traitement thermique (chaleur 56 °C) et application résiduelle ciblée : c'est la seule combinaison qui atteint les œufs. Garantie de résultat écrite, re-traitement inclus si nécessaire.",
    chips: ["Traitement thermique", "Garantie résultat", "Hôtellerie", "Résidentiel"],
    methods: [
      "Inspection et cartographie de l'infestation",
      "Traitement thermique à 56 °C (tueur d'œufs)",
      "Application résiduelle ciblée post-chaleur",
      "Rapport et garantie écrite",
    ],
    urgent: true,
  },
  {
    slug: "desinfection",
    index: "04",
    title: "Désinfection",
    shortTitle: "Désinfection",
    icon: "Droplets",
    description:
      "Désinfection de surfaces et d'ambiances (ULV) pour les environnements à risque sanitaire élevé.",
    longDescription:
      "Dans les cuisines professionnelles, blocs opératoires ou espaces de soins, la désinfection n'est pas une option. Nous intervenons avec des produits virucides, bactéricides et fongicides homologués, appliqués par nébulisation ULV ou traitement manuel de surface, conformément aux protocoles HACCP (normes d'hygiène alimentaire et sanitaire).",
    chips: ["ULV", "HACCP", "Virucide", "Fongicide", "Santé"],
    methods: [
      "Évaluation du niveau de risque et sélection du biocide",
      "Traitement ULV ou manuel selon la zone",
      "Temps de contact et aération contrôlés",
      "Attestation de désinfection fournie",
    ],
  },
  {
    slug: "volants",
    index: "05",
    title: "Nuisibles volants",
    shortTitle: "Insectes volants",
    icon: "Wind",
    description:
      "Gestion des guêpes, frelons (dont frelon asiatique), mouches et moustiques en milieu professionnel.",
    longDescription:
      "Nids de guêpes et frelons, prolifération de mouches en restauration, moustiques en espaces verts : chaque situation est différente. Nous intervenons en sécurité sur les nids à risque et déployons des solutions durables (pièges à phéromones, moustiquaires, UV) pour les espaces récurrents.",
    chips: ["Frelons asiatiques", "Mouches", "Moustiques", "Guêpes"],
    methods: [
      "Localisation et évaluation du nid ou de la source",
      "Traitement du nid (équipements de protection Niveau 3)",
      "Pose de pièges préventifs adaptés",
      "Surveillance et maintenance trimestrielle",
    ],
    urgent: true,
  },
  {
    slug: "depigeonnage",
    index: "06",
    title: "Dépigeonnage",
    shortTitle: "Pigeons",
    icon: "Bird",
    description:
      "Pose de systèmes anti-nidification, effarouchement et nettoyage des surfaces souillées pour façades, toitures et sites industriels.",
    longDescription:
      "Les pigeons causent des dégâts structurels et sanitaires souvent sous-estimés : fientes corrosives sur façades et équipements, risques infectieux (ornithose, histoplasmose), obstruction des gouttières. Nous déployons des solutions durables et discrètes — filets, pics, câbles tendus, systèmes de dissuasion — sans nuire aux animaux, avec un résultat visible dès les premières semaines.",
    chips: ["Anti-nidification", "Filets & pics", "Discrétion", "Sites industriels"],
    methods: [
      "Inspection et cartographie des zones de nidification",
      "Pose de dispositifs anti-nidification adaptés (pics, filets, câbles)",
      "Nettoyage et décontamination des surfaces souillées par les fientes",
      "Contrôle et maintenance périodique du dispositif",
    ],
  },
  {
    slug: "prevention",
    index: "07",
    title: "Prévention & audit",
    shortTitle: "Prévention",
    icon: "ShieldCheck",
    description:
      "Audit IFS/BRC, plans de lutte préventifs, formations du personnel et suivi documenté.",
    longDescription:
      "La meilleure intervention est celle qu'on n'a pas eu à faire. Nos auditeurs certifiés analysent vos locaux, cartographient les vulnérabilités et établissent un plan de maîtrise des nuisibles (PMN) conforme aux référentiels IFS, BRC et HACCP (normes internationales de certification agroalimentaire). Accompagnement à la certification inclus.",
    chips: ["IFS / BRC", "PMN", "Formation", "Certibiocide"],
    methods: [
      "Audit terrain complet (intérieur + extérieur)",
      "Cartographie des risques et des points critiques",
      "Rédaction du plan de maîtrise des nuisibles",
      "Sessions de formation du personnel sur site",
    ],
  },
];

// ─── Sectors ───────────────────────────────────────────────────────────────────

export const sectors: Sector[] = [
  {
    slug: "restauration",
    title: "Restauration",
    badge: "Professionnels",
    icon: "UtensilsCrossed",
    description:
      "Cuisines, offices, zones de stockage : protocoles HACCP et interventions hors heures d'ouverture.",
    services: ["deratisation", "desinsectisation", "desinfection", "prevention"],
    challenges: [
      "Contraintes HACCP et inspections sanitaires",
      "Interventions de nuit ou en dehors du service",
      "Confidentialité et discrétion absolues",
      "Traçabilité documentaire exigée",
    ],
  },
  {
    slug: "hotellerie",
    title: "Hôtellerie",
    badge: "Professionnels",
    icon: "Hotel",
    description:
      "Punaises de lit, rongeurs et nuisibles volants : protection discrète de votre réputation.",
    services: ["punaises", "deratisation", "volants", "prevention"],
    challenges: [
      "Intervention sans fermeture de chambre si possible",
      "Discrétion vis-à-vis des clients",
      "Garantie écrite et re-traitement inclus",
      "Protocole punaises de lit certifié",
    ],
  },
  {
    slug: "industrie",
    title: "Industrie & agroalimentaire",
    badge: "Professionnels",
    icon: "Factory",
    description:
      "Référentiels IFS, BRC, ISO 22000 : audit PMN, traçabilité et conformité documentaire.",
    services: ["deratisation", "desinsectisation", "prevention", "desinfection"],
    challenges: [
      "Conformité aux référentiels IFS / BRC",
      "Zéro tolérance rongeurs en zone de production",
      "Documentation et traçabilité complète",
      "Coordination avec les équipes QSE",
    ],
  },
  {
    slug: "sante",
    title: "Santé & médico-social",
    badge: "Professionnels",
    icon: "HeartPulse",
    description:
      "Hôpitaux, EHPAD, cliniques : protocoles adaptés aux zones à risque (stérile, amiante, patient).",
    services: ["desinfection", "deratisation", "desinsectisation", "prevention"],
    challenges: [
      "Zones stériles et patients vulnérables",
      "Produits biocides adaptés aux espaces de soins",
      "Intervention en dehors des heures de soins",
      "Traçabilité et conformité CCLIN",
    ],
  },
  {
    slug: "logistique",
    title: "Logistique & stockage",
    badge: "Professionnels",
    icon: "Warehouse",
    description:
      "Entrepôts, quais de chargement et zones de stockage : protection continue des marchandises.",
    services: ["deratisation", "desinsectisation", "prevention"],
    challenges: [
      "Flux entrants permanents (marchandises, camions)",
      "Surfaces importantes à protéger",
      "Risque de contamination des stocks",
      "Monitoring continu et rapports périodiques",
    ],
  },
  {
    slug: "particuliers",
    title: "Particuliers",
    badge: "Particuliers",
    icon: "Home",
    description:
      "Maison, appartement, jardin : interventions rapides, sans produits agressifs, avec explication claire.",
    services: ["deratisation", "desinsectisation", "punaises", "volants"],
    challenges: [
      "Présence d'enfants et animaux domestiques",
      "Produits à faible impact en espace de vie",
      "Délai d'intervention rapide",
      "Explications claires, sans termes techniques inutiles",
    ],
  },
];

// ─── Pests (nuisibles) ─────────────────────────────────────────────────────────

export const pests: Pest[] = [
  {
    id: "rats",
    name: "Rats & souris",
    icon: "Rat",
    serviceSlug: "deratisation",
    urgent: true,
    signs: {
      interieur: ["Crottes le long des murs", "Bruits nocturnes", "Câbles rongés", "Odeur forte"],
      exterieur: ["Terriers au pied des murs", "Végétaux rongés", "Traces de passages"],
    },
  },
  {
    id: "blattes",
    name: "Blattes",
    icon: "Bug",
    serviceSlug: "desinsectisation",
    signs: {
      interieur: ["Crottes en forme de grain de riz", "Odeur rance", "Individus vus de nuit"],
      exterieur: [],
    },
  },
  {
    id: "punaises",
    name: "Punaises de lit",
    icon: "BedDouble",
    serviceSlug: "punaises",
    urgent: true,
    signs: {
      interieur: ["Piqûres en ligne sur la peau", "Taches rouges sur le linge", "Petits points noirs sur le matelas"],
      exterieur: [],
    },
  },
  {
    id: "fourmis",
    name: "Fourmis",
    icon: "Binoculars",
    serviceSlug: "desinsectisation",
    signs: {
      interieur: ["Colonnes de fourmis vers la cuisine", "Sciure de bois (fourmis charpentières)"],
      exterieur: ["Fourmilières au pied des murs", "Colonnes sur les arbres"],
    },
  },
  {
    id: "guepes",
    name: "Guêpes & frelons",
    icon: "Zap",
    serviceSlug: "volants",
    urgent: true,
    signs: {
      interieur: ["Nid dans une comble ou un mur creux", "Présence répétée d'individus"],
      exterieur: ["Nid visible sous avant-toit", "Va-et-vient intense"],
    },
  },
  {
    id: "mouches",
    name: "Mouches",
    icon: "Wind",
    serviceSlug: "volants",
    signs: {
      interieur: ["Nombreuses mouches dans les pièces", "Individus morts sur les rebords"],
      exterieur: ["Prolifération autour des poubelles", "Présence près des points d'eau"],
    },
  },
  {
    id: "moustiques",
    name: "Moustiques",
    icon: "Droplets",
    serviceSlug: "volants",
    signs: {
      interieur: ["Piqûres nocturnes répétées", "Bourdonnements"],
      exterieur: ["Points d'eau stagnante", "Présence au crépuscule"],
    },
  },
  {
    id: "nuisibles-volants",
    name: "Autres volants",
    icon: "Feather",
    serviceSlug: "volants",
    signs: {
      interieur: ["Individus piégés à l'intérieur", "Dégâts sur tissus ou câbles"],
      exterieur: ["Nids sur structures", "Présence sur denrées stockées"],
    },
  },
];

// ─── Method steps ──────────────────────────────────────────────────────────────

export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Diagnostic terrain",
    description:
      "Chaque intervention commence par une inspection complète : état des locaux, points d'entrée, sources alimentaires, niveaux d'infestation. Pas de devis au téléphone.",
    icon: "Search",
  },
  {
    index: "02",
    title: "Plan de traitement ciblé",
    description:
      "On ne traite pas pour traiter. Le plan IPM sélectionne les méthodes les moins invasives en premier : mécanique, physique, puis chimique si nécessaire et toujours en dernier recours.",
    icon: "ClipboardList",
  },
  {
    index: "03",
    title: "Intervention maîtrisée",
    description:
      "Nos techniciens Certibiocide interviennent selon le protocole défini, documentent chaque action et adaptent en temps réel si la réalité terrain le demande.",
    icon: "Wrench",
  },
  {
    index: "04",
    title: "Suivi & prévention",
    description:
      "Une intervention réussie ne s'arrête pas au traitement. Rapport écrit, visites de contrôle, recommandations structurelles : on s'assure que le problème ne revient pas.",
    icon: "BarChart3",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: "48h", label: "Délai d'intervention moyen", mono: true },
  { value: "100%", label: "Techniciens certifiés Certibiocide", mono: true },
  { value: "24/7", label: "Service d'urgence disponible en continu", mono: true },
  { value: "12", label: "Secteurs d'activité couverts", mono: true },
];

// ─── Proofs ────────────────────────────────────────────────────────────────────

export const proofs: Proof[] = [
  {
    icon: "Award",
    title: "Certibiocide",
    description:
      "Tous nos techniciens sont titulaires du certificat Certibiocide, obligatoire pour l'application professionnelle de produits biocides en France.",
  },
  {
    icon: "FileCheck",
    title: "Conformité IFS / BRC",
    description:
      "Nos protocoles s'intègrent directement dans les systèmes qualité IFS Food et BRC (référentiels internationaux de sécurité alimentaire), avec une documentation et une traçabilité conformes aux exigences d'audit.",
  },
  {
    icon: "Leaf",
    title: "Lutte raisonnée (IPM)",
    description:
      "L'IPM (Integrated Pest Management, ou lutte antiparasitaire raisonnée) est notre philosophie : d'abord comprendre, puis agir avec précision, jamais en excès.",
  },
  {
    icon: "Clock",
    title: "Disponibilité 24h/24",
    description:
      "Nid de frelons, infestation soudaine avant inspection : notre service d'urgence répond 7j/7, jours fériés inclus.",
  },
];

// ─── Articles ──────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    slug: "ipm-lutte-raisonnee",
    title: "Qu'est-ce que l'IPM ? La lutte antiparasitaire raisonnée expliquée",
    excerpt:
      "L'Integrated Pest Management n'est pas une mode : c'est la seule approche qui réconcilie efficacité, sécurité et durabilité. Tour d'horizon.",
    category: "Méthode",
    readTime: "6 min",
    date: "2025-11-12",
  },
  {
    slug: "punaises-lit-hotel",
    title: "Punaises de lit en hôtellerie : ce que les avis clients ne vous disent pas",
    excerpt:
      "Un seul signalement sur TripAdvisor peut coûter des semaines de réservations. Voici comment les hôtels sérieux gèrent le risque en amont.",
    category: "Hôtellerie",
    readTime: "8 min",
    date: "2025-10-28",
  },
  {
    slug: "frelon-asiatique-risques",
    title: "Frelon asiatique : identification, risques et procédure d'intervention",
    excerpt:
      "Vespa velutina s'installe durablement en France. Comment le reconnaître, pourquoi ne pas intervenir seul, et quand appeler un professionnel.",
    category: "Nuisibles",
    readTime: "5 min",
    date: "2025-09-15",
  },
  {
    slug: "audit-ifs-brc-nuisibles",
    title: "Audit IFS/BRC : comment préparer votre plan de maîtrise des nuisibles",
    excerpt:
      "Les auditeurs IFS et BRC scrutent votre PMN de près. Ce guide détaille les exigences, les pièges fréquents et les bonnes pratiques documentaires.",
    category: "Industrie",
    readTime: "10 min",
    date: "2025-08-30",
  },
];

// ─── Pest wizard data ───────────────────────────────────────────────────────────

export const wizardPlaces = [
  { id: "maison",      label: "Maison / appartement", icon: "Home" },
  { id: "restaurant",  label: "Restaurant / cuisine", icon: "UtensilsCrossed" },
  { id: "hotel",       label: "Hôtel",                icon: "Hotel" },
  { id: "industrie",   label: "Site industriel",      icon: "Factory" },
  { id: "sante",       label: "Établissement de santé", icon: "HeartPulse" },
  { id: "autre",       label: "Autre",                 icon: "Building2" },
] as const;

export const wizardSigns: Record<string, { id: string; label: string; pestId: string }[]> = {
  interieur: [
    { id: "crottes",   label: "Crottes ou déjections",            pestId: "rats" },
    { id: "piqures",   label: "Piqûres / marques sur la peau",    pestId: "punaises" },
    { id: "insectes",  label: "Insectes rampants observés",       pestId: "blattes" },
    { id: "fourmis",   label: "Colonnes de fourmis",              pestId: "fourmis" },
    { id: "bruits",    label: "Bruits nocturnes / grattements",   pestId: "rats" },
    { id: "volants",   label: "Insectes volants en nombre",       pestId: "mouches" },
  ],
  exterieur: [
    { id: "nid",       label: "Nid de guêpes ou frelons",         pestId: "guepes" },
    { id: "terriers",  label: "Terriers ou galeries au sol",      pestId: "rats" },
    { id: "fourmis-e", label: "Fourmilières",                     pestId: "fourmis" },
    { id: "moustiques",label: "Moustiques (zone humide)",         pestId: "moustiques" },
    { id: "rongeurs",  label: "Câbles ou végétaux rongés",        pestId: "rats" },
  ],
};

// ─── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  email: "contact@eseis-pestcontrol.fr",
  phone: "+33 1 XX XX XX XX",
  address: "ESEIS Pest Control — Groupe BCR-i",
  zones: ["Île-de-France", "Grand Est", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine"],
  emergencyPhone: "+33 6 XX XX XX XX",
  hours: "Lun–Ven, 8h–19h",
  emergencyHours: "Service d'urgence disponible 24h/24, 7j/7",
};

// ─── Certifications ────────────────────────────────────────────────────────────

export const certifications = [
  "Certibiocide",
  "IFS Food",
  "BRC Global Standard",
  "HACCP",
  "ISO 14001",
];
