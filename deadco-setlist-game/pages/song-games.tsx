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
            <div className="h-8 w-full bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">Sponsor Logo</div>
            <div className="flex justify-center items-center">
              <span className="text-xs px-2 py-1 rounded-full text-gray-700 bg-gray-100">
                {game.players}
              </span>
            </div>
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

          {/* Games Organized by Show Structure */}
          <div className="space-y-12">
            
            {/* Set 1 Games */}
            <div className="mb-8 mt-8">
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
            <div className="mb-8 mt-8">
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
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Encore Predictions</h2>
              <div className="flex justify-center max-w-md mx-auto px-3">
                <div className="flex-1 min-w-[280px] max-w-[320px] px-3"></div> {/* Left Padding */}
                {gamesBySection.encore.map((game, index) => (
                  <div key={index} className="flex-1 min-w-[280px] max-w-[320px] px-3">
                    <GameCard game={game} />
                  </div>
                ))}
                <div className="flex-1 min-w-[280px] max-w-[320px] px-3"></div> {/* Right Padding */}
              </div>
            </div>

            {/* Special/Advanced Games */}
            <div className="mb-8 mt-8">
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
        </div>
      </div>
    </MainLayout>
  );
};

export default SongGamesHub; 