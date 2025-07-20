# 🔧 Utils Directory

This directory contains helper functions, utilities, and configuration files that support the main application functionality.

## 📁 File Overview

### 🗄️ Database & API

#### `supabaseClient.ts`
**Purpose**: Database connection and configuration
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```
**Features**:
- Supabase client initialization
- Environment variable configuration
- Ready for backend integration
- Database queries and real-time subscriptions

**Usage Example**:
```typescript
// Fetch songs from database
const { data: songs, error } = await supabase
  .from('songs')
  .select('*')
  .order('name');

// Insert user prediction
const { error } = await supabase
  .from('entries')
  .insert([{ 
    user_id: userId, 
    game_id: gameId, 
    guesses: JSON.stringify(predictions) 
  }]);
```

### 📊 Data & Statistics

#### `songProbabilities.ts`
**Purpose**: Song probability calculations and statistics
**Features**:
- Historical song frequency data
- Probability calculations by position
- Venue-specific adjustments
- Rarity scoring algorithms

**Data Structure**:
```typescript
interface SongProbability {
  songId: string;
  name: string;
  overallFrequency: number;
  openerProbability: number;
  encoreProbability: number;
  setCloserProbability: number;
  venueHistory: VenueHistory[];
}
```

#### `leaderboardData.ts`
**Purpose**: Mock leaderboard data and ranking utilities
**Features**:
- Sample player rankings
- Score calculation examples
- Play type categorization
- Sorting and filtering functions

**Mock Data Structure**:
```typescript
interface LeaderboardEntry {
  username: string;
  score: number;
  playType: 'fun' | 'cash' | 'charity' | 'prize';
  position: number;
  gameType: string;
}
```

#### `triviaData.ts`
**Purpose**: Trivia questions and answers
**Features**:
- Dead & Company trivia questions
- Grateful Dead history questions
- Difficulty categorization
- Answer validation

## 🧮 Helper Functions

### Date & Time Utilities
```typescript
// Calculate time until deadline
export const getTimeUntilDeadline = (showDate: Date): string => {
  const deadline = new Date(showDate);
  deadline.setHours(19, 0, 0, 0); // 7:00 PM PT
  
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff <= 0) return 'Deadline passed';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
};
```

### Scoring Algorithms
```typescript
// Calculate setlist builder score
export const calculateSetlistScore = (
  predictions: string[], 
  actualSetlist: string[]
): number => {
  let score = 0;
  
  predictions.forEach((prediction, index) => {
    if (actualSetlist[index] === prediction) {
      score += 20; // Exact position match
    } else if (actualSetlist.includes(prediction)) {
      score += 10; // Song in setlist, wrong position
    }
  });
  
  return score;
};
```

### Data Formatting
```typescript
// Format song names for display
export const formatSongName = (songName: string): string => {
  return songName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format player statistics
export const formatPlayerStats = (player: Player): PlayerDisplay => {
  return {
    ...player,
    winRate: `${Math.round((player.wins / player.totalGames) * 100)}%`,
    averageScore: Math.round(player.totalScore / player.totalGames),
    formattedJoinDate: new Date(player.joinDate).toLocaleDateString()
  };
};
```

## 🔐 Environment Configuration

### Required Environment Variables
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Payments (when implemented)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret

# Optional
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Configuration Helper
```typescript
// config.ts
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  },
  app: {
    name: 'Setlist Street',
    version: '0.1.0',
    deadlineHour: 19, // 7 PM PT
  }
};
```

## 📈 Performance Utilities

### Memoization Helpers
```typescript
// Memoize expensive calculations
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Debounce user input
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};
```

### Local Storage Utilities
```typescript
// Safe localStorage operations
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};
```

## 🎯 Game Logic Utilities

### Validation Functions
```typescript
// Validate song selections
export const validateSongSelection = (
  songs: string[], 
  maxSongs: number
): ValidationResult => {
  if (songs.length === 0) {
    return { isValid: false, error: 'Please select at least one song' };
  }
  
  if (songs.length > maxSongs) {
    return { isValid: false, error: `Maximum ${maxSongs} songs allowed` };
  }
  
  const uniqueSongs = new Set(songs);
  if (uniqueSongs.size !== songs.length) {
    return { isValid: false, error: 'Duplicate songs not allowed' };
  }
  
  return { isValid: true, error: null };
};
```

### Probability Calculations
```typescript
// Calculate song probability by position
export const getSongProbabilityByPosition = (
  songId: string, 
  position: number, 
  setNumber: 1 | 2
): number => {
  const song = songDatabase.find(s => s.id === songId);
  if (!song) return 0;
  
  // Position-specific probability logic
  if (position === 0) return song.openerProbability;
  if (position === -1) return song.encoreProbability;
  
  // Set-specific adjustments
  const baseProb = song.overallProbability;
  const setModifier = setNumber === 1 ? song.set1Modifier : song.set2Modifier;
  
  return Math.min(baseProb * setModifier, 1.0);
};
```

## 🔄 API Integration Helpers

### Supabase Query Builders
```typescript
// User queries
export const userQueries = {
  async createUser(userData: CreateUserData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};

// Game queries
export const gameQueries = {
  async createEntry(entry: GameEntry) {
    const { data, error } = await supabase
      .from('entries')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getLeaderboard(gameId: string) {
    const { data, error } = await supabase
      .from('entries')
      .select(`
        *,
        users (username, display_name)
      `)
      .eq('game_id', gameId)
      .order('score', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  }
};
```

### 📡 **Setlist.fm API Integration ($25+ Bounty)**
```typescript
// setlistFmClient.ts - BOUNTY OPPORTUNITY
interface SetlistFmAPI {
  getArtistSetlists(artistId: string): Promise<Setlist[]>;
  getLiveSetlist(showId: string): Promise<LiveSetlist>;
  subscribeToLiveUpdates(showId: string, callback: (update: SetlistUpdate) => void): void;
}

// Live results verification
export const liveResultsQueries = {
  async verifyPredictions(gameId: string, actualSetlist: Setlist) {
    // Compare user predictions with actual setlist from setlist.fm
    // Update scores in real-time
    // Trigger winner notifications
  },
  
  async trackLiveShow(showId: string) {
    // Monitor setlist.fm for live updates
    // Push real-time updates to connected users
    // Handle song additions, corrections, timing
  }
};

// Example integration
const setupLiveTracking = (showDate: string) => {
  const setlistFmId = getSetlistFmShowId(showDate);
  
  // Subscribe to live updates
  setlistFmAPI.subscribeToLiveUpdates(setlistFmId, (update) => {
    // Process real-time setlist updates
    updateGameScores(update);
    notifyUsers(update);
    updateLeaderboards();
  });
};
```

## 🧪 Testing Utilities

### Mock Data Generators
```typescript
// Generate mock user data
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: `user_${Math.random().toString(36).substr(2, 9)}`,
  username: `DeadHead${Math.floor(Math.random() * 1000)}`,
  email: `user${Math.random()}@example.com`,
  createdAt: new Date().toISOString(),
  totalGames: Math.floor(Math.random() * 50),
  totalWins: Math.floor(Math.random() * 10),
  ...overrides
});

// Generate mock game entries
export const createMockEntries = (count: number): GameEntry[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `entry_${i}`,
    userId: `user_${i}`,
    gameId: 'mock_game',
    predictions: [`song_${i}`, `song_${i + 1}`],
    score: Math.floor(Math.random() * 100),
    createdAt: new Date().toISOString()
  }));
};
```

---

## 🤝 Contributing to Utils

1. **Pure Functions**: Keep utilities side-effect free when possible
2. **Error Handling**: Include proper error handling and edge cases
3. **Documentation**: Add JSDoc comments for complex functions
4. **Testing**: Include test cases for critical utilities
5. **Performance**: Consider memoization for expensive operations

**Check the main README for bounty opportunities!** 