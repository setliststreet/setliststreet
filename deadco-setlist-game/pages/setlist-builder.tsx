import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// Mock database of ~200 songs (simplified for demo)
const allSongs = [
  'Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'Tennessee Jed',
  'The Harder They Come', 'Casey Jones', 'Passenger', 'Scarlet Begonias', 'Fire on the Mountain',
  'Estimated Prophet', 'Eyes of the World', 'Looks Like Rain', 'Tangled Up in Blue', 'Ripple',
  'Truckin\'', 'Sugar Magnolia', 'Uncle John\'s Band', 'Touch of Grey', 'Box of Rain',
  'Friend of the Devil', 'Shakedown Street', 'The Music Never Stopped', 'Dark Star', 'St. Stephen',
  'The Eleven', 'Terrapin Station', 'Playing in the Band', 'China Cat Sunflower', 'I Know You Rider',
  'Turn on Your Love Light', 'Morning Dew', 'Stella Blue', 'Brokedown Palace', 'Black Peter',
  'Wharf Rat', 'Good Lovin\'', 'Not Fade Away', 'Bertha', 'One More Saturday Night',
  'U.S. Blues', 'The Weight', 'Knockin\' on Heaven\'s Door', 'Johnny B. Goode', 'Samson and Delilah',
  'Deal', 'Row Jimmy', 'Lazy Lightning', 'Supplication', 'Cassidy', 'Althea', 'Alabama Getaway',
  'Far From Me', 'Lost Sailor', 'Saint of Circumstance', 'Ship of Fools', 'Hell in a Bucket',
  'West L.A. Fadeaway', 'Throwing Stones', 'Black Muddy River', 'Death Don\'t Have No Mercy',
  'Cumberland Blues', 'Big River', 'Loser', 'Jack Straw', 'Me and My Uncle', 'Big Railroad Blues',
  'Mama Tried', 'El Paso', 'Mexicali Blues', 'Tennessee Walker', 'Born Cross-Eyed', 'Alligator',
  'Caution (Do Not Stop on Tracks)', 'Feedback', 'New Speedway Boogie', 'Easy Wind', 'Attics of My Life',
  'Operator', 'Candyman', 'Going Down the Road Feeling Bad', 'Cold Rain and Snow', 'In the Midnight Hour',
  'The Other One', 'Cryptical Envelopment', 'Drums', 'Space', 'Spanish Jam', 'Fire on the Mountain (Reprise)',
  'And We Bid You Goodnight', 'The Grateful Dead', 'Golden Road (To Unlimited Devotion)', 'Cream Puff War',
  'Viola Lee Blues', 'Morning Dew', 'Doin\' That Rag', 'Mason\'s Children', 'To Lay Me Down',
  'Dire Wolf', 'High Time', 'New Orleans', 'Comes a Time', 'Sugar Magnolia', 'Mr. Charlie',
  'Weather Report Suite', 'Eyes of the World', 'China Doll', 'Crazy Fingers', 'The Music Never Stopped',
  'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'King Solomon\'s Marbles', 'Stronger Than Dirt',
  'The Wheel', 'Samson and Delilah', 'Sunrise', 'Estimated Prophet', 'Barbed Wire Whipping Party',
  'Passenger', 'Terrapin Station', 'Fire on the Mountain', 'Good Lovin\'', 'Shakedown Street',
  'I Need a Miracle', 'From the Heart of Me', 'Stagger Lee', 'All New Minglewood Blues'
];

const mostCommonSongs = [
  '1. Sugar Magnolia (78% of shows)',
  '2. Eyes of the World (72% of shows)', 
  '3. Fire on the Mountain (68% of shows)',
  '4. Truckin\' (65% of shows)',
  '5. Uncle John\'s Band (61% of shows)',
  '6. Touch of Grey (58% of shows)',
  '7. Scarlet Begonias (55% of shows)',
  '8. Deal (52% of shows)',
  '9. Casey Jones (48% of shows)',
  '10. Friend of the Devil (45% of shows)'
];

const leastCommonSongs = [
  '1. Viola Lee Blues (0.8% of shows)',
  '2. Cream Puff War (1.2% of shows)',
  '3. Mason\'s Children (1.5% of shows)',
  '4. King Solomon\'s Marbles (1.8% of shows)',
  '5. Barbed Wire Whipping Party (2.1% of shows)',
  '6. Golden Road (2.4% of shows)',
  '7. High Time (2.7% of shows)',
  '8. Cold Rain and Snow (3.0% of shows)',
  '9. Doin\' That Rag (3.3% of shows)',
  '10. The Grateful Dead (3.6% of shows)'
];

const commonSongPairs = [
  '1. Scarlet Begonias → Fire on the Mountain (89%)',
  '2. Help on the Way → Slipknot! → Franklin\'s Tower (82%)',
  '3. China Cat Sunflower → I Know You Rider (78%)',
  '4. Playing in the Band → Drums → Space (71%)',
  '5. Lost Sailor → Saint of Circumstance (68%)',
  '6. Estimated Prophet → Eyes of the World (45%)',
  '7. Deal → Passenger (42%)',
  '8. Tennessee Jed → Looks Like Rain (38%)',
  '9. Casey Jones → One More Saturday Night (35%)',
  '10. Ripple → Brokedown Palace (32%)'
];

interface SetlistStructure {
  set1: string[];
  set2Before: string[];
  set2After: string[];
  encores: string[][];
}

export default function SetlistBuilder() {
  const [setlist, setSetlist] = useState<SetlistStructure>({
    set1: ['', '', ''],
    set2Before: ['', ''],
    set2After: ['', ''],
    encores: [[''], ['']]
  });
  
  const [selectedPlayMode, setSelectedPlayMode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allSongs.filter(song => 
        song.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSlot = (section: 'set1' | 'set2Before' | 'set2After', encoreIndex?: number) => {
    const newSetlist = { ...setlist };
    if (section === 'set1') {
      newSetlist.set1.push('');
    } else if (section === 'set2Before') {
      newSetlist.set2Before.push('');
    } else if (section === 'set2After') {
      newSetlist.set2After.push('');
    } else if (typeof encoreIndex === 'number') {
      newSetlist.encores[encoreIndex].push('');
    }
    setSetlist(newSetlist);
  };

  const addEncore = () => {
    const newSetlist = { ...setlist };
    newSetlist.encores.push(['']);
    setSetlist(newSetlist);
  };

  const updateSlot = (section: string, index: number, value: string, encoreIndex?: number) => {
    const newSetlist = { ...setlist };
    if (section === 'set1') {
      newSetlist.set1[index] = value;
    } else if (section === 'set2Before') {
      newSetlist.set2Before[index] = value;
    } else if (section === 'set2After') {
      newSetlist.set2After[index] = value;
    } else if (section === 'encore' && typeof encoreIndex === 'number') {
      newSetlist.encores[encoreIndex][index] = value;
    }
    setSetlist(newSetlist);
  };

  const generateRandomSetlist = () => {
    const shuffled = [...allSongs].sort(() => 0.5 - Math.random());
    const newSetlist: SetlistStructure = {
      set1: shuffled.slice(0, 7),
      set2Before: shuffled.slice(7, 11),
      set2After: shuffled.slice(11, 16),
      encores: [shuffled.slice(16, 18), shuffled.slice(18, 20)]
    };
    setSetlist(newSetlist);
  };

  const handlePlayModeSelect = (mode: string) => {
    setSelectedPlayMode(mode);
  };

  return (
    <MainLayout>
      <div>
        <h1>Build Your Own Setlist</h1>
        <p>Winner matches setlist the closest!</p>
        
        <section>
          <h2>Main Content</h2>
          
          {/* Element 4: Random Generate Button */}
          <div>
            <button onClick={generateRandomSetlist}>
              Generate Random Setlist
            </button>
          </div>

          <div>
            {/* Element 1: Scrolling Song List */}
            <div>
              <h3>Song Database (~200 Songs)</h3>
              
              <div>
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                
                {suggestions.length > 0 && (
                  <div>
                    <h4>Suggestions:</h4>
                    <ul>
                      {suggestions.map((song) => (
                        <li key={song}>
                          <button onClick={() => setSearchTerm(song)}>
                            {song}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4>All Songs</h4>
                <select size="10">
                  {allSongs.map((song) => (
                    <option key={song} value={song}>{song}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Element 2: Drag and Drop Setlist Builder */}
            <div>
              <h3>Setlist Structure</h3>
              
              {/* Set 1 */}
              <div>
                <h4>Set 1</h4>
                {setlist.set1.map((song, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={`Song ${index + 1}`}
                      value={song}
                      onChange={(e) => updateSlot('set1', index, e.target.value)}
                    />
                  </div>
                ))}
                <button onClick={() => addSlot('set1')}>+ Add Song to Set 1</button>
              </div>

              {/* Set 2 */}
              <div>
                <h4>Set 2</h4>
                
                <div>
                  <h5>Before Drums/Space</h5>
                  {setlist.set2Before.map((song, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder={`Song ${index + 1}`}
                        value={song}
                        onChange={(e) => updateSlot('set2Before', index, e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={() => addSlot('set2Before')}>+ Add Song Before Drums</button>
                </div>

                <div>
                  <h5>Drums/Space</h5>
                  <p>Drums</p>
                  <p>Space</p>
                </div>

                <div>
                  <h5>After Drums/Space</h5>
                  {setlist.set2After.map((song, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder={`Song ${index + 1}`}
                        value={song}
                        onChange={(e) => updateSlot('set2After', index, e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={() => addSlot('set2After')}>+ Add Song After Space</button>
                </div>
              </div>

              {/* Encores */}
              <div>
                <h4>Encores</h4>
                {setlist.encores.map((encore, encoreIndex) => (
                  <div key={encoreIndex}>
                    <h5>Encore {encoreIndex + 1}</h5>
                    {encore.map((song, songIndex) => (
                      <div key={songIndex}>
                        <input
                          type="text"
                          placeholder={`Encore ${encoreIndex + 1} Song ${songIndex + 1}`}
                          value={song}
                          onChange={(e) => updateSlot('encore', songIndex, e.target.value, encoreIndex)}
                        />
                      </div>
                    ))}
                    <button onClick={() => addSlot('set1', encoreIndex)}>
                      + Add Song to Encore {encoreIndex + 1}
                    </button>
                  </div>
                ))}
                <button onClick={addEncore}>+ Add Another Encore</button>
              </div>
            </div>

            {/* Element 3: Fun Facts & Hints */}
            <div>
              <h3>Hints & Statistics</h3>
              
              <div>
                <h4>Most Common Songs</h4>
                <ul>
                  {mostCommonSongs.map((song, index) => (
                    <li key={index}>{song}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Least Common Songs</h4>
                <ul>
                  {leastCommonSongs.map((song, index) => (
                    <li key={index}>{song}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Most Common Song Pairs</h4>
                <ul>
                  {commonSongPairs.map((pair, index) => (
                    <li key={index}>{pair}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Four Ways to Play</h2>
          <div>
            <button onClick={() => handlePlayModeSelect('fun')}>
              Play for Fun
            </button>
            <button onClick={() => handlePlayModeSelect('charity')}>
              Play for Charity
            </button>
            <button onClick={() => handlePlayModeSelect('cash')}>
              Play for Cash
            </button>
            <button onClick={() => handlePlayModeSelect('prize')}>
              Play for Prize
            </button>
          </div>
          
          {selectedPlayMode && (
            <div>
              <h3>Selected Mode: {selectedPlayMode}</h3>
              <p>Complete your setlist and submit!</p>
              <button>Submit Setlist</button>
            </div>
          )}
        </section>

        <section>
          <h2>Functionality Demo</h2>
          <div>
            <h3>Available Features:</h3>
            <ul>
              <li>✓ Generate random setlist from song database</li>
              <li>✓ Manual typing with autocomplete</li>
              <li>✓ Modify random setlist by typing</li>
              <li>✓ Variable number of slots per section</li>
              <li>✓ Add/remove songs dynamically</li>
              <li>✓ Multiple encore support</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Current Setlist Preview</h2>
          <div>
            <h3>Set 1:</h3>
            <p>{setlist.set1.filter(s => s).join(' → ') || 'Empty'}</p>
            
            <h3>Set 2:</h3>
            <p>Before: {setlist.set2Before.filter(s => s).join(' → ') || 'Empty'}</p>
            <p>Drums → Space</p>
            <p>After: {setlist.set2After.filter(s => s).join(' → ') || 'Empty'}</p>
            
            <h3>Encores:</h3>
            {setlist.encores.map((encore, index) => (
              <p key={index}>
                Encore {index + 1}: {encore.filter(s => s).join(' → ') || 'Empty'}
              </p>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 