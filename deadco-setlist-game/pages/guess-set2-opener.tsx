import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import type { Show } from '../components/ShowSelector';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';
import FourWaysToPlay from '@/components/FourWaysToPlay';
import { createClient } from '@supabase/supabase-js';
import { getSet2OpenerWinnerStatus, getGuestEmail, storeSet2OpenerWinnerStatus } from '@/lib/guestHelpers';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

const PAGE_SIZE = 5;

const GuessSet2OpenerPage = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');
  const [availableSongs, setAvailableSongs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrizeInfo, setShowPrizeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isWinner, setIsWinner] = useState<boolean | null>(null);

  const prizeInfo = [
    { sponsor: 'Dead Merch Co.', prize: 'Vintage Poster', value: '$75' },
    { sponsor: 'Tour Threads', prize: 'Exclusive Tour T-Shirt', value: '$50' },
    { sponsor: 'VIP Access', prize: 'VIP Show Pass', value: '$200' },
    { sponsor: 'Artist Print', prize: 'Signed Setlist Print', value: '$150' },
  ];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`/api/fetchSetlists?artistName=Dead%20%26%20Company&year=2025`);
        const data = await res.json();
        if (data.error) {
          console.error('API error:', data);
          return;
        }
        // Only add the first song from the second set of each show
        const songSet = new Set<string>();
          data.setlist.forEach((setlist: any) => {
          if (setlist.sets?.set) {
            setlist.sets.set.forEach((set: any) => {
              if (set.song?.length) {
                set.song.forEach((song: any) => {
                  if (song.name) songSet.add(song.name);
                });
              }
            });
          }
        });
        setAvailableSongs(Array.from(songSet));
      } catch (err) {
        console.error('Failed to fetch songs:', err);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const calculateTimeToDeadline = () => {
      const now = new Date();
      const deadlines = [
        new Date('2025-08-01T19:00:00-07:00'),
        new Date('2025-08-02T19:00:00-07:00'),
        new Date('2025-08-03T19:00:00-07:00')
      ];

      const nextDeadline = deadlines.find(date => date > now);
      if (!nextDeadline) {
        setTimeToDeadline('All deadlines passed');
        return;
      }

      const timeDiff = nextDeadline.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeToDeadline(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeToDeadline();
    const interval = setInterval(calculateTimeToDeadline, 60000);
    return () => clearInterval(interval);
  }, []);

   useEffect(() => {
      const winner = getSet2OpenerWinnerStatus();
      
      if (winner !== null) {
        setIsWinner(winner);
      }
    }, []);

  // Filter songs by search term BEFORE paginating
  const filteredSongs = availableSongs.filter(song =>
    song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredSongs.length / PAGE_SIZE);
  const pageSongs = filteredSongs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

   const handleSet2OpenerSubmission = async (playMode: string, amount?: number) => {
    if (!selectedSong || !selectedShow) {
      alert('Please select a show and song first');
      return;
    }
  
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
  
    const userId = session?.user?.id || null;
  
    let guestEmail: string | null = null;
    let guestUserId: string | null = null;
  
    // Guest flow
    if (!userId) {
      guestEmail = getGuestEmail();
      if (!guestEmail) {
        alert('Please log in or enter your email to continue.');
        return;
      }
  
      const { data: guestData, error: guestError } = await supabase
        .from('guest_users')
        .select('id')
        .eq('email', guestEmail)
        .single();
  
      if (guestError || !guestData) {
        console.error('❌ Guest user not found:', guestError);
        alert('❌ No guest account found with that email.');
        return;
      }
  
      guestUserId = guestData.id;
    }
  
    // Get setlist + timing info
    const { data: setlistData, error: setlistError } = await supabase
      .from('setlists')
      .select('set2_opener, show_opens_at, winner_decision_time')
      .eq('show_id', selectedShow.id)
      .single();
  
    if (setlistError || !setlistData) {
      console.error('❌ Error fetching setlist:', setlistError);
      alert('❌ Could not verify the winner. Try again later.');
      return;
    }
  
    const actualSong = setlistData.set2_opener?.trim().toLowerCase();
    const guessedSong = selectedSong.trim().toLowerCase();
    const now = new Date();
    const showOpensAt = new Date(setlistData.show_opens_at);
    const winnerDecisionTime = new Date(setlistData.winner_decision_time);
  
  
    let isUserWinner: boolean | null = null;
    
    // 🎮 Determine winner
    if (playMode === 'fun') {
      if (now >= showOpensAt) {
        isUserWinner = actualSong === guessedSong;
        setIsWinner(isUserWinner);
        storeSet2OpenerWinnerStatus(isUserWinner);
      } else {
        setIsWinner(null);
        storeSet2OpenerWinnerStatus(null);
      }
    } else {
      if (now >= winnerDecisionTime) {
        const status = actualSong === guessedSong;
        setIsWinner(status);
        storeSet2OpenerWinnerStatus(status);
        isUserWinner = status;
      } else {
        const localStatus = getSet2OpenerWinnerStatus();
        setIsWinner(localStatus);
        isUserWinner = localStatus;
      }
    }
  
    const submission = {
      user_id: userId,
      guest_user_id: guestUserId,
      show_id: selectedShow.id,
      song: selectedSong,
      play_mode: playMode,
      amount: amount || null,
      submitted_at: new Date().toISOString(),
      is_winner: isUserWinner,
    };
  
    const { error: insertError } = await supabase
      .from('set2_opener_guesses')
      .insert([submission]);
  
    if (insertError) {
      console.error('Insert error:', insertError);
      alert('❌ There was a problem submitting your Set 2 Opener prediction.');
      return;
    }
  
    const venue = selectedShow.venue;
    const city = selectedShow.city;
    const date = new Date(selectedShow.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  
    const amountText = amount ? ` ($${amount})` : '';
    alert(`✅ Prediction submitted!\n\n🎵 Song: ${selectedSong}\n📍 Venue: ${venue}, ${city}\n📅 Date: ${date}\n🎮 Mode: ${playMode}${amountText}`);
  };
  

  const handlePrizeInfoClick = () => {
    setShowPrizeInfo(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>Guess Set 2 Opener - Setlist Street</title>
        <meta name="description" content="Predict which song will open the second set" />
      </Head>

      {isWinner !== null && (
    <div className="countdown-outer mb-6">

  <div className="countdown-outer mb-6">
<div className="countdown-outer mb-6">

  {isWinner !== null && (
  <div
    className={`fixed top-0 left-0 w-full z-50 p-4 shadow-lg text-white text-center text-xl font-semibold transition-transform duration-500 ${
      isWinner ? 'bg-green-600 animate-bounce' : 'bg-red-600 animate-shake'
    }`}
  >
    <div className="flex items-center justify-center space-x-3">
     
      {isWinner ? (
        <>
      
             <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-black px-10 py-5 rounded-[20px] max-w-[600px] mb-[30px]  transition-all duration-200 relative text-center font-black text-[22px] uppercase tracking-[1.5px]">
 🎉 Congratulations! You won the game! 🏆
</div>
    
        </>
      ) : (
        <>
        <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-black px-10 py-5 rounded-[20px] max-w-[600px] mb-[30px]  transition-all duration-200 relative text-center font-black text-[22px] uppercase tracking-[1.5px]">
 😞 Oops! Better luck next time. 🎵
</div>

      
        </>
      )}
    </div>
  </div>
)}


  </div>
   </div>
    </div>
)}

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className='countdown-outer'></div>

          {/* Header with sponsor logos */}
          <div className="flex items-center justify-center mb-2 gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
            <div className="w-2"></div>
            <h1 className="logo-text">Guess the Set 2 Opener</h1>
            <div className="w-2"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          </div>

          <div className="text-center text-white text-2xl font-cartoon drop-shadow-md mb-12">
            Predict which song will open the second set for Dead & Company
          </div>

          {/* Countdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
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

          {/* Prize Info Modal */}
          {showPrizeInfo && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="game-card p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto perspective-1500 rotateY-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-4xl font-display font-extrabold gradient-text-deadco">Available Prizes - Guess the Opener</h3>
                  <button
                    onClick={() => setShowPrizeInfo(false)}
                    className="cartoon-button text-4xl"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  {prizeInfo.map((prize, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-pink-200 to-blue-200 rounded-2xl p-4 shadow-inner-cartoon"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-display font-extrabold text-xl gradient-text-deadco">{prize.prize}</h4>
                          <p className="text-sm text-gray-600 font-cartoon">Sponsored by: {prize.sponsor}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-green-500 font-cartoon">{prize.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Prizes awarded based on accuracy and random selection from prize pool participants.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Padding above ShowSelector */}
          <div className="mt-4"></div>
          {/* Show Selection */}
         <div className="max-w-md mx-auto mb-8">
            <ShowSelector
              onShowSelect={(show: Show) => setSelectedShow(show)}
              selectedShow={selectedShow ?? undefined}
            />
          </div>
          {/* Sponsor summary and live pool summary */}
          {selectedShow && (
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-lg font-semibold text-gray-700">[PLACEHOLDER SPONSOR NAME]</span>
                <span className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-2xl">[PLACEHOLDER SPONSOR LOGO]</span>
           

             </div>
             
                              <PoolSizeDisplay
  gameId="guess-set2-opener"
   showId={selectedShow.id}
  showDate={selectedShow.date}
  table="set2_opener_guesses" 
  onPrizeInfoClick={handlePrizeInfoClick}
/>
            </div>

          )}
          {/* Padding below ShowSelector */}
          <div className="mb-4"></div>

          {/* Main Game Grid */}
          <div className="flex justify-center">
            <div className="game-card p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto perspective-1500 rotateY-12">
              {/* Col 1: Padding */}
              <div></div>
              {/* Col 2: Song Selection (Drag & Drop) */}
              <div>
                {/* Search Input */}
                <input
                  type="text"
                  className="w-full mb-4 px-6 py-4 rounded-xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 shadow focus:outline-none focus:ring-4 focus:ring-yellow-300 font-cartoon text-lg text-yellow-900 placeholder:text-yellow-400 transition-all duration-200"
                  placeholder="🔍 Search songs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <SetlistDragDropPicker
                  availableSongs={pageSongs}
                  maxSongs={1}
                  onSetlistChange={(setlist) => setSelectedSong(setlist[0] || '')}
                />
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="mx-2 text-gray-700">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                    disabled={currentPage === pageCount}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* Col 3: Small Padding */}
              <div className="w-2"></div>
              {/* Col 4: Selected Song */}
              <div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
                  <h4 className="font-semibold mb-2 text-gray-800">Selected Song</h4>
                  {selectedSong ? (
                    <span className="text-lg font-bold text-purple-700">{selectedSong}</span>
                  ) : (
                    <span className="text-gray-400">No song selected</span>
                  )}
                </div>
              </div>
              {/* Col 5: Small Padding */}
              <div className="w-2"></div>
              {/* Col 6: Stats (optional) */}
              <div>
              </div>
              {/* Col 7: Padding */}
              <div></div>
            </div>
          </div>

           <div className="mt-8 mb-8 perspective-1500 rotateX-12">
            <FourWaysToPlay
              selectedSong={selectedShow ? selectedSong : ''}
              onSubmissionClick={handleSet2OpenerSubmission}
              gameType="set1Closer prediction"
              disabled={!selectedSong}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessSet2OpenerPage;