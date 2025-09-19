import type { Pop } from '../types';

// Initial library of 25 popular diet sodas with authentic brand colors
export const INITIAL_POPS: Pop[] = [
  // Coca-Cola Family
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    brand: 'Coca-Cola',
    primaryColor: '#C0C0C0',
    secondaryColor: '#FF0000',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: 'The original diet cola',
    caffeine: 46,
    calories: 0
  },
  {
    id: 'coke-zero',
    name: 'Coke Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#000000',
    secondaryColor: '#FF0000',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: 'Real Coke taste, zero calories',
    caffeine: 34,
    calories: 0
  },
  {
    id: 'diet-coke-cherry',
    name: 'Diet Coke Cherry',
    brand: 'Coca-Cola',
    primaryColor: '#8B0000',
    secondaryColor: '#C0C0C0',
    accentColor: '#FF69B4',
    isCustom: false,
    description: 'Diet Coke with cherry flavor',
    caffeine: 46,
    calories: 0
  },
  {
    id: 'diet-coke-vanilla',
    name: 'Diet Coke Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#F5DEB3',
    secondaryColor: '#C0C0C0',
    accentColor: '#8B4513',
    isCustom: false,
    description: 'Diet Coke with vanilla flavor',
    caffeine: 46,
    calories: 0
  },

  // PepsiCo Family
  {
    id: 'diet-pepsi',
    name: 'Diet Pepsi',
    brand: 'PepsiCo',
    primaryColor: '#004B93',
    secondaryColor: '#B8C5D6',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: 'Light, crisp, refreshing',
    caffeine: 35,
    calories: 0
  },
  {
    id: 'pepsi-zero',
    name: 'Pepsi Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#000000',
    secondaryColor: '#004B93',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: 'Maximum taste, zero sugar',
    caffeine: 69,
    calories: 0
  },
  {
    id: 'diet-pepsi-wild-cherry',
    name: 'Diet Pepsi Wild Cherry',
    brand: 'PepsiCo',
    primaryColor: '#DC143C',
    secondaryColor: '#004B93',
    accentColor: '#FFB6C1',
    isCustom: false,
    description: 'Diet Pepsi with wild cherry flavor',
    caffeine: 35,
    calories: 0
  },

  // Dr Pepper Snapple Group
  {
    id: 'diet-dr-pepper',
    name: 'Diet Dr Pepper',
    brand: 'Dr Pepper',
    primaryColor: '#722F37',
    secondaryColor: '#B8860B',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: '23 flavors, zero calories',
    caffeine: 41,
    calories: 0
  },
  {
    id: 'dr-pepper-zero',
    name: 'Dr Pepper Zero Sugar',
    brand: 'Dr Pepper',
    primaryColor: '#000000',
    secondaryColor: '#722F37',
    accentColor: '#B8860B',
    isCustom: false,
    description: 'The taste you deserve with zero sugar',
    caffeine: 41,
    calories: 0
  },
  {
    id: 'diet-dr-pepper-cherry',
    name: 'Diet Dr Pepper Cherry',
    brand: 'Dr Pepper',
    primaryColor: '#8B0000',
    secondaryColor: '#722F37',
    accentColor: '#FF69B4',
    isCustom: false,
    description: 'Dr Pepper with cherry flavor',
    caffeine: 41,
    calories: 0
  },

  // Sprite/Lemon-Lime Family
  {
    id: 'sprite-zero',
    name: 'Sprite Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#00AF3F',
    secondaryColor: '#FFFFFF',
    accentColor: '#32CD32',
    isCustom: false,
    description: 'Crisp, clean taste with zero sugar',
    caffeine: 0,
    calories: 0
  },
  {
    id: 'diet-7up',
    name: 'Diet 7UP',
    brand: '7UP',
    primaryColor: '#32CD32',
    secondaryColor: '#FFFFFF',
    accentColor: '#228B22',
    isCustom: false,
    description: 'The uncola, zero calories',
    caffeine: 0,
    calories: 0
  },

  // Mountain Dew Family
  {
    id: 'diet-mountain-dew',
    name: 'Diet Mountain Dew',
    brand: 'PepsiCo',
    primaryColor: '#ADFF2F',
    secondaryColor: '#228B22',
    accentColor: '#FFFFFF',
    isCustom: false,
    description: 'Diet fuel for adventures',
    caffeine: 54,
    calories: 0
  },
  {
    id: 'mtn-dew-zero',
    name: 'Mtn Dew Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#000000',
    secondaryColor: '#ADFF2F',
    accentColor: '#228B22',
    isCustom: false,
    description: 'All the Dew, none of the sugar',
    caffeine: 68,
    calories: 0
  },

  // Orange Sodas
  {
    id: 'diet-orange-crush',
    name: 'Diet Orange Crush',
    brand: 'Dr Pepper Snapple',
    primaryColor: '#FF8C00',
    secondaryColor: '#FFE4B5',
    accentColor: '#FF4500',
    isCustom: false,
    description: 'Orange goodness without the calories',
    caffeine: 0,
    calories: 0
  },
  {
    id: 'diet-sunkist',
    name: 'Diet Sunkist Orange',
    brand: 'Dr Pepper Snapple',
    primaryColor: '#FFA500',
    secondaryColor: '#FFFF00',
    accentColor: '#FF6347',
    isCustom: false,
    description: 'Fun, sun and the beach in every sip',
    caffeine: 41,
    calories: 0
  },

  // Root Beer
  {
    id: 'diet-a-w',
    name: 'Diet A&W Root Beer',
    brand: 'Dr Pepper Snapple',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    accentColor: '#F5DEB3',
    isCustom: false,
    description: 'Made with aged vanilla',
    caffeine: 0,
    calories: 0
  },
  {
    id: 'diet-barqs',
    name: "Diet Barq's Root Beer",
    brand: 'Coca-Cola',
    primaryColor: '#654321',
    secondaryColor: '#8B4513',
    accentColor: '#F4A460',
    isCustom: false,
    description: 'Diet Barqs has bite',
    caffeine: 18,
    calories: 0
  },

  // Ginger Ale
  {
    id: 'diet-ginger-ale',
    name: 'Diet Canada Dry',
    brand: 'Dr Pepper Snapple',
    primaryColor: '#DAA520',
    secondaryColor: '#FFFFFF',
    accentColor: '#228B22',
    isCustom: false,
    description: 'Made from real ginger',
    caffeine: 0,
    calories: 0
  },

  // Energy/Specialty
  {
    id: 'coke-energy-zero',
    name: 'Coke Energy Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#FF0000',
    secondaryColor: '#000000',
    accentColor: '#FFD700',
    isCustom: false,
    description: 'Energy you want, taste you love',
    caffeine: 114,
    calories: 0
  },

  // Specialty Flavors
  {
    id: 'diet-coke-lime',
    name: 'Diet Coke Lime',
    brand: 'Coca-Cola',
    primaryColor: '#32CD32',
    secondaryColor: '#C0C0C0',
    accentColor: '#ADFF2F',
    isCustom: false,
    description: 'Diet Coke with lime flavor',
    caffeine: 46,
    calories: 0
  },
  {
    id: 'diet-coke-orange-vanilla',
    name: 'Diet Coke Orange Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#FF8C00',
    secondaryColor: '#F5DEB3',
    accentColor: '#C0C0C0',
    isCustom: false,
    description: 'Orange vanilla twist',
    caffeine: 46,
    calories: 0
  },

  // Lemon-Lime Variations
  {
    id: 'sierra-mist-zero',
    name: 'Sierra Mist Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#FFFF00',
    secondaryColor: '#FFFFFF',
    accentColor: '#32CD32',
    isCustom: false,
    description: 'Natural lemon lime flavor',
    caffeine: 0,
    calories: 0
  },

  // Classic Diet
  {
    id: 'tab',
    name: 'Tab Cola',
    brand: 'Coca-Cola',
    primaryColor: '#FF1493',
    secondaryColor: '#FFFFFF',
    accentColor: '#C0C0C0',
    isCustom: false,
    description: 'The original diet cola',
    caffeine: 46,
    calories: 0,
    year: 1963
  },

  // International
  {
    id: 'diet-coke-twisted-mango',
    name: 'Diet Coke Twisted Mango',
    brand: 'Coca-Cola',
    primaryColor: '#FF8C00',
    secondaryColor: '#FFE4B5',
    accentColor: '#C0C0C0',
    isCustom: false,
    description: 'Exotic mango twist',
    caffeine: 46,
    calories: 0
  }
];

// Utility function to get pop by ID
export const getPopById = (id: string): Pop | undefined => {
  return INITIAL_POPS.find(pop => pop.id === id);
};

// Utility function to get pops by brand
export const getPopsByBrand = (brand: string): Pop[] => {
  return INITIAL_POPS.filter(pop => pop.brand === brand);
};

// Get all unique brands
export const getAllBrands = (): string[] => {
  return Array.from(new Set(INITIAL_POPS.map(pop => pop.brand))).sort();
};