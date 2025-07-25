import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import type { Show } from '../components/ShowSelector';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const GuessSet1CloserPage = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');

  // Mock song database - would come from Supabase
  const availableSongs = [
    'Sugar Magnolia', 'Truckin\'', 'Casey Jones', 'Friend of the Devil',
    'Uncle John\'s Band', 'Touch of Grey', 'Ripple', 'One More Saturday Night',
    'Not Fade Away', 'Shakedown Street', 'Good Lovin\'', 'Fire on the Mountain'
  ];

  // Calculate time to deadline
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

  const handleSubmit = () => {
    if (!selectedSong) {
      alert('Please select a song!');
      return;
    }
    console.log('Submitted:', { show: selectedShow, song: selectedSong });
    alert('Prediction submitted successfully!');
  };

  return (
    <MainLayout>
      <Head>
        <title>Guess Set 1 Closer - Setlist Street</title>
        <meta name="description" content="Predict which song will close the first set" />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header with sponsor logos */}
          <div className="flex items-center justify-center mb-2 gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
            <div className="w-2"></div>
            <h1 className="text-4xl font-bold text-gray-800 text-center">Guess the Set 1 Closer</h1>
            <div className="w-2"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-center">
            Predict which song will close the first set for Dead & Company
          </p>

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
                gameId="guess-set1-closer"
                showId={selectedShow?.id}
                showDate={selectedShow?.date}
              />
            </div>
          )}
          {/* Padding below ShowSelector */}
          <div className="mb-4"></div>

          {/* Four Ways to Play */}
          <div className="mt-4 mb-4">
            {/* This component is not defined in the original file, so it's commented out */}
            {/* <FourWaysToPlay /> */}
          </div>

          {/* Main Game Grid */}
          <div className="grid grid-cols-7 gap-0 mb-8">
            {/* Col 1: Padding */}
            <div></div>
            {/* Col 2: Song Selection (Drag & Drop) */}
            <div>
              <SetlistDragDropPicker
                availableSongs={availableSongs}
                maxSongs={1}
                onSetlistChange={(setlist) => setSelectedSong(setlist[0] || '')}
              />
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Submit Prediction
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessSet1CloserPage;