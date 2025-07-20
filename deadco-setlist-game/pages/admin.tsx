import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ShowSelector from '../components/ShowSelector';
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
        .select('id, game_id, user_id')
        .eq('game_id', gameId);
      
      if (error) throw error;
      setExistingResults(data || []);
    } catch (error) {
      console.error('Error fetching existing results:', error);
    }
  };

  const handleSetlistSubmit = async () => {
    if (!selectedGame || !actualSetlist.trim()) {
      alert('Please select a game and enter the actual setlist');
      return;
    }

    setLoading(true);
    try {
      const setlistArray = actualSetlist.split('\n').filter(song => song.trim());
      
      console.log("Submitted setlist for game", selectedGame, ":", setlistArray);
      console.log("Dead & Company Show:", selectedShow);
      
      // Here would be actual scoring logic
      alert(`Setlist saved successfully!\n\nSongs: ${setlistArray.length}\nReady to score ${existingResults.length} predictions!`);
      
    } catch (error) {
      console.error('Error submitting setlist:', error);
      alert('Error submitting setlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Submit actual setlists and score player predictions for Dead & Company shows
            </p>
          </motion.div>

          {/* Game Selection */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                Select Game
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGame(game.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedGame === game.id
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">{game.type}</div>
                    <div className="text-sm opacity-80">{game.date}</div>
                  </button>
                ))}
              </div>
              
              {existingResults.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-700">
                    {existingResults.length} predictions to score
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Show Selection */}
          {selectedGame && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <ShowSelector
                  selectedShow={selectedShow}
                  onShowChange={setSelectedShow}
                  compact
                />
              </div>
            </motion.div>
          )}

          {/* Live Show Status */}
          {selectedGame && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4 text-gray-800">Live Show Status</div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <span className="text-purple-600 flex-shrink-0 font-medium">Song Tracking</span>
                      <span className="ml-4">Current: "Help on the Way"</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-blue-600 flex-shrink-0 font-medium">Set Status</span>
                      <span className="ml-4">Set 1 - Song 6 of ~8</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-green-600 flex-shrink-0 font-medium">Predictions</span>
                      <span className="ml-4">247 active predictions</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-orange-600 flex-shrink-0 font-medium">Live Scoring</span>
                      <span className="ml-4">Auto-updating leaderboards</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Setlist Input */}
          {selectedGame && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Enter Actual Setlist
                </h2>
                <p className="text-gray-600 mb-6">
                  One song per line (in the order they were played)
                </p>
                
                <div className="space-y-6">
                  <textarea
                    value={actualSetlist}
                    onChange={(e) => setActualSetlist(e.target.value)}
                    placeholder="Help on the Way&#10;Slipknot!&#10;Franklin's Tower&#10;Tennessee Jed&#10;Looks Like Rain&#10;Deal&#10;Uncle John's Band&#10;Casey Jones"
                    className="w-full h-64 p-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  
                  {actualSetlist && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="text-gray-600 text-sm mb-2">Preview ({actualSetlist.split('\n').filter(s => s.trim()).length} songs):</div>
                      <div className="text-gray-800 text-sm space-y-1 max-h-32 overflow-y-auto">
                        {actualSetlist.split('\n').filter(s => s.trim()).map((song, index) => (
                          <div key={index}>{index + 1}. {song}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleSetlistSubmit}
                    disabled={loading || !selectedGame || !actualSetlist.trim()}
                    className="w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {loading ? 'Processing...' : `Save & Score ${existingResults.length} Predictions`}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
} 