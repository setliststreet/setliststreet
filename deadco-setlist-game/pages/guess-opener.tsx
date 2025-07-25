import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import ShowSelector from '../components/ShowSelector';
import { Show } from '../components/ShowSelector';

const PAGE_SIZE = 4;

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

        const songMap: Record<string, { count: number; lastOpener: string }> = {};

        data.setlist.forEach((setlist: any) => {
          const showDate = setlist.eventDate;
          if (setlist.sets?.set) {
            const firstSet = setlist.sets.set[0];
            if (firstSet?.song?.length) {
              const opener = firstSet.song[0].name;
              if (opener) {
                if (!songMap[opener]) {
                  songMap[opener] = { count: 0, lastOpener: '' };
                }
                songMap[opener].count += 1;

                const prev = new Date(songMap[opener].lastOpener.split('-').reverse().join('-'));
                const curr = new Date(showDate.split('-').reverse().join('-'));
                if (!songMap[opener].lastOpener || curr > prev) {
                  songMap[opener].lastOpener = showDate;
                }
              }
            }
          }
        });

        const total = Object.values(songMap).reduce((sum, s) => sum + s.count, 0);

        const processedSongs = Object.entries(songMap).map(([name, stats]) => {
          const probability = ((stats.count / total) * 100).toFixed(1);
          let frequency = 'Low';
          if (stats.count >= 5) frequency = 'Very High';
          else if (stats.count >= 3) frequency = 'High';
          else if (stats.count >= 2) frequency = 'Medium';

          return {
            name,
            openerProbability: parseFloat(probability),
            lastOpener: stats.lastOpener,
            frequency,
          };
        });

        setSongs(processedSongs);
      } catch (err) {
        console.error('Failed to fetch songs:', err);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const calcDeadline = () => {
      const now = new Date();
      const showDates = [
        new Date('2025-08-01T19:00:00-07:00'),
        new Date('2025-08-02T19:00:00-07:00'),
        new Date('2025-08-03T19:00:00-07:00'),
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

  const getSelectedSongData = () => songs.find(song => song.name === selectedSong);
  const getProbabilityColor = (prob: number) =>
    prob >= 15 ? 'text-green-500' : prob >= 10 ? 'text-yellow-400' : prob >= 5 ? 'text-orange-400' : 'text-red-400';
  const getProbabilityLabel = (prob: number) =>
    prob >= 15 ? 'Very Likely' : prob >= 10 ? 'Likely' : prob >= 5 ? 'Possible' : 'Unlikely';

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    setSelectedSong('');
  };

  const handleSubmission = (playMode: string, amount?: number) => {
    if (!selectedSong) {
      alert('Please select a song first');
      return;
    }
    console.log('Submitting:', { show: selectedShow, song: selectedSong, playMode, amount });
    const amountText = amount ? ` ($${amount})` : '';
    alert(`Prediction submitted for Show ${selectedShow ? selectedShow.id : ''}: ${selectedSong} (${playMode} mode${amountText})`);
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

      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Sponsor Logos */}
          <div className="flex items-center justify-center mb-8 gap-8 perspective-1500 rotateX-12">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center text-5xl font-extrabold text-purple-900 shadow-cartoon">
              🎸
            </div>
            <h1 className="logo-text">Guess the Opener</h1>
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center text-5xl font-extrabold text-purple-900 shadow-cartoon">
              🎵
            </div>
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
          <div className="mb-12 perspective-1500 rotateX-12">
            <ShowSelector
              selectedShow={selectedShow || undefined}
              onShowSelect={handleShowSelect}
            />
          </div>

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
                onPrizeInfoClick={handlePrizeInfoClick}
                showDate={selectedShow.date}
              />

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Until Deadline</h3>
                <div className="text-2xl font-bold text-purple-600">{timeToDeadline}</div>
                <p className="text-sm text-gray-600 mt-2">Submissions close at 7:00 PM PT before each show</p>
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
                <h4 className="font-display font-extrabold text-3xl gradient-text-deadco mb-4">Song Selection</h4>
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
              onSubmissionClick={handleSubmission}
              gameType="opener prediction"
              disabled={!selectedSong}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessOpenerPage;
