import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function SetlistTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which song is most commonly played by Dead & Company?",
      options: ["Sugar Magnolia", "Dark Star", "Ripple", "The Other One"],
      correct: 0
    },
    {
      id: 2,
      question: "What is the traditional song pairing with Scarlet Begonias?",
      options: ["Uncle John's Band", "Fire on the Mountain", "Truckin'", "Eyes of the World"],
      correct: 1
    },
    {
      id: 3,
      question: "Which venue is known as the 'Home of the Grateful Dead'?",
      options: ["Madison Square Garden", "Red Rocks", "Fillmore West", "Winterland"],
      correct: 2
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quiz Complete!
        </h3>
        <p className="text-xl mb-4">
          Your Score: {score} / {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Setlist Trivia
          </h3>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Score: {score} / {currentQuestion + (showResult ? 1 : 0)}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {question.question}
        </h4>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`
                w-full text-left p-3 border rounded-lg transition-all
                ${showResult
                  ? index === question.correct
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : index === selectedAnswer && index !== question.correct
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                  : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
