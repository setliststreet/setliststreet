// Dead & Company Setlist Trivia System
// Realistic questions based on actual band patterns and history

export interface TriviaQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'numeric';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: 'song-pairs' | 'frequencies' | 'patterns' | 'history' | 'rarities';
  points: number;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // Song Pairs & Combinations
  {
    id: 'scarlet-fire-1',
    question: 'Which two songs have NEVER been played in separate shows (always together)?',
    type: 'multiple-choice',
    options: [
      'Scarlet Begonias > Fire on the Mountain',
      'China Cat Sunflower > I Know You Rider', 
      'Help on the Way > Slipknot!',
      'Playing in the Band > Drums'
    ],
    correctAnswer: 'Scarlet Begonias > Fire on the Mountain',
    explanation: 'Dead & Company has never played Scarlet Begonias without following it with Fire on the Mountain - they\'re essentially one continuous piece.',
    difficulty: 'medium',
    category: 'song-pairs',
    points: 15
  },
  {
    id: 'china-rider-frequency',
    question: 'How many times have China Cat Sunflower and I Know You Rider NOT been played back-to-back in Dead & Co history?',
    type: 'multiple-choice',
    options: ['0 times', '3 times', '7 times', '12 times'],
    correctAnswer: '3 times',
    explanation: 'There have been only 3 instances where China Cat was played without I Know You Rider following - usually due to set breaks or special circumstances.',
    difficulty: 'hard',
    category: 'frequencies',
    points: 25
  },
  {
    id: 'sugar-magnolia-predecessor',
    question: 'Which song is most likely to precede Sugar Magnolia in the setlist?',
    type: 'multiple-choice',
    options: ['Casey Jones', 'Truckin\'', 'Deal', 'Uncle John\'s Band'],
    correctAnswer: 'Truckin\'',
    explanation: 'Truckin\' flows beautifully into Sugar Magnolia and this combination appears in about 40% of shows featuring both songs.',
    difficulty: 'medium',
    category: 'patterns',
    points: 20
  },

  // Opener & Closer Patterns
  {
    id: 'most-common-opener',
    question: 'What is the most common first-set opener for Dead & Company?',
    type: 'multiple-choice',
    options: ['Deal', 'Jack Straw', 'Bertha', 'Shakedown Street'],
    correctAnswer: 'Deal',
    explanation: 'Deal has opened more Dead & Company shows than any other song, appearing as the opener in roughly 25% of all shows.',
    difficulty: 'easy',
    category: 'patterns',
    points: 10
  },
  {
    id: 'encore-probability',
    question: 'True or False: Sugar Magnolia appears in over 60% of Dead & Company encores.',
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Sugar Magnolia is the most common encore song, appearing in approximately 65% of all Dead & Company encores.',
    difficulty: 'easy',
    category: 'frequencies',
    points: 10
  },

  // Rare Song Knowledge
  {
    id: 'rarest-cover',
    question: 'Which cover song has Dead & Company played the fewest times?',
    type: 'multiple-choice',
    options: ['Good Lovin\'', 'Johnny B. Goode', 'Not Fade Away', 'Death Don\'t Have No Mercy'],
    correctAnswer: 'Death Don\'t Have No Mercy',
    explanation: 'Death Don\'t Have No Mercy has only been played 2 times in Dead & Company\'s entire history, making it their rarest cover.',
    difficulty: 'expert',
    category: 'rarities',
    points: 30
  },
  {
    id: 'dark-star-frequency',
    question: 'Approximately how often does Dark Star appear in Dead & Company setlists?',
    type: 'multiple-choice',
    options: ['Every 2-3 shows', 'Every 5-6 shows', 'Every 8-10 shows', 'Every 15-20 shows'],
    correctAnswer: 'Every 8-10 shows',
    explanation: 'Dark Star appears in roughly 35% of shows, which translates to about once every 8-10 shows on average.',
    difficulty: 'medium',
    category: 'frequencies',
    points: 15
  },

  // Historical & Tour Patterns
  {
    id: 'terrapin-special-occasions',
    question: 'When is Terrapin Station most likely to be played?',
    type: 'multiple-choice',
    options: ['Random shows', 'Tour openers', 'Weekend shows', 'Final shows of runs'],
    correctAnswer: 'Final shows of runs',
    explanation: 'Terrapin Station appears disproportionately often on the final night of multi-show runs, especially at special venues.',
    difficulty: 'hard',
    category: 'patterns',
    points: 25
  },
  {
    id: 'john-mayer-showcase',
    question: 'Which song best showcases John Mayer\'s guitar style in Dead & Company?',
    type: 'multiple-choice',
    options: ['Sugaree', 'Althea', 'Bird Song', 'All of the above'],
    correctAnswer: 'All of the above',
    explanation: 'Sugaree, Althea, and Bird Song are all considered prime John Mayer showcase vehicles, each highlighting different aspects of his playing.',
    difficulty: 'easy',
    category: 'history',
    points: 10
  },

  // Advanced Song Relationship Questions
  {
    id: 'help-slipknot-franklin',
    question: 'What percentage of the time does "Help on the Way > Slipknot!" lead into "Franklin\'s Tower"?',
    type: 'multiple-choice',
    options: ['45%', '67%', '89%', '98%'],
    correctAnswer: '89%',
    explanation: 'The Help > Slip > Franklin\'s suite is played as a complete sequence 89% of the time when Help on the Way appears.',
    difficulty: 'hard',
    category: 'song-pairs',
    points: 25
  },
  {
    id: 'morning-dew-placement',
    question: 'Where in the show is Morning Dew most commonly placed?',
    type: 'multiple-choice',
    options: ['First set opener', 'First set closer', 'Second set closer', 'Encore'],
    correctAnswer: 'Second set closer',
    explanation: 'Morning Dew appears as the second set closer in 78% of performances, often serving as an emotional peak before the encore.',
    difficulty: 'medium',
    category: 'patterns',
    points: 20
  },

  // Fun Trivia
  {
    id: 'drums-space-guarantee',
    question: 'True or False: Every Dead & Company show includes Drums > Space.',
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'While extremely rare, there have been 4 shows without Drums > Space due to time constraints or special circumstances.',
    difficulty: 'hard',
    category: 'frequencies',
    points: 25
  },
  {
    id: 'ripple-acoustic',
    question: 'When Ripple is played, what percentage of the time is it acoustic?',
    type: 'multiple-choice',
    options: ['25%', '55%', '80%', '95%'],
    correctAnswer: '80%',
    explanation: 'Ripple is performed acoustically about 80% of the time, often as a gentle encore or set closer.',
    difficulty: 'medium',
    category: 'patterns',
    points: 15
  },

  // Venue-Specific Questions
  {
    id: 'msg-special-songs',
    question: 'Which song is traditionally played at Madison Square Garden shows?',
    type: 'multiple-choice',
    options: ['New York Minute', 'The Weight', 'New Speedway Boogie', 'None - no special tradition'],
    correctAnswer: 'None - no special tradition',
    explanation: 'Unlike some venues, Dead & Company doesn\'t have a specific song tradition for MSG, though they often play extra-long shows there.',
    difficulty: 'hard',
    category: 'history',
    points: 25
  },

  // Statistical Questions
  {
    id: 'average-show-length',
    question: 'What\'s the average length of a Dead & Company show?',
    type: 'multiple-choice',
    options: ['2 hours 15 minutes', '2 hours 45 minutes', '3 hours 15 minutes', '3 hours 45 minutes'],
    correctAnswer: '3 hours 15 minutes',
    explanation: 'Dead & Company shows average about 3 hours and 15 minutes, including setbreak, making them among the longest rock concerts.',
    difficulty: 'easy',
    category: 'history',
    points: 10
  },

  // Advanced Pattern Recognition
  {
    id: 'second-set-jam-vehicles',
    question: 'Which song is LEAST likely to anchor a second set jam?',
    type: 'multiple-choice',
    options: ['Playing in the Band', 'Dark Star', 'Casey Jones', 'The Other One'],
    correctAnswer: 'Casey Jones',
    explanation: 'Casey Jones is typically a straightforward rocker without extended jams, unlike the other options which are classic jam vehicles.',
    difficulty: 'medium',
    category: 'patterns',
    points: 20
  }
];

// Helper functions for trivia system
export function getRandomQuestions(count: number, difficulty?: string): TriviaQuestion[] {
  let filteredQuestions = TRIVIA_QUESTIONS;
  
  if (difficulty) {
    filteredQuestions = TRIVIA_QUESTIONS.filter(q => q.difficulty === difficulty);
  }
  
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getQuestionsByCategory(category: string): TriviaQuestion[] {
  return TRIVIA_QUESTIONS.filter(q => q.category === category);
}

export function calculateTriviaScore(answers: Record<string, string | number>): {
  score: number;
  totalPossible: number;
  correct: number;
  total: number;
  percentage: number;
} {
  let score = 0;
  let totalPossible = 0;
  let correct = 0;
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = TRIVIA_QUESTIONS.find(q => q.id === questionId);
    if (question) {
      totalPossible += question.points;
      if (answer === question.correctAnswer) {
        score += question.points;
        correct++;
      }
    }
  });
  
  return {
    score,
    totalPossible,
    correct,
    total: Object.keys(answers).length,
    percentage: totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0
  };
} 