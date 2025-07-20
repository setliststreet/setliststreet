import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';

const allSongs = [
  'Ripple',
  'Touch of Grey',
  'Black Muddy River',
  'Brokedown Palace',
  'Box of Rain',
  'Attics of My Life',
  'Sugar Magnolia',
  'Uncle John\'s Band',
  'The Weight',
  'Knockin\' on Heaven\'s Door',
  'Johnny B. Goode',
  'Casey Jones',
  'One More Saturday Night',
  'U.S. Blues',
  'Friend of the Devil',
  'Fire on the Mountain',
  'Not Fade Away',
  'Good Lovin\'',
  'Truckin\'',
  'Eyes of the World',
  'Stella Blue',
  'Morning Dew',
  'Wharf Rat',
  'China Cat Sunflower',
  'I Know You Rider'
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
        <h1>Guess the Encore</h1>
        
        <section>
          <h2>Main Content</h2>
          
          <div>
            {/* Box 1: Song Guess */}
            <div>
              <h3>Song Guess</h3>
              <input 
                type="text" 
                value={selectedSong} 
                onChange={(e) => setSelectedSong(e.target.value)}
                placeholder="Type or select a song"
              />
            </div>

            {/* iPod Style Scroll Wheel */}
            <div>
              <h3>Song Selector</h3>
              <div>
                <button onClick={() => handleScrollWheel('up')}>↑ Up</button>
                <div>
                  <p>Current: {allSongs[scrollPosition] || 'Select a song'}</p>
                  <button onClick={() => handleSongSelect(allSongs[scrollPosition])}>
                    Select This Song
                  </button>
                </div>
                <button onClick={() => handleScrollWheel('down')}>↓ Down</button>
              </div>
              
              <div>
                <h4>All Songs</h4>
                <select 
                  value={selectedSong} 
                  onChange={(e) => handleSongSelect(e.target.value)}
                >
                  <option value="">Choose a song...</option>
                  {allSongs.map((song) => (
                    <option key={song} value={song}>{song}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fun Facts / Hints */}
            <div>
              <h3>Hints & Fun Facts</h3>
              
              <div>
                <h4>Top 10 Most Common Encores</h4>
                <ul>
                  {top10CommonEncores.map((encore, index) => (
                    <li key={index}>{encore}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Last 10 Encores</h4>
                <ul>
                  {last10Encores.map((encore, index) => (
                    <li key={index}>{encore}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
    </MainLayout>
  );
} 