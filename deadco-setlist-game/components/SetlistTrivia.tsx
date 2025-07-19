import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions, calculateTriviaScore, TriviaQuestion } from '../utils/triviaData';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

interface SetlistTriviaProps {
  questionCount?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  onComplete?: (score: any) => void;
}

export default function SetlistTrivia({ 
  questionCount = 5, 
  difficulty,
  onComplete 
}: SetlistTriviaProps) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newQuestions = getRandomQuestions(questionCount, difficulty);
    setQuestions(newQuestions);
  }, [questionCount, difficulty]);

  useEffect(() => {
    if (!gameStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, gameStarted, showResults]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer
      }));
    }

    if (isLastQuestion) {
      const finalAnswers = selectedAnswer !== null 
        ? { ...answers, [currentQuestion.id]: selectedAnswer }
        : answers;
      const score = calculateTriviaScore(finalAnswers);
      onComplete?.(score);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-300';
      case 'medium': return 'text-yellow-300';
      case 'hard': return 'text-orange-300';
      case 'expert': return 'text-red-300';
      default: return 'text-white';
    }
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return 'text-green-400';
    if (timeLeft > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!gameStarted) {
    return (
      <motion.div
        className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: SetlistStreetTheme.gradients.galaxy,
              fontFamily: SetlistStreetTheme.fonts.display,
            }}
          >
            Dead & Company Trivia
          </h2>
          
          <p className="text-white/80 mb-6 leading-relaxed">
            Test your knowledge of setlist patterns, song frequencies, and Dead & Company history!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-blue-300">{questionCount}</div>
              <div className="text-white/80 text-sm">Questions</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className={`text-2xl font-bold ${difficulty ? getDifficultyColor(difficulty) : 'text-white'}`}>
                {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Mixed'}
              </div>
              <div className="text-white/80 text-sm">Difficulty</div>
            </div>
          </div>

          <motion.button
            onClick={startGame}
            className="px-8 py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur transition-all"
            style={{
              background: SetlistStreetTheme.components.button.primary.background,
              color: SetlistStreetTheme.components.button.primary.color,
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: SetlistStreetTheme.components.button.primary.hoverShadow
            }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Start Trivia
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateTriviaScore(answers);
    
    return (
      <motion.div
        className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="text-6xl mb-6">
            {score.percentage >= 80 ? '🏆' : score.percentage >= 60 ? '🎉' : score.percentage >= 40 ? '👍' : '📚'}
          </div>
          
          <h2 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: SetlistStreetTheme.gradients.sunset,
              fontFamily: SetlistStreetTheme.fonts.display,
            }}
          >
            {score.percentage >= 80 ? 'Trivia Master!' : 
             score.percentage >= 60 ? 'Nice Work!' :
             score.percentage >= 40 ? 'Getting There!' : 'Keep Learning!'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-green-300">{score.correct}</div>
              <div className="text-white/80 text-sm">Correct</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-red-300">{score.total - score.correct}</div>
              <div className="text-white/80 text-sm">Wrong</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">{score.score}</div>
              <div className="text-white/80 text-sm">Points</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-blue-300">{score.percentage}%</div>
              <div className="text-white/80 text-sm">Score</div>
            </div>
          </div>

          <div className="text-white/80 mb-6">
            {score.percentage >= 80 ? 
              "Amazing! You're a true Dead & Company expert! 🎸" :
              score.percentage >= 60 ?
              "Great job! You know your setlist patterns well! 🎵" :
              score.percentage >= 40 ?
              "Not bad! Keep studying those setlists! 📚" :
              "Time to dive deeper into Dead & Company history! 🧭"
            }
          </div>

          <motion.button
            onClick={() => {
              setGameStarted(false);
              setShowResults(false);
              setCurrentQuestionIndex(0);
              setAnswers({});
              setSelectedAnswer(null);
              setTimeLeft(30);
            }}
            className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Play Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 text-center text-white">
        <div className="text-4xl mb-4">🎲</div>
        <div>Loading trivia...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress & Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className={`text-lg font-bold ${getTimeColor()}`}>
              ⏱️ {timeLeft}s
            </span>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          className="p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20 mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="text-3xl">{currentQuestion.category === 'song-pairs' ? '🎵' :
                                       currentQuestion.category === 'frequencies' ? '📊' :
                                       currentQuestion.category === 'patterns' ? '🎪' :
                                       currentQuestion.category === 'history' ? '📚' :
                                       currentQuestion.category === 'rarities' ? '💎' : '🎲'}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 leading-relaxed">
                {currentQuestion.question}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>{currentQuestion.points} points</span>
                <span>•</span>
                <span>{currentQuestion.category.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAnswer === option
                    ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option
                      ? 'bg-blue-500 border-blue-400'
                      : 'border-white/40'
                  }`}>
                    {selectedAnswer === option && (
                      <motion.div
                        className="w-3 h-3 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      <div className="text-center">
        <motion.button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="px-8 py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            background: selectedAnswer !== null 
              ? SetlistStreetTheme.components.button.primary.background
              : 'rgba(255, 255, 255, 0.1)',
            color: SetlistStreetTheme.components.button.primary.color,
          }}
          whileHover={selectedAnswer !== null ? { 
            scale: 1.05,
            boxShadow: SetlistStreetTheme.components.button.primary.hoverShadow
          } : {}}
          whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
        >
          {isLastQuestion ? '🏁 Finish' : '➡️ Next Question'}
        </motion.button>
      </div>
    </motion.div>
  );
} 