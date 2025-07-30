import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


interface FourWaysToPlayProps {
  onSubmissionClick: (playMode: string, amount?: number, song?: string) => void;
  gameType?: string;
  disabled?: boolean;
  selectedSong?: string;
}

const FourWaysToPlay: React.FC<FourWaysToPlayProps> = ({
  onSubmissionClick,
  gameType = 'prediction',
  disabled = false,
  selectedSong,
}) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<number>(5);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');






const handleModeSelection = async (modeId: string) => {
  if (disabled) return;
  setSelectedMode(modeId);

  // Fun and Prize modes – no payment needed
  if (modeId === 'fun' || modeId === 'prize') {
    setTimeout(() => {
      onSubmissionClick(modeId, undefined, selectedSong);
    }, 100);
    return;
  }

  // Validate custom amount for cash/charity
  if (customAmount < 1 || customAmount > 1000) {
    alert('Amount must be between ₹1 and ₹1000');
    return;
  }

  try {
    // Create Stripe checkout session on backend
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: customAmount * 100, // Stripe requires smallest currency unit (paise)
        mode: modeId,
        song: selectedSong || '',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to create session:', errText);
      alert('Error creating payment session.');
      return;
    }

    const { id: sessionId } = await res.json();
    if (!sessionId) {
      alert('No session ID returned.');
      return;
    }

    const stripe = await loadStripe('pk_test_51OUuMQSDNquEEED5PjAikooexWblzyNgJoq260MNdHthqTIQ1Tu7WZB377cpYtjZZFBJnfOT0ywXUs9XhNyPDbBJ00XWaR4IUt');
    if (!stripe) {
      alert('Failed to initialize Stripe');
      return;
    }

    await stripe.redirectToCheckout({ sessionId });
  } catch (err) {
    console.error('Stripe error:', err);
    alert('Unexpected error during payment. Please try again.');
  }
};


  return (
    <div className="mt-6 mb-6">
      {selectedSong && (
        <div className="text-center text-purple-600 font-semibold text-md mb-2">
          🎵 Selected Song: <span className="underline underline-offset-2">{selectedSong}</span>
        </div>
      )}

      <h2 className="logo-extra-small-text  text-center">Choose Your Play Mode</h2>
      <div className='countdown-inner'></div>
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

      {(selectedMode === 'charity' || selectedMode === 'cash') && !disabled && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
          <h4 className="font-medium text-gray-800 mb-3 text-center">
            {selectedMode === 'charity' ? 'Donation Amount' : 'Entry Amount'}
          </h4>
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
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Or enter custom amount:</label>
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
                  isCustomAmount ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              />
              {isCustomAmount && customInput && (
                <span className="text-purple-600 text-sm font-medium">Selected: ${customAmount}</span>
              )}
            </div>
            {isCustomAmount && customInput && (customAmount < 1 || customAmount > 1000) && (
              <p className="text-red-600 text-xs mt-1">Amount must be between $1 and $1000</p>
            )}
          </div>
        </div>
      )}

      {selectedMode && !disabled && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center mt-6 max-w-2xl mx-auto">
          <p className="text-green-800 text-sm font-medium">
            {selectedMode === 'fun' && `✓ Playing for fun! Your ${gameType} has been submitted${selectedSong ? ` with "${selectedSong}"` : ''}.`}
            {selectedMode === 'charity' && `✓ Thank you! Your $${customAmount} donation and ${gameType} have been submitted${selectedSong ? ` with "${selectedSong}"` : ''}.`}
            {selectedMode === 'cash' && `✓ Entered! Your $${customAmount} entry and ${gameType} are in the cash pool${selectedSong ? ` with "${selectedSong}"` : ''}.`}
            {selectedMode === 'prize' && `✓ Competing for prizes! Your ${gameType} has been submitted${selectedSong ? ` with "${selectedSong}"` : ''}.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default FourWaysToPlay;
