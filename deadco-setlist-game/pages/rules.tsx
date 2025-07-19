import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Rules() {
  const gameTypes = [
    {
      id: 'bingo',
      title: '🎯 Bingo Games',
      emoji: '🎲',
      rules: [
        'Create a 5x5 bingo board with your song predictions',
        'Submit your board before showtime (no late entries!)',
        'Mark off songs as they\'re played during the show',
        'First to complete a line (horizontal, vertical, or diagonal) wins',
        'Multiple boards allowed - increase your chances!'
      ],
      scoring: 'Winner takes the prize pool. Multiple winners split equally.'
    },
    {
      id: 'opener',
      title: '🎸 Opener Prediction',
      emoji: '🚀',
      rules: [
        'Predict which song will open the first set',
        'Must be an exact match (including > segues)',
        'Submissions close 30 minutes before showtime',
        'Ties are broken by earliest submission time'
      ],
      scoring: 'Winner takes 70% of pool, remaining 30% goes to encore winner.'
    },
    {
      id: 'encore',
      title: '🎤 Encore Prediction',
      emoji: '🎵',
      rules: [
        'Predict the last song of the encore',
        'Must specify exact song title',
        'If multiple encore songs, we count the final one',
        'Covers and teases don\'t count unless substantial'
      ],
      scoring: 'Winner takes 30% of pool from opener/encore combo games.'
    },
    {
      id: 'setlist',
      title: '📝 Full Setlist',
      emoji: '📋',
      rules: [
        'Predict the entire setlist in order',
        'Points awarded for correct songs and positions',
        'Bonus points for exact song order matches',
        'Partial credit given for songs in wrong positions'
      ],
      scoring: 'Points-based system. Highest score wins the full prize pool.'
    }
  ];

  const generalRules = [
    {
      emoji: '⏰',
      title: 'Submission Deadlines',
      description: 'All predictions must be submitted before the published deadline. No exceptions!'
    },
    {
      emoji: '💰',
      title: 'Entry Fees',
      description: 'Cash mode entry fees are non-refundable once submitted. Choose carefully!'
    },
    {
      emoji: '🎪',
      title: 'Contest Types',
      description: 'Choose from prize games (sponsored), cash games (winner takes pool), or charity games.'
    },
    {
      emoji: '🤝',
      title: 'Community Standards',
      description: 'Be kind, no trolling, no cheating. One account per person. Respect the music!'
    },
    {
      emoji: '🏆',
      title: 'Prize Distribution',
      description: 'Winners are notified within 24 hours. Prizes distributed within 48 hours of verification.'
    },
    {
      emoji: '⚖️',
      title: 'Final Decisions',
      description: 'All scoring and rule interpretations are final. Disputes resolved by admin team.'
    }
  ];

  return (
    <Layout 
      title="Setlist Street - Game Rules"
      description="Learn how to play Setlist Street games and understand our scoring system."
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
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
                backgroundImage: SetlistStreetTheme.gradients.sunset,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              📜 Game Rules
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to the most <span className="font-bold text-yellow-300">fun and fair</span> way 
              to predict setlists! Here's everything you need to know to start playing.
            </motion.p>
          </motion.div>

          {/* General Rules */}
          <motion.div
            className="mb-12 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🌟 Universal Rules
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generalRules.map((rule, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white/10 rounded-lg border border-white/20"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{rule.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white mb-2">{rule.title}</h3>
                      <p className="text-white/80 text-sm">{rule.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Game Types */}
          <div className="space-y-8">
            <motion.h2 
              className="text-3xl font-bold text-center text-white mb-8"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🎮 Game Types & Rules
            </motion.h2>

            {gameTypes.map((gameType, index) => (
              <motion.div
                key={gameType.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">{gameType.emoji}</div>
                  <h3 
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    {gameType.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Rules */}
                  <div className="lg:col-span-2">
                    <h4 className="font-bold text-white/90 mb-3 flex items-center gap-2">
                      <span className="text-blue-300">📋</span>
                      How to Play
                    </h4>
                    <ul className="space-y-2">
                      {gameType.rules.map((rule, ruleIndex) => (
                        <motion.li
                          key={ruleIndex}
                          className="flex items-start gap-3 text-white/80 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.2 + ruleIndex * 0.05 }}
                        >
                          <span className="text-yellow-300 text-xs mt-1">•</span>
                          <span>{rule}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Scoring */}
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-white/90 mb-3 flex items-center gap-2">
                      <span className="text-green-300">🏆</span>
                      Scoring
                    </h4>
                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-white/80 text-sm">{gameType.scoring}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Prize Modes */}
          <motion.div
            className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              💰 Prize Modes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-bold text-white mb-2">Prize Mode</h3>
                <p className="text-white/80 text-sm">
                  Play for sponsored prizes like concert tickets, merch, or gift cards. 
                  Entry usually free!
                </p>
              </div>
              
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-3xl mb-3">💵</div>
                <h3 className="font-bold text-white mb-2">Cash Mode</h3>
                <p className="text-white/80 text-sm">
                  Winner takes the pool! Entry fees range from $1-$25. 
                  The more players, the bigger the prize.
                </p>
              </div>
              
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="font-bold text-white mb-2">Charity Mode</h3>
                <p className="text-white/80 text-sm">
                  Win and choose where the prize money goes! 
                  Feel good while playing your favorite game.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="mt-12 p-6 rounded-2xl border border-white/20 backdrop-blur text-center"
            style={{ background: SetlistStreetTheme.gradients.aurora }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h3 
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🤔 Still Have Questions?
            </h3>
            
            <p className="text-white/90 mb-6 leading-relaxed">
              The best way to learn is by playing! Start with free prize games 
              to get the hang of it, then jump into cash games when you're ready. 
              Our community is always happy to help newcomers.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">📧</span>
                <span>support@setliststreet.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">💬</span>
                <span>Join our Discord</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">❓</span>
                <span>Check out the FAQ</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 