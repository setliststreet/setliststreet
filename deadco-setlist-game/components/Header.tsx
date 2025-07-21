import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-[999] w-full shadow-md">


      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                         <div className="countdown-inner">
      </div>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

         <div className="flex items-center justify-between">
           <div className="countdown-between">
             {/* Something here if needed */}
           </div>
           <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
             Setlist Street
           </Link>
         </div>


          {/* Desktop Navigation Links - Always visible, right justified */}
          <nav className="flex items-center gap-4 lg:gap-6">
            <Link 
              href="/rules" 
              className="text-gray-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              How to Play

            </Link>
                                    <div className="countdown-between">
</div>
            <Link 
              href="/faq" 
              className="text-gray-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              FAQ
            </Link>
                                       <div className="countdown-between">
            </div>
            <Link 
              href="/setlist-hints" 
              className="text-gray-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              Setlist Hints
            </Link>
                                       <div className="countdown-between">
            </div>
            <Link 
              href="/view-results" 
              className="text-gray-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              Live Results
            </Link>
                                       <div className="countdown-between">
            </div>
            <Link 
              href="/login" 
              className="text-gray-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold transition-all border-2 border-transparent hover:border-purple-200 rounded-lg hover:bg-purple-50"
            >
              Sign In
            </Link>
                                       <div className="countdown-between">
            </div>
            <Link 
              href="/register" 
              className="bg-purple-600 text-white hover:bg-purple-700 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-all border-2 border-purple-600 hover:border-purple-700 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
                                       <div className="countdown-between">
            </div>
          </nav>
        </div>
                           <div className="countdown-inner">
        </div>
      </div>
    </header>
  );
} 