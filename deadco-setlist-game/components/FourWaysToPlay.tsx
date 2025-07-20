import React, { useState } from 'react';

interface FourWaysToPlayProps {
  onSubmissionClick: (playMode: string, amount?: number) => void;
  gameType?: string;
  disabled?: boolean;
}

export default function FourWaysToPlay({ 
  onSubmissionClick, 
  gameType = 'prediction',
  disabled = false 
}: FourWaysToPlayProps) {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<number>(5);

  const playModes = [
    {
      id: 'fun',
      title: 'Play for Fun',
      description: 'Free play, leaderboard glory',
      buttonText: 'Play Free'
    },
    {
      id: 'charity',
      title: 'Play for Charity',
      description: 'Donate $1-$10, winners choose charity',
      buttonText: 'Donate & Play'
    },
    {
      id: 'cash',
      title: 'Play for Cash',
      description: 'Entry fee builds prize pool',
      buttonText: 'Enter Pool'
    },
    {
      id: 'prize',
      title: 'Play for Prize',
      description: 'Compete for sponsored rewards',
      buttonText: 'Compete'
    }
  ];

  const handleModeSelection = (modeId: string) => {
    if (disabled) return;
    
    setSelectedMode(modeId);
    
    // Auto-submit when mode is selected
    setTimeout(() => {
      if (modeId === 'charity' || modeId === 'cash') {
        onSubmissionClick(modeId, customAmount);
      } else {
        onSubmissionClick(modeId);
      }
    }, 100);
  };

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Play Mode
      </h2>
      
      {/* Standardized Horizontal 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {playModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelection(mode.id)}
            disabled={disabled}
            className={`p-4 rounded-lg border-2 text-left transition-all shadow-sm hover:shadow-md ${
              disabled 
                ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                : selectedMode === mode.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {mode.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {mode.description}
            </p>
            <div className={`text-xs font-medium ${
              disabled
                ? 'text-gray-400'
                : selectedMode === mode.id 
                  ? 'text-purple-700' 
                  : 'text-gray-500'
            }`}>
              {mode.buttonText}
            </div>
          </button>
        ))}
      </div>

      {/* Amount Selection for Charity/Cash Modes */}
      {(selectedMode === 'charity' || selectedMode === 'cash') && !disabled && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
          <h4 className="font-medium text-gray-800 mb-3 text-center">
            {selectedMode === 'charity' ? 'Donation Amount' : 'Entry Amount'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[1, 2, 5, 10, 15, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => setCustomAmount(amount)}
                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                  customAmount === amount
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {selectedMode && !disabled && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center mt-6 max-w-2xl mx-auto">
          <p className="text-green-800 text-sm font-medium">
            {selectedMode === 'fun' && `✓ Playing for fun! Your ${gameType} has been submitted.`}
            {selectedMode === 'charity' && `✓ Thank you! Your $${customAmount} donation and ${gameType} have been submitted.`}
            {selectedMode === 'cash' && `✓ Entered! Your $${customAmount} entry and ${gameType} are in the cash pool.`}
            {selectedMode === 'prize' && `✓ Competing for prizes! Your ${gameType} has been submitted.`}
          </p>
        </div>
      )}
    </div>
  );
} 