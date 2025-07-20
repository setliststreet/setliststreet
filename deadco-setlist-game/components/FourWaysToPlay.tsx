import React, { useState } from 'react';

interface FourWaysToPlayProps {
  onPlayModeSelect?: (mode: 'fun' | 'charity' | 'cash' | 'prize') => void;
  onSubmissionClick?: (mode: 'fun' | 'charity' | 'cash' | 'prize', amount?: number) => void;
}

export default function FourWaysToPlay({ onPlayModeSelect, onSubmissionClick }: FourWaysToPlayProps) {
  const [selectedMode, setSelectedMode] = useState<'fun' | 'charity' | 'cash' | 'prize' | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');

  const playModes = [
    {
      id: 'fun' as const,
      title: 'Play for Fun',
      description: 'Just for the love of the music',
      color: 'border-blue-200 hover:border-blue-300',
      needsPayment: false,
    },
    {
      id: 'charity' as const,
      title: 'Play for Charity',
      description: 'Support a good cause',
      color: 'border-green-200 hover:border-green-300',
      needsPayment: true,
    },
    {
      id: 'cash' as const,
      title: 'Play for Cash',
      description: 'Real money games',
      color: 'border-yellow-200 hover:border-yellow-300',
      needsPayment: true,
    },
    {
      id: 'prize' as const,
      title: 'Play for Prize',
      description: 'Win exclusive merchandise',
      color: 'border-purple-200 hover:border-purple-300',
      needsPayment: false,
    },
  ];

  const paymentAmounts = [1, 5, 10];

  const handleModeSelect = (mode: 'fun' | 'charity' | 'cash' | 'prize') => {
    const modeConfig = playModes.find(m => m.id === mode);
    
    if (!modeConfig?.needsPayment) {
      // For fun and prize modes, submit immediately
      handleSubmit(mode);
    } else {
      // For cash and charity modes, show payment options
      setSelectedMode(mode);
      setSelectedAmount(null);
      setCustomAmount('');
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = (mode: 'fun' | 'charity' | 'cash' | 'prize', amount?: number) => {
    if (onPlayModeSelect) {
      onPlayModeSelect(mode);
    }
    if (onSubmissionClick) {
      onSubmissionClick(mode, amount);
    }
    
    // Reset selection state
    setSelectedMode(null);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  const handlePaymentSubmit = () => {
    if (!selectedMode) return;
    
    const amount = selectedAmount || parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please select or enter a valid amount');
      return;
    }
    
    handleSubmit(selectedMode, amount);
  };

  const getSelectedAmount = () => {
    return selectedAmount || (customAmount ? parseFloat(customAmount) : null);
  };

  return (
    <section className="py-8 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ways to Play
        </h2>
        <p className="text-gray-600">
          Choose how you want to experience the game
        </p>
      </div>

      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8">
        {playModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelect(mode.id)}
            className={`
              bg-white ${mode.color} border-2 p-4 rounded-lg shadow-sm
              transform transition-all duration-200 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-purple-300
              flex-1 min-w-[200px] max-w-[250px]
              ${selectedMode === mode.id ? 'ring-2 ring-purple-300' : ''}
            `}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{mode.title}</h3>
              <p className="text-sm text-gray-600">{mode.description}</p>
              <div className="mt-3">
                <span className="text-xs text-purple-600 font-medium">
                  {mode.needsPayment ? 'Select Amount' : 'Click to Submit'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Payment Amount Selection */}
      {selectedMode && playModes.find(m => m.id === selectedMode)?.needsPayment && (
        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Select Your {selectedMode === 'cash' ? 'Entry Fee' : 'Donation Amount'}
          </h3>
          
          {/* Preset Amounts */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {paymentAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`
                  px-6 py-3 rounded-lg border-2 font-semibold transition-colors
                  ${selectedAmount === amount
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Or enter custom amount:
            </label>
            <div className="flex justify-center">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 w-32"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handlePaymentSubmit}
              disabled={!getSelectedAmount()}
              className={`
                px-8 py-3 rounded-lg font-semibold transition-colors
                ${getSelectedAmount()
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {selectedMode === 'cash' 
                ? `Pay $${getSelectedAmount() || '0'} & Submit`
                : `Donate $${getSelectedAmount() || '0'} & Submit`
              }
            </button>
          </div>

          {/* Cancel Button */}
          <div className="text-center mt-3">
            <button
              onClick={() => setSelectedMode(null)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 