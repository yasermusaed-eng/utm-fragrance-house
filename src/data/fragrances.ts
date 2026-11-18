export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  family: 'fresh' | 'sweet' | 'woody' | 'aquatic' | 'spicy';
  familyLabel: string;
  badge?: string;
  description: string;
  notes: ScentNotes;
  sillage: string;
  longevity: string;
  recommendedFor: string;
  colorGradient: string;
  image: string;
}

export interface SizeOption {
  size: '30ml' | '50ml' | '100ml';
  price: number;
  label: string;
  badge?: string;
  description: string;
}

export const SIZE_OPTIONS: SizeOption[] = [
  {
    size: '30ml',
    price: 39,
    label: 'Pocket Edition',
    description: 'Perfect for backpacks, gym lockers & on-the-go reapplication.'
  },
  {
    size: '50ml',
    price: 65,
    label: 'Daily Signature',
    badge: 'Most Popular',
    description: 'Core hero bottle. Provides 3–4 months of daily premium wear.'
  },
  {
    size: '100ml',
    price: 119,
    label: 'Luxury Flacon',
    description: 'Maximum value flacon for true daily scent enthusiasts.'
  }
];

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'lv-imagination',
    name: 'Imagination',
    brand: 'Inspired by Louis Vuitton',
    subtitle: 'Calabrian Bergamot, Black Tea & Ambergris',
    family: 'aquatic',
    familyLabel: 'Fresh / Aquatic / Citrus',
    badge: 'Drop 01 Headliner',
    description: 'A luminous burst of sun-drenched Italian citrus meeting steeped Ceylon black tea and refined ambroxan. Uniquely refreshing, ultra-luxurious, and cuts effortlessly through tropical humidity.',
    notes: {
      top: ['Calabrian Bergamot', 'Sicilian Orange', 'Citron'],
      heart: ['Ceylon Black Tea', 'Nigerian Ginger', 'Tunisian Neroli'],
      base: ['Ambroxan', 'Guaiac Wood', 'Olibanum Frankincense']
    },
    sillage: '8/10 Moderate-Loud',
    longevity: '7–9 Hours',
    recommendedFor: 'Hot afternoon campus walks, lecture halls, clean luxury statement',
    colorGradient: 'from-amber-500/20 via-orange-900/10 to-transparent',
    image: '/images/perfumes/lv-imagination.png'
  },
  {
    id: 'dior-sauvage',
    name: 'Sauvage',
    brand: 'Inspired by Dior',
    subtitle: 'Sichuan Pepper, Ambroxan & Crisp Bergamot',
    family: 'spicy',
    familyLabel: 'Aromatic / Fresh Spicy / Woody',
    badge: 'Monster Projection',
    description: 'The definitive masculine icon. Electrifying Reggio bergamot fused with warm, spicy Sichuan pepper over a rich magnetic bed of raw ambroxan and cedarwood.',
    notes: {
      top: ['Reggio Calabria Bergamot', 'Cracked Black Pepper'],
      heart: ['Sichuan Pepper', 'Provence Lavender', 'Star Anise', 'Nutmeg'],
      base: ['Ambroxan', 'Papua New Guinean Vanilla', 'Atlas Cedar']
    },
    sillage: '9.5/10 High Projection',
    longevity: '8–10+ Hours',
    recommendedFor: 'Evening hangouts, presentations, high-impact first impressions',
    colorGradient: 'from-blue-600/20 via-indigo-950/20 to-transparent',
    image: '/images/perfumes/dior-sauvage.png'
  },
  {
    id: 'versace-eros',
    name: 'Eros',
    brand: 'Inspired by Versace',
    subtitle: 'Crisp Green Apple, Italian Mint & Tonka Bean',
    family: 'sweet',
    familyLabel: 'Fresh Sweet / Amber Vanilla',
    badge: 'Campus Crowd-Pleaser',
    description: 'Sensual energy in a bottle. Crisp candied green apple paired with crushed Mediterranean mint leaves, enriched by creamy Venezuelan tonka and Madagascar vanilla.',
    notes: {
      top: ['Italian Lemon Zest', 'Crisp Green Apple', 'Crushed Mint'],
      heart: ['Venezuelan Tonka Bean', 'Ambroxan Crystals', 'Geranium Flower'],
      base: ['Madagascar Vanilla', 'Virginian Cedarwood', 'Oakmoss']
    },
    sillage: '9/10 Room Filler',
    longevity: '8–10 Hours',
    recommendedFor: 'Weekend vibes, casual dining, gym, clubbing & dates',
    colorGradient: 'from-emerald-500/20 via-teal-950/20 to-transparent',
    image: '/images/perfumes/versace-eros.png'
  },
  {
    id: 'jpg-le-male',
    name: 'Le Male',
    brand: 'Inspired by Jean Paul Gaultier',
    subtitle: 'French Lavender, Fresh Mint & Warm Bourbon Vanilla',
    family: 'sweet',
    familyLabel: 'Warm Sweet / Amber / Fougere',
    badge: 'Night & Date Night Scent',
    description: 'An alluring contrast between cool crisp lavender-mint and intoxicating roasted vanilla honey. Smooth, deeply seductive, and comforting in cool air-conditioned rooms.',
    notes: {
      top: ['Cardamom', 'Fresh Mint Leaves', 'Bergamot', 'Artemisia'],
      heart: ['Lavender', 'Orange Blossom', 'Cinnamon Bark'],
      base: ['Bourbon Vanilla', 'Tonka Bean', 'Sandalwood', 'Golden Amber']
    },
    sillage: '8.5/10 Warm & Enveloping',
    longevity: '8–10 Hours',
    recommendedFor: 'Study dates, library sessions, air-conditioned lecture halls',
    colorGradient: 'from-amber-600/20 via-yellow-950/20 to-transparent',
    image: '/images/perfumes/jpg-le-male.png'
  },
  {
    id: 'armani-adg',
    name: 'Acqua Di Gio',
    brand: 'Inspired by Giorgio Armani',
    subtitle: 'Ocean Breeze, Green Tangerine & Indonesian Patchouli',
    family: 'aquatic',
    familyLabel: 'Aquatic / Marine / Citrus',
    badge: 'Timeless Signature',
    description: 'The purity of crashing Mediterranean waves against sun-warmed sea rocks. Crisp marine breeze blended with green citrus and aromatic rosemary over earthy patchouli.',
    notes: {
      top: ['Marine Notes', 'Green Tangerine', 'Calabrian Bergamot'],
      heart: ['Rosemary', 'Lavender', 'Cypress Wood', 'Geranium'],
      base: ['Indonesian Patchouli', 'Mineral Amber', 'Clean Musk']
    },
    sillage: '7.5/10 Crisp & Clean',
    longevity: '6–8 Hours',
    recommendedFor: 'Daily signature, gym workouts, intense hot days',
    colorGradient: 'from-cyan-500/20 via-slate-900/20 to-transparent',
    image: '/images/perfumes/armani-adg.png'
  },
  {
    id: 'ysl-myslf',
    name: 'MYSLF',
    brand: 'Inspired by Yves Saint Laurent',
    subtitle: 'Orange Blossom Absolute & Warm Ambrofix Wood',
    family: 'woody',
    familyLabel: 'Modern Woody / Floral / Clean',
    badge: 'Modern Sophistication',
    description: 'The epitome of contemporary understated luxury. Sparkling bergamot gives way to an airy heart of raw orange blossom, anchored in velvety Ambrofix wood.',
    notes: {
      top: ['Calabrian Bergamot', 'Bergamot Vert'],
      heart: ['Tunisian Orange Blossom Absolute'],
      base: ['Ambrofix', 'Indonesian Patchouli Heart']
    },
    sillage: '8/10 Sophisticated Trail',
    longevity: '7–9 Hours',
    recommendedFor: 'Formal campus dinners, daily signature wear, professional meetings',
    colorGradient: 'from-rose-500/20 via-purple-950/20 to-transparent',
    image: '/images/perfumes/ysl-myslf.jpg'
  }
];

export const PICKUP_STATIONS = [
  {
    id: 'meranti',
    name: 'Arked Meranti Hub',
    detail: 'Outdoor cafe tables • 5:00 PM – 6:30 PM (Mon / Wed / Drop Days)',
    desc: 'High foot-traffic campus central station.'
  },
  {
    id: 'psz',
    name: 'PSZ Library Foyer',
    detail: 'Main entrance foyer • 5:00 PM – 6:30 PM (Tue / Thu)',
    desc: 'Peaceful air-conditioned pickup spot for studying students.'
  },
  {
    id: 'tmn-u',
    name: 'Taman Universiti Hub',
    detail: 'Flexible / By Appointment',
    desc: 'Dedicated pickup station for off-campus residents.'
  }
];
