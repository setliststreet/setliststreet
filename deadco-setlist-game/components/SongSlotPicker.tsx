import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  id: number;
  name: string;
}

interface SongSlotPickerProps {
  songs: Song[];
  numSlots: number;
  onSubmit: (songIds: number[]) => void;
}

interface SlotCardProps {
  slotNumber: number;
  song: Song | null;
  onSelect: () => void;
  onClear: () => void;
}

function SlotCard({ slotNumber, song, onSelect, onClear }: SlotCardProps) {
  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all min-h-[80px] flex flex-col justify-center"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-white/60 font-medium mb-1">
            Slot {slotNumber}
          </div>
          
          <AnimatePresence mode="wait">
            {song ? (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="flex items-center justify-between"
              >
                <span className="text-white font-semibold truncate pr-2">
                  {song.name}
                </span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onSelect}
                className="flex items-center justify-center py-2 border-2 border-dashed border-white/30 rounded-lg hover:border-[#FFD700] transition-colors"
              >
                <span className="text-white/50 text-sm">+ Select Song</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Slot number indicator */}
      <div className="absolute top-2 right-2 w-6 h-6 bg-[#005BAC] text-white rounded-full flex items-center justify-center text-xs font-bold">
        {slotNumber}
      </div>
    </motion.div>
  );
}

interface SongSelectorModalProps {
  isOpen: boolean;
  songs: Song[];
  selectedSongs: Set<number>;
  onSelect: (song: Song) => void;
  onClose: () => void;
}

function SongSelectorModal({ isOpen, songs, selectedSongs, onSelect, onClose }: SongSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSongs = songs.filter(song => 
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSongs.has(song.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-[#C8102E] to-[#005BAC] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Select a Song</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                  🔍
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-96 p-4">
              <motion.div 
                className="grid grid-cols-1 gap-2"
                layout
              >
                <AnimatePresence>
                  {filteredSongs.map((song, index) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect(song);
                        onClose();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{song.name}</span>
                        <motion.div
                          className="w-8 h-8 bg-[#FFD700] text-[#005BAC] rounded-full flex items-center justify-center font-bold"
                          whileHover={{ rotate: 90 }}
                        >
                          +
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredSongs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-white/60"
                  >
                    {searchTerm ? 'No songs match your search' : 'All songs have been selected'}
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            <div className="p-4 border-t border-white/20">
              <motion.button
                onClick={onClose}
                className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SongSlotPicker({ songs, numSlots, onSubmit }: SongSlotPickerProps) {
  const [selected, setSelected] = useState<(Song | null)[]>(Array(numSlots).fill(null));
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<number | null>(null);

  const handleSlotSelect = (slotIdx: number) => {
    setCurrentSlot(slotIdx);
    setModalOpen(true);
  };

  const handleSongSelect = (song: Song) => {
    if (currentSlot !== null) {
      setSelected(prev => {
        const next = [...prev];
        next[currentSlot] = song;
        return next;
      });
    }
  };

  const handleSlotClear = (slotIdx: number) => {
    setSelected(prev => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.every(s => s !== null)) {
      onSubmit(selected.map(s => s!.id));
    }
  };

  const selectedSongIds = new Set(selected.filter(s => s !== null).map(s => s!.id));
  const isComplete = selected.every(s => s !== null);
  const completionPercentage = (selected.filter(s => s !== null).length / numSlots) * 100;

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-white/80 text-sm font-medium">
        {selected.filter(s => s !== null).length} of {numSlots} slots filled
      </div>

      {/* Slot Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        layout
      >
        {Array.from({ length: numSlots }).map((_, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SlotCard
              slotNumber={i + 1}
              song={selected[i]}
              onSelect={() => handleSlotSelect(i)}
              onClear={() => handleSlotClear(i)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="bg-gradient-to-r from-[#005BAC] to-[#0066CC] text-white px-12 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all text-xl relative overflow-hidden"
        disabled={!isComplete}
        whileHover={isComplete ? { 
          scale: 1.05,
          boxShadow: '0 0 30px rgba(0, 91, 172, 0.5)'
        } : {}}
        whileTap={isComplete ? { scale: 0.95 } : {}}
        animate={isComplete ? {
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.3)',
            '0 0 40px rgba(255, 215, 0, 0.6)',
            '0 0 20px rgba(255, 215, 0, 0.3)'
          ]
        } : {}}
        transition={{ 
          boxShadow: isComplete ? { duration: 2, repeat: Infinity } : {},
          scale: { duration: 0.1 }
        }}
      >
        {isComplete ? '🎵 Submit Full Setlist' : `Select ${numSlots - selected.filter(s => s !== null).length} More Songs`}
        
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* Song Selector Modal */}
      <SongSelectorModal
        isOpen={modalOpen}
        songs={songs}
        selectedSongs={selectedSongIds}
        onSelect={handleSongSelect}
        onClose={() => setModalOpen(false)}
      />
    </motion.form>
  );
} 