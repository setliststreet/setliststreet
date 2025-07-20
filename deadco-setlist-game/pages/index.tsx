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

  // Consolidated games for main page - only 4 items
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
      title: 'Timing Predictions',
      description: 'Predict start times, end times, and set break lengths. Test your timing instincts.',
      href: '/timing-games',
      category: 'Multiple Games', 
      featured: false,
      gameCount: '3 games'
    },
    {
      title: 'Guess Next Song (Live)',
      description: 'Real-time predictions during live shows with community voting and live updates.',
      href: '/guess-next-song',
      category: 'Live Game',
      featured: true,
      gameCount: 'Live only'
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
    gameCount?: string;
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
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-purple-600 font-medium">
                  {game.category}
                </div>
                {game.gameCount && (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {game.gameCount}
                  </div>
                )}
              </div>
              {isFeatured && (
                <div className="text-xs text-purple-700 font-bold mb-2">
                  FEATURED
                </div>
              )}
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                {game.gameCount?.includes('games') ? 'View All Games' : 'Play Now'}
              </button>
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

          {/* All Games Grid - Now Consolidated to 4 Main Games */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Game</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mainGames.map((game, index) => (
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