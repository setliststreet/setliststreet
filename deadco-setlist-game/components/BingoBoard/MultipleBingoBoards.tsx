import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BingoBoardBuilder from '../BingoBoardBuilder';
import AddBoardButton from './AddBoardButton';
import { SetlistStreetTheme } from '../../theme/SetlistStreetTheme';
import { supabase } from '../../utils/supabaseClient';

interface BingoBoard {
  id: string;
  name: string;
  songs: (number | null)[];
  completed: boolean;
  score: number;
  createdAt: Date;
}

interface MultipleBingoBoardsProps {
  maxBoards?: number;
  onBoardComplete?: (boardId: string, score: number) => void;
}

export default function MultipleBingoBoards({ 
  maxBoards = 5,
  onBoardComplete 
}: MultipleBingoBoardsProps) {
  const [boards, setBoards] = useState<BingoBoard[]>([
    {
      id: '1',
      name: 'Board #1',
      songs: Array(25).fill(null),
      completed: false,
      score: 0,
      createdAt: new Date(),
    }
  ]);
  const [activeBoard, setActiveBoard] = useState('1');
  const [availableSongs, setAvailableSongs] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      setAvailableSongs(data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      // Fallback to hardcoded songs
      setAvailableSongs([
        { id: 1, name: 'Bertha' },
        { id: 2, name: 'Althea' },
        { id: 3, name: 'Ripple' },
        { id: 4, name: 'Scarlet Begonias' },
        { id: 5, name: 'Fire on the Mountain' },
        { id: 6, name: 'Truckin\'' },
        { id: 7, name: 'Shakedown Street' },
        { id: 8, name: 'China Cat Sunflower' },
        { id: 9, name: 'I Know You Rider' },
        { id: 10, name: 'Eyes of the World' },
        { id: 11, name: 'Estimated Prophet' },
        { id: 12, name: 'The Other One' },
        { id: 13, name: 'St. Stephen' },
        { id: 14, name: 'Terrapin Station' },
        { id: 15, name: 'Uncle John\'s Band' },
        { id: 16, name: 'Casey Jones' },
        { id: 17, name: 'Sugaree' },
        { id: 18, name: 'Playing in the Band' },
        { id: 19, name: 'Friend of the Devil' },
        { id: 20, name: 'Deal' },
        { id: 21, name: 'Jack Straw' },
        { id: 22, name: 'Brown-Eyed Women' },
        { id: 23, name: 'Tennessee Jed' },
        { id: 24, name: 'Mississippi Half-Step' },
        { id: 25, name: 'Loser' },
        { id: 26, name: 'Bird Song' },
        { id: 27, name: 'Ramble On Rose' },
        { id: 28, name: 'Row Jimmy' },
        { id: 29, name: 'China Doll' },
        { id: 30, name: 'Ship of Fools' },
      ]);
    }
  };

  const createNewBoard = useCallback(() => {
    if (boards.length >= maxBoards) return;
    
    const newBoard: BingoBoard = {
      id: Date.now().toString(),
      name: `Board #${boards.length + 1}`,
      songs: Array(25).fill(null),
      completed: false,
      score: 0,
      createdAt: new Date(),
    };

    setBoards(prev => [...prev, newBoard]);
    setActiveBoard(newBoard.id);
  }, [boards.length, maxBoards]);

  const deleteBoard = useCallback((boardId: string) => {
    if (boards.length === 1) return; // Don't delete the last board
    
    setBoards(prev => prev.filter(board => board.id !== boardId));
    
    // If we deleted the active board, switch to the first remaining board
    if (activeBoard === boardId) {
      const remaining = boards.filter(board => board.id !== boardId);
      if (remaining.length > 0) {
        setActiveBoard(remaining[0].id);
      }
    }
  }, [boards, activeBoard]);

  const updateBoard = useCallback((boardId: string, updates: Partial<BingoBoard>) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    ));
  }, []);

  const renameBoard = useCallback((boardId: string, newName: string) => {
    updateBoard(boardId, { name: newName });
  }, [updateBoard]);

  const calculateTotalScore = () => {
    return boards.reduce((total, board) => total + board.score, 0);
  };

  const getCompletedBoards = () => {
    return boards.filter(board => board.completed).length;
  };

  const getBoardProgress = (board: BingoBoard) => {
    const filledSlots = board.songs.filter(song => song !== null).length;
    return Math.round((filledSlots / 25) * 100);
  };

  const handleBoardSubmit = useCallback((boardId: string, submittedBoard: (number | null)[]) => {
    updateBoard(boardId, { 
      songs: submittedBoard,
      completed: true,
      score: Math.floor(Math.random() * 100) // Mock score calculation
    });
    
    const score = Math.floor(Math.random() * 100);
    onBoardComplete?.(boardId, score);
  }, [updateBoard, onBoardComplete]);

  const activeBoardData = boards.find(board => board.id === activeBoard);

  return (
    <div className="w-full">
      {/* Stats Header */}
      <motion.div
        className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🎯 Your Bingo Boards
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-yellow-300">📊</span>
                <span>{boards.length}/{maxBoards} boards active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-300">✅</span>
                <span>{getCompletedBoards()} completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300">🏆</span>
                <span>{calculateTotalScore()} total score</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={createNewBoard}
              disabled={boards.length >= maxBoards}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-white/20 transition-all text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ➕ Quick Add
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Board Tabs */}
      <motion.div
        className="mb-6 flex flex-wrap gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {boards.map((board, index) => (
          <motion.button
            key={board.id}
            onClick={() => setActiveBoard(board.id)}
            className={`
              relative px-4 py-2 rounded-lg border-2 transition-all backdrop-blur text-sm font-medium
              ${activeBoard === board.id 
                ? 'border-white bg-white/20 text-white shadow-lg' 
                : 'border-white/30 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <span>{board.name}</span>
              {board.completed && <span className="text-green-300">✅</span>}
            </div>
            
            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${getBoardProgress(board)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            {/* Close button for multiple boards */}
            {boards.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBoard(board.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Active Board Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Board Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeBoardData && (
              <motion.div
                key={activeBoard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BingoBoardBuilder
                  songs={availableSongs}
                  onSubmit={(board) => handleBoardSubmit(activeBoardData.id, board)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Add Board Button */}
          <AddBoardButton
            onAddBoard={createNewBoard}
            boardCount={boards.length}
            maxBoards={maxBoards}
          />

          {/* Board List */}
          <motion.div
            className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              📋 Board Overview
            </h3>
            
            <div className="space-y-2">
              {boards.map((board, index) => (
                <motion.div
                  key={board.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    activeBoard === board.id 
                      ? 'border-white bg-white/10' 
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveBoard(board.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{board.name}</span>
                    {board.completed && <span className="text-green-300 text-xs">✅</span>}
                  </div>
                  
                  <div className="text-xs text-white/70 mb-2">
                    Progress: {getBoardProgress(board)}%
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getBoardProgress(board)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 
              className="text-lg font-bold text-white mb-3 flex items-center gap-2"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              💡 Pro Tips
            </h3>
            
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <span className="text-yellow-300 flex-shrink-0">🎯</span>
                <span>Create multiple boards with different strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-300 flex-shrink-0">🔄</span>
                <span>Switch between boards using the tabs above</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-300 flex-shrink-0">🏆</span>
                <span>Complete all boards for maximum score!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 