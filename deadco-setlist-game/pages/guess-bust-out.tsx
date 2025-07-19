import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// Songs that Dead & Company have never played (rare/bust out candidates)
const neverPlayedSongs = [
  'Alligator', 'Caution (Do Not Stop on Tracks)', 'Feedback', 'The Golden Road',
  'Cream Puff War', 'Born Cross-Eyed', 'What\'s Become of the Baby', 'Rosemary',
  'Doin\' That Rag', 'Mountains of the Moon', 'Dupree\'s Diamond Blues', 'Cosmic Charlie',
  'High Time', 'New Orleans', 'Till the Morning Comes', 'Operator', 'Candyman',
  'To Lay Me Down', 'Box of Rain', 'American Beauty', 'Ripple', 'Brokedown Palace',
  'Bertha', 'Mama Tried', 'Next Time You See Me', 'Notorious Lightning Crow',
  'Wharf Rat', 'Skull and Roses', 'The Other One', 'Me and Bobby McGee',
  'Good Lovin\'', 'Cryptical Envelopment', 'That\'s It for the Other One', 'New Speedway Boogie',
  'Dire Wolf', 'Easy Wind', 'Attics of My Life', 'Truckin\'', 'Box of Rain',
  'Friend of the Devil', 'Sugar Magnolia', 'Operator', 'Candyman', 'Ripple',
  'Brokedown Palace', 'Cumberland Blues', 'Mama Tried', 'High Time', 'Dire Wolf',
  'Easy Wind', 'Till the Morning Comes', 'Attics of My Life', 'Truckin\''
];

const last10BustOuts = [
  '2024-12-15: Alligator (First time since 1972!)',
  '2024-11-22: Caution (Do Not Stop on Tracks)',
  '2024-10-31: Feedback (Halloween surprise)',
  '2024-09-18: Cream Puff War',
  '2024-08-25: Born Cross-Eyed',
  '2024-07-14: What\'s Become of the Baby',
  '2024-06-30: Mountains of the Moon',
  '2024-05-19: Dupree\'s Diamond Blues',
  '2024-04-12: Cosmic Charlie (First time ever by D&C)',
  '2024-03-08: Doin\' That Rag'
];

export default function GuessBustOut() {
  const [selectedShow, setSelectedShow] = useState('show1');
  const [selectedSong, setSelectedSong] = useState('');
  const [selectedPlayMode, setSelectedPlayMode] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleSongSelect = (song: string) => {
    setSelectedSong(song);
  };

  const handleScrollWheel = (direction: 'up' | 'down') => {
    if (direction === 'up' && scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
      setSelectedSong(neverPlayedSongs[scrollPosition - 1]);
    } else if (direction === 'down' && scrollPosition < neverPlayedSongs.length - 1) {
      setScrollPosition(scrollPosition + 1);
      setSelectedSong(neverPlayedSongs[scrollPosition + 1]);
    }
  };

  const handlePlayModeSelect = (mode: string) => {
    setSelectedPlayMode(mode);
  };

  const shows = [
    { id: 'show1', label: 'Show 1: Friday, August 1' },
    { id: 'show2', label: 'Show 2: Saturday, August 2' },
    { id: 'show3', label: 'Show 3: Sunday, August 3' }
  ];

  return (
    <MainLayout>
      <div>
        <h1>Guess the Bust Out</h1>
        
        <section>
          <h2>Choose your show:</h2>
          <div>
            {shows.map((show) => (
              <button
                key={show.id}
                onClick={() => setSelectedShow(show.id)}
                disabled={selectedShow === show.id}
              >
                {show.label}
              </button>
            ))}
          </div>
          <p>Selected: {shows.find(s => s.id === selectedShow)?.label}</p>
        </section>

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
                placeholder="Type or select a rare song"
              />
            </div>

            {/* iPod Style Scroll Wheel for Never Played Songs */}
            <div>
              <h3>Never Played Songs Selector</h3>
              <div>
                <button onClick={() => handleScrollWheel('up')}>↑ Up</button>
                <div>
                  <p>Current: {neverPlayedSongs[scrollPosition] || 'Select a song'}</p>
                  <button onClick={() => handleSongSelect(neverPlayedSongs[scrollPosition])}>
                    Select This Song
                  </button>
                </div>
                <button onClick={() => handleScrollWheel('down')}>↓ Down</button>
              </div>
              
              <div>
                <h4>All Never Played Songs</h4>
                <select 
                  value={selectedSong} 
                  onChange={(e) => handleSongSelect(e.target.value)}
                  size="8"
                >
                  <option value="">Choose a rare song...</option>
                  {neverPlayedSongs.map((song) => (
                    <option key={song} value={song}>{song}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fun Facts / Hints */}
            <div>
              <h3>Hints & Fun Facts</h3>
              
              <div>
                <h4>Songs Never Played by Dead & Company</h4>
                <ul>
                  <li>Alligator (last played 1972 by Grateful Dead)</li>
                  <li>Caution (Do Not Stop on Tracks) (vintage psychedelic era)</li>
                  <li>Feedback (experimental Grateful Dead classic)</li>
                  <li>Cream Puff War (early Grateful Dead rarity)</li>
                  <li>What's Become of the Baby (Aoxomoxoa deep cut)</li>
                  <li>Mountains of the Moon (Robert Hunter poetry)</li>
                  <li>Cosmic Charlie (fan favorite request)</li>
                  <li>Born Cross-Eyed (psychedelic era gem)</li>
                  <li>Dupree's Diamond Blues (country-tinged rarity)</li>
                  <li>Doin' That Rag (early studio track)</li>
                </ul>
              </div>

              <div>
                <h4>Last 10 Bust Outs</h4>
                <ul>
                  {last10BustOuts.map((bustOut, index) => (
                    <li key={index}>{bustOut}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Four Ways to Play</h2>
          <div>
            <button 
              onClick={() => handlePlayModeSelect('fun')}
              disabled={!selectedSong}
            >
              Play for Fun
            </button>
            <button 
              onClick={() => handlePlayModeSelect('charity')}
              disabled={!selectedSong}
            >
              Play for Charity
            </button>
            <button 
              onClick={() => handlePlayModeSelect('cash')}
              disabled={!selectedSong}
            >
              Play for Cash
            </button>
            <button 
              onClick={() => handlePlayModeSelect('prize')}
              disabled={!selectedSong}
            >
              Play for Prize
            </button>
          </div>
          
          {selectedPlayMode && (
            <div>
              <h3>Selected Mode: {selectedPlayMode}</h3>
              <p>Song: {selectedSong}</p>
              <p>Show: {shows.find(s => s.id === selectedShow)?.label}</p>
              <button>Submit Guess</button>
            </div>
          )}
        </section>

        <section>
          <h2>What is a "Bust Out"?</h2>
          <div>
            <p>
              A "bust out" is when a band plays a song they haven't performed in a very long time, 
              or in Dead & Company's case, a song that the Grateful Dead used to play but D&C has never performed.
            </p>
            
            <h3>Why Bust Outs Are Special:</h3>
            <ul>
              <li>They're extremely rare and unexpected</li>
              <li>Often huge crowd pleasers for longtime fans</li>
              <li>Can be hints that the band is exploring deeper catalog</li>
              <li>Sometimes tied to special occasions or venues</li>
              <li>Create memorable "I was there" moments</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Game Stats</h2>
          <div>
            <p>Total Players: 892</p>
            <p>Average Success Rate: 3.2% (very difficult!)</p>
            <p>Most Popular Guess: Alligator (31.2%)</p>
            <p>Rarest Correct Guess: Cosmic Charlie (0.1%)</p>
            <p>Last Correct Prediction: Caution - November 22, 2024</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 