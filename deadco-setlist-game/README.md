# 🎸 Setlist Street - Main Application

## Overview
This is the main Next.js application for Setlist Street, featuring 16+ prediction games for Grateful Dead 60th Anniversary concerts. Built with modern React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build & Deploy
```bash
# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📁 Project Structure

```
deadco-setlist-game/
├── components/              # Reusable React components
│   ├── Header.tsx          # Site navigation
│   ├── Footer.tsx          # Footer with sponsor placeholders
│   ├── MainLayout.tsx      # Global layout wrapper
│   ├── FourWaysToPlay.tsx  # Payment mode selection
│   └── BingoBoard/         # Bingo game components
├── pages/                  # Next.js pages (file-based routing)
│   ├── index.tsx           # Homepage with game selection
│   ├── guess-opener.tsx    # Song prediction games
│   ├── setlist-bingo.tsx   # Bingo board game
│   ├── setlist-builder.tsx # Fantasy setlist game
│   └── game/[id].tsx       # Dynamic game pages
├── utils/                  # Helper functions
│   ├── supabaseClient.ts   # Database connection (ready for backend)
│   ├── songProbabilities.ts # Song statistics
│   └── leaderboardData.ts  # Mock leaderboard data
├── styles/                 # CSS and styling
│   └── globals.css         # Global styles and theme
├── lib/data/               # Static data
│   ├── bands.ts            # Band information
│   └── games.ts            # Game configurations
└── theme/                  # Design system
    └── SetlistStreetTheme.ts # Theme configuration
```

## 🎮 Game Types

### 1. Song Prediction Games (`/song-games`)
- **Guess the Opener**: Predict first set opener
- **Guess the Encore**: Predict encore song(s)
- **Guess Bust Out**: Predict rare/never-played songs
- **Set Closers**: Predict set-ending songs
- **Pre/Post Drums**: Predict songs before/after Drums & Space

### 2. Setlist Bingo (`/setlist-bingo`)
- 5x5 bingo card with Dead & Company songs
- Win conditions: lines, columns, diagonals, four corners
- Drag-and-drop song selection

### 3. Fantasy Setlist (`/setlist-builder`)
- Build complete setlist predictions
- Set 1, Set 2 (before/after Drums), Encore
- Drag-and-drop interface with hints

### 4. Timing Games (`/timing-games`)
- Show start/end time predictions
- Set break length predictions

## 🧩 Key Components

### `MainLayout`
Global layout wrapper providing consistent header, footer, and content structure.

### `FourWaysToPlay`
Standardized payment mode selection:
- Play for Fun (free)
- Play for Charity (donation)
- Play for Cash (prize pool)
- Play for Prize (sponsored rewards)

### `Header`
Responsive navigation with FAQ, Sign In, Sign Up links. Includes mobile hamburger menu.

### `SetlistDragDropPicker`
Reusable drag-and-drop component for song selection used across multiple games.

## 🎨 Styling & Design

### Design System
- **Primary Colors**: Purple (#7c3aed), Grateful Dead rainbow palette
- **Fonts**: Orbitron (headings), Montserrat Alternates (body), Oswald (display)
- **Framework**: Tailwind CSS with custom utilities
- **Responsive**: Mobile-first design with breakpoints

### Theme Configuration
Located in `/theme/SetlistStreetTheme.ts` - centralized design tokens for consistency.

## 📊 Data & State Management

### Current State
- **Client-side**: React hooks (useState, useEffect)
- **Data**: Mock data in `/lib/data/` and `/utils/`
- **Persistence**: Local storage for temporary state

### Prepared for Backend
- **Database**: Supabase client configured in `/utils/supabaseClient.ts`
- **Schema**: Ready for users, games, entries, songs tables
- **Authentication**: UI components exist, backend integration needed

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js and React
- **File Naming**: PascalCase for components, kebab-case for pages
- **Imports**: Absolute imports from project root

### Component Patterns
```typescript
// Standard component structure
interface ComponentProps {
  prop: string;
  optional?: boolean;
}

export default function Component({ prop, optional = false }: ComponentProps) {
  const [state, setState] = useState<string>('');
  
  return (
    <div className="responsive-classes">
      {/* Component content */}
    </div>
  );
}
```

### Responsive Design
```css
/* Mobile first approach */
.class {
  @apply base-styles;
  @apply sm:small-screens;
  @apply md:medium-screens;
  @apply lg:large-screens;
  @apply xl:extra-large;
}
```

## 🚨 Known Issues & TODOs

### High Priority
- [ ] **Visual Design Overhaul**: Implement assets from `/visualelements/`
- [ ] **Backend Integration**: Connect Supabase for real data persistence
- [ ] **Authentication**: Complete sign in/signup flow
- [ ] **Payment Processing**: Implement Stripe integration

### Medium Priority
- [ ] **Performance**: Image optimization, code splitting
- [ ] **Testing**: Unit tests, integration tests
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **SEO**: Meta tags, structured data

### Low Priority
- [ ] **PWA Features**: Offline support, push notifications
- [ ] **Analytics**: User tracking, game statistics
- [ ] **Admin Panel**: Game management interface

## 🔗 External Dependencies

### Core Framework
- **Next.js 15**: React framework with SSR/SSG
- **React 18**: UI library with hooks
- **TypeScript**: Type safety and developer experience

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animations and transitions
- **React DnD**: Drag and drop functionality

### Development
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler for development

## 📈 Performance Considerations

### Optimization Strategies
- **Static Generation**: Most pages are statically generated
- **Code Splitting**: Pages load only necessary code
- **Image Optimization**: Next.js automatic image optimization
- **CSS Purging**: Tailwind removes unused styles

### Monitoring
- **Build Analysis**: Bundle size tracking
- **Core Web Vitals**: Performance metrics
- **Lighthouse**: Regular performance audits

---

## 🤝 Contributing

1. **Fork & Clone**: Get your own copy
2. **Create Branch**: `git checkout -b feature/your-feature`
3. **Develop**: Follow coding standards
4. **Test**: `npm run build` to verify
5. **Submit PR**: Clear description of changes

**See main project README for bounty opportunities!**
