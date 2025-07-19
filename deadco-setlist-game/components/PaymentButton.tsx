import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentButtonProps {
  amount: number;
  onSuccess: () => void;
}

// CSS-based Lottie-style loading animation
const LoadingSpinner = () => (
  <div className="relative w-6 h-6">
    <motion.div
      className="absolute inset-0 border-2 border-white/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-1 border-2 border-transparent border-t-green-400 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Success checkmark animation
const SuccessCheck = () => (
  <motion.div
    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", bounce: 0.6 }}
  >
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <polyline points="20,6 9,17 4,12" />
    </motion.svg>
  </motion.div>
);

export default function PaymentButton({ amount, onSuccess }: PaymentButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setSuccess(true);
    
    // Show success state briefly
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
      onSuccess();
    }, 1500);
  };

  return (
    <>
      <motion.button
        className="bg-gradient-to-r from-[#005BAC] to-[#0066CC] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all text-lg relative overflow-hidden border-2 border-white/20"
        onClick={() => setShowModal(true)}
        type="button"
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 25px rgba(0, 91, 172, 0.5)',
          background: 'linear-gradient(to right, #0066CC, #0077DD)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💳 Pay ${amount} to Play
        </motion.div>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
      {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !processing && !success && setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl text-center max-w-md w-full relative overflow-hidden"
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header gradient */}
              <div className="bg-gradient-to-r from-[#C8102E] to-[#005BAC] p-6 text-white">
                <motion.h2 
                  className="text-2xl font-bold mb-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {success ? '🎉 Payment Successful!' : '💳 Secure Payment'}
                </motion.h2>
                <motion.p 
                  className="text-white/90"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {success 
                    ? 'Welcome to the game!' 
                    : 'This is a demo - no real payment required'
                  }
                </motion.p>
              </div>

              <div className="p-8">
                {success ? (
                  <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <SuccessCheck />
                    <p className="text-green-600 font-semibold text-lg">
                      You&apos;re all set to play!
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <motion.div 
                      className="mb-6 p-4 bg-gray-50 rounded-xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Game Entry:</span>
                        <span className="font-bold text-[#C8102E]">${amount}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span className="text-gray-600">$0.00</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-[#005BAC]">${amount}</span>
                      </div>
                    </motion.div>

                    <div className="flex gap-3">
                      <motion.button
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              onClick={() => setShowModal(false)}
              disabled={processing}
                        whileHover={!processing ? { scale: 1.02 } : {}}
                        whileTap={!processing ? { scale: 0.98 } : {}}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
            >
              Cancel
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 bg-gradient-to-r from-[#005BAC] to-[#0066CC] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all relative overflow-hidden"
                        onClick={handlePay}
                        disabled={processing}
                        whileHover={!processing ? { 
                          scale: 1.02,
                          boxShadow: '0 0 20px rgba(0, 91, 172, 0.4)'
                        } : {}}
                        whileTap={!processing ? { scale: 0.98 } : {}}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <AnimatePresence mode="wait">
                          {processing ? (
                            <motion.div
                              key="processing"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <LoadingSpinner />
                              Processing...
                            </motion.div>
                          ) : (
                            <motion.span
                              key="pay"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              Pay ${amount}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        
                        {/* Button shimmer */}
                        {!processing && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </motion.button>
          </div>
                  </>
                )}
        </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 right-4 text-2xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🎵
              </motion.div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
} 