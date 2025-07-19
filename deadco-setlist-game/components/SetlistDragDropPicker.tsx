import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, DragEndEvent, DragOverlay, useDraggable, useDroppable, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getSongProbability, getProbabilityColor, getAllSongs } from '../utils/songProbabilities';
import SongPicker from './SongPicker';

interface SetlistDragDropPickerProps {
  onSetlistChange?: (setlist: string[]) => void;
  maxSongs?: number;
  showProbabilities?: boolean;
}

interface SortableSongProps {
  song: string;
  index: number;
  showProbabilities: boolean;
  onRemove: (song: string) => void;
}

function SortableSong({ song, index, showProbabilities, onRemove }: SortableSongProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song });

  const songData = getSongProbability(song);
  const colorScheme = songData ? getProbabilityColor(songData.category) : null;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative p-4 rounded-xl border-2 cursor-grab select-none transition-all group overflow-hidden ${
        isDragging ? 'opacity-50 z-50' : ''
      } ${colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : 'bg-white/10 border-white/20'}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Probability Glow */}
      {showProbabilities && colorScheme && (
        <div className={`absolute inset-0 rounded-xl opacity-20 ${colorScheme.glow}`} />
      )}
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Position Number */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">
            {index + 1}
          </div>
          
          {/* Song Info */}
          <div className="flex-1">
            <div className={`font-bold text-lg mb-1 ${colorScheme?.text || 'text-white'}`}>
              {song}
            </div>
            
            {showProbabilities && songData && (
              <div className="flex items-center gap-3">
                <div className={`text-sm font-medium ${colorScheme?.text || 'text-white/80'}`}>
                  {songData.probability}% chance
                </div>
                <div className={`text-xs px-2 py-1 rounded border ${
                  colorScheme ? `${colorScheme.bg} ${colorScheme.border}` : 'bg-white/10 border-white/20'
                }`}>
                  <span className={`${colorScheme?.text || 'text-white/60'}`}>
                    {colorScheme?.description || 'Unknown'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(song);
          }}
          className="w-8 h-8 rounded-full bg-red-500/20 border border-red-400 text-red-200 hover:bg-red-500/30 transition-all opacity-0 group-hover:opacity-100"
        >
          ✕
        </button>
      </div>

      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-white/50">⋮⋮</div>
    </div>
    </motion.div>
  );
}

interface DroppableSongPoolProps {
  children: React.ReactNode;
}

function DroppableSongPool({ children }: DroppableSongPoolProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'song-pool',
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] p-4 rounded-2xl border-2 border-dashed transition-all ${
        isOver 
          ? 'border-red-400 bg-red-400/20' 
          : 'border-white/30 bg-white/5'
      }`}
    >
      {children}
    </div>
  );
}

interface DraggableSongProps {
  song: string;
  showProbabilities: boolean;
}

function DraggableSong({ song, showProbabilities }: DraggableSongProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `pool-${song}`,
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
            <div className={`text-xs px-1 py-0.5 rounded ${
              colorScheme ? colorScheme.text : 'text-white/60'
            }`}>
              {colorScheme?.description || 'Unknown'}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SetlistDragDropPicker({ 
  onSetlistChange, 
  maxSongs = 20,
  showProbabilities = true 
}: SetlistDragDropPickerProps) {
  const [setlist, setSetlist] = useState<string[]>([]);
  const [songPickerOpen, setSongPickerOpen] = useState(false);
  const [draggedSong, setDraggedSong] = useState<string | null>(null);
  const [probabilityMode, setProbabilityMode] = useState(showProbabilities);

  // Get strategic song suggestions
  const popularSongs = getAllSongs()
    .filter(song => song.probability >= 60)
    .slice(0, 8)
    .map(song => song.name);

  const rareGems = getAllSongs()
    .filter(song => song.probability <= 15)
    .slice(0, 6)
    .map(song => song.name);

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedSong(event.active.id as string);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDraggedSong(null);
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle dropping from song pool to setlist
    if (activeId.startsWith('pool-') && overId === 'setlist') {
      const songName = activeId.replace('pool-', '');
      if (!setlist.includes(songName) && setlist.length < maxSongs) {
        const newSetlist = [...setlist, songName];
        setSetlist(newSetlist);
        onSetlistChange?.(newSetlist);
      }
      return;
    }

    // Handle removing from setlist (drop to song pool)
    if (setlist.includes(activeId) && overId === 'song-pool') {
      const newSetlist = setlist.filter(song => song !== activeId);
      setSetlist(newSetlist);
      onSetlistChange?.(newSetlist);
      return;
    }

    // Handle reordering within setlist
    if (setlist.includes(activeId) && setlist.includes(overId)) {
      const oldIndex = setlist.indexOf(activeId);
      const newIndex = setlist.indexOf(overId);
      const newSetlist = arrayMove(setlist, oldIndex, newIndex);
      setSetlist(newSetlist);
      onSetlistChange?.(newSetlist);
    }
  }, [setlist, maxSongs, onSetlistChange]);

  const handleSongSelect = (song: string) => {
    if (!setlist.includes(song) && setlist.length < maxSongs) {
      const newSetlist = [...setlist, song];
      setSetlist(newSetlist);
      onSetlistChange?.(newSetlist);
    }
    setSongPickerOpen(false);
  };

  const removeSong = (songToRemove: string) => {
    const newSetlist = setlist.filter(song => song !== songToRemove);
    setSetlist(newSetlist);
    onSetlistChange?.(newSetlist);
  };

  const clearSetlist = () => {
    setSetlist([]);
    onSetlistChange?.([]);
  };

  // Calculate strategic score
  const calculateStrategicScore = () => {
    if (setlist.length === 0) return 0;
    
    const totalProbability = setlist.reduce((sum, song) => {
      const songData = getSongProbability(song);
      return sum + (songData?.probability || 0);
    }, 0);
    
    return Math.round(totalProbability / setlist.length);
  };

  const strategicScore = calculateStrategicScore();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">🎪 Build Your Setlist Prediction</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
            <span className="text-white/80 text-sm">Strategic Score:</span>
            <span className={`font-bold text-lg ${
              strategicScore >= 70 ? 'text-green-400' :
              strategicScore >= 50 ? 'text-yellow-400' :
              strategicScore >= 30 ? 'text-orange-400' : 'text-red-400'
            }`}>
              {strategicScore}%
            </span>
          </div>
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
        {/* Setlist Builder */}
        <div className="lg:col-span-2">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="bg-white/10 rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">🎵 Your Setlist Prediction</h4>
                <div className="flex items-center gap-3">
                  <span className="text-white/80 text-sm">
                    {setlist.length}/{maxSongs} songs
                  </span>
                  {setlist.length > 0 && (
                    <button
                      onClick={clearSetlist}
                      className="px-3 py-1 bg-red-500/20 border border-red-400 text-red-200 rounded text-sm hover:bg-red-500/30 transition-all"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <SortableContext items={setlist} strategy={verticalListSortingStrategy}>
                <div id="setlist" className="space-y-3 min-h-[400px]">
                  {setlist.length === 0 ? (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/30 rounded-xl">
                      <div className="text-center text-white/60">
                        <div className="text-4xl mb-4">🎼</div>
                        <div className="text-lg font-medium mb-2">Start Building Your Setlist</div>
                        <div className="text-sm">Drag songs here or click "Add Song" below</div>
                      </div>
                    </div>
                  ) : (
                    setlist.map((song, index) => (
                      <SortableSong
                        key={song}
                        song={song}
                        index={index}
                        showProbabilities={probabilityMode}
                        onRemove={removeSong}
                      />
                    ))
                  )}
                </div>
              </SortableContext>

              <button
                onClick={() => setSongPickerOpen(true)}
                disabled={setlist.length >= maxSongs}
                className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {setlist.length >= maxSongs ? '🎵 Setlist Complete' : '🎵 Add Song'}
              </button>
            </div>

            <DragOverlay>
              {draggedSong ? (
                <div className="p-4 bg-white/20 backdrop-blur rounded-xl border border-white/40 text-white font-bold">
                  {draggedSong.replace('pool-', '')}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Song Pool */}
        <div className="lg:col-span-1 space-y-6">
          {/* Strategic Suggestions */}
          <div className="bg-white/10 rounded-2xl border border-white/20 p-6">
            <h4 className="text-lg font-bold text-white mb-4">🎯 Safe Picks</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {popularSongs.map((song) => (
                <DraggableSong 
                  key={song} 
                  song={song} 
                  showProbabilities={probabilityMode}
                />
              ))}
            </div>
                  </div>

          {/* Rare Gems */}
          <div className="bg-white/10 rounded-2xl border border-white/20 p-6">
            <h4 className="text-lg font-bold text-white mb-4">💎 Rare Gems</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {rareGems.map((song) => (
                <DraggableSong 
                  key={song} 
                  song={song} 
                  showProbabilities={probabilityMode}
                />
              ))}
            </div>
                  </div>

          {/* Remove Zone */}
          <DroppableSongPool>
            <div className="text-center text-white/60">
              <div className="text-3xl mb-2">🗑️</div>
              <div className="text-sm font-medium">Drop songs here to remove</div>
            </div>
          </DroppableSongPool>
        </div>
      </div>

      {/* Strategy Tips */}
      {probabilityMode && (
        <motion.div
          className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-lg font-bold text-white mb-4">💡 Strategy Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-green-500/20 border border-green-400 rounded-lg">
              <div className="font-bold text-green-200 mb-2">🎯 Conservative Strategy</div>
              <div className="text-green-100">
                Focus on high-probability songs (60%+) for safer predictions with steady points.
              </div>
            </div>
            <div className="p-3 bg-yellow-500/20 border border-yellow-400 rounded-lg">
              <div className="font-bold text-yellow-200 mb-2">⚖️ Balanced Strategy</div>
              <div className="text-yellow-100">
                Mix safe picks with medium-probability songs for good risk/reward balance.
              </div>
            </div>
            <div className="p-3 bg-purple-500/20 border border-purple-400 rounded-lg">
              <div className="font-bold text-purple-200 mb-2">🦄 High-Risk Strategy</div>
              <div className="text-purple-100">
                Include rare songs for massive bonus points if they hit (but lower overall odds).
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Song Picker Modal */}
      <SongPicker
        isOpen={songPickerOpen}
        onClose={() => setSongPickerOpen(false)}
        onSongSelect={handleSongSelect}
        selectedSongs={setlist}
      />
    </div>
  );
} 