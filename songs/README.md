# 🎵 Songs Directory

This directory contains song data, setlist information, and database schema for the Setlist Street application.

## 📁 Contents

### 📊 Data Files

#### `dead_and_co_setlists.csv`
**Purpose**: Historical Dead & Company setlist data
**Format**: CSV with show information and song sequences
**Fields**:
- Show date
- Venue information
- Set 1 songs
- Set 2 songs (before/after Drums & Space)
- Encore songs
- Song positions and transitions

**Usage**: 
- Generate song probability statistics
- Analyze historical patterns
- Populate probability algorithms
- Create realistic mock data

### 🗄️ Database Schema

#### `create_setlists_table.sql`
**Purpose**: Database table definitions for setlist data
**Tables**:
- `setlists` - Show and setlist information
- `songs` - Individual song catalog
- `setlist_songs` - Many-to-many relationship
- `venues` - Show locations
- `tours` - Tour information

**Schema Features**:
- Normalized song data
- Position tracking within sets
- Transition information (song segueing)
- Venue and tour relationships
- Metadata for analysis

## 📈 Data Analysis

### **Song Statistics**
```sql
-- Most frequently played songs
SELECT song_name, COUNT(*) as play_count
FROM setlist_songs 
JOIN songs ON setlist_songs.song_id = songs.id
GROUP BY song_name
ORDER BY play_count DESC;

-- Opener frequency
SELECT song_name, COUNT(*) as opener_count
FROM setlist_songs 
JOIN songs ON setlist_songs.song_id = songs.id
WHERE position = 1 AND set_number = 1
GROUP BY song_name
ORDER BY opener_count DESC;
```

### **Probability Calculations**
```typescript
// Song probability by position
interface SongStats {
  songId: string;
  name: string;
  totalPlays: number;
  openerCount: number;
  encoreCount: number;
  set1CloserCount: number;
  set2CloserCount: number;
  probabilityByPosition: Record<number, number>;
}

const calculateSongProbabilities = (setlists: Setlist[]): SongStats[] => {
  // Implementation would analyze historical data
  // to generate probability statistics for each song
};
```

## 🔄 Data Processing

### **CSV Import Process**
```typescript
// Convert CSV to structured data
const processSetlistData = async (csvFile: string) => {
  const rawData = await fs.readFile(csvFile, 'utf-8');
  const rows = csvData.split('\n').map(row => row.split(','));
  
  return rows.map(row => ({
    date: new Date(row[0]),
    venue: row[1],
    set1: row[2].split('|').filter(Boolean),
    set2Before: row[3].split('|').filter(Boolean),
    set2After: row[4].split('|').filter(Boolean),
    encore: row[5].split('|').filter(Boolean)
  }));
};
```

### **Database Population**
```sql
-- Insert processed setlist data
INSERT INTO setlists (date, venue_id, tour_id)
VALUES (?, ?, ?);

-- Insert individual songs
INSERT INTO setlist_songs (setlist_id, song_id, set_number, position, segueus_from, segueus_to)
VALUES (?, ?, ?, ?, ?, ?);
```

## 🎯 Song Catalog Features

### **Song Metadata**
```typescript
interface Song {
  id: string;
  name: string;
  originalArtist: 'Grateful Dead' | 'Dead & Company' | 'Cover';
  firstPlayed: Date;
  lastPlayed: Date;
  totalPlays: number;
  averagePosition: number;
  commonTransitions: string[]; // Songs often played before/after
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Bust Out';
  estimatedLength: number; // Minutes
  tags: string[]; // 'ballad', 'jam', 'reggae', etc.
}
```

### **Setlist Relationships**
```typescript
interface SetlistSong {
  setlistId: string;
  songId: string;
  setNumber: 1 | 2;
  position: number;
  isEncore: boolean;
  seguedFrom?: string; // Previous song ID if segued
  seguedTo?: string;   // Next song ID if segued
  estimatedStartTime?: Date;
  estimatedDuration?: number;
}
```

## 📊 Analysis Utilities

### **Pattern Recognition**
```typescript
// Identify common song pairings
const findCommonPairings = (setlists: Setlist[]) => {
  const pairings = new Map<string, number>();
  
  setlists.forEach(setlist => {
    setlist.songs.forEach((song, index) => {
      const nextSong = setlist.songs[index + 1];
      if (nextSong) {
        const pair = `${song}→${nextSong}`;
        pairings.set(pair, (pairings.get(pair) || 0) + 1);
      }
    });
  });
  
  return Array.from(pairings.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20); // Top 20 pairings
};

// Calculate venue-specific preferences
const getVenuePreferences = (venue: string, setlists: Setlist[]) => {
  const venueSets = setlists.filter(set => set.venue === venue);
  return calculateSongFrequencies(venueSets);
};
```

### **Probability Algorithms**
```typescript
// Position-based probability
const getPositionProbability = (
  song: string, 
  position: number, 
  setNumber: number
): number => {
  const historicalData = getHistoricalData(song);
  const positionPlays = historicalData.filter(
    play => play.position === position && play.setNumber === setNumber
  ).length;
  
  const totalPossiblePositions = historicalData.filter(
    play => play.setNumber === setNumber
  ).length;
  
  return positionPlays / totalPossiblePositions;
};

// Venue adjustment factor
const getVenueAdjustment = (song: string, venue: string): number => {
  const venueHistory = getVenueHistory(venue);
  const songPlaysAtVenue = venueHistory.filter(play => play.song === song).length;
  const totalSongPlays = getAllPlays(song).length;
  const venueShows = venueHistory.length;
  const totalShows = getAllShows().length;
  
  const venueFreq = songPlaysAtVenue / venueShows;
  const overallFreq = totalSongPlays / totalShows;
  
  return venueFreq / overallFreq; // >1 means more likely at this venue
};
```

## 🔧 Data Maintenance

### **Adding New Shows**
```typescript
// Process new setlist data
const addNewShow = async (showData: ShowData) => {
  const setlist = await createSetlist({
    date: showData.date,
    venue: showData.venue,
    songs: showData.songs
  });
  
  // Update probability calculations
  await recalculateProbabilities();
  
  // Update song statistics
  await updateSongStats();
};
```

### **Data Validation**
```typescript
// Validate setlist data integrity
const validateSetlistData = (setlist: Setlist): ValidationResult => {
  const errors: string[] = [];
  
  // Check for duplicate songs in same set
  const set1Songs = new Set(setlist.set1);
  if (set1Songs.size !== setlist.set1.length) {
    errors.push('Duplicate songs in Set 1');
  }
  
  // Validate song names against catalog
  const unknownSongs = setlist.getAllSongs().filter(
    song => !songCatalog.includes(song)
  );
  if (unknownSongs.length > 0) {
    errors.push(`Unknown songs: ${unknownSongs.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## 📈 Statistics Generation

### **Performance Metrics**
```typescript
// Generate comprehensive song statistics
const generateSongStats = (song: string) => {
  const plays = getAllPlays(song);
  
  return {
    totalPlays: plays.length,
    firstPlayed: Math.min(...plays.map(p => p.date)),
    lastPlayed: Math.max(...plays.map(p => p.date)),
    averagePosition: plays.reduce((sum, p) => sum + p.position, 0) / plays.length,
    openerPercentage: plays.filter(p => p.position === 1).length / plays.length * 100,
    encorePercentage: plays.filter(p => p.isEncore).length / plays.length * 100,
    venueBreakdown: groupBy(plays, 'venue'),
    yearBreakdown: groupBy(plays, p => new Date(p.date).getFullYear()),
    commonFollows: getCommonFollows(song),
    commonPrecedes: getCommonPrecedes(song)
  };
};
```

### **Trend Analysis**
```typescript
// Analyze song popularity trends over time
const analyzeTrends = (timeRange: DateRange) => {
  const setlists = getSetlistsInRange(timeRange);
  
  return {
    risingPopularity: getSongsWithIncreasingFrequency(setlists),
    decliningPopularity: getSongsWithDecreasingFrequency(setlists),
    bustOutCandidates: getUnplayedSongs(timeRange),
    newRotation: getNewSongs(timeRange),
    retiredSongs: getAbandonedSongs(timeRange)
  };
};
```

## 🚀 Integration with App

### **Game Logic Support**
The song data supports various game mechanics:
- **Probability Display**: Show likelihood percentages
- **Hint Generation**: Provide statistical insights
- **Validation**: Check predictions against historical patterns
- **Scoring**: Calculate accuracy based on actual likelihoods

### **Real-time Updates**
```typescript
// Update probabilities after each show
const updatePostShow = async (actualSetlist: Setlist) => {
  // Add new setlist to database
  await addSetlist(actualSetlist);
  
  // Recalculate all probabilities
  await recalculateProbabilities();
  
  // Update game predictions that were correct
  await scoreGamePredictions(actualSetlist);
  
  // Generate new statistics
  await generateUpdatedStats();
};
```

---

## 🤝 Contributing to Song Data

### **Data Quality Standards**
1. **Accuracy**: Verify setlists against official sources
2. **Completeness**: Include all songs and segues
3. **Consistency**: Use standardized song names
4. **Validation**: Check against known discrepancies

### **Adding Historical Data**
1. Source from reliable databases (setlist.fm, etc.)
2. Validate song names and spellings
3. Include venue and date information
4. Mark segues and transitions
5. Test probability calculations

**Check main README for data-related bounty opportunities!** 