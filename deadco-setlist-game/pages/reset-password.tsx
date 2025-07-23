import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleReset = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Password has been reset!');
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-md">
      <h1 className="text-2xl mb-4">Reset Your Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={handleReset}
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg"
      >
        Update Password
      </button>
    </div>
  );
}
