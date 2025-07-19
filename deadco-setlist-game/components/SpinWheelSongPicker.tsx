import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpinWheelSongPickerProps {
  songs: { id: number; name: string }[];
  onSubmit: (songId: number) => void;
}

// Custom confetti component since we can't install react-confetti
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            y: [0, -200, -400],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 360]
          }}
          transition={{ 
            duration: 3, 
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default function SpinWheelSongPicker({ songs, onSubmit }: SpinWheelSongPickerProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ id: number; name: string } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / songs.length;

  // Generate vibrant colors for each segment
  const getSegmentColor = (index: number) => {
    const hue = (index * 360) / songs.length;
    return {
      background: `hsl(${hue}, 70%, 50%)`,
      border: `hsl(${hue}, 80%, 40%)`,
      text: hue > 180 && hue < 300 ? '#ffffff' : '#000000' // Light text for dark backgrounds
    };
  };

  const handleSpin = () => {
    if (spinning || songs.length === 0) return;

    setSpinning(true);
    setResult(null);
    setShowConfetti(false);

    // Generate random spin: 3-6 full rotations plus random angle
    const baseSpins = 3 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = baseSpins * 360 + randomAngle;
    const newRotation = rotation + totalRotation;

    setRotation(newRotation);

    // Calculate which segment we land on
    const normalizedAngle = (360 - (newRotation % 360)) % 360;
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
    const selectedSong = songs[segmentIndex];

    // Stop spinning after animation
    setTimeout(() => {
      setSpinning(false);
      setResult(selectedSong);
      setShowConfetti(true);
      
      // Hide confetti after celebration
      setTimeout(() => setShowConfetti(false), 4000);
    }, 4000);
  };

  const handleSubmit = () => {
    if (result) {
      onSubmit(result.id);
    }
  };

  const wheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: spinning 
      ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth deceleration
      : 'none'
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti active={showConfetti} />
      
      <motion.h2 
        className="text-3xl font-bold text-white text-center"
        animate={{ 
          scale: spinning ? [1, 1.05, 1] : 1,
          color: spinning ? ['#ffffff', '#FFD700', '#ffffff'] : '#ffffff'
        }}
        transition={{ duration: 0.5, repeat: spinning ? Infinity : 0 }}
      >
        🎰 Spin the Wheel of Songs!
      </motion.h2>

      <div className="relative">
        {/* Wheel Container */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          {/* Wheel */}
        <div
          ref={wheelRef}
            className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/50"
            style={wheelStyle}
          >
            {/* Segments */}
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {songs.map((song, index) => {
                const startAngle = (index * segmentAngle) * (Math.PI / 180);
                const endAngle = ((index + 1) * segmentAngle) * (Math.PI / 180);
                const x1 = 100 + 90 * Math.cos(startAngle);
                const y1 = 100 + 90 * Math.sin(startAngle);
                const x2 = 100 + 90 * Math.cos(endAngle);
                const y2 = 100 + 90 * Math.sin(endAngle);
                const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                
                const colors = getSegmentColor(index);
                const midAngle = (startAngle + endAngle) / 2;
                const textRadius = 60;
                const textX = 100 + textRadius * Math.cos(midAngle);
                const textY = 100 + textRadius * Math.sin(midAngle);

            return (
                  <g key={song.id}>
                    {/* Segment */}
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={colors.background}
                      stroke={colors.border}
                      strokeWidth="1"
                    />
                    
                    {/* Song text */}
                    <text
                      x={textX}
                      y={textY}
                      fill={colors.text}
                      fontSize={songs.length > 10 ? "6" : songs.length > 6 ? "7" : "8"}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontWeight="bold"
                      transform={`rotate(${(index * segmentAngle) + (segmentAngle / 2)}, ${textX}, ${textY})`}
                    >
                      {song.name.length > 12 ? song.name.substring(0, 12) + '...' : song.name}
                    </text>
                  </g>
            );
          })}
          </svg>
        </div>

          {/* Center Hub with Animated Skull */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={spinning ? {
              scale: [1, 1.2, 1],
              rotate: [0, 360, 720],
              filter: [
                'hue-rotate(0deg) brightness(1)',
                'hue-rotate(180deg) brightness(1.5)',
                'hue-rotate(360deg) brightness(1)'
              ]
            } : {}}
            transition={{ 
              duration: 4, 
              repeat: spinning ? Infinity : 0,
              ease: "linear"
            }}
          >
            <div className="w-16 h-16 bg-black rounded-full border-4 border-white shadow-xl flex items-center justify-center text-2xl">
              💀
            </div>
          </motion.div>

        {/* Pointer */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10"
            animate={spinning ? {
              scale: [1, 1.1, 1],
              filter: [
                'drop-shadow(0 0 5px #FFD700)',
                'drop-shadow(0 0 15px #FFD700)',
                'drop-shadow(0 0 5px #FFD700)'
              ]
            } : {}}
            transition={{ duration: 1, repeat: spinning ? Infinity : 0 }}
          >
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white shadow-lg"></div>
          </motion.div>

          {/* Winner Celebration Rings */}
          <AnimatePresence>
            {result && (
              <>
                <motion.div
                  className="absolute inset-0 border-4 border-[#FFD700] rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: [0, 1, 0] }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: 3 }}
                />
                <motion.div
                  className="absolute inset-0 border-4 border-[#FFA500] rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: [0, 1, 0] }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3, repeat: 3 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Spin Button */}
        <motion.button
          onClick={handleSpin}
          disabled={spinning}
          className="mt-8 bg-gradient-to-r from-[#C8102E] to-[#E91E63] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all text-xl relative overflow-hidden disabled:opacity-50"
          whileHover={!spinning ? { 
            scale: 1.05,
            boxShadow: '0 0 25px rgba(200, 16, 46, 0.5)',
            background: 'linear-gradient(to right, #E91E63, #FF6B6B)'
          } : {}}
          whileTap={!spinning ? { scale: 0.95 } : {}}
          animate={spinning ? {
            boxShadow: [
              '0 0 20px rgba(200, 16, 46, 0.3)',
              '0 0 40px rgba(200, 16, 46, 0.8)',
              '0 0 20px rgba(200, 16, 46, 0.3)'
            ]
          } : {}}
          transition={{ 
            boxShadow: spinning ? { duration: 1, repeat: Infinity } : {}
          }}
        >
          {spinning ? (
            <motion.div
              className="flex items-center gap-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              🎲 Spinning...
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-2"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎯 Spin the Wheel!
            </motion.div>
          )}
          
          {!spinning && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.button>
      </div>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="bg-gradient-to-r from-[#005BAC] to-[#0066CC] rounded-xl p-6 shadow-xl border-2 border-[#FFD700] text-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <motion.div
              className="text-3xl mb-4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1, repeat: 2 }}
            >
              🎉
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Winner!
            </h3>
            <p className="text-xl text-[#FFD700] font-bold mb-4">
              {result.name}
            </p>
            
            <motion.button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.3)',
                  '0 0 30px rgba(255, 215, 0, 0.6)',
                  '0 0 20px rgba(255, 215, 0, 0.3)'
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              ✨ Submit This Song!
            </motion.button>
          </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
} 