import React from 'react';

interface PaymentButtonProps {
  amount?: number;
  onPayment?: () => void;
  disabled?: boolean;
}

export default function PaymentButton({ amount = 5, onPayment, disabled }: PaymentButtonProps) {
  return (
    <button
      onClick={onPayment}
      disabled={disabled}
      className={`
        px-6 py-3 font-medium rounded-lg transition-all
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-green-600 text-white hover:bg-green-700'
        }
      `}
    >
      Pay ${amount} to Play
    </button>
  );
}
