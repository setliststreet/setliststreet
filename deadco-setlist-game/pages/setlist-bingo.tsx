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
  const [draggedSong, setDraggedSong] = useState<string | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allSongs.filter(song => 
        song.toLowerCase().includes(value.toLowerCase()) &&
        !bingoBoard.flat().includes(song)
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
    setSearchTerm('');
    setSuggestions([]);
  };

  const clearSquare = (row: number, col: number) => {
    if (row === 2 && col === 2) return; // Can't change FREE space
    
    const newBoard = [...bingoBoard];
    newBoard[row][col] = '';
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

  const handleDragStart = (e: React.DragEvent, song: string) => {
    setDraggedSong(song);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    if (draggedSong && row !== 2 || col !== 2) {
      updateBingoSquare(row, col, draggedSong);
    }
    setDraggedSong(null);
  };

  const handleSubmit = () => {
    const filledSquares = bingoBoard.flat().filter(cell => cell && cell !== '').length;
    
    if (filledSquares < 20) { // 24 total minus 4 empty minimum
      alert('Please fill in more squares! You need at least 20 songs on your bingo card.');
      return;
    }

    if (!selectedPlayMode) {
      alert('Please select a play mode!');
      return;
    }

    console.log('Bingo card submitted:', bingoBoard);
    alert('Bingo card submitted successfully!');
  };

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Setlist Bingo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your 5x5 bingo card and win with lines, columns, diagonals, or four corners!
            </p>
          </div>

          {/* Game Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Winning Combinations:</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Any complete row (5 songs)</li>
                  <li>• Any complete column (5 songs)</li>
                  <li>• Any complete diagonal (5 songs)</li>
                  <li>• Four corners (4 songs)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Strategy Tips:</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Mix common and rare songs</li>
                  <li>• Consider song relationships</li>
                  <li>• Use the center FREE space wisely</li>
                  <li>• Multiple winners possible!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Bingo Builder - Left/Right Layout */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            
            {/* Song Candidates - Left Side (2/5 width) */}
            <div className="col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Available Songs</h2>
              
              {/* Search Input */}
              <div>
                <input
                  type="text"
                  placeholder="Search for songs..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Search Results - Limited Display */}
              {suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Search Results:</h3>
                  <div className="h-32 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
                    <div className="space-y-1">
                      {suggestions.map((song, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, song)}
                          className="p-2 bg-white border border-gray-200 rounded cursor-move hover:bg-blue-50 hover:border-blue-300 text-xs transition-all shadow-sm"
                        >
                          {song}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Popular Songs - Limited to 15 with Scrolling */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Popular Songs → Drag to Board</h3>
                <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <div className="space-y-1">
                    {allSongs.filter(song => !bingoBoard.flat().includes(song)).slice(0, 15).map((song, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, song)}
                        className="p-2 bg-white border border-gray-200 rounded cursor-move hover:bg-blue-50 hover:border-blue-300 text-xs transition-all shadow-sm"
                      >
                        {song}
                      </div>
                    ))}
                    {allSongs.filter(song => !bingoBoard.flat().includes(song)).length > 15 && (
                      <div className="text-center py-2">
                        <p className="text-xs text-gray-500">
                          +{allSongs.filter(song => !bingoBoard.flat().includes(song)).length - 15} more songs (search to filter)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Board Controls */}
              <div className="space-y-2">
                <button
                  onClick={generateRandomBoard}
                  className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Generate Random Board
                </button>
                <button
                  onClick={clearBoard}
                  className="w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Clear Board
                </button>
              </div>
            </div>

            {/* Bingo Board - Right Side (3/5 width) */}
            <div className="col-span-3">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Bingo Card → Drop Songs Here</h2>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-5 gap-2 aspect-square max-w-lg mx-auto">
                  {bingoBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                        className={`
                          border-2 border-gray-300 rounded text-center flex items-center justify-center text-xs font-medium
                          min-h-20 cursor-pointer transition-all relative
                          ${rowIndex === 2 && colIndex === 2 
                            ? 'bg-purple-100 text-purple-800 border-purple-300' 
                            : cell 
                              ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200' 
                              : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                          }
                        `}
                        onClick={() => {
                          if (suggestions.length > 0 && suggestions[0] && (rowIndex !== 2 || colIndex !== 2)) {
                            updateBingoSquare(rowIndex, colIndex, suggestions[0]);
                          }
                        }}
                      >
                        {cell === 'FREE' ? (
                          <span className="font-bold text-purple-700">FREE</span>
                        ) : cell ? (
                          <>
                            <span className="truncate px-1 leading-tight">{cell}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearSquare(rowIndex, colIndex);
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 text-xs">Empty</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Board Stats */}
              <div className="mt-4 text-center">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-semibold text-purple-800 mb-1">Progress</h4>
                  <p className="text-purple-700 text-sm">
                    Filled: {bingoBoard.flat().filter(cell => cell && cell !== '').length}/25 squares
                  </p>
                  <p className="text-purple-600 text-xs mt-1">
                    Need at least 20 songs to submit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Play Mode Selection & Submit */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Choose Your Play Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { id: 'fun', title: 'Play for Fun', desc: 'Free play, leaderboard glory' },
                { id: 'charity', title: 'Play for Charity', desc: 'Donate $1-$10, winners choose charity' },
                { id: 'cash', title: 'Play for Cash', desc: 'Entry fee builds prize pool' },
                { id: 'prize', title: 'Play for Prize', desc: 'Compete for sponsored rewards' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedPlayMode(mode.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all shadow-sm ${
                    selectedPlayMode === mode.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{mode.title}</h3>
                  <p className="text-xs text-gray-600">{mode.desc}</p>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                Submit Bingo Card
              </button>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3">Quick Stats</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Most Common: Sugar Magnolia (78%)</p>
                <p>• Rarest: Dark Star (8%)</p>
                <p>• Best Opener: Feel Like a Stranger</p>
                <p>• Common Pair: Scarlet → Fire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 