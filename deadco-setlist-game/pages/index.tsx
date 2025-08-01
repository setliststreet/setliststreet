import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';
import GuestSignupModal from './modals/GuestSignupModal';
import { createClient } from '@supabase/supabase-js';
import { clearGuestEmail, getGuestEmail } from '@/lib/guestHelpers';
import { color } from 'framer-motion';

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
            <br />
           <span style={{ color: "#000", fontSize: '14px' }}>
            click more ⬇️
          </span>
          </h2>
          <br />
        </div>

        {showScheduleOpen && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div
            className="transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{
              background: `linear-gradient(135deg, #ffecd2, #fcb69f)`,
              color: SetlistStreetTheme.colors.neutrals.black,
              padding: SetlistStreetTheme.layout.containerPadding,
              borderRadius: SetlistStreetTheme.layout.borderRadius,
              border: `2px solid ${SetlistStreetTheme.components.card.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
            }}
          >
            <h3 className="font-bold text-pink-600 text-sm">🎮 Show 1</h3>
            <p className="text-gray-800 text-sm mt-1 font-medium">Friday, August 1</p>
            <div className="text-xs text-blue-700 font-semibold mt-1">
              Guest: Billy Strings
            </div>
            <p className="text-xs text-gray-700 mt-1">Music starts 4 pm</p>
          </div>


            <div className="countdown-between"></div>

            <div
            className="transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{
              background: `linear-gradient(135deg, #ffecd2, #fcb69f)`,
              color: SetlistStreetTheme.colors.neutrals.black,
              padding: SetlistStreetTheme.layout.containerPadding,
              borderRadius: SetlistStreetTheme.layout.borderRadius,
              border: `2px solid ${SetlistStreetTheme.components.card.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
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
            className="transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{
              background: `linear-gradient(135deg, #ffecd2, #fcb69f)`,
              color: SetlistStreetTheme.colors.neutrals.black,
              padding: SetlistStreetTheme.layout.containerPadding,
              borderRadius: SetlistStreetTheme.layout.borderRadius,
              border: `2px solid ${SetlistStreetTheme.components.card.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
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
    // {
    //   title: 'Setlist Bingo',
    //   description: 'Create a 5x5 bingo card with Dead & Company songs. Get lines, columns, diagonals, or four corners during the show!',
    //   href: '/setlist-bingo',
    //   category: 'Bingo Game',
    //   featured: false,
    //   gameCount: '25 squares'
    // },
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
      <div className="sfs-game-card">

        <h3 className="sfs-game-title">{game.title}</h3>
        
        <p className="text-base">{game.description}</p>

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
      <div className='countdown-outer'></div>

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

<div className='countdown-outer'></div>

      {isGuestRegistered ? (
        <div className="text-green-600">🎉 You are logged in!</div>
      ) : (
        <div className="text-yellow-600 bg-amber-900">⚠️ Please register or enter your email.</div>
      )}

      </div>


    
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="countdown-outer">
</div>
   <h1 className="logo-text">SETLIST STREET</h1>
      </div>

<div className="text-center mb-16 relative">
  {/* Enhanced Glass Background */}
  <div className="absolute inset-0 backdrop-blur-xl bg-black/60 z-0 rounded-2xl shadow-2xl border border-white/20"></div>

  {/* Highlighted Content */}
  <div className="relative z-10 p-8 max-w-4xl mx-auto rounded-2xl text-white">
    <p className="subtitle-font text-lg leading-relaxed">
      Created in honor of the
      <span className="font-semibold text-purple-300"> Grateful Dead 60th Anniversary concerts</span> — 
      a series of
      <span className="font-semibold text-indigo-300"> setlist prediction games</span>.
    </p>

    <p className="subtitle-font text-lg leading-relaxed mt-3">
      <span className="font-semibold text-blue-300">16 Games Available</span> |
      <span className="font-semibold text-green-300"> Statistical Insights</span> |
      <span className="font-semibold text-yellow-300"> Cash Prizes</span> |
      <span className="font-semibold text-pink-300"> Charity Donations</span> |
      <span className="font-semibold text-red-300"> Exclusive Prizes</span>
    </p>
  </div>
</div>

      {/* Show Schedule - Properly Contained */}

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
         {/* Countdown */}
                    <div className='countdown-outer'></div>

          <div className='center-wrapper'>
          <div className="custom-button bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Next Submission Deadline
            </h2>
            <div className="text-3xl font-bold text-purple-600">
              {timeToDeadline}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Submissions close at 7:00 PM PT before each show
            </p>
          </div>
          </div>
          <div className='countdown-outer'></div>

      {/* All Games - 3 Column Layout with Centered Game Cards */}
    
    
      <div className="mb-8 mt-8"
      >
                  <br />
                                 
       <div className="w-full max-w-4xl mx-auto">
<div className="flex justify-center mb-8">
  <div className="choose-game-card">
    Choose Your Game
  </div>
</div>



<div className="flex justify-center">
  <div className="w-full max-w-4xl px-2">
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {mainGames.map((game, index) => {
        const isSongGame = game.title === 'Song Prediction Games';

        return (
          <div
            key={index}
            className="show-selector-button"
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

      {/* Utility Tools - Force Visible Margins */}
      {/* Remove the UtilityCard and utilityLinks rendering section entirely. Do not render any tools/results cards or sections. */}
   </>
   )}




    </MainLayout>
  );



};

export default HomePage;