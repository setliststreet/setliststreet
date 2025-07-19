import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSongProbability, getProbabilityColor, getAllSongs } from '../utils/songProbabilities';

interface SongPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSongSelect: (song: string) => void;
  selectedSongs?: string[];
}

export default function SongPicker({ isOpen, onClose, onSongSelect, selectedSongs = [] }: SongPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showProbabilities, setShowProbabilities] = useState(true);

  const allSongs = getAllSongs();
  
  const filteredSongs = allSongs.filter(song => {
    const matchesSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || song.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Songs', emoji: '🎵' },
    { id: 'very-high', name: 'Almost Guaranteed', emoji: '🎯' },
    { id: 'high', name: 'Very Likely', emoji: '🔥' },
    { id: 'medium-high', name: 'Good Chance', emoji: '✨' },
    { id: 'medium', name: 'Moderate', emoji: '🎲' },
    { id: 'low-medium', name: 'Occasional', emoji: '🎪' },
    { id: 'low', name: 'Rare Gems', emoji: '💎' },
    { id: 'very-rare', name: 'Unicorn Songs', emoji: '🦄' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🎵 Choose a Song</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowProbabilities(!showProbabilities)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    showProbabilities 
                      ? 'bg-green-500/20 text-green-200 border border-green-400' 
                      : 'bg-white/10 text-white/70 border border-white/20'
                  }`}
                >
                  {showProbabilities ? '📊 Probabilities ON' : '📊 Probabilities OFF'}
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center"
    >
                  ✕
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:bg-white/15 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    categoryFilter === category.id
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Songs List */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSongs.map((song, index) => {
                const isSelected = selectedSongs.includes(song.name);
                const colorScheme = getProbabilityColor(song.category);
                
                return (
                  <motion.button
                    key={song.name}
                    onClick={() => !isSelected && onSongSelect(song.name)}
                    disabled={isSelected}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left group overflow-hidden ${
                      isSelected 
                        ? 'bg-gray-500/20 border-gray-400 text-gray-400 cursor-not-allowed' 
                        : `${colorScheme.bg} ${colorScheme.border} hover:bg-white/20 cursor-pointer`
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={!isSelected ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSelected ? { scale: 0.98 } : {}}
                  >
                    {/* Probability Glow Effect */}
                    {!isSelected && showProbabilities && (
                      <div className={`absolute inset-0 rounded-xl opacity-30 ${colorScheme.glow}`} />
                    )}
                    
                    <div className="relative z-10">
                      {/* Song Name */}
                      <div className={`font-bold text-lg mb-1 ${isSelected ? 'text-gray-400' : colorScheme.text}`}>
                        {song.name}
                      </div>
                      
                      {/* Probability Display */}
                      {showProbabilities && (
                        <div className="flex items-center justify-between mb-2">
                          <div className={`text-sm font-medium ${isSelected ? 'text-gray-500' : colorScheme.text}`}>
                            {song.probability}% chance
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full border ${
                            isSelected 
                              ? 'bg-gray-500/20 border-gray-400 text-gray-500' 
                              : `${colorScheme.bg} ${colorScheme.border} ${colorScheme.text}`
                          }`}>
                            {colorScheme.description}
                          </div>
                        </div>
                      )}
                      
                      {/* Description */}
                      <div className={`text-xs leading-relaxed ${
                        isSelected ? 'text-gray-500' : 'text-white/80'
                      }`}>
                        {song.description}
                      </div>
                      
                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>

                    {/* Hover Shimmer Effect */}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {filteredSongs.length === 0 && (
              <div className="text-center py-12 text-white/70">
                <div className="text-4xl mb-4">🔍</div>
                <div className="text-lg font-medium mb-2">No songs found</div>
                <div className="text-sm">Try adjusting your search or filter</div>
              </div>
            )}
          </div>

          {/* Legend */}
          {showProbabilities && (
            <div className="p-6 border-t border-white/20 bg-black/20">
              <div className="text-sm text-white/80 mb-3 font-medium">Probability Legend:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                {Object.entries(getProbabilityColor('very-high')).slice(0, 7).map((_, index) => {
                  const categories = ['very-high', 'high', 'medium-high', 'medium', 'low-medium', 'low', 'very-rare'];
                  const category = categories[index];
                  const colorScheme = getProbabilityColor(category);
                  return (
                    <div key={category} className={`p-2 rounded border ${colorScheme.bg} ${colorScheme.border} text-center`}>
                      <div className={`font-medium ${colorScheme.text}`}>
                        {colorScheme.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 