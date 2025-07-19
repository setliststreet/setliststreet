// Dead & Company Song Probability System
// Based on historical setlist data and typical rotation patterns

export interface SongProbability {
  name: string;
  probability: number; // 0-100%
  category: 'very-high' | 'high' | 'medium-high' | 'medium' | 'low-medium' | 'low' | 'very-rare';
  description: string;
}

export const SONG_PROBABILITIES: Record<string, SongProbability> = {
  // VERY HIGH PROBABILITY (80%+) - Nearly guaranteed every show
  "Brown Eyed Women": {
    name: "Brown Eyed Women",
    probability: 85,
    category: 'very-high',
    description: 'Almost always played - crowd favorite'
  },
  "Deal": {
    name: "Deal",
    probability: 82,
    category: 'very-high',
    description: 'Frequent opener or first set staple'
  },
  "Shakedown Street": {
    name: "Shakedown Street",
    probability: 80,
    category: 'very-high',
    description: 'Concert staple, often in second set'
  },

  // HIGH PROBABILITY (60-80%) - Very likely to appear
  "Jack Straw": {
    name: "Jack Straw",
    probability: 75,
    category: 'high',
    description: 'Popular opener and crowd pleaser'
  },
  "Truckin'": {
    name: "Truckin'",
    probability: 72,
    category: 'high',
    description: 'Classic Dead anthem, often in encore'
  },
  "Sugar Magnolia": {
    name: "Sugar Magnolia",
    probability: 70,
    category: 'high',
    description: 'High-energy show closer favorite'
  },
  "Casey Jones": {
    name: "Casey Jones",
    probability: 68,
    category: 'high',
    description: 'Reliable first set rocker'
  },
  "Scarlet Begonias": {
    name: "Scarlet Begonias",
    probability: 65,
    category: 'high',
    description: 'Often paired with Fire on the Mountain'
  },
  "Fire on the Mountain": {
    name: "Fire on the Mountain",
    probability: 63,
    category: 'high',
    description: 'Usually follows Scarlet Begonias'
  },
  "Uncle John's Band": {
    name: "Uncle John's Band",
    probability: 62,
    category: 'high',
    description: 'Harmonious crowd favorite'
  },

  // MEDIUM-HIGH PROBABILITY (40-60%) - Good chance of appearing
  "Eyes of the World": {
    name: "Eyes of the World",
    probability: 58,
    category: 'medium-high',
    description: 'Extended jam vehicle, second set regular'
  },
  "Althea": {
    name: "Althea",
    probability: 55,
    category: 'medium-high',
    description: 'Beautiful ballad, first set gem'
  },
  "Bertha": {
    name: "Bertha",
    probability: 52,
    category: 'medium-high',
    description: 'Energetic opener option'
  },
  "Sugaree": {
    name: "Sugaree",
    probability: 50,
    category: 'medium-high',
    description: 'Soulful showcase for John Mayer'
  },
  "Playing in the Band": {
    name: "Playing in the Band",
    probability: 48,
    category: 'medium-high',
    description: 'Epic jam centerpiece'
  },
  "China Cat Sunflower": {
    name: "China Cat Sunflower",
    probability: 45,
    category: 'medium-high',
    description: 'Usually flows into I Know You Rider'
  },
  "I Know You Rider": {
    name: "I Know You Rider",
    probability: 44,
    category: 'medium-high',
    description: 'Traditional follow-up to China Cat'
  },
  "Estimated Prophet": {
    name: "Estimated Prophet",
    probability: 42,
    category: 'medium-high',
    description: 'Weir showcase with driving rhythm'
  },

  // MEDIUM PROBABILITY (20-40%) - Moderate rotation
  "Terrapin Station": {
    name: "Terrapin Station",
    probability: 38,
    category: 'medium',
    description: 'Epic suite, special occasion song'
  },
  "Dark Star": {
    name: "Dark Star",
    probability: 35,
    category: 'medium',
    description: 'Legendary jam vehicle, not every show'
  },
  "Help on the Way": {
    name: "Help on the Way",
    probability: 32,
    category: 'medium',
    description: 'Complex suite opener'
  },
  "Slipknot!": {
    name: "Slipknot!",
    probability: 31,
    category: 'medium',
    description: 'Usually follows Help on the Way'
  },
  "Franklin's Tower": {
    name: "Franklin's Tower",
    probability: 30,
    category: 'medium',
    description: 'Uplifting suite finale'
  },
  "Friend of the Devil": {
    name: "Friend of the Devil",
    probability: 28,
    category: 'medium',
    description: 'Acoustic-style crowd pleaser'
  },
  "Bird Song": {
    name: "Bird Song",
    probability: 25,
    category: 'medium',
    description: 'Beautiful, spacey exploration'
  },
  "Ripple": {
    name: "Ripple",
    probability: 22,
    category: 'medium',
    description: 'Gentle, sing-along closer'
  },

  // LOW-MEDIUM PROBABILITY (10-20%) - Occasional treats
  "Morning Dew": {
    name: "Morning Dew",
    probability: 18,
    category: 'low-medium',
    description: 'Emotional powerhouse, special shows'
  },
  "St. Stephen": {
    name: "St. Stephen",
    probability: 16,
    category: 'low-medium',
    description: 'Complex arrangement, less frequent'
  },
  "The Other One": {
    name: "The Other One",
    probability: 15,
    category: 'low-medium',
    description: 'Chaotic exploration, not every tour'
  },
  "Wharf Rat": {
    name: "Wharf Rat",
    probability: 14,
    category: 'low-medium',
    description: 'Deep, emotional journey'
  },
  "He's Gone": {
    name: "He's Gone",
    probability: 12,
    category: 'low-medium',
    description: 'Powerful anthem, special occasions'
  },
  "Stella Blue": {
    name: "Stella Blue",
    probability: 11,
    category: 'low-medium',
    description: 'Haunting ballad, tour highlights'
  },

  // LOW PROBABILITY (1-10%) - Rare gems
  "Promised Land": {
    name: "Promised Land",
    probability: 8,
    category: 'low',
    description: 'Chuck Berry cover, rare treat'
  },
  "Box of Rain": {
    name: "Box of Rain",
    probability: 7,
    category: 'low',
    description: 'Phil vocal showcase, infrequent'
  },
  "Candyman": {
    name: "Candyman",
    probability: 6,
    category: 'low',
    description: 'Dark ballad, special shows only'
  },
  "Cold Rain and Snow": {
    name: "Cold Rain and Snow",
    probability: 5,
    category: 'low',
    description: 'Traditional folk song, rare'
  },
  "Cumberland Blues": {
    name: "Cumberland Blues",
    probability: 4,
    category: 'low',
    description: 'Bluegrass-style rocker, uncommon'
  },
  "Good Lovin'": {
    name: "Good Lovin'",
    probability: 3,
    category: 'low',
    description: 'R&B cover, very occasional'
  },
  "Attics of My Life": {
    name: "Attics of My Life",
    probability: 2,
    category: 'low',
    description: 'Gentle ballad, extremely rare'
  },

  // VERY RARE (<1%) - Once-in-a-lifetime surprises
  "Black Peter": {
    name: "Black Peter",
    probability: 0.8,
    category: 'very-rare',
    description: 'Ultra-rare emotional epic'
  },
  "Standing on the Moon": {
    name: "Standing on the Moon",
    probability: 0.5,
    category: 'very-rare',
    description: 'Space ballad, almost never played'
  },
  "Death Don't Have No Mercy": {
    name: "Death Don't Have No Mercy",
    probability: 0.3,
    category: 'very-rare',
    description: 'Gospel blues, legendary rarity'
  },
};

// Color scheme for probability categories
export const PROBABILITY_COLORS = {
  'very-high': {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400',
    text: 'text-emerald-200',
    glow: 'shadow-emerald-500/30',
    description: 'Almost Guaranteed'
  },
  'high': {
    bg: 'bg-green-500/20',
    border: 'border-green-400',
    text: 'text-green-200',
    glow: 'shadow-green-500/30',
    description: 'Very Likely'
  },
  'medium-high': {
    bg: 'bg-lime-500/20',
    border: 'border-lime-400',
    text: 'text-lime-200',
    glow: 'shadow-lime-500/30',
    description: 'Good Chance'
  },
  'medium': {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400',
    text: 'text-yellow-200',
    glow: 'shadow-yellow-500/30',
    description: 'Moderate'
  },
  'low-medium': {
    bg: 'bg-orange-500/20',
    border: 'border-orange-400',
    text: 'text-orange-200',
    glow: 'shadow-orange-500/30',
    description: 'Occasional'
  },
  'low': {
    bg: 'bg-red-500/20',
    border: 'border-red-400',
    text: 'text-red-200',
    glow: 'shadow-red-500/30',
    description: 'Rare Gem'
  },
  'very-rare': {
    bg: 'bg-purple-500/20',
    border: 'border-purple-400',
    text: 'text-purple-200',
    glow: 'shadow-purple-500/30',
    description: 'Unicorn Song'
  },
};

// Helper functions
export function getSongProbability(songName: string): SongProbability | null {
  return SONG_PROBABILITIES[songName] || null;
}

export function getProbabilityColor(category: string) {
  return PROBABILITY_COLORS[category as keyof typeof PROBABILITY_COLORS] || PROBABILITY_COLORS.medium;
}

export function getSongsByCategory(category: string): SongProbability[] {
  return Object.values(SONG_PROBABILITIES).filter(song => song.category === category);
}

export function getAllSongs(): SongProbability[] {
  return Object.values(SONG_PROBABILITIES).sort((a, b) => b.probability - a.probability);
}

// Get a random song weighted by probability
export function getWeightedRandomSong(): SongProbability {
  const songs = getAllSongs();
  const totalWeight = songs.reduce((sum, song) => sum + song.probability, 0);
  let random = Math.random() * totalWeight;
  
  for (const song of songs) {
    random -= song.probability;
    if (random <= 0) {
      return song;
    }
  }
  
  return songs[0]; // Fallback
} 