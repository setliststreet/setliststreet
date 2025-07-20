import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';
import ShowSelector from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay'; // Added import for PoolSizeDisplay

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
  const [selectedShow, setSelectedShow] = useState(null);
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
    if (draggedSong && !(row === 2 && col === 2)) {
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
          {/* Header with sponsor logos */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
            <div className="w-2"></div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Setlist Bingo</h1>
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
                gameId="setlist-bingo" 
                showId={selectedShow.id}
                showDate={selectedShow.date}
              />
            </div>
          )}

          {/* Main Bingo Builder with Three-Column Layout - IMPROVED SPACING */}
          <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto mb-6">
            <div className="col-span-1"></div>
            <div className="col-span-2 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-6 text-base">Available Songs → Drag to Board</h3>
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />

              {/* Search Results */}
              {suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">Search Results:</h3>
                  <div className="h-32 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-white">
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
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Popular Songs → Drag to Board</h3>
                <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-white">
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
              <div className="space-y-3">
                <button
                  onClick={generateRandomBoard}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Generate Random Board
                </button>
                <button
                  onClick={clearBoard}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Clear Board
                </button>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-4 bg-white rounded-lg p-8 border-2 border-purple-200 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-6 text-base">Your Bingo Card → Drop Songs Here</h3>
              
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-5 gap-2">
                  {bingoBoard.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                      <div
                        key={`${rowIndex}-${cellIndex}`}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, rowIndex, cellIndex)}
                        className={`
                          aspect-square border-2 border-gray-300 rounded-lg p-2 text-xs flex items-center justify-center text-center relative transition-all
                          ${draggedSong ? 'border-purple-400 bg-purple-50' : 'hover:border-gray-400 hover:bg-gray-50'}
                          ${rowIndex === 2 && cellIndex === 2 ? 'bg-purple-100 border-purple-400 font-bold text-purple-800' : ''}
                        `}
                      >
                        {rowIndex === 2 && cellIndex === 2 ? (
                          <span className="text-purple-800 font-bold">FREE</span>
                        ) : cell ? (
                          <div className="w-full h-full flex flex-col items-center justify-center relative">
                            <button
                              onClick={() => clearSquare(rowIndex, cellIndex)}
                              className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10 border-2 border-white"
                            >
                              ×
                            </button>
                            <span className="text-gray-800 leading-tight text-center px-1">{cell}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">Empty</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Board Stats */}
              <div className="mt-6 text-center">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Progress</h4>
                  <p className="text-purple-700 text-sm">
                    Filled: {bingoBoard.flat().filter(cell => cell && cell !== '').length}/25 squares
                  </p>
                  <p className="text-purple-600 text-xs mt-1">
                    Need at least 20 songs to submit
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-6 text-base">Quick Stats & Hints</h3>
              
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 text-sm">Song Statistics</h4>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p className="flex justify-between">
                      <span>Most Common:</span>
                      <span className="font-medium">Sugar Magnolia (78%)</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Rarest:</span>
                      <span className="font-medium">Dark Star (8%)</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Best Opener:</span>
                      <span className="font-medium">Feel Like a Stranger</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Common Pair:</span>
                      <span className="font-medium">Scarlet → Fire</span>
                    </p>
                  </div>
                </div>

                {/* Strategy Tips */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 text-sm">Strategy Tips</h4>
                  <div className="text-sm text-green-700 space-y-2">
                    <p>• Mix common and rare songs</p>
                    <p>• Include guaranteed opener candidates</p>
                    <p>• Consider song pairs (Scarlet/Fire)</p>
                    <p>• Watch for venue patterns</p>
                  </div>
                </div>

                {/* Winning Patterns */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3 text-sm">Winning Patterns</h4>
                  <div className="text-sm text-purple-700 space-y-2">
                    <p>• Any complete row (5 songs)</p>
                    <p>• Any complete column (5 songs)</p>
                    <p>• Any diagonal (5 songs)</p>
                    <p>• Four corners (4 songs)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Standardized Payment Component */}
          <FourWaysToPlay 
            onSubmissionClick={(playMode, amount) => {
              setSelectedPlayMode(playMode);
              handleSubmit();
            }}
            gameType="bingo card"
          />

{/* Hints are now integrated into the right column above */}
        </div>
      </div>
    </MainLayout>
  );
} 