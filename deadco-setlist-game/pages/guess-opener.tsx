import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import ShowSelector from '../components/ShowSelector';
import { Show } from '../components/ShowSelector';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const GuessOpenerPage = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPrizeInfo, setShowPrizeInfo] = useState(false);

  // Mock song database with probability data - would come from Supabase
  const songs = [
    { name: 'Sugar Magnolia', openerProbability: 8.5, lastOpener: '2024-07-15', frequency: 'High' },
    { name: 'Truckin\'', openerProbability: 12.3, lastOpener: '2024-06-22', frequency: 'High' },
    { name: 'Casey Jones', openerProbability: 15.2, lastOpener: '2024-08-01', frequency: 'Very High' },
    { name: 'Friend of the Devil', openerProbability: 6.7, lastOpener: '2024-05-18', frequency: 'Medium' },
    { name: 'Uncle John\'s Band', openerProbability: 4.2, lastOpener: '2024-04-12', frequency: 'Low' },
    { name: 'Jack Straw', openerProbability: 18.9, lastOpener: '2024-07-28', frequency: 'Very High' },
    { name: 'Tennessee Jed', openerProbability: 11.4, lastOpener: '2024-06-05', frequency: 'High' },
    { name: 'Deal', openerProbability: 9.8, lastOpener: '2024-07-10', frequency: 'High' },
    { name: 'Feel Like a Stranger', openerProbability: 14.6, lastOpener: '2024-07-20', frequency: 'High' },
    { name: 'Shakedown Street', openerProbability: 13.1, lastOpener: '2024-06-30', frequency: 'High' }
  ];

  // Mock prize data
  const prizeInfo = [
    { sponsor: '[TBD Sponsor 1]', prize: 'Vintage Dead & Company Poster', value: '$75' },
    { sponsor: '[TBD Sponsor 2]', prize: 'Exclusive Tour T-Shirt', value: '$50' },
    { sponsor: '[TBD Sponsor 3]', prize: 'VIP Show Access Pass', value: '$200' },
    { sponsor: '[TBD Sponsor 4]', prize: 'Signed Setlist Print', value: '$150' },
  ];

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

  const getSelectedSongData = () => {
    return songs.find(song => song.name === selectedSong);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 15) return 'text-green-600';
    if (probability >= 10) return 'text-yellow-600';
    if (probability >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 15) return 'Very Likely';
    if (probability >= 10) return 'Likely';
    if (probability >= 5) return 'Possible';
    return 'Unlikely';
  };

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    // Reset any show-specific selections when switching shows
    setSelectedSong('');
  };

  const handleSubmission = (playMode: string, amount?: number) => {
    if (!selectedSong) {
      alert('Please select a song first');
      return;
    }
    
    console.log('Submitting prediction:', {
      show: selectedShow,
      song: selectedSong,
      playMode: playMode,
      amount: amount,
      game: 'guess-opener'
    });
    
    // Here would be actual submission logic
    const amountText = amount ? ` ($${amount})` : '';
    alert(`Prediction submitted for Show ${selectedShow ? selectedShow.id : ''}: ${selectedSong} (${playMode} mode${amountText})`);
  };

  const handlePrizeInfoClick = () => {
    setShowPrizeInfo(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>Guess the Opener - Setlist Street</title>
        <meta name="description" content="Predict which song will open the first set at GD60" />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header with sponsor logos */}
          <div className="flex items-center justify-center mb-2 gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
            <div className="w-2"></div>
            <h1 className="text-3xl font-bold text-center">Guess the Opener</h1>
            <div className="w-2"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          </div>
          <div className="text-center text-gray-600 mb-6">
            Guess the opener for each show! Each show is its own game.
          </div>

          {/* Prize Info Modal */}
          {showPrizeInfo && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Available Prizes - Guess the Opener</h3>
                  <button
                    onClick={() => setShowPrizeInfo(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  {prizeInfo.map((prize, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-800">{prize.prize}</h4>
                          <p className="text-sm text-gray-600">Sponsored by: {prize.sponsor}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">{prize.value}</span>
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
          <div className="mb-8">
            <ShowSelector
              selectedShow={selectedShow || undefined}
              onShowSelect={handleShowSelect}
            />
          </div>
          {/* Padding below ShowSelector */}
          <div className="mb-4"></div>

          {/* Sponsor section moved here */}
          {selectedShow && (
            <div className="flex items-center justify-center mb-8 gap-4">
              <span className="text-lg font-semibold text-gray-700">[PLACEHOLDER SPONSOR NAME]</span>
              <span className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-2xl">[PLACEHOLDER SPONSOR LOGO]</span>
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
          <h2 className="text-2xl font-bold text-center mb-4">Opener Guess</h2>

          {/* Main Game Grid */}
          <div className="grid grid-cols-7 gap-0 mb-8">
            {/* Col 1: Padding */}
            <div></div>
            {/* Col 2: Song Selection (List + Type-in) */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gray-800">Song Selection</h4>
                {/* Song List (drag/click to select) */}
                <div className="mb-2">
                  <div className="h-48 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
                    {songs.map((song) => (
                      <div
                        key={song.name}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', song.name);
                        }}
                        onClick={() => setSelectedSong(song.name)}
                        className={`p-2 bg-white border border-gray-200 rounded cursor-move hover:bg-blue-50 hover:border-blue-300 text-xs transition-all shadow-sm mb-1 ${selectedSong === song.name ? 'bg-blue-100 border-blue-400' : ''}`}
                      >
                        {song.name}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Type-in input */}
                <input
                  type="text"
                  placeholder="Type song name or use wheel..."
                  value={selectedSong}
                  onChange={(e) => setSelectedSong(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2"
                  onDrop={(e) => {
                    const name = e.dataTransfer.getData('text/plain');
                    if (name) setSelectedSong(name);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                />
              </div>
            </div>
            {/* Col 3: Small Padding */}
            <div className="w-2"></div>
            {/* Col 4: Selected Song */}
            <div>
              <div
                className="bg-white border border-gray-200 rounded-lg p-4 min-h-[120px] flex flex-col items-center justify-center"
                onDrop={(e) => {
                  e.preventDefault();
                  const name = e.dataTransfer.getData('text/plain');
                  if (name) setSelectedSong(name);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <h4 className="font-semibold mb-2 text-gray-800">Selected Song</h4>
                {selectedSong ? (
                  <div className="text-lg font-bold text-purple-700">{selectedSong}</div>
                ) : (
                  <div className="text-gray-400">No song selected</div>
                )}
              </div>
            </div>
            {/* Col 5: Small Padding */}
            <div className="w-2"></div>
            {/* Col 6: Opener Statistics */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gray-800">Opener Statistics</h4>
                {selectedSong && getSelectedSongData() ? (
                  <>
                    <div className="text-sm text-gray-600 mb-1">
                      Probability: <span className={getProbabilityColor(getSelectedSongData()!.openerProbability)}>
                        {getSelectedSongData()!.openerProbability}%
                      </span> ({getProbabilityLabel(getSelectedSongData()!.openerProbability)})
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Last Opened: {getSelectedSongData()!.lastOpener}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Frequency: {getSelectedSongData()!.frequency}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400">Select a song to see stats</div>
                )}
              </div>
            </div>
            {/* Col 7: Padding */}
            <div></div>
          </div>

          {/* Four Ways to Play */}
          <div className="mt-4 mb-4">
            <FourWaysToPlay 
              onSubmissionClick={handleSubmission}
              gameType="opener prediction"
              disabled={!selectedSong}
            />
          </div>
          {/* Only a small row of padding before footer */}
          <div className="mb-4"></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessOpenerPage; 