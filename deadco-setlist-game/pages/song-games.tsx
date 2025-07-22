import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';

const SongGamesHub = () => {
  const gamesBySection = {
    set1: [
      {
        title: 'Guess the Opener',
        description: 'Predict which song will open the first set',
        href: '/guess-opener',
        difficulty: 'Medium',
        players: '247 active',
        bgColor: '#e1a811'
      },
      {
        title: 'Set 1 Closer',
        description: 'Predict which song will close the first set',
        href: '/guess-set1-closer',
        difficulty: 'Medium',
        players: '203 active',
        bgColor: '#e1a811'
      }
    ],
    set2: [
      {
        title: 'Set 2 Opener',
        description: 'Predict which song will open the second set',
        href: '/guess-set2-opener',
        difficulty: 'Medium',
        players: '178 active',
        bgColor: '#e1a811'
      },
      {
        title: 'Pre-Drums Song',
        description: 'Predict the last song before Drums/Space',
        href: '/guess-pre-drums-song',
        difficulty: 'Hard',
        players: '134 active',
        bgColor: '#e1a811'
      },
      {
        title: 'Post-Drums Song',
        description: 'Predict the first song after Drums/Space',
        href: '/guess-post-drums-song',
        difficulty: 'Hard',
        players: '142 active',
        bgColor: '#e1a811'
      },
      {
        title: 'Set 2 Closer',
        description: 'Predict which song will close the second set',
        href: '/guess-set2-closer',
        difficulty: 'Hard',
        players: '165 active',
        bgColor: '#e1a811'
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

  const GameCard = ({ game }) => (
    <Link href={game.href} className="group">
      <div
        className="w-[280px] h-[180px] border-[5px] rounded-xl relative hover:scale-[1.07] transition-transform duration-300 shadow-cartoon"
        style={{ backgroundColor: game.bgColor || '#facc15', borderColor: '#000' }}
      >
        <div
          className="absolute inset-[10px] border-[4px] rounded-lg flex flex-col items-center justify-between p-4 shadow-inner-cartoon"
          style={{ backgroundColor: '#ffb6c1', borderColor: '#000' }}
        >
          <h3 className="text-[18px] font-extrabold uppercase text-black text-center leading-tight font-cartoon">{game.title}</h3>
          <p className="text-[13px] text-black font-medium text-center font-cartoon">{game.description}</p>
          <button
            className="mt-3 px-4 py-1.5 rounded-full bg-white border-[3px] text-black font-bold text-sm hover:bg-yellow-100 transition-all duration-200 shadow-md font-cartoon"
            style={{ borderColor: '#000' }}
          >
            🎮 {game.players}
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <MainLayout>
      <Head>
        <title >Song Prediction Games - Setlist Street</title>
        <meta name="description" content="Predict individual songs in Dead & Company setlists - openers, closers, encores, and more!" />
      </Head>

  <div className="countdown-outer"></div>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="logo-small-text">Song Prediction Games</h1>
            <p className="subtitle-font max-w-4xl mx-auto">
              Test your knowledge of Dead & Company's setlist patterns. Predict specific songs for key positions in each show.
            </p>
          </div>

  <div className="countdown-outer"></div>

          <div className="space-y-12">
            {/* Section UI */}
            {Object.entries(gamesBySection).map(([sectionKey, games]) => {
              const sectionTitleMap = {
                set1: '🎵 Set 1 Predictions',
                set2: '🎶 Set 2 Predictions',
                encore: '🎤 Encore Predictions',
                special: '💡 Special Predictions'
              };
              const bgMap = {
                set1: 'bg-red-100 text-red-700',
                set2: 'bg-yellow-100 text-yellow-700',
                encore: 'bg-blue-100 text-blue-700',
                special: 'bg-purple-100 text-purple-700'
              };
              return (
                <section key={sectionKey} className={`rounded-xl p-6 shadow-inner ${bgMap[sectionKey]}`}>
                  <h2 className={`text-3xl font-bold text-center mb-6`}>{sectionTitleMap[sectionKey]}</h2>
                  <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-6xl">
                    {games.map((game, index) => (
                      <div key={index} className="flex-1 min-w-[260px] max-w-[300px] px-3">
                        <GameCard game={game} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SongGamesHub;