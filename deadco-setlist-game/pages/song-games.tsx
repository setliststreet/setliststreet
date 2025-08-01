import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
  import { useEffect, useState } from 'react';
  import { createClient } from '@supabase/supabase-js';
  import { getGuestEmail } from '@/lib/guestHelpers';
  
  const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
  const supabase = createClient(supabaseUrl, supabaseKey);



const SongGamesHub = () => {

 
  const [playerCountOpener, setPlayerCountOpener] = useState(0);
  const [playerCountSet1Closer, setPlayerCountSet1Closer] = useState(0);    
  const [playerCountSet2Opener, setPlayerCountSet2Opener] = useState(0); 
  const [playerCountPreDrumsOpener, setPlayerCountPreDrumsOpener] = useState(0); 
  const [playerCountPostDrumsOpener, setPlayerCountPostDrumsOpener] = useState(0); 
  const [playerCountSet2Closer, setPlayerCountSet2Closer] = useState(0);    
  const [playerCountEncoreCloser, setPlayerCountEncoreCloser] = useState(0);    


  useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('opener_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountOpener(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountOpener(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);

  useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('set1_closer_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountSet1Closer(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountSet1Closer(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);

   useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('set2_opener_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountSet2Opener(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountSet2Opener(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);


  useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('set2_pre_drums_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountPreDrumsOpener(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountPreDrumsOpener(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);

  useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('set2_post_drums_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountPostDrumsOpener(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountPostDrumsOpener(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);


   useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('set2_closer_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountSet2Closer(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountSet2Closer(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);


  useEffect(() => {
    const fetchUniquePlayerCount = async () => {
      const { data, error } = await supabase
        .from('encore_closer_guesses')
        .select('user_id, guest_user_id');

      if (error || !data) {
        console.error('Error fetching players:', error);
        setPlayerCountEncoreCloser(0);
        return;
      }

      const uniqueIds = new Set<string>();
      data.forEach((entry) => {
        if (entry.user_id) uniqueIds.add(entry.user_id);
        else if (entry.guest_user_id) uniqueIds.add(entry.guest_user_id);
      });

      setPlayerCountEncoreCloser(uniqueIds.size);
    };

    fetchUniquePlayerCount();
  }, []);




  const gamesBySection = {
    set1: [
      {
        title: 'Guess the Opener',
        description: 'Predict which song will open the first set',
        href: '/guess-opener',
        difficulty: 'Medium',
        players: `${playerCountOpener} active`,
        bgColor: '#ffdf2b'
      },
      {
        title: 'Set 1 Closer',
        description: 'Predict which song will close the first set',
        href: '/guess-set1-closer',
        difficulty: 'Medium',
         players: `${playerCountSet1Closer} active`,
        bgColor: '#ffdf2b'
      }
    ],
    set2: [
      {
        title: 'Set 2 Opener',
        description: 'Predict which song will open the second set',
        href: '/guess-set2-opener',
        difficulty: 'Medium',
         players: `${playerCountSet2Opener} active`,
        bgColor: '#fbbf24'
      },
      {
        title: 'Pre-Drums Song',
        description: 'Predict the last song before Drums/Space',
        href: '/guess-pre-drums-song',
        difficulty: 'Hard',
         players: `${playerCountPreDrumsOpener} active`,
        bgColor: '#fbbf24'
      },
      {
        title: 'Post-Drums Song',
        description: 'Predict the first song after Drums/Space',
        href: '/guess-post-drums-song',
        difficulty: 'Hard',
         players: `${playerCountPostDrumsOpener} active`,
        bgColor: '#fbbf24'
      },
      {
        title: 'Set 2 Closer',
        description: 'Predict which song will close the second set',
        href: '/guess-set2-closer',
        difficulty: 'Hard',
         players: `${playerCountSet2Closer} active`,
        bgColor: '#fbbf24'
      }
    ],
    encore: [
      {
        title: 'Guess the Encore',
        description: 'Predict the encore song(s)',
        href: '/guess-encore',
        difficulty: 'Hard',
         players: `${playerCountEncoreCloser} active`,
        bgColor: '#a5f3fc'
      }
    ],
    // special: [
    //   {
    //     title: 'Guess the Bust Out',
    //     description: 'Predict rare songs that haven\'t been played recently',
    //     href: '/guess-bust-out',
    //     difficulty: 'Expert',
    //     players: '0 active',
    //     bgColor: '#c4b5fd'
    //   },
    //   {
    //     title: 'Songs NOT Played',
    //     description: 'Predict which popular songs WON\'T be played',
    //     href: '/guess-songs-not-played',
    //     difficulty: 'Expert',
    //     players: '0 active',
    //     bgColor: '#c4b5fd'
    //   }
    // ]
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
                // special: '💡 Special Predictions'
              };
              const bgMap = {
                set1: 'bg-red-200',
                set2: 'bg-yellow-200',
                encore: 'bg-blue-200',
                // special: 'bg-purple-200'
              };
              return (

                <section key={sectionKey} className={`shadow-3xl-cartoon p-8 ${bgMap[sectionKey]}`}>

                            <div className="countdown-outer"></div>
          <div className="countdown-outer"></div>


<div className="center-wrapper">
                  <h2 className="choose-game-card">{sectionTitleMap[sectionKey]}</h2>

                  </div>


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
                        min-h-[200px]
                     max-h-[10px]
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
