import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import SongPicker from '../components/SongPicker';
import ShowSelector from '../components/ShowSelector';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const GuessPostDrumsSongPage = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');

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

  const availableSongs = [
    'Sugar Magnolia', 'Truckin\'', 'Casey Jones', 'Friend of the Devil',
    'Uncle John\'s Band', 'Touch of Grey', 'Ripple', 'One More Saturday Night',
    'Not Fade Away', 'Shakedown Street', 'Good Lovin\'', 'Fire on the Mountain'
  ];

  return (
    <MainLayout>
      <Head>
        <title>Guess the Post Drums/Space Song - Setlist Street</title>
        <meta name="description" content="Predict which song will be played after drums/space" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header with sponsor logos */}
        <div className="flex items-center justify-center mb-2 gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          <div className="w-2"></div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Guess the Post Drums/Space Song</h1>
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

        {/* Padding above ShowSelector */}
        <div className="mt-4"></div>
        <div className="mb-8">
          <ShowSelector
            selectedShow={selectedShow}
            onShowSelect={setSelectedShow}
          />
        </div>
        {/* Padding below ShowSelector */}
        <div className="mb-4"></div>

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
            {/* Add stats or hints here if desired */}
          </div>
          {/* Col 7: Padding */}
          <div></div>
        </div>

        {/* Four Ways to Play */}
        <div className="mt-4 mb-4">
          <FourWaysToPlay />
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessPostDrumsSongPage; 