import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// Mock database songs for bingo
const allSongs = [
  'Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'Tennessee Jed',
  'The Harder They Come', 'Casey Jones', 'Passenger', 'Scarlet Begonias', 'Fire on the Mountain',
  'Estimated Prophet', 'Eyes of the World', 'Looks Like Rain', 'Tangled Up in Blue', 'Ripple',
  'Truckin\'', 'Sugar Magnolia', 'Uncle John\'s Band', 'Touch of Grey', 'Box of Rain',
  'Friend of the Devil', 'Shakedown Street', 'The Music Never Stopped', 'Dark Star', 'St. Stephen',
  'The Eleven', 'Terrapin Station', 'Playing in the Band', 'China Cat Sunflower', 'I Know You Rider',
  'Turn on Your Love Light', 'Morning Dew', 'Stella Blue', 'Brokedown Palace', 'Black Peter',
  'Wharf Rat', 'Good Lovin\'', 'Not Fade Away', 'Bertha', 'One More Saturday Night',
  'U.S. Blues', 'The Weight', 'Knockin\' on Heaven\'s Door', 'Johnny B. Goode', 'Samson and Delilah'
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
  '1. Dark Star (8% of shows)',
  '2. St. Stephen (12% of shows)',
  '3. The Eleven (15% of shows)',
  '4. Terrapin Station (18% of shows)',
  '5. Morning Dew (22% of shows)',
  '6. Wharf Rat (25% of shows)',
  '7. Black Peter (28% of shows)',
  '8. Stella Blue (31% of shows)',
  '9. Brokedown Palace (34% of shows)',
  '10. Playing in the Band (37% of shows)'
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

type BingoBoard = (string | null)[][];

export default function SetlistBingo() {
  const [bingoBoard, setBingoBoard] = useState<BingoBoard>(() => {
    // Initialize 5x5 board with empty strings, center is FREE
    const board = Array(5).fill(null).map(() => Array(5).fill(''));
    board[2][2] = 'FREE'; // Center square
    return board;
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

  const updateBingoSquare = (row: number, col: number, value: string) => {
    if (row === 2 && col === 2) return; // Can't change FREE space
    
    const newBoard = [...bingoBoard];
    newBoard[row][col] = value;
    setBingoBoard(newBoard);
  };

  const generateRandomBoard = () => {
    const shuffled = [...allSongs].sort(() => 0.5 - Math.random());
    const newBoard = Array(5).fill(null).map(() => Array(5).fill(''));
    
    let songIndex = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          newBoard[row][col] = 'FREE';
        } else {
          newBoard[row][col] = shuffled[songIndex] || '';
          songIndex++;
        }
      }
    }
    
    setBingoBoard(newBoard);
  };

  const clearBoard = () => {
    const newBoard = Array(5).fill(null).map(() => Array(5).fill(''));
    newBoard[2][2] = 'FREE';
    setBingoBoard(newBoard);
  };

  const handlePlayModeSelect = (mode: string) => {
    setSelectedPlayMode(mode);
  };

  return (
    <MainLayout>
      <div>
        <h1>Setlist Bingo</h1>
        <p>Win by matching all four corners or getting 5 in a straight line.</p>
        
        <section>
          <h2>Main Content</h2>
          
          {/* Random Fill Button */}
          <div>
            <button onClick={generateRandomBoard}>
              Randomly Fill Bingo Board
            </button>
            <button onClick={clearBoard}>
              Clear Board
            </button>
          </div>

          <div>
            {/* Element 1: Scrolling Song List */}
            <div>
              <h3>Song Database</h3>
              
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

            {/* Element 2: 5x5 Bingo Board */}
            <div>
              <h3>5x5 Bingo Board</h3>
              
              <table>
                <thead>
                  <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                  </tr>
                </thead>
                <tbody>
                  {bingoBoard.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`}>
                          {rowIndex === 2 && colIndex === 2 ? (
                            <div>FREE</div>
                          ) : (
                            <input
                              type="text"
                              value={cell || ''}
                              onChange={(e) => updateBingoSquare(rowIndex, colIndex, e.target.value)}
                              placeholder={`${rowIndex + 1}-${colIndex + 1}`}
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div>
                <h4>How to Win:</h4>
                <ul>
                  <li>All four corners</li>
                  <li>5 in a straight line (horizontal, vertical, or diagonal)</li>
                  <li>Full board (blackout)</li>
                </ul>
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
          <h2>Functionality</h2>
          <div>
            <h3>Available Features:</h3>
            <ul>
              <li>✓ Generate random board from song database</li>
              <li>✓ Manual typing with autocomplete</li>
              <li>✓ Modify random board by typing</li>
              <li>✓ Search and select from song list</li>
              <li>✓ Free space in center</li>
              <li>✓ Multiple winning conditions</li>
            </ul>
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
              <p>Complete your bingo board and submit!</p>
              <button>Submit Bingo Board</button>
            </div>
          )}
        </section>

        <section>
          <h2>Current Board Preview</h2>
          <div>
            <h3>Your Bingo Board:</h3>
            {bingoBoard.map((row, rowIndex) => (
              <div key={rowIndex}>
                Row {rowIndex + 1}: {row.map((cell, colIndex) => 
                  `[${cell || 'Empty'}]`
                ).join(' ')}
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 