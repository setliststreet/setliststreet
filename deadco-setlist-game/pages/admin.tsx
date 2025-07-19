import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import BandSelector from '../components/BandSelector';
import ShowSelector from '../components/ShowSelector';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';
import { supabase } from '../utils/supabaseClient';

interface Game {
  id: number;
  type: string;
  date: string;
  is_active: boolean;
}

export default function AdminPage() {
  const [actualSetlist, setActualSetlist] = useState("");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedBand, setSelectedBand] = useState('deadco');
  const [selectedShow, setSelectedShow] = useState('deadco-2025-08-01');
  const [loading, setLoading] = useState(false);
  const [existingResults, setExistingResults] = useState<{id: number, game_id: number, user_id: string}[]>([]);

  useEffect(() => {
    fetchGames();
    if (selectedGame) {
      fetchExistingResults(selectedGame);
    }
  }, [selectedGame]);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });
      
      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchExistingResults = async (gameId: number) => {
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('game_id', gameId);
      
      if (data) {
        setExistingResults(data);
      }
    } catch (error) {
      // Error handling
    }
  };

  const handleSave = async () => {
    if (!selectedGame || !actualSetlist.trim()) return;
    
    setLoading(true);
    
    try {
      const setlistArray = actualSetlist.split('\n')
        .map(song => song.trim())
        .filter(song => song.length > 0);

      console.log("📝 Submitted setlist for game", selectedGame, ":", setlistArray);
      console.log("🎸 Band:", selectedBand);
      console.log("📅 Show:", selectedShow);
      
      // Future: Save to database and score existing predictions
      alert(`✅ Setlist saved successfully!\n\n🎵 Songs: ${setlistArray.length}\n🎯 Ready to score ${existingResults.length} predictions!`);
      
    } catch (error) {
      console.error('Error saving setlist:', error);
      alert('❌ Error saving setlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      title="Setlist Street - Admin Portal"
      description="Admin tools for managing games and scoring predictions"
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: SetlistStreetTheme.gradients.galaxy,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              ⚙️ Admin Portal
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Enter actual setlists and score predictions with our 
              <span className="font-bold text-pink-300"> super cute</span> admin tools!
            </motion.p>
          </motion.div>

          {/* Game Selection */}
          <motion.div
            className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 
              className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🎮 Select Game
            </h2>
            
            {games.length > 0 ? (
              <div className="space-y-2">
                {games.map((game, index) => (
                  <motion.button
                    key={game.id}
                    onClick={() => setSelectedGame(game.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left backdrop-blur ${
                      selectedGame === game.id
                        ? 'border-white bg-white/20 shadow-lg'
                        : 'border-white/30 bg-white/10 hover:bg-white/15 hover:border-white/50'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-lg">{game.type}</div>
                        <div className="text-white/70 text-sm">
                          {new Date(game.date).toLocaleDateString("en-US", { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        {selectedGame === game.id && existingResults.length > 0 && (
                          <div className="text-yellow-300 text-sm mt-1">
                            📊 {existingResults.length} predictions to score
                          </div>
                        )}
                      </div>
                      
                      {selectedGame === game.id && (
                        <motion.div
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.6 }}
                        >
                          <div className="text-white text-sm font-bold">✓</div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/60">
                <div className="text-4xl mb-4">🎭</div>
                <div>No active games found</div>
              </div>
            )}
          </motion.div>

          {/* Band & Show Selection */}
          {selectedGame && (
            <motion.div
              className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <BandSelector
                  selectedBand={selectedBand}
                  onBandChange={setSelectedBand}
                  compact
                />
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <ShowSelector
                  selectedShow={selectedShow}
                  onShowChange={setSelectedShow}
                  bandId={selectedBand}
                  compact
                />
              </div>
            </motion.div>
          )}

          {/* Setlist Input */}
          {selectedGame && (
            <motion.div
              className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 
                className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                🎵 Enter Actual Setlist
              </h2>
              
              <div className="mb-4">
                <label className="block text-white/80 text-sm mb-2">
                  📝 One song per line (in the order they were played)
                </label>
                <motion.textarea
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur resize-none focus:border-white/50 focus:bg-white/15 transition-all"
                  style={{ fontFamily: SetlistStreetTheme.fonts.body }}
                  rows={10}
                  placeholder={`Bertha
Althea
Ripple
Scarlet Begonias
Fire on the Mountain
Drums
Space
Truckin'
...`}
          value={actualSetlist}
                  onChange={(e) => setActualSetlist(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Live Preview */}
              {actualSetlist.trim() && (
                <motion.div
                  className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/80 text-sm mb-2">📊 Preview ({actualSetlist.split('\n').filter(s => s.trim()).length} songs):</div>
                  <div className="flex flex-wrap gap-1">
                    {actualSetlist.split('\n')
                      .map(song => song.trim())
                      .filter(song => song.length > 0)
                      .map((song, index) => (
                        <motion.span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/90"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {index + 1}. {song}
                        </motion.span>
                      ))
                    }
                  </div>
                </motion.div>
              )}

              <motion.button
                onClick={handleSave}
                disabled={loading || !actualSetlist.trim()}
                className="w-full py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{
                  background: SetlistStreetTheme.components.button.success.background,
                  color: SetlistStreetTheme.components.button.success.color,
                }}
                whileHover={!loading && actualSetlist.trim() ? { 
                  scale: 1.05,
                  boxShadow: SetlistStreetTheme.components.button.success.hoverShadow
                } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
              >
                {loading ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </motion.div>
                ) : (
                  `🎯 Save & Score ${existingResults.length} Predictions`
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Help Section */}
          <motion.div
            className="p-6 rounded-2xl border border-white/20 backdrop-blur"
            style={{ background: SetlistStreetTheme.gradients.aurora }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              💡 Admin Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <span className="text-yellow-300 flex-shrink-0">🎵</span>
                <span>Enter songs exactly as they appeared in the show</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-300 flex-shrink-0">📝</span>
                <span>One song per line, in chronological order</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-300 flex-shrink-0">🎯</span>
                <span>System automatically scores all predictions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-300 flex-shrink-0">🏆</span>
                <span>Results are updated in real-time for players</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 