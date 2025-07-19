import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IPodSongPickerProps {
  songs: { id: number; name: string }[];
  onSubmit: (songId: number) => void;
}

export default function IPodSongPicker({ songs, onSubmit }: IPodSongPickerProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleScroll = (dir: number) => {
    setIsRotating(true);
    setSelectedIdx((prev) => (prev + dir + songs.length) % songs.length);
    
    // Reset rotation animation after a short delay
    setTimeout(() => setIsRotating(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit(songs[selectedIdx].id);
    }, 600);
  };

  // Show 5 songs: center is selected, 2 above, 2 below (circular)
  const getDisplaySongs = () => {
    const display = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (selectedIdx + i + songs.length) % songs.length;
      display.push({ ...songs[idx], isSelected: i === 0, position: i });
    }
    return display;
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <motion.div 
        className="relative w-80 h-80 flex items-center justify-center bg-gradient-to-br from-[#C8102E] to-[#005BAC] rounded-full shadow-2xl border-8 border-white"
        animate={isRotating ? { rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring decoration */}
        <div className="absolute inset-4 rounded-full border-4 border-white/20" />
        <div className="absolute inset-8 rounded-full border-2 border-white/10" />
        
        {/* Song display area */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 overflow-hidden">
          <AnimatePresence mode="wait">
          {getDisplaySongs().map((song, i) => (
              <motion.div
                key={`${song.id}-${selectedIdx}`} // Key ensures re-animation on selection change
                className={`text-center transition-all duration-300 my-1 px-4 py-1 rounded-full
                  ${song.isSelected 
                    ? 'text-2xl font-bold text-white bg-[#005BAC] shadow-lg z-20' 
                    : 'text-lg text-white/70 opacity-70'
                  }`}
              style={{
                marginTop: i === 2 ? '1.5rem' : 0,
                marginBottom: i === 2 ? '1.5rem' : 0,
              }}
                initial={{ 
                  opacity: 0, 
                  y: song.position * 10,
                  scale: song.isSelected ? 0.8 : 1 - Math.abs(song.position) * 0.15
                }}
                animate={{ 
                  opacity: song.isSelected ? 1 : 0.7,
                  y: 0,
                  scale: song.isSelected ? 1.2 : 1 - Math.abs(song.position) * 0.15,
                  rotateX: Math.abs(song.position) * 15, // Add 3D effect
                }}
                exit={{ 
                  opacity: 0, 
                  y: -song.position * 10,
                  scale: 0.8
                }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  bounce: song.isSelected ? 0.4 : 0.2
                }}
                whileHover={!song.isSelected ? { scale: 1.05, opacity: 0.9 } : {}}
            >
              {song.name}
              </motion.div>
          ))}
          </AnimatePresence>
        </div>
        
        {/* iPod wheel controls with enhanced styling */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            type="button" 
            onClick={() => handleScroll(-1)} 
            className="bg-white text-[#C8102E] w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-[#FFD700] transition relative overflow-hidden"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={isRotating && selectedIdx > 0 ? { y: [-2, 2, -2] } : {}}
              transition={{ duration: 0.2 }}
            >
              ⬆️
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
          
          <motion.button 
            type="button" 
            onClick={() => handleScroll(1)} 
            className="bg-white text-[#C8102E] w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-[#FFD700] transition relative overflow-hidden"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={isRotating && selectedIdx < songs.length - 1 ? { y: [2, -2, 2] } : {}}
              transition={{ duration: 0.2 }}
            >
              ⬇️
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            />
          </motion.button>
        </motion.div>
        
        {/* Enhanced center icon with pulsing effect */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={submitting ? { scale: [1, 1.1, 1] } : {}}
          transition={submitting ? { duration: 0.5, repeat: Infinity } : {}}
        >
          <motion.svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={isRotating ? { rotate: [0, 360] } : {}}
            transition={isRotating ? { duration: 0.5, ease: "easeOut" } : {}}
          >
            <motion.circle 
              cx="60" 
              cy="60" 
              r="58" 
              stroke="#fff" 
              strokeWidth="4" 
              fill="#C8102E"
              animate={submitting ? {
                fill: ['#C8102E', '#005BAC', '#C8102E']
              } : {}}
              transition={submitting ? { duration: 0.8, repeat: Infinity } : {}}
            />
            <circle cx="60" cy="60" r="36" fill="#005BAC" />
            <motion.text 
              x="60" 
              y="72" 
              textAnchor="middle" 
              fontSize="48" 
              fill="#fff" 
              fontFamily="monospace"
              animate={submitting ? { scale: [1, 1.2, 1] } : {}}
              transition={submitting ? { duration: 0.4, repeat: Infinity } : {}}
            >
              🎵
            </motion.text>
          </motion.svg>
        </motion.div>
        
        {/* Ripple effect on selection */}
        {isRotating && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/40 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
      
      <motion.button 
        type="submit" 
        className="bg-[#005BAC] text-white px-8 py-3 rounded-full font-bold shadow hover:bg-[#C8102E] transition text-xl mt-4 relative overflow-hidden" 
        disabled={submitting}
        whileHover={!submitting ? { 
          scale: 1.05,
          boxShadow: '0 0 25px rgba(0, 91, 172, 0.5)'
        } : {}}
        whileTap={!submitting ? { scale: 0.95 } : {}}
        animate={submitting ? {
          boxShadow: [
            '0 0 20px rgba(0, 91, 172, 0.5)',
            '0 0 40px rgba(200, 16, 46, 0.5)',
            '0 0 20px rgba(0, 91, 172, 0.5)'
          ]
        } : {}}
        transition={{ 
          boxShadow: submitting ? { duration: 1, repeat: Infinity } : { duration: 0.2 },
        }}
      >
        {submitting ? (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            Selecting...
          </motion.div>
        ) : (
          '🎧 Select Song'
        )}
        
        {!submitting && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>
      
      {/* Current selection indicator */}
      <motion.div
        className="text-lg text-white/80 text-center mt-2"
        key={selectedIdx} // Re-animate on selection change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Track {selectedIdx + 1} of {songs.length}
      </motion.div>
    </motion.form>
  );
} 