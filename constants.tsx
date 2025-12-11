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
  heroImage: "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg"
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
    title: "Colombophilie",
    iconName: "Bird",
    shortDescription: "Suivi spécialisé et vaccinations pour les pigeons voyageurs.",
    fullDescription: "Service spécialisé pour les amateurs de colombophilie. Nous assurons le suivi sanitaire de votre colonie, les vaccinations obligatoires et les analyses microscopiques.",
    features: [
      "Analyses de fientes",
      "Vaccinations paramyxovirose",
      "Traitements respiratoires",
      "Certificats de bonne santé"
    ],
    faqs: [
      { question: "Quand vacciner mes pigeons ?", answer: "Le schéma vaccinal idéal se discute en consultation selon la saison de concours." }
    ]
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "frederic-jonckers",
    name: "Dr. Frédéric Jonckers",
    role: "Vétérinaire Fondateur",
    bio: "Fondateur de la clinique, il apporte plus de 25 ans d'expérience en médecine vétérinaire. Passionné par la chirurgie des tissus mous et la médecine interne, il assure la direction médicale de l'établissement.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_640.jpg",
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
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/18/08/33/doctor-5058699_640.jpg",
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
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_640.jpg",
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
    imageUrl: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_640.jpg"
  },
  {
    id: "nutrition-senior",
    title: "L'alimentation du chien senior",
    excerpt: "Les besoins nutritionnels changent avec l'âge. Découvrez nos conseils pour garder votre vieux compagnon en forme.",
    date: "02 Avril 2024",
    category: "Nutrition",
    imageUrl: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg"
  },
  {
    id: "identification",
    title: "Pourquoi identifier son chat ?",
    excerpt: "L'identification est obligatoire mais surtout vitale pour retrouver votre animal en cas de perte.",
    date: "20 Mars 2024",
    category: "Législation",
    imageUrl: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg"
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "kibble-adult-12kg",
    name: "Croquettes Chien Adulte - 12kg",
    description: "Alimentation complète et équilibrée pour chiens adultes de taille moyenne.",
    price: 64.99,
    imageUrl: "/images/products/dog-food.jpg",
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
    imageUrl: "/images/products/cat-food.jpg",
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
    imageUrl: "/images/products/nexgard.jpg",
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
    imageUrl: "/images/products/joint-supplement.jpg",
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
    imageUrl: "/images/products/dental-care.jpg",
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
    imageUrl: "/images/products/flea-collar.jpg",
    category: "Accessoires",
    requiresValidation: false,
    stock: 15,
    sku: "FLEA-COLLAR"
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