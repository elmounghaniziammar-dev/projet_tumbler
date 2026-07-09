import { Product } from './types';

export const COLORS_PALETTE = {
  black: { id: 'black', name: 'Noir Mat', hex: '#1C1C1E', accentHex: '#121214', imageColor: '#212124' },
  white: { id: 'white', name: 'Blanc Alpin', hex: '#F5F5F7', accentHex: '#E5E5E7', imageColor: '#F0F0F2' },
  blue: { id: 'blue', name: 'Bleu Océan', hex: '#5A869F', accentHex: '#43687E', imageColor: '#6B96AF' },
  sage: { id: 'sage', name: 'Sauge Électrique', hex: '#87A990', accentHex: '#6F8E77', imageColor: '#96B89E' },
  clay: { id: 'clay', name: 'Argile Crépuscule', hex: '#D48D7A', accentHex: '#B9725F', imageColor: '#E29B88' },
  cobalt: { id: 'cobalt', name: 'Cobalt Intense', hex: '#0050cc', accentHex: '#003da1', imageColor: '#0066FF' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'aura-horizon',
    name: 'Aura Horizon',
    subtitle: "Le compagnon d'hydratation ultime",
    description: "Conçu pour s'adapter à votre rythme de vie, le Aura Horizon allie une capacité généreuse de 1,2L, une isolation sous vide double-paroi de pointe, et une poignée ergonomique renforcée. Parfaitement adapté au porte-gobelet de votre véhicule, il maintient vos boissons glacées pendant 24 heures ou chaudes pendant 12 heures grâce à notre revêtement thermique breveté.",
    basePrice: 45,
    rating: 4.9,
    reviewsCount: 184,
    imageSeed: 'horizon',
    colors: [
      COLORS_PALETTE.black,
      COLORS_PALETTE.white,
      COLORS_PALETTE.blue,
      COLORS_PALETTE.sage,
      COLORS_PALETTE.clay,
    ],
    accessories: [
      { id: 'acc-straw', name: 'Paille Intégrée Pro (Inclus)', price: 0, description: 'Paille en tritan sans BPA, lavable et durable' },
      { id: 'acc-sip', name: 'Couvercle Clapet Étanche', price: 5, description: 'Fermeture 100% hermétique pour boissons chaudes' },
      { id: 'acc-silicone', name: 'Protection de base en Silicone', price: 8, description: 'Manchon absorbant les chocs et limitant le bruit' }
    ],
    specs: {
      retentionHot: '12 Heures Chaud',
      retentionCold: '24 Heures Glacé',
      material: 'Acier Inoxydable 18/8 Double Paroi',
      weight: '630g à vide',
      dimensions: '26,5 cm (H) x 10 cm (L) (Base: 7,5 cm)',
      capacity: '1,2 L (40 oz)',
      dishwasherSafe: true,
      bpaFree: true,
    },
    featured: true,
    tag: 'Best-Seller'
  },
  {
    id: 'aura-nomad',
    name: 'Aura Nomad',
    subtitle: "La performance en mouvement",
    description: "Le Aura Nomad est l'allié idéal des athlètes et passionnés de outdoor. Doté d'une boucle de transport flexible intégrée à son couvercle et d'une paille rapide à clapet, il garantit une étanchéité absolue en toutes circonstances. Son profil élancé offre une prise en main ergonomique lors de vos entraînements.",
    basePrice: 35,
    rating: 4.8,
    reviewsCount: 92,
    imageSeed: 'nomad',
    colors: [
      COLORS_PALETTE.black,
      COLORS_PALETTE.white,
      COLORS_PALETTE.cobalt,
      COLORS_PALETTE.sage,
    ],
    accessories: [
      { id: 'acc-loop', name: 'Bouchon Boucle Flexible (Inclus)', price: 0, description: 'Anneau de transport ergonomique et étanche' },
      { id: 'acc-filter', name: 'Filtre à Infuser Intégrable', price: 6, description: 'Pour thés, fruits ou glaçons' }
    ],
    specs: {
      retentionHot: '8 Heures Chaud',
      retentionCold: '24 Heures Glacé',
      material: 'Acier Inoxydable Pro-Grade 18/8',
      weight: '410g à vide',
      dimensions: '22,5 cm (H) x 8 cm (L)',
      capacity: '750 ml (25 oz)',
      dishwasherSafe: true,
      bpaFree: true,
    },
    featured: false,
    tag: 'Nouveauté'
  },
  {
    id: 'aura-flow',
    name: 'Aura Flow',
    subtitle: "Hydratation haute intensité",
    description: "Avec son ouverture large (Wide-Mouth) facilitant l'insertion rapide de gros glaçons, de tranches d'agrumes et facilitant le nettoyage, l'Aura Flow est pensé pour l'efficacité. Sa finition texturée en peinture poudrée haut de gamme offre une adhérence maximale même avec les mains humides.",
    basePrice: 39,
    rating: 4.7,
    reviewsCount: 65,
    imageSeed: 'flow',
    colors: [
      COLORS_PALETTE.black,
      COLORS_PALETTE.white,
      COLORS_PALETTE.blue,
      COLORS_PALETTE.clay,
    ],
    accessories: [
      { id: 'acc-chug', name: 'Couvercle Chug Éco (Inclus)', price: 0, description: 'Grand débit pour une hydratation rapide' },
      { id: 'acc-strap', name: 'Sangle de Transport Ajustable', price: 9, description: 'Cordon tressé en nylon ultra-résistant' }
    ],
    specs: {
      retentionHot: '10 Heures Chaud',
      retentionCold: '24 Heures Froid',
      material: 'Acier Inoxydable Recyclé à 90% (18/8)',
      weight: '520g à vide',
      dimensions: '25,0 cm (H) x 9 cm (L)',
      capacity: '950 ml (32 oz)',
      dishwasherSafe: true,
      bpaFree: true,
    },
    featured: false,
    tag: 'Édition Limitée'
  },
  {
    id: 'aura-pulse',
    name: 'Aura Pulse',
    subtitle: "Le rituel café réinventé",
    description: "Plus qu'un simple mug de voyage, l'Aura Pulse est une pièce de design pour votre rituel quotidien. Sa fermeture magnétique exclusive offre un débit d'eau naturel et régulier tout en évitant les éclaboussures. Sa taille compacte s'adapte à la majorité des machines à café automatiques et professionnelles.",
    basePrice: 29,
    rating: 4.9,
    reviewsCount: 114,
    imageSeed: 'pulse',
    colors: [
      COLORS_PALETTE.black,
      COLORS_PALETTE.white,
      COLORS_PALETTE.clay,
    ],
    accessories: [
      { id: 'acc-mag', name: 'Couvercle Magnétique Pro (Inclus)', price: 0, description: 'Fermeture glissière aimantée ultra-fluide' }
    ],
    specs: {
      retentionHot: '6 Heures Chaud',
      retentionCold: '12 Heures Froid',
      material: 'Acier Inoxydable 18/8 à Isolation Active',
      weight: '290g à vide',
      dimensions: '14,5 cm (H) x 8,5 cm (L)',
      capacity: '450 ml (15 oz)',
      dishwasherSafe: true,
      bpaFree: true,
    },
    featured: true,
    tag: 'Compact'
  }
];

export const REVIEWS = [
  {
    name: "Alexandre M.",
    role: "Guide de haute montagne",
    rating: 5,
    comment: "Mon Aura Nomad a survécu à plusieurs expéditions à plus de 4000m. L'eau reste glacée même après 24 heures sous un soleil de plomb. La boucle de transport est hyper robuste.",
    date: "Il y a 2 semaines"
  },
  {
    name: "Sophie L.",
    role: "Architecte d'intérieur",
    rating: 5,
    comment: "L'Aura Horizon en Blanc Alpin est d'un minimalisme absolu. Il trône sur mon bureau tous les jours. L'ergonomie de la poignée et le confort de la paille sont incomparables.",
    date: "Il y a 1 mois"
  },
  {
    name: "Marc-Antoine P.",
    role: "Triathlète amateur",
    rating: 5,
    comment: "Excellent produit, la gravure laser personnalisée est d'une précision chirurgicale. Idéal pour offrir ou se faire plaisir.",
    date: "Il y a 3 jours"
  }
];
