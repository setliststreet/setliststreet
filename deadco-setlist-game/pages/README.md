# 📄 Pages Directory

This directory contains all Next.js pages using file-based routing. Each `.tsx` file automatically becomes a route in the application.

## 🗂️ Page Structure

### 🏠 Core Pages

#### `index.tsx` - Homepage
**Route**: `/`
**Purpose**: Main landing page with game selection
**Features**:
- Hero section with GD60 anniversary message
- Game selection grid (5 main games)
- Tools & Results section
- Countdown timer to show deadlines
- Show schedule display

#### `about.tsx` & `about-this-app.tsx`
**Routes**: `/about`, `/about-this-app`
**Purpose**: Information about the platform and creator
**Features**:
- Project origin story
- Creator background
- Vision for future expansion

#### `faq.tsx`
**Route**: `/faq`
**Purpose**: Frequently asked questions
**Features**:
- Expandable question sections
- Game rules and scoring
- Payment and prize information
- Technical support

#### `rules.tsx`
**Route**: `/rules`
**Purpose**: Complete game rules and instructions
**Features**:
- Quick start guide
- Detailed rules for each game type
- Scoring systems
- Strategy tips

### 🎮 Game Pages

#### Song Prediction Games
- `guess-opener.tsx` - **Route**: `/guess-opener`
- `guess-encore.tsx` - **Route**: `/guess-encore`
- `guess-bust-out.tsx` - **Route**: `/guess-bust-out`
- `guess-set1-closer.tsx` - **Route**: `/guess-set1-closer`
- `guess-set2-opener.tsx` - **Route**: `/guess-set2-opener`
- `guess-set2-closer.tsx` - **Route**: `/guess-set2-closer`
- `guess-pre-drums-song.tsx` - **Route**: `/guess-pre-drums-song`
- `guess-post-drums-song.tsx` - **Route**: `/guess-post-drums-song`

**Common Features**:
- Show selection
- Song selection interface
- Strategy hints and statistics
- FourWaysToPlay payment component
- Deadline countdown

#### `setlist-bingo.tsx`
**Route**: `/setlist-bingo`
**Purpose**: 5x5 bingo card creation and play
**Features**:
- 3-column layout: songs | bingo board | hints
- Drag-and-drop song selection
- Win condition explanations
- Real-time bingo validation

#### `setlist-builder.tsx`
**Route**: `/setlist-builder`
**Purpose**: Fantasy setlist creation
**Features**:
- 3-column layout: songs | setlist sections | hints
- Set 1, Set 2 (before/after Drums), Encore sections
- Comprehensive song list with probabilities
- Play mode selection

#### Timing Games
- `guess-start-time.tsx` - **Route**: `/guess-start-time`
- `guess-end-time.tsx` - **Route**: `/guess-end-time`
- `guess-set-break-length.tsx` - **Route**: `/guess-set-break-length`

**Features**:
- Time prediction interfaces
- Historical timing data
- Venue-specific insights

#### `guess-next-song.tsx`
**Route**: `/guess-next-song`
**Purpose**: Live show real-time predictions
**Features**:
- Live show status indicator
- Real-time song prediction
- Community voting display
- Live updates during shows

### 🎯 Hub Pages

#### `song-games.tsx`
**Route**: `/song-games`
**Purpose**: Collection of all song prediction games
**Features**:
- Games organized by setlist structure (Set 1, Set 2, Encore)
- Horizontal layout for games within each section
- Player counts and difficulty indicators

#### `timing-games.tsx`
**Route**: `/timing-games`
**Purpose**: Collection of timing prediction games
**Features**:
- Show timing predictions
- Historical averages
- Venue considerations

### 📊 Results & Data Pages

#### `view-results.tsx`
**Route**: `/view-results`
**Purpose**: Game results and leaderboards
**Features**:
- Show selection
- Game-specific leaderboards
- Play type indicators (fun/cash/charity/prize)
- Mock leaderboard data

#### `guess-song-results.tsx`
**Route**: `/guess-song-results`
**Purpose**: Specific song prediction results
**Features**:
- Game type selection
- Detailed scoring breakdown
- Winner announcements

#### `setlist-bingo-results.tsx`
**Route**: `/setlist-bingo-results`
**Purpose**: Bingo game results
**Features**:
- Winning board displays
- Completion times
- Prize distributions

#### `setlist-builder-results.tsx`
**Route**: `/setlist-builder-results`
**Purpose**: Fantasy setlist results
**Features**:
- Accuracy scoring
- Position-by-position breakdown
- Bonus points calculation

#### `setlist-hints.tsx`
**Route**: `/setlist-hints`
**Purpose**: Statistical insights and data
**Features**:
- Song probabilities
- Historical patterns
- AI-powered insights
- Venue-specific data

### 🔐 User Pages

#### `login.tsx`
**Route**: `/login`
**Purpose**: User authentication
**Features**:
- Login form
- Password reset
- Social login options (ready for implementation)

#### `register.tsx` & `sign-up.tsx`
**Routes**: `/register`, `/sign-up`
**Purpose**: User registration
**Features**:
- Account creation form
- Payment method setup
- Charity selection
- Terms acceptance

### 📋 Legal & Info Pages

#### `terms.tsx` & `terms-of-service.tsx`
**Routes**: `/terms`, `/terms-of-service`
**Purpose**: Legal terms and conditions
**Features**:
- Comprehensive terms
- User responsibilities
- Game rules compliance
- No affiliation disclaimers

#### `privacy.tsx`
**Route**: `/privacy`
**Purpose**: Privacy policy
**Features**:
- Data collection practices
- User privacy rights
- Cookie policies

#### `legal.tsx`
**Route**: `/legal`
**Purpose**: Legal disclaimers
**Features**:
- Copyright notices
- Liability limitations
- Fan project disclaimers

### 💰 Business Pages

#### `sponsor.tsx`
**Route**: `/sponsor`
**Purpose**: Sponsorship opportunities
**Features**:
- Sponsorship packages
- Contact forms
- Partnership options
- Pricing information

### 🧪 Test Pages

#### `test-*.tsx` Pages
**Routes**: `/test-bingo`, `/test-dragdrop`, `/test-ipod`, etc.
**Purpose**: Component testing and development
**Features**:
- Isolated component testing
- UI experimentation
- Development utilities

### 🗃️ Dynamic Routes

#### `game/[id].tsx`
**Route**: `/game/[id]`
**Purpose**: Dynamic game pages with URL parameters
**Features**:
- Game ID-based routing
- Dynamic content loading
- Voting statistics
- Payment integration

#### `results/[id].tsx`
**Route**: `/results/[id]`
**Purpose**: Dynamic results pages
**Features**:
- Result ID-based routing
- Scoring details
- Payout information

## 🔧 Page Development Patterns

### Standard Page Structure
```typescript
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';

export default function GamePage() {
  const [gameState, setGameState] = useState();

  return (
    <MainLayout>
      <Head>
        <title>Game Title - Setlist Street</title>
        <meta name="description" content="Game description" />
      </Head>

      {/* Page content */}
      
      <FourWaysToPlay 
        onSubmissionClick={handleSubmission}
        gameType="game type"
        disabled={!readyToSubmit}
      />
    </MainLayout>
  );
}
```

### Common Patterns

#### State Management
```typescript
// Game selection
const [selectedShow, setSelectedShow] = useState<number>(1);
const [selectedSong, setSelectedSong] = useState<string>('');

// UI state
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [submitted, setSubmitted] = useState<boolean>(false);
```

#### Data Fetching
```typescript
useEffect(() => {
  // Mock data loading
  const loadGameData = async () => {
    setIsLoading(true);
    try {
      // Fetch game data
      setGameData(data);
    } catch (err) {
      setError('Failed to load game data');
    } finally {
      setIsLoading(false);
    }
  };
  
  loadGameData();
}, [gameId]);
```

#### Form Handling
```typescript
const handleSubmission = (playMode: string, amount?: number) => {
  console.log('Submitting:', { selection, playMode, amount });
  // Process submission
  setSubmitted(true);
};
```

## 📱 Responsive Design

### Layout Patterns
- **Mobile**: Single column, stacked sections
- **Tablet**: 2-column grids, side-by-side content
- **Desktop**: 3-column layouts, horizontal navigation

### Common Grid Layouts
```typescript
// Game selection grids
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

// 3-column game layouts (bingo, setlist builder)
<div className="grid grid-cols-7 gap-8">
  <div className="col-span-2">Songs</div>
  <div className="col-span-3">Game Board</div>
  <div className="col-span-2">Hints</div>
</div>
```

## 🚀 Performance Optimization

### Static Generation
Most pages use Static Site Generation (SSG) for optimal performance:
```typescript
// Pages are pre-rendered at build time
export async function getStaticProps() {
  return {
    props: {
      // Static data
    }
  };
}
```

### SEO Optimization
```typescript
// Every page includes proper meta tags
<Head>
  <title>Specific Page Title - Setlist Street</title>
  <meta name="description" content="Detailed page description" />
  <meta property="og:title" content="Social sharing title" />
</Head>
```

## 🔗 Navigation Flow

### User Journey
1. **Homepage** → Game selection
2. **Game Pages** → Play and submit
3. **Results Pages** → View outcomes
4. **Info Pages** → Learn rules and FAQ

### Internal Linking
```typescript
import Link from 'next/link';

<Link href="/guess-opener" className="game-link">
  Guess the Opener
</Link>
```

---

## 🤝 Contributing to Pages

1. **Follow Patterns**: Use existing pages as templates
2. **SEO First**: Include proper Head tags
3. **MainLayout**: Wrap content in MainLayout
4. **Responsive**: Test on all screen sizes
5. **Performance**: Optimize images and data loading

**Check the main README for bounty opportunities on page improvements!** 