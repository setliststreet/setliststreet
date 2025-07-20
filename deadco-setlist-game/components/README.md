# 🧩 Components Library

This directory contains all reusable React components for Setlist Street. Each component is built with TypeScript, Tailwind CSS, and follows consistent patterns.

## 📋 Component Overview

### 🔧 Layout Components

#### `MainLayout.tsx`
**Purpose**: Global layout wrapper for all pages
```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}
```
**Features**:
- Consistent header and footer
- Content width constraints and padding
- Optional page title and description
- Responsive design

#### `Header.tsx`
**Purpose**: Site-wide navigation
**Features**:
- Logo and brand link
- Responsive navigation (desktop/mobile)
- FAQ, Sign In, Sign Up links
- Mobile hamburger menu
- High z-index for overlay protection

#### `Footer.tsx`
**Purpose**: Site footer with sponsor placeholders
**Features**:
- Sponsor logo placeholders (left/right)
- Navigation links (center)
- Copyright information
- Horizontal layout on all screen sizes

### 🎮 Game Components

#### `FourWaysToPlay.tsx`
**Purpose**: Standardized payment mode selection
```typescript
interface FourWaysToPlayProps {
  onSubmissionClick: (playMode: string, amount?: number) => void;
  gameType?: string;
  disabled?: boolean;
}
```
**Features**:
- Four play modes: Fun, Charity, Cash, Prize
- Amount selection for charity/cash modes
- Auto-submit functionality
- Disabled state when prerequisites not met
- Responsive 4-column grid

#### `SetlistDragDropPicker.tsx`
**Purpose**: Drag-and-drop song selection interface
**Features**:
- Available songs list (scrollable)
- Drag-and-drop functionality
- Setlist building with multiple sections
- Song removal and reordering
- Visual feedback for drag states

### 🎯 Bingo Components (`BingoBoard/`)

#### `MultipleBingoBoards.tsx`
**Purpose**: Manage multiple bingo boards
**Features**:
- Create multiple bingo cards
- Board completion tracking
- Score calculation
- Board management UI

#### `AddBoardButton.tsx`
**Purpose**: UI for adding new bingo boards
**Features**:
- Add board functionality
- Limit maximum boards
- Visual feedback

### 🎵 Game-Specific Components

#### `BingoBoardBuilder.tsx`
**Purpose**: Single bingo board creation
**Features**:
- 5x5 grid layout
- Song selection per square
- Visual song arrangement
- Winning condition highlights

#### `SongPicker.tsx`
**Purpose**: Single song selection interface
**Features**:
- Searchable song list
- Song statistics display
- Selection confirmation
- Probability information

#### `iPodSongPicker.tsx`
**Purpose**: iPod-style circular song selector
**Features**:
- Circular scroll interface
- Nostalgic iPod design
- Touch/mouse interactions
- Visual song browsing

**🎯 BOUNTY OPPORTUNITY ($30+)**: This component needs enhancement!
- Current implementation is basic
- Needs smooth animations and better UX
- Touch/gesture support for mobile
- Visual feedback and selection states
- Integration with all song guessing games

#### `SpinWheelSongPicker.tsx`
**Purpose**: Spinning wheel song selection
**Features**:
- Animated wheel spinner
- Random song selection
- Visual spinning effects
- Result announcement

### 📊 Data Components

#### `Leaderboard.tsx`
**Purpose**: Display game rankings
**Features**:
- Sortable player rankings
- Multiple game type support
- Play mode indicators (fun/cash/charity/prize)
- Responsive table layout

#### `ShowSelector.tsx`
**Purpose**: Show date selection
**Features**:
- Multiple show selection
- Date formatting
- Selection highlighting
- Deadline information

#### `SongSlotPicker.tsx`
**Purpose**: Position-specific song selection
**Features**:
- Setlist position awareness
- Song probability by position
- Visual position indicators
- Smart suggestions

### 🎨 UI Components

#### `PaymentButton.tsx`
**Purpose**: Payment processing interface
**Features**:
- Stripe integration ready
- Amount display
- Loading states
- Success/error handling

#### `GameModeCard.tsx` & `GameModeCards.tsx`
**Purpose**: Game selection interface
**Features**:
- Game preview cards
- Hover effects and transitions
- Category grouping
- Player count display

### 🧪 Test Components

#### `SetlistTrivia.tsx`
**Purpose**: Trivia game component
**Features**:
- Question/answer interface
- Score tracking
- Timer functionality
- Multiple choice support

## 🎨 Styling Conventions

### Tailwind Classes
```typescript
// Standard component styling pattern
const baseClasses = "bg-white rounded-lg shadow-lg p-6";
const interactiveClasses = "hover:shadow-xl transition-all duration-300";
const responsiveClasses = "w-full md:w-1/2 lg:w-1/3";
```

### Color Scheme
- **Primary**: `purple-600`, `purple-700`
- **Success**: `green-600`, `green-50`
- **Error**: `red-600`, `red-50`
- **Neutral**: `gray-800`, `gray-600`, `gray-200`

### Typography
- **Headings**: `font-bold text-xl md:text-2xl lg:text-3xl`
- **Body**: `text-gray-600 text-sm md:text-base`
- **Labels**: `font-semibold text-gray-800`

## 🔧 Development Patterns

### Props Interface
```typescript
// Always define clear prop interfaces
interface ComponentProps {
  required: string;
  optional?: boolean;
  callback?: (value: string) => void;
  children?: React.ReactNode;
}
```

### State Management
```typescript
// Use descriptive state names
const [selectedSong, setSelectedSong] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

### Event Handlers
```typescript
// Clear, purposeful event handlers
const handleSongSelection = (songId: string) => {
  setSelectedSong(songId);
  onSongSelect?.(songId);
};

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await onSubmit(selectedSong);
  } catch (err) {
    setError('Submission failed');
  } finally {
    setIsLoading(false);
  }
};
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile
- **sm**: 640px+ (large phones)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (desktops)
- **xl**: 1280px+ (large screens)

### Component Responsiveness
```typescript
// Grid layouts that adapt
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Text that scales
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Spacing that adjusts
<div className="p-4 md:p-6 lg:p-8">
```

## 🔗 Component Dependencies

### External Libraries
- **React DnD**: Drag and drop functionality
- **Framer Motion**: Animations and transitions
- **Next.js**: Router and Link components

### Internal Dependencies
- **Theme**: `../theme/SetlistStreetTheme.ts`
- **Utils**: `../utils/` for helper functions
- **Data**: `../lib/data/` for static data

## 🚀 Creating New Components

### Component Template
```typescript
import React, { useState } from 'react';

interface NewComponentProps {
  prop: string;
  optional?: boolean;
}

export default function NewComponent({ prop, optional = false }: NewComponentProps) {
  const [state, setState] = useState<string>('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">{prop}</h2>
      {/* Component content */}
    </div>
  );
}
```

### File Organization
- **One component per file**
- **PascalCase file names**
- **Co-locate related components in subdirectories**
- **Export default from each file**

---

## 🤝 Contributing to Components

1. **Follow Patterns**: Use existing components as templates
2. **TypeScript**: Always type your props and state
3. **Responsive**: Test on mobile, tablet, desktop
4. **Accessibility**: Include ARIA labels where needed
5. **Performance**: Avoid unnecessary re-renders

**Need help? Check the main README for bounty opportunities!** 