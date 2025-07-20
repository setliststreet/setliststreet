import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';

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

  // All games organized in a unified grid system
  const allGames = [
    // Main Games (Row 1)
    {
      title: 'Guess the Opener',
      description: 'Predict which song will open each show',
      href: '/guess-opener',
      category: 'Main Game',
      featured: false,
    },
    {
      title: 'Guess the Encore',
      description: 'Predict the encore song for each show',
      href: '/guess-encore',
      category: 'Main Game',
      featured: false,
    },
    {
      title: 'Guess the Bust Out',
      description: 'Predict rare songs that haven\'t been played recently',
      href: '/guess-bust-out',
      category: 'Main Game',
      featured: false,
    },
    {
      title: 'Setlist Bingo',
      description: 'Create bingo cards and win with lines or corners',
      href: '/setlist-bingo',
      category: 'Main Game',
      featured: false,
    },
    {
      title: 'Setlist Builder',
      description: 'Build your own complete setlist prediction',
      href: '/setlist-builder',
      category: 'Main Game',
      featured: false,
    },
    
    // Timing Games (Row 2)
    {
      title: 'Guess Start Time',
      description: 'Predict when the show will begin',
      href: '/guess-start-time',
      category: 'Timing Game',
      featured: false,
    },
    {
      title: 'Guess End Time',
      description: 'Predict when the show will end or total length',
      href: '/guess-end-time',
      category: 'Timing Game',
      featured: false,
    },
    {
      title: 'Guess Set Break',
      description: 'Predict the length of set break',
      href: '/guess-set-break-length',
      category: 'Timing Game',
      featured: false,
    },
    
    // Advanced Song Games (Row 3)
    {
      title: 'Set 2 Opener',
      description: 'Predict the second set opening song',
      href: '/guess-set2-opener',
      category: 'Advanced Song Game',
      featured: false,
    },
    {
      title: 'Set 1 Closer',
      description: 'Predict the first set closing song',
      href: '/guess-set1-closer',
      category: 'Advanced Song Game',
      featured: false,
    },
    {
      title: 'Set 2 Closer',
      description: 'Predict the second set closing song',
      href: '/guess-set2-closer',
      category: 'Advanced Song Game',
      featured: false,
    },
    {
      title: 'Pre Drums/Space',
      description: 'Predict the song before drums/space',
      href: '/guess-pre-drums-song',
      category: 'Advanced Song Game',
      featured: false,
    },
    {
      title: 'Post Drums/Space',
      description: 'Predict the song after drums/space',
      href: '/guess-post-drums-song',
      category: 'Advanced Song Game',
      featured: false,
    },
    
    // Special Games (Row 4)
    {
      title: 'Songs NOT Played',
      description: 'Predict which popular songs WON\'T be played',
      href: '/guess-songs-not-played',
      category: 'Special Game',
      featured: true,
    },
    {
      title: 'Guess Next Song (Live)',
      description: 'Real-time predictions during live shows with community voting',
      href: '/guess-next-song',
      category: 'Live Game',
      featured: true,
    }
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
  }

  const GameCard = ({ game }: { game: Game }) => {
    const isFeatured = game.featured;
    
    return (
      <Link href={game.href} className="group">
        <div className={`
          bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 
          border-2 border-gray-200 hover:border-gray-300 h-full
          ${isFeatured ? 'ring-2 ring-purple-300' : ''}
        `}>
          <div className="text-center h-full flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {game.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 flex-grow">
              {game.description}
            </p>
            <div className="mt-auto">
              <div className="text-xs text-purple-600 font-medium mb-2">
                {game.category}
              </div>
              {isFeatured && (
                <div className="text-xs text-purple-700 font-bold">
                  FEATURED
                </div>
              )}
              <div className="text-xs text-gray-400 italic mt-2">
                Sponsored by: [TBD]
              </div>
            </div>
          </div>
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

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Setlist Street
            </h1>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Grateful Dead 60th Anniversary Concerts (GD60)
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Golden Gate Park, San Francisco
              </p>
              <p className="text-lg text-gray-600">
                Dead & Company - August 1, 2, 3, 2025
              </p>
            </div>
          </div>

          {/* Show Schedule - Moved Above Games */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Show Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-700">Show 1</h3>
                <p className="text-gray-600">Friday, August 1</p>
                <p className="text-sm text-gray-500">Deadline: 7:00 PM PT</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-700">Show 2</h3>
                <p className="text-gray-600">Saturday, August 2</p>
                <p className="text-sm text-gray-500">Deadline: 7:00 PM PT</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-700">Show 3</h3>
                <p className="text-gray-600">Sunday, August 3</p>
                <p className="text-sm text-gray-500">Deadline: 7:00 PM PT</p>
              </div>
            </div>
          </div>
            
          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto text-center">
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

          {/* Game Count Banner */}
          <div className="mb-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-4xl mx-auto text-center">
              <p className="text-xl font-bold text-gray-800">
                15 Games Available | Statistical Insights | Cash Prizes | Charity Donations | Exclusive Prizes
              </p>
            </div>
          </div>

          {/* All Games Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Prediction Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {allGames.map((game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </div>
          </div>

          {/* Utility Tools */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tools & Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {utilityLinks.map((item, index) => (
                <UtilityCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage; 