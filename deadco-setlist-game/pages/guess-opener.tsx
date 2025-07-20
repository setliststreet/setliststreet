import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import PoolSizeDisplay from '../components/PoolSizeDisplay';

const GuessOpenerPage = () => {
  const [selectedShow, setSelectedShow] = useState(1);
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

  const handleShowSelect = (showId: number) => {
    setSelectedShow(showId);
    // Reset any show-specific selections when switching shows
    setSelectedSong('');
  };

  const handleSubmission = (playMode: 'fun' | 'charity' | 'cash' | 'prize', amount?: number) => {
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
    alert(`Prediction submitted for Show ${selectedShow}: ${selectedSong} (${playMode} mode${amountText})`);
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
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Guess the Opener
          </h1>

          {/* Live Pool Size Display */}
          <PoolSizeDisplay 
            gameId="guess-opener" 
            showId={selectedShow} 
            onPrizeInfoClick={handlePrizeInfoClick}
          />

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

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Time Until Deadline</h2>
            <div className="text-2xl font-bold text-purple-600">{timeToDeadline}</div>
            <p className="text-sm text-gray-600 mt-2">Submissions close at 7:00 PM PT before each show</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">Sponsored by: [PLACEHOLDER SPONSOR NAME]</p>
            <div className="bg-gray-200 rounded-lg p-8 text-gray-500">[SPONSOR LOGO PLACEHOLDER]</div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Choose your show:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 1, label: 'Show 1: Friday, August 1' },
                { id: 2, label: 'Show 2: Saturday, August 2' },
                { id: 3, label: 'Show 3: Sunday, August 3' },
              ].map((show) => (
                <button
                  key={show.id}
                  onClick={() => handleShowSelect(show.id)}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    selectedShow === show.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {show.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h4 className="font-semibold mb-2 text-gray-800">Opener Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Top Openers (All Time)</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>1. Jack Straw (18.9% of shows)</li>
                  <li>2. Casey Jones (15.2% of shows)</li>
                  <li>3. Feel Like a Stranger (14.6% of shows)</li>
                  <li>4. Shakedown Street (13.1% of shows)</li>
                  <li>5. Truckin' (12.3% of shows)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm text-gray-600 mb-2">Recent Openers</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>2024-08-01: Casey Jones</li>
                  <li>2024-07-28: Jack Straw</li>
                  <li>2024-07-20: Feel Like a Stranger</li>
                  <li>2024-07-15: Sugar Magnolia</li>
                  <li>2024-07-10: Deal</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Your Opener Prediction for Show {selectedShow}:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {songs.map((song) => {
                const isSelected = selectedSong === song.name;
                return (
                  <button
                    key={song.name}
                    onClick={() => setSelectedSong(song.name)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{song.name}</div>
                    <div className={`text-sm ${getProbabilityColor(song.openerProbability)}`}>
                      {song.openerProbability}% probability ({getProbabilityLabel(song.openerProbability)})
                    </div>
                  </button>
                );
              })}
            </div>
            
            {selectedSong && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Data Insight:</strong> Songs with 15%+ probability have opened 67% of recent shows.
                </p>
              </div>
            )}
          </div>

          {selectedSong && (
            <FourWaysToPlay onSubmissionClick={handleSubmission} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessOpenerPage; 