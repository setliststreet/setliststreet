import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';

const SongGamesHub = () => {
  // Organize games by show structure
  const gamesBySection = {
    set1: [
      {
        title: 'Guess the Opener',
        description: 'Predict which song will open the first set',
        href: '/guess-opener',
        difficulty: 'Medium',
        players: '247 active'
      },
      {
        title: 'Set 1 Closer',
        description: 'Predict which song will close the first set',
        href: '/guess-set1-closer',
        difficulty: 'Medium', 
        players: '203 active'
      }
    ],
    set2: [
      {
        title: 'Set 2 Opener',
        description: 'Predict which song will open the second set',
        href: '/guess-set2-opener',
        difficulty: 'Medium',
        players: '178 active'
      },
      {
        title: 'Pre-Drums Song',
        description: 'Predict the last song before Drums/Space',
        href: '/guess-pre-drums-song',
        difficulty: 'Hard',
        players: '134 active'
      },
      {
        title: 'Post-Drums Song', 
        description: 'Predict the first song after Drums/Space',
        href: '/guess-post-drums-song',
        difficulty: 'Hard',
        players: '142 active'
      },
      {
        title: 'Set 2 Closer',
        description: 'Predict which song will close the second set',
        href: '/guess-set2-closer',
        difficulty: 'Hard',
        players: '165 active'
      }
    ],
    encore: [
      {
        title: 'Guess the Encore',
        description: 'Predict the encore song(s)',
        href: '/guess-encore', 
        difficulty: 'Hard',
        players: '189 active'
      }
    ],
    special: [
      {
        title: 'Guess the Bust Out',
        description: 'Predict rare songs that haven\'t been played recently',
        href: '/guess-bust-out',
        difficulty: 'Expert',
        players: '156 active'
      },
      {
        title: 'Songs NOT Played',
        description: 'Predict which popular songs WON\'T be played',
        href: '/guess-songs-not-played',
        difficulty: 'Expert',
        players: '98 active',
        featured: true
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-blue-600 bg-blue-50';
      case 'Hard': return 'text-orange-600 bg-orange-50';
      case 'Expert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const GameCard = ({ game }: { game: any }) => (
    <Link href={game.href} className="group">
      <div className={`
        bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 
        border-2 border-gray-200 hover:border-gray-300 h-full
        ${game.featured ? 'ring-2 ring-purple-300' : ''}
      `}>
        <div className="text-center h-full flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            {game.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 flex-grow">
            {game.description}
          </p>
          
          <div className="mt-auto space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty}
              </span>
              <span className="text-xs text-gray-500">
                {game.players}
              </span>
            </div>
            
            {game.featured && (
              <div className="text-xs text-purple-700 font-bold">
                FEATURED GAME
              </div>
            )}
            
            <button className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Make Prediction
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <MainLayout>
      <Head>
        <title>Song Prediction Games - Setlist Street</title>
        <meta name="description" content="Predict individual songs in Dead & Company setlists - openers, closers, encores, and more!" />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Song Prediction Games
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your knowledge of Dead & Company's setlist patterns. Predict specific songs for key positions in each show.
            </p>
          </div>

          {/* Game Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How Song Prediction Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Scoring:</h3>
                <ul className="space-y-1">
                  <li>• Exact match = 100 points</li>
                  <li>• Bonus for rare songs</li>
                  <li>• Tiebreaker by submission time</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Difficulty Levels:</h3>
                <ul className="space-y-1">
                  <li>• <span className="text-green-600">Easy</span>: Common patterns</li>
                  <li>• <span className="text-blue-600">Medium</span>: Some prediction skill needed</li>
                  <li>• <span className="text-orange-600">Hard</span>: Requires deep knowledge</li>
                  <li>• <span className="text-red-600">Expert</span>: Nearly impossible to predict</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Deadline:</h3>
                <ul className="space-y-1">
                  <li>• All submissions due by 7:00 PM PT</li>
                  <li>• Before each show date</li>
                  <li>• No late submissions accepted</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Games Organized by Show Structure */}
          <div className="space-y-12">
            
            {/* Set 1 Games */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Set 1 Predictions</h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {gamesBySection.set1.map((game, index) => (
                  <div key={index} className="flex-1 min-w-[280px] max-w-[320px] px-3">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Set 2 Games */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Set 2 Predictions</h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                {gamesBySection.set2.map((game, index) => (
                  <div key={index} className="flex-1 min-w-[240px] max-w-[280px] px-2">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Encore Games */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Encore Predictions</h2>
              <div className="flex justify-center max-w-md mx-auto px-3">
                {gamesBySection.encore.map((game, index) => (
                  <div key={index} className="w-full">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>

            {/* Special/Advanced Games */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Special Predictions</h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {gamesBySection.special.map((game, index) => (
                  <div key={index} className="flex-1 min-w-[280px] max-w-[320px] px-3">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="mt-16 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pro Tips for Song Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <ul className="space-y-2">
                <li>• Study recent setlist patterns and frequency data</li>
                <li>• Consider venue size and show type (festival vs. arena)</li>
                <li>• Look for song relationships and common pairings</li>
              </ul>
              <ul className="space-y-2">
                <li>• Weather and season can influence song choices</li>
                <li>• Band member birthdays sometimes affect selections</li>
                <li>• Check our Setlist Hints page for statistical insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SongGamesHub; 