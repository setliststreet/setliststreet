import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import MultipleBingoBoards from '../components/BingoBoard/MultipleBingoBoards';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function TestBingo() {
  const handleBoardComplete = (boardId: string, score: number) => {
    console.log(`🎉 Board ${boardId} completed with score: ${score}`);
    // Future: Save to database, show celebration animation, etc.
  };

  return (
    <Layout 
      title="Setlist Street - Bingo Boards"
      description="Create multiple bingo boards and predict setlists in the cutest way possible!"
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: SetlistStreetTheme.components.text.heading.color,
                fontFamily: SetlistStreetTheme.fonts.primary,
              }}
            >
              Bingo Board Builder
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ 
                color: SetlistStreetTheme.components.text.body.color,
                fontFamily: SetlistStreetTheme.fonts.primary 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Create multiple bingo boards with different strategies! 
              The more boards you have, the better your chances of winning.
            </motion.p>

            {/* Fun stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">🎲</span>
                <span>Up to 5 boards per game</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">🎪</span>
                <span>Drag & drop interface</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">⚡</span>
                <span>Real-time progress tracking</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-pink-300">🏆</span>
                <span>Score multipliers for multiple boards</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MultipleBingoBoards
              maxBoards={5}
              onBoardComplete={handleBoardComplete}
            />
          </motion.div>

          {/* Footer Instructions */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div 
              className="max-w-4xl mx-auto p-6 rounded-2xl border"
              style={{ 
                backgroundColor: SetlistStreetTheme.components.card.background,
                border: SetlistStreetTheme.components.card.border 
              }}
            >
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ 
                  color: SetlistStreetTheme.components.text.heading.color,
                  fontFamily: SetlistStreetTheme.fonts.primary 
                }}
              >
                How to Play
              </h3>
              
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{ color: SetlistStreetTheme.components.text.body.color }}
              >
                <div className="text-center p-4">
                  <h4 className="font-bold mb-2">1. Choose Songs</h4>
                  <p className="text-sm">Drag songs from the picker into your bingo board slots</p>
                </div>
                
                <div className="text-center p-4">
                  <h4 className="font-bold mb-2">2. Create Strategy</h4>
                  <p className="text-sm">Make multiple boards with different song predictions</p>
                </div>
                
                <div className="text-center p-4">
                  <h4 className="font-bold mb-2">3. Win Prizes</h4>
                  <p className="text-sm">Get bingo during the show and claim your rewards!</p>
                </div>
              </div>

              <motion.div
                className="mt-6 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span>Multiple boards = higher scores</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Smooth animations = more fun</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Professional design = better experience</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 