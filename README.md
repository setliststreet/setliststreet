# 🎸 Setlist Street - GD60 Prediction Games

## 🌈 Welcome to the Open Source Community!

**Setlist Street** is a fan-created platform for **Grateful Dead 60th Anniversary concerts** featuring 16+ different setlist prediction games. Built with Next.js, React, and TypeScript, this app lets Dead & Company fans predict openers, encores, full setlists, and more!

> **🎯 Created in honor of the Grateful Dead 60th Anniversary concerts … a series of setlist prediction games.**

---

## 🚀 Quick Start for Developers

### Prerequisites
- **Node.js** 18+ and npm
- **Git** for version control
- Basic knowledge of **React/Next.js**

### Getting Started
```bash
# Clone the repository
git clone https://github.com/setliststreet/setliststreet.git
cd setliststreet

# Navigate to main app
cd deadco-setlist-game

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app!

### Project Structure
```
setliststreet/
├── deadco-setlist-game/          # Main Next.js application
│   ├── components/               # Reusable React components
│   ├── pages/                   # Next.js pages and routing
│   ├── utils/                   # Helper functions and utilities
│   ├── styles/                  # CSS and styling
│   └── lib/                     # Data and configuration
├── visualelements/              # Design assets and moodboards
├── pagetextdescriptions/        # Content documentation
└── songs/                       # Song data and setlist CSVs
```

---

## 💰 Open Bounty Opportunities

**I'm offering compensation for quality contributions! While I don't have formal GitHub bounties set up yet, I will fairly compensate developers who help improve this project.**

### 🎨 **Priority #1: Visual Design & UI ($100+ bounty)**
**MOST IMPORTANT** - Transform the basic UI using our design assets
- **Task**: Implement beautiful background images and iconography from `/visualelements/` folder
- **Includes**: Moodboards, icons, color schemes, Dead & Company aesthetic
- **Current State**: Very basic styling, needs major visual overhaul
- **Bounty**: **$100 or negotiable**

### 🔐 **User Authentication & Payments ($25+ bounty)**
- **Task**: Implement and QC sign in/signup functionality
- **Includes**: User registration, authentication flow, payment processing
- **Current State**: UI exists, backend integration needed
- **Bounty**: **$25 or negotiable**

### 🏢 **Sponsor Integration ($25+ bounty)**
- **Task**: Create sponsor logo placeholders per game
- **Includes**: Dynamic sponsor management, game-specific branding
- **Current State**: Basic footer placeholders exist
- **Bounty**: **$25 or negotiable**

### 🎯 **UI/UX Consistency ($25+ bounty)**
- **Task**: Standardize payments, menus, spacing across all pages
- **Includes**: Component consistency, padding/margin systems
- **Current State**: Some inconsistencies between pages
- **Bounty**: **$25 or negotiable**

### 💡 **Your Ideas Welcome!**
- **Task**: Any improvements to look/feel/gameplay you envision
- **Process**: Show me a commit with your improvement
- **Bounty**: **Fair compensation based on contribution value**

---

## 📊 Current Project Status

### ✅ **What's Working**
- **Core Game Logic**: 16+ prediction games (opener, encore, setlist builder, bingo, timing)
- **Responsive Design**: Works on desktop, tablet, mobile
- **Navigation**: Consistent header/footer across all pages
- **UI Components**: Drag-and-drop, form handling, game cards
- **Payment UI**: Four play modes (Fun, Charity, Cash, Prize)

### 🚧 **What Needs Work**
- **Visual Design**: Basic styling, needs Dead & Company aesthetic
- **Backend Integration**: Authentication, payments, data persistence
- **Performance**: Image optimization, loading states
- **Testing**: Unit tests, integration tests
- **Accessibility**: ARIA labels, keyboard navigation

### 🎯 **Architecture Overview**
- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React hooks (useState, useEffect)
- **Data**: Mock data, prepared for Supabase integration
- **Deployment**: Vercel-ready

---

## 🤝 How to Contribute

### 1. **Choose a Bounty or Feature**
- Check the bounty list above
- Comment on relevant GitHub issues
- Or propose your own improvement!

### 2. **Development Workflow**
```bash
# Create feature branch
git checkout -b feature/your-improvement

# Make your changes
# Test thoroughly
npm run build

# Commit with clear message
git commit -m "feat: implement sponsor logo system"

# Push and create PR
git push origin feature/your-improvement
```

### 3. **Quality Standards**
- **Code Quality**: TypeScript, proper error handling
- **Responsive**: Must work on mobile, tablet, desktop
- **Consistency**: Follow existing patterns and styling
- **Performance**: No unnecessary re-renders or large bundles

### 4. **Get Paid!**
- Submit a clean PR with your improvements
- I'll review and provide feedback
- Once merged, we'll discuss fair compensation
- Payment via PayPal, Venmo, or preferred method

---

## 🎨 Design Resources

### Key Visual Elements
- **Location**: `/visualelements/` directory
- **Moodboards**: Homepage inspiration, Dead & Company aesthetic
- **Icons**: Grateful Dead iconography (skulls, bears, lightning bolts)
- **Colors**: Rainbow themes, tie-dye patterns, psychedelic elements

### Brand Guidelines
- **Fonts**: Orbitron, Montserrat Alternates, Oswald
- **Colors**: Purple primary (#7c3aed), Dead & Company rainbow palette
- **Style**: Nostalgic, psychedelic, community-focused
- **Tone**: Fun, inclusive, knowledgeable about Dead history

---

## 📚 Technical Documentation

### Key Directories
- 📖 [`/deadco-setlist-game/README.md`](deadco-setlist-game/README.md) - Main app documentation
- 📖 [`/deadco-setlist-game/components/README.md`](deadco-setlist-game/components/README.md) - Component library
- 📖 [`/deadco-setlist-game/pages/README.md`](deadco-setlist-game/pages/README.md) - Page structure
- 📖 [`/visualelements/README.md`](visualelements/README.md) - Design assets

### Development Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
```

---

## 📞 Contact & Support

- **GitHub Issues**: For bugs and feature requests
- **Email**: setliststreet@proton.me
- **Discussions**: Use GitHub Discussions for questions

**Let's build something beautiful for the Dead & Company community! 🌹⚡🐻**

---

*This project is a fan creation and is not affiliated with the Grateful Dead, Dead & Company, or any related musical artists.* 