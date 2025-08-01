'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PlayModeSelectorProps {
  onSubmissionClick: (playMode: string, amount?: number) => void;
  gameType?: string;
  disabled?: boolean;
}

const stripePromise = loadStripe('pk_live_51Rq6NDLht2OhDAwlqCLvlD9JiXtiz7QDNl6T9vdkSHNvLeYjnEzAFQ0MZccrqgglSMUX2eqJJvmrya060zmD8oX900VrQOpNLU');

const PlayModeSelector: React.FC<PlayModeSelectorProps> = ({
  onSubmissionClick,
  gameType = 'prediction',
  disabled = false,
}) => {
  const [selectedMode, setSelectedMode] = useState('');
  const [customAmount, setCustomAmount] = useState(5);
  const [customInput, setCustomInput] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const handleModeSelection = async (mode: string) => {
    if (disabled) return;

    setSelectedMode(mode);

    if (mode === 'fun' || mode === 'prize') {
      onSubmissionClick(mode);
      return;
    }

    const amountInRupees = isCustomAmount ? Number(customInput) : customAmount;

    if (isNaN(amountInRupees) || amountInRupees < 1 || amountInRupees > 1000) {
      alert('Please enter an amount between ₹1 and ₹1000');
      return;
    }

    // Stripe Checkout redirect
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInRupees * 100, // Convert to paise
          mode,
          song: 'Fantasy Setlist', // You can pass actual selected song if needed
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Stripe session error:', errText);
        alert('Error creating payment session.');
        return;
      }

      const { id: sessionId } = await res.json();
      const stripe = await stripePromise;

      if (!stripe) {
        alert('Stripe not initialized');
        return;
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Stripe redirect error:', err);
      alert('Failed to process payment.');
    }
  };

  return (
    <div className="mt-6 mb-6">
      <h2 className="logo-extra-small-text text-center">Choose Your Play Mode</h2>

      <div className="grid grid-cols-9 w-full items-center mt-4 mb-2">
        <div className="w-4" />
        <button onClick={() => handleModeSelection('fun')} className="cartoon-btn">Play for Fun</button>
        <div className="w-0.5" />
        <button onClick={() => handleModeSelection('charity')} className="cartoon-btn">Play for Charity</button>
        <div className="w-0.5" />
        <button onClick={() => handleModeSelection('cash')} className="cartoon-btn">Play for Cash</button>
        <div className="w-0.5" />
        <button onClick={() => handleModeSelection('prize')} className="cartoon-btn">Play for Prize</button>
        <div className="w-4" />
      </div>

      {(selectedMode === 'charity' || selectedMode === 'cash') && (
        <div className="center-wrapper">
          <div className="sfs-game-card bg-gray-50 border p-4 mt-4 max-w-2xl mx-auto">
            <h4 className="font-medium text-center">
              {selectedMode === 'charity' ? 'Donation Amount' : 'Entry Amount'}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4 mt-2">
              {[1, 2, 5, 10, 15, 20].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setCustomAmount(amount);
                    setIsCustomAmount(false);
                    setCustomInput('');
                  }}
                  className={`custom-button py-2 px-3 rounded text-sm font-medium ${
                    customAmount === amount && !isCustomAmount
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 border'
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-1">Or enter custom amount:</label>
            <div className="flex items-center gap-2">
              ₹
              <input
                type="number"
                min="1"
                max="1000"
                value={customInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomInput(value);
                  if (!isNaN(Number(value))) {
                    setCustomAmount(Number(value));
                    setIsCustomAmount(true);
                  }
                }}
                className="w-full px-4 py-3 bg-white rounded-2xl shadow-inner-cartoon text-purple-900 font-cartoon"
                placeholder="Enter amount"
              />
              {isCustomAmount && customInput && (
                <span className="text-purple-600 text-sm font-medium pl-4">
                  Selected: ₹{customAmount}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayModeSelector;
