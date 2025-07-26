import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import SongPicker from '../components/SongPicker';
import ShowSelector from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';
import { Show } from '../types/show';

const PAGE_SIZE = 5; 


const GuessSet2CloserPage = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');
  const [availableSongs, setAvailableSongs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrizeInfo, setShowPrizeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
        // Extract unique song names from setlists
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
        setAvailableSongs(Array.from(songSet).sort());
      } catch (err) {
        console.error('Failed to fetch songs:', err);
      }
    };
    fetchSongs();
  }, []);

   const handlePrizeInfoClick = () => {
    setShowPrizeInfo(true);
  };

  useEffect(() => {
    const calculateTimeToDeadline = () => {
      const now = new Date();
      const showDates = [
        new Date('2025-08-01T19:00:00-07:00'),
        new Date('2025-08-02T19:00:00-07:00'),
        new Date('2025-08-03T19:00:00-07:00'),
      ];
      
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

  return (
    <MainLayout>
      <Head>
        <title>Guess the Set 2 Closer - Setlist Street</title>
        <meta name="description" content="Predict which song will close the second set" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header with sponsor logos */}
        <div className="flex items-center justify-center mb-2 gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          <div className="w-2"></div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Guess the Set 2 Closer</h1>
          <div className="w-2"></div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Time Until Deadline</h2>
          <div className="text-2xl font-bold text-purple-600">{timeToDeadline}</div>
          <p className="text-sm text-gray-600 mt-2">Submissions close at 7:00 PM PT before each show</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">Sponsored by: [PLACEHOLDER SPONSOR NAME]</p>
          <div className="bg-gray-200 rounded-lg p-8 text-gray-500">[SPONSOR LOGO PLACEHOLDER]</div>
        </div>

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
                                                            gameId="guess-set2-closer"
                                                            showId={selectedShow.id}
                                                            onPrizeInfoClick={handlePrizeInfoClick}
                                                            showDate={selectedShow.date}
                                                          />
          
          </div>
        )}

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
                      {/* Manual song entry */}
                      <div className="mt-6">
                        <input
                          type="text"
                          className="w-full px-6 py-4 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-white to-purple-100 shadow focus:outline-none focus:ring-4 focus:ring-purple-300 font-cartoon text-lg text-purple-900 placeholder:text-purple-400 transition-all duration-200"
                          placeholder="Or type any song name..."
                          value={selectedSong}
                          onChange={e => setSelectedSong(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          You can select from the list above or type any song name.
                        </p>
                      </div>
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
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Hints</h3>
              <div className="text-gray-600">
                <p className="mb-2">[PLACEHOLDER - Set 2 closer-specific hints to be added later]</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Epic closing songs</li>
                  <li>Show finale patterns</li>
                  <li>High-energy endings</li>
                  <li>Traditional closers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Hints</h3>
              <div className="text-gray-600">
                <p className="mb-2">[PLACEHOLDER - Set 2 closer-specific hints to be added later]</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Epic closing songs</li>
                  <li>Show finale patterns</li>
                  <li>High-energy endings</li>
                  <li>Traditional closers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Four Ways to Play */}
        <div className="mt-4 mb-4">
          <FourWaysToPlay />
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessSet2CloserPage; 