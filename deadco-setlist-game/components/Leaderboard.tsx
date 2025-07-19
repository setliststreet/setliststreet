import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getTopPlayers, 
  getPlayersByMode, 
  getActiveSponsorsByCategory,
  getTotalCharityRaised,
  CHARITIES,
  RECENT_GAMES,
  LeaderboardEntry 
} from '../utils/leaderboardData';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';
import Link from 'next/link';

interface LeaderboardProps {
  variant?: 'full' | 'compact' | 'homepage';
  maxPlayers?: number;
  showSponsors?: boolean;
  showCharities?: boolean;
}

export default function Leaderboard({ 
  variant = 'full',
  maxPlayers = 10,
  showSponsors = true,
  showCharities = true 
}: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'overall' | 'prize' | 'cash' | 'charity'>('overall');
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');

  const getPlayersForTab = () => {
    switch (activeTab) {
      case 'prize': return getPlayersByMode('prize').slice(0, maxPlayers);
      case 'cash': return getPlayersByMode('cash').slice(0, maxPlayers);
      case 'charity': return getPlayersByMode('charity').slice(0, maxPlayers);
      default: return getTopPlayers(maxPlayers);
    }
  };

  const players = getPlayersForTab();
  const sponsors = getActiveSponsorsByCategory();
  const totalCharityRaised = getTotalCharityRaised();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'prize': return '🏆';
      case 'cash': return '💰';
      case 'charity': return '❤️';
      default: return '🏅';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'prize': return 'from-yellow-500 to-orange-500';
      case 'cash': return 'from-green-500 to-emerald-500';
      case 'charity': return 'from-pink-500 to-red-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  if (variant === 'homepage') {
    return (
      <motion.div
        className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-xl font-bold text-white"
            style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
          >
            🏆 Top Players
          </h3>
          <div className="text-sm text-white/60">This Week</div>
        </div>

        <div className="space-y-3">
          {players.slice(0, 5).map((player, index) => (
            <motion.div
              key={player.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-yellow-500 text-yellow-900' :
                index === 1 ? 'bg-gray-400 text-gray-900' :
                index === 2 ? 'bg-orange-600 text-orange-100' :
                'bg-white/20 text-white'
              }`}>
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{player.username}</div>
                <div className="text-white/60 text-xs">{player.score} points</div>
              </div>

              <div className="text-xs text-white/60">
                {getModeIcon(player.favoriteMode)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="w-full mt-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <Link href="/leaderboard">
            View Full Leaderboard →
          </Link>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: SetlistStreetTheme.gradients.sunset,
            fontFamily: SetlistStreetTheme.fonts.display,
          }}
        >
          🏆 Setlist Street Leaderboard
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Celebrating our top predictors across all game modes and community achievements
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
          <div className="text-2xl font-bold text-blue-300">1,247</div>
          <div className="text-white/80 text-sm">Active Players</div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
          <div className="text-2xl font-bold text-green-300">${totalCharityRaised.toLocaleString()}</div>
          <div className="text-white/80 text-sm">Raised for Charity</div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
          <div className="text-2xl font-bold text-yellow-300">3,456</div>
          <div className="text-white/80 text-sm">Games Played</div>
        </div>
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
          <div className="text-2xl font-bold text-purple-300">{sponsors.length}</div>
          <div className="text-white/80 text-sm">Active Sponsors</div>
        </div>
      </motion.div>

      {/* Main Leaderboard */}
      <motion.div
        className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overall', label: 'Overall', icon: '🏅' },
            { id: 'prize', label: 'Prize Games', icon: '🏆' },
            { id: 'cash', label: 'Cash Games', icon: '💰' },
            { id: 'charity', label: 'Charity Games', icon: '❤️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Players List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Rank */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-100' :
                  'bg-white/20 text-white'
                }`}>
                  {index < 3 ? (index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉') : index + 1}
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-lg">{player.username}</span>
                    <div className="flex gap-1">
                      {player.achievements.slice(0, 3).map((achievement, i) => (
                        <span key={i} className="text-xs">{achievement.split(' ')[0]}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span>{player.score.toLocaleString()} points</span>
                    <span>•</span>
                    <span>{player.gamesPlayed} games</span>
                    <span>•</span>
                    <span>{player.winRate}% win rate</span>
                    {player.totalWinnings && (
                      <>
                        <span>•</span>
                        <span className="text-green-300">${player.totalWinnings}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Favorite Mode */}
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getModeColor(player.favoriteMode)}`}>
                    {getModeIcon(player.favoriteMode)} {player.favoriteMode}
                  </div>
                  <div className="text-xs text-white/60 mt-1">{player.lastActive}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Sponsors & Charities */}
      {variant === 'full' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sponsors */}
          {showSponsors && (
            <motion.div
              className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                🌟 Our Amazing Sponsors
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {sponsors.slice(0, 6).map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    className="p-3 bg-white/10 rounded-lg border border-white/20 text-center hover:bg-white/15 transition-all cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">
                      {sponsor.category === 'music' ? '🎵' :
                       sponsor.category === 'wellness' ? '💪' :
                       sponsor.category === 'cannabis' ? '🌿' :
                       sponsor.category === 'mushrooms' ? '🍄' :
                       sponsor.category === 'events' ? '🎪' : '🛍️'}
                    </div>
                    <div className="font-bold text-white text-sm">{sponsor.name}</div>
                    <div className="text-xs text-white/60">{sponsor.category}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Charities */}
          {showCharities && (
            <motion.div
              className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                ❤️ Charity Partners
              </h3>
              
              <div className="space-y-3">
                {CHARITIES.slice(0, 4).map((charity, index) => (
                  <motion.div
                    key={charity.id}
                    className="p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm">{charity.name}</div>
                        <div className="text-xs text-white/60">{charity.deadCoConnection}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-300">
                          ${charity.totalRaised.toLocaleString()}
                        </div>
                        <div className="text-xs text-white/60">raised</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Recent Games */}
      {variant === 'full' && (
        <motion.div
          className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 
            className="text-xl font-bold text-white mb-4"
            style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
          >
            🎮 Recent Winners
          </h3>
          
          <div className="space-y-3">
            {RECENT_GAMES.slice(0, 3).map((game, index) => (
              <motion.div
                key={game.id}
                className="p-4 bg-white/10 rounded-lg border border-white/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-white">{game.winners[0].username}</span>
                      <span className={`px-2 py-1 rounded text-xs bg-gradient-to-r ${getModeColor(game.mode)}`}>
                        {getModeIcon(game.mode)} {game.mode}
                      </span>
                    </div>
                    <div className="text-sm text-white/80">
                      {game.gameType} • {game.venue} • {game.participants} players
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-300">
                      {typeof game.prize === 'number' ? `$${game.prize}` : game.prize}
                    </div>
                    <div className="text-xs text-white/60">{game.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
} 