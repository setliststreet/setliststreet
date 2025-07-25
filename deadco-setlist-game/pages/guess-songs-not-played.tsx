import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import ShowSelector from '../components/ShowSelector';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const GuessSongsNotPlayedPage = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [timeToDeadline, setTimeToDeadline] = useState('');

  // Mock top 25 popular songs - this would come from Supabase
  const top25Songs = [
    { name: 'Sugar Magnolia', popularity: 1, points: 25 },
    { name: 'Truckin\'', popularity: 2, points: 24 },
    { name: 'Casey Jones', popularity: 3, points: 23 },
    { name: 'Friend of the Devil', popularity: 4, points: 22 },
    { name: 'Uncle John\'s Band', popularity: 5, points: 21 },
    { name: 'Ripple', popularity: 6, points: 20 },
    { name: 'Touch of Grey', popularity: 7, points: 19 },
    { name: 'Fire on the Mountain', popularity: 8, points: 18 },
    { name: 'China Cat Sunflower', popularity: 9, points: 17 },
    { name: 'I Know You Rider', popularity: 10, points: 16 },
    { name: 'Playing in the Band', popularity: 11, points: 15 },
    { name: 'Eyes of the World', popularity: 12, points: 14 },
    { name: 'Scarlet Begonias', popularity: 13, points: 13 },
    { name: 'Franklin\'s Tower', popularity: 14, points: 12 },
    { name: 'Deal', popularity: 15, points: 11 },
    { name: 'Jack Straw', popularity: 16, points: 10 },
    { name: 'Tennessee Jed', popularity: 17, points: 9 },
    { name: 'Morning Dew', popularity: 18, points: 8 },
    { name: 'Help on the Way', popularity: 19, points: 7 },
    { name: 'Slipknot!', popularity: 20, points: 6 },
    { name: 'St. Stephen', popularity: 21, points: 5 },
    { name: 'Dark Star', popularity: 22, points: 4 },
    { name: 'Terrapin Station', popularity: 23, points: 3 },
    { name: 'The Other One', popularity: 24, points: 2 },
    { name: 'Attics of My Life', popularity: 25, points: 1 },
  ];

  const availableSongs = top25Songs.map(s => s.name);

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

  const handleSongToggle = (songName: string) => {
    if (selectedSongs.includes(songName)) {
      setSelectedSongs(selectedSongs.filter(song => song !== songName));
    } else if (selectedSongs.length < 15) {
      setSelectedSongs([...selectedSongs, songName]);
    }
  };

  const calculatePotentialPoints = () => {
    return selectedSongs.reduce((total, songName) => {
      const song = top25Songs.find(s => s.name === songName);
      return total + (song?.points || 0);
    }, 0);
  };

  return (
    <MainLayout>
      <Head>
        <title>Guess Songs NOT Played - Setlist Street</title>
        <meta name="description" content="Predict which popular songs won't be played at GD60" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header with sponsor logos */}
        <div className="flex items-center justify-center mb-2 gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          <div className="w-2"></div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Guess Songs NOT Played</h1>
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

        {/* Game Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="mb-2"><strong>Objective:</strong> Select up to 15 popular songs you predict WON'T be played</p>
              <p className="mb-2"><strong>Scoring:</strong> Higher-ranked songs = more points if not played</p>
              <p><strong>Strategy:</strong> Balance popular songs vs. likelihood they won't be played</p>
            </div>
            <div>
              <p className="mb-2"><strong>Selection Limit:</strong> Maximum 15 songs per show</p>
              <p className="mb-2"><strong>Ranking:</strong> #1 most popular = 25 points if not played</p>
              <p><strong>Winner:</strong> Highest total points from correct predictions</p>
            </div>
          </div>
        </div>

        {/* Song Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Songs You Predict WON'T Be Played</h2>
          <SetlistDragDropPicker
            availableSongs={availableSongs}
            maxSongs={15}
            onSetlistChange={setSelectedSongs}
          />
        </div>

        {/* Selection Summary & Hints */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Your Predictions</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Songs you predict WON'T be played:</p>
              <div className="text-2xl font-bold text-red-600">
                {selectedSongs.length} selected
              </div>
              <div className="text-lg font-semibold text-green-600">
                Potential: {calculatePotentialPoints()} points
              </div>
            </div>
            
            {selectedSongs.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Selected Songs:</p>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {selectedSongs.map((songName) => {
                    const song = top25Songs.find(s => s.name === songName);
                    return (
                      <div key={songName} className="flex justify-between text-sm">
                        <span className="truncate">{songName}</span>
                        <span className="text-green-600 font-medium">+{song?.points}pt</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Hints */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Strategy Hints</h3>
            <div className="text-gray-600 space-y-2 text-sm">
              <p>[PLACEHOLDER - Songs NOT played-specific hints to be added later]</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Historical venue patterns</li>
                <li>Recent tour frequencies</li>
                <li>GD60 special considerations</li>
                <li>Popular vs. likely pairings</li>
              </ul>
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

export default GuessSongsNotPlayedPage; 