# 🔧 Scripts Directory

This directory contains utility scripts for data processing, database seeding, and development tasks for Setlist Street.

## 📁 Script Overview

### 📊 Data Processing Scripts

#### `formatcsv.py`
**Purpose**: Process and clean raw setlist CSV data
**Language**: Python
**Functionality**:
- Clean inconsistent song names
- Standardize venue names
- Format dates consistently
- Remove duplicates and errors
- Export clean CSV for import

**Usage**:
```bash
python formatcsv.py input_file.csv output_file.csv
```

**Features**:
- Song name normalization
- Date format standardization
- Venue name cleanup
- Error detection and reporting
- Data validation checks

#### `dead_and_co_setlists.csv`
**Purpose**: Processed Dead & Company setlist data
**Contents**: Historical show data in clean, standardized format
**Fields**:
- Date (YYYY-MM-DD)
- Venue
- City, State
- Set 1 songs (pipe-separated)
- Set 2 songs before Drums/Space
- Set 2 songs after Drums/Space
- Encore songs
- Special notes

### 🗄️ Database Scripts

#### `seedGames.ts`
**Purpose**: Populate database with initial game data
**Language**: TypeScript/Node.js
**Functionality**:
- Create game configurations
- Set up initial contests
- Populate song catalog
- Generate test users
- Create sample predictions

**Usage**:
```bash
npm run seed
# or
npx ts-node scripts/seedGames.ts
```

**Features**:
```typescript
// Example game seeding
const seedGames = async () => {
  // Create games for each show
  const shows = [
    { date: '2025-08-01', venue: 'Golden Gate Park' },
    { date: '2025-08-02', venue: 'Golden Gate Park' },
    { date: '2025-08-03', venue: 'Golden Gate Park' }
  ];
  
  for (const show of shows) {
    await createGameSet(show);
  }
};

const createGameSet = async (show: Show) => {
  const gameTypes = [
    'guess-opener',
    'guess-encore', 
    'guess-bust-out',
    'setlist-bingo',
    'setlist-builder'
  ];
  
  for (const gameType of gameTypes) {
    await supabase.from('games').insert({
      type: gameType,
      show_date: show.date,
      venue: show.venue,
      is_open: true,
      entry_fee: 0
    });
  }
};
```

## 🔄 Data Processing Workflows

### **CSV Processing Pipeline**
```python
# formatcsv.py workflow
import pandas as pd
import re
from datetime import datetime

def clean_song_names(song_list):
    """Standardize song name variations"""
    cleaned = []
    for song in song_list:
        # Remove extra whitespace
        song = song.strip()
        
        # Standardize common variations
        replacements = {
            'Sugar Magnolia': ['Sugar Mag', 'Sugar Mags'],
            'Truckin\'': ['Truckin', 'Trucking'],
            'I Know You Rider': ['IKYR', 'I Know You Rider'],
            # Add more standardizations
        }
        
        for standard, variations in replacements.items():
            if song in variations:
                song = standard
                
        cleaned.append(song)
    return cleaned

def process_setlist_csv(input_file, output_file):
    """Main processing function"""
    df = pd.read_csv(input_file)
    
    # Clean dates
    df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
    
    # Clean song lists
    df['set1'] = df['set1'].apply(lambda x: clean_song_names(x.split('|')))
    df['set2_before'] = df['set2_before'].apply(lambda x: clean_song_names(x.split('|')))
    
    # Validate data
    df = validate_setlist_data(df)
    
    # Export cleaned data
    df.to_csv(output_file, index=False)
```

### **Database Seeding Workflow**
```typescript
// seedGames.ts implementation
import { supabase } from '../utils/supabaseClient';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

interface SetlistRow {
  date: string;
  venue: string;
  set1: string;
  set2_before: string;
  set2_after: string;
  encore: string;
}

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');
  
  // 1. Seed song catalog
  await seedSongs();
  
  // 2. Seed venues
  await seedVenues();
  
  // 3. Seed games
  await seedGames();
  
  // 4. Seed sample users (for testing)
  await seedTestUsers();
  
  console.log('✅ Database seeding complete!');
};

const seedSongs = async () => {
  const csvData = readFileSync('./scripts/dead_and_co_setlists.csv', 'utf-8');
  const rows: SetlistRow[] = parse(csvData, { 
    columns: true, 
    skip_empty_lines: true 
  });
  
  // Extract unique songs
  const allSongs = new Set<string>();
  
  rows.forEach(row => {
    [row.set1, row.set2_before, row.set2_after, row.encore]
      .forEach(songList => {
        if (songList) {
          songList.split('|').forEach(song => {
            if (song.trim()) allSongs.add(song.trim());
          });
        }
      });
  });
  
  // Insert songs into database
  const songData = Array.from(allSongs).map(name => ({
    name,
    artist: 'Dead & Company',
    created_at: new Date().toISOString()
  }));
  
  const { error } = await supabase
    .from('songs')
    .insert(songData);
    
  if (error) {
    console.error('Error seeding songs:', error);
  } else {
    console.log(`✅ Seeded ${songData.length} songs`);
  }
};
```

## 🧮 Statistical Analysis Scripts

### **Probability Calculator**
```typescript
// calculateProbabilities.ts
interface SongStats {
  name: string;
  totalPlays: number;
  openerCount: number;
  encoreCount: number;
  set1CloserCount: number;
  positionFrequency: Record<number, number>;
}

const calculateSongProbabilities = async () => {
  const setlists = await loadSetlistData();
  const songStats: Record<string, SongStats> = {};
  
  setlists.forEach(setlist => {
    // Process Set 1
    setlist.set1.forEach((song, index) => {
      if (!songStats[song]) {
        songStats[song] = {
          name: song,
          totalPlays: 0,
          openerCount: 0,
          encoreCount: 0,
          set1CloserCount: 0,
          positionFrequency: {}
        };
      }
      
      songStats[song].totalPlays++;
      
      if (index === 0) songStats[song].openerCount++;
      if (index === setlist.set1.length - 1) songStats[song].set1CloserCount++;
      
      songStats[song].positionFrequency[index] = 
        (songStats[song].positionFrequency[index] || 0) + 1;
    });
    
    // Process encore
    setlist.encore.forEach(song => {
      if (songStats[song]) {
        songStats[song].encoreCount++;
      }
    });
  });
  
  // Convert to probabilities
  const probabilities = Object.values(songStats).map(stats => ({
    ...stats,
    openerProbability: stats.openerCount / setlists.length,
    encoreProbability: stats.encoreCount / setlists.length,
    averagePosition: Object.entries(stats.positionFrequency)
      .reduce((sum, [pos, count]) => sum + (parseInt(pos) * count), 0) / stats.totalPlays
  }));
  
  return probabilities;
};
```

## 🔧 Development Utilities

### **Test Data Generator**
```typescript
// generateTestData.ts
const generateMockUsers = (count: number) => {
  const usernames = [
    'DeadHead42', 'GratefulFan88', 'TerrapinTunes',
    'TouchOfGrey', 'SugarMagnolia', 'UncleJohns'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    username: `${usernames[i % usernames.length]}${i}`,
    email: `user${i}@example.com`,
    created_at: new Date().toISOString(),
    total_games: Math.floor(Math.random() * 50),
    total_wins: Math.floor(Math.random() * 10)
  }));
};

const generateMockPredictions = (gameId: string, userCount: number) => {
  const songs = ['Touch of Grey', 'Sugar Magnolia', 'Truckin\'', 'Ripple'];
  
  return Array.from({ length: userCount }, (_, i) => ({
    user_id: `user_${i}`,
    game_id: gameId,
    guesses: JSON.stringify([songs[Math.floor(Math.random() * songs.length)]]),
    score: null,
    created_at: new Date().toISOString()
  }));
};
```

### **Database Reset Script**
```typescript
// resetDatabase.ts
const resetDatabase = async () => {
  console.log('🗑️ Resetting database...');
  
  // Clear all tables in correct order (respect foreign keys)
  await supabase.from('entries').delete().neq('id', '');
  await supabase.from('games').delete().neq('id', '');
  await supabase.from('users').delete().neq('id', '');
  await supabase.from('songs').delete().neq('id', '');
  await supabase.from('venues').delete().neq('id', '');
  
  console.log('✅ Database reset complete');
};
```

## 📈 Analytics Scripts

### **Performance Analyzer**
```typescript
// analyzePerformance.ts
const analyzeGamePerformance = async () => {
  const games = await supabase.from('games').select('*');
  const entries = await supabase.from('entries').select('*');
  
  const analytics = {
    totalGames: games.data?.length || 0,
    totalEntries: entries.data?.length || 0,
    averageEntriesPerGame: (entries.data?.length || 0) / (games.data?.length || 1),
    gameTypePopularity: calculateGameTypePopularity(entries.data || []),
    userEngagement: calculateUserEngagement(entries.data || [])
  };
  
  console.log('📊 Game Performance Analytics:', analytics);
  return analytics;
};
```

## 🚀 Deployment Scripts

### **Build Preparation**
```bash
#!/bin/bash
# build-prep.sh

echo "🏗️ Preparing production build..."

# Clean previous builds
rm -rf .next
rm -rf out

# Install dependencies
npm ci

# Run data processing
python scripts/formatcsv.py

# Seed production database
npm run seed:prod

# Build application
npm run build

echo "✅ Build preparation complete!"
```

### **Environment Setup**
```typescript
// setupEnvironment.ts
const setupEnvironment = async (env: 'development' | 'production') => {
  const envVars = {
    development: {
      NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'dev-key'
    },
    production: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.PROD_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.PROD_SUPABASE_ANON_KEY
    }
  };
  
  // Validate required environment variables
  const required = envVars[env];
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
  
  console.log(`✅ Environment setup complete for ${env}`);
};
```

## 📋 Script Usage

### **Common Commands**
```bash
# Data processing
python scripts/formatcsv.py raw_data.csv clean_data.csv

# Database seeding
npm run seed
# or
npx ts-node scripts/seedGames.ts

# Reset database (development only)
npm run db:reset

# Generate test data
npm run generate:test-data

# Analyze performance
npm run analyze:performance
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "seed": "ts-node scripts/seedGames.ts",
    "db:reset": "ts-node scripts/resetDatabase.ts",
    "generate:test-data": "ts-node scripts/generateTestData.ts",
    "analyze:performance": "ts-node scripts/analyzePerformance.ts",
    "process:csv": "python scripts/formatcsv.py"
  }
}
```

---

## 🤝 Contributing to Scripts

### **Script Development Guidelines**
1. **Documentation**: Include clear usage instructions
2. **Error Handling**: Graceful error handling and recovery
3. **Logging**: Informative console output
4. **Validation**: Data validation before processing
5. **Testing**: Test with sample data first

### **Adding New Scripts**
1. Follow existing naming conventions
2. Include proper TypeScript/Python typing
3. Add to package.json scripts section
4. Document in this README
5. Test thoroughly before committing

**Check main README for data and tooling bounty opportunities!** 