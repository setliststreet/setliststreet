import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import {supabase} from '../utils/supabaseClient';
import styles from '../styles/authStyles.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user?.id,
          username: formData.username,
          email: formData.email
        }
      ]);

    if (profileError) {
      alert(profileError.message);
      setLoading(false);
      return;
    }

    alert('Account created! Please check your email to confirm your account.');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
    setLoading(false);
  };

    return (
      <MainLayout>
                  <div className="countdown-outer"></div>

        <div className="bg-white min-h-screen flex items-center justify-center">
          <motion.div
            className={styles.authCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.authKeyIcon}>🎵</div>
                          <div className="countdown-outer"></div>

              <h1 className="logo-small-text">Join Setlist Street</h1>
            <p className="subtitle-font">
              Create your account and start predicting setlists!</p>
            </motion.div>

           <form onSubmit={handleSubmit} className={styles.form}>
                       <div className="countdown-outer"></div>

             <div className={styles.formField}>
               <label htmlFor="username">Username</label>
               <input
                 type="text"
                 id="username"
                 name="username"
                 value={formData.username}
                 onChange={handleChange}
                 required
                 className={styles.authInputFancy}
                 placeholder="Choose a username"
               />
             </div>

             <div className={styles.formField}>
               <label htmlFor="email">Email Address</label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
                 className={styles.authInputFancy}
                 placeholder="abc@email.com"
               />
             </div>

             <div className={styles.formField}>
               <label htmlFor="password">Password</label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 required
                 className={styles.authInputFancy}
                 placeholder="Create a strong password"
               />
             </div>

             <div className={styles.formField}>
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input
                 type="password"
                 id="confirmPassword"
                 name="confirmPassword"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 required
                 className={styles.authInputFancy}
                 placeholder="Confirm your password"
               />
             </div>

             <div className={styles.checkboxContainer + " mb-4"}>
               <input
                 id="agreeToTerms"
                 name="agreeToTerms"
                 type="checkbox"
                 checked={formData.agreeToTerms}
                 onChange={handleChange}
                 className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
               />
               <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                 I agree to the{' '}
                 <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                   Terms of Service
                 </Link>{' '}
                 and{' '}
                 <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                   Privacy Policy
                 </Link>
               </label>
             </div>
            <div className="countdown-outer"></div>

                 <button
                           type="submit"
                           disabled={loading}
                           className={`${styles.authSubmit} w-full mt-4`}
                         >
               {loading ? 'Creating Account...' : 'Create Account'}
             </button>
           </form>

            <div className="countdown-outer"></div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-700">Or sign up with</span>
                </div>
              </div>
            <div className="countdown-outer"></div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className={styles.authSocialBtn + ' w-full'}>Google</button>
                <button className={styles.authSocialBtn + ' w-full'}>Facebook</button>
              </div>
            </div>

            <div className="countdown-outer"></div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="countdown-outer"></div>

            <motion.div
              className="mt-6 text-center text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>Must be 18+ to participate in paid games.</p>
              <p className="mt-2">Free games available to all ages.</p>
            <p className="mt-2"> Please play responsibly and have fun predicting!</p>
            </motion.div>

            <div className="countdown-outer"></div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Join Setlist Street?</h3>
              <div className="grid grid-cols-1 gap-4 text-gray-700 text-sm">
                <p>15 unique prediction games for every show</p>
                <p>Real-time scoring and live leaderboards</p>
                <p>Multiple ways to play: fun, charity, cash, prizes</p>
                <p>Statistical insights and historical data</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
                    <div className="countdown-outer"></div>

      </MainLayout>
    );
}
