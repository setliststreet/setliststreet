import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';
import GuestSignupModal from './modals/GuestSignupModal';
import { createClient } from '@supabase/supabase-js';
import { clearGuestEmail, getGuestEmail } from '@/lib/guestHelpers';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);


 export function ShowSchedule() {
  const [showScheduleOpen, setShowScheduleOpen] = useState(false);

  const toggleSchedule = () => {
    setShowScheduleOpen(!showScheduleOpen);
  };

  return (
    <div className="mb-8 mt-8">
      <div className="countdown-outer">
        <div className="center-wrapper">
          <h2 className="schedule-button" onClick={toggleSchedule}>
            SHOW SCHEDULE 📚
          </h2>
        </div>

        <div className="countdown-inner"></div>

        {showScheduleOpen && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div
              className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"
              style={{
                background: SetlistStreetTheme.backgrounds.card,
                color: SetlistStreetTheme.colors.neutrals.black,
                padding: SetlistStreetTheme.layout.containerPadding,
                borderRadius: SetlistStreetTheme.layout.borderRadius,
                border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                boxShadow: SetlistStreetTheme.components.card.shadow,
              }}
            >
              <h3 className="font-semibold text-purple-700 text-sm">Show 1</h3>
              <p className="text-gray-600 text-sm mt-1">Friday, August 1</p>
              <div className="text-xs text-blue-700 font-semibold mt-1">
                Guest: Billy Strings
              </div>
              <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
            </div>

            <div className="countdown-between"></div>

            <div
              className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"
              style={{
                background: SetlistStreetTheme.backgrounds.card,
                color: SetlistStreetTheme.colors.neutrals.black,
                padding: SetlistStreetTheme.layout.containerPadding,
                borderRadius: SetlistStreetTheme.layout.borderRadius,
                border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                boxShadow: SetlistStreetTheme.components.card.shadow,
              }}
            >
              <h3 className="font-semibold text-purple-700 text-sm">Show 2</h3>
              <p className="text-gray-600 text-sm mt-1">Saturday, August 2</p>
              <div className="text-xs text-blue-700 font-semibold mt-1">
                Guest: Sturgill “Johnny Blue Skies” Simpson
              </div>
              <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
            </div>

            <div className="countdown-between"></div>

            <div
              className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"
              style={{
                background: SetlistStreetTheme.backgrounds.card,
                color: SetlistStreetTheme.colors.neutrals.black,
                padding: SetlistStreetTheme.layout.containerPadding,
                borderRadius: SetlistStreetTheme.layout.borderRadius,
                border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                boxShadow: SetlistStreetTheme.components.card.shadow,
              }}
            >
              <h3 className="font-semibold text-purple-700 text-sm">Show 3</h3>
              <p className="text-gray-600 text-sm mt-1">Sunday, August 3</p>
              <div className="text-xs text-blue-700 font-semibold mt-1">
                Guest: Trey Anastasio Band
              </div>
              <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const HomePage = () => {
  const [timeToDeadline, setTimeToDeadline] = useState('');
    const [isGuestRegistered, setIsGuestRegistered] = useState(false);
const [loading, setLoading] = useState(true);



useEffect(() => {
    const handleSession = async () => {
      setLoading(true);

      await supabase.auth.signOut(); // Log out any current Supabase session

      const guestEmail = getGuestEmail();
      if (!guestEmail) {
        setIsGuestRegistered(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('guest_users')
        .select('email')
        .eq('email', guestEmail)
        .single();

      if (data && data.email) {
        setIsGuestRegistered(true);
      } else {
        setIsGuestRegistered(false);
      }

      setLoading(false);
    };

    handleSession();
  }, []);






  // 🧹 Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearGuestEmail();
    setIsGuestRegistered(false);
    setLoading(false);
    alert('✅ Logged out successfully');
  };






  // Calculate time to next 7PM PT deadline
  useEffect(() => {
    const calculateTimeToDeadline = () => {
      const now = new Date();
      const showDates = [
        new Date('2025-08-01T19:00:00-07:00'), // Friday 8/1 7PM PT
        new Date('2025-08-02T19:00:00-07:00'), // Saturday 8/2 7PM PT
        new Date('2025-08-03T19:00:00-07:00'), // Sunday 8/3 7PM PT
      ];

      // Find next upcoming deadline
      const nextDeadline = showDates.find(date => date > now);

      if (!nextDeadline) {
        setTimeToDeadline('All shows completed');
        return;
      }

      const timeDiff = nextDeadline.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeToDeadline(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeToDeadline();
    const interval = setInterval(calculateTimeToDeadline, 1000);

    return () => clearInterval(interval);
  }, []);

  // Consolidated games for main page - now 5 items including Setlist Bingo
  const mainGames = [
    {
      title: 'Song Prediction Games',
      description: 'Predict openers, closers, encores, bust outs, and more. 9 different song guessing games.',
      href: '/song-games',
      category: 'Multiple Games',
      featured: false,
      gameCount: '9 games'
    },
    {
      title: 'Fantasy Setlist',
      description: 'Build your complete fantasy setlist prediction like a fantasy sports league. Drag and drop songs to create your ideal show.',
      href: '/setlist-builder',
      category: 'Strategy Game',
      featured: false,
      gameCount: 'Full setlist'
    },
    {
      title: 'Setlist Bingo',
      description: 'Create a 5x5 bingo card with Dead & Company songs. Get lines, columns, diagonals, or four corners during the show!',
      href: '/setlist-bingo',
      category: 'Bingo Game',
      featured: false,
      gameCount: '25 squares'
    },
//     {
//       title: 'Timing Predictions',
//       description: 'Predict start times, end times, and set break lengths. Test your timing instincts.',
//       href: '/timing-games',
//       category: 'Multiple Games',
//       featured: false,
//       gameCount: '3 games'
//     },
//     {
//       title: 'Guess Next Song (Live)',
//       description: 'Real-time predictions during live shows with community voting and live updates.',
//       href: '/guess-next-song',
//       category: 'Live Game',
//       featured: true,
//       gameCount: 'Live only'
//     }
  ];

  // Utility pages
  const utilityLinks = [
    {
      title: 'Setlist Hints & Statistics',
      description: 'Historical data, song probabilities, and AI-powered insights',
      href: '/setlist-hints',
      category: 'Tools',
    },
    {
      title: 'Live Results',
      description: 'View leaderboards and real-time results',
      href: '/view-results',
      category: 'Results',
    }
  ];

 interface Game {
   title: string;
   description: string;
   href: string;
   category: string;
   featured?: boolean;
   gameCount?: string;
 }

const GameCard = ({
  game,
  index,
  total,
}: {
  game: Game;
  index: number;
  total: number;
}) => {
  return (
    <Link href={game.href} className="group no-underline block w-full h-full">
      <div className="game-card">
              <div className="countdown-inner"></div>

        <h3 className="text-xl font-bold mb-3">{game.title}</h3>
        <div className="countdown-inner"></div>
        <p className="text-base mb-4">{game.description}</p>
                <div className="countdown-inner"></div>

      </div>
    </Link>
  );
};

  const UtilityCard = ({ item }: { item: Game }) => (
    <Link href={item.href} className="group">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-gray-200 hover:border-gray-300">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {item.description}
          </p>
          <div className="text-xs text-blue-600 font-medium mt-3">
            {item.category}
          </div>

        </div>
      </div>

    </Link>
  );

  return (
    <MainLayout>

      <Head>

        <title>Setlist Street - GD60 Prediction Games</title>
        <meta name="description" content="Grateful Dead 60th Anniversary prediction games! 15 different games for Dead & Company at Golden Gate Park Aug 1-3, 2025." />
      </Head>

      <div className="countdown-inner"></div>
<div className="center-wrapper flex justify-center mb-8">
      <div className="flex justify-between items-center mb-4">
        {isGuestRegistered && (
          <button
            className="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {isGuestRegistered ? (
        <div className="text-green-600">🎉 You are logged in as a guest!</div>
      ) : (
        <div className="text-yellow-600">⚠️ Please register or enter your email.</div>
      )}

      </div>


    
      {/* Header Section */}
      <div className="text-center mb-16">
                        <div className="countdown-outer">
</div>
                                 <h1 className="logo-text">SETLIST STREET</h1>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">

        <div className=" rounded-lg p-8 max-w-4xl ">
                             <div className="countdown-inner">
          </div>
          <p className="subtitle-font">
            Created in honor of the <span className="font-semibold text-purple-700">Grateful Dead 60th Anniversary concerts</span> … a series of setlist prediction games.
          </p>
          <p className="subtitle-font">
            16 Games Available | Statistical Insights | Cash Prizes | Charity Donations | Exclusive Prizes
          </p>
                             <div className="countdown-inner">
          </div>
        </div>
      </div>

      {/* Show Schedule - Properly Contained */}

               <div className="countdown-inner">
</div>

<div className="center-wrapper flex justify-center">
  <ShowSchedule />
</div>


<div className="center-wrapper flex justify-center mb-8">

   {loading ? (
  <div className="text-center mt-20 text-gray-600">Loading...</div>
) : (
  <>
    {!isGuestRegistered && (
      <GuestSignupModal onSuccess={() => setIsGuestRegistered(true)} />
    )}

    {isGuestRegistered && (
      <>
        {/* Your full UI */}
      </>
    )}
  </>
)}


</div>

{isGuestRegistered && (
        <>





      {/* Countdown Timer */}



       <div className="w-full flex justify-center mb-8">
           <div className="next-submission flex flex-col items-center text-center">
             <div className="mb-4"

             style={{
                     fontSize: '30px',
                     fontWeight: '900',
                     color: '#9333ea',
                     marginBottom: '0.1rem',
                   }}
             >
               Next Submission Deadline
             </div>

             <div className="text-5xl font-extrabold text-purple-600 mb-4">
               {timeToDeadline}
             </div>

             <p className="text-sm text-gray-600">
               Submissions close at 7:00 PM PT before each show
             </p>
           </div>
         </div>

      {/* All Games - 3 Column Layout with Centered Game Cards */}
      <div className="mb-8 mt-8"
      >
                  <div className="countdown-outer"
                  >
                                 
       <div className="w-full max-w-4xl mx-auto">
         <div className="padding-between mb-20"></div>



<div className="flex justify-center mb-8">
  <div className="game-card">
    Choose Your Game
  </div>
</div>

<div className="countdown-inner"></div>



<div className="flex justify-center">
  <div className="w-full max-w-4xl px-4">
    <div className="flex flex-wrap justify-center">
     {mainGames.map((game, index) => {
       const colors = ['#e1a811', '#ff5733', '#3498db', '#2ecc71'];
       const bgColor = colors[index % colors.length];
       return (
         <div
           key={index}
           className="show-selector-button"
           style={{ backgroundColor: bgColor }}
         >
           <GameCard game={game} index={index} total={mainGames.length} />
         </div>
       );
     })}

    </div>

  </div>
</div>




















        </div>

        </div>

      </div>

      {/* Utility Tools - Force Visible Margins */}
      {/* Remove the UtilityCard and utilityLinks rendering section entirely. Do not render any tools/results cards or sections. */}
   </>
   )}
    </MainLayout>
  );



};

export default HomePage;