# SETLIST STREET - MASTER CONSOLIDATED DESCRIPTIONS
# Generated automatically from individual description files
# Last updated: 2025-07-20T02:22:42.004Z

===============================================================================
MAIN PAGES
===============================================================================

## HOMESCREEN DESCRIPTION
Source: homescreen_description

Homescreen: index.tsx

Title at top: "Setlist Street"

Top navigation bar: Links to "How to Play", "FAQ", "Sign In", "Sign Up" 
**NAVIGATION IMPROVEMENTS:** Properly right-aligned with better spacing, mobile menu functionality added

**GRATEFUL DEAD 60TH ANNIVERSARY CONCERTS (GD60) - DEAD & COMPANY EXCLUSIVE**
Golden Gate Park, San Francisco
Dead & Company shows: Friday 8/1, Saturday 8/2, Sunday 8/3, 2025

**RECENT MAJOR LAYOUT IMPROVEMENTS:**
- Enhanced global container padding system (px-12 sm:px-16 lg:px-20 xl:px-24)
- Additional content margins (px-4 sm:px-6 lg:px-8) for extra breathing room
- Eliminated all edge-to-edge containers across the site
- Better vertical spacing between all page elements
- Show schedule now compact and horizontal (not vertical)
- Footer elements in individual containers with proper padding to prevent clumping
- All game containers properly contained within generous margins

**SHOW SCHEDULE:**
Horizontal layout with three cards side-by-side:
- Show 1: Friday, August 1 | Deadline: 7:00 PM PT
- Show 2: Saturday, August 2 | Deadline: 7:00 PM PT  
- Show 3: Sunday, August 3 | Deadline: 7:00 PM PT

**MAIN GAMES GRID - CONSOLIDATED TO 5 GAMES:**
Grid layout: 1 column mobile → 2 medium → 3 large → 5 extra-large

1. **Song Prediction Games** (Hub page with 9 games organized by show structure)
2. **Fantasy Setlist** (Renamed from "Setlist Builder" - full setlist prediction)
3. **Setlist Bingo** (5x5 bingo card with drag-and-drop)
4. **Timing Predictions** (Hub page with 3 timing games)
5. **Guess Next Song (Live)** (Featured - real-time during shows)

**GAME COUNT BANNER:**
"16 Games Available | Statistical Insights | Cash Prizes | Charity Donations | Exclusive Prizes"

**TOOLS & RESULTS GRID:**
2-column section for utility functions:
- Setlist Hints & Statistics → /setlist-hints
- Live Results → /view-results

**DESIGN IMPROVEMENTS:**
- No placeholder icons ("G" or "T") on game cards
- Consistent purple theming throughout
- Better hover effects and visual feedback
- Enhanced responsive design with generous margins on all screen sizes
- No edge-to-edge content - proper padding throughout

**FOOTER IMPROVEMENTS:**
- Individual containers for each footer element with proper left/right padding
- Terms of Service | About this App | Privacy Policy evenly spaced
- No more clumping - each element has breathing room

**CONTACT:** All email references updated to setliststreet@proton.me

**FOOTER IMPROVEMENTS:**
Horizontal layout: Terms of Service | About this App | Privacy Policy
© 2025 Setlist Street. All rights reserved.

## ABOUTHEAPP DESCRIPTION
Source: aboutheapp_description

About This App Page: about-this-app.tsx

Title at top: "About Setlist Street"

Top navigation bar: Links to "How to Play", "FAQ", "Sign In", "Sign Up" (properly right-aligned)

**LAYOUT IMPROVEMENTS:**
- Enhanced margins and proper container spacing
- Better visual hierarchy and typography
- Improved responsive design

**APP DESCRIPTION:**
Setlist Street is the ultimate prediction platform for Grateful Dead and Dead & Company fans. Test your knowledge of setlist patterns, song relationships, and band tendencies across multiple game formats.

**GAME CATEGORIES:**
- Song Prediction Games (9 games organized by show structure)
- Fantasy Setlist Builder (complete setlist construction)
- Setlist Bingo (5x5 card with strategic song placement)
- Timing Games (start times, end times, set lengths)
- Live Games (real-time predictions during shows)

**RECENT IMPROVEMENTS:**
- Redesigned user interfaces with intuitive left-right workflows
- Enhanced drag-and-drop functionality
- Standardized payment sections across all games
- Improved mobile responsiveness
- Better visual feedback and game progression tracking

**CONTACT INFORMATION:**
For game ideas, comments, technical feedback, or collaboration opportunities, feel free to email: setliststreet@proton.me

**TECHNICAL FEATURES:**
- Real-time pool size displays
- Live countdown timers to submission deadlines
- Statistical insights and historical data
- Multiple payment options (fun, charity, cash, prizes)
- Community leaderboards and results tracking

**FOOTER:**
Horizontal layout: Terms of Service | About this App | Privacy Policy
Email: setliststreet@proton.me
© 2025 Setlist Street. All rights reserved.

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

Top navigation bar: Links to "How to Play", "FAQ", "Sign In", "Sign Up" (properly right-aligned)

**LAYOUT IMPROVEMENTS:**
- Better margins and spacing throughout
- No edge-to-edge containers
- Enhanced visual hierarchy

**CONTACT INFORMATION UPDATES:**
All email addresses changed from @setliststreet.com to setliststreet@proton.me:

**Game Ideas & Suggestions:**
Q: Can I suggest new game ideas?
A: We love community input! Send your game ideas to setliststreet@proton.me. Include a brief description of how the game would work and what makes it fun or challenging.

**Sponsorship Inquiries:**
Q: How can my company sponsor Setlist Street?
A: We welcome sponsors who want to support the Grateful Dead community! Contact setliststreet@proton.me for partnership opportunities. We offer various sponsorship tiers and custom packages.

**Bug Reports & Technical Support:**
Q: I found a bug. How do I report it?
A: Please report bugs to setliststreet@proton.me with details about what happened, what browser you're using, and steps to reproduce the issue. We respond to bug reports within 24 hours.

**General Contact:**
Email us at setliststreet@proton.me

**STANDARDIZED LAYOUT:**
- Consistent spacing between FAQ sections
- Better responsive design for mobile/desktop
- Improved visual hierarchy

**FOOTER IMPROVEMENTS:**
Horizontal layout: Terms of Service | About this App | Privacy Policy
© 2025 Setlist Street. All rights reserved.

**KEY FAQ TOPICS:**
- Account creation and gameplay
- Scoring systems and deadlines
- Payment methods and prize distribution
- Technical requirements and support
- Community guidelines and suggestions
- Future tour games and features

===============================================================================
CORE GAME PAGES - MAIN GAMES
===============================================================================

## GUESSTHEEOPENER DESCRIPTION
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

## GUESSTHEENCORE DESCRIPTION
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

## GUESSTHEBUSTOUT DESCRIPTION
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

## SETLISTBINGO DESCRIPTION
Source: setlistbingo_description

Setlist Bingo Game Page: setlist-bingo.tsx

Title at top: "Setlist Bingo"

Top navigation bar: Links to "How to Play", "FAQ", "Sign In", "Sign Up" (properly right-aligned)

**MAJOR LAYOUT REDESIGN - THREE COLUMN LAYOUT:**
- Complete 7-column grid system for optimal user experience
- Song candidates positioned on LEFT (2/7 width)
- Bingo board positioned in CENTER (3/7 width)
- Hints & stats positioned on RIGHT (2/7 width)
- Enhanced visual hierarchy and streamlined workflow

**MAIN BINGO BUILDER:**
Three-column grid layout system (2/7 + 3/7 + 2/7 width):

**LEFT SIDE - Song Candidates (2/7 width):**
- Search input with instant filtering
- Limited display (15 songs visible with scrolling)
- "+X more songs (search to filter)" indicator
- Popular songs section with blue hover effects
- Clear instructions: "Available Songs → Drag to Board"
- Board control buttons (Generate Random, Clear Board)

**CENTER - Bingo Board (3/7 width):**
- 5x5 bingo grid as main focus
- "Your Bingo Card → Drop Songs Here" heading
- Enhanced visual design with better contrast
- FREE space in center with purple styling
- **IMPROVED X BUTTON POSITIONING:** Close buttons now positioned above song text for better visibility
- Progress tracking with purple-themed status box

**RIGHT SIDE - Hints & Stats (2/7 width):**
- Quick Stats section with song probabilities
- Strategy Tips for better gameplay
- Winning Patterns reference
- Song Statistics (Most Common, Rarest, Best Opener, Common Pairs)
- All hints now positioned to the right of the board instead of below

**BOARD FEATURES:**
- Drag and drop from left candidates to center board squares
- Click to add first search result to square
- Visual feedback during drag operations
- Progress indicator: "Filled X/25 squares"
- "Need at least 20 songs to submit" guidance
- **FIXED X BUTTON VISIBILITY:** Close buttons positioned clearly above song text with white borders

**WINNING CONDITIONS:**
- Any complete row (5 songs)
- Any complete column (5 songs) 
- Any complete diagonal (5 songs)
- Four corners (4 songs)

**STANDARDIZED PAYMENT SECTION:**
Horizontal 4-column grid below main builder:
- Play for Fun | Play for Charity | Play for Cash | Play for Prize
- Auto-submission when mode selected
- Consistent spacing and visual design
- No redundant submit buttons

**USER EXPERIENCE IMPROVEMENTS:**
- X close buttons no longer cover song text
- Better positioning with white borders and higher z-index
- Enhanced readability and visual clarity
- Improved interaction feedback

**CONTACT:** setliststreet@proton.me

## SETLISTBUILDER DESCRIPTION
Source: setlistbuilder_description

Fantasy Setlist Game Page: setlist-builder.tsx (RENAMED from "Setlist Builder" to "Fantasy Setlist")

Title at top: "Fantasy Setlist"

Top navigation bar: Links to "How to Play", "FAQ", "Sign In", "Sign Up" (properly right-aligned with better spacing)

**RECENT MAJOR LAYOUT IMPROVEMENTS:**
- Redesigned with intuitive left-right workflow
- Song candidates positioned on LEFT (2/5 width)
- Setlist builder positioned on RIGHT (3/5 width)
- Enhanced margins and spacing throughout
- No edge-to-edge containers - proper padding system
- Hints moved to sidebar for space efficiency
- Auto-submission when play mode selected

**COUNTDOWN TIMER:**
Live countdown to 7:00 PM PT deadline for next show
Shows: Friday 8/1, Saturday 8/2, Sunday 8/3

**MAIN BUILDER LAYOUT:**
Two-column grid system (2/5 + 3/5 width):

**LEFT SIDE - Song Candidates (2/5 width):**
- Limited song display (20 visible with scrolling)
- Search functionality with instant filtering
- "+X more songs (search to filter)" indicator
- Blue hover effects for drag interactions
- Clear instructions: "Available Songs"

**RIGHT SIDE - Setlist Builder (3/5 width):**
Grid layout for different sections:
- Set 1: Drag and drop song slots
- Set 2 (Before Drums/Space): Song slots
- Drums/Space notice (spans full width with emojis 🥁🚀)
- Set 2 (After Drums/Space): Song slots  
- Encore: Final song slots

Each section uses drag-and-drop from left candidates to right builder
Purple numbering system for setlist order
Enhanced visual feedback during drag operations

**HINTS SIDEBAR:**
Sticky positioned sidebar with:
- Quick Stats (opener probabilities, common closers, popular pairings)
- Pro Tips (strategy advice)
- Live Preview (current setlist progress)

**STANDARDIZED PAYMENT SECTION:**
Horizontal 4-column grid layout:
- Play for Fun | Play for Charity | Play for Cash | Play for Prize
- Auto-submission when mode selected (no separate submit button)
- Consistent spacing and responsive design
- Amount selection for charity/cash modes

**COMPLEX SCORING SYSTEM:**
- Exact song in exact position = 20 points
- Correct song in wrong position = 10 points
- Bonus points for rare songs and perfect sequences
- Song pairs and sequences count as additional scoring opportunities

**CONTACT:** All email references updated to setliststreet@proton.me

Bottom Navigation Bar: Links to "Terms of Service", "About this App", "Privacy Policy" (horizontal with even spacing)
Bottom Text: © 2025 Setlist Street. All rights reserved.

===============================================================================
TIMING GAMES
===============================================================================

## GUESSTHESTARTTIME DESCRIPTION
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

## GUESSTHEENDTIME DESCRIPTION
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

## GUESSTHESETBREAKLENGTH DESCRIPTION
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

## GUESSTHESET2OPENER DESCRIPTION
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

## GUESSTHESET1CLOSER DESCRIPTION
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

## GUESSTHESET2CLOSER DESCRIPTION
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

## GUESSTHEPREDRUMSSONG DESCRIPTION
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

## GUESSTHEPOSTDRUMSSONG DESCRIPTION
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

## GUESSSONGS NOTPLAYED DESCRIPTION
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

===============================================================================
RESULTS PAGES
===============================================================================

## RESULTSPAGE DESCRIPTION
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

## SETLISTBUILDERRESULTS DESCRIPTION
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

## GUESSTHESONGRESULTS DESCRIPTION
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

## SETLISTBINGORESULTS DESCRIPTION
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

## SIGNUPFORM DESCRIPTION
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

## TERMSOFSERVICE DESCRIPTION
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
END OF MASTER CONSOLIDATED DESCRIPTIONS
===============================================================================