import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SetlistTrivia from '../components/SetlistTrivia';
import Leaderboard from '../components/Leaderboard';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function TestTrivia() {
  const [triviaCompleted, setTriviaCompleted] = useState(false);
  const [lastScore, setLastScore] = useState<any>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert' | undefined>(undefined);

  const handleTriviaComplete = (score: any) => {
    setTriviaCompleted(true);
    setLastScore(score);
  };

  const resetTrivia = () => {
    setTriviaCompleted(false);
    setLastScore(null);
    setSelectedDifficulty(undefined);
  };

  return (
    <Layout 
      title="Setlist Street - Trivia Challenge"
      description="Test your Dead & Company knowledge with our setlist trivia challenge!"
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: SetlistStreetTheme.gradients.galaxy,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              🧠 Setlist Trivia Challenge
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Test your knowledge of Dead & Company setlist patterns, song frequencies, 
              and band history! From <span className="font-bold text-yellow-300">easy crowd pleasers</span> to 
              <span className="font-bold text-purple-300"> expert-level rarities</span>.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Trivia Area */}
            <div className="lg:col-span-2">
              {!selectedDifficulty ? (
                /* Difficulty Selection */
                <motion.div
                  className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 
                    className="text-2xl font-bold text-white mb-6 text-center"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    Choose Your Challenge Level
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        id: 'easy', 
                        title: 'Easy', 
                        emoji: '🟢', 
                        description: 'Basic setlist knowledge',
                        points: '10-15 points per question',
                        examples: 'Common openers, frequent songs'
                      },
                      { 
                        id: 'medium', 
                        title: 'Medium', 
                        emoji: '🟡', 
                        description: 'Song patterns and frequencies',
                        points: '15-20 points per question',
                        examples: 'Song pairs, venue patterns'
                      },
                      { 
                        id: 'hard', 
                        title: 'Hard', 
                        emoji: '🟠', 
                        description: 'Deep tour knowledge',
                        points: '20-25 points per question',
                        examples: 'Rare combinations, statistics'
                      },
                      { 
                        id: 'expert', 
                        title: 'Expert', 
                        emoji: '🔴', 
                        description: 'Ultra-rare song knowledge',
                        points: '25-30 points per question',
                        examples: 'Unicorn songs, deep history'
                      }
                    ].map((difficulty, index) => (
                      <motion.button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(difficulty.id as any)}
                        className="p-6 rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{difficulty.emoji}</span>
                          <span className="text-xl font-bold text-white">{difficulty.title}</span>
                        </div>
                        
                        <div className="text-white/80 text-sm mb-3">{difficulty.description}</div>
                        
                        <div className="space-y-2 text-xs text-white/60">
                          <div>💰 {difficulty.points}</div>
                          <div>📝 {difficulty.examples}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <motion.button
                      onClick={() => setSelectedDifficulty(undefined)}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🎲 Random Mix (All Difficulties)
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Trivia Game */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={resetTrivia}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
                      >
                        ← Back to Difficulty
                      </button>
                      
                      {selectedDifficulty && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20">
                          <span className="text-sm text-white/80">Difficulty:</span>
                          <span className="font-bold text-white capitalize">{selectedDifficulty}</span>
                        </div>
                      )}
                    </div>

                    {lastScore && (
                      <div className="text-sm text-white/80">
                        Last Score: <span className="font-bold text-yellow-300">{lastScore.percentage}%</span>
                      </div>
                    )}
                  </div>

                  <SetlistTrivia
                    questionCount={5}
                    difficulty={selectedDifficulty}
                    onComplete={handleTriviaComplete}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <motion.div
                className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                >
                  📊 Trivia Stats
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Total Questions</span>
                    <span className="font-bold text-blue-300">15+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Categories</span>
                    <span className="font-bold text-green-300">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Difficulty Levels</span>
                    <span className="font-bold text-yellow-300">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Time Limit</span>
                    <span className="font-bold text-red-300">30s</span>
                  </div>
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                >
                  🎯 Question Categories
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎵</span>
                    <div>
                      <div className="text-white font-medium">Song Pairs</div>
                      <div className="text-white/60 text-xs">Which songs always play together?</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <div className="text-white font-medium">Frequencies</div>
                      <div className="text-white/60 text-xs">How often are songs played?</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎪</span>
                    <div>
                      <div className="text-white font-medium">Patterns</div>
                      <div className="text-white/60 text-xs">Opener/closer tendencies</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📚</span>
                    <div>
                      <div className="text-white font-medium">History</div>
                      <div className="text-white/60 text-xs">Band timeline and facts</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg">💎</span>
                    <div>
                      <div className="text-white font-medium">Rarities</div>
                      <div className="text-white/60 text-xs">Ultra-rare song knowledge</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Leaderboard Preview */}
              <Leaderboard variant="homepage" maxPlayers={5} showSponsors={false} showCharities={false} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 