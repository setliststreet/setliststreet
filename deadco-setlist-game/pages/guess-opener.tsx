import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import ShowSelector from '../components/ShowSelector';
import { Show } from '../components/ShowSelector';
import { createClient } from '@supabase/supabase-js';
import { getGuestEmail,  getOpenerWinnerStatus , storeOpenerWinnerStatus } from '@/lib/guestHelpers';
import { fetchUserPredictions } from './api/fetchUserPredictions';



const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

const PAGE_SIZE = 5;

interface Song {
  name: string;
  openerProbability: number;
  lastOpener: string;
  frequency: string;
}

const GuessOpenerPage = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');
  const [showPrizeInfo, setShowPrizeInfo] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);

  const prizeInfo = [
    { sponsor: 'Dead Merch Co.', prize: 'Vintage Poster', value: '$75' },
    { sponsor: 'Tour Threads', prize: 'Exclusive Tour T-Shirt', value: '$50' },
    { sponsor: 'VIP Access', prize: 'VIP Show Pass', value: '$200' },
    { sponsor: 'Artist Print', prize: 'Signed Setlist Print', value: '$150' },
  ];


useEffect(() => {
  const fetchSongsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('name, frequency');

      if (error) {
        console.error('Error fetching songs from Supabase:', error.message);
        return;
      }

      if (!data) return;

      // Remove duplicates based on lowercase name
      const seen = new Set<string>();
      const uniqueData = data.filter((song) => {
        if (!song?.name) return false;
        const name = song.name.trim().toLowerCase();
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });

      const maxFrequency = Math.max(...uniqueData.map((s) => s.frequency || 0), 1);

      const processed: ProcessedSong[] = uniqueData.map((song) => {
        const frequencyVal = song.frequency || 0;

        let frequencyLabel = 'Never Opened';
        if (frequencyVal >= 5) frequencyLabel = 'Very High';
        else if (frequencyVal >= 3) frequencyLabel = 'High';
        else if (frequencyVal >= 2) frequencyLabel = 'Medium';
        else if (frequencyVal >= 1) frequencyLabel = 'Low';

        return {
          name: song.name.trim(),
          openerProbability: parseFloat(((frequencyVal / maxFrequency) * 100).toFixed(1)),
          lastOpener: '', // Placeholder
          frequency: frequencyLabel,
        };
      });

      processed.sort((a, b) => a.name.localeCompare(b.name));
      setSongs(processed);
    } catch (err) {
      console.error('Unexpected error fetching songs:', err);
    }
  };

  fetchSongsFromSupabase();
}, []);



  useEffect(() => {
    const calcDeadline = () => {
      const now = new Date();
      const showDates = [
        new Date('2025-07-28T19:00:00-07:00'),
        new Date('2025-07-28T19:00:00-07:00'),
        new Date('2025-07-28T19:00:00-07:00'),
      ];
      const next = showDates.find(d => d > now);
      if (!next) {
        setTimeToDeadline('All shows completed');
        return;
      }
      const diff = next.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeToDeadline(`${d}d ${h}h ${m}m ${s}s`);
    };

    calcDeadline();
    const interval = setInterval(calcDeadline, 1000);
    return () => clearInterval(interval);
  }, []);


useEffect(() => {
  const loadGuestPredictions = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id || null;

    let guestEmail: string | null = null;
    let guestUserId: string | null = null;

    // If not logged in, use guest email
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

    const finalUserId = userId || guestUserId;

    if (!finalUserId) {
      alert('User ID not found.');
      return;
    }

    const data = await fetchUserPredictions(finalUserId);

    // alert(`✅ Fetched ${data.length} predictions total`);
    setPredictions(data);
  };

  loadGuestPredictions();
}, []);



useEffect(() => {
  const winner = getOpenerWinnerStatus();
  if (winner !== null) {
    setIsWinner(winner);
  }
}, []);


  const getSelectedSongData = () => songs.find(song => song.name === selectedSong);
  const getProbabilityColor = (prob: number) =>
    prob >= 15 ? 'text-green-500' : prob >= 10 ? 'text-yellow-400' : prob >= 5 ? 'text-orange-400' : 'text-red-400';
  const getProbabilityLabel = (prob: number) =>
    prob >= 15 ? 'Very Likely' : prob >= 10 ? 'Likely' : prob >= 5 ? 'Possible' : 'Unlikely';

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    setSelectedSong('');
  };


const handleSubmission = async (playMode: string, amount?: number) => {
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

  // Get opener + timing info
  const { data: setlistData, error: setlistError } = await supabase
    .from('setlists')
    .select('opener, show_opens_at, winner_decision_time')
    .eq('show_id', selectedShow.id)
    .single();

  if (setlistError || !setlistData) {
    console.error('❌ Error fetching setlist:', setlistError);
    alert('❌ Could not verify the winner. Try again later.');
    return;
  }

  const actualOpener = setlistData.opener?.trim().toLowerCase();
  const guessedSong = selectedSong.trim().toLowerCase();
  const now = new Date();
  const showOpensAt = new Date(setlistData.show_opens_at);
  const winnerDecisionTime = new Date(setlistData.winner_decision_time);

  let isUserWinner: boolean | null = null;

  // 🎮 Determine winner
  if (playMode === 'fun') {
  
    if (now >= showOpensAt) {
      isUserWinner = actualOpener === guessedSong;
      setIsWinner(isUserWinner);
      storeOpenerWinnerStatus(isUserWinner);
    } else {
      setIsWinner(null);
      storeOpenerWinnerStatus(null);
    }
  } else {

    // For cash/prize/charity
    if (now >= winnerDecisionTime) {

      const status = actualOpener === guessedSong;
      setIsWinner(status);
      storeOpenerWinnerStatus(status);
      isUserWinner = status;
    } else {
      const localStatus = getOpenerWinnerStatus();
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
    .from('opener_guesses')
    .insert([submission]);

  if (insertError) {
    console.error('Insert error:', insertError);
    alert('❌ There was a problem submitting your prediction.');
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

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pageCount = Math.ceil(filteredSongs.length / PAGE_SIZE);
  const pageSongs = filteredSongs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <MainLayout>
      <Head>
        <title>Guess the Opener - Setlist Street</title>
        <meta name="description" content="Predict which song will open the first set at GD60" />
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




      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className='countdown-outer'></div>
          {/* Header with Sponsor Logos */}
          <div className="flex items-center justify-center mb-8 gap-8 perspective-1500 rotateX-12">

🎵

          
            <h1 className="logo-text">Guess the Opener</h1>
            🎵
          </div>
          <div className="text-center text-white text-2xl font-cartoon drop-shadow-md mb-12">
            Guess the opener for each show! Each show is its own game.
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

          {/* Show Selector */}
          <ShowSelector
              selectedShow={selectedShow || undefined}
              onShowSelect={handleShowSelect}
            />  

          {/* Sponsor Section */}
          {selectedShow && (
            <div className="flex items-center justify-center mb-12 gap-6 perspective-1500 rotateY-10">
              <span className="text-3xl font-display font-extrabold text-white drop-shadow-md">[SPONSOR NAME]</span>
              <div className="w-28 h-28 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-4xl font-extrabold text-purple-900 shadow-cartoon">
                🎤
              </div>
            </div>
          )}

 {/* Show-dependent sections */}
          {selectedShow ? (
            <>
              {/* Live Pool Size Display */}
            
             

                    <PoolSizeDisplay
  gameId="guess-opener"
   showId={selectedShow.id}
  showDate={selectedShow.date}
  table="opener_guesses" 
  onPrizeInfoClick={handlePrizeInfoClick}
/>

      

<div className="flex items-center justify-center mb-8 gap-6 perspective-1500 rotateY-10">
              <div className=" green-game-card  bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Until Deadline</h3>
                <div className=" text-2xl font-bold text-purple-600">{timeToDeadline}</div>
                <p className="text-sm text-gray-600 mt-2">Submissions close at 7:00 PM PT before each show</p>
              </div>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-center text-yellow-800 font-semibold">
              Please select a show to view pool sizes, time, and sponsors.
            </div>
          )}


          {/* Main Game Grid Title */}
          <h2 className="logo-small-text mb-10 text-center">Opener Guess</h2>


          {/* Main Game Grid */}
          <div className="grid grid-cols-7 gap-6 mb-12">
            {/* Col 1: Padding */}
            <div></div>
            {/* Col 2: Song Selection (List + Type-in) */}
            <div>
              <div className="game-card p-6 perspective-1500 rotateX-12">
                <h4 className="logo-small-text">Song Selection</h4>
                {/* Search Input */}

                
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-white rounded-2xl shadow-inner-cartoon focus:ring-4 focus:ring-yellow-400 mb-4 text-purple-900 placeholder-gray-500 font-cartoon"
                />

                
            
                {/* Song List (drag/click to select) */}
                <div className="mb-4">
                  <div className="h-48 overflow-y-auto bg-white rounded-2xl p-3 shadow-inner-cartoon">
                  
                    {pageSongs.map(song => (
                      <div
                        key={song.name}
                        draggable
                        onDragStart={e => e.dataTransfer.setData('text/plain', song.name)}
                        onClick={() => setSelectedSong(song.name)}
                        className={`p-3 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-lg cursor-move hover:bg-blue-300 song-title text-sm font-bold text-purple-900 shadow-cartoon mb-2 ${
                          selectedSong === song.name ? 'bg-blue-300' : ''
                        }`}
                      >
                        {song.name}
                      </div>
                    ))}
                    {pageSongs.length === 0 && (
                      <div className="text-gray-500 text-center text-sm font-cartoon">No songs found</div>
                    )}
                  </div>
                </div>
              
                {/* Type-in input for drag-and-drop */}
                <input
                  type="text"
                  placeholder="Type song name or drag here..."
                  value={selectedSong}
                  onChange={(e) => setSelectedSong(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-2xl shadow-inner-cartoon focus:ring-4 focus:ring-yellow-400 mb-4 text-purple-900 placeholder-gray-500 font-cartoon"
                  onDrop={(e) => {
                    const name = e.dataTransfer.getData('text/plain');
                    if (name) setSelectedSong(name);
                    e.preventDefault();
                  }}
                  onDragOver={(e) => e.preventDefault()}
                />
                
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="cartoon-button disabled:opacity-50"
                  >
                    Back
                  </button>
                  <span className="text-sm font-cartoon text-white drop-shadow-md">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                    disabled={currentPage === pageCount}
                    className="cartoon-button disabled:opacity-50"
                  >
                    Forward
                  </button>
                </div>
              </div>
            </div>
            {/* Col 3: Small Padding */}
            <div className="w-2"></div>
            {/* Col 4: Selected Song */}
            <div>
              <div className="game-card p-6 min-h-[140px] flex flex-col items-center justify-center perspective-1500 rotateY-12">
                {selectedSong ? (
                  <div className="text-2xl song-title text-yellow-400 drop-shadow-md">{selectedSong}</div>
                ) : (
                  <div className="text-gray-500 font-cartoon">No song selected</div>
                )}
              </div>
            </div>
            
            {/* Col 5: Small Padding */}
            <div className="w-2"></div>


            {/* Col 6: Opener Statistics */}
            <div>
              <div className="game-card p-6 perspective-1500 rotateX-12">
                <h4 className="font-display font-extrabold text-3xl gradient-text-deadco mb-4">Opener Statistics</h4>
                {selectedSong && getSelectedSongData() ? (
                  <>
                    <div className="text-sm text-gray-700 font-cartoon mb-2">
                      Probability: <span className={getProbabilityColor(getSelectedSongData()!.openerProbability)}>
                        {getSelectedSongData()!.openerProbability}%
                      </span> ({getProbabilityLabel(getSelectedSongData()!.openerProbability)})
                    </div>
                    <div className="text-sm text-gray-700 font-cartoon mb-2">
                      Last Opened: {getSelectedSongData()!.lastOpener}
                    </div>
                    <div className="text-sm text-gray-700 font-cartoon mb-2">
                      Frequency: {getSelectedSongData()!.frequency}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500 font-cartoon">Pick a song to see stats</div>
                )}
              </div>
            </div>
            {/* Col 7: Padding */}
            <div></div>

          </div>


          {/* Four Ways to Play */}
          <div className="mt-8 mb-8 perspective-1500 rotateX-12">
            <FourWaysToPlay
              selectedSong={selectedShow ? selectedSong : ''}
              onSubmissionClick={handleSubmission}
              gameType="opener prediction"
              disabled={!selectedSong}
            />
          </div>


          {predictions.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Your Past Predictions</h2>
    <div className="space-y-2">
      {predictions.map((p) => (
        <div
          key={p.id}
          className="border border-gray-300 p-4 rounded-md shadow-sm bg-white"
        >
          <p><strong>Song:</strong> {p.song}</p>
          <p><strong>Mode:</strong> {p.play_mode}</p>
          <p>
            <strong>Winner:</strong>{' '}
            {p.is_winner === true ? '✅ Yes' : p.is_winner === false ? '❌ No' : '⏳ Pending'}
          </p>
          <p className="text-xs text-gray-500">
            Submitted: {new Date(p.submitted_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessOpenerPage;

