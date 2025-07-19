import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const songs = [
  'Bertha', 'Althea', 'Ripple', 'Cassidy', 'Eyes of the World',
  'China Cat Sunflower', 'I Know You Rider', 'Truckin\'', 'Touch of Grey',
  'The Wheel', 'Sugar Magnolia', 'Fire on the Mountain', 'Scarlet Begonias',
  'Uncle John\'s Band', 'Casey Jones', 'Friend of the Devil', 'Box of Rain',
  'Wharf Rat', 'Dark Star', 'St. Stephen'
];

export default function TestIPod() {
  const [selected, setSelected] = useState(0);
  const [showTrackInfo, setShowTrackInfo] = useState(false);

  const scroll = (dir: 'up' | 'down') => {
    setSelected((prev) => {
      if (dir === 'up') {
        return Math.max(prev - 1, 0);
      } else {
        return Math.min(prev + 1, songs.length - 1);
      }
    });
  };

  const handleSelect = () => {
    setShowTrackInfo(true);
    setTimeout(() => setShowTrackInfo(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8102E] via-[#8B0000] to-[#005BAC] flex items-center justify-center p-4">
      <div className="text-center">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8 font-display"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎵 Retro iPod Song Picker
        </motion.h1>

        {/* iPod Container */}
        <motion.div
          className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl p-8 shadow-2xl mx-auto"
          style={{ width: '320px', height: '480px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          {/* iPod Screen */}
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 mb-6 shadow-inner">
            <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg p-4 h-48 flex flex-col justify-center text-white font-mono text-sm">
              {/* Header */}
              <div className="flex justify-between items-center mb-2 text-xs">
                <span>🎵 Music</span>
                <span>🔋 100%</span>
              </div>
              
              {/* Track Counter */}
              <div className="text-center mb-2 text-xs text-blue-300">
                Track {selected + 1} of {songs.length}
              </div>
              
              {/* Song List */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {/* Previous song (dimmed) */}
                    {selected > 0 && (
                      <div className="text-blue-500 text-xs mb-1 opacity-50">
                        {songs[selected - 1]}
                      </div>
                    )}
                    
                    {/* Current song (highlighted) */}
                    <motion.div
                      className="text-white text-lg font-bold bg-blue-600 px-3 py-2 rounded-lg mb-1 shadow-lg"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 4px 15px rgba(59, 130, 246, 0.3)',
                          '0 8px 25px rgba(59, 130, 246, 0.5)',
                          '0 4px 15px rgba(59, 130, 246, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ♪ {songs[selected]}
                    </motion.div>
                    
                    {/* Next song (dimmed) */}
                    {selected < songs.length - 1 && (
                      <div className="text-blue-500 text-xs opacity-50">
                        {songs[selected + 1]}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-blue-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((selected + 1) / songs.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* iPod Controls */}
          <div className="relative">
            {/* Clickwheel */}
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mx-auto shadow-inner relative border-4 border-gray-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Center button */}
              <motion.button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg border-2 border-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm"
                onClick={handleSelect}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                SELECT
              </motion.button>

              {/* Control buttons */}
              <motion.button
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center text-gray-600 font-bold text-xs"
                onClick={() => scroll('up')}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                ↑
              </motion.button>

              <motion.button
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center text-gray-600 font-bold text-xs"
                onClick={() => scroll('down')}
                whileHover={{ scale: 1.1, y: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                ↓
              </motion.button>

              <motion.button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center text-gray-600 font-bold text-xs"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏮
              </motion.button>

              <motion.button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center text-gray-600 font-bold text-xs"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏭
              </motion.button>
            </motion.div>

            {/* iPod brand */}
            <div className="text-center mt-4 text-gray-600 text-sm font-light">
              DeadPod
            </div>
          </div>

          {/* Reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none" />
        </motion.div>

        {/* Track Info Modal */}
        <AnimatePresence>
          {showTrackInfo && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-[#005BAC] to-[#0066CC] rounded-2xl p-8 shadow-2xl text-white text-center max-w-md"
                initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateY: 90 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  🎵
                </motion.div>
                
                <h2 className="text-2xl font-bold mb-2">Now Playing</h2>
                <p className="text-xl text-[#FFD700] font-bold mb-4">
                  {songs[selected]}
                </p>
                
                <div className="text-sm text-white/80">
                  Track {selected + 1} of {songs.length}
                </div>
                
                <motion.div
                  className="mt-4 w-full bg-white/20 rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                >
                  <div className="bg-[#FFD700] h-2 rounded-full" />
                </motion.div>
              </motion.div>
            </motion.div>
      )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          className="mt-8 text-white/80 text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm">
            Use the clickwheel to navigate up/down through songs, then press SELECT to choose your track.
          </p>
          <p className="text-xs mt-2 text-white/60">
            Just like the good old days! 🎧
          </p>
        </motion.div>
      </div>
    </div>
  );
} 