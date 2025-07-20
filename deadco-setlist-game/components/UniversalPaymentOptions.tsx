
import React, { useState } from 'react';

export default function UniversalPaymentOptions() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handlePayment = (amount: number) => {
    alert(`Processing $${amount} payment for ${selectedMode}`);
    // TODO: Integrate actual payment logic
  };

  const renderAmountOptions = () => (
    <div className="flex gap-4 mt-4">
      {[1, 5, 10].map((amt) => (
        <button
          key={amt}
          onClick={() => handlePayment(amt)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ${amt}
        </button>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Custom"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="px-2 py-1 border rounded w-20"
        />
        <button
          onClick={() => handlePayment(Number(customAmount))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!customAmount || isNaN(Number(customAmount))}
        >
          Pay Custom
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-10 text-center">
      <div className="flex justify-center gap-8">
        <button
          onClick={() => setSelectedMode('cash')}
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Play for Cash
        </button>
        <button
          onClick={() => setSelectedMode('charity')}
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Play for Charity
        </button>
      </div>
      {selectedMode && renderAmountOptions()}
    </div>
  );
}
