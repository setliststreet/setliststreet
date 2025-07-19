import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const mockSongs = [
  'Feel Like a Stranger',
  'Help on the Way',
  'Tennessee Jed',
  'The Music Never Stopped',
  'Truckin\'',
  'Sugar Magnolia',
  'Touch of Grey',
  'Shakedown Street',
  'Uncle John\'s Band',
  'Box of Rain',
  'Friend of the Devil',
  'Casey Jones',
  'Fire on the Mountain',
  'Eyes of the World',
  'Dark Star'
];

const mockShow = {
  date: '2025-07-25',
  venue: 'Sphere Las Vegas',
  city: 'Las Vegas, NV'
};

export default function GuessTheOpener() {
  const [selectedSong, setSelectedSong] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (selectedSong) {
      setSubmitted(true);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <MainLayout>
      <div>
        <h1>Guess the Opener</h1>
        
        <section>
          <h2>Upcoming Show</h2>
          <div>
            <p>Date: {mockShow.date}</p>
            <p>Venue: {mockShow.venue}</p>
            <p>City: {mockShow.city}</p>
          </div>
        </section>

        {!submitted ? (
          <section>
            <h2>Select Your Opener Prediction</h2>
            <div>
              {mockSongs.map((song) => (
                <div key={song}>
                  <input
                    type="radio"
                    id={song}
                    name="opener"
                    value={song}
                    checked={selectedSong === song}
                    onChange={(e) => setSelectedSong(e.target.value)}
                  />
                  <label htmlFor={song}>{song}</label>
                </div>
              ))}
            </div>
            
            <div>
              <button onClick={handleSubmit} disabled={!selectedSong}>
                Submit Guess
              </button>
            </div>
          </section>
        ) : (
          <section>
            <h2>Guess Submitted</h2>
            <p>Your prediction: {selectedSong}</p>
            <p>Results will be available after the show.</p>
            
            <div>
              <button onClick={() => setSubmitted(false)}>
                Change Guess
              </button>
            </div>
          </section>
        )}

        <section>
          <h2>Previous Results</h2>
          <button onClick={toggleResults}>
            {showResults ? 'Hide Results' : 'Show Previous Results'}
          </button>
          
          {showResults && (
            <div>
              <h3>Recent Shows</h3>
              <div>
                <h4>2025-07-20 - Sphere Las Vegas</h4>
                <p>Actual Opener: Feel Like a Stranger</p>
                <p>Correct Guesses: 34 out of 127 players (26.8%)</p>
              </div>
              <div>
                <h4>2025-07-18 - Sphere Las Vegas</h4>
                <p>Actual Opener: Help on the Way</p>
                <p>Correct Guesses: 18 out of 142 players (12.7%)</p>
              </div>
              <div>
                <h4>2025-07-15 - Sphere Las Vegas</h4>
                <p>Actual Opener: Truckin'</p>
                <p>Correct Guesses: 42 out of 156 players (26.9%)</p>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2>Game Stats</h2>
          <div>
            <p>Total Players: 1,247</p>
            <p>Average Success Rate: 23.4%</p>
            <p>Most Popular Guess: Feel Like a Stranger (18.2%)</p>
            <p>Least Guessed Opener: Dark Star (2.1%)</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 