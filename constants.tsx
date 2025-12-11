import { 
  Stethoscope, 
  Scissors, 
  Siren, 
  Scan, 
  Bed, 
  Bird,
  LucideIcon
} from 'lucide-react';
import { Service, TeamMember, BlogPost, ClinicInfo, Product } from './types';

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
    id: "fred-jonckers",
    name: "Dr. Frédérique Jonckers",
    role: "Vétérinaire Associée",
    bio: "Fondatrice de la clinique, passionnée par la chirurgie des tissus mous et la médecine interne depuis plus de 25 ans.",
    imageUrl: "https://placehold.co/400x500/e2e8f0/1e293b?text=Photo+à+venir"
  },
  {
    id: "laurence-thoumsin",
    name: "Dr. Laurence Thoumsin",
    role: "Vétérinaire Associée",
    bio: "Spécialisée en imagerie médicale et en dermatologie, elle assure des diagnostics précis avec douceur.",
    imageUrl: "https://placehold.co/400x500/e2e8f0/1e293b?text=Photo+à+venir"
  },
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "Assistante Vétérinaire (ASV)",
    bio: "Le sourire à l'accueil et la douceur au chenil. Sophie veille au confort de vos animaux hospitalisés.",
    imageUrl: "https://placehold.co/400x500/e2e8f0/1e293b?text=Photo+à+venir"
  }
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "tiques-puces",
    title: "Tiques et Puces : La saison est ouverte !",
    excerpt: "Comment protéger efficacement votre chien et votre chat contre les parasites externes ce printemps.",
    date: "15 Mai 2024",
    category: "Prévention",
    imageUrl: "https://picsum.photos/id/169/600/400"
  },
  {
    id: "nutrition-senior",
    title: "L'alimentation du chien senior",
    excerpt: "Les besoins nutritionnels changent avec l'âge. Découvrez nos conseils pour garder votre vieux compagnon en forme.",
    date: "02 Avril 2024",
    category: "Nutrition",
    imageUrl: "https://picsum.photos/id/1025/600/400"
  },
  {
    id: "identification",
    title: "Pourquoi identifier son chat ?",
    excerpt: "L'identification est obligatoire mais surtout vitale pour retrouver votre animal en cas de perte.",
    date: "20 Mars 2024",
    category: "Législation",
    imageUrl: "https://picsum.photos/id/40/600/400"
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "kibble-adult-12kg",
    name: "Croquettes Chien Adulte - 12kg",
    description: "Alimentation complète et équilibrée pour chiens adultes de taille moyenne.",
    price: "64.99 €",
    imageUrl: "https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&q=80&w=500",
    category: "Alimentation",
    requiresValidation: false
  },
  {
    id: "cat-food-sterilized-4kg",
    name: "Croquettes Chat Stérilisé - 4kg",
    description: "Formule spéciale pour le maintien du poids de forme des chats stérilisés.",
    price: "32.50 €",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500",
    category: "Alimentation",
    requiresValidation: false
  },
  {
    id: "antiparasitic-dog",
    name: "NexGard Spectra (Sur ordonnance)",
    description: "Protection complète contre les puces, tiques et vers. Délivrance uniquement après validation vétérinaire.",
    price: "Sur demande",
    imageUrl: "https://images.unsplash.com/photo-1607569708745-f26d36e23292?auto=format&fit=crop&q=80&w=500",
    category: "Médicaments",
    requiresValidation: true
  },
  {
    id: "joint-supplement",
    name: "Complément Articulations",
    description: "Aide au soutien de la mobilité pour les chiens âgés.",
    price: "24.90 €",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    category: "Soins",
    requiresValidation: false
  }
];