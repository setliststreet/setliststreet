# Setlist Street - Dead & Company Prediction Games

A web platform for Dead & Company fans to predict setlists, play bingo, test trivia knowledge, and compete with fellow Deadheads.

## 🎯 Features

- **Setlist Bingo**: Create multiple bingo boards with song predictions
- **Setlist Builder**: Drag-and-drop interface to predict entire setlists
- **Trivia Challenge**: Test Dead & Company knowledge 
- **Leaderboard**: Track top players and community stats
- **Sponsor Integration**: Support for sponsors and charity partnerships

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd setlist-street
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
deadco-setlist-game/
├── components/          # React components
│   ├── BingoBoard/     # Bingo game components
│   ├── Layout.tsx      # Main layout wrapper
│   └── ...
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── setlistbuilder-barebones.tsx  # Core setlist builder
│   └── ...
├── theme/              # Design system and theming
├── utils/              # Utility functions
├── scripts/            # Data processing scripts
└── public/             # Static assets
```

## 🎮 Game Types

### Setlist Bingo
- Create 5x5 bingo cards with song predictions
- Real-time gameplay during shows
- Multiple board strategy support

### Setlist Builder (Barebones)
- Structured setlist prediction:
  - **Set 1**: Opener → Songs → Closer
  - **Set 2**: Opener → Songs → Drums/Space → Back From Space → Songs → Closer  
  - **Encores**: Dynamic 1-4 encores
- Drag & drop from song pool
- Autocomplete song entry
- Dynamic list building

### Trivia Challenge
- Multiple difficulty levels
- Dead & Company history and song knowledge
- Timed questions and tournaments

## 🎨 Design System

The app uses a professional design system inspired by the official Dead & Company website:
- Clean typography (Inter font family)
- Sophisticated neutral color palette
- Minimal, professional aesthetics
- Responsive design principles

## 🗃️ Data

The platform includes:
- Comprehensive Dead & Company setlist database
- Song frequency and popularity data
- Show venue and date information
- User scoring and leaderboard data

## 🛠️ Built With

- **Framework**: Next.js 15.4.1
- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS + Custom theme system
- **Drag & Drop**: react-dnd + @dnd-kit
- **Animations**: Framer Motion
- **Database**: Supabase (configured)
- **Language**: TypeScript

## 📋 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

This project is designed to deploy on Vercel, but can be deployed to any platform that supports Next.js.

### Deploy on Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## 📝 Development Notes

### Key Components
- `setlistbuilder-barebones.tsx` - Core drag-and-drop setlist builder
- `Layout.tsx` - Professional navigation and layout
- `BingoBoard/` - Complete bingo game system
- `SetlistStreetTheme.ts` - Centralized design system

### Database Integration
- Supabase client configured in `utils/supabaseClient.ts`
- CSV data processing scripts in `scripts/`
- Song database ready for integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is for entertainment purposes only. Not affiliated with Grateful Dead or Dead & Company.

## 🎵 Acknowledgments

- Dead & Company for the incredible music
- Grateful Dead community for inspiration  
- The Deadhead community for testing and feedback
