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
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

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
    
    // Auto-submit when mode is selected, but validate amounts first
    setTimeout(() => {
      if (modeId === 'charity' || modeId === 'cash') {
        // Validate amount before submission
        if (customAmount >= 1 && customAmount <= 1000) {
          onSubmissionClick(modeId, customAmount);
        } else {
          // Don't submit if amount is invalid - user needs to fix it
          console.log('Invalid amount, not submitting');
        }
      } else {
        onSubmissionClick(modeId);
      }
    }, 100);
  };

  return (
    <div className="mt-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Play Mode
      </h2>
      
      {/* Standardized Horizontal 4-Column Grid */}
      <div className="grid grid-cols-9 w-full items-center">
        <div className="w-4"></div>
        <button
          className="cartoon-btn px-4 py-2 rounded-lg font-cartoon text-lg bg-yellow-300 border-4 border-yellow-500 shadow-lg hover:scale-105 hover:bg-yellow-400 transition-transform duration-150 active:translate-y-1"
          onClick={() => handleModeSelection('fun')}
        >
          Play for Fun
        </button>
        <div className="w-0.5"></div>
        <button
          className="cartoon-btn px-4 py-2 rounded-lg font-cartoon text-lg bg-pink-300 border-4 border-pink-500 shadow-lg hover:scale-105 hover:bg-pink-400 transition-transform duration-150 active:translate-y-1"
          onClick={() => handleModeSelection('charity')}
        >
          Play for Charity
        </button>
        <div className="w-0.5"></div>
        <button
          className="cartoon-btn px-4 py-2 rounded-lg font-cartoon text-lg bg-blue-300 border-4 border-blue-500 shadow-lg hover:scale-105 hover:bg-blue-400 transition-transform duration-150 active:translate-y-1"
          onClick={() => handleModeSelection('cash')}
        >
          Play for Cash
        </button>
        <div className="w-0.5"></div>
        <button
          className="cartoon-btn px-4 py-2 rounded-lg font-cartoon text-lg bg-green-300 border-4 border-green-500 shadow-lg hover:scale-105 hover:bg-green-400 transition-transform duration-150 active:translate-y-1"
          onClick={() => handleModeSelection('prize')}
        >
          Play for Prize
        </button>
        <div className="w-4"></div>
      </div>

      {/* Amount Selection for Charity/Cash Modes */}
      {(selectedMode === 'charity' || selectedMode === 'cash') && !disabled && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
          <h4 className="font-medium text-gray-800 mb-3 text-center">
            {selectedMode === 'charity' ? 'Donation Amount' : 'Entry Amount'}
          </h4>
          
          {/* Preset Amount Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
            {[1, 2, 5, 10, 15, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setCustomAmount(amount);
                  setIsCustomAmount(false);
                  setCustomInput('');
                }}
                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                  customAmount === amount && !isCustomAmount
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          {/* Custom Amount Input */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                min="1"
                max="1000"
                step="1"
                value={customInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomInput(value);
                  if (value && !isNaN(Number(value))) {
                    setCustomAmount(Number(value));
                    setIsCustomAmount(true);
                  }
                }}
                placeholder="Enter amount"
                className={`flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isCustomAmount 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300'
                }`}
              />
              {isCustomAmount && customInput && (
                <span className="text-purple-600 text-sm font-medium">
                  Selected: ${customAmount}
                </span>
              )}
            </div>
            {isCustomAmount && customInput && (customAmount < 1 || customAmount > 1000) && (
              <p className="text-red-600 text-xs mt-1">
                Amount must be between $1 and $1000
              </p>
            )}
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