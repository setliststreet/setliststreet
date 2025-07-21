import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme.ts';


const HomePage = () => {
  const [timeToDeadline, setTimeToDeadline] = useState('');

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

  const GameCard = ({ game }: { game: Game }) => {
    return (
                        <div className="countdown-outer">

      <Link href={game.href} className="group">

                        <div className="countdown-inner"></div>

        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-gray-200 hover:border-gray-300 h-full">

                        <div className="countdown-inner"></div>

          <div className="flex flex-col items-center text-center h-full">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {game.title}
            </h3>
            <p className="text-gray-600 text-base mb-4">
              {game.description}
            </p>

            <div className="flex flex-col items-center gap-1 mt-auto">
              {/* Removed category and gameCount display */}
            </div>
          </div>
        </div>
      </Link>
       </div>
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

      {/* Header Section */}
      <div className="text-center mb-16">
                        <div className="countdown-outer">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Setlist Street
        </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 max-w-4xl mx-auto shadow-sm">
                             <div className="countdown-inner">
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Created in honor of the <span className="font-semibold text-purple-700">Grateful Dead 60th Anniversary concerts</span> … a series of setlist prediction games.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mt-4">
            16 Games Available | Statistical Insights | Cash Prizes | Charity Donations | Exclusive Prizes
          </p>
                             <div className="countdown-inner">
          </div>
        </div>
      </div>

      {/* Show Schedule - Properly Contained */}
      <div className="mb-8 mt-8">
                        <div className="countdown-outer">


        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Show Schedule
        </h2>
                          <div className="countdown-inner">
</div>

        <div className="flex flex-wrap justify-center gap-4"

        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"

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
            <div className="text-xs text-blue-700 font-semibold mt-1">Guest: Billy Strings</div>
            <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
          </div>
                                     <div className="countdown-between">
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"
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
            <div className="text-xs text-blue-700 font-semibold mt-1">Guest: Sturgill “Johnny Blue Skies” Simpson</div>
            <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
          </div>
                                     <div className="countdown-between">
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] max-w-[280px] text-center shadow-sm hover:shadow-md transition-shadow"
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
            <div className="text-xs text-blue-700 font-semibold mt-1">Guest: Trey Anastasio Band</div>
            <p className="text-xs text-gray-500 mt-1">Music starts 4 pm</p>
          </div>
        </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="mb-16"
        style={{
                                          background: SetlistStreetTheme.backgrounds.card,
                                          color: SetlistStreetTheme.colors.neutrals.black,
                                          padding: SetlistStreetTheme.layout.containerPadding,
                                          borderRadius: SetlistStreetTheme.layout.borderRadius,
                                          border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                                          boxShadow: SetlistStreetTheme.components.card.shadow,
                                        }}
     >

         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto text-center shadow-sm">
            <div className="countdown-outer">
           <h2 className="text-xl font-semibold text-gray-800 mb-4">
             Next Submission Deadline
           </h2>
           <div className="text-3xl font-bold text-purple-600 mb-4">
             {timeToDeadline}
           </div>
           <p className="text-sm text-gray-600">
             Submissions close at 7:00 PM PT before each show
           </p>

         </div>
         </div>


      </div>

      {/* All Games - 3 Column Layout with Centered Game Cards */}
      <div className="mb-8 mt-8"

      >


                  <div className="countdown-outer"
                  >


        <div className="grid grid-cols-12 max-w-4xl mx-auto"

        >
          {/* Left Padding */}
          <div className="col-span-3"></div>
          {/* Center: Game Cards */}
          <div className="col-span-6 flex flex-col gap-6"
            style={{
                                              background: SetlistStreetTheme.backgrounds.card,
                                              color: SetlistStreetTheme.colors.neutrals.black,
                                              padding: SetlistStreetTheme.layout.containerPadding,
                                              borderRadius: SetlistStreetTheme.layout.borderRadius,
                                              border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                                              boxShadow: SetlistStreetTheme.components.card.shadow,
                                            }}
          >


                  <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Choose Your Game</h2>
            {mainGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
                       <div className="countdown-outer">

        </div>.
          </div>
          {/* Right Padding */}
          <div className="col-span-3"></div>

        </div>
        </div>


      </div>

      {/* Utility Tools - Force Visible Margins */}
      {/* Remove the UtilityCard and utilityLinks rendering section entirely. Do not render any tools/results cards or sections. */}
    </MainLayout>
  );
};

export default HomePage;