import React from 'react';
import { motion } from 'framer-motion';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

interface GameModeSelectorProps {
  value: string;
  onChange: (mode: string) => void;
  disabled?: boolean;
}

interface GameMode {
  id: string;
  title: string;
  emoji: string;
  description: string;
  features: string[];
  entryFee: string;
  gradient: string;
}

const GAME_MODES: GameMode[] = [
  {
    id: 'prize',
    title: 'Prize Mode',
    emoji: '🏆',
    description: 'Play for sponsored prizes like concert tickets, merch, or gift cards!',
    features: ['Usually free entry', 'Sponsored prizes', 'Great for beginners', 'Community favorite'],
    entryFee: 'Free - $5',
    gradient: SetlistStreetTheme.gradients.sunset,
  },
  {
    id: 'cash',
    title: 'Cash Mode',
    emoji: '💵',
    description: 'Winner takes the pool! The more players join, the bigger the prize.',
    features: ['Real money prizes', 'Competitive play', 'Skill-based scoring', 'Higher stakes'],
    entryFee: '$1 - $25',
    gradient: SetlistStreetTheme.gradients.galaxy,
  },
  {
    id: 'charity',
    title: 'Charity Mode',
    emoji: '❤️',
    description: 'Win and choose where the prize money goes to make a difference!',
    features: ['Support good causes', 'Winner picks charity', 'Feel-good gaming', 'Community impact'],
    entryFee: '$2 - $10',
    gradient: SetlistStreetTheme.gradients.pastel,
  },
];

export default function GameModeSelector({ value, onChange, disabled = false }: GameModeSelectorProps) {
  const selectedMode = GAME_MODES.find(mode => mode.id === value) || GAME_MODES[0];

  return (
    <div className="w-full">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
        >
          🎮 Choose Game Mode
        </h3>
        <p className="text-white/80 text-sm">
          Each mode offers a different experience. Pick what sounds most fun to you!
        </p>
      </motion.div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {GAME_MODES.map((mode, index) => (
          <motion.button
            key={mode.id}
            onClick={() => !disabled && onChange(mode.id)}
            disabled={disabled}
            className={`relative p-6 rounded-xl border-2 transition-all backdrop-blur text-left overflow-hidden
              ${value === mode.id 
                ? 'border-white bg-white/20 shadow-xl scale-105' 
                : 'border-white/30 bg-white/10 hover:bg-white/15 hover:border-white/50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={!disabled ? { 
              scale: value === mode.id ? 1.05 : 1.02, 
              y: -2,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: value === mode.id ? 1.05 : 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              bounce: 0.4
            }}
          >
            {/* Background Gradient */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{ background: mode.gradient }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{mode.emoji}</div>
                <div>
                  <div className="font-bold text-white text-lg">{mode.title}</div>
                  <div className="text-xs text-white/70">{mode.entryFee}</div>
                </div>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                {mode.description}
              </p>

              <div className="space-y-2">
                {mode.features.slice(0, 2).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-xs text-white/80">
                    <span className="text-yellow-300">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Indicator */}
            {value === mode.id && (
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                <div className="text-green-600 text-sm font-bold">✓</div>
              </motion.div>
            )}

            {/* Hover shimmer effect */}
            {!disabled && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: value === mode.id ? '100%' : '-100%' }}
                transition={{ duration: 1, repeat: value === mode.id ? Infinity : 0, repeatDelay: 2 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Mode Details */}
      <motion.div
        className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        key={selectedMode.id}
      >
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg"
            style={{ background: selectedMode.gradient }}
          >
            {selectedMode.emoji}
          </div>
          <div>
            <h4 
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              {selectedMode.title} Selected
            </h4>
            <p className="text-white/80 text-sm">
              Entry Fee: <span className="font-semibold text-yellow-300">{selectedMode.entryFee}</span>
            </p>
          </div>
        </div>
        
        <p className="text-white/90 mb-4 leading-relaxed">
          {selectedMode.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {selectedMode.features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <span className="text-green-300 text-sm">✓</span>
              <span className="text-white/80 text-xs">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Mode-specific info */}
        {selectedMode.id === 'cash' && (
          <motion.div
            className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="font-semibold text-white text-sm">Cash Mode Notice</span>
            </div>
            <p className="text-white/90 text-xs">
              This is skill-based gaming, not gambling. You must be 18+ and play responsibly. 
              Set personal limits and never spend more than you can afford to lose.
            </p>
          </motion.div>
        )}

        {selectedMode.id === 'charity' && (
          <motion.div
            className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">❤️</span>
              <span className="font-semibold text-white text-sm">Making a Difference</span>
            </div>
            <p className="text-white/90 text-xs">
              Winners choose from a curated list of music education nonprofits, disaster relief funds, 
              and community organizations. 100% of prize money goes to your chosen cause.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 