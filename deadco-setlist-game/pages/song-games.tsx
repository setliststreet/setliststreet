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
        bgColor: '#ffdf2b'
      },
      {
        title: 'Set 1 Closer',
        description: 'Predict which song will close the first set',
        href: '/guess-set1-closer',
        difficulty: 'Medium',
        players: '203 active',
        bgColor: '#ffdf2b'
      }
    ],
    set2: [
      {
        title: 'Set 2 Opener',
        description: 'Predict which song will open the second set',
        href: '/guess-set2-opener',
        difficulty: 'Medium',
        players: '178 active',
        bgColor: '#fbbf24'
      },
      {
        title: 'Pre-Drums Song',
        description: 'Predict the last song before Drums/Space',
        href: '/guess-pre-drums-song',
        difficulty: 'Hard',
        players: '134 active',
        bgColor: '#fbbf24'
      },
      {
        title: 'Post-Drums Song',
        description: 'Predict the first song after Drums/Space',
        href: '/guess-post-drums-song',
        difficulty: 'Hard',
        players: '142 active',
        bgColor: '#fbbf24'
      },
      {
        title: 'Set 2 Closer',
        description: 'Predict which song will close the second set',
        href: '/guess-set2-closer',
        difficulty: 'Hard',
        players: '165 active',
        bgColor: '#fbbf24'
      }
    ],
    encore: [
      {
        title: 'Guess the Encore',
        description: 'Predict the encore song(s)',
        href: '/guess-encore',
        difficulty: 'Hard',
        players: '189 active',
        bgColor: '#a5f3fc'
      }
    ],
    special: [
      {
        title: 'Guess the Bust Out',
        description: 'Predict rare songs that haven\'t been played recently',
        href: '/guess-bust-out',
        difficulty: 'Expert',
        players: '156 active',
        bgColor: '#c4b5fd'
      },
      {
        title: 'Songs NOT Played',
        description: 'Predict which popular songs WON\'T be played',
        href: '/guess-songs-not-played',
        difficulty: 'Expert',
        players: '98 active',
        bgColor: '#c4b5fd'
      }
    ]
  };

  const GameCard = ({ game }) => (
    <Link href={game.href} className="group">
      <div
        className="w-[280px] h-[140px]  rounded-[1rem] relative hover:scale-105 "
        style={{ backgroundColor: game.bgColor }}
      >
        <div
          className="absolute inset-[10px]  rounded-[1.5rem] flex flex-col items-center justify-center p-4 bg-white "
        >
          <h3 className="text-[18px] font-extrabold uppercase text-black text-center leading-tight font-cartoon drop-shadow-cartoon">{game.title}</h3>
          <p className="text-[13px] text-black font-medium text-center font-cartoon drop-shadow-cartoon">{game.description}</p>
         <button className="cartoon-button">
           🎮 {game.players}
         </button>

        </div>
      </div>
    </Link>
  );

  return (
    <MainLayout>
      <div className="bg-sky-200 min-h-screen pb-16">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
          <div className="countdown-outer"></div>
            <h1 className="logo-small-text">Song Prediction Games</h1>
                      <div className="countdown-outer"></div>

            <p className="subtitle-font text-black font-cartoon text-[18px] leading-snug drop-shadow-cartoon max-w-2xl mx-auto">
              Test your knowledge of Dead &amp; Company's setlist patterns. Predict specific songs for key positions in each show.
            </p>
          </div>

          <div className="countdown-outer"></div>

          <div className="space-y-16">
            {Object.entries(gamesBySection).map(([sectionKey, games]) => {
              const sectionTitleMap = {
                set1: '🎵 Set 1 Predictions',
                set2: '🎶 Set 2 Predictions',
                encore: '🎤 Encore Predictions',
                special: '💡 Special Predictions'
              };
              const bgMap = {
                set1: 'bg-red-200',
                set2: 'bg-yellow-200',
                encore: 'bg-blue-200',
                special: 'bg-purple-200'
              };
              return (

                <section key={sectionKey} className={`shadow-3xl-cartoon p-8 ${bgMap[sectionKey]}`}>

                            <div className="countdown-outer"></div>
          <div className="countdown-outer"></div>

                  <h2 className="text-4xl font-bold text-center mb-6  drop-shadow-cartoon">{sectionTitleMap[sectionKey]}</h2>
          <div className="countdown-outer"></div>



               <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-6xl px-4 py-8 rounded-[2rem] bg-white/80  shadow-3xl-cartoon">

               {games.map((game, index) => (
                 <div
                   key={index}
                   className="
                     flex
                     items-center
                     justify-center
                     min-w-[260px]
                     max-w-[300px]
                     w-full
                     px-4
                     py-4
                     text-center
                   "
                 >
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
