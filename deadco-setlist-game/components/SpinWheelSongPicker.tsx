import React, { useState } from 'react';

export default function SpinWheelSongPicker() {
  const [selectedSong, setSelectedSong] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

  const songs = [
    'Sugar Magnolia', 'Fire on the Mountain', 'Truckin\'', 'Eyes of the World',
    'Uncle John\'s Band', 'Touch of Grey', 'Scarlet Begonias', 'Deal'
  ];

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setSelectedSong(randomSong);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Spin Wheel Song Picker
      </h3>
      
      <div className="mb-6">
        <div 
          className={`
            w-48 h-48 mx-auto rounded-full border-4 border-blue-500 
            flex items-center justify-center transition-transform duration-2000
            ${isSpinning ? 'animate-spin' : ''}
          `}
          style={{ 
            background: 'conic-gradient(red 0deg 45deg, orange 45deg 90deg, yellow 90deg 135deg, green 135deg 180deg, blue 180deg 225deg, indigo 225deg 270deg, violet 270deg 315deg, red 315deg 360deg)'
          }}
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all
          ${isSpinning 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }
        `}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>

      {selectedSong && !isSpinning && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            Selected: {selectedSong}
          </p>
        </div>
      )}
    </div>
  );
}
