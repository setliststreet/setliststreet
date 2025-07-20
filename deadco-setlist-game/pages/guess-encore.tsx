import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import ShowSelector from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';
import { Show } from '../types/show';

const availableSongs = [
  'Ripple', 'Touch of Grey', 'Black Muddy River', 'Brokedown Palace',
  'Box of Rain', 'Attics of My Life', 'Sugar Magnolia', 'Uncle John\'s Band',
  'The Weight', 'Knockin\' on Heaven\'s Door', 'Johnny B. Goode', 'Casey Jones',
  'One More Saturday Night', 'U.S. Blues', 'Friend of the Devil', 'Fire on the Mountain',
  'Not Fade Away', 'Good Lovin\'', 'Truckin\'', 'Eyes of the World', 'Stella Blue',
  'Morning Dew', 'Wharf Rat', 'China Cat Sunflower', 'I Know You Rider'
];

const top10CommonEncores = [
  '1. Ripple (42% of shows)',
  '2. Touch of Grey (38% of shows)',
  '3. Black Muddy River (28% of shows)',
  '4. Brokedown Palace (24% of shows)',
  '5. Box of Rain (19% of shows)',
  '6. Attics of My Life (16% of shows)',
  '7. Sugar Magnolia (14% of shows)',
  '8. Uncle John\'s Band (12% of shows)',
  '9. The Weight (11% of shows)',
  '10. Knockin\' on Heaven\'s Door (9% of shows)'
];

const last10Encores = [
  '2025-07-20: Ripple',
  '2025-07-18: Touch of Grey',
  '2025-07-15: Black Muddy River',
  '2025-07-12: Brokedown Palace',
  '2025-07-10: Box of Rain',
  '2025-07-08: Ripple',
  '2025-07-05: Attics of My Life',
  '2025-07-03: Touch of Grey',
  '2025-07-01: Sugar Magnolia',
  '2025-06-28: Uncle John\'s Band'
];

export default function GuessTheEncore() {
  const [selectedSong, setSelectedSong] = useState('');
  const [selectedPlayMode, setSelectedPlayMode] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const handleSongSelect = (song: string) => {
    setSelectedSong(song);
  };

  const handleScrollWheel = (direction: 'up' | 'down') => {
    if (direction === 'up' && scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
      setSelectedSong(allSongs[scrollPosition - 1]);
    } else if (direction === 'down' && scrollPosition < allSongs.length - 1) {
      setScrollPosition(scrollPosition + 1);
      setSelectedSong(allSongs[scrollPosition + 1]);
    }
  };

  const handlePlayModeSelect = (mode: string) => {
    setSelectedPlayMode(mode);
  };

  return (
    <MainLayout>
      <div>
        {/* Header with sponsor logos */}
        <div className="flex items-center justify-center mb-2 gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
          <div className="w-2"></div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Guess the Encore</h1>
          <div className="w-2"></div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
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
              gameId="guess-encore" 
              showId={selectedShow.id}
              showDate={selectedShow.date}
            />
          </div>
        )}

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
          <FourWaysToPlay 
            onSubmissionClick={(playMode, amount) => {
              console.log('Submitting encore prediction:', {
                song: selectedSong,
                playMode: playMode,
                amount: amount,
                game: 'guess-encore'
              });
              alert(`Encore prediction submitted: ${selectedSong} (${playMode} mode)`);
            }}
            gameType="encore prediction"
            disabled={!selectedSong}
          />
        </div>
      </div>
    </MainLayout>
  );
} 