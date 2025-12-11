import { 
  Stethoscope, 
  Scissors, 
  Siren, 
  Scan, 
  Bed, 
  Bird,
  LucideIcon
} from 'lucide-react';
import { Service, TeamMember, BlogPost, ClinicInfo, Product, Page, MediaFile } from './types';

// Helper to map string names back to icons for display
export const ICON_MAP: Record<string, LucideIcon> = {
  'Stethoscope': Stethoscope,
  'Scissors': Scissors,
  'Siren': Siren,
  'Scan': Scan,
  'Bed': Bed,
  'Bird': Bird
};

export const DEFAULT_CLINIC_INFO: ClinicInfo = {
  name: "Jonckers-Thoumsin",
  address: "Rue de Condé 4, 7950 Chièvres",
  phone: "068 65 74 68",
  email: "info@jonckers-thoumsin.be",
  tipawLink: "https://tipaw.com/be/fr/professionnel/veterinaire/drs-jonckers-et-thoumsin---cabinet-veterinaire-a-chievres/",
  hours: [
    { day: "Lundi", hours: "08:00 - 12:00, 13:00 - 19:00" },
    { day: "Mardi", hours: "08:00 - 12:00, 13:00 - 19:00" },
    { day: "Mercredi", hours: "08:00 - 12:00, 13:00 - 19:00" },
    { day: "Jeudi", hours: "08:00 - 12:00, 13:00 - 19:00" },
    { day: "Vendredi", hours: "08:00 - 12:00, 13:00 - 19:00" },
    { day: "Samedi", hours: "09:00 - 12:00" },
    { day: "Dimanche", hours: "Fermé" }
  ],
  consultationHours: [
    { day: "Lundi", hours: "08:00 - 12:00, 14:00 - 19:00" },
    { day: "Mardi", hours: "08:00 - 12:00, 14:00 - 19:00" },
    { day: "Mercredi", hours: "08:00 - 12:00, 14:00 - 19:00" },
    { day: "Jeudi", hours: "08:00 - 12:00, 14:00 - 19:00" },
    { day: "Vendredi", hours: "08:00 - 12:00, 14:00 - 19:00" },
    { day: "Samedi", hours: "09:00 - 12:00" },
    { day: "Dimanche", hours: "Fermé" }
  ],
  heroTitle: "Médecine vétérinaire d'excellence et de proximité.",
  heroSubtitle: "Nous allions expertise médicale de pointe et approche humaine pour garantir la meilleure qualité de vie à vos compagnons.",
  heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "medecine-generale",
    title: "Médecine Générale",
    iconName: "Stethoscope",
    shortDescription: "Consultations préventives et curatives pour chiens, chats et NAC.",
    fullDescription: "Notre service de médecine générale couvre l'ensemble des besoins de santé de votre compagnon. De la vaccination annuelle au diagnostic de pathologies complexes, nous assurons un suivi rigoureux. Nous mettons un point d'honneur sur la médecine préventive pour assurer une longue vie en bonne santé à vos animaux.",
    features: [
      "Consultations vaccinales",
      "Bilan de santé annuel",
      "Identification électronique",
      "Nutrition et diététique",
      "Analyses sanguines"
    ],
    faqs: [
      { question: "À quelle fréquence dois-je faire vacciner mon chien ?", answer: "Généralement une fois par an, mais cela dépend du protocole vaccinal et du mode de vie de votre animal." },
      { question: "Prenez-vous en charge les NAC ?", answer: "Oui, nous assurons les consultations de base pour les Nouveaux Animaux de Compagnie." }
    ]
  },
  {
    id: "chirurgie",
    title: "Chirurgie",
    iconName: "Scissors",
    shortDescription: "Interventions de convenance et chirurgies des tissus mous.",
    fullDescription: "Notre bloc opératoire est équipé pour réaliser des interventions chirurgicales dans des conditions optimales de sécurité (anesthésie gazeuse, monitoring). Nous pratiquons les chirurgies de convenance ainsi que des chirurgies plus complexes des tissus mous.",
    features: [
      "Stérilisation et castration",
      "Chirurgie abdominale",
      "Chirurgie cutanée et reconstructrice",
      "Soins dentaires (détartrage)",
      "Gestion de la douleur post-opératoire"
    ],
    faqs: [
      { question: "Mon animal doit-il être à jeun ?", answer: "Oui, pour toute anesthésie générale, une diète alimentaire de 12h est requise (l'eau reste autorisée)." },
      { question: "Comment se passe le réveil ?", answer: "Votre animal reste sous surveillance en hospitalisation jusqu'à son réveil complet avant de pouvoir rentrer à la maison." }
    ]
  },
  {
    id: "urgences",
    title: "Urgences",
    iconName: "Siren",
    shortDescription: "Service de garde et prise en charge rapide des urgences vitales.",
    fullDescription: "En dehors des heures d'ouverture, un service de garde est assuré pour les urgences vitales. N'hésitez pas à nous contacter avant de vous déplacer afin que nous puissions préparer l'arrivée de votre animal.",
    features: [
      "Disponibilité téléphonique 24/7",
      "Oxygénothérapie",
      "Soins intensifs",
      "Analyses d'urgence"
    ],
    faqs: [
      { question: "Que faire en cas d'empoisonnement ?", answer: "Contactez-nous immédiatement avec le nom du produit ingéré. Ne faites pas vomir votre animal sans avis vétérinaire." }
    ]
  },
  {
    id: "imagerie",
    title: "Imagerie Médicale",
    iconName: "Scan",
    shortDescription: "Radiographie numérique et échographie pour des diagnostics précis.",
    fullDescription: "L'imagerie médicale est indispensable pour établir un diagnostic précis. Nous disposons d'un appareil de radiographie numérique haute fréquence et d'un échographe performant.",
    features: [
      "Radiographie numérique",
      "Échographie abdominale",
      "Diagnostic de gestation",
      "Bilan cardiaque de base"
    ],
    faqs: [
      { question: "Faut-il endormir mon animal pour une radio ?", answer: "C'est rarement nécessaire, sauf si l'animal est très douloureux ou agité, ou pour des positions très spécifiques." }
    ]
  },
  {
    id: "hospitalisation",
    title: "Hospitalisation",
    iconName: "Bed",
    shortDescription: "Chenil confortable pour le rétablissement de vos animaux.",
    fullDescription: "Notre espace d'hospitalisation est conçu pour minimiser le stress de vos compagnons. Chiens et chats sont séparés pour plus de tranquillité. Nous assurons une surveillance continue et l'administration des traitements.",
    features: [
      "Boxes individuels et confortables",
      "Séparation chiens/chats",
      "Perfusion et soins intensifs",
      "Sorties hygiéniques régulières"
    ],
    faqs: [
      { question: "Puis-je visiter mon animal hospitalisé ?", answer: "Oui, sur rendez-vous l'après-midi, pour ne pas perturber les soins du matin." }
    ]
  },
  {
    id: "colombophilie",
    title: "Colombophilie & NAC",
    iconName: "Bird",
    shortDescription: "Suivi spécialisé pour pigeons voyageurs et soins pour Nouveaux Animaux de Compagnie.",
    fullDescription: "Service spécialisé pour les amateurs de colombophilie et propriétaires de NAC (Nouveaux Animaux de Compagnie). Nous assurons le suivi sanitaire de vos pigeons, les vaccinations obligatoires et proposons des consultations adaptées pour lapins, furets, oiseaux, rongeurs et reptiles.",
    features: [
      "Analyses de fientes pour pigeons",
      "Vaccinations paramyxovirose",
      "Consultations NAC (lapins, furets, oiseaux)",
      "Soins pour rongeurs et reptiles",
      "Traitements respiratoires spécialisés",
      "Certificats de bonne santé",
      "Conseils en nutrition NAC"
    ],
    faqs: [
      { question: "Quand vacciner mes pigeons ?", answer: "Le schéma vaccinal idéal se discute en consultation selon la saison de concours." },
      { question: "Prenez-vous en charge tous les NAC ?", answer: "Oui, nous soignons lapins, furets, oiseaux, rongeurs et reptiles. Chaque espèce nécessite des soins spécifiques que nous maîtrisons." },
      { question: "Faut-il un rendez-vous spécial pour les NAC ?", answer: "Oui, les consultations NAC nécessitent plus de temps. Précisez l'espèce lors de la prise de rendez-vous." }
    ]
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "frederic-jonckers",
    name: "Dr. Frederic Jonckers",
    role: "Vétérinaire Fondateur",
    bio: "Fondateur de la clinique, il apporte plus de 25 ans d'expérience en médecine vétérinaire. Passionné par la chirurgie des tissus mous et la médecine interne, il assure la direction médicale de l'établissement.",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=500",
    cv: {
      education: [
        "Doctorat en Médecine Vétérinaire - Université de Liège (1998)",
        "Formation complémentaire en Chirurgie des Tissus Mous - École Vétérinaire de Lyon (2001)"
      ],
      experience: [
        "Fondateur et Directeur - Clinique Vétérinaire Jonckers-Thoumsin (1999-présent)",
        "Vétérinaire praticien - Clinique Vétérinaire de Mons (1998-1999)",
        "Stage de fin d'études - CHV Frégis, Paris (1998)"
      ],
      specializations: [
        "Chirurgie des tissus mous",
        "Médecine interne",
        "Urgences vétérinaires",
        "Gestion d'établissement vétérinaire"
      ],
      certifications: [
        "Membre de l'Ordre des Médecins Vétérinaires de Belgique",
        "Formation continue en anesthésie moderne (2020)",
        "Certification en gestion de la douleur (2019)"
      ]
    }
  },
  {
    id: "laurence-thoumsin",
    name: "Dr. Laurence Thoumsin",
    role: "Vétérinaire Associée",
    bio: "Spécialisée en imagerie médicale et en dermatologie, elle assure des diagnostics précis avec douceur. Son expertise en échographie et radiologie permet des diagnostics de pointe.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=500",
    cv: {
      education: [
        "Doctorat en Médecine Vétérinaire - Université de Liège (2005)",
        "Spécialisation en Imagerie Médicale Vétérinaire - École Vétérinaire d'Alfort (2007)",
        "Formation en Dermatologie Vétérinaire - Université de Gand (2010)"
      ],
      experience: [
        "Vétérinaire Associée - Clinique Vétérinaire Jonckers-Thoumsin (2008-présent)",
        "Vétérinaire spécialisée - Centre d'Imagerie Vétérinaire de Bruxelles (2007-2008)",
        "Assistante vétérinaire - Clinique Universitaire de Liège (2005-2007)"
      ],
      specializations: [
        "Imagerie médicale (échographie, radiologie)",
        "Dermatologie vétérinaire",
        "Médecine préventive",
        "Diagnostic par l'image"
      ],
      certifications: [
        "Membre de l'Ordre des Médecins Vétérinaires de Belgique",
        "Certification européenne en échographie vétérinaire (2015)",
        "Formation avancée en dermatologie allergique (2018)"
      ]
    }
  },
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "Assistante Vétérinaire (ASV)",
    bio: "Le sourire à l'accueil et la douceur au chenil. Sophie veille au confort de vos animaux hospitalisés et assiste nos vétérinaires dans tous les soins quotidiens.",
    imageUrl: "https://images.unsplash.com/photo-1594824804732-ca8db7d1457c?auto=format&fit=crop&q=80&w=500",
    cv: {
      education: [
        "Certificat d'Assistante Vétérinaire - Institut de Formation Vétérinaire de Namur (2015)",
        "Formation en soins aux animaux - Centre de Formation Professionnelle de Charleroi (2014)"
      ],
      experience: [
        "Assistante Vétérinaire - Clinique Vétérinaire Jonckers-Thoumsin (2016-présent)",
        "Stagiaire ASV - Clinique Vétérinaire de Soignies (2015-2016)"
      ],
      specializations: [
        "Soins post-opératoires",
        "Gestion de l'hospitalisation",
        "Assistance chirurgicale",
        "Accueil et conseil clientèle"
      ],
      certifications: [
        "Certificat d'Assistante Vétérinaire reconnu",
        "Formation aux premiers secours animaliers (2020)",
        "Formation en hygiène et stérilisation (2019)"
      ]
    }
  }
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "tiques-puces",
    title: "Tiques et Puces : La saison est ouverte !",
    excerpt: "Comment protéger efficacement votre chien et votre chat contre les parasites externes ce printemps.",
    date: "15 Mai 2024",
    category: "Prévention",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "nutrition-senior",
    title: "L'alimentation du chien senior",
    excerpt: "Les besoins nutritionnels changent avec l'âge. Découvrez nos conseils pour garder votre vieux compagnon en forme.",
    date: "02 Avril 2024",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "identification",
    title: "Pourquoi identifier son chat ?",
    excerpt: "L'identification est obligatoire mais surtout vitale pour retrouver votre animal en cas de perte.",
    date: "20 Mars 2024",
    category: "Législation",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600"
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "kibble-adult-12kg",
    name: "Croquettes Chien Adulte - 12kg",
    description: "Alimentation complète et équilibrée pour chiens adultes de taille moyenne.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=500",
    category: "Alimentation",
    requiresValidation: false,
    stock: 25,
    sku: "DOG-FOOD-12KG"
  },
  {
    id: "cat-food-sterilized-4kg",
    name: "Croquettes Chat Stérilisé - 4kg",
    description: "Formule spéciale pour le maintien du poids de forme des chats stérilisés.",
    price: 32.50,
    imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=500",
    category: "Alimentation",
    requiresValidation: false,
    stock: 18,
    sku: "CAT-FOOD-4KG"
  },
  {
    id: "antiparasitic-dog",
    name: "NexGard Spectra (Sur ordonnance)",
    description: "Protection complète contre les puces, tiques et vers. Délivrance uniquement après validation vétérinaire.",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true,
    stock: 0,
    sku: "NEXGARD-SPEC"
  },
  {
    id: "joint-supplement",
    name: "Complément Articulations",
    description: "Aide au soutien de la mobilité pour les chiens âgés.",
    price: 24.90,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    category: "Soins",
    requiresValidation: false,
    stock: 12,
    sku: "JOINT-SUPP"
  },
  {
    id: "dental-care",
    name: "Kit Hygiène Dentaire",
    description: "Brosse à dents et dentifrice spécialement conçus pour les chiens et chats.",
    price: 15.90,
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=500",
    category: "Soins",
    requiresValidation: false,
    stock: 8,
    sku: "DENTAL-KIT"
  },
  {
    id: "flea-collar",
    name: "Collier Anti-Puces",
    description: "Protection longue durée contre les puces et tiques pour chiens.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&q=80&w=500",
    category: "Accessoires",
    requiresValidation: false,
    stock: 15,
    sku: "FLEA-COLLAR"
  },
  {
    id: "frontline-combo",
    name: "Frontline Combo (Sur ordonnance)",
    description: "Traitement anti-puces et anti-tiques efficace. Pipettes pour chiens et chats. Délivrance après validation vétérinaire.",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true,
    stock: 0,
    sku: "FRONTLINE-COMBO"
  },
  {
    id: "bravecto-chien",
    name: "Bravecto Chien (Sur ordonnance)",
    description: "Protection 3 mois contre puces et tiques. Comprimé à croquer. Prescription vétérinaire obligatoire.",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true,
    stock: 0,
    sku: "BRAVECTO-DOG"
  },
  {
    id: "milbemax-vermifuge",
    name: "Milbemax Vermifuge (Sur ordonnance)",
    description: "Vermifuge large spectre pour chiens et chats. Traitement et prévention des vers. Sur prescription uniquement.",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true,
    stock: 0,
    sku: "MILBEMAX"
  },
  {
    id: "drontal-plus",
    name: "Drontal Plus (Sur ordonnance)",
    description: "Vermifuge complet contre tous types de vers intestinaux. Comprimés sécables. Validation vétérinaire requise.",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true,
    stock: 0,
    sku: "DRONTAL-PLUS"
  },
  {
    id: "spray-antiparasitaire",
    name: "Spray Antiparasitaire Environnement",
    description: "Traitement de l'habitat contre puces et acariens. Efficace sur tapis, coussins et niches.",
    price: 16.90,
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031d4c1?auto=format&fit=crop&q=80&w=500",
    category: "Soins",
    requiresValidation: false,
    stock: 20,
    sku: "SPRAY-ENV"
  }
];

export const DEFAULT_PAGES: Page[] = [
  {
    id: "home",
    title: "Accueil",
    slug: "home",
    content: "Page d'accueil de la clinique vétérinaire",
    metaDescription: "Clinique vétérinaire Jonckers-Thoumsin à Chièvres - Soins de qualité pour vos animaux",
    isPublished: true,
    lastModified: new Date().toISOString()
  },
  {
    id: "about",
    title: "À propos",
    slug: "about",
    content: "Notre histoire et notre philosophie de soins vétérinaires",
    metaDescription: "Découvrez l'histoire et la philosophie de la clinique vétérinaire Jonckers-Thoumsin",
    isPublished: true,
    lastModified: new Date().toISOString()
  }
];

export const DEFAULT_MEDIA: MediaFile[] = [
  {
    id: "hero-image",
    name: "hero-veterinaire.jpg",
    url: "/images/hero-veterinaire.jpg",
    type: "image",
    size: 245760,
    uploadDate: new Date().toISOString()
  },
  {
    id: "consultation-image",
    name: "consultation.jpg",
    url: "/images/consultation.jpg",
    type: "image",
    size: 189440,
    uploadDate: new Date().toISOString()
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    name: 'Marie Dubois',
    petName: 'Luna',
    petType: 'Chat',
    rating: 5,
    comment: 'Excellent accueil et soins de qualité. Le Dr Jonckers a pris le temps d\'expliquer le traitement de Luna. Je recommande vivement !',
    date: '2024-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isApproved: true
  },
  {
    id: '2',
    name: 'Pierre Martin',
    petName: 'Rex',
    petType: 'Chien',
    rating: 5,
    comment: 'Intervention chirurgicale parfaitement réalisée. L\'équipe est très professionnelle et rassurante. Rex va beaucoup mieux !',
    date: '2024-03-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isApproved: true
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    petName: 'Mimi',
    petType: 'Lapin',
    rating: 5,
    comment: 'Première fois avec un NAC, le Dr Thoumsin nous a parfaitement conseillés. Clinique moderne et équipe à l\'écoute.',
    date: '2024-03-05',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isApproved: true
  },
  {
    id: '4',
    name: 'Jean Dupont',
    petName: 'Bella',
    petType: 'Chien',
    rating: 5,
    comment: 'Service d\'urgence impeccable ! Bella a été prise en charge immédiatement. Merci à toute l\'équipe pour leur professionnalisme.',
    date: '2024-02-28',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isApproved: true
  },
  {
    id: '5',
    name: 'Amélie Rousseau',
    petName: 'Félix',
    petType: 'Chat',
    rating: 5,
    comment: 'Très satisfaite du suivi post-opératoire. L\'équipe est disponible et répond à toutes nos questions. Félix se porte à merveille !',
    date: '2024-02-20',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isApproved: true
  }
];