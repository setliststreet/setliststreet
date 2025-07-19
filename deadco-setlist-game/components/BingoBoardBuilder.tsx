import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { getSongProbability, getProbabilityColor, getAllSongs } from '../utils/songProbabilities';
import SongPicker from './SongPicker';

interface BingoBoardBuilderProps {
  onBoardComplete?: (board: (string | null)[][]) => void;
  initialBoard?: (string | null)[][];
  disabled?: boolean;
  showProbabilities?: boolean;
}

const BOARD_SIZE = 5;

interface BingoSlotProps {
  song: string | null;
  position: [number, number];
  isCenter?: boolean;
  showProbabilities?: boolean;
}

function BingoSlot({ song, position, isCenter = false, showProbabilities = true }: BingoSlotProps) {
  const [row, col] = position;
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${row}-${col}`,
    data: { position }
  });

  const songData = song ? getSongProbability(song) : null;
  const colorScheme = songData ? getProbabilityColor(songData.category) : null;

  return (
    <div
      ref={setNodeRef}
      className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-2 transition-all relative overflow-hidden
        ${isOver ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/30 bg-white/5'}
        ${isCenter ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400' : ''}
        ${song && colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : ''}
      `}
    >
      {isCenter ? (
        <div className="text-center">
          <div className="text-2xl mb-1">⭐</div>
          <div className="text-xs font-bold text-purple-200">FREE</div>
        </div>
      ) : song ? (
        <div className="text-center w-full">
          {/* Song Name */}
          <div className={`text-xs font-bold mb-1 leading-tight ${
            colorScheme ? colorScheme.text : 'text-white'
          }`}>
            {song}
          </div>
          
          {/* Probability Display */}
          {showProbabilities && songData && (
            <div className="space-y-1">
              <div className={`text-xs font-medium ${colorScheme?.text || 'text-white/80'}`}>
                {songData.probability}%
              </div>
              <div className={`text-xs px-1 py-0.5 rounded border ${
                colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : 'bg-white/10 border-white/20'
              }`}>
                <div className={`${colorScheme?.text || 'text-white/60'} leading-none`}>
                  {colorScheme?.description || 'Unknown'}
                </div>
              </div>
            </div>
          )}
          
          {/* Probability Glow */}
          {showProbabilities && colorScheme && (
            <div className={`absolute inset-0 rounded-lg opacity-20 ${colorScheme.glow}`} />
          )}
        </div>
      ) : (
        <div className="text-center text-white/50">
          <div className="text-lg mb-1">+</div>
          <div className="text-xs">Add Song</div>
        </div>
      )}
    </div>
  );
}

interface DraggableSongProps {
  song: string;
  showProbabilities?: boolean;
}

function DraggableSong({ song, showProbabilities = true }: DraggableSongProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: song,
  });

  const songData = getSongProbability(song);
  const colorScheme = songData ? getProbabilityColor(songData.category) : null;

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`relative p-3 rounded-lg border-2 cursor-grab select-none transition-all overflow-hidden ${
        isDragging ? 'opacity-50' : ''
      } ${colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : 'bg-white/10 border-white/20'}`}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Probability Glow */}
      {showProbabilities && colorScheme && (
        <div className={`absolute inset-0 rounded-lg opacity-20 ${colorScheme.glow}`} />
      )}
      
      <div className="relative z-10">
        <div className={`font-bold text-sm mb-1 ${colorScheme?.text || 'text-white'}`}>
          {song}
        </div>
        
        {showProbabilities && songData && (
          <div className="flex items-center justify-between">
            <div className={`text-xs font-medium ${colorScheme?.text || 'text-white/80'}`}>
              {songData.probability}%
            </div>
            <div className={`text-xs px-2 py-0.5 rounded border ${
              colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : 'bg-white/10 border-white/20'
            }`}>
              <div className={`${colorScheme?.text || 'text-white/60'} leading-none`}>
                {colorScheme?.description || 'Unknown'}
              </div>
            </div>
          </div>
        )}
    </div>
    </motion.div>
  );
}

export default function BingoBoardBuilder({ 
  onBoardComplete, 
  initialBoard, 
  disabled = false,
  showProbabilities = true 
}: BingoBoardBuilderProps) {
  const [board, setBoard] = useState<(string | null)[][]>(() => {
    if (initialBoard) return initialBoard;
    
    const newBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    newBoard[2][2] = 'FREE SPACE'; // Center square
    return newBoard;
  });

  const [songPickerOpen, setSongPickerOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [draggedSong, setDraggedSong] = useState<string | null>(null);
  const [probabilityMode, setProbabilityMode] = useState(showProbabilities);

  // Get commonly used songs for quick access
  const popularSongs = getAllSongs()
    .filter(song => song.probability >= 50)
    .slice(0, 12)
    .map(song => song.name);

  const handleDragStart = (event: any) => {
    setDraggedSong(event.active.id);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDraggedSong(null);
    
    const { active, over } = event;
    if (!over) return;

    const songName = active.id as string;
    const targetId = over.id as string;

    if (targetId.startsWith('slot-')) {
      const [, row, col] = targetId.split('-').map(Number);
      
      // Don't allow replacing the center square
      if (row === 2 && col === 2) return;
      
      // Check if song is already on the board
      const isAlreadyOnBoard = board.some(row => row.some(cell => cell === songName));
      if (isAlreadyOnBoard) return;

      const newBoard = board.map((r, rIndex) =>
        r.map((c, cIndex) => (rIndex === row && cIndex === col ? songName : c))
      );
      
      setBoard(newBoard);
      onBoardComplete?.(newBoard);
    }
  }, [board, onBoardComplete]);

  const handleSlotClick = (position: [number, number]) => {
    if (disabled) return;
    
    const [row, col] = position;
    if (row === 2 && col === 2) return; // Center square
    
    setSelectedPosition(position);
    setSongPickerOpen(true);
  };

  const handleSongSelect = (song: string) => {
    if (!selectedPosition) return;
    
    const [row, col] = selectedPosition;
    const newBoard = board.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? song : c))
    );
    
    setBoard(newBoard);
    onBoardComplete?.(newBoard);
    setSongPickerOpen(false);
    setSelectedPosition(null);
  };

  const clearSlot = (position: [number, number]) => {
    if (disabled) return;
    
    const [row, col] = position;
    if (row === 2 && col === 2) return; // Center square
    
    const newBoard = board.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? null : c))
    );
    
    setBoard(newBoard);
    onBoardComplete?.(newBoard);
  };

  const usedSongs = board.flat().filter((song): song is string => 
    song !== null && song !== 'FREE SPACE'
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">🎯 Build Your Bingo Board</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setProbabilityMode(!probabilityMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              probabilityMode 
                ? 'bg-green-500/20 text-green-200 border border-green-400' 
                : 'bg-white/10 text-white/70 border border-white/20'
            }`}
          >
            {probabilityMode ? '📊 Probabilities ON' : '📊 Probabilities OFF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bingo Board */}
        <div className="lg:col-span-2">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-5 gap-2 mb-4">
              {board.map((row, rowIndex) =>
                row.map((song, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="relative group">
                    <div
                      onClick={() => handleSlotClick([rowIndex, colIndex])}
                      className="cursor-pointer"
                    >
                      <BingoSlot
                        song={song}
                        position={[rowIndex, colIndex]}
                        isCenter={rowIndex === 2 && colIndex === 2}
                        showProbabilities={probabilityMode}
                      />
                    </div>
                    
                    {/* Clear button */}
                    {song && song !== 'FREE SPACE' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSlot([rowIndex, colIndex]);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <DragOverlay>
              {draggedSong ? (
                <DraggableSong song={draggedSong} showProbabilities={probabilityMode} />
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Progress */}
          <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Board Progress</span>
              <span className="text-white font-medium">{usedSongs.length}/24 songs</span>
              </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(usedSongs.length / 24) * 100}%` }}
              />
            </div>
                    </div>
              </div>

        {/* Popular Songs */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 rounded-2xl border border-white/20 p-6">
            <h4 className="text-lg font-bold text-white mb-4">🔥 Popular Songs</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {popularSongs.map((song) => (
                <DraggableSong 
                  key={song} 
                  song={song} 
                  showProbabilities={probabilityMode}
                />
              ))}
            </div>
            
            <button
              onClick={() => setSongPickerOpen(true)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              🎵 Browse All Songs
            </button>
          </div>
        </div>
      </div>

      {/* Song Picker Modal */}
      <SongPicker
        isOpen={songPickerOpen}
        onClose={() => setSongPickerOpen(false)}
        onSongSelect={handleSongSelect}
        selectedSongs={usedSongs}
      />
    </div>
  );
} 