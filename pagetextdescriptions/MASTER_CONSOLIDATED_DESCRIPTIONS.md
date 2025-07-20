# SETLIST STREET - MASTER CONSOLIDATED DESCRIPTIONS
# Generated automatically from individual description files
# Last updated: 2025-07-20 00:50:37 UTC

===============================================================================
MAIN PAGES
===============================================================================

## HOMESCREEN DESCRIPTION
Source: homescreen_description

Homescreen: index.tsx

Title at top: "Setlist Street"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**GRATEFUL DEAD 60TH ANNIVERSARY CONCERTS (GD60) - DEAD & COMPANY EXCLUSIVE**
Golden Gate Park, San Francisco
Dead & Company shows: Friday 8/1, Saturday 8/2, Sunday 8/3, 2025

**RECENT MAJOR UPDATES:**
- Live pool size displays on all game pages
- Payment amount selection ($1, $5, $10, custom)
- Prize information modals with sponsor details
- Horizontal "Ways to Play" containers
- No emojis or gradients (clean white background)
- Removed band selection (Dead & Company specific)

**UNIFIED GRID LAYOUT SYSTEM:**

**ALL PREDICTION GAMES GRID (15 Games Total):**
- Single unified grid: 5 columns on xl screens, 3 on lg, 2 on md, 1 on mobile
- All games in consistent containers with standardized layout
- Featured games highlighted with purple ring border
- Categories: Main Game, Timing Game, Advanced Song Game, Special Game, Live Game

**Game Container Structure:**
1. Main Games (5): Opener, Encore, Bust Out, Bingo, Builder
2. Timing Games (3): Start Time, End Time, Set Break Length  
3. Advanced Song Games (5): Set 2 Opener, Set 1/2 Closers, Pre/Post Drums
4. Special Games (2): Songs NOT Played (Featured), Next Song Live (Featured)

**TOOLS & RESULTS GRID:**
- Separate 2-column section for utility functions
- Setlist Hints & Statistics → /setlist-hints
- Live Results → /view-results

**TOTAL: 15 GAMES AVAILABLE + 2 UTILITY TOOLS**

**VISUAL LAYOUT SPECIFICATIONS (UPDATED - WHITE BACKGROUND):**

**Page Structure:**
- Background: Pure white (bg-white) with minimal color
- Container: max-width 7xl (1280px), centered with horizontal padding
- Typography: Gray-800 headers, gray-600/700 body text
- Clean, minimalist design approach for functionality testing

**Header Section:**
- Title: 4xl font-bold, gray-800 color, center-aligned
- Subtitle: 2xl font-semibold, gray-700
- Event details: lg text, gray-600
- Margin bottom: mb-12 (48px)

**Countdown Timer Section:**
- Background: Gray-50 with gray-200 border (no gradients)
- Container: Rounded-lg, padding 6, max-width md, centered
- Timer display: 3xl font-bold, purple-600 color
- Deadline text: sm text, gray-600
- Margin bottom: mb-8 (32px)

**Game Count Banner:**
- Background: Gray-50 with gray-200 border (no gradients)
- Container: Rounded-lg, padding 4, max-width 4xl, centered
- Text: xl font-bold, gray-800
- Icons: Text-based separators (no emojis)

**Unified Game Grid:**
- Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
- Cards: White background, gray-200 borders, rounded-lg
- Hover: Gray-300 borders, shadow-xl elevation
- Padding: p-6 (24px all around)
- Height: h-full for consistent card heights
- Gap: gap-6 (24px) between cards

**Game Card Design:**
- Background: Pure white with gray-200 borders
- Icon container: Gray-100 background with letter placeholders (G for Games)
- No emojis: Simple "G" or "T" text placeholders
- Title: xl font-bold, gray-800
- Description: sm text, gray-600, flex-grow for consistency
- Category badge: xs text, purple-600, font-medium
- Featured badge: Purple-700, font-bold (no star emojis)
- Sponsor placeholder: xs text, gray-400, italic

**Featured Game Highlighting:**
- Featured games: Ring-2 ring-purple-300 border
- Special "FEATURED" badge (no decorative elements)
- No color gradients - clean ring highlighting only

**Utility Tools Grid:**
- Layout: grid-cols-1 md:grid-cols-2, max-width 2xl
- Cards: Same white design as game cards
- Category badges: Blue-600 for tools section
- Gap: gap-6 (24px) between cards

**Show Schedule Cards:**
- Layout: grid-cols-1 md:grid-cols-3, max-width 4xl
- Background: White with gray-200 borders (no gray-50)
- Text: Purple-700 headers, gray-600 body, gray-500 details
- Rounded corners, padding 4

**Responsive Grid Breakpoints:**
- Mobile (default): Single column, all games stacked
- Tablet (md): 2 columns for main grid
- Desktop (lg): 3 columns for main grid
- Large (xl): 5 columns for optimal desktop experience
- Utility tools: Always 1-2 columns maximum

**Color Palette (SIMPLIFIED - WHITE BACKGROUND):**
- Primary background: White (bg-white)
- Card backgrounds: White with gray-200 borders
- Accent backgrounds: Gray-50 for timers/banners
- Text hierarchy: Gray-800 > Gray-700 > Gray-600 > Gray-500
- Highlights: Purple-600, Purple-700 for accents
- Borders: Gray-200 default, Gray-300 on hover
- No gradients or complex color schemes

**Typography Scale:**
- Page title: text-4xl (36px), font-bold
- Section headers: text-3xl (30px), font-bold
- Card titles: text-xl (20px), font-bold
- Body text: text-base (16px)
- Small text: text-sm (14px)
- Category badges: text-xs (12px)

**Spacing Framework:**
- Page sections: mb-12 (48px) between major sections
- Grid gaps: gap-6 (24px) for main grids
- Card padding: p-6 (24px) for all game cards
- Container padding: px-4 (16px) on mobile
- Header spacing: mb-8 (32px), mb-6 (24px) for subsections

**Hover & Interactive States:**
- Card hover: Shadow-lg to shadow-xl elevation
- Border hover: Gray-200 to gray-300
- Icon hover: Gray-100 to gray-200 background
- Smooth transitions: transition-shadow, transition-colors
- No complex gradient hover effects

**Grid Reorganization Benefits:**
- Easy rearrangement of game order
- Consistent card sizing across all games
- Responsive breakpoints work uniformly
- Simple white background for future customization
- Clean container system for adding/removing games
- Unified spacing and typography throughout

**DEAD & COMPANY SPECIFIC FEATURES:**
- All games focused on Dead & Company setlists and patterns
- Historical data from Dead & Company tours
- Venue-specific insights for Golden Gate Park
- No multi-band configuration needed

**SHOW INFORMATION:**
- Grateful Dead 60th Anniversary Concerts (GD60)
- Golden Gate Park, San Francisco
- Dead & Company shows: Friday 8/1, Saturday 8/2, Sunday 8/3
- Submission deadline: 7:00 PM PT before each show
- Display countdown timers to next deadline on homepage
- Live results shown during shows

**TECHNICAL SPECS:**
- Songs fetched from Supabase database (Dead & Company catalog)
- Real-time pool size updates every 5 seconds
- Payment processing with Stripe integration
- Users can play each game on each show individually
- Countdown timers update in real-time
- Real-time scoring and leaderboard updates
- Multiple payment methods supported ($1, $5, $10, custom)
- Sponsor integration ready
- Probability tooltips on song selections
- Live WebSocket connections for real-time games

**GAME HIGHLIGHTS:**
- Cash prizes, charity donations, sponsored prizes
- Real-time updates during shows
- Professional scoring algorithms
- Mobile-optimized gameplay
- Live leaderboards and results
- Statistical insights and probability data
- Community predictions and social features

**ALL 15 GAMES IN UNIFIED GRID:**
Main Games (5): Opener, Encore, Bust Out, Setlist Bingo, Setlist Builder
Timing Games (3): Start Time, End Time, Set Break Length
Advanced Song Games (5): Set 2 Opener, Set 1 Closer, Set 2 Closer, Pre/Post Drums Songs
Special Games (2): Songs NOT Played, Guess Next Song (Live)

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## ABOUT THE APP DESCRIPTION
Source: aboutheapp_description

About the App abouttheapp.tsx

Title at top: "About this App"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**GRATEFUL DEAD 60TH ANNIVERSARY CONCERTS (GD60)**
Golden Gate Park, San Francisco
August 1, 2, 3, 2025

Main Content

This app was created for Dead & Company fans by a lifelong Deadhead and Engineering PhD who has attended 25+ shows. Born out of a deep fascination with setlist analysis and the desire to explore which songs are played together most often, Setlist Street represents the intersection of music passion and data science.

**What Makes This Special:**
Our comprehensive game suite covers every aspect of Dead & Company performances - from timing predictions to specific song placements. With 15 different game types, players can engage with the music they love while competing for cash prizes, charity donations, and exclusive merchandise.

**The Vision:**
Setlist Street aims to enhance the concert experience by adding an interactive prediction layer that brings fans together around their shared love of the music. Whether you're a seasoned tour veteran or a newcomer to the scene, these games offer a fun way to test your knowledge and intuition.

**Community Impact:**
Through our charity gaming options, players can turn their predictions into donations for causes they care about, creating positive impact beyond the music.

**Future Plans:**
If you love this app and want to see it expanded to future Dead & Company tours or other bands, please follow our social media channels and share your feedback! We're always looking for ways to improve and expand the experience.

**Support Our Growth:**
This is our first attempt at Setlist Street for the GD60 concerts. If it goes well and you'd like to see this expanded to other tours and bands, please consider supporting our Kickstarter campaign:

**🚀 [Support Setlist Street on Kickstarter - PLACEHOLDER LINK]**

Your support helps us:
- Expand to more bands and tours
- Develop new game types and features
- Improve real-time functionality
- Build a larger community platform
- Offer bigger prizes and better experiences

**Contact & Collaboration:**
For game ideas, comments, technical feedback, or collaboration opportunities, feel free to email: setliststreet@proton.me

**Technical Foundation:**
Built with modern web technologies and real-time data integration to provide seamless gameplay and instant results during shows.

**Image & Content Disclaimer:**
All images, graphics, and visual elements used in this application were generated using artificial intelligence tools. Any resemblance to trademarked, copyrighted, or proprietary images is purely coincidental and unintentional. This application is an independent fan project with no commercial affiliation to the Grateful Dead, Dead & Company, or any associated entities.

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## RULES DESCRIPTION
Source: rules_description

Rules Page: rules.tsx

Title at top: "How to Play & Scoring Rules"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**SHOW INFORMATION:**
Grateful Dead 60th Anniversary Concerts (GD60)
Golden Gate Park, San Francisco
Shows: Friday August 1, Saturday August 2, Sunday August 3
Submission deadline: 7:00 PM PT before each show

Main Content

**GAME TYPES & SCORING:**

**1. Simple Song Games (Opener, Encore, Bust Out, Set Closers, etc.)**
- Right or Wrong answer system
- **Cash Games**: Winners share the pot equally. Single winner takes entire pot.
- **Charity Games**: Winners split donation pool between their chosen charities
- **Prize Games**: Single winner selected randomly if multiple correct answers
- **Fun Games**: Bragging rights and leaderboard placement

**2. Setlist Bingo**
- Real-time board updates as songs are played
- **First to complete bingo pattern wins**
- Standard winning patterns: lines, corners, full board
- **Tie-breaker**: Same prize distribution as song games
- Multiple boards allowed per user

**3. Setlist Builder (Most Complex Scoring)**

**Base Points:**
- 1 point: Each song guessed correctly (any position)
- 0.5 points: Song guessed in correct set but wrong position

**Bonus Points (Key Positions):**
- +1 additional point for correct placement in key positions:
  - Set 1 opener, Set 1 closer
  - Set 2 opener, Set 2 closer  
  - Pre drums/space song, Post drums/space song
  - 2 songs before drums/space, 2 songs after drums/space
  - Encore songs (any order within encore)
  - Set 1: 2nd song, 2nd-to-last song
  - Set 2: 2nd song, 2nd-to-last song

**Song Specifics:**
- Song pairs (China Cat → Rider) count as separate songs
- Reprises count as separate songs
- "Playing in the Band (Reprise)" ≠ "Playing in the Band"

**Sequence Bonus:**
- Perfect relative order of correctly guessed songs = +1 point per song
- Partial order scoring based on sequence accuracy
- Complete reverse order = 0 bonus points

**4. Songs NOT Played Game**
- Predict which top 25 popular songs WON'T be played
- Winner: Most correct "not played" predictions
- Points based on song popularity rankings

**5. Guess Next Song (Live Game)**
- Real-time predictions during shows
- Community voting and live bar charts
- Points for correctly predicting immediate next song
- Bonus points for prediction streaks
- WebSocket-powered live updates

**6. Late Submission Penalty**
- Submissions during shows allowed
- **Penalty**: -2 points per song already played at submission time
- Encourages early submissions while allowing late participation

**PRIZE POOLS & DISTRIBUTION:**

**Pool Types:**
- **Cash Pools**: Based on number of paid entries per game
- **Prize Pools**: Sponsored prizes (guitars, merchandise, experiences)
- **Charity Pools**: Donated to winners' chosen charities
- **Sponsor Seeding**: Additional funds added by sponsors

**Payment Methods:**
- Stripe, PayPal, Crypto, Credit Cards, Venmo, Cash App
- Multiple options for maximum accessibility

**Winner Contact & Prizes:**
- Winners contacted individually by app management
- Prize distribution handled by Setlist Street team
- Tax reporting responsibility of individual winners
- Charity confirmations provided post-event

**REAL-TIME FEATURES:**

**Live Updates:**
- Song results updated in real-time during shows
- Leaderboards refresh as songs are played
- Bingo boards update automatically
- Countdown timers to submission deadlines
- Next Song predictions with community voting

**Wheel of Fortune Results:**
- Visual spinning wheel for song reveals
- Stops on correct song when announced
- Real-time updates via setlist.fm API or manual entry

**Admin Backup:**
- Manual song entry interface for app management
- Setlist.fm API integration when commercially approved
- Real-time leaderboard management

**DATA & INSIGHTS:**
- **Setlist Hints & Statistics page** provides data-driven insights
- Song probability tooltips on all prediction interfaces
- Historical performance data and venue-specific patterns
- Machine learning-powered recommendations

**GAME SUBMISSION DEADLINES:**
All games close at 7:00 PM PT before each show start time.
Late submissions allowed with point penalties during shows.
Live games (Next Song) available throughout show duration.

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

## FAQ DESCRIPTION
Source: faq_description

FAQ Page: faq.tsx

Title at top: "Frequently Asked Questions"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**GRATEFUL DEAD 60TH ANNIVERSARY CONCERTS (GD60)**
Golden Gate Park, San Francisco
Dead & Company shows: Friday 8/1, Saturday 8/2, Sunday 8/3, 2025

Main Content

**GETTING STARTED**

**Q: How do I play?**
A: There are four ways to play Setlist Street games:
1. **Play for Fun** - Free to play, bragging rights and leaderboard placement
2. **Play for Charity** - Entry fee goes to charity pools, winners choose donation recipients
3. **Play for Cash** - Entry fee builds cash pools, winners share the pot
4. **Play for Prize** - Compete for sponsored prizes like guitars, merchandise, and experiences

For complete rules and scoring details, visit our [Rules Page](/rules).

**Q: Are you affiliated with Dead & Company or the Grateful Dead?**
A: No, Setlist Street is an independent fan-created project. I'm a lifelong Deadhead and engineering PhD who has attended 25+ shows. This app was created purely out of love for the music and community, with no official affiliation to the band or their management.

**Q: Do I need to be at the show to play?**
A: Absolutely not! Anyone can play from anywhere in the world. Whether you're at Golden Gate Park or watching from home, you can participate in all our prediction games. The magic of the music brings us all together regardless of location.

**Q: Will you be doing this again, or is this a one-time Dead & Company thing?**
A: Great question! This is our first attempt at Setlist Street. If GD60 goes well, we plan to expand to:
- Future Dead & Company tours (if they happen)
- Other jam bands and touring acts
- Different venues and festival circuits
- Year-round prediction games

If you love this app and want to see it grow, please support our Kickstarter campaign! [Link will be added to About page]

**Q: Can I play anonymously?**
A: Yes! Users can play anonymously for fun. To win prizes or contribute to charities, users will need to register to make payments. Only your username (can be randomly generated) will be public facing. We take users' private information very seriously and have implemented very strict privacy control measures.

**GAMES & SCORING**

**Q: What's the difference between all the song prediction games?**
A: Each game focuses on different aspects of the setlist:
- **Simple Song Games** (Opener, Encore, etc.): Right/wrong predictions
- **Setlist Builder**: Complex point system based on song placement and order
- **Setlist Bingo**: First to complete patterns wins
- **Songs NOT Played**: Predict popular songs that won't be performed
- **Timing Games**: Predict show start/end times and set break length
- **Guess Next Song (Live)**: Real-time predictions during shows with community voting

**Q: How does scoring work for Setlist Builder?**
A: Setlist Builder uses the most complex scoring system:
- 1 point per correct song (any position)
- 0.5 points for correct set but wrong position
- +1 bonus for key positions (openers, closers, drums/space songs)
- Sequence bonus for songs in correct relative order
- See our [Rules Page](/rules) for complete details.

**Q: Can I play multiple games for the same show?**
A: Yes! You can play every game for every show. Each game has separate entry fees and prize pools. With 15 different games available, you can participate in as many as you'd like.

**Q: What happens if I submit late?**
A: Late submissions are allowed during shows but penalized -2 points per song already played. Submit before 7:00 PM PT to avoid penalties!

**Q: What is the "Guess Next Song" live game?**
A: This is our real-time game that runs during shows! You predict the next song as the setlist unfolds, see community predictions in live bar charts, and compete for points throughout the entire show. It's perfect for fans watching streams or at the venue. The real-time predictions will show calculated most likely next songs based on our historical data (top 5-10 with probabilities) - we'll populate this feature with our statistical analysis.

**Q: What is the time frame for submissions?**
A: Users can submit answers anytime before or during a show. For setlist guessing games, note that points get deducted for each song into the given set that has been played. Once a song has finished or started, users are no longer able to submit answers for that song.

**PRIZES & PAYMENTS**

**Q: How do prize pools work?**
A: Prize pools are built through:
- Entry fees from players
- Sponsor contributions
- Charity donations
Pool sizes grow with more participants - the more players, the bigger the prizes!

**Q: What payment methods do you accept?**
A: We support multiple payment options:
- Credit/Debit Cards (via Stripe)
- PayPal
- Cryptocurrency
- Venmo
- Cash App

**Q: How do I get my winnings?**
A: Winners are contacted individually by our team within 24 hours. Prize distribution happens within 48 hours of verification. You're responsible for tax reporting on winnings.

**Q: How do charity donations work?**
A: When you play for charity, you choose your preferred charity during signup. If you win, the prize pool gets donated to your chosen charity. We provide confirmation of all donations post-event.

**TECHNICAL QUESTIONS**

**Q: How do you get the setlist information?**
A: We use real-time data integration with setlist.fm API when available, plus manual backup entry by our admin team. Results update live during shows as songs are played.

**Q: What if there's a technical issue during the show?**
A: Our admin dashboard has emergency controls to pause games, make announcements, and handle technical issues. We also maintain audit trails and system backups.

**Q: Is my personal information secure?**
A: Yes, we use industry-standard security practices. Payment processing is handled securely through Stripe and other verified payment processors. See our Privacy Policy for complete details.

**Q: What devices can I use?**
A: Setlist Street works on all devices - desktop, laptop, tablet, and mobile. The interface is fully responsive and optimized for mobile gameplay.

**Q: Is there a mobile app version?**
A: Not yet, but we plan to release a dedicated mobile app if this web version goes well! For now, the mobile web experience is fully optimized for smartphones and tablets. A native app would offer push notifications for live results, offline functionality, and enhanced mobile-specific features. Support our Kickstarter campaign to help make the mobile app a reality!

**Q: What is the "Setlist Hints" page?**
A: Our Setlist Hints & Statistics page provides data-driven insights to help improve your predictions. It includes historical song position probabilities, song pairing statistics, timing patterns, venue-specific data, and machine learning insights. It's your statistical advantage for making smarter predictions across all games.

**COMMUNITY & SUPPORT**

**Q: Can I play with friends?**
A: Absolutely! Share your predictions, compare strategies, and compete on the leaderboards. While accounts are individual, the community spirit is what makes this special.

**Q: What if I have issues or questions during the games?**
A: Contact us at setliststreet@proton.me for support. During show days, we monitor communications closely for any technical issues.

**Q: How can I stay updated on future games?**
A: Follow our social media channels and sign up for our email newsletter. We'll announce future tour games and new features through these channels.

**Q: Can I suggest new game ideas?**
A: Yes! We love hearing from the community. Email your game ideas to setliststreet@proton.me. The best suggestions may become reality in future versions.

**Q: I love your app! Can you make a version for [other bands] like Phish, Widespread Panic, DMB, moe., etc.?**
A: Yes! The developer of this app is only familiar with Dead & Company. If you are a setlist nerd for another band and want to collaborate on a version for your band, please reach out at setliststreet@proton.me. We'd love to work with passionate fans who know their band's patterns and history.

**Q: I have an idea for a fun game! Can you build it?**
A: The answer is probably yes! Feel free to reach out with any ideas at setliststreet@proton.me. We're always looking for creative new ways to enhance the prediction experience and engage the community.

**Q: I heard Dead & Company never plays the same show twice. How can predictions be accurate?**
A: This is true - Dead & Company (like the Grateful Dead before them) never repeats the exact same setlist. However, true Deadheads know that sets follow certain patterns due to key changes, song relationships, energy flow, and venue considerations. Certain songs are statistically more likely to be played together, and certain setlist structures are more probable than others. Our statistical analysis helps identify these patterns while still respecting the beautiful unpredictability that makes each show special.

**Q: I love your app and would like to sponsor it?**
A: We love to partner with band-adjacent charities and companies. Please reach out to setliststreet@proton.me for sponsorship inquiries.

**VISUAL LAYOUT SPECIFICATIONS:**

**Page Structure:**
- Container: max-width 4xl (896px), centered with horizontal padding
- Background: White with colored section backgrounds
- Typography: Purple-800 headers, gray-700/600 body text

**Header Section:**
- Title: 4xl font-bold, purple-800, center-aligned
- Subtitle: xl font-semibold, gray-800
- Event details: gray-600, center-aligned
- Margin bottom: mb-8 (32px)

**Quick Jump Navigation:**
- Background: Gradient purple-100 to blue-100
- Container: Rounded-lg, padding 6 (24px)
- Header: lg font-semibold, purple-800
- Buttons: White with 70% opacity background, rounded-lg
- Hover: 100% opacity transition
- Layout: Flexbox wrap with gap-2 (8px)

**FAQ Accordion Sections:**
- Container: space-y-6 (24px vertical spacing)
- Cards: White background, shadow-lg, rounded-lg, overflow hidden
- Section buttons: Full width, left-aligned, gray-50 background
- Hover: gray-100 background transition
- Headers: xl font-bold, gray-800
- Expand/collapse: Gray-500 +/- indicators
- Content area: px-6 py-4 (24px horizontal, 16px vertical padding)

**FAQ Section Icons & Colors:**
- 🚀 Getting Started: Default gray/purple theme
- 🎮 Games & Scoring: Blue/purple theme
- 💰 Prizes & Payments: Green theme
- 🔧 Technical Questions: Blue theme
- 📱 Mobile & Apps: Indigo theme
- 🤝 Community & Support: Purple theme
- 🌟 Community & Expansion: Gold/yellow accents
- 🔧 Troubleshooting: Red/orange theme

**Question & Answer Layout:**
- Questions: lg font-semibold, gray-800, mb-3 (12px)
- Answers: gray-600, leading-relaxed line height
- Links: purple-600 color, hover underline
- Email links: Purple-600 with hover effects
- List items: Proper disc/decimal styling with inside positioning
- Nested content: mb-3 spacing between paragraphs

**Contact Section (Footer):**
- Background: Gradient purple-500 to blue-500
- Text: White with center alignment
- Title: 2xl font-bold
- Description: lg text, mb-6 spacing
- Buttons: White background with purple-600 text
- Button hover: gray-100 background
- Layout: Flex column on small, flex row on larger screens
- Padding: p-8 (32px all around)
- Border radius: rounded-lg

**Interactive Elements:**
- Buttons: Rounded-lg corners, font-semibold weight
- Hover transitions: All interactive elements have smooth transitions
- Focus states: Proper accessibility focus indicators
- Link styling: Consistent purple-600 color scheme

**Responsive Design:**
- Mobile: Single column, full-width sections
- Tablet: Maintained single column with better spacing
- Desktop: Optimized button layouts and improved readability
- Quick jump buttons: Responsive wrapping with consistent spacing

**Typography Hierarchy:**
- Page title: text-4xl (36px)
- Section headers: text-xl (20px)
- FAQ questions: text-lg (18px)
- Body text: text-base (16px)
- Contact section title: text-2xl (24px)
- Contact description: text-lg (18px)

**Color Palette:**
- Primary: Purple-800, Purple-600, Purple-500
- Secondary: Blue-500, Blue-100
- Neutral: Gray-800, Gray-700, Gray-600, Gray-500, Gray-100, Gray-50
- Success: Green accents for positive actions
- Background: White, Gray-50 for cards
- Gradients: Purple-to-blue combinations throughout

**Spacing System:**
- Section spacing: mb-8 (32px), mb-12 (48px) for major sections
- Card padding: px-6 py-4 (24px horizontal, 16px vertical)
- Button spacing: gap-4 (16px) between elements
- Text spacing: mb-3 (12px) between paragraphs
- Container padding: px-4 (16px) on mobile

**TROUBLESHOOTING**

**Q: I can't submit my prediction. What should I do?**
A: First, check that you're logged in and it's before the 7:00 PM PT deadline. If issues persist, try refreshing the page or contact support immediately.

**Q: The countdown timer seems wrong. Is there an issue?**
A: Our timers are set to Pacific Time (PT). If you're in a different timezone, convert accordingly. All deadlines are 7:00 PM PT on the day of each show.

**Q: I think there's an error in the scoring. Who do I contact?**
A: Email setliststreet@proton.me with details about the scoring issue. Include your username, the specific game, and what you believe is incorrect. All scoring decisions are final, but we'll investigate legitimate concerns.

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

## SETLIST HINTS DESCRIPTION
Source: setlisthints_description

Setlist Hints Page: setlist-hints.tsx

Title at top: "Setlist Hints & Statistics"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**GRATEFUL DEAD 60TH ANNIVERSARY CONCERTS (GD60)**
Golden Gate Park, San Francisco
Dead & Company shows: Friday 8/1, Saturday 8/2, Sunday 8/3, 2025

Main Content

**DATA-DRIVEN INSIGHTS FOR BETTER PREDICTIONS**

Welcome to your statistical advantage! This page provides comprehensive data analysis to help you make smarter predictions across all 15 Setlist Street games.

**SONG POSITION STATISTICS**

**Set 1 Openers:**
[PLACEHOLDER - Top 20 most likely Set 1 openers with percentages]
Table showing:
- Song name
- Probability percentage
- Last used as opener
- Venue type preference (indoor/outdoor)
- Tour position factor
- Weather correlation

**Set 1 Closers:**
[PLACEHOLDER - Top 20 most likely Set 1 closers with percentages]
Table showing:
- Song name
- Probability percentage
- Average set length when used as closer
- Transition patterns to Set 2
- Seasonal preferences

**Set 2 Openers:**
[PLACEHOLDER - Top 20 most likely Set 2 openers with percentages]
Table showing:
- Song name
- Probability percentage
- Set break length correlation
- Connection to Set 1 closer
- Energy level classification

**Set 2 Closers:**
[PLACEHOLDER - Top 20 most likely Set 2 closers with percentages]
Table showing:
- Song name
- Probability percentage
- Encore prediction factor
- Show length correlation
- Venue capacity influence

**Encore Songs:**
[PLACEHOLDER - Top 20 most likely encore songs with percentages]
Table showing:
- Song name
- Probability percentage
- Position in encore (E1, E2, E3)
- Show end time correlation
- Audience energy factor

**Drums/Space Analysis:**
[PLACEHOLDER - Pre/Post Drums/Space song statistics]
Tables showing:
- Most likely pre-drums songs
- Most likely post-drums songs
- Drums/Space duration correlations
- Song transition patterns

**SONG RELATIONSHIP MATRIX**

**Most Likely Song Pairs:**
[PLACEHOLDER - Song combination statistics]
Table showing:
- Song A → Song B probability
- Frequency of pairing
- Position correlation
- Set preferences
- Recent trend analysis

**Song Groupings:**
[PLACEHOLDER - Multi-song sequence analysis]
- Three-song sequences most likely to appear together
- Set flow patterns
- Thematic groupings (ballads, rockers, jams)
- Key signature relationships

**TIMING PATTERNS**

**Show Start Times:**
[PLACEHOLDER - Historical start time data]
- Most common start times by venue type
- Day of week correlations
- Weather impact on start times
- Holiday/special event adjustments

**Set Break Lengths:**
[PLACEHOLDER - Set break duration statistics]
- Average break length by venue
- Set 1 length correlation to break time
- Outdoor vs. indoor venue differences
- Temperature impact on break length

**Show End Times:**
[PLACEHOLDER - Show duration analysis]
- Average total show length
- Day of week patterns
- Venue curfew considerations
- Encore length impact

**ADVANCED ANALYTICS**

**Song Rarity Index:**
[PLACEHOLDER - Bust out potential rankings]
- Songs by last played date
- Rarity scoring algorithm
- Anniversary show bust out likelihood
- Historical special event patterns

**Weather Correlations:**
[PLACEHOLDER - Environmental impact data]
- Rain impact on song selection
- Temperature influence on setlist length
- Wind effects on acoustic songs
- Sunset timing and show atmosphere

**Venue-Specific Patterns:**
[PLACEHOLDER - Golden Gate Park historical data]
- Previous Dead & Company shows at outdoor SF venues
- Grateful Dead historical SF patterns
- Park-specific considerations
- Local audience preferences

**PREDICTIVE MODELS**

**Machine Learning Insights:**
[PLACEHOLDER - AI-powered predictions]
- Neural network song probability rankings
- Pattern recognition for song sequences
- Anomaly detection for special shows
- Confidence intervals for predictions

**Seasonal Adjustments:**
[PLACEHOLDER - Time-based modifications]
- Summer tour vs. fall tour differences
- Anniversary show special considerations
- Final show vs. opening show patterns
- Weekend vs. weekday variations

**USER STRATEGY GUIDES**

**Game-Specific Tips:**
- Setlist Builder: Optimal song placement strategies
- Bingo: Square selection for maximum win probability
- Songs NOT Played: Identifying overrated popular songs
- Timing Games: Using venue and weather data
- Next Song Live: Real-time decision making

**Risk Management:**
- High-confidence vs. high-reward predictions
- Diversification strategies across multiple games
- Bankroll management for cash games
- When to trust the data vs. intuition

**DATA SOURCES & METHODOLOGY**

All statistics derived from:
- setlist.fm historical database
- Dead & Company tour archives (2015-2024)
- Grateful Dead historical patterns (1965-1995)
- Venue-specific performance data
- Weather and timing correlations
- Machine learning pattern analysis

Last updated: [TIMESTAMP]
Next update: After each show completion

**DISCLAIMER:**
Past performance does not guarantee future results. These statistics are provided for entertainment and educational purposes. The magic of live music means anything can happen!

**VISUAL LAYOUT SPECIFICATIONS:**

**Page Structure:**
- Container: max-width 6xl (1152px), centered with horizontal padding
- Background: White base with colored accent sections
- Typography: Purple-800 headers, gray-700/600 body text

**Header Section:**
- Title: 4xl font-bold, purple-800, center-aligned
- Subtitle: xl font-semibold, gray-800
- Event details: gray-600, center-aligned
- Margin bottom: mb-8 (32px)

**Introduction Banner:**
- Background: Gradient purple-100 to blue-100
- Container: Rounded-lg, padding 6 (24px), center-aligned
- Title: xl font-semibold, purple-800
- Description: gray-700 text
- Margin bottom: mb-8 (32px)

**Tab Navigation:**
- Layout: Flex wrap, justify-center, gap-2 (8px)
- Active tab: purple-600 background, white text
- Inactive tabs: gray-200 background, gray-700 text
- Hover: gray-300 background for inactive tabs
- Padding: px-4 py-2 (16px horizontal, 8px vertical)
- Border radius: rounded-lg
- Font: medium weight
- Icons: Emoji prefixes for visual distinction
- Transition: Smooth color transitions

**Tab Icons & Colors:**
- 🎵 Song Positions: Purple theme
- 🔗 Song Pairs: Blue theme  
- ⏰ Timing Patterns: Green theme
- 📊 Advanced Analytics: Orange theme

**Statistical Tables:**
- Container: White background, shadow-lg, rounded-lg
- Padding: p-6 (24px all around)
- Margin bottom: mb-6 (24px)
- Title: xl font-semibold, mb-2 (8px)
- Description: gray-600, text-sm, mb-4 (16px)

**Table Placeholder Styling:**
- Background: gray-50, rounded-lg
- Padding: p-8 (32px all around)
- Text alignment: Center
- Icon: 📊 with gray-500 color, lg text
- Title: gray-500, lg text, mb-2
- Description: gray-400, sm text

**Real Table Styling (when populated):**
- Container: overflow-x-auto for responsive scrolling
- Table: min-width full, border-collapse
- Headers: gray-50 background, border gray-200
- Header text: font-semibold, px-4 py-2 padding
- Cell borders: border gray-200
- Cell padding: px-4 py-2
- Empty state: Centered text, gray-500 color

**Information Cards:**
- Background: Colored background (blue-50, green-50, purple-50, yellow-50)
- Border radius: rounded-lg
- Padding: p-6 (24px)
- Title: lg font-semibold with matching color (blue-800, green-800, etc.)
- Grid layout: grid-cols-1 md:grid-cols-2, gap-4

**Card Content Lists:**
- Font: semibold for sub-headers
- Text: gray-600 for content
- Spacing: mb-1 for list items, mb-2 for sections
- Bullet points: Consistent styling throughout

**Disclaimer Section:**
- Background: yellow-50
- Border radius: rounded-lg
- Padding: p-6 (24px)
- Title: lg font-semibold, yellow-800
- Text: sm text, yellow-700 for main content
- Small text: xs text, yellow-600 for footer

**Data Sources Section:**
- Background: gray-50
- Border radius: rounded-lg
- Padding: p-6 (24px)
- Title: lg font-semibold, gray-800
- List: sm text, gray-600
- Spacing: space-y-1 for list items
- Timestamp: xs text, gray-500

**Responsive Design:**
- Mobile: Single column layout, full-width tables with horizontal scroll
- Tablet: Improved spacing, 2-column information grids
- Desktop: Full multi-column layouts, optimized table widths
- Tab navigation: Responsive wrapping with consistent spacing

**Interactive Elements:**
- Tabs: Smooth hover and active state transitions
- Tables: Hover effects on rows (when populated)
- Cards: Subtle elevation on hover
- All clickable elements: Proper focus states for accessibility

**Typography Scale:**
- Page title: text-4xl (36px)
- Section titles: text-xl (20px)
- Card titles: text-lg (18px)
- Table headers: font-semibold, base size
- Body text: text-base (16px)
- Descriptions: text-sm (14px)
- Fine print: text-xs (12px)

**Color System:**
- Primary: Purple-800, Purple-600, Purple-100
- Tab themes: Purple, Blue, Green, Orange
- Information cards: Blue-50/800, Green-50/800, Purple-50/800, Yellow-50/800
- Tables: Gray-50 headers, Gray-200 borders
- Text hierarchy: Gray-800 > Gray-700 > Gray-600 > Gray-500 > Gray-400

**Spacing Framework:**
- Page sections: mb-8 (32px) standard, mb-12 (48px) for major breaks
- Card spacing: mb-6 (24px) between cards
- Internal card padding: p-6 (24px)
- Grid gaps: gap-4 (16px) for cards, gap-2 (8px) for tabs
- Text spacing: mb-2 to mb-4 for paragraphs and sections

**Table Design Patterns:**
- Consistent column headers across all stat tables
- Probability percentages prominently displayed
- Color coding for different data types
- Responsive horizontal scrolling for mobile
- Empty states with helpful placeholder content

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

===============================================================================
CORE GAME PAGES - MAIN GAMES
===============================================================================

## GUESS THE OPENER DESCRIPTION
Source: guesstheeopener_description

Guess the Opener: guess-opener.tsx

Users predict which song will open the first set for each Dead & Company show.

**LIVE POOL SIZE DISPLAY (NEW FEATURE):**
Container at top of page showing real-time player statistics:
- Total Players: Live count updating every 5 seconds
- Fun Players: Count of free participants 
- Cash Players: Count + live pool size (e.g., "$2,347")
- Charity Players: Count + pool size + unique charities (e.g., "45 players • $823 • 7 charities")
- Prize Players: Count + link to "View Available Prizes →"

**SHOW SELECTOR:**
Toggle buttons for Show 1 (Friday 8/1), Show 2 (Saturday 8/2), Show 3 (Sunday 8/3)
- Independent submissions per show
- Selected show highlighted with purple border/background
- Resets song selection when switching shows

**COUNTDOWN TIMER:**
Real-time countdown to 7:00 PM PT deadline before each show

**SPONSOR INTEGRATION:**
Placeholder for sponsor logo and name

**OPENER STATISTICS:**
Two-column display:
- Top Openers (All Time): Jack Straw (18.9%), Casey Jones (15.2%), etc.
- Recent Openers: Chronological list with dates

**SONG SELECTION:**
Grid of song options with:
- Song name
- Probability percentage and likelihood label (Very Likely/Likely/Possible/Unlikely)
- Color-coded probabilities: Green (15%+), Yellow (10-14%), Orange (5-9%), Red (<5%)
- Selected song highlighted with purple border/background

**DATA INSIGHT:**
When song selected, shows contextual tip about probability patterns

**WAYS TO PLAY WITH PAYMENT OPTIONS (UPDATED):**
Four horizontal containers:
1. **Play for Fun** - Immediate submission, no payment
2. **Play for Charity** - Shows payment selector:
   - Preset amounts: $1, $5, $10 buttons
   - Custom amount input field
   - "Donate $X & Submit" button
3. **Play for Cash** - Shows payment selector:
   - Preset amounts: $1, $5, $10 buttons  
   - Custom amount input field
   - "Pay $X & Submit" button
4. **Play for Prize** - Immediate submission, links to prize info

**PRIZE INFORMATION MODAL:**
Triggered from pool display "View Available Prizes" link:
- Modal overlay with prize details
- Each prize shows: Name, Sponsor, Value
- Example prizes: Vintage poster ($75), Tour t-shirt ($50), VIP pass ($200), Signed setlist ($150)
- Explanation of prize distribution method

**PAYMENT FLOW:**
1. User selects song prediction
2. Clicks charity or cash mode
3. Payment selector appears with $1/$5/$10 options + custom input
4. Submit button shows selected amount: "Pay $5 & Submit"
5. Processes payment and submits prediction
6. Success confirmation with amount details

**SUBMISSION HANDLING:**
Logs prediction with:
- Show number
- Selected song
- Play mode (fun/charity/cash/prize)
- Payment amount (if applicable)
- Game identifier

**REAL-TIME FEATURES:**
- Pool sizes update every 5 seconds
- Player counts increment organically
- Cash and charity pools grow with new submissions
- Unique charity count occasionally increases
- Live timestamp shown for last update

**VISUAL LAYOUT SPECIFICATIONS:**

**Pool Size Display:**
- White container with gray borders, rounded corners
- Grid layout: 4 columns on desktop, responsive on mobile
- Color-coded containers: Gray (total), Blue (fun), Green (cash), Purple (charity), Yellow (prizes)
- Live indicator with green "Live" badge
- Update timestamp at bottom

**Payment Selector:**
- Appears in gray-50 container below Ways to Play
- Centered layout with preset amount buttons
- Custom input with dollar sign prefix
- Submit button changes based on selected amount
- Cancel option to return to mode selection

**Prize Modal:**
- Full-screen overlay with semi-transparent background
- Centered white container with scroll capability
- Prize cards with sponsor, name, and value
- Close button (×) in top-right corner
- Explanatory text about prize distribution

**Responsive Design:**
- Pool display: 4 columns → 2 columns → 1 column on smaller screens
- Song grid: 3 columns → 2 columns → 1 column
- Payment options: Horizontal → stacked on mobile
- Prize modal: Full-width on mobile with proper margins

**Technical Implementation:**
- Real-time updates via mock intervals (will use WebSocket in production)
- State management for show selection, song choice, and payment flow
- Modal state handling with backdrop click/escape key closing
- Form validation for custom payment amounts
- Integration with existing song probability system

**User Flow:**
1. Page loads with default Show 1 selected
2. Pool size display shows current participant numbers
3. User can switch shows (resets selections)
4. User selects opener prediction from grid
5. Data insight appears for selected song
6. Ways to Play section becomes available
7. For payment modes, amount selector appears
8. User completes submission with confirmation
9. Pool numbers update to reflect new participant


## GUESS THE ENCORE DESCRIPTION
Source: guesstheencore_description

Guess the Encore Game Page: guess-encore.tsx

Title at top: "Guess the Encore"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:

Element 1: Song Picker (Left)
iPod-style scroll wheel interface
Users scroll through songs from Supabase database
Select the song they predict will be the final encore

Element 2: Selection Display (Center)
Shows currently selected encore song
Option to change selection
Preview of submission

Element 3: Helper Information (Right)
[PLACEHOLDER - Encore-specific hints to be added later]
Common encore songs statistics
Venue-specific encore patterns

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## GUESS THE BUST OUT DESCRIPTION
Source: guessthebustout_description

Guess the Bust Out Game Page: guess-bust-out.tsx

Title at top: "Guess the Bust Out"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:

Element 1: Song Picker (Left)
iPod-style scroll wheel interface
Users scroll through songs from Supabase database
Select the song they predict will be a rare "bust out"

Element 2: Selection Display (Center)
Shows currently selected bust out song
Last played date information
Rarity indicator

Element 3: Helper Information (Right)
[PLACEHOLDER - Bust out-specific hints to be added later]
Definition of "bust out" (songs not played recently)
Historical bust out patterns
Song rarity statistics

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Bust out = song not played in last 100 shows

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## SETLIST BINGO DESCRIPTION
Source: setlistbingo_description

Setlist Bingo Game Page: setlist-bingo.tsx

Title at top: "Setlist Bingo"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:

Element 1: Bingo Board Creation (Left)
5x5 bingo grid interface
iPod-style scroll wheel for song selection
Fill each square with predicted songs
Multiple board creation allowed

Element 2: Current Boards Display (Center)
Shows all created bingo boards
Edit existing boards
Board validation (no duplicates)
Submission preview

Element 3: Helper Information (Right)
[PLACEHOLDER - Bingo-specific hints to be added later]
Winning pattern examples
Strategy suggestions
Board completion probability

**BINGO RULES:**
- Standard 5x5 grid with center FREE space
- Win conditions: horizontal, vertical, diagonal lines, corners, full board
- Real-time marking during shows
- First to complete pattern wins
- Multiple boards allowed per player

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## SETLIST BUILDER DESCRIPTION
Source: setlistbuilder_description

Setlist Builder Game Page: setlist-builder.tsx

Title at top: "Setlist Builder"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Two main sections:

Element 1: Setlist Construction (Left - Larger Area)
Visual setlist layout divided into:
- Set 1: Slots for opener through closer (8-12 songs typically)
- Set Break indicator
- Set 2: Slots including pre-drums, drums/space, post-drums, closer (8-12 songs)
- Encore: Slots for 1-3 encore songs

Each slot uses iPod-style scroll wheel for song selection
Drag-and-drop functionality for reordering
Point preview system showing potential score

Element 2: Helper Tools (Right)
[PLACEHOLDER - Setlist builder-specific hints to be added later]
Scoring system breakdown
Common setlist patterns
Historical setlist length data
Song frequency statistics

**COMPLEX SCORING SYSTEM:**
- 1 point: Each song correct (any position)
- 0.5 points: Song in correct set but wrong position
- +1 bonus: Key positions (opener, closer, drums songs, etc.)
- Sequence bonus: Perfect relative order = additional points
- Song pairs (China>Rider) count separately
- Reprises count as separate songs

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


===============================================================================
TIMING GAMES
===============================================================================

## GUESS START TIME DESCRIPTION
Source: guessthestarttime_description

Guess Start Time Game Page: guess-start-time.tsx

Title at top: "Guess the Start Time"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:

Element 1: Time Picker (Left)
Clock-style time selection interface
Hour and minute picker (Pacific Time)
AM/PM selection if applicable
Predicted show start time input

Element 2: Selection Display (Center)
Shows currently selected start time
Time zone confirmation (PT)
Submission preview

Element 3: Helper Information (Right)
[PLACEHOLDER - Start time-specific hints to be added later]
Historical show start time patterns
Venue-specific timing information
Typical Dead & Company start times

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Time input with validation (reasonable concert start times)
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on accuracy to actual start time

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS END TIME DESCRIPTION
Source: guesstheendtime_description

Guess the End Time / Show Length Game Page: guesstheendtime.tsx

Title at top: "Guess the End Time / Show Length"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Time Input (HH:MM PM format for end time) OR Duration Input (HH:MM format for show length)
Toggle between "End Time" and "Show Length" prediction modes
Time/duration picker interface

To right of time picker: 
Lists display fun facts as hints:
[PLACEHOLDER - Last 10 show lengths/end times to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Dual input mode: end time OR show length prediction
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on accuracy to actual end time/duration

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS SET BREAK LENGTH DESCRIPTION
Source: guessthesetbreaklength_description

Guess the Set Break Length Game Page: guessthesetbreaklength.tsx

Title at top: "Guess the Set Break Length"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Duration Input (MM:SS format)
Time picker interface for set break duration (typically 15-45 minutes)

To right of time picker: 
Lists display fun facts as hints:
[PLACEHOLDER - Last 10 set break lengths to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Duration input with validation (reasonable break lengths)
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on accuracy to actual set break duration

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

===============================================================================
ADVANCED SONG GAMES
===============================================================================

## GUESS SET 2 OPENER DESCRIPTION
Source: guesstheset2opener_description

Guess the Set 2 Opener Game Page: guesstheset2opener.tsx

Title at top: "Guess the Set 2 Opener"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Song Guess
(To right of box 1): iPod style scroll wheel over all songs from Supabase database (fills in the box to the left that you have option to type in) - populates list and autocompletes from database

To right of scroll wheel: 
Lists display fun facts as hints:
[PLACEHOLDER - Set 2 opener-specific hints to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on exact song match for second set opener

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS SET 1 CLOSER DESCRIPTION
Source: guesstheset1closer_description

Guess the Set 1 Closer Game Page: guesstheset1closer.tsx

Title at top: "Guess the Set 1 Closer"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Song Guess
(To right of box 1): iPod style scroll wheel over all songs from Supabase database (fills in the box to the left that you have option to type in) - populates list and autocompletes from database

To right of scroll wheel: 
Lists display fun facts as hints:
[PLACEHOLDER - Set 1 closer-specific hints to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on exact song match for first set closer

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS SET 2 CLOSER DESCRIPTION
Source: guesstheset2closer_description

Guess the Set 2 Closer Game Page: guesstheset2closer.tsx

Title at top: "Guess the Set 2 Closer"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Song Guess
(To right of box 1): iPod style scroll wheel over all songs from Supabase database (fills in the box to the left that you have option to type in) - populates list and autocompletes from database

To right of scroll wheel: 
Lists display fun facts as hints:
[PLACEHOLDER - Set 2 closer-specific hints to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on exact song match for second set closer

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS PRE DRUMS SONG DESCRIPTION
Source: guessthepredrumssong_description

Guess the Pre Drums/Space Song Game Page: guessthepredrumssong.tsx

Title at top: "Guess the Pre Drums/Space Song"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Song Guess
(To right of box 1): iPod style scroll wheel over all songs from Supabase database (fills in the box to the left that you have option to type in) - populates list and autocompletes from database

To right of scroll wheel: 
Lists display fun facts as hints:
[PLACEHOLDER - Pre drums/space-specific hints to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on exact song match for song before drums/space segment

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS POST DRUMS SONG DESCRIPTION
Source: guessthepostdrumssong_description

Guess the Post Drums/Space Song Game Page: guessthepostdrumssong.tsx

Title at top: "Guess the Post Drums/Space Song"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:
Box 1: Song Guess
(To right of box 1): iPod style scroll wheel over all songs from Supabase database (fills in the box to the left that you have option to type in) - populates list and autocompletes from database

To right of scroll wheel: 
Lists display fun facts as hints:
[PLACEHOLDER - Post drums/space-specific hints to be added later]

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Songs fetched from Supabase database 
- iPod scroll wheel: shared component across all games
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on exact song match for song after drums/space segment

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

===============================================================================
SPECIAL GAMES
===============================================================================

## GUESS SONGS NOT PLAYED DESCRIPTION
Source: guesssongs notplayed_description

Guess Songs NOT Played Game Page: guesssongs-notplayed.tsx

Title at top: "Guess Songs NOT Played"

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content 2

Three horizontally distributed elements:

Element 1: Song Selection Interface (Left)
Display of Top 25 Most Popular Dead & Company Songs
Checkbox interface allowing users to select songs they predict WON'T be played
Multi-select functionality for up to 15 predictions per show

Element 2: Selected Songs Display (Center)
Shows user's current "NOT PLAYED" predictions
Allows removal of selected songs
Running count of selections
Preview of potential points based on song popularity rankings

Element 3: Helper Information (Right)
[PLACEHOLDER - Songs NOT played-specific hints to be added later]
Song popularity rankings and play frequency
Historical "not played" statistics for venue/tour

**SCORING SYSTEM:**
- Points awarded based on song popularity ranking
- Higher points for correctly predicting popular songs won't be played
- Most popular songs = highest point values when not played
- Winner: Highest total points from correct "not played" predictions

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**TECHNICAL SPECS:**
- Submission deadline: 7:00 PM PT before each show
- Top 25 song list fetched from Supabase database with popularity rankings
- Multi-select checkbox interface
- Live results displayed during shows
- Users can play same game on all 3 shows individually
- Scoring based on song popularity inverse correlation
- Maximum 15 song selections per show to prevent gaming

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street 

## GUESS NEXT SONG (LIVE) DESCRIPTION
Source: guessnextsong_description

Guess Next Song Game Page: guess-next-song.tsx

Title at top: "Guess the Next Song (Live)"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

**LIVE GAME STATUS:**
Live indicator: "🔴 LIVE" or "⏰ Waiting for Show Start"
Current show: Friday 8/1, Saturday 8/2, or Sunday 8/3

**SPONSOR SECTION:**
[Sponsored by: PLACEHOLDER SPONSOR NAME]
[SPONSOR LOGO PLACEHOLDER]

Main Content 1

Element 1
Show selector (only active/current show available during live play):
Text: Current show:
Show indicator: [Live Show: Friday, August 1] or [Live Show: Saturday, August 2] or [Live Show: Sunday, August 3]

Main Content 2

**REAL-TIME SETLIST DISPLAY:**
Left side: Live setlist as it happens
- Set 1: [Songs as they're played]
- Currently Playing: [Current Song Name] ⏱️
- Set Break indicator (when applicable)
- Set 2: [Songs as they're played]
- Encore: [Songs as they're played]

**NEXT SONG PREDICTION:**
Center area: 
- "What's the next song?" prompt
- iPod-style scroll wheel for song selection
- Submit button for prediction
- Time remaining indicator for current song (estimated)

**LIVE COMMUNITY PREDICTIONS:**
Right side: Real-time bar chart
- Horizontal bars showing each song prediction
- Percentage of users predicting each song
- Updates live as new predictions come in
- Top 10 most predicted songs displayed
- User count for each prediction

**SCORING SYSTEM:**
- Points awarded for correctly predicting the immediate next song
- Bonus points for predicting multiple songs in sequence
- Predictions must be submitted before current song ends
- Late submissions after song announcement = 0 points

**GAME MECHANICS:**
- Users can predict throughout the entire show
- New prediction round starts with each song
- Real-time leaderboard updates
- Live chat/community features (optional)
- Push notifications for prediction opportunities

**TECHNICAL SPECS:**
- WebSocket connections for real-time updates
- Live setlist feed from admin dashboard or setlist.fm API
- Real-time bar chart updates using Chart.js or similar
- Mobile-optimized for on-the-go predictions
- Automatic song timing estimates based on historical data

Section Header Center: Four Ways to Play
Four horizontally distributed buttons:
Button 1: Play for Fun 
Button 2: Play for Charity 
Button 3: Play for Cash
Button 4: Play for Prize

**UNIQUE FEATURES:**
- Only available during live shows
- Community aspect with live prediction sharing
- Multiple scoring opportunities per show
- Real-time social interaction
- Perfect for fans watching streams or at the show

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

===============================================================================
RESULTS PAGES
===============================================================================

## RESULTS PAGE DESCRIPTION
Source: resultspage_description

Results Page: results.tsx

Title at top: "Live Results & Leaderboards"

Top navigation bar: Links to "How to Play", "View Results", "Setlist Hints", "FAQ", "Sign In/Sign Up"

**LIVE RESULTS DASHBOARD**

Show selector: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]
Status indicator: "Pre-Show", "Live", "Completed"

Main Content

**REAL-TIME LEADERBOARDS**

**Main Games (5 Games):**
1. Guess the Opener - Current leaders and predictions
2. Guess the Encore - Live standings 
3. Guess the Bust Out - Rarity predictions and results
4. Setlist Bingo - Active boards and completion status
5. Setlist Builder - Point rankings and accuracy scores

**Timing Games (3 Games):**
1. Guess Start Time - Accuracy rankings
2. Guess End Time - Duration predictions
3. Guess Set Break Length - Break timing results

**Advanced Song Games (5 Games):**
1. Guess Set 2 Opener - Second set predictions
2. Guess Set 1 Closer - First set conclusion
3. Guess Set 2 Closer - Pre-encore predictions
4. Guess Pre Drums/Space Song - Before the jam
5. Guess Post Drums/Space Song - After the jam

**Special Games (2 Games):**
1. Songs NOT Played - Reverse psychology predictions
2. Guess Next Song (Live) - Real-time community predictions with live bar charts

**LIVE SETLIST DISPLAY**
Real-time setlist updates as songs are performed:
- Set 1: [Songs as they're played] ✅
- Currently Playing: [Song Name] 🎵 [Duration]
- Set Break: [Duration] ☕
- Set 2: [Songs as they're played] ✅
- Drums/Space: [Duration] 🥁
- Encore: [Songs as they're played] 🎸

**SCORING UPDATES**
Live point calculations and leaderboard movements:
- Instant scoring for simple prediction games
- Real-time Setlist Builder point accumulation
- Bingo board completion notifications
- Next Song live prediction scoring
- Late submission penalty tracking

**COMMUNITY FEATURES**
- Total players across all games
- Prize pool sizes (cash, charity, sponsored)
- Regional participation maps
- Social sharing of predictions and results
- Live chat during shows (optional)

**WINNER ANNOUNCEMENTS**
- Game-by-game winner reveals as results are determined
- Prize distribution notifications
- Charity donation confirmations
- Multiple winner tie-breaking procedures
- Contact information for prize claims

**HISTORICAL COMPARISON**
- Previous show results
- Accuracy trends across games
- Popular prediction patterns
- Upset victories and surprising results
- Statistical analysis of community predictions

**MOBILE OPTIMIZATION**
- Real-time push notifications for score updates
- Responsive design for all devices
- Live refresh without page reloads
- Offline viewing of completed results
- Social media integration for sharing wins

**VISUAL LAYOUT SPECIFICATIONS:**

**Page Structure:**
- Container: max-width 6xl (1152px), centered with horizontal padding
- Background: White with dynamic status indicators
- Typography: Purple-800 headers, gray-700/600 body text
- Real-time update indicators throughout

**Header Section:**
- Title: 4xl font-bold, purple-800, center-aligned
- Status indicator: Dynamic colored badge (pre-show/live/completed)
- Show selector: Tab-style navigation with show dates
- Margin bottom: mb-8 (32px)

**Show Status Indicators:**
- Pre-show: Blue-100 background, blue-800 text, "📅 Submissions Open"
- Live: Red-100 background, red-800 text, "🔴 Show In Progress"  
- Completed: Green-100 background, green-800 text, "✅ Results Final"
- Container: Rounded-lg, padding 4, center-aligned

**Show Selector Tabs:**
- Layout: Flex justify-center, gap-2
- Active tab: Purple-600 background, white text
- Inactive tabs: Gray-200 background, gray-700 text
- Hover: Gray-300 background for inactive
- Padding: px-4 py-2, rounded-lg, font-medium
- Transition: Smooth color changes

**Game Category Sections:**
- Headers: 2xl font-bold, gray-800, mb-6
- Layout: Space-y-6 between categories
- Category icons: Emoji prefixes for visual organization

**Leaderboard Cards:**
- Container: White background, shadow-lg, rounded-lg
- Header: Game title with participant count
- Padding: p-6 (24px all around)
- Grid layout: Varies by game complexity
- Real-time indicator: Small green dot for live updates

**Individual Game Leaderboards:**
- Header row: Gray-50 background, font-semibold
- Player rows: Alternating white/gray-50 backgrounds
- Position numbers: Bold, purple-600 color
- Player names: font-medium, gray-800
- Scores/predictions: Right-aligned, gray-600
- Play type badges: Small colored badges (💰🎁🏆🎮)

**Live Setlist Display:**
- Container: Sticky position or prominent placement
- Background: Gradient purple-100 to blue-100
- Currently playing: Animated pulse effect, larger text
- Completed songs: Checkmark icons, grayed text
- Set breaks: Coffee icon with timer
- Drums/Space: Special drumstick icon with duration

**Real-time Features:**
- Update notifications: Toast messages in top-right
- Live status dots: Small green circles next to live elements
- Countdown timers: Red text for urgency
- Progress bars: For game completion status
- Auto-refresh indicators: Spinner icons during updates

**Community Statistics:**
- Total players: Large number display with icons
- Prize pools: Dollar amounts with colored backgrounds
- Regional participation: Map visualization area
- Social sharing: Button cluster with platform icons

**Winner Announcements:**
- Container: Gold gradient background for winners
- Trophy icons: Large centered trophies
- Winner badges: Special colored badges with names
- Prize details: Clear typography with amounts/details
- Contact instructions: Highlighted call-to-action buttons

**Responsive Design:**
- Mobile: Single column leaderboards, collapsible sections
- Tablet: 2-column layout for smaller leaderboards
- Desktop: Multi-column grid layout, full table displays
- Large screens: Side-by-side game categories

**Live Update Animations:**
- New entries: Slide-in animation from top
- Score changes: Highlight with color pulse
- Position changes: Smooth vertical movement
- Status updates: Fade transition between states
- Loading states: Skeleton loaders maintaining layout

**Typography Scale:**
- Page title: text-4xl (36px)
- Category headers: text-2xl (24px)
- Game titles: text-xl (20px)
- Player names: text-base (16px), font-medium
- Scores: text-base (16px)
- Helper text: text-sm (14px)
- Timestamps: text-xs (12px)

**Color Coding System:**
- Leaderboard positions: Gold (1st), Silver (2nd), Bronze (3rd)
- Play types: Cash (green), Charity (blue), Prize (purple), Fun (gray)
- Game status: Active (purple), Pending (gray), Complete (green)
- Live indicators: Red for live, blue for pre-show, green for final

**Status & Badge System:**
- Winner badges: Gold background with trophy icons
- Live indicators: Pulsing red dots
- Play type badges: Small rounded pills with icons
- Position rankings: Numbered badges with color coding
- Update timestamps: "Updated X seconds ago" in small text

**Interactive Elements:**
- Expandable sections: Accordion-style for detailed stats
- Sort controls: Dropdown menus for leaderboard sorting
- Filter options: Checkboxes for play types and games
- Share buttons: Social media integration
- Refresh button: Manual update trigger

**Spacing Framework:**
- Section spacing: mb-12 (48px) between major categories
- Card spacing: mb-6 (24px) between game cards
- Row spacing: py-2 (8px) for leaderboard rows
- Grid gaps: gap-6 (24px) for card grids
- Button spacing: gap-4 (16px) between action buttons

**Performance Optimizations:**
- Lazy loading: For non-visible leaderboards
- Virtual scrolling: For large participant lists
- Debounced updates: To prevent excessive re-renders
- Cached data: For completed games and static content
- Progressive enhancement: Core functionality without JavaScript

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


## SETLIST BUILDER RESULTS DESCRIPTION
Source: setlistbuilderresults_description

Setlist Builder Results Page:


Title: View Guess the Setlist Results
Top navigation bar: Links to “How to Play”, “View Results”, “Sign In/Sign Up”

Main Content

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content

Element 1:
Contains our Set 1, Set 2, Encore template

Songs added in real time through setlist.fm API (if they let us), or manually

Set 1:


Set 2:
Drums/Space
[Variable number of slots after Drums/Space]

Encore:
[Variable number of slots for encore 1, encore 2, etc]






Element 2: to the right of element 1; real time scrolling display of top usernames and results


Bottom Navigtation Bar: Links to “Terms of Service”, “About this App”, “Privacy Policy
Bottom Text: Copyright 2025, Setlist Street


## GUESS SONG RESULTS DESCRIPTION
Source: guessthesongresults_description

Guess the Opener/Encore/Bust Out Results Page

 (this same architecture can be used for Guess the Opener, Guess the Encore, Guess the Bust Out games) 

Title: View Setlist Bingo Results
Top navigation bar: Links to “How to Play”, “View Results”, “Sign In/Sign Up”

Main Content

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content

Element 1:
[Wheel of fortune wheel] that lands on the correct song. (Updated either through setlist.fm api or manually if they don't give permission

Element 2: to the right of element 1; real time scrolling display of top usernames and results


Bottom Navigtation Bar: Links to “Terms of Service”, “About this App”, “Privacy Policy
Bottom Text: Copyright 2025, Setlist Street


## SETLIST BINGO RESULTS DESCRIPTION
Source: setlistbingoresults_description

Setlist Bingo Results Page:

Title: View Setlist Bingo Results
Top navigation bar: Links to “How to Play”, “View Results”, “Sign In/Sign Up”

Main Content

Element 1
Selector for each of the three shows: 
Text: Choose your show:
Toggle Buttons: [Show 1: Friday, August 1], [Show 2: Saturday, August 2], [Show 3: Sunday, August 3]

Main Content

Element 1: Bingo Grid matching format from setlistbingo.tsx: songs get filled in dynamically through setlist.fm api or manually (if they don't give us permission

Element 2: to the right of element 1; real time scrolling display of top usernames and results


Bottom Navigtation Bar: Links to “Terms of Service”, “About this App”, “Privacy Policy
Bottom Text: Copyright 2025, Setlist Street


===============================================================================
USER PAGES
===============================================================================

## SIGNUP FORM DESCRIPTION
Source: signupform_description

Sign Up Form Page: signupform.tsx

Title at top: "Sign Up / Register"
Subtext: "Sign up in order to win prizes."

Top navigation bar: Links to "How to Play", "View Results", "Sign In/Sign Up"

**SHOW INFORMATION:**
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3
Submission deadline: 7:00 PM PT before each show

Main Content

Form fields to fill in:
Leaderboard Display Name: Allow type in or randomly generated. (Public facing name)
Full Name
Email: 
Phone
Payment Method (if playing for prize, cash or charity): Enable Stripe payment buttons or crypto

Preferred Charity (Optional): Have dropdown of charities or allow type in

Checkbox for reading terms of service
Checkbox agreeing to be contacted regarding winnings

**TECHNICAL SPECS:**
- Account required for Cash, Prize, and Charity play types
- Fun play type allows anonymous participation
- Payment integration: Stripe and crypto options
- User can play multiple games on multiple shows
- Account saves game history and results

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy"
Bottom Text: Copyright 2025, Setlist Street


===============================================================================
ADMIN & TECHNICAL
===============================================================================

## ADMIN DESCRIPTION
Source: admin_description

Admin Portal: admin.tsx

**ADMIN INTERFACE FOR DEAD & COMPANY SETLIST STREET**

**PURPOSE:**
Administrative interface for submitting actual setlists and scoring player predictions for Dead & Company shows at GD60 (Grateful Dead 60th Anniversary concerts).

**ACCESS CONTROL:**
- Admin-only access required
- Secure authentication for setlist submission
- Real-time scoring capabilities

**MAIN FEATURES:**

**1. GAME SELECTION:**
- Grid display of all active games
- Shows game type and date
- Displays count of existing predictions to score
- Visual selection with highlighted active game

**2. SHOW SELECTION:**
- Dead & Company specific show selector
- Shows: Friday 8/1, Saturday 8/2, Sunday 8/3, 2025
- Golden Gate Park, San Francisco
- No band selection needed (Dead & Company only)

**3. LIVE SHOW STATUS:**
- Real-time show tracking
- Current song being played
- Set status (Set 1/2, song position)
- Active prediction count
- Live scoring status updates

**4. SETLIST SUBMISSION:**
- Large textarea for actual setlist entry
- One song per line format
- Real-time preview with song count
- Example format provided
- Validates before submission

**5. SCORING SYSTEM:**
- Processes all player predictions against actual setlist
- Updates leaderboards in real-time
- Handles multiple game types simultaneously
- Provides confirmation of scoring completion

**INTERFACE DESIGN:**
- Gradient background with animated elements
- Glass-morphism cards with backdrop blur
- White text on dark gradient background
- Motion animations for smooth transitions
- Responsive grid layouts

**WORKFLOW:**
1. Admin selects active game from grid
2. Chooses specific show date
3. Monitors live show status
4. Enters actual setlist as songs are played
5. Submits for automatic scoring
6. System updates all player results

**TECHNICAL SPECS:**
- Supabase integration for data management
- Real-time updates via WebSocket connections
- Framer Motion animations
- Responsive design for mobile admin access
- Error handling and validation

**SECURITY:**
- Admin authentication required
- Secure setlist submission endpoints
- Audit trail for all scoring actions
- Protected against unauthorized access

**REMOVED FEATURES:**
- Band selection (no longer needed - Dead & Company only)
- Multi-band configuration options
- Generic band templates

This streamlined admin interface focuses specifically on Dead & Company show management for the GD60 anniversary concerts, eliminating unnecessary band selection complexity. 

===============================================================================
LEGAL & TERMS
===============================================================================

## TERMS OF SERVICE DESCRIPTION
Source: termsofservice_description

Terms of Service Page: terms-of-service.tsx

Title at top: "Terms of Service"

Top navigation bar: Links to "How to Play", "View Results", "FAQ", "Sign In/Sign Up"

Main Content

**PLACEHOLDER LEGAL TERMS**
[Complete terms of service to be added by legal team]

**Key Points to Include:**
- User account responsibilities
- Payment and refund policies
- Prize distribution terms
- Charity donation handling
- Scoring and rule interpretation final authority
- Prohibited activities and fair play requirements
- Tax reporting responsibilities
- Age requirements and eligibility

**Image & Content Disclaimer:**
All images, graphics, icons, and visual elements displayed in this application were created using artificial intelligence generation tools. Any resemblance to existing trademarked, copyrighted, or proprietary visual content is purely coincidental and unintentional. This application is an independent fan-created project with no official affiliation to the Grateful Dead, Dead & Company, their management, record labels, or any associated commercial entities.

**Intellectual Property:**
- Game concepts and scoring algorithms are original creations
- Song titles and setlist data are factual information in the public domain
- User-generated predictions and game entries remain user property
- Platform software and unique features are proprietary to Setlist Street

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street


===============================================================================
PLANNING & REQUIREMENTS
===============================================================================

## USER STORIES & REQUIREMENTS
Source: user_stories_description

User Stories & Requirements: user-stories.md

**SETLIST STREET - USER STORIES & REQUIREMENTS**

**🎸 EPIC USER STORY:**
As a Deadhead fan, I want to guess and compete on Dead & Company setlists in real-time, so that I can test my knowledge, connect with fellow fans, and win prizes or support charity during live shows.

**🧩 CORE USER STORIES:**

**1. Pre-Show Prediction Experience**
As an in-venue attendee, I want to submit my predicted setlist before each show, so that I can track my accuracy against other fans at the show.

As a remote viewer, I want to participate live from afar, so that I can still join the fun while streaming or following online.

As a casual fan, I want to play prediction games for free, so that I can enjoy the experience without financial commitment while still competing for bragging rights.

As a strategic player, I want to choose between different game types (cash, charity, prizes, fun), so that I can play according to my preferences and budget.

**2. Live Show Experience**
As a competitive user, I want to see a leaderboard, so that I can compare my predictions with other fans in real-time.

As a live show participant, I want real-time updates during the performance, so that I can see how my predictions are scoring as songs are played.

As a next-song guesser, I want to predict the immediate next song during live shows, so that I can participate in real-time community prediction with live voting charts.

As a mobile user at the venue, I want a fully responsive interface, so that I can easily participate on my phone while at the show.

**3. Data-Driven Strategy**
As a community member, I want to view historical patterns or stats of setlists, so that I can learn what tends to appear in each show over time.

As a statistical user, I want probability tooltips when selecting songs, so that I can make more informed predictions based on historical data.

As a data enthusiast, I want access to the Setlist Hints page, so that I can analyze song position probabilities, pairing statistics, and venue-specific patterns.

As a pattern analyst, I want machine learning insights, so that I can understand advanced statistical relationships between songs and show factors.

**4. Community & Social Features**
As a social user, I want to share my wins and predictions on social media, so that I can celebrate with friends and attract other fans to the platform.

As a community member, I want to see total participation numbers and prize pools, so that I can feel part of a larger community event.

As a friend group, I want to compare our predictions and results, so that we can compete and strategize together.

As a regional participant, I want to see geographic participation data, so that I can connect with fans from my area.

**5. Prize & Charity Features**
As an admin or organizer, I want to set up prize or charity features, so that I can incentivize participation and support good causes.

As a charity supporter, I want to donate entry fees to causes I care about, so that I can support charity while enjoying the games.

As a prize winner, I want clear instructions for claiming rewards, so that I can easily receive my winnings or prizes.

As a cash game player, I want secure payment processing, so that I can confidently enter paid competitions.

**6. Game Variety & Complexity**
As a simple game player, I want straightforward prediction games (opener, encore), so that I can participate without learning complex rules.

As a strategic player, I want complex games like Setlist Builder, so that I can use detailed knowledge for higher point potential.

As a timing enthusiast, I want to predict show timing aspects (start time, break length, end time), so that I can use my knowledge of venue and band patterns.

As a reverse-psychology player, I want to predict songs that WON'T be played, so that I can use a different strategic approach.

As a bingo player, I want visual bingo boards that update in real-time, so that I can track my progress and compete for pattern completion.

**7. Technical & Accessibility**
As a user with disabilities, I want accessible interfaces with screen reader support, so that I can fully participate regardless of ability.

As a mobile-first user, I want touch-optimized interfaces, so that I can easily use the app on smartphones and tablets.

As a user experiencing connectivity issues, I want offline functionality for viewing results, so that I can check my standings even with poor internet.

As a user in different time zones, I want clear deadline information, so that I know exactly when submissions close relative to my location.

**8. Administrative & Content Management**
As an admin, I want real-time control over game status, so that I can handle technical issues or delays during live shows.

As an admin, I want manual setlist entry capabilities, so that I can ensure accurate results if automated systems fail.

As a content manager, I want sponsor integration tools, so that I can manage partnerships and promotional content.

As a support team member, I want user communication tools, so that I can help participants with issues during events.

**9. Future Growth & Expansion**
As a fan of other jam bands, I want versions for Phish, Widespread Panic, DMB, etc., so that I can use this concept for all my favorite artists.

As a tour follower, I want year-round prediction games, so that I can stay engaged with the platform between major events.

As an app developer collaborator, I want to partner on band-specific versions, so that we can expand to new audiences with expert knowledge.

As a mobile app user, I want native iOS/Android apps, so that I can have enhanced features like push notifications and offline functionality.

**10. Game Innovation & Features**
As a creative user, I want to suggest new game ideas, so that I can help evolve the platform with innovative prediction concepts.

As a real-time participant, I want live chat during shows, so that I can discuss predictions and celebrate with other fans.

As a streak player, I want bonus points for consecutive correct predictions, so that I can be rewarded for sustained accuracy.

As a venue expert, I want location-specific insights, so that I can use my knowledge of how the band performs at different venues.

**🎯 ACCEPTANCE CRITERIA PATTERNS:**

**User Interface:**
- All games must be playable on mobile devices
- Response times under 2 seconds for all interactions
- Accessibility compliance (WCAG AA)
- Consistent visual design across all game types

**Payment & Security:**
- Secure payment processing for all paid games
- Clear pricing and fee structures
- Transparent prize distribution processes
- Data protection and privacy compliance

**Real-Time Features:**
- Live updates during shows with < 30 second delay
- Reliable leaderboard synchronization
- Graceful handling of connectivity issues
- Manual override capabilities for admin

**Community Features:**
- Social sharing integration
- Leaderboard and statistics tracking
- Communication tools for user support
- Regional and demographic analytics

**Content Management:**
- Flexible sponsor integration
- Easy game configuration
- Historical data preservation
- Scalable architecture for growth

**🔄 USER JOURNEY MAPPING:**

**Pre-Event Journey:**
1. Discover platform → Learn about games → Create account
2. Browse game types → Read rules and FAQs → View historical data
3. Select games → Make predictions → Complete payment
4. Receive confirmation → Share with friends → Wait for event

**Live Event Journey:**
1. Receive notifications → Open app → View real-time updates
2. Track predictions → See leaderboards → Participate in live games
3. Celebrate wins → Share results → Engage with community
4. Monitor prize status → Plan for next event

**Post-Event Journey:**
1. Review final results → Claim prizes → Analyze performance
2. Study statistics → Plan improvements → Provide feedback
3. Share experience → Recruit friends → Prepare for future events

**🚀 FUTURE ENHANCEMENT STORIES:**

As a VIP user, I want premium features like advanced analytics and early access, so that I can have an enhanced experience.

As a band member or crew, I want to interact with fan predictions, so that we can engage with our community in new ways.

As a venue operator, I want to partner with prediction platforms, so that we can enhance the fan experience at our shows.

As a music journalist, I want access to prediction data and trends, so that I can write informed articles about fan engagement and expectations.

**📊 SUCCESS METRICS:**

**User Engagement:**
- Daily/monthly active users
- Games played per user
- Session duration and return visits
- Social sharing and referral rates

**Financial Performance:**
- Revenue per user
- Prize pool growth
- Sponsor partnership value
- Payment conversion rates

**Community Health:**
- User-generated content
- Support ticket resolution
- Community feedback scores
- Feature request adoption

**Technical Performance:**
- System uptime during events
- Real-time update reliability
- Mobile performance metrics
- Security incident prevention

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy", "FAQ"
Bottom Text: Copyright 2025, Setlist Street 

===============================================================================
END OF MASTER CONSOLIDATED DESCRIPTIONS
===============================================================================
