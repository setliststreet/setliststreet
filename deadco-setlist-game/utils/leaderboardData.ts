// Setlist Street Leaderboard & Sponsor System

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  category: 'music' | 'wellness' | 'lifestyle' | 'events' | 'cannabis' | 'mushrooms';
  prizeTypes: string[];
  isActive: boolean;
}

export interface Charity {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  mission: string;
  deadCoConnection: string;
  totalRaised: number;
  isActive: boolean;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar?: string;
  rank: number;
  score: number;
  gamesPlayed: number;
  winRate: number;
  totalWinnings?: number;
  favoriteMode: 'prize' | 'cash' | 'charity';
  achievements: string[];
  lastActive: string;
}

export interface GameResult {
  id: string;
  gameType: 'bingo' | 'opener' | 'encore' | 'setlist' | 'trivia';
  mode: 'prize' | 'cash' | 'charity';
  date: string;
  venue: string;
  winners: LeaderboardEntry[];
  prize: string | number;
  sponsor?: string;
  charity?: string;
  participants: number;
}

// Realistic Sponsor Data
export const SPONSORS: Sponsor[] = [
  {
    id: 'cashortrade',
    name: 'CashOrTrade',
    logo: '/sponsors/cashortrade.png',
    website: 'https://cashortrade.org',
    description: 'The trusted face-value ticket exchange for music fans',
    category: 'music',
    prizeTypes: ['Concert Tickets', 'VIP Experiences', 'Meet & Greets'],
    isActive: true
  },
  {
    id: 'nugs',
    name: 'Nugs.net',
    logo: '/sponsors/nugs.png', 
    website: 'https://nugs.net',
    description: 'High-quality live music streaming and downloads',
    category: 'music',
    prizeTypes: ['Premium Subscriptions', 'Exclusive Recordings', 'Vinyl Releases'],
    isActive: true
  },
  {
    id: 'celsius',
    name: 'Celsius',
    logo: '/sponsors/celsius.png',
    website: 'https://celsius.com',
    description: 'Essential energy drink for festival season',
    category: 'wellness',
    prizeTypes: ['Energy Drink Cases', 'Festival Survival Kits', 'Merch Bundles'],
    isActive: true
  },
  {
    id: 'livenation',
    name: 'Live Nation',
    logo: '/sponsors/livenation.png',
    website: 'https://livenation.com',
    description: 'The world\'s leading live entertainment company',
    category: 'events',
    prizeTypes: ['Concert Tickets', 'Festival Passes', 'VIP Packages'],
    isActive: true
  },
  {
    id: 'cosmic-cannabis',
    name: 'Cosmic Cannabis Co.',
    logo: '/sponsors/cosmic-cannabis.png',
    website: 'https://cosmic-cannabis.com',
    description: 'Premium cannabis products for elevated experiences',
    category: 'cannabis',
    prizeTypes: ['Product Bundles', 'Dispensary Gift Cards', 'Smoking Accessories'],
    isActive: true
  },
  {
    id: 'mystic-mycelium',
    name: 'Mystic Mycelium',
    logo: '/sponsors/mystic-mycelium.png',
    website: 'https://mystic-mycelium.com',
    description: 'Functional mushroom supplements for mind and body wellness',
    category: 'mushrooms',
    prizeTypes: ['Supplement Bundles', 'Wellness Packages', 'Educational Materials'],
    isActive: true
  },
  {
    id: 'terrapin-threads',
    name: 'Terrapin Threads',
    logo: '/sponsors/terrapin-threads.png',
    website: 'https://terrapin-threads.com',
    description: 'Handcrafted Dead-inspired apparel and accessories',
    category: 'lifestyle',
    prizeTypes: ['Tie-Dye Clothing', 'Patches & Pins', 'Custom Merch'],
    isActive: true
  }
];

// Realistic Charity Data  
export const CHARITIES: Charity[] = [
  {
    id: 'headcount',
    name: 'HeadCount',
    logo: '/charities/headcount.png',
    website: 'https://headcount.org',
    description: 'Promoting participation in democracy through music',
    mission: 'Register voters and promote civic engagement at concerts and festivals',
    deadCoConnection: 'Official nonprofit partner of Dead & Company tours since 2015',
    totalRaised: 47500,
    isActive: true
  },
  {
    id: 'music-climate-revolution',
    name: 'Music Climate Revolution',
    logo: '/charities/music-climate.png',
    website: 'https://musicclimaterevolution.org',
    description: 'Mobilizing the music community for climate action',
    mission: 'Unite musicians and fans to address the climate crisis through collective action',
    deadCoConnection: 'Partnered with Dead & Company for carbon-neutral touring initiatives',
    totalRaised: 32100,
    isActive: true
  },
  {
    id: 'reverb',
    name: 'Reverb.org',
    logo: '/charities/reverb.png',
    website: 'https://reverb.org',
    description: 'Greening the music industry one concert at a time',
    mission: 'Reduce environmental impact of tours and empower fans to take action',
    deadCoConnection: 'Long-time sustainability partner helping green Dead & Company tours',
    totalRaised: 58900,
    isActive: true
  },
  {
    id: 'sweet-relief',
    name: 'Sweet Relief Musicians Fund',
    logo: '/charities/sweet-relief.png',
    website: 'https://sweetrelief.org',
    description: 'Financial assistance for musicians in crisis',
    mission: 'Provide emergency financial assistance to career musicians and their families',
    deadCoConnection: 'Supported by Grateful Dead family and Dead & Company community',
    totalRaised: 23750,
    isActive: true
  },
  {
    id: 'docs-playing-for-change',
    name: 'Docs Playing for Change',
    logo: '/charities/docs-playing.png',
    website: 'https://docsplayingforchange.org',
    description: 'Healthcare for musicians and music industry workers',
    mission: 'Provide medical and mental health services to touring musicians',
    deadCoConnection: 'Founded by Dead & Company tour physician Dr. Dave Janssen',
    totalRaised: 15200,
    isActive: true
  }
];

// Mock Leaderboard Data
export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: 'user-1',
    username: 'DeadHeadDave',
    avatar: '/avatars/user1.png',
    rank: 1,
    score: 2847,
    gamesPlayed: 156,
    winRate: 23.1,
    totalWinnings: 1250,
    favoriteMode: 'cash',
    achievements: ['🏆 Trivia Master', '🎯 Bingo Legend', '💎 Rare Song Prophet'],
    lastActive: '2 hours ago'
  },
  {
    id: 'user-2', 
    username: 'SugarMagnolia42',
    avatar: '/avatars/user2.png',
    rank: 2,
    score: 2653,
    gamesPlayed: 134,
    winRate: 19.7,
    totalWinnings: 890,
    favoriteMode: 'charity',
    achievements: ['❤️ Charity Champion', '🎵 Setlist Sage', '🔥 Hot Streak'],
    lastActive: '1 day ago'
  },
  {
    id: 'user-3',
    username: 'TerrapinStation',
    avatar: '/avatars/user3.png', 
    rank: 3,
    score: 2541,
    gamesPlayed: 198,
    winRate: 15.2,
    totalWinnings: 650,
    favoriteMode: 'prize',
    achievements: ['🎪 Consistent Player', '🎤 Opener Oracle', '📊 Data Wizard'],
    lastActive: '3 hours ago'
  },
  {
    id: 'user-4',
    username: 'FireOnTheMountain',
    avatar: '/avatars/user4.png',
    rank: 4,
    score: 2398,
    gamesPlayed: 89,
    winRate: 27.0,
    totalWinnings: 1850,
    favoriteMode: 'cash',
    achievements: ['💰 High Roller', '🦄 Unicorn Hunter', '⚡ Lightning Round'],
    lastActive: '5 minutes ago'
  },
  {
    id: 'user-5',
    username: 'ChinaCatSunflower',
    avatar: '/avatars/user5.png',
    rank: 5,
    score: 2287,
    gamesPlayed: 167,
    winRate: 14.4,
    totalWinnings: 420,
    favoriteMode: 'charity',
    achievements: ['🌱 Green Goddess', '🎨 Creative Predictor', '🤝 Community Builder'],
    lastActive: '45 minutes ago'
  }
];

// Recent Game Results
export const RECENT_GAMES: GameResult[] = [
  {
    id: 'game-1',
    gameType: 'bingo',
    mode: 'cash',
    date: '2025-01-18',
    venue: 'Madison Square Garden',
    winners: [LEADERBOARD_DATA[0]],
    prize: 750,
    participants: 234,
    sponsor: 'cashortrade'
  },
  {
    id: 'game-2',
    gameType: 'opener',
    mode: 'charity',
    date: '2025-01-17',
    venue: 'The Forum',
    winners: [LEADERBOARD_DATA[1]],
    prize: 500,
    charity: 'headcount',
    participants: 156
  },
  {
    id: 'game-3',
    gameType: 'setlist',
    mode: 'prize',
    date: '2025-01-16',
    venue: 'Wrigley Field',
    winners: [LEADERBOARD_DATA[2]],
    prize: 'Nugs.net Premium Subscription + Vinyl Bundle',
    sponsor: 'nugs',
    participants: 189
  }
];

// Helper Functions
export function getSponsorById(id: string): Sponsor | undefined {
  return SPONSORS.find(sponsor => sponsor.id === id);
}

export function getCharityById(id: string): Charity | undefined {
  return CHARITIES.find(charity => charity.id === id);
}

export function getTopPlayers(count: number = 10): LeaderboardEntry[] {
  return LEADERBOARD_DATA.slice(0, count);
}

export function getPlayersByMode(mode: 'prize' | 'cash' | 'charity'): LeaderboardEntry[] {
  return LEADERBOARD_DATA.filter(player => player.favoriteMode === mode)
    .sort((a, b) => b.score - a.score);
}

export function getTotalCharityRaised(): number {
  return CHARITIES.reduce((total, charity) => total + charity.totalRaised, 0);
}

export function getActiveSponsorsByCategory(category?: string): Sponsor[] {
  const active = SPONSORS.filter(sponsor => sponsor.isActive);
  return category ? active.filter(sponsor => sponsor.category === category) : active;
} 