import { useEffect, useState } from 'react';
import { registerGuestUser } from '../../lib/supabaseHelpers';

export default function GuestSignupModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const result = await registerGuestUser(email);
      if (result === 'already_exists') {
        setStatus('✅ Already registered. Continuing...');
        onSuccess();
        setTimeout(() => setIsOpen(false), 1500);
      } else if (result === 'success') {
        setStatus('✅ Registered! Welcome!');
        setEmail('');
        onSuccess();
        setTimeout(() => setIsOpen(false), 1500);
      } else {
        setStatus('⚠️ Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Please try later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="game-card fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div
        
      >
        <div className='countdown-outer mb-6'></div>
        <h2 >
Join Now

        </h2>

        <div className='countdown-outer mb-6'></div>

        {status && (
          <div className="w-full mb-4 p-3 rounded-xl bg-purple-100 text-purple-800 border border-purple-300 text-center animate-pulse">
            {status}
          </div>
        )}
        

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-5 py-3 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white text-gray-800 shadow-sm"
          />

        <div className='countdown-outer mb-6'></div>

          <button type="submit" className="button w-full py-3 text-lg">
            Register
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
